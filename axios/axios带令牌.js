import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { ERR_OK } from '@/public/conflg'
import md5 from 'js-md5'
import {
    Message
} from 'element-ui';
const service = axios.create({
        baseURL: process.env.API_HOST, // api的base_url
        // withCredentials: false, // 允许携带cookie
        timeout: 6000, // request timeout
        // headers: undefined
        // headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // headers: {'Content-Type': 'multipart/form-data'}
    })
    //生成随机数
function getNonceStr() {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var result = "";
    for (var i = 0; i < 15; i++) {
        var r = Math.floor(Math.random() * 62); //取得0-62间的随机数，目的是以此当下标取数组data里的值！
        result += data[r]; //输出15次随机数的同时，让rrr加15次，就是15位的随机字符串了。
    }
    var now = new Date();
    var day = now.getDate() + "" + now.getHours() + "" + now.getMinutes() + "" + now.getSeconds();
    return day + result;
}
// 生成签名
function getSign(appkey, apptoken, noncestr, usertoken) {

    var str = "appkey=" + appkey + "&apptoken=" + apptoken + "&noncestr=" + noncestr + (!usertoken ? "" : "&usertoken=" + usertoken);
    var sign = md5(str).toUpperCase()
    return sign;
}

// 隐藏loading
export function hideLoading() {
    setTimeout(store.commit("SET_LOADING", false, ""), 600);
}
// 弹窗包装
export function message(message, type, showClose) {
    Message({
        showClose: showClose || true,
        message: message,
        type: type
    });
}

// 请求拦截
service.interceptors.request.use(config => {
        let appkey = '5da4c102310190497f4e6bbd51c0e7ba'
        let url = config.url.slice(config.url.lastIndexOf('/') + 1)
        if (config.method === 'get' && config.data) {
            config.url = `${config.url}?${qs.stringify(config.data)}`
        }
        if (url == 'GetAppToken') {
            config.headers.noncestr = getNonceStr()
            config.headers.sign = getSign(appkey, '', config.headers.noncestr, '')
        } else {
            config.headers.apptoken = store.state.user.AppToken
            config.headers.usertoken = store.state.user.userToken
            config.headers.noncestr = getNonceStr()
            config.headers.sign = getSign(appkey, config.headers.apptoken, config.headers.noncestr, config.headers.usertoken)
        }
        store.commit("SET_LOADING", true, "")
        return config
    }, error => {
        // Do something with request error

        console.log('请求拦截', error) // for debug
        Promise.reject(error)
    })
    // 接口状态列表：
    // 1 操作成功
    // -1 操作失败
    // -2 接口参数Sign错误
    // -3 非法请求
    // -4 接口参数数据验证失败
    // -5 接口参数AppToken过期或不存在
    // -6 重复请求
    // -7 用户无权限访问
    // -8 App无权限访问
    // -9 用户未登录
    // 返回拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        hideLoading()
        if (res.status !== 1 && res.msg) {
            message(res.msg, "error")
            if (res.status === -5 || res.status === -6 || res.status === -9) {
                router.push({ name: "login" })
            }
            return Promise.reject(res.msg)
        } else {
            return res.data
                // switch (res.status) {
                //     case -1:
                //         // store.commit("LOGIN_OUT");
                //         message("请求参数类型错误！", "error")
                //         return Promise.reject(res.message)
                //         break;
                //     case 1:
                //         message("检测到您未登录！", "error")
                //         router.replace({
                //             path: "/login", // 跳转到登录页面
                //             query: {
                //                 redirect: router.currentRoute.fullPath
                //             } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                //         });
                //         break;
                //     case 2:
                //         message("未传入token！", "error")
                //         return Promise.reject(res.message)
                //         break;
                //     case 3:
                //         message("登录超时！", "error")
                //         router.replace({
                //             path: "/login", // 跳转到登录页面
                //             query: {
                //                 redirect: router.currentRoute.fullPath
                //             } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                //         });
                //         break;
                //     default:
                //         return res.data
                //         break;
                // }
        }


    },
    error => {
        hideLoading()
        store.commit('UPDATE_LOADING', false)
        if (error.response) {
            let res = error.response.status;
            console.log(error.response)
            switch (res) {
                case 404:
                    message("请求类型错误或未找到接口！", "error")
                    break;

                default:
                    break;
            }
        } else {
            message("网络超时异常！", "error")
            throw new Error("网络异常！", error);
        }
        return Promise.reject(error)
    })

export default service