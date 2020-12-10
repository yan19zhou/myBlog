axios
	1.axios全局配置默认值
		axios.defaults.baseURL = 'https://api.example.com';
		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
	2.实例默认配置
		// 创建实例时修改配置
		var instance = axios.create({
		  baseURL: 'https://api.example.com'
		});

		// 实例创建之后修改配置
		instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

	3.axios的all合并请求
		 const req1 = this.axios.get("/api/exercise",{
										params: {
										  ID: 12345
										}
									  });
		 const req2 = this.axios.post("/api/add", {
										firstName: 'Fred',
										lastName: 'Flintstone'
									  })
			this.axios.all([req1,req2]).then(this.axios.spread((res1,res2)=>{
			  console.log(res1)
			  console.log(res2)
			})).catch(err=>{
			  console.log(err)
			}) 
			
	// spread ES6方法，把数组转换成用逗号隔开的参数序列
	4.拦截器
	// 添加一个请求拦截器
		axios.interceptors.request.use(function (config) {
			// Do something before request is sent
			return config;
		  }, function (error) {
			// Do something with request error
			return Promise.reject(error);
		  });

		// 添加一个响应拦截器
		axios.interceptors.response.use(function (response) {
			// Do something with response data
			return response;
		  }, function (error) {
			// Do something with response error
			return Promise.reject(error);
		  });
		// 清除对应拦截器
		var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
		axios.interceptors.request.eject(myInterceptor);
	5.错误处理
		axios.get('/user/12345')
		  .catch(function (error) {
			if (error.response) {
			  // 发送请求后，服务端返回的响应码不是 2xx   
			  console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.headers);
			} else if (error.request) {
			  // 发送请求但是没有响应返回
			  console.log(error.request);
			} else {
			  // 其他错误
			  console.log('Error', error.message);
			}
			console.log(error.config);
		  });

		  
		  
	ps:在使用axios时，注意到配置选项中包含params和data两者，以为他们是相同的，实则不然。 因为params是添加到url的请求字符串中的，用于get请求。 
		而data是添加到请求体（body）中的， 用于post请求。

		
		
6.axios封装	
	
	第一步还是先下载axios

	cnpm install axios -S
	 

	第二步建立一个htttp.js

	/**axios封装
	 * 请求拦截、相应拦截、错误统一处理
	 */
	import axios from 'axios';
	import QS from 'qs';
	import { Toast } from 'vant';
	import store from '../store/index'

	// 环境的切换
	if (process.env.NODE_ENV == 'development') {    
		axios.defaults.baseURL = '/api';
	} else if (process.env.NODE_ENV == 'debug') {    
		axios.defaults.baseURL = '';
	} else if (process.env.NODE_ENV == 'production') {    
		axios.defaults.baseURL = 'http://api.123dailu.com/';
	}

	// 请求超时时间
	axios.defaults.timeout = 10000;

	// post请求头
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

	// 请求拦截器
	axios.interceptors.request.use(    
		config => {
			// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
			// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
			const token = store.state.token;        
			token && (config.headers.Authorization = token);        
			return config;    
		},    
		error => {        
			return Promise.error(error);    
		})

	// 响应拦截器
	axios.interceptors.response.use(    
		response => {        
			if (response.status === 200) {            
				return Promise.resolve(response);        
			} else {            
				return Promise.reject(response);        
			}    
		},
		// 服务器状态码不是200的情况    
		error => {        
			if (error.response.status) {            
				switch (error.response.status) {                
					// 401: 未登录                
					// 未登录则跳转登录页面，并携带当前页面的路径                
					// 在登录成功后返回当前页面，这一步需要在登录页操作。                
					case 401:                    
						router.replace({                        
							path: '/login',                        
							query: { redirect: router.currentRoute.fullPath } 
						});
						break;
					// 403 token过期                
					// 登录过期对用户进行提示                
					// 清除本地token和清空vuex中token对象                
					// 跳转登录页面                
					case 403:                     
						Toast({                        
							message: '登录过期，请重新登录',                        
							duration: 1000,                        
							forbidClick: true                    
						});                    
						// 清除token                    
						localStorage.removeItem('token');                    
						store.commit('loginSuccess', null);                    
						// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
						setTimeout(() => {                        
							router.replace({                            
								path: '/login',                            
								query: { 
									redirect: router.currentRoute.fullPath 
								}                        
							});                    
						}, 1000);                    
						break; 
					// 404请求不存在                
					case 404:                    
						Toast({                        
							message: '网络请求不存在',                        
							duration: 1500,                        
							forbidClick: true                    
						});                    
					break;                
					// 其他错误，直接抛出错误提示                
					default:                    
						Toast({                        
							message: error.response.data.message,                        
							duration: 1500,                        
							forbidClick: true                    
						});            
				}            
				return Promise.reject(error.response);        
			}       
		}
	);
	/** 
	 * get方法，对应get请求 
	 * @param {String} url [请求的url地址] 
	 * @param {Object} params [请求时携带的参数] 
	 */
	export const get =(url, ...params)=>{    
		return new Promise((resolve, reject) =>{        
			axios.get(url, {            
				params: params        
			})        
			.then(res => {            
				resolve(res.data);        
			})        
			.catch(err => {            
				reject(err.data)        
			})    
		});
	}
	/** 
	 * post方法，对应post请求 
	 * @param {String} url [请求的url地址] 
	 * @param {Object} params [请求时携带的参数] 
	 */
	export const post = (url,... params) =>{    
		return new Promise((resolve, reject) => {         
			axios.post(url, QS.stringify(...params))        
			.then(res => {            
				resolve(res.data);        
			})        
			.catch(err => {            
				reject(err.data)        
			})    
		});
	}


	第三步

	在main.js中引入


	import axios from 'axios'
	import {post,get,patch,put} from './utils/http'
	//定义全局变量
	Vue.prototype.$post=post;
	Vue.prototype.$get=get;
	Vue.prototype.$patch=patch;
	Vue.prototype.$put=put;


	最后在组件里直接使用

	 mounted(){
		this.$fetch('/api/v2/movie/top250')
		  .then((response) => {
			console.log(response)
		  })
	  },
		
	7.axios获取二进制数据
	this.axios.get(url,{
	  responseType: 'blob'
	}).then(res) {
		var src  = window.URL.createObjectURL(res.data);
		//src 就是一个可以显示图片的相对路径。因为window.URL.crateObjectURL(blob)已经进行了转换
	}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		