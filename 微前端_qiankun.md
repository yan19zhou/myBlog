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



###### 子应用

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



##### 子应用手动加载





















