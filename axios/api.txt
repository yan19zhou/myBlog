import axios from 'axios';
import router from '@/router';
import store from '@/store';
import Message from 'vue-multiple-message';

let qs = require('qs');
window.g = {
  apiSetting: {
    baseURL:   'http://localhost:8000/api/',  
    
    timeout: 10000,
    lang: "en"
  }
};
var apiConfig = window.g.apiSetting;

// 设置全局axios默认值
axios.defaults.timeout = 5000; // 5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建一个axios实例
const instance = axios.create({
  baseURL: '/api/', // (process.env.NODE_ENV === 'production' ? './api/' : '/api/'), // apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    var token = store.state.userToken;
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  res => {
    var msg = '';
    switch (res.status) {
      case 401:
        store.commit('LOGIN_OUT');
        router.replace({
          path: '/login', // 跳转到登录页面
          query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
        msg = res.data.message;
        break;
      case -1:
        msg = res.data.message;
        break;
      case 200:
        break;
    }
    if (msg !== '') {
      Message({
        showClose: true,
        message: msg,
        type: 'warning'
      });
      console.log('拦截器' + msg);
    } else {
      return res;
    }
  },
  err => {
    // 默认除了2XX之外的都是错误的，就会走这里
    if (err.response) {
      var res = err.response;
      if (res.status === 401) {
        Message({
          showClose: true,
          message: '请求授权已失效，请重新获取！', // JSON.stringify(err)
          type: 'error'
        });
        store.commit('LOGIN_OUT');
        router.replace({
          path: '/login', // 跳转到登录页面
          query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
        throw new Error('请求授权已失效，请重新获取！');
      } else {
        Message({
          showClose: true,
          message: res.statusText,
          type: 'error'
        });
      }
      console.log('拦截器 Error ' + JSON.stringify(err));
    } else {
      Message({
        showClose: true,
        message: '网络超时异常！',
        type: 'error',
      });
      throw new Error('网络异常！'); // err.message
    }
    return Promise.reject(err);
  }
);

function $postToken(url, data) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      withCredentials: true,
    })
      .then(res => {
        let data = res.data;
        if (data.code === 200 || data.code === 201) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(err => {
        var msg = JSON.stringify(err);
        if (!msg && msg !== '{}') {
          Message({
            showClose: true,
            message: JSON.stringify(err),
            type: 'error',
          });
        }
        console.log('postToken Error ' + JSON.stringify(err));
      });
  });
}

function $get(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params: data })
      .then(res => {
        let data = res.data;
        if (data.code === 200 || data.code === 201) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(err => {
        var msg = JSON.stringify(err);
        if (!msg && msg !== '{}') {
          Message({
            showClose: true,
            message: JSON.stringify(err),
            type: 'error',
          });
        }
        console.log('Get Error ' + JSON.stringify(err));
      });
  });
}

/**
 * Post 请求API接口数据
 * @param {string} url  API 接口地址
 * @param {*} data  API 接口地址
 */
function $post(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then(res => {
        let data = res.data;
        if (data.code === 200 || data.code === 201) {
          return resolve(data);
        } else {
          return reject(data);
        }
      })
      .catch(err => {
        var msg = JSON.stringify(err);
        if (!msg && msg != '{}') {
          Message({
            showClose: true,
            message: JSON.stringify(err),
            type: 'error'
          });
        }
        console.log('Post Error: ' + JSON.stringify(err));
      });
  });
}

/**
 * 加载Net图片
 * @param {string} url API 接口地址
 * @param {*} data API 接口参数
 */
function $getImage(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: data,
        responseType: 'arraybuffer'
      })
      .then(res => {
        var imgBase64 =
          'data:image/png;base64,' +
          btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        return resolve(imgBase64);
      })
      .catch(err => {
        var msg = JSON.stringify(err);
        if (!msg && msg != '{}') {
          Message({
            showClose: true,
            message: JSON.stringify(err),
            type: 'error',
          });
        }
        console.log('Get Image Error: ' + JSON.stringify(err));
      });
  });
}

/**
 * Post 请求API接口数据
 * @param {string} url  API 接口地址
 * @param {*} data  API 接口参数
 */
/* eslint-disable no-unused-vars */
function $postFile(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        let data = res.data;
        if (data.code === 200 || data.code === 201) {
          return resolve(data);
        } else if (data.code === -1) {
          Message({
            showClose: true,
            message: JSON.stringify(data.message),
            type: 'error'
          });
        } else {
          return reject(data);
        }
      })
      .catch(err => {
        var msg = JSON.stringify(err);
        if (!msg && msg !== '{}') {
          Message({
            showClose: true,
            message: JSON.stringify(err),
            type: 'error'
          });
        }
        console.log('Post Error: ' + JSON.stringify(err));
      });
  });
}

