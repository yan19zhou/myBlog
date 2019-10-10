const url = require('url');
const http = require('http');

http.createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });

    // 打印出url的参数

    const result = url.parse(req.url, true);
    const id = result.query.id

    res.write("WELCOME NODE.JS ");
    // 只能write字符串
    res.write(id);
    res.end();
}).listen(8802);

// 安装supervisor 可以热更新