//store.js

const state = {
    account:{
        name:''
    }
}
const mutations = {
    getName(state,name){
        state.name = name;
    }
}
const actions = {
    getNameA(commit,{name}){
        axios.get('api').then((res)=>{
           const name =  res.data
           commit('getName',name)
        })
    }
}

new Vuex.Store({
    state,
    mutations,
    actions
})

//
new Vue({
    store,
    router,
    render:h=>h(App)
}).$mount("#app")

// 组件中使用
{mapActions} from 'vuex'

methods:{
    ...mapActions['getNameA'],
},
mounted(){
    this.getNameA()
}