/**
 * 提取接口数据
 * @param {string} method 调用方法名
 * @param {string} url API 接口地址
 * @param {*} data API 接口参数
 */
function $fetch(method, url, data) {
  if (method === 'get') {
    return $get(url, data);
  } else {
    return $post(url, data);
  }
}
// 登录获取token
export const login = param => { return $postToken('User/login', param); };
// 获取小区列表
export const getCommunityList = param => { return $fetch('get', 'User/GetUserCommunityList', param); };
// 首页获取值班信息
export const getTodayDutyInfo = params => { return $fetch('get', `duty/GetToDayDuty`, params); };
// 首页获取当前小区统计信息
export const getCommunityStaticInfo = params => { return $fetch('get', `Home/GetCommunityStatic`, params); };
// 首页获取建议及投诉列表
export const getSuggestAndComplaintList = params => { return $fetch('get', `question/GetQuestionPagedList`, params); };
// 首页获取图表统计数据
export const getDayFlowChart = params => { return $fetch('get', `Home/Get24HourseList`, params); };
// 首页获取设备报警列表
export const getDeviceAlarmList = params => { return $fetch('get', `alarm/GetADevicePagedList`, params); };
// 首页获取人脸抓拍列表
export const getDoorSnapList = params => { return $fetch('get', `Face/GetFaceList`, params); };
// 首页获取车辆抓拍列表
export const getVehicleSnapList = params => { return $fetch('get', `alarm/GetAVehicleList`, params); };
// 首页获取小区统计信息
export const getCommunityStaticEx = params => { return $fetch('get', `Home/GetCommunityStaticEx`, params); };
// 全文检索查询
export const search = params => { return $fetch('get', `query/Seach`, params); };
// 全文检索查询历史关键字
export const searchHistory = params => { return $fetch('get', `alarm/GetADevicePagedList`, params); };
// 获取楼栋单元房间树
export const getAreaTree = params => { return $fetch('get', `area/GetAreaTree`, params); };
// 基础信息分页获取房号列表
export const getRoomPageList = params => { return $fetch('get', `area/GetRoomPageList`, params); };
// 基础信息分页获取发卡信息列表
export const getCardPageList = params => { return $fetch('get', `card/GetCardPageList`, params); };
// 根据ID删除卡片
export const deleteCard = params => { return $fetch('get', `Card/DeleteCard`, params); };
// 根据ID编辑卡片
export const editCard = params => { return $fetch('post', `Card/EditCard`, params); };
// 基础信息分页获取住户信息列表
export const getRoomUserPageList = params => { return $fetch('get', `area/GetRoomUserPageList`, params); };
// 根据ID删除住户信息
export const deleteRoomUser = params => { return $fetch('get', `area/DeleteRoomUser`, params); };
// 获取物业缴费信息
export const getPayPagedList = params => { return $fetch('get', `LifeService/GetPayPagedList`, params); };
// 获取水电气信息
export const getLifePagedList = params => { return $fetch('get', `LifeService/GetLifePagedList`, params); };
// 根据小区ID 获取单元楼信息
export const getBuildListFromCommunity = params => { return $fetch('get', `Area/GetBuildListFromCommunity`, params); };
// 根据单元ID 获取房间信息
export const getRoomListFromBuildId = params => { return $fetch('get', `Area/GetRoomListFromBuildId`, params); };

// 民生服务获取缴费记录列表

// 民生服务获取水电气记录列表

// 民生服务获取关爱老人列表
export const getSpecialList = params => { return $fetch('get', `person/GetSpecialList`, params); };
// 民生服务获取缴费服务列表
export const getLifeListByRoomId = params => { return $fetch('get', `lifeService/GetLifeListByRoomId`, params); };
// 民生服务获取关爱老人人脸检索列表、民生服务获取关爱老人的活动轨迹
export const getSpecialCrowdFaceList = params => { return $fetch('get', `face/GetSpecialCrowdFaceList`, params); };
// 安全防范获取人员布控列表
export const getMPersonPagedList = params => { return $fetch('get', `monitior/GetMPersonPagedList`, params); };
// 安全防范人员布控

// 安全防范获取车辆布控列表
export const getVehicleMonitiorPageList = params => { return $fetch('get', `monitior/GetMVehiclePagedList`, params); };
// 安全防范车辆布控

