/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { message, notification } from 'antd';
import axios from 'axios';
import intl from 'react-intl-universal';
import { searchReasonConfig } from '../../utils/config';
import request from '../../utils/request';
import { api } from '../../constants/Api';

const propTypes = {};

function dataUriToBlob(dataURI) {
    // serialize the base64/URLEncoded data
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // parse the mime type
    var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];
    // construct a Blob of the image data
    var array = [];
    for (var i = 0; i < byteString.length; i++) {
        array.push(byteString.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
        type: mimeString
    });
}
class UploadSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragEntered: false // 是否拖进区域了
        };

        this.inputRef = null;
        this.uploadWrapRef = null;
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.dropRequestNum !== nextProps.dropRequestNum) {
            this.onDropFace({ stopPropagation: () => {} });
        }
        const { showOrHideReason, searchStateChange } = this.props;
        // if (!searchReasonConfig && nextProps.dragData.dataType == 100) {
        // 	if (
        // 		JSON.stringify(nextProps.dragData) != '{}' &&
        // 		JSON.stringify(this.props.dragData) !=
        // 			JSON.stringify(nextProps.dragData)
        // 	) {
        // 		searchStateChange(nextProps.dragData);
        // 	}
        // }
        // 多人脸剪裁传入的剪裁图片？？
        if (
            JSON.stringify(this.props.transferInfo) !=
            JSON.stringify(nextProps.transferInfo)
        ) {
            if (nextProps.transferInfo && nextProps.transferInfo.faceId) {
                this.props.simpleCropperQuickUploadFaceList(
                    [nextProps.transferInfo],
                    this.props.uploadFaceList
                );
                return;
            }

            //自主剪裁的
            if (nextProps.transferInfo.faceUrl) {
                const formData = new FormData(); //转blob类似手动上传
                formData.append('file', dataUriToBlob(nextProps.transferInfo.faceUrl));
                let uploadFaceList = this.props.uploadFaceList;
                let _this = this;
                axios
                    .post(
                        window.$IF.env.apiBaseURL +
                        '/api/intellif/image/upload/true?type=0',
                        formData, {
                            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary1iOYBeqDFSAW6hF1'
                        }
                    )
                    .then(function(resp) {
                        console.log('zml 人像检索中的多人脸剪裁返回的res', resp);
                        if (resp.data.errCode == 0) {
                            let resData = resp.data.data;
                            if (resData.faces == 1) {
                                //发起请求...numchange待加入？？
                                _this.props.ifaceImage(resData, uploadFaceList);
                            } else if (resData.faces > 1 || resData.faces == 0) {
                                // message.error(intl.get('TAILOR_ERROR_TIP1'));
                                let key = 'TAILOR_ERROR_TIP1';
                                notification.error({
                                    key,
                                    message: intl.get('ERROR_TIP'),
                                    description: intl.get('TAILOR_ERROR_TIP1')
                                });
                            } else if (resData.faces < -1) {
                                // message.error(intl.get('TAILOR_ERROR_TIP2'));
                                let key = 'TAILOR_ERROR_TIP2';
                                notification.error({
                                    key,
                                    message: intl.get('ERROR_TIP'),
                                    description: intl.get('TAILOR_ERROR_TIP2')
                                });
                            } else if (resData.faces == -1) {
                                // message.error(intl.get('TAILOR_ERROR_TIP3'));
                                let key = 'TAILOR_ERROR_TIP3';
                                notification.error({
                                    key,
                                    message: intl.get('ERROR_TIP'),
                                    description: intl.get('TAILOR_ERROR_TIP3')
                                });
                            }
                        } else {
                            // XXX: 后台需要支持国际化
                            // message.error(resp.data.data);
                            let key = resp.data.data;
                            notification.error({
                                key,
                                message: intl.get('ERROR_TIP'),
                                description: resp.data.data
                            });
                        }
                    });
            }
        }
    }
    onUploadBtn = e => {
        e.stopPropagation();
        const { uploadFaceList, changeTipModalState } = this.props;
        console.log('点击了上传', e.target);
        if (uploadFaceList.length < 5) {
            this.inputRef && this.inputRef.click();
        } else {
            changeTipModalState({ visible: true, msg: intl.get('UPLOAD_ERROR_TIP') });
        }
    };
    //影响到了拖拽检索先注释（注释后会导致从页面外拖动图片功能会失效）
    /* componentDidMount() {
      document
        .getElementById('searchSystem_uplaodSearch')
        .addEventListener('drop', this.onUploadFileChange);
    } */
    onUploadFileChange = e => {
        e.preventDefault();
        e.stopPropagation();
        const {
            uploadFace,
            uploadFaceList,
            changeTipModalState,
            showOrHideReason,
            preSearchStateChange,
            preSearchStateChangeOther,
            showOrHideRedPop,
            cropFace
        } = this.props;

        const fileList = e.target.files || e.dataTransfer.files;
        if (fileList.length > 0) {
            let formData = new FormData();
            formData.append('file', fileList[0]);

            this.uploadSelectedFile(formData)
                .then(res => {
                    // 上传图片
                    if (res && res.errCode == 0) {
                        // 成功
                        if (res.data.faces == 1 || res.data.faces == -1) {
                            // 一张头像或者红名单头像
                            let isRedFace = res.data.faces == -1;
                            // let isRedFace = true; // FIXME

                            // 获取头像信息
                            this.getUploadFaceInfo(res.data.id)
                                .then(imgRes => {
                                    let data = imgRes.data[0];

                                    let { id, sourceId, imageData } = data;

                                    let dragData = {
                                        faceId: id,
                                        faceUrl: imageData,
                                        dataType: 100
                                    };
                                    let redPopInfo = {
                                        rId: res.data.faceList[0].forbiden,
                                        sId: sourceId,
                                        redUrl: res.data.redUri
                                    };
                                    // // FIXME
                                    // let redPopInfo = {
                                    // 	rId: id,
                                    // 	sId: sourceId,
                                    // 	redUrl: imageData
                                    // }

                                    let needShowSearchReason =
                                        searchReasonConfig && uploadFaceList.length == 0;

                                    let showRedPopBefore = uploadFaceList.some(
                                        item => item.isRedFace
                                    );
                                    if (isRedFace && !showRedPopBefore) {
                                        // 显示红名单
                                        if (needShowSearchReason) {
                                            showOrHideReason(
                                                needShowSearchReason,
                                                dragData,
                                                redPopInfo
                                            );
                                        } else {
                                            // 当不显示红名单确认后对话框，则必须手动调用preSearchStateChange
                                            showOrHideReason(false, dragData, redPopInfo);
                                            // 显示红名单
                                            showOrHideRedPop({
                                                show: true,
                                                info: redPopInfo
                                            });
                                        }
                                    } else {
                                        if (needShowSearchReason) {
                                            showOrHideReason(true, dragData);
                                        } else {
                                            // 当不显示红名单确认后对话框，则必须手动调用preSearchStateChange
                                            showOrHideReason(false, dragData);
                                            if (uploadFaceList.length == 0) {
                                                preSearchStateChange(dragData);
                                            } else {
                                                preSearchStateChangeOther(dragData);
                                            }
                                        }
                                    }
                                })
                                .catch(err => {
                                    changeTipModalState({
                                        msg: err.message || '',
                                        visible: true
                                    });
                                });
                        } else if (res.data.faces > 1) {
                            // 多张头像
                            let currentData = {
                                fromImageId: res.data.id,
                                imageData: res.data.uri,
                                id: res.data.id
                            };
                            cropFace(currentData);
                        } else {
                            // 没有头像
                            changeTipModalState({
                                msg: intl.get('UPLOADED_NO_FACES'),
                                visible: true
                            });
                        }
                    } else {
                        // 失败
                        changeTipModalState({
                            msg: res.data,
                            visible: true
                        });
                    }
                })
                .catch(err => {
                    this.$ifde.error(err, 'UploaderSearch error when upload file');
                    console.error(err, 'UploaderSearch error when upload file');
                    changeTipModalState({
                        msg: err.message || '',
                        visible: true
                    });
                });
            // if (searchReasonConfig) {
            //
            // } else {
            // 	uploadFace(formData, uploadFaceList);
            // }

            e.target.value = '';
        }
    };
    onClickRemoveUploadFace = (data, e) => {
        e.stopPropagation();
        const {
            decUploadFace,
            changeSearchState,
            uploadFaceList,
            changeRequestNum,
            resetDingDianSearch,
            resetShiPinSearch,
            resetYiDongSearch,
            resetZhongDianSearch,
            changeYtFaceData,
            hideCidInfo
        } = this.props;
        resetZhongDianSearch({
            zhongDianPage: 1
        });

        // 判断一下是否有cid，有的话清空cid检索
        if (data.cid) {
            hideCidInfo && hideCidInfo();
        }

        if (uploadFaceList.length == 1) {
            changeSearchState(false, 0);
            decUploadFace(data);
            resetDingDianSearch({
                dingDianSearchPage: 1,
                dingDianSearchPagesize: 10
            });
            resetShiPinSearch({
                shiPinPage: 1,
                shiPinPagesize: 10
            });
            resetYiDongSearch({
                yiDongPage: 1,
                yiDongPagesize: 10
            });
            changeYtFaceData(Object.create(null)); //人像融合的ytData清空
            //退出检索状态时，设置重置展示方式为默认相似度展示

            //此处把Tag 清空。
            this.props.onResetFilter();
            changeRequestNum({
                displayType: 'score'
            });
        } else {
            decUploadFace(data);
            resetDingDianSearch({
                dingDianSearchPage: 1
            });
            resetShiPinSearch({
                shiPinPage: 1
            });
            resetYiDongSearch({
                yiDongPage: 1
            });
            changeRequestNum();
        }
    };
    //chrome 的bug, 使用onDrop事件必须添加onDragOver事件，且在onDragOver中添加该代码才能被监听
    onDragOverFace = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';

        if (this.uploadWrapRef) {
            // 判断是否有class
            if (!this.uploadWrapRef.classList.contains('dragEnter')) {
                this.uploadWrapRef.classList.add('dragEnter');
            }
        }
        this.setState({
            isDragEntered: true
        });

        return false;
    };
    onDropFace = e => {
        e.stopPropagation();

        // 恢复状态
        if (this.uploadWrapRef) {
            // 判断是否有class
            if (this.uploadWrapRef.classList.contains('dragEnter')) {
                this.uploadWrapRef.classList.remove('dragEnter');
            }
        }
        this.setState({
            isDragEntered: false
        });

        const {
            dragData,
            preAddUploadFace,
            uploadFaceList,
            changeTipModalState,
            changeDragState,
            changeRequestNum,
            resetDingDianSearch,
            resetShiPinSearch,
            resetYiDongSearch,
            resetZhongDianSearch,
            showOrHideReason,
            searchStateChange,
            preSearchStateChange,
            changeSearchState,
            ids,
            preSearchStateChangeOther
        } = this.props;
        console.log('扔进来了', dragData, ids);
        changeDragState({
            drag: false,
            dragData
        });
        if (Object.keys(dragData).length < 1 || !dragData.faceId) {
            return;
        }

        let needShowSearchReason = searchReasonConfig && uploadFaceList.length == 0;

        // 此时红名单信息是其他地方获取
        if (needShowSearchReason) {
            showOrHideReason(true, dragData);
        } else {
            if (uploadFaceList.length == 0) {
                preSearchStateChange(dragData);
            } else if (uploadFaceList.length > 0 && uploadFaceList.length < 5) {
                preSearchStateChangeOther(dragData);
            } else {
                changeTipModalState({
                    visible: true,
                    msg: intl.get('UPLOAD_ERROR_TIP')
                });
            }
        }
    };

    onDragLeave = e => {
        console.log('on Drag Leave');
        console.log(this.uploadWrapRef);
        if (this.uploadWrapRef) {
            // 判断是否有class
            if (this.uploadWrapRef.classList.contains('dragEnter')) {
                this.uploadWrapRef.classList.remove('dragEnter');
            }
        }

        this.setState({
            isDragEntered: false
        });
    };
    render() {
        const { drag, uploadFaceList, changeDragState } = this.props;

        return ( <
            div id = "searchSystem_uplaodSearch"
            onDrop = { this.onDropFace }
            onDragOver = { this.onDragOverFace }
            onDragLeave = { this.onDragLeave } >
            <
            ul style = {
                { width: uploadFaceList.length * 120 + 120 } }
            className = "uplaodSearch_faceList clearfix" >
            {
                uploadFaceList.map((value, index) => {
                    return ( <
                        li className = "uplaodSearch_faceItem"
                        key = { index } >
                        <
                        div className = "faceWrap" >
                        <
                        div className = "deepEye_hoverRemove"
                        onClick = { this.onClickRemoveUploadFace.bind(this, value) }
                        /> <
                        img src = { value.faceUrl }
                        alt = { intl.get('FACE_IMAGE') }
                        onDragStart = {
                            changeDragState &&
                            changeDragState.bind(this, {
                                drag: true,
                                dragData: {
                                    faceId: value.faceId,
                                    faceUrl: value.faceUrl,
                                    dataType: value.dataType,
                                    cid: value.cid
                                }
                            })
                        }
                        onDragEnd = {
                            changeDragState &&
                            changeDragState.bind(this, {
                                drag: false,
                                dragData: {
                                    faceId: value.faceId,
                                    faceUrl: value.faceUrl,
                                    dataType: value.dataType
                                }
                            })
                        }
                        /> <
                        /div> <
                        /li>
                    );
                })
            } {
                uploadFaceList.length < 5 && ( <
                    li id = "uplaodSearch_uploadBtn"
                    className = "uplaodSearch_faceItem" > {!drag ? ( <
                            div id = "uploadWrap"
                            className = "faceWrap"
                            onClick = { this.onUploadBtn }
                            ref = { node => (this.uploadWrapRef = node) } >
                            <
                            div className = "upload_tip"
                            title = {
                                this.state.isDragEntered ?
                                intl.get('DROP_DOWN_IMAGE') :
                                    intl.get('UPLOAD_IMAGE')
                            } >
                            {
                                this.state.isDragEntered ?
                                intl.get('DROP_DOWN_IMAGE') :
                                    intl.get('UPLOAD_IMAGE')
                            } <
                            /div> <
                            input type = "file"
                            id = "uploadFile"
                            onClick = {
                                e => {
                                    e.stopPropagation();
                                }
                            }
                            ref = { node => (this.inputRef = node) }
                            onChange = { this.onUploadFileChange }
                            /> <
                            /div>
                        ) : ( <
                            div id = "dragCanWrap" >
                            <
                            span id = "dragCan" / >
                            <
                            p > { intl.get('DROP_IMAGE') } < /p> <
                            /div>
                        )
                    } <
                    /li>
                )
            } <
            /ul> <
            /div>
        );
    }

    uploadSelectedFile(formData) {
        return request({
            url: '/api/intellif/image/upload/true?type=0',
            method: 'upload',
            data: formData
        }).then(res => {
            return res;
        });
    }

    getUploadFaceInfo(id) {
        return request({
            url: api.imageFaceServer,
            method: 'get',
            data: {
                urlParams: {
                    id: id
                }
            }
        });
    }
}

UploadSearch.propTypes = propTypes;

export default UploadSearch;



// WEBPACK FOOTER //
// ./src/components/SearchSystem/UploadSearch.js