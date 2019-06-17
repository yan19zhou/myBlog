#### axios
##### 请求
    axios.get('/api',{
        params:{a:1}
        }).catch(function(res){
            if(res instanceof Error){
                ...
            }else{
                ...
            }})
    axios.post('/api',data).then((res)=>{}).catch((res)=>{})
    axios.put
         .head
    axios.all([req1(),req2()]).
    then(axios.spread((res1,res2)=>{
        ...
    }))

##### 创建实例
    const instance = axios.create({
        baseURL:'https//',
        headers:{}
    })
    instance.get('/api')...
##### 基础配置 
    instance.default.baseURL = ''
    instance.default.headers.common['Authorization'] = 'Auth_token'
    instance.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

##### 拦截器
    axios.interceptors.request.use(function(config){
        config.headers['Authorization'] = 'token'
        return config
    },function(err){
        return Promise.reject(err)
    })

    axios.interceptors.response.use(function(res){
        return res
    },function(err){
        return Promise.reject(err)
    })