// 安全防范获取人员报警列表
export const getPersonAlarmPageList = params => { return $fetch('get', `alarm/GetAPersonPagedList`, params); };
// 安全防范获取车辆报警列表
export const getVehicleAlarmPageList = params => { return $fetch('get', `alarm/GetAVehiclePagedList`, params); };
// 智慧巡更获取安保巡更列表（废弃的）
// 智慧巡更获取视频巡更设备树列表
export const getDeviceTree = params => { return $fetch('get', `Device/GetDeviceTreeList`, params); };

// 视频监控设备树列表
export const getVideoTreeList = params => { return $fetch('get', `Device/GetVideoTreeList`, params); };
// 首页视频墙
export const getAllVideoWallList = params => { return $fetch('get', `Device/GetAllVideoWallList`, params); };

// 智慧巡更获取电子巡更列表
export const getProtrolPageList = params => { return $fetch('get', `protrol/GetProtrolRecordPagedList`, params); };
// 通行留影获取门禁出入列表
export const getAccessPageList = params => { return $fetch('get', `record/GetAccessPagedList`, params); };
// 通行留影获取车辆出入列表
export const getVehicleRecordPageList = params => { return $fetch('get', `record/GetVehiclePagedList`, params); };
// 人员管理获取党员信息列表
export const getPartyPageList = params => { return $fetch('get', `Person/GetPartyPagedList`, params); };
// 人员管理获取关爱、关注人员列表
export const getSpecialPersonPageList = params => { return $fetch('get', `Person/GetPagedList`, params); };
// 车辆车库分页获取车辆记录列表
export const getVehiclePageList = params => { return $fetch('get', `vehicle/GetVehiclePagedList`, params); };
// 车辆车库分页获取车位列表
export const getParkPageList = params => { return $fetch('get', `vehicle/GetParkPagedList`, params); };

// new车辆车库分页获取车位列表
export const GetParkSpaceExPagedList = params => { return $fetch('get', `vehicle/GetParkSpaceExPagedList`, params); };
// new车辆车库分区列表
export const GetParkingAreaList = params => { return $fetch('get', `vehicle/GetParkingAreaList`, params); };
// new根据车库ID获取车库详情
export const GetParkingSpaceExFromId = params => { return $fetch('get', `vehicle/GetParkingSpaceExFromId`, params); };
// new根据区域获取车位列表
export const GetAreaParkingSpaceInfo = params => { return $fetch('get', `vehicle/GetAreaParkingSpaceInfo`, params); };
// new根据车库ID获取车库基本信息
export const GetParkingSpaceFromId = params => { return $fetch('get', `vehicle/GetParkingSpaceFromId`, params); };

// 平台运维设备运维获取设备数量总值
export const getDeviceStatistics = params => { return $fetch('get', `Device/GetDeviceStatistics`, params); };
// 平台运维 设备运维当年异常设备统计
export const getDeviceAbnormalStatistics = params => { return $fetch('get', `device/GetDeviceYearAlarm`, params); };
// 平台运维 设备运维各类设备状态正常统计
export const getDeviceNormalStatistics = params => { return $fetch('get', `device/GetDeviceNormal`, params); };
// 平台运维设备运维获取设备状态
export const getDeviceStatusList = params => { return $fetch('get', `Device/GetDeviceStatusList`, params); };
// 平台运维设备运维根据年Month获取值班日志
export const getDutyByMonth = params => { return $fetch('get', `duty/GetDutyByMonth`, params); };
// 平台运维设备运维获取值班日志列表
export const getDutyLogList = params => { return $fetch('get', `duty/GetDutyLogList`, params); };

// 各类设备报警统计数
export const getDeviceAlarmStatistics = params => { return $fetch('get', `Alarm/GetDeviceAlarmStatistics`, params); };
// 各类设备报警统计图表
export const getReport = params => { return $fetch('get', `Alarm/GetReport`, params); };

// 视频人脸检索树列表
export const getFaceCameraList = params => { return $fetch('get', `Device/GetFaceCameraList`, params); };
// 人脸快照
export const getFaceSnaps = params => { return $fetch('get', `Face/GetFaceSnaps`, params); };
// 上传检索图片和起止日期、阈值
export const postFaceSeach = params => { return $fetch('post', `Face/GetFaceSeach`, params); };

/**
 * 验证图形验证码
 * @param {*} params 接口参数 {登录用户名:xxx,图形验证码:xxx}
 */
