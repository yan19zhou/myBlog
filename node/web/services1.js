const http = require('http');

const router = require('./router/router.js');

http.createServer((req, res) => {
    // 调用路由文件中对url的处理
    router.statics(req, res, 'static')

}).listen(8088)

