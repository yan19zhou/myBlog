#### node的web框架
    // 引入koa,引入的是一个class
    let Koa = require('koa');
    // 创建一个Koa对象，代表web app
    let app = new Koa();
    app.use(ansync(ctx,next)=>{
        await next();//将要处理的下一个异步函数
        ctx.response.type='text/html';
        ctx.response.body = 'data';

    })

##### koa-router处理URL
    const Koa = require('koa');

    // 注意require('koa-router')返回的是函数:
    const router = require('koa-router')();

    const app = new Koa();

    // log request URL:
    app.use(async (ctx, next) => {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
        await next();
    });

    // add url-route: 如果是post请求则使用router.post()
    router.get('/hello/:name', async (ctx, next) => {
        var name = ctx.params.name;
        ctx.response.body = `<h1>Hello, ${name}!</h1>`;
    });

    router.get('/', async (ctx, next) => {
        ctx.response.body = '<h1>Index</h1>';
    });

    // add router middleware:
    app.use(router.routes());

    app.listen(3000);
    console.log('app started at port 3000...');
##### koa-bodyparser用来解析原始request body 把解析好的参数绑定到ctx.request.body中
    const bodyParser = require('koa-bodyparser');
    app.use(bodyParser())
    //由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
