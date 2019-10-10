/* 
    把公共方法或单一功能抽离能单独文件，此文件外部需要访问时，必须在模块文件中使用exports 或者module.exports暴露其属性和方法
    在引用模块的文件中使用require来引入模块文件

*/

/* 
    引入node中的http模块
*/
const http = require('http');

// 引入自定义模块需要使用文件路径,如果不写路径，默认在node_modules中找,
// 如果找到文件夹则找文件夹中package.json中入口文件,
// 生成入口文件：npm init --yes

const config = require('./config');

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
    res.write(config.name);
    // 结束http响应
    res.end();
}).listen(8802);
