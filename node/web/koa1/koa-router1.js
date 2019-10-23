// 引入koa 
const koa = require('koa');
const router = require("koa-router")(); // 引入路由并实例化
// 实例化
const app = new koa();


// 配置路由
router.get('/', async(ctx) => {
    ctx.body = "这是一个首页";
}).get('/news', async(ctx) => {
    // 获取get传参
    console.log(ctx.query);
    ctx.body = "这是一个新闻页面";
});
// 动态路由
router.get('/news/:aid', async(ctx) => {
        // 获取动态路由aid
        console.log(ctx.params);

        ctx.body = "这是一个首页";
    })
    // 启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);