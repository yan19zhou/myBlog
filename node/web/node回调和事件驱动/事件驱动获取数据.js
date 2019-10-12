// 引入events
const events = require('events');
// 初始化events.EventEmitter实例
let EventEmitter = new events.EventEmitter();
const fs = require('fs');

// 获取文件

fs.readFile('./../mime.json',(err,data)=>{
    if(err){
        return ;
    }
    // 分发事件getMime
    EventEmitter.emit('getMime',data)  
})

// 通过on监听getMime事件
EventEmitter.on('getMime',(data)=>{
    console.log(data);
    
})