const http = require('http');
const app = require("./express-route")
// 引入mongodb服务
const mongoClient = require("mongodb").
//定义链接字符串

app.get('login',(req,res)=>{
    console.log("")
    res.send("login~")
})

http.createServer(app).listen(3000)