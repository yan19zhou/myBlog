/* 
 *中间件 next()
 */
// 引入koa 
const koa = require('koa');
const router = require("koa-router")(); // 引入路由并实例化
// 实例化
const app = new koa();

//  koa中间件
// 应用中间件 所有路由执行前会执行这个中间件
app.use((ctx, next) => {
        //执行路由匹配前操作
        console.log("1路由执行前");
        // 继续匹配下面的路由
        next();
        // 路由匹配后操作,在执行路由中代码之后执行这段代码，比如处理路由错误：
        if (ctx.status == 404) {
            ctx.body = '这是一个404页面';
        }
    })
    // 配置路由
router.get('/', async(ctx, next) => {
    ctx.body = "这是一个首页";
    next(); // 路由中间件
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