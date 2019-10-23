const Koa = require('koa'),
    router = require('koa-router')(),
    db = require('./module/db.js');

const app = new Koa();


router.get('/', async function(ctx) {

    let data = await db.find('test', {});
    console.log(data);

});
app.use(router.routes());
app.listen(8080);