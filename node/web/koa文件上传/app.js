const koa=require("koa")
const Router=require('koa-router')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const {upload}= require('upload.js')


const router=new Router()
const app=new koa()

// koa-body 中间插件 文件提交及form-data
app.use(koaBody({
    formLimit: '1mb',
    multipart: true, // 允许上传多个文件
    formidable: {
        maxFileSize:200 * 1024 * 1024, //上传文件大小
        keepExtensions: true, //  保存图片的扩展名
    }
}))
// 配置静态资源加载中间件
app.use(koaStatic(
    path.join("/f\upload") //读取静态文件目录
))

// Post
router.post('/login',async (ctx,next)=>{
    console.log('login Success!')
    //ctx.request.body 用于获取post的参数
    ctx.body=ctx.request.body;
})
//koa-router
app.use(upload()) //  路由
app.use(route).use(router.post('/upload',upload));  

app.listen(3000)