export const verifyPhotoCode = params => { return $fetch('get', `User/VerifyPhotoCode`, params); };

/**
 * 获取图形验证码
 * @param {string} params 登录用户名
 */
export const getVierifyCode = params => { return $getImage(`User/GetVierifyCode`, params); };

// 删除房间数据
export const deleteRoom = params => { return $fetch('get', `Area/DeleteRoom`, params); };
// 编辑房间数据
export const editRoom = params => { return $fetch('post', `Area/EditRoom`, params); };

// 物业管理-公布发布api
export const getPublishPagedList = params => { return $fetch('get', `Bulletin/GetBulletinPagedList`, params); };
export const getQuestionPagedList = params => { return $fetch('get', `Question/GetQuestionPagedList`, params); };

// 后台管理api

// 获取视频设备厂家信息
export const getVideoDeviceFactory = params => { return $fetch('get', `Device/GetVideoDeviceFactory`, params); };
// 根据视频设备厂家查询设备信息
export const getDeviceList = params => { return $fetch('get', `Device/GetDeviceList`, params); };
// 新增视频设备信息
export const addVideoChannelInfo = params => { return $fetch('post', `Device/AddVideoChannelInfo`, params); };
// 编辑视频设备信息
export const editVideotDeviceInfo = params => { return $fetch('post', `Device/EditVideotDeviceInfo`, params); };
// 新增视频设备信息
export const deleteVideoDeviceInfo = params => { return $fetch('get', `Device/DeleteVideoDeviceInfo`, params); };
// 获取部门列表
export const getDepartment = params => { return $fetch('get', `Department/GetDepartment`, params); };
// 新增部门
export const addDepartment = params => { return $fetch('post', `Department/AddDepartment`, params); };
// 删除部门
export const deleteDepartment = params => { return $fetch('get', `Department/DeleteDepartment`, params); };
// 删除部门
export const editDepartment = params => { return $fetch('post', `Department/EditDepartment`, params); };
// 根据部门获取部门成员
export const getDeptMember = params => { return $fetch('get', `Department/GetDeptMember`, params); };
// 添加部门成员
export const addDeptMember = params => { return $fetch('post', `Department/AddDeptMember`, params); };
// 删除部门成员
export const deleteDeptMember = params => { return $fetch('get', `Department/DeleteDeptMember`, params); };
// 修改部门成员
export const editDeptMember = params => { return $fetch('post', `Department/EditDeptMember`, params); };

// 删除车辆管理
export const deleteVehicleInfo = params => { return $fetch('get', `Vehicle/DeleteVehicleInfo`, params); };
// 编辑车辆信息
export const editVehicleInfo = params => { return $fetch('post', `Vehicle/EditVehicleInfo`, params); };
// 新增车辆信息
export const addVehicleInfo = params => { return $fetch('post', `Vehicle/AddVehicleInfo`, params); };
// 新增车库信息
export const addParkingInfo = params => { return $fetch('post', `Vehicle/AddParkingInfo`, params); };
// 编辑车库信息
export const editParkingInfo = params => { return $fetch('post', `Vehicle/EditParkingInfo`, params); };
// 删除车库信息
export const deleteParkingInfo = params => { return $fetch('get', `Vehicle/DeleteParkingInfo`, params); };

// new新增车库信息
export const AddParkingSpaceInfo = params => { return $fetch('post', `Vehicle/AddParkingSpaceInfo`, params); };
// new编辑车库信息
export const EditParkingSpaceInfo = params => { return $fetch('post', `Vehicle/EditParkingSpaceInfo`, params); };
// new删除车库信息
export const DeleteParkingSpaceInfo = params => { return $fetch('get', `Vehicle/DeleteParkingSpaceInfo`, params); };

// 添加人员布控
export const mpersonInsert = params => { return $fetch('post', `Monitior/MPersonInsert`, params); };
// 添加图片上传
export const imageUpLoad = params => { return $fetch('post', `Monitior/ImageUpLoad`, params); };
// 用户操作日志
export const getOperateLog = params => { return $fetch('get', `Logs/GetOperateLog`, params); };
// 获取车辆道闸设备信息
export const getVehicleGateList = params => { return $fetch('get', `Device/GetVehicleGateList`, params); };
// 新增车辆道闸信息
export const addVehicleGateInfo = params => { return $fetch('post', `Device/AddVehicleGateInfo`, params); };
// 删除车辆道闸
export const deleteVehicleGateInfo = params => { return $fetch('get', `Device/DeleteVehicleGateInfo`, params); };
// 编辑车辆道闸信息
export const editVehicleGateInfo = params => { return $fetch('post', `Device/EditVehicleGateInfo`, params); };
// 获取设备数据信息
export const getDeviceInfoList = params => { return $fetch('get', `Device/GetDeviceInfo`, params); };
// 获取字典列表
export const getDictionaryPagedList = params => { return $fetch('get', `Dictionary/GetDictionaryPagedList`, params); };

