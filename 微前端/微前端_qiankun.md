##### 微前端解决方案--qiankun

###### 主应用--下载及引用

> 只需要在主应用中下载qiankun

```javascript
npm i qiankun -s
// 主应用中main.js
import {  registerMicroApps,  start} from "qiankun";
import microApps from "../micro-app";
import {  loadMicroApp } from "qiankun";
// 在主应用中进行子应用的注册，如果在子页面中引用可以在子页面mounted中注册子应用
      registerMicroApps(microApps, {
            beforeLoad: (app) => {
                console.log("before load app.name====>>>>>", app.name);
            },
            beforeMount: [
                (app) => {
                    console.log(
                        "[LifeCycle] before mount %c%s",
                        "color: green;",
                        app.name
                    );
                },
            ],
            afterMount: [
                (app) => {
                    console.log(
                        "[LifeCycle] after mount %c%s",
                        "color: green;",
                        app.name
                    );
                },
            ],
            afterUnmount: [
                (app) => {
                    console.log(
                        "[LifeCycle] after unmount %c%s",
                        "color: green;",
                        app.name
                    );
                },
            ],
        });
        start();
```

> 在主应用中配置子应用

````javascript
// micro-app.js
const microApps = [
  {
    name: "data-q-new",//和子应用package.json的name一致
    entry:
      "http://10.32.41.142:8081/dataQuery?queryID=cd2235ac-8752-4443-9291-28dec5e98f5d",
    activeRule: "/sub-vue",
    container: "#subapp-viewport", // 子应用挂载的div
    props: {
      routerBase: "/sub-vue", // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
    },
  },
];

export default microApps;

// 主应用中vue-router的配置，如果在home页面引入子应用在路由配置和activeRule中配置的规则一致
const routes = [
  {
    path: "/sub-vue",
    name: "Home",
    component: Home,
  },
];
// 容器
<div id="subapp-viewport" />
````



###### 主应用路由配置

````javascript
// 添加隐藏路由匹配微应用中的跳转，使得主应用对于/sub-vue，/sub-vue/about匹配到的是同一个路由组件
const routes = [
  {
    path: "/sub-vue",
    name: "Home",
    component: Home,
    meta: {
      isMicrApp: true,
    },
  },
  {
    path: `/sub-vue/:micrAppRoute`, //匹配微应用内的路由跳转
    hidden: true,
    component: Home,
    name: "Home",
    meta: {
      title: "开发环境",
      isMicrApp: true,
    },
  },
];
````



###### 子应用

> 子应用渲染

````javascript
//main.js
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";//router.js只暴露routes
import store from "./store";
import "./public-path";
Vue.prototype._ = _;
Vue.use(ElementUI);

let instance = null;
function render(props = {}) {
  const { container, routerBase } = props;
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: "history",
    routes,
  });
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// qiankun子应用的生命周期
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
````



````javascript
//public-path.js
(function() {
  if (window.__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-undef
      __webpack_public_path__ = `//localhost:8081/`;
      return;
    }
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
})();
````



> 子应用vue.config.js

````javascript
// vue.config.js

const path = require("path");
const { name } = require("./package.json");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    output: {
      library: `${name}-[name]`,// 可以直接定义为应用name
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  publicPath: "./",
  outputDir: "dist",
  chainWebpack: (config) => { //防止主应用图片字体加载失效
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"));
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .options({})
      .end();
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .options({})
      .end();
  },
  // productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
    },
  },
  lintOnSave: false,
};
````

> 子应用路由

````javascript
const router = new VueRouter({
  mode: "history",
  base: window.__POWERED_BY_QIANKUN__ ? "/sub-vue" : "/", //匹配微应用路由
  routes,
});
````



##### 应用通信

>主-->子 (静态数据)

````javascript
// 主应用通过props下发数据
let myMsg={
	data:{},
	fn:[fn1(),]
}
 props: {
      myMsg
    },
 // 子应用通过钩子获取主应用的props挂载到实例
  export async function bootstrap(props = {}) {
    Array.isArray(props.fns) && props.fns.map(i => {
        Vue.prototype[i.name] = i[i.name]
    });
  }
  
````



> 主 ，子应用自己动态通信

````javascript
/*
1.先在主应用下载并引入rxjs；并创建我们的'呼机'
**/
import { Subject } from "rxjs"; // 按需引入减少依赖包大小
const pager = new Subject();
export default pager;
/*
2.然后在主应用main.js引入并注册呼机，以及将呼机下发给子应用
**/

  import pager from "./util/pager"           // 导入应用间通信介质：呼机

  pager.subscribe(v => {                // 在主应用注册呼机监听器，这里可以监听到其他应用的广播
    console.log(`监听到子应用${v.from}发来消息：`, v)
    store.dispatch('app/setToken', v.token)  // 这里处理主应用监听到改变后的逻辑
  })

  let msg = {                      // 结合下章主应用下发资源给子应用，将pager作为一个模块传入子应用
    data: store.getters,                     // 从主应用仓库读出的数据
    components: LibraryUi,                   // 从主应用读出的组件库
    utils: LibraryJs,                        // 从主应用读出的工具类库
    emitFnc: childEmit,                      // 从主应用下发emit函数来收集子应用反馈
    pager                                    // 从主应用下发应用间通信呼机
  };
  registerMicroApps(                         // 注册子应用
    [
      {
        name: "subapp-ui",
        entry: "//localhost:6651",
        render,
        activeRule: genActiveRule("/ui"),
        props: msg                           // 将上面数据传递给子应用
      }
    ])

/*
3.在子应用中注册呼机
**/
  export async function bootstrap({ components, utils, emitFnc, pager }) {
    Vue.use(components);                     // 注册主应用下发的组件
    
    Vue.prototype.$mainUtils = utils;        // 把工具函数挂载在vue $mainUtils对象
    
    Object.keys(emitFnc).forEach(i => {      // 把mainEmit函数一一挂载
      Vue.prototype[i] = emitFnc[i]
    });
    
    pager.subscribe(v => {               // 在子应用注册呼机监听器，这里可以监听到其他应用的广播
      console.log(`监听到子应用${v.from}发来消息：`, v)
      // store.dispatch('app/setToken', v.token)   // 在子应用中监听到其他应用广播的消息后处理逻辑
    })
    Vue.prototype.$pager = pager;             // 将呼机挂载在vue实例
  }

/*
4.在各应用中使用呼机动态传递信息
**/
  methods: {                        // 在某个应用里调用.next方法更新数据，并传播给其他应用
    callParentChange() {
      this.myMsg = "但若不见你，阳光也无趣";
      this.$pager.next({
        from: "subapp-ui",
        token: "但若不见你，阳光也无趣"
      });
    }
  }
````

















