var Koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path'),
    url = require('url'),
    bodyParser = require('koa-bodyparser'),
    DB = require('./module/db.js');

var app = new Koa();

//配置post提交数据的中间件
app.use(bodyParser());

//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});

//显示学员信息
router.get('/', async (ctx) => {

    var result = await DB.find('use', {});

    // console.log(result);
    await ctx.render('index', {
        list: result
    });
})

router.get('/add', async (ctx) => {
    await ctx.render('add');
})

router.post('/doAdd', async (ctx) => {
    let result = ctx.request.body;
    let data = await DB.insert('use', result);
    if (data.result.ok) {
        ctx.redirect('/');
    } else {
        return;
    }
})

router.get('/edit', async (ctx) => {
    // 编辑页面，回显数据
    let id = ctx.query.id;

    let data = await DB.find('use', { "_id": DB.getObjectId(id) });
    console.log(data);

    if (data.length) {
        ctx.render('edit', {
            list: data[0]
        });
    } else {
        return;
    }
})

router.post('/doEdit', async (ctx) => {
    // 编辑提交
    // 获取post请求参数
    let data = ctx.request.body;
    let id = data.id;
    let result = await DB.update('use', { "_id": DB.getObjectId(id) }, data);
    if (result.result.ok) {
        ctx.redirect('/')
    } else {
        return;
    }
})

router.get('/delete', async (ctx) => {

    // 获取get请求参数
    let id = ctx.query.id;

    let data = await DB.remove('use', { "_id": DB.getObjectId(id) });

    if (data.result.ok) {
        ctx.redirect('/')
    } else {
        return;
    }
})

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);


