import axios from 'axios'
import QS from 'qs'
import store from './../store'
import { resolve } from 'url';
// 设置公共属性
axios.defaults.baseURL = 'https://elm.cangdu.org';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器中设置配置
axios.interceptors.request.use(
    config => {
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    err => {
        return Promise.error(err)
    }
)
// 响应拦截器
axios.interceptors.response.use(
    res => {
        if (res.status == 200) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    },
    err => {
        if (err.response.status) {
            switch (err.response.status) {
                case 404:
                    router.replace({
                        path: '/404',
                        name: '404'
                    })
            }
        }
    }

)
export const ajax = (url, type = 'GET', dataType = 'json', params) => {

    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params)).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err.data)
        })
    })
}