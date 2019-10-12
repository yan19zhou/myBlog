const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

const mimeModel = require('./getMime');

http.createServer((req, res) => {
    // 读取文件然后显示到页面
    // 获取请求路径
    let pathName = url.parse(req.url).pathname;
    if (pathName == '/') {
        pathName = '/index.html' //  默认加载首页
    }
    // 获取文件后缀
    let extname = path.extname(pathName);

    //读取文件

    fs.readFile('static' + pathName, (err, data) => {
        if (err) {
            fs.readFile('static/404.html', (err, data404) => {
                res.writeHead(404, {
                    "Content-Type": "text/html;charset='utf-8'"
                })
                res.write(data404);
                res.end();
            })
        } else {
            let contentType = mimeModel.getMime(extname)
            res.writeHead(200, {
                "Content-Type": "" + contentType + ";charset='utf-8'"
            })
            res.write(data);
            res.end();
        }
    })
}).listen(8080)