// 用户分页列表
export const getUserPagedList = params => { return $fetch('get', `User/GetUserPagedList`, params); };
// 新增或修改用户
export const saveUserInfo = params => { return $fetch('post', `User/Save`, params); };
// 删除用户
export const deleteUserInfo = params => { return $fetch('get', `User/DeleteUserInfo`, params); };

// 根据住户ID 获取住户信息
export const getRoomUserFromId = params => { return $fetch('get', `Area/GetRoomUserFromId`, params); };
// 获取住户信息 {communityId:'', buildId:'', unitId:'', roomId:''}
export const getRoomUser = params => { return $fetch('get', `Area/GetRoomUser`, params); };
// 根据住户ID 统计开门方式
export const getRoomUserUnLockRepord = params => { return $fetch('get', `Record/GetRoomUserRecordAccessUnLockTypeRepord`, params); };
// 根据住户ID 年各Month份开门次数统计
export const getRoomUserAccessRepord = params => { return $fetch('get', `Record/GetRoomUserRecordAccessRepord`, params); };
// 获取住户开门记录分页
export const getRoomUserRecordPageList = params => { return $fetch('get', `Record/GetRoomUserRecordAccessPageList`, params); };
// 抓拍机管理 获取小区人脸抓拍机分页
export const getFaceCameraPagedList = params => { return $fetch('get', `Device/GetFaceCameraPagedList`, params); };
// 抓拍机管理 新增设备信息
export const addFaceCameraInfo = params => { return $fetch('post', `Device/AddFaceCameraInfo`, params); };
// 抓拍机管理 编辑设备信息
export const editFaceCameraInfo = params => { return $fetch('post', `Device/EditFaceCameraInfo`, params); };
// 抓拍机管理 删除设备信息
export const deleteFaceCameraInfo = params => { return $fetch('get', `Device/DeleteFaceCameraInfo`, params); };

// 增加 门禁机管理
export const addDeviceInfo = params => { return $fetch('post', `Device/AddDeviceInfo`, params); };
// 编辑 门禁机管理
export const editDeviceInfo = params => { return $fetch('post', `Device/EditDeviceInfo`, params); };
// 删除 门禁机管理
export const deleteDeviceInfo = params => { return $fetch('get', `Device/DeleteDeviceInfo`, params); };
// 获取巡更巡逻组列表
export const getVideoGroupList = params => { return $fetch('get', `Device/GetVideoGroupList`, params); };
// 新增巡更组
export const addVideoGroupInfo = params => { return $fetch('post', `Device/AddVideoGroupInfo`, params); };
// 修改巡更组
export const editVideoGroupInfo = params => { return $fetch('post', `Device/EditVideoGroupInfo`, params); };
// 修改巡更组
export const deleteVideoGroupInfo = params => { return $fetch('get', `Device/DeleteVideoGroupInfo`, params); };
// 新增巡更设备
export const addVideoDeviceInfo = params => { return $fetch('post', `Device/AddVideoDeviceInfo`, params); };
// 获取门禁记录 {communityId:'', buildId:'', unitid:'', roomId:'', pageIndex:1, pageSize:10}
export const getAccessRecord = params => { return $fetch('get', `LifeService/GetAccessRecord`, params); };
// 根据车牌号获取车辆通行记录 {vehicleNo:'', pageIndex:1, pageSize:10}
export const getVehicleRecord = params => { return $fetch('get', `LifeService/GetVehicleRecord`, params); };
// 根据小区id，楼栋id、单元id查询租客房间List {communityId:'1',buildId:'',unitId:'',page:1,limit:10}
export const getTenantPageList = params => { return $fetch('get', `Area/GetTenantPageList`, params); };
// 根据小区id，楼栋id、单元id查询租房管理信息List {communityId:'1',buildId:'',unitId:'',page:1,limit:10}
export const getRentalHouseList = params => { return $fetch('get', `Area/GetRentalHouseList`, params); };
// 根据Month份、人数预排班 {communityId:'1', month:'12', num:1}
export const setPrescheduled = params => { return $fetch('get', `Duty/SetPrescheduled`, params); };
