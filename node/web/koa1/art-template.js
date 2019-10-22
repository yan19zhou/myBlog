const Koa = require('koa'),
    router = require('koa-router')(),
    path = require('path'),
    render = require('koa-art-template');

    const app = new Koa();

    render(app, {
        root: path.join(__dirname, 'views'),
        extname: '.html',
        debug: process.env.NODE_ENV !== 'production'
      });
      
      router.get('/',async function (ctx) {
          let list ={
              name:"标题",
              items:["11","aa","bb"],
              num:15
          }
        await ctx.render('index',{
            list:list
        });
      });
      app.use(router.routes());
      app.listen(8080);