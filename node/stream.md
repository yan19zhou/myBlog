##### 仅在服务端使用的一个模块，用来支持stream这种数据结构
    let fs = require('fs')
##### 文件读取
createReadStream(path,option):该用来打开一个可读的文件流，它返回一个                       fs.ReadStream对象
      <!--    @params:path指定文件的路径
        @params:options可选,是一个JS对象，可以指定一些选项如： -->
        let option={
                    flags: 'r',//指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
                    encoding: 'utf8',//指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
                    fd: null,//fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
                    mode: 0666,
                    autoClose: true//autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
                }
    let rs = fs.createReadStream('url','utf-8')
    // data事件表示流可以读取数据了
    rs.on('data',(chunk)=>{
        console.log('DATA:')
        console.log(chunk);
    })
    // end事件表示数据读取完毕
    rs.on('end',()=>{
        console.log('end:');
    })
    // error事件表示数据读取出错
    rs.on('error',(err)=>{
        console.log('error:'+err);
    })
    ps: data事件可能会有多次，每次传递的chunk是流的一部分数据。
##### 文件写入
    // 要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束：
    let ws1 = fs.createWriteStream('url','utf-8');
    ws1.write("xie ru shuju001 ...");
    ws1.write("xie ru shuju002 ...");
    ws1.end();
    // 写入buffer数据
    let ws2 = fs.createWriteStream('url');
    ws1.write(new Buffer("使用Stream写入二进制数据...\n"，'utf-8'));
    ws1.write("END");
    ws1.end();
##### pipe
    把一个文件流和另一个文件流串联起来，这样源文件的所有数据都写入目标文件了
    let ws1 = fs.createWriteStream('url1','utf-8');
    let ws2 = fs.createWriteStream('url2,'utf-8');
    
    ws1.pipe(ws2);
