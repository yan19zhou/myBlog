// 精简serveice文件，封装一个路由文件

const path = require('path');
const url = require('url');
const fs = require('fs');

exports.statics = function(req,res,staticPath){
    // 读取文件然后显示到页面
    // 获取请求路径
    let pathName = url.parse(req.url).pathname;
    if (pathName == '/') {
        pathName = '/index.html' //  默认加载首页
    }
    // 获取文件后缀
    let extname = path.extname(pathName);

    //读取文件
    
    fs.readFile(staticPath + pathName, (err, data) => {
        if (err) {
            fs.readFile(staticPath+'/404.html', (err, data404) => {
                res.writeHead(404, {
                    "Content-Type": "text/html;charset='utf-8'"
                })
                res.write(data404);
                res.end();
            })
        } 
            // 使用回调获取异步数据
            getMime(extname,(type)=>{
                console.log(type)
                res.writeHead(200, {
                    "Content-Type": "" + type + ";charset='utf-8'"
                })
                console.log(data);
                
                res.write(data);
                res.end();
            })
        
    })
}
function getMime(extname, callback) {
    
    // 读取mime.json文件

    fs.readFile('./mime.json', (err, mimeData) => {
        console.log(mimeData)
        if (err)
            return;
            
        // buffer数据转换成字符串  
        let Smime = mimeData.toString();

        // 字符串转换成json格式数据，根据key取值
        let Jmime = JSON.parse(Smime)[extname];

       // 因为readFile为异步事件，所以使用回调来获取数据
       callback(Jmime);
    })

}