const fs = require('fs');

// fs.stat 检测是文件还是目录 isFile(),isDirectory()

// 创建目录
// params：路径名称，目录权限，默认0777，回调函数
/* fs.mkdir('css.txt',(err)=>{
    if(err){
        return ;
    }
    console.log("mkdir success")
}) */

// fs.writeFile 创建写入文件
/* fs.writeFile('01.txt','yigewenj',(err)=>{
    if(err){
        return ;
    }
    console.log("writeFile success")
}) */

// fs.appendFile 追加文件
/* fs.appendFile('01.txt','追加一些内容',(err)=>{
    if(err){
        return ;
    }
    console.log("appendFile success")
}) */

// fs.readFile 读取文件
/* fs.readFile('01.txt',(err,data)=>{
    if(err){
        return ;
    }
    console.log(data)
}) */

// fs.readdir 读取目录
/* fs.readdir('css',(err,data)=>{
    if(err){
        return ;
    }
    console.log(data)
}) */

// fs.rename 重命名
/* fs.rename('01.txt','rename.txt',(err)=>{
    if(err){
        return ;
    }
    console.log("rename success")
}) */

// fs.rmdir 删除目录
/* fs.rmdir('css',(err)=>{
    if(err){
        return ;
    }
    console.log("rmdir success")
}) */

// fs.unlink 删除文件
/* fs.unlink('rename.txt',(err)=>{
    if(err){
        return ;
    }
    console.log("unlink success")
}) */


// 一个图片上传的demo、

// 1.判断服务器上面有没有upload目录，没有就创建一个
/* fs.stat('html', (err, stat) => {
    if (err) {

        fs.mkdir('html', (err) => {
            if (err)
                return;
        })
        console.log("success")
    }
    let filesArr = [];
    // 打印出html目录下面的所有目录
    fs.readdir('html', (err, files) => {
        if (err) {
            return;
        }

        (function readFile(i) {
            if (i == files.length) {
                console.log(filesArr)
                return;
            }
            fs.stat('html/' + files[i], (err, stat) => {

                if (stat.isDirectory()) {
                    filesArr.push(files[i])
                }
                // 因为stat是异步返回，所以采用递归调用
                readFile(i+1);
            })

        })(0)
    })
}) */

// 通过文件流来读取数据

 /*    // 创建一个文件流
    let readStream = fs.createReadStream('html/css/1.txt');
    let str = '';

    // 当有数据读取时绑定data事件
    readStream.on('data', (chuck) => {
        str += chuck;
    })
    // 当数据读取结束时绑定end事件
    readStream.on('end', () => {
        console.log('文件读取结束');
        console.log(str);
    })
    // 当数据读取错误时绑定error事件
    readStream.on('error', () => {
        console.log('文件读取error');
    })
 */
// 通过文件流来写入数据
/* 
// 创建一个可写入文件流,将文件写入html/css/1.txt
    let writeStream = fs.createWriteStream('html/css/1.txt');
    const data =" I will write in file";
    // 使用utf-8编码格式写入数据
    writeStream.write(data,'utf-8');
    // 标记文件末尾
    writeStream.end();
    // 写入完成时触发finish事件
    writeStream.on('finish',()=>{
        console.log("写入完成");
    })
    // 写入错误时触发error事件
    writeStream.on('error',(err)=>{
        console.log(err.stack);
    }) */

// 管道流
    // 创建一个文件可读流
    let readStream = fs.createReadStream("input.txt");
    // 创建一个文件可写入流
    let writeStream = fs.createWriteStream("output.txt");
    // 将可读文件流写入可写入文件
    readStream.pipe(writeStream);
    console.log("写入完成");













    