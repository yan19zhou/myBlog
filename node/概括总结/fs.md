##### node.js内置的文件系统模块，负责读写文件
    const fs = require('fs')
##### 异步读取文件
    fs.readFile('url','utf-8',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
##### 同步读取文件
    let data = fs.readFileSync('url','utf-8') // 无回调函数直接返回结果

##### buffer文件

    // Buffer -> String
    var text = data.toString('utf-8');
    console.log(text);
    / String -> Buffer
    var buf = Buffer.from(text, 'utf-8');
    console.log(buf);

##### 写文件

    fs.writeFile('url',data,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('OK')
        }
    })
    // 同步操作
    fs.writeFileSync('output.txt', data);

##### stat
    获取文件大小，创建时间等信息可以通过fs.stat('url',(err,stat)=>)/fs.statSync('url')来获取
    'use strict';

    var fs = require('fs');

    fs.stat('sample.txt', function (err, stat) {
        if (err) {
            console.log(err);
        } else {
            // 是否是文件:
            console.log('isFile: ' + stat.isFile());
            // 是否是目录:
            console.log('isDirectory: ' + stat.isDirectory());
            if (stat.isFile()) {
                // 文件大小:
                console.log('size: ' + stat.size);
                // 创建时间, Date对象:
                console.log('birth time: ' + stat.birthtime);
                // 修改时间, Date对象:
                console.log('modified time: ' + stat.mtime);
            }
        }
    });