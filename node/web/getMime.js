
const fs = require('fs');

exports.getMime = function (extname, callback) {

    // 读取mime.json文件

    fs.readFile('./mime.json', (err, mimeData) => {
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