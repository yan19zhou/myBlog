/* 
封装类似express框架的get post请求
*/
const http = require('http');
const url = require('url');

// 创建app
let G = {}
let app = function(req, res) {
    let pathname = url.parse(req.url).pathname;
    // G的key统一格式/地址/

    if (!pathname.endsWith('/')) {
        pathname = pathname + '/';
    }

    // 调用G[pathname]方法；
    if (G[pathname]) {
        G[pathname](req, res);
    } else {
        res.end('no router');
    }

}

// 定义get方法
app.get = function(str, callback) {

    if (!str.startsWith('/')) {
        str = '/' + str;
    }
    if (!str.endsWith('/')) {
        str = str + '/';
    }
    G[str] = callback;
}

app.get('login', function(req, res) {
        console.log("login");
        res.end('login');

    })
    // 创建服务并传入app，每次请求的时候都会执行app函数
http.createServer(app).listen(3000);