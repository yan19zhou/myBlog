const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" })
    res.write("something");
    res.end();
}).listen(8080)
