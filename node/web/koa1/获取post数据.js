// 引入模块
const Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),   
    bodyParser = require('koa-bodyparser'), 
    koaStatic = require('koa-static');//静态web服务中间件
const app = new Koa();
// 配置中间件
// 视图模板
app.use(views('views', {
    extension: 'ejs'
}));

// 请求数据获取
app.use(bodyParser());

// 静态资源处理中间件，可以配置多个,系统会挨个找
app.use(koaStatic('static'));
app.use(koaStatic('public'));

// 接口
router.get('/', async (ctx) => {
    await ctx.render('index');
})

router.post('/add', async (ctx) => {
    ctx.body = ctx.request.body
})
// 启动路由
app.use(router.routes());
app.use(router.allowedMethods());
// 监听端口
app.listen(3000);