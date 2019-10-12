
const fs = require('fs');

exports.getMime = function(extname){
   
    // 读取mime.json文件
    let mimeData = fs.readFileSync('./mime.json');
    
    // buffer数据转换成字符串  
    let Smime = mimeData.toString();
    
    // 字符串转换成json格式数据，根据key取值
    let Jmime = JSON.parse(Smime)[extname];

    return Jmime
}