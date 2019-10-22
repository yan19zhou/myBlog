const Koa = require('koa'),
    router = require('koa-router')();

const app = new Koa();

router.get('/', async function (ctx) {
    /* 
        koa中cookie不能存储汉字，所以在存储汉字时要先把汉字转换成base64格式，new Buffer('汉字').toString('base64');
        拿取的时候再将base64格式的数据转换成汉字new Buffer('base64格式的字符','base64').toString();
    
    */
   const name = new Buffer('张三').toString('base64');
    ctx.cookies.set('username',name,{
        maxAge:60*1000*60*24
    })
    ctx.body="this is a index page"
});
router.get('/news', async function (ctx) {
   let name = ctx.cookies.get('username')
   let username = new Buffer(name,'base64').toString();
    ctx.body="welcome:"+username
});
app.use(router.routes());
app.listen(8080);