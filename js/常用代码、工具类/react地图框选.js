import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from '../../utils/request';
import { api } from '../../constants/Api';
import './Map.css';
import '../../styles/animate.css';

import TimeLineSearchEvent from '../TimeLineEvent/TimeLineSearchEvent';

import L from 'leaflet';
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap';
import './leaflet-react/leaflet-lasso';
import 'proj4leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import intl from 'react-intl-universal';
import _ from 'lodash';

import { mapServer } from '../../utils/config';
import { convertPoint } from '../../utils/global';
import getMapOpts from './leaflet-react/getMapOpts';
import CameraBox from './CameraBox.js';

//this.props.ids ? 人脸搜索框上的人脸faceid

class GoogleMapSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null, //地图实例对象
            points: [], //所有摄像头的数据信息
            isLoading: false,
            pointsMarkersArr: [], //渲染的摄像头marker,removeMarker
            cameraMarkers: [],
            hotMap: {
                obj: null,
                // isShow: props.CurrentMode == 'search' ? false : true
                isShow: false
            },
            toolStateString: 'cancelDrawRect',
            isCameraEventInMap: false, //采集检索？？
            currentClickCameraId: -1,
            isShowCameraBox: false, //是否显示框选列表box组件
            openRect: false, //框选功能是否开启
            drawRectState: null,
            lasso: null,
            pointListSelected: [], //框选的点位
            pointListSelectedLayers: [], //leaflet的数组
            searchResult: null,
            isSearchFace: props.CurrentMode === 'search' && props.ids.length > 0 ? true : false, //是否为人脸检索状态
            searchResultIds: [],
            isFirstSearch: true,
            pointTempLayer: [], //记录当前每一个选中的单点layer
            currentCameraFaceSize: 20 // 当前检索的face数量
        };
    }
    componentDidMount() {
        //初始化列表已选择摄像头
        let { dataSource = [], cameraIds } = this.props;
        console.log(
            'zml mapsearch did mount props.cameraids pros.datasource',
            cameraIds, [...dataSource]
        );
        let pointListSelected = dataSource.filter(item =>
            cameraIds.some(
                cameraId => cameraId === item.id || cameraId === item.cameraId
            )
        );
        this.setState({
            pointListSelected
        });
        console.log('zml mapsearch didmount pointListSelected', pointListSelected);
        // 组件渲染完成后加载地图
        this.loadMap();
    }
    componentWillReceiveProps(nextProps) {
            this.isChangeFirstState(this.props, nextProps); //方便属性过滤等变更
            this.setState({
                isSearchFace: nextProps.CurrentMode === 'search' && nextProps.ids.length > 0 ?
                    true :
                    false
            });
            let isRequestNotSame =
                this.props.requestNum !== nextProps.requestNum ? true : false;
            let isRequestParamsNotSame = false;
            if (!this.state.isLoading && (isRequestParamsNotSame || isRequestNotSame)) {
                this.setState({
                    isFirstSearch: true
                });
                this.getAllCameraList(nextProps);
                const { map, hotMap } = this.state;
                hotMap.obj && map.removeLayer(hotMap.obj);
                this.setState({
                    hotMap: {
                        obj: null,
                        isShow: false
                    }
                });

                // 精准结果匹配
                if (
                    (this.props.mergeType !== nextProps.mergeType ||
                        this.props.hat !== nextProps.hat) &&
                    nextProps.CurrentMode == 'search' &&
                    nextProps.ids.length > 0
                ) {
                    console.log('zml 精准结果匹配', nextProps);
                    this.getFirstPicInMapCamera(nextProps, false);
                }
            }
            //dingdianbarcount组件的清除已选camerabox没同步的问题
            if (nextProps.cameraIds.length) {
                let isSame = [...this.props.cameraIds].filter(x => [...nextProps.cameraIds].every(y => y.id != x.id));
                console.log(
                    'zml props',
                    this.props.cameraIds,
                    nextProps.cameraIds,
                    isSame
                );
                if (!isSame.length) {
                    let points = this.state.points;
                    let newPoint = [...points].filter(x => [...nextProps.cameraIds].some(y => y === x.id));
                    newPoint.forEach(np => {
                        np['selected'] = true;
                    });
                    this.setState({
                        pointListSelected: newPoint
                    });
                }
            }
            if (this.props.cameraIds.length && !nextProps.cameraIds.length) {
                this.state.pointTempLayer.forEach((tl, ti) => {
                    this.getIcon(tl, 'remove');
                    tl.options.icon.options.point.state = 0; //重置icon内point
                });
                this.setState({
                        pointTempLayer: [],
                        pointListSelected: []
                    },
                    () => {
                        setTimeout(() => {
                            this.removeCameraBoxAni();
                        }, 500);
                    }
                );
            }
            const { sourceId } = nextProps;
            let currentPoint = this.state.points.find(item => {
                return item.id === sourceId;
            });
            const { map, points } = this.state;
            if (map && currentPoint) {
                setTimeout(() => {
                    this.renderCamera(points, true);
                    map.setView([currentPoint.lat, currentPoint.lng], 17);
                }, 500);
            }
        }
        //加载地图
    loadMap = () => {
        setTimeout(function() {
            //根据地图容器的大小的改变动态下载所需要的瓦片进行填充
            //https://stackoverflow.com/questions/24412325/resizing-a-leaflet-map-on-container-resize
            map.invalidateSize();
        }, 100);

        const opts = {
            minZoom: mapServer.mapZoom.minZoom,
            maxZoom: mapServer.mapZoom.maxZoom,
            zoom: mapServer.mapDefaultZoom,
            center: [mapServer.mapCenter.lng, mapServer.mapCenter.lat],
            zoomControl: false
        };
        //创建地图实例对象
        const map = L.map('mapContianer', Object.assign(getMapOpts(), opts));
        //添加相关控制器至地图
        L.control
            .scale({ position: 'bottomleft', metric: true, imperial: false })
            .addTo(map);
        L.control
            .zoom({
                zoomInTitle: intl.get('ZOOM_IN'),
                zoomOutTitle: intl.get('ZOOM_OUT')
            })
            .addTo(map);
        //缩放结束时的事件监听
        map.addEventListener('zoomend', () => {
            map.closePopup(); //点击地图标记时展开的弹出框，在缩放结束时关闭
            this.renderSingleMarkerDom(); //renderMarker缓存 需要放大缩小手动查找 TODO？
        });
        //地图点击事件
        map.addEventListener('click', e => {
            console.log('当前点击位置坐标为：', e.latlng);
        });
        //框选结束的事件监听
        map.on('lasso.finished', event => {
            //框选有两种形式，一种热力图框 一种正常marker框。
            console.log('leaflet lasso.finished', event);
            let points = this.state.points;
            let oldSelectPo = [...this.state.pointListSelected];
            //热力图模式下的框选
            setTimeout(() => {
                if (this.state.hotMap.isShow && this.state.openRect) {
                    let bound = event.latLngs;
                    let selectedPoint = []; //选中的点
                    // console.log('zml --', event, event.latLngs);
                    let SouthWestLng = bound[0].lng;
                    let SouthWestLat = bound[0].lat;
                    let NorthEastLng = bound[2].lng;
                    let NorthEastLat = bound[1].lat;
                    points.forEach((d, i) => {
                        if (
                            d.lng >= SouthWestLng &&
                            d.lng <= NorthEastLng &&
                            d.lat >= SouthWestLat &&
                            d.lat <= NorthEastLat
                        ) {
                            d['selected'] = true;
                            selectedPoint.push(d);
                        }
                    });
                    let pointOld = this.state.pointListSelected;
                    let pointFin = [];
                    if (pointOld.length) {
                        let chaArr = [...selectedPoint].filter(x => [...pointOld].every(y => y.id != x.id));
                        let jiaoArr = [...pointOld].filter(x => [...selectedPoint].some(y => y.id === x.id));
                        let pointOld2 = [...pointOld].filter(x => [...jiaoArr].every(y => y.id != x.id));
                        pointFin = pointOld2.concat(chaArr);
                    } else {
                        pointFin = selectedPoint;
                    }

                    // console.log('zml selectedPoint,pointOld,pointFin', selectedPoint,pointOld,pointFin);
                    this.setState({
                            // pointListSelected: selectedPoint,
                            pointListSelected: pointFin,
                            // pointTempLayer: newSlayer.concat(pointT),
                            isShowCameraBox: selectedPoint.length ? true : false
                        },
                        () => {
                            //初次框选的摄像头传入redux保存--影响传图检索和dingdianbarcount
                            let selecCam = [];
                            pointFin.forEach(p => {
                                selecCam.push(p.id);
                            });
                            this.props.onChangeCameraFilterFromMap(selecCam);
                        }
                    );
                    return;
                }
            }, 300);
            //正常框选--(非热力图，marker框选)
            let selectLayer = []; //此次框选，选中的标记layer
            event.layers.forEach(layer => {
                if (layer instanceof L.MarkerCluster) {
                    //聚合点获取所有子marker
                    let jiaojiCluster = layer.getAllChildMarkers();
                    selectLayer.push(...jiaojiCluster);
                } else {
                    selectLayer.push(layer);
                }
            });
            if (!selectLayer.length) return;
            let pointListNewSelected = [];
            let selectLayerRemove = [];
            selectLayer.forEach((se, si) => {
                let isSelect = se.options.icon.options.point.state;
                if (isSelect) {
                    se.options.icon.options.point['selected'] = false;
                    se.options.icon.options.point['state'] = 0;
                    selectLayerRemove.push(se);
                    this.getIcon(se, 'remove');
                } else {
                    se.options.icon.options.point['selected'] = true;
                    se.options.icon.options.point.state = 1;
                }
                pointListNewSelected.push(se.options.icon.options.point);
            });
            pointListNewSelected.forEach((element, index) => {
                element['selected'] = true;
                if (element.state) {
                    oldSelectPo.push(element);
                } else {
                    let filterold = oldSelectPo.filter((v, i) => {
                        if (v.id != element.id) {
                            return true;
                        } else {
                            oldSelectPo.splice(i, 1);
                            return false;
                        }
                    });
                }
            });
            let newSlayer = [...selectLayer].filter(x => [...selectLayerRemove].every(y => y._leaflet_id != x._leaflet_id));
            let pointT = [...this.state.pointTempLayer].filter(x => [...selectLayerRemove].every(y => y._leaflet_id != x._leaflet_id));

            newSlayer.forEach(ns => {
                this.getIcon(ns, 'add');
            });

            this.setState({
                pointListSelected: oldSelectPo,
                pointTempLayer: newSlayer.concat(pointT),
                isShowCameraBox: pointListNewSelected.length ? true : false
            });

            //初次框选的摄像头传入redux保存--影响传图检索和dingdianbarcount
            setTimeout(() => {
                let selecCam = [];
                oldSelectPo.forEach(p => {
                    selecCam.push(p.id);
                });
                this.props.onChangeCameraFilterFromMap(selecCam);
            }, 300);
        });
        //鼠标右击上下文菜单事件
        map.on('contextmenu', () => {
            this.cancelDrawRect();

            return false;
        });
        this.setState({
                map
            },
            () => {
                this.getAllCameraList(this.props);
            }
        );
    };

    isChangeFirstState = (props, nextProps) => {
        let propsObj = {
            starttime: props.starttime, //过滤项，时间范围-开始时间
            endtime: props.endtime, //过滤项，时间范围-结束时间
            dayStartTime: props.dayStartTime, //过滤项，周期-开始时间
            dayEndTime: props.dayEndTime, //过滤项，周期-结束时间
            weekDay: props.weekDay, //过滤项，周期-星期几
            quality: props.quality, //过滤项，图片质量
            gender: props.gender, //过滤项，性别
            genderConfidence: props.genderConfidence, //过滤项，性别置信度
            age: props.age, //过滤项，年龄
            race: props.race, //过滤项，种族
            raceConfidence: props.raceConfidence, //过滤项，种族置信度
            hat: props.hat, //过滤项，帽子
            hatConfidence: props.hatConfidence, //过滤项，帽子置信度
            glasses: props.glasses, //过滤项，眼镜
            glassesConfidence: props.glassesConfidence, //过滤项，眼镜置信度
            attrConfidence: props.attrConfidence //过滤项，置信度
        };
        let propsNextObj = {
            starttime: nextProps.starttime,
            endtime: nextProps.endtime,
            dayStartTime: nextProps.dayStartTime,
            dayEndTime: nextProps.dayEndTime,
            weekDay: nextProps.weekDay,
            quality: nextProps.quality,
            gender: nextProps.gender,
            genderConfidence: nextProps.genderConfidence,
            age: nextProps.age,
            race: nextProps.race,
            raceConfidence: nextProps.raceConfidence,
            hat: nextProps.hat,
            hatConfidence: nextProps.hatConfidence,
            glasses: nextProps.glasses,
            glassesConfidence: nextProps.glassesConfidence,
            attrConfidence: nextProps.attrConfidence
        };
        if (nextProps.CurrentMode === 'search' && !nextProps.ids.length) {
            console.log('zml ReceiveProps无ids');
            this.setState({
                isFirstSearch: true
            });
        }

        if (!_.isEqual(propsObj, propsNextObj)) {
            this.setState({
                isFirstSearch: true
            });
        }
        if (this.state.map) {
            this.state.map.closePopup();
        }
    };

    //获取所有摄像头列表
    getAllCameraList = props => {
        this.setState({
            isLoading: true
        });
        const { map } = this.state;
        const { selectedCameraId, gisType } = this.props; //TODO?
        const param = {
            queryBy: 'nameAndCode',
            query: props.dingDian.viewListStr,
            id: props.selectMenuData.menuId,
            nodeType: props.selectMenuData.menuType,
            inStation: '0',
            captureBankId: props.selectMenuData.menuBankId, // 库id
            placeTypeId: props.placeType, // 场所类型id   props.dingDian.placeType
            starttime: props.starttime,
            endtime: props.endtime,
            dayStartTime: props.dayStartTime,
            dayEndTime: props.dayEndTime,
            weekDay: props.weekDay
        };
        const urlParam = {
            page: 1,
            pagesize: 100000
        };
        return request({
            url: api.GetCameraList,
            method: 'post',
            data: {
                ...param,
                urlParams: urlParam
            }
        }).then(res => {
            this.setState({
                isLoading: false,
                res: res // 更换为测试数据cameraInfo/res TODO?
            });
            const resPointArr = convertPoint(res.data);
            this.setState({
                points: resPointArr,
                isShowCameraBox: props.cameraIds.length > 0 ? true : false //TODO?
            });
            //设置单个摄像头的中心点坐标
            let centerPoint = [];
            //是否有点击过某个摄像头跳转地图
            let ifCenter = false;
            for (let i = 0; i < resPointArr.length; i++) {
                if (resPointArr[i].id == selectedCameraId) {
                    centerPoint[0] = resPointArr[i].lat;
                    centerPoint[1] = resPointArr[i].lng;
                    ifCenter = true;
                }
            }
            if (
                resPointArr.length &&
                ifCenter &&
                (gisType === 1 || this.props.dingDian.DataGisType === 1) //1 TODO?
            ) {
                map.setZoom(18);
                map.panTo(centerPoint);
            }
            this.renderCamera(
                resPointArr,
                props.CurrentMode === 'search' && props.ids.length > 0 ? true : false
            );
        });
    };
    getFirstPicInMapCamera = (props, isChangeZoom) => {
        // if (isChangeZoom == true) {
        //     this.renderImgFromSearch(this.state.searchResult);
        //     return;
        // }
        const param = {
            nodeId: props.selectMenuData.menuId,
            nodeType: props.selectMenuData.menuType,
            cameraIds: props.cameraIds,
            forceSearch: props.forceSearch,
            // displayType: 'camera',
            placeTypeId: props.placeType,
            deviceType: props.deviceType,
            type: props.type,
            dataType: props.dataType,
            displayType: 'camera',
            faceId: props.ids.indexOf(',') !== -1 ? '' : props.ids,
            faceSize: 1,
            ids: props.ids.indexOf(',') === -1 ? '' : props.ids,
            mergeType: props.mergeType,
            scoreThreshold: props.scoreThreshold,
            starttime: props.starttime,
            endtime: props.endtime,
            dayStartTime: props.dayStartTime,
            dayEndTime: props.dayEndTime,
            weekDay: props.weekDay,
            quality: props.quality,
            gender: props.gender,
            genderConfidence: props.genderConfidence,
            age: props.age,
            race: props.race,
            raceConfidence: props.raceConfidence,
            hat: props.hat,
            hatConfidence: props.hatConfidence,
            glasses: props.glasses,
            glassesConfidence: props.glassesConfidence
        };
        request({
            url: api.FaceSearchFace,
            method: 'post',
            data: {
                ...param,
                urlParams: { page: 1, pagesize: 1000 }
            }
        }).then(res => {
            console.log('zml share/face/search,res', res);
            request({
                url: api.searchStatistic,
                method: 'post',
                data: {
                    ...param
                }
            }).then(countRes => {
                if (countRes && countRes.data && countRes.data.cameraStatistic) {
                    res.cameraStatistic = countRes.data.cameraStatistic;
                }
                console.log('zml 检索结果呐countRes,res', countRes, res);
                // 检索出来统计结果后重新渲染热力图
                var pointsArr = this.state.points;
                var pl = pointsArr.length;
                for (let i = 0; i < pl; i++) {
                    if (!res.cameraStatistic) {
                        continue;
                    }
                    var count = res.cameraStatistic[pointsArr[i].id] || 0;
                    pointsArr[i].count = count * 20; //为了热力图展示的更加明显
                    pointsArr[i].searchResult = count; //真实统计数
                    pointsArr[i].searchSrc = '';
                    if (res.data) {
                        for (let j = 0; j < res.data.length; j++) {
                            if (pointsArr[i].id == res.data[j].cameraId) {
                                pointsArr[i].searchSrc =
                                    res.data[j].cameraFaceInfoDtoList[0].file; //真实统计图片
                            }
                        }
                    } else {
                        pointsArr[i].searchSrc = ''; //真实统计图片
                    }
                }
                this.renderSingleMarkerDom();
                this.setState({
                        searchResult: res,
                        searchResultIds:
                            (res &&
                                res.cameraStatistic &&
                                Object.keys(res.cameraStatistic)) || [],
                        points: pointsArr,
                        isSetViewport: true,
                        isSearchFace: countRes.data && countRes.data.total ? true : false
                    },
                    () => {
                        // this.renderImgFromSearch(res);
                        if (this.state.hotMap.isShow) {
                            this.hotMapFun(this.state.map);
                        } else {
                            this.state.pointsMarkersArr.length &&
                                this.removeCamera(this.state.map);
                            this.renderCamera(
                                this.state.points,
                                props.CurrentMode == 'search' && props.ids.length > 0 ?
                                true :
                                false
                            );
                        }
                    }
                );
            });
        });
    };

    renderMarker = obj => {
        let ifSelect = '';
        //选中特定摄像头跳转至GIS增加跳动动效
        obj.id === this.props.selectedCameraId ?
            (ifSelect = 'camerabg-inmap godownout') :
            (ifSelect = 'camerabg-inmap');
        let isSearchFace = this.state.isSearchFace;
        let cluster = obj.cluster; //判断渲染的是集群cluster标记icon还是普通单摄像头的标记icon，单摄像头cluster为null
        let isdn = isSearchFace && cluster ? '' : 'dn';
        let tailId = cluster ? cluster._leaflet_id * 100 : obj.id;
        let htmlString = `<div class="camera-container-inmap cameraBox-${tailId}" title=${
      cluster ? cluster._leaflet_id * 100 : obj.name
    }>
      <div class="active faceBoxInMap ${isdn} newstyle" id="faceCameraBox-${tailId}">
        <span class="faceBoxInMap-sjx">
        </span>
        <span class="faceBoxInMap-count" id="faceBoxInMap-count-${tailId}">
          ${obj.count}
        </span>
        <img class="faceImgBoxInMap" id="faceImgCameraBox-${tailId}" src=${
      obj.src
    }>
      </div>
      <div class="${ifSelect}"></div>
    </div>`;
        let points = this.state.points;
        // if (isSearchFace && cluster) {
        if (cluster) {
            let bounds = cluster._bounds;
            let SouthWestLng = bounds._southWest.lng;
            let SouthWestLat = bounds._southWest.lat;
            let NorthEastLng = bounds._northEast.lng;
            let NorthEastLat = bounds._northEast.lat;
            let count = 0,
                cSrc = ''; //气泡图的src
            let titleName = '',
                titleNum = 0;
            //查看当前选中的cameraids
            let selecCam = [];
            this.state.pointListSelected.forEach(p => {
                selecCam.push(p.id);
            });
            //   console.log('zml bounds---', bounds);
            points.forEach((d, i) => {
                if (
                    d.lng >= SouthWestLng &&
                    d.lng <= NorthEastLng &&
                    d.lat >= SouthWestLat &&
                    d.lat <= NorthEastLat
                ) {
                    titleNum++;
                    if (selecCam.length && !selecCam.includes(d.id)) return; //防止检索camera选中情况下，其他camera结果也显示
                    count = count + d.searchResult;
                    if (d.searchSrc) {
                        cSrc = d.searchSrc;
                    }
                }
            });
            isdn = count ? '' : 'dn';
            titleName = cluster.getAllChildMarkers()[0].options.icon.options.point
                .name;
            let domId = cluster._leaflet_id * 100;
            htmlString = `<div class="camera-container-inmap cameraBox-${domId}" title='${titleName +
        intl.get('ANALYSIS_ADD_AREA_OVERLAPPING', {
          value: titleNum
        })}'>
                        <div class="active faceBoxInMap ${isdn} newstyle" id="faceCameraBox-${domId}">
                    <span class="faceBoxInMap-sjx">
                    </span>
                    <span class="faceBoxInMap-count" id="faceBoxInMap-count-${domId}">
                        ${count}
                    </span>
                    <img class="faceImgBoxInMap" id="faceImgCameraBox-${domId}" src=${cSrc}>
                </div>
                <div class="camerabg-inmap"></div>
            </div>`;
        }
        cluster &&
            setTimeout(() => {
                //聚合点标记渲染至地图后，重新进行筛选pointTempLayer操作
                const { pointListSelected, map } = this.state;
                if (pointListSelected.length) {
                    const layers = [];
                    map.eachLayer(layer => {
                        if (layer instanceof L.MarkerCluster) {
                            console.log('zml map layer is cluster', layer);
                            let jiaojiCluster = layer.getAllChildMarkers();
                            layers.push(...jiaojiCluster);
                        } else {
                            console.log('zml map eachlayer', layer);
                            layers.push(layer);
                        }
                    });
                    let layersFin = [...layers].filter(
                        l => !_.isEmpty(l.options) && l.options.hasOwnProperty('icon')
                    );
                    let pointTL = [...layersFin].filter(x => [...pointListSelected].some(
                        y => y.id === x.options.icon.options.point.id
                    ));
                    pointTL.forEach(ptl => {
                        ptl.options.icon.options.point.state = 1;
                        this.getIcon(ptl, 'add');
                    });
                    this.setState({
                        pointTempLayer: pointTL
                    });
                    console.log(
                        'zml cluster 标记icon渲染至地图后重新筛选pointTempLayer',
                        pointListSelected,
                        layers,
                        layersFin,
                        pointTL
                    );
                }
            }, 300);
        return L.divIcon({
            html: htmlString,
            point: obj.point
        });
    };
    renderSingleMarkerDom = () => {
        setTimeout(() => {
            //查看当前选中的cameraids
            let selecCam = [...this.props.cameraIds];
            this.state.points.forEach(p => {
                let pDom = document.getElementById('faceCameraBox-' + p.id);
                if (pDom && p.searchResult > 0) {
                    if (selecCam.length) {
                        selecCam.includes(p.id) &&
                            p.searchSrc &&
                            pDom.classList.remove('dn');
                    } else {
                        p.searchSrc && pDom.classList.remove('dn');
                    }
                    document.getElementById('faceBoxInMap-count-' + p.id).innerHTML =
                        p.searchResult;
                    document.getElementById('faceImgCameraBox-' + p.id).src = p.searchSrc;
                }
            });
        }, 100);
        //放大缩小渐变色
        setTimeout(() => {
            this.state.pointTempLayer.forEach((l, i) => {
                this.getIcon(l, 'add');
            });
        }, 400);
    };
    //放大缩小渐变色
    getIcon = (l, action) => {
        if (!l) return;
        if (l._icon && l._icon != null) {
            if (l._icon && l._icon.lastChild) {
                let iconClassList = l._icon.lastChild.lastElementChild.classList;
                if (action == 'add') {
                    if (l._icon.lastChild.children[0]) {
                        l._icon.lastChild.children[0].classList.add('active');
                    }
                    iconClassList.add('selected');
                } else if (action == 'remove') {
                    if (l._icon.lastChild.children[0]) {
                        l._icon.lastChild.children[0].classList.remove('active');
                    }
                    iconClassList.remove('selected');
                }
            }
        } else {
            this.getIcon(l.__parent, action);
        }
    };
    // 渲染摄像头标注物
    renderCamera = (resPointArr, isChangeZoom) => {
        console.log('zml leaflet renderCamera', resPointArr, isChangeZoom);
        // this.setState({
        //   searchProps: {
        //     cameraArr: resPointArr,
        //     props: this.props
        //   }
        // });
        isChangeZoom = isChangeZoom || false;
        let props = this.props;
        let _this = this; //地图里面this替换为了map的this

        const { map, pointsMarkersArr, points } = this.state;
        if (!resPointArr.length) {
            this.removeCamera(map);
            return;
        }
        //集群所包含的标注物
        let markerArr = [];
        pointsMarkersArr.length && this.removeCamera(this.state.map);

        //Leaflet.markercluster：https://github.com/Leaflet/Leaflet.markercluster
        //创建标注物集群对象
        var markers = L.markerClusterGroup({
            showCoverageOnHover: false, //悬停集群是否显示集群边界
            zoomToBoundsOnClick: false, //点击集群是否放大
            maxClusterRadius: 30, //集群的边界
            //创建集群的地图标记icon
            iconCreateFunction: function(cluster) {
                let objCluster = {
                    cluster: cluster,
                    id: '',
                    name: '',
                    src: '',
                    count: ''
                };
                return _this.renderMarker(objCluster);
            }
        });
        let cameraMarkers = [];
        //标注物集群添加具体标注物图层
        for (let i = 0; i < resPointArr.length; i++) {
            let pointLatLng = [resPointArr[i].lat, resPointArr[i].lng];
            let markerObj = {
                cluster: null,
                id: resPointArr[i].id,
                name: resPointArr[i].name,
                src: resPointArr[i].searchSrc || '',
                count: resPointArr[i].searchResult || '',
                point: resPointArr[i]
            };
            let marker = L.marker(pointLatLng, {
                //创建单摄像头的地图标注物icon
                icon: _this.renderMarker(markerObj)
            });
            // markers.latlng = { lat: resPointArr[i].lat, lng: resPointArr[i].lng };
            // markers.cameraId = resPointArr[i].id;
            cameraMarkers.push(markerObj);
            markers.addLayer(marker);
            markerArr.push(markers);
        }
        this.setState({
            cameraMarkers
        });
        //不修改原有逻辑，暂时还取最后一个摄像头点位作为集群的坐标
        markers.latlng = {
            lat: resPointArr[resPointArr.length - 1].lat,
            lng: resPointArr[resPointArr.length - 1].lng
        };
        markers.cameraId = resPointArr[resPointArr.length - 1].id;
        //为标注物集群添加事件
        markers.on('clusterclick', function(a) {
            let allChildMarker = a.layer.getAllChildMarkers();
            let pointList = []; //提取对应的点位信息
            let hash = {}; //hash值防止多余储存
            allChildMarker.forEach((d, i) => {
                let dlatlng = d._latlng;
                points.forEach((item, index) => {
                    if (!hash[item.id] &&
                        item.lat == dlatlng.lat &&
                        item.lng == dlatlng.lng
                    ) {
                        hash[item.id] = true;
                        pointList.push(item);
                    }
                });
            });
            console.log(
                'zml 摄像头点击 多重 cluster ' + a.layer.getAllChildMarkers().length,
                pointList,
                a.layer
            );
            _this.clickCamera(pointList, a.layer._latlng);
        });
        markers.on('click', function(a) {
            let dlatlng = a.layer._latlng;
            let singlePoint = [];
            points.forEach((ele, ind) => {
                if (ele.lat == dlatlng.lat && ele.lng == dlatlng.lng) {
                    singlePoint.push(ele);
                }
            });
            console.log('zml 摄像头点击 cluster ', a.layer, dlatlng, singlePoint);
            _this.clickCamera(singlePoint);
        });
        markers.on('clustermouseover', function(a) {
            console.warn(
                '当前点位包含' + a.layer.getAllChildMarkers().length + '个重叠的摄像头'
            );
        });

        if (
            props.CurrentMode == 'search' &&
            props.ids.length > 0 &&
            this.state.isFirstSearch
        ) {
            console.log(
                'zml renderCamera 第一次人脸搜索 isChangeZoom',
                props,
                isChangeZoom
            );
            this.setState({
                    isFirstSearch: false
                },
                () => {
                    this.getFirstPicInMapCamera(props, isChangeZoom);
                }
            );
        } else if (props.CurrentMode == 'search' && !props.ids.length) {
            let points = this.state.points;
            let pl = points.length;
            for (let j = 0; j < pl; j++) {
                points[j].searchSrc = ''; //真实统计图片
                points[j].searchResult = 0; //真实统计图片
            }
            this.removeCamera(this.state.map);
            this.setState({
                points
            });
        }
        //将集群添加至地图上
        map.addLayer(markers);
        this.setState({
                //保存所有摄像头点位的maeker
                pointsMarkersArr: markerArr
            },
            () => {
                const { pointListSelected, map } = this.state;
                if (pointListSelected.length) {
                    //热力图下的框选 _(:з」∠)_ 真BT啊啊
                    const layers = [];
                    map.eachLayer(layer => {
                        if (layer instanceof L.MarkerCluster) {
                            console.log('zml map layer is cluster', layer);
                            let jiaojiCluster = layer.getAllChildMarkers();
                            layers.push(...jiaojiCluster);
                        } else {
                            console.log('zml map eachlayer', layer);
                            layers.push(layer);
                        }
                    });
                    let layersFin = [...layers].filter(
                        l => !_.isEmpty(l.options) && l.options.hasOwnProperty('icon')
                    );
                    let pointTL = [...layersFin].filter(x => [...pointListSelected].some(
                        y => y.id === x.options.icon.options.point.id
                    ));
                    pointTL.forEach(ptl => {
                        ptl.options.icon.options.point.state = 1;
                        this.getIcon(ptl, 'add');
                    });
                    this.setState({
                        pointTempLayer: pointTL
                    });
                    console.log(
                        'zml 已有 热力图下的框选',
                        pointListSelected,
                        layers,
                        layersFin,
                        pointTL
                    );
                }
            }
        );
    };
    // 移除摄像头
    removeCamera = map => {
        const pointsMarkersArr = this.state.pointsMarkersArr;

        if (pointsMarkersArr && pointsMarkersArr.length > 0) {
            const l = pointsMarkersArr.length;
            for (let i = 0; i < l; i++) {
                map.removeLayer(pointsMarkersArr[i]);
            }
        }
        this.setState({
            pointsMarkersArr: [],
            searchResultIds: [],
            searchResult: null
        });
    };
    //渲染热力图
    hotMapFun = (map, points = this.state.points) => {
        let hasCount = points.some(m => m.captureCount > 0);

        if (!hasCount) {
            this.setState({
                hotMap: {
                    obj: null,
                    isShow: true
                }
            });
            return;
        } //leaflet hotmap count全0 也会显示热力图
        let heatmapData = {
            max: 0,
            data: points
        };
        let cfg = {
            radius: 30,
            maxOpacity: 0.8,
            scaleRadius: false,
            useLocalExtrema: true,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'captureCount'
        };
        let heatmapLayer = null;
        heatmapLayer = new HeatmapOverlay(cfg);
        map.addLayer(heatmapLayer);
        heatmapLayer.setData(heatmapData);
        this.setState({
            hotMap: {
                obj: heatmapLayer,
                isShow: true
            }
        });
    };
    // 热力图开关
    hotMap_ON_OFF = () => {
        const { map, points, hotMap } = this.state;
        if (this.state.hotMap.isShow) {
            hotMap.obj && map.removeLayer(hotMap.obj);
            this.setState({
                hotMap: {
                    obj: null,
                    isShow: false
                }
            });
            this.renderCamera(
                points,
                this.props.ids && this.props.ids.length > 0 ? true : false
            );
        } else {
            map.closePopup();
            this.removeCamera(map);
            this.hotMapFun(map, points);
        }
    };
    //点击摄像头
    clickCamera = (pointArr, latlng) => {
        if (!pointArr.length) return;
        const { changeRequestNum, CurrentMode, showTimeLineEvent } = this.props;
        const { map } = this.state;
        if (pointArr.length === 1) {
            if (CurrentMode === 'capture') {
                this.captureEvent({ type: 'name', point: pointArr[0] });
            } else if (CurrentMode === 'search') {
                this.setState({
                        currentClickCameraId: pointArr[0].id,
                        isCameraEventInMap: true,
                        pointListSelected: [],
                        pointTempLayer: [],
                        currentCameraFaceSize: pointArr[0].searchResult
                    },
                    () => {
                        showTimeLineEvent({
                            id: pointArr[0].id,
                            name: pointArr[0].name,
                            type: this.props.type
                        });

                        changeRequestNum && changeRequestNum();
                    }
                );
            }
        } else if (pointArr.length > 1) {
            //   console.log('zml 点击 多个摄像头，列表', pointArr, latlng);
            let _this = this;
            let div = (this._div = document.createElement('div'));
            div.className = 'google-camera-list-box';
            let tempLi = '';
            let opl = pointArr.length;
            for (let i = 0; i < opl; i++) {
                let countSpan = '';
                if (pointArr[i].searchResult > 0 && !this.state.hotMap.isShow) {
                    countSpan =
                        '<span class="listbox-cameracount">' +
                        pointArr[i].searchResult +
                        '</span>';
                }
                tempLi +=
                    "<li class='listbox-li'>" +
                    "  <h5 class='google-listbox-h5'><span class='listbox-camerabg' type='photo' index='" +
                    i +
                    "' title='点击查看点位安装图'></span><span class='listbox-cameraname' type='name' index='" +
                    i +
                    "' title='" +
                    pointArr[i].name +
                    "'>" +
                    pointArr[i].name +
                    '</span>' +
                    countSpan +
                    '</h5>' +
                    '</li>';
            }

            let title_h5 = (this._title_h5 = document.createElement('h5'));
            title_h5.innerHTML = intl.get('PLEASE_CHOOSE');
            title_h5.className = 'camera-box-title';
            div.appendChild(title_h5);

            let ul = (this._ul = document.createElement('ul'));
            ul.className = 'listbox-ul';
            ul.innerHTML = tempLi;
            div.appendChild(ul);
            let arrow = (this._arrow = document.createElement('span'));
            arrow.className = 'listbox-sjx';
            div.appendChild(arrow);
            ul.onmousewheel = function(e) {
                e.stopPropagation();
            };
            ul.onclick = function(e) {
                e.stopPropagation();
                // 监听回调函数传值
                if (
                    e.target.className === 'listbox-camerabg' ||
                    e.target.className === 'listbox-cameraname'
                ) {
                    let type = e.target.getAttribute('type');
                    let singlePoint = pointArr[e.target.getAttribute('index')];

                    if (CurrentMode === 'capture') {
                        _this.captureEvent({ type: type, point: singlePoint });
                    } else if (CurrentMode === 'search') {
                        _this.setState({
                                currentClickCameraId: singlePoint.id,
                                isCameraEventInMap: true,
                                pointListSelected: [], //清空之前已选，防止跳回来缩放报错
                                pointTempLayer: [],
                                currentCameraFaceSize: singlePoint.searchResult
                            },
                            () => {
                                showTimeLineEvent({
                                    id: singlePoint.id,
                                    name: singlePoint.name,
                                    type: _this.props.type
                                });

                                changeRequestNum && changeRequestNum();
                                // _this.isShowCameraBox([], -1); //取消box列表
                            }
                        );
                    }
                }
            };
            div.onmouseenter = e => {
                e.preventDefault();
                e.stopPropagation();
            };

            L.popup()
                .setLatLng(latlng)
                .setContent(div)
                .openOn(map);
        }
    };
    // 查看摄像头抓拍详情 or 查看摄像头照片
    captureEvent(res) {
            const id = res.point.id;
            const count = res.point.captureCount;
            const { selectItem, history } = this.props;
            selectItem(res.point);
            //改变路由
            let href = window.location.pathname + 'Detail';
            history.replace({
                pathname: href,
                state: { cameraId: id, captureCount: count }
            });
            this.setState({});
        }
        // 地图按钮分发器
    clickMain = (type, data) => {
        this[type](data);
    };
    // 框选
    drawRect = type => {
        if (this.state.openRect) {
            this.cancelDrawRect();
            return false;
        }
        let map = this.state.map;
        const lasso = L.lasso(map);
        lasso.enable();
        this.setState({
            openRect: true,
            lasso: lasso
        });
    };
    // 取消框选
    cancelDrawRect = () => {
        if (this.state.openRect) {
            let lasso = this.state.lasso;
            lasso && lasso.disable();
            this.setState({
                lasso: null,
                openRect: !this.state.openRect
            });
        }
    };

    // 设置地图右上角按钮的状态
    btnStateInMap(type, data) {
            // 先清除之前选择的状态，此处未判断之前是否选中，一律清除
            this.myDis && this.myDis.close();
            // this.cancelDrawRect();
            var typeString = type + (typeof data === 'boolean' ? '' : data);
            if (!data) {
                typeString = 'cancelDrawRect';
            }
            this.setState({
                toolStateString: typeString
            });
        }
        //检索模块---
        // 组件方法传入子组件，用于监听子组件返回的参数变化
    listenChildchange = (points, index) => {
        return function(points, index) {
            this.isShowCameraBox(points, index);
        }.bind(this);
    };
    // 框选弹窗判断
    isShowCameraBox = (points, index) => {
        // let cameraIds = points.filter(m => m.selected).map(m => m.id);
        //强行选中 selected 为空
        let cameraIds = [];
        for (let i = 0; i < points.length; i++) {
            if (i != index) {
                cameraIds.push(points[i].id);
            }
        }
        setTimeout(() => {
            this.props.onChangeCameraFilterFromMap(cameraIds);
            !cameraIds.length && this.getFirstPicInMapCamera(this.props, false);
        }, 300);

        let newPoint = this.state.pointListSelected;
        if (index != -1) {
            //减色与marker联动
            let pointTempLayer = this.state.pointTempLayer;
            pointTempLayer.forEach((tl, ti) => {
                let tlPoint = tl.options.icon.options.point;
                console.log('zml 循环', ti, tlPoint, tl);
                if (tlPoint.id == newPoint[index].id) {
                    tlPoint.state = 0; //重置icon内point
                    tl._icon && this.getIcon(tl, 'remove');
                    pointTempLayer.splice(ti, 1);
                }
            });
            newPoint.splice(index, 1);
        } else {
            newPoint = [];
            points = [];
            this.state.pointTempLayer.forEach((tl, ti) => {
                this.getIcon(tl, 'remove');
                tl.options.icon.options.point.state = 0; //重置icon内point
            });
            this.setState({
                pointTempLayer: []
            });
        }
        this.setState({
            pointListSelected: newPoint
        });

        if (points.length) {
            this.setState({
                isShowCameraBox: true
            });
        } else {
            this.removeCameraBoxAni();
        }
    };
    removeCameraBoxAni = () => {
        if (this.camera_selected_box) {
            ReactDOM.findDOMNode(this.camera_selected_box).className = 'camera-box';
            setTimeout(() => {
                if (ReactDOM.findDOMNode(this.camera_selected_box)) {
                    ReactDOM.findDOMNode(this.camera_selected_box).className =
                        'camera-box leftIn-off';
                }
            }, 20);
            setTimeout(() => {
                if (ReactDOM.findDOMNode(this.camera_selected_box)) {
                    ReactDOM.findDOMNode(this.camera_selected_box).className =
                        'camera-box';
                    this.setState({
                        isShowCameraBox: false
                    });
                }
            }, 500);
        }
    };

    jumpToAnalysis = e => {
        e.stopPropagation();
        // const {
        //   faceId,
        //   ids,
        //   scoreThreshold,
        //   type,
        //   mergeType,
        //   dataType,
        //   starttime,
        //   endtime,
        //   dayStartTime,
        //   dayEndTime,
        //   weekDay,
        //   quality,
        //   uploadFaceList
        // } = this.props;
        console.log('xxq-------', this.props);
        const {
            faceSize,
            cameraIds,
            forceSearch,
            uploadFaceList,
            placeTypeId,
            deviceTypeId,
            type,
            dataType,
            ids,
            mergeType,
            scoreThreshold,
            starttime,
            endtime,
            dayStartTime,
            dayEndTime,
            weekDay,
            quality,
            selectMenuData,
            genderConfidence, //过滤项，性别置信度
            raceConfidence, //过滤项，性别置信度
            hatConfidence, //过滤项，性别置信度
            glassesConfidence, //过滤项，性别置信度
            filterSelectedTags //已选择的属性（支持多选）
        } = this.props;
        const { menuId, menuType } = selectMenuData;

        const searchParam = {
            faceSize,
            nodeType: menuType,
            nodeId: menuId,
            cameraIds,
            forceSearch,
            displayType: 'score',
            placeTypeId,
            deviceTypeId,
            type,
            dataType,
            faceId: ids.split(',').length === 1 ? ids : '',
            ids: ids.split(',').length !== 1 ? ids : '',
            mergeType: uploadFaceList.length > 1 ? mergeType : 1,
            scoreThreshold,
            starttime,
            endtime,
            dayStartTime,
            dayEndTime,
            weekDay,
            quality,
            gender: filterSelectedTags
                .filter(v => {
                    return v.id === 'gender';
                })[0]
                .value.join(','), //过滤项，性别
            race: filterSelectedTags
                .filter(v => {
                    return v.id === 'race';
                })[0]
                .value.join(','), //过滤项，种族
            age: filterSelectedTags
                .filter(v => {
                    return v.id === 'age';
                })[0]
                .value.join(','), //过滤项，年龄
            hat: filterSelectedTags
                .filter(v => {
                    return v.id === 'hat';
                })[0]
                .value.join(','), //过滤项，帽子
            glasses: filterSelectedTags
                .filter(v => {
                    return v.id === 'glasses';
                })[0]
                .value.join(','), //过滤项，眼镜
            genderConfidence, //过滤项，性别置信度
            raceConfidence, //过滤项，性别置信度
            hatConfidence, //过滤项，帽子置信度
            glassesConfidence //过滤项，眼镜置信度
        };
        const { env } = window.$IF;
        //报存请求参数
        localStorage.setItem('SearchParams', JSON.stringify(searchParam));
        localStorage.setItem('UploadFaceData', JSON.stringify(uploadFaceList));
        window.open(`http://${env.host}/pathAnalysis`);
    };

    render() {
        const {
            CurrentMode,
            selectMenuData,
            starttime,
            endtime,
            dayStartTime,
            dayEndTime,
            weekDay,
            quality,
            gender, //过滤项，性别
            genderConfidence, //过滤项，性别置信度
            race, //过滤项，种族
            raceConfidence, //过滤项，性别置信度
            age, //过滤项，年龄
            hat, //过滤项，帽子
            hatConfidence, //过滤项，性别置信度
            glasses, //过滤项，眼镜
            glassesConfidence, //过滤项，性别置信度
            uploadFaceList
        } = this.props;
        const mapStyle = {
            overflow: 'hidden',
            position: 'relative',
            zIndex: 0,
            backgroundColor: 'rgb(243, 241, 236)',
            color: 'rgb(0, 0, 0)',
            textAlign: 'left'
        };
        return ( <
            div className = "loginWrap" > { this.state.isLoading ? < div className = "map-loading" / > : null } {
                CurrentMode === 'search' &&
                    this.state.isShowCameraBox && ( <
                        CameraBox points = { this.state.pointListSelected }
                        ref = {
                            div => {
                                this.camera_selected_box = div;
                            }
                        }
                        changeFun = { this.listenChildchange(this.state.pointListSelected) }
                        changeTipModalState = { this.props.changeTipModalState }
                        ids = { this.props.ids || '' }
                        cameraIds = { this.props.cameraIds }
                        />
                    )
            } {
                CurrentMode === 'capture' &&
                    !this.state.isShowCameraBox &&
                    selectMenuData.menuBankNo === 'YDCJ' && ( <
                        div className = "map-time-range" / >
                    )
            } {
                uploadFaceList.length > 0 ? ( <
                    div className = "map-tool-top" >
                    检索轨迹分析 <
                    div className = "eventTimeLine__mapShowOnOff"
                    onClick = { this.jumpToAnalysis } >
                    轨迹分析 <
                    /div> <
                    /div>
                ) : (
                    ''
                )
            } <
            h5 className = "map-tool-box map-tool-box-leaf" >
            <
            span onClick = {
                this.clickMain.bind(
                    this,
                    'hotMap_ON_OFF', !this.state.hotMap.isShow
                )
            }
            className = { `map-control map-control-icon relitu ${
              this.state.hotMap.isShow ? 'active' : ''
            }` } >
            {!this.state.hotMap.isShow ?
                intl.get('SHOW_HOT_MAP') :
                    intl.get('HIDE_HOT_MAP')
            } <
            /span>

            {
                CurrentMode === 'search' && ( <
                    span onClick = { this.clickMain.bind(this, 'drawRect', 'append') }
                    className = { `map-control map-control-icon kuangxuan ${
                this.state.toolStateString == 'drawRectappend' &&
                this.state.openRect
                  ? 'active'
                  : ''
              }` }
                    title = { intl.get('RECTANGLE_EXIT') } >
                    {
                        this.state.openRect ?
                        `${intl.get('CANCEL')} ${intl
                    .get('RECTANGLE')
                    .toLocaleLowerCase()}` :
                            intl.get('RECTANGLE')
                    } <
                    /span>
                )
            } <
            /h5>

            <
            div id = "mapContianer"
            className = "map-container"
            style = { mapStyle }
            /> <
            /div>
        );
    }
}

export default GoogleMapSearch;



// WEBPACK FOOTER //
// ./src/components/Map/GoogleMapSearch.js