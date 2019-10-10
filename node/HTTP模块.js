/* 
    引入node中的http模块
*/
const http = require('http');

/* 
    通过引入的http模块创建一个http服务;
    req请求信息
    res返回信息
    监听端口8802
*/

http.createServer((req,res)=>{
   
     //   写一个返回头
    // 状态码：200，文件类型text/html，及字符集utf-8
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    // 返回内容
    res.write("WELCOME NODE.JS");
    // 结束http响应
    res.end();
}).listen(8802);

