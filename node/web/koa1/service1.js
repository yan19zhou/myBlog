// 引入koa
const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

const views = require("koa-views");// 引入koa-views
const ejs = require('koa');

// 使用第三方中间件
app.use(views('views', { extension: 'ejs' }));

router.get('/login',async (ctx)=>{
    const list =['aaa','bbb','ccc'];
     await ctx.render('index',{
         list:list
     })
    
})
router.get('/index',(ctx)=>{
    ctx.body="Index 页面"
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);