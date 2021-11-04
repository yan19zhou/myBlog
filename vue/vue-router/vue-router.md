##### 钩子
###### 全局钩子
```js
beforeEach
afterEach
```

##### 导航守卫
```js
参数 to  from next
全局钩子 beforeEach(全局前置守卫)， beforeResolve(全局解析守卫)， afterEach(后置钩子，不会接收next函数)
路由钩子  beforeEnter  beforeLeave
组件内钩子  beforeRouteEnter beforeRouteLeave  beforeRouteUpdate
beforeRouteEnter(to,from,next){
    //此时组件对象没有创建，只能通过next中的参数vm来获取组件对象
    next(vm=>{

    })
}
```
导航被触发-->在失活的组件中调用beforeRouteLeave -->调用全局导航守卫beforeEach --->在重新调用的组件中触发beforeRouteUpdate
-->在路由中触发beforeEnter -->解析异步路由--> 在激活组件中调用beforeRouteEnter -->beforResolve -->导航被确认
--> dom更新-->用创建好的实例调用beforeRouteEnter中的next回调

#####  使用props获取路由中的参数

    routes:[
        path:'path/:id',
        props:true // 则在组件中可以通过props获取id的值
    ] 
    // 组件中
    props:['id']
    this.id // 获取id的值

##### 同一页面多个router-view
    <template>
        <router-view name='a'></router-view>
        <router-view ></router-view>
    </template>
    //router
    components:
        {
            default:Page,
            a:Login
        }

##### history:
	使用h5的history.pushState({},'',url)
	获取location.pathName判断路径来执行逻辑

##### 单页应用的原理
		路由模式使用 hash，相当于在本页跳转(类似锚点)；

##### params,query传递参数
		params只能通过name引入，query可以通过path或者name引入 
		this.$router.push({
			path:'/path',
			query:{
				id:"123"
			}
		}
		// localhost:8080/index?id=123
		this.$router.push({
			name:'name',
			params:{
				id:"123"
			}
		} 
		// localhost:8080/index/123
		
		1.使用params传参只能用name来引入路由，即push里面只能是name:'xxxx',不能是path:’/xxx’,因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！。
		1.使用query传参使用path来引入路由。
		1.params是路由的一部分，必须要在路由后面添加参数名。query是拼接在url后面的参数，没有也没关系。
		1.二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示

##### 路由懒加载
		1.es6 import
			()=>import('@/components/helloWorld');
		
		2.vue的异步组件，require()方法
			resolve =>require(['@/components/helloWorld'],resolve);
		3.异步组件+webpack的ensure()方法。(按需加载+js打包分离)
			r => require.ensure([],()=>r(require('@/components/helloWorld')),'helloWorld')

##### vue官方的 懒加载+打包分离
		用import的懒加载+webpaCkchunkName打包分离
		1.需要安装 cnpm i -s @babel/plugin-syntax-dynamic-import
		2.配置webpack，在webpack-base-conf.js的output加入chunkFilename: ‘[name].js’ 
		
		()=>import(/* webpackChunkName: "MyFile" */'@/components/helloWorld')


​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		
​		