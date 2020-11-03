##### 钩子
###### 全局钩子
    beforeEach
    afterEach

##### 导航守卫
    参数 to  from next
    全局钩子 beforeEach beforeResolve afterEach
    路由钩子  beforeEnter  beforeLeave
    组件内钩子  beforeRouteEnter beforeRouteLeave  beforeRouteUpdate
    beforeRouteEnter(to,from,next){
        //此时组件对象没有创建，只能通过next中的参数vm来获取组件对象
        next(vm=>{

        })
    }


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

