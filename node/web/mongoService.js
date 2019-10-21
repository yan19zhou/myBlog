const http = require('http');
const app = require("./express-route");
// 引入mongodb服务
var MongoClient = require('mongodb').MongoClient;
//定义链接字符串
const dbURL = "mongodb://127.0.0.1:27017/test";

app.get('login', (req, res) => {
    // 建立数据库连接
    MongoClient.connect(dbURL, (err, client) => {
        if (err) {
            res.send("connect fail");
            return;
        }
        // 连接成功之后操作表单
        let db = client.db("test");
        // 添加数据

        /* db.collection('test').insertOne({ "name": "lisi" }, (error, data) => {
            if (error) {
                res.send("add fail");
                return;
            }
            console.log(data);
            db.close(); // 关闭数据库
            res.send("add success login~！");
        }); */
        // 查询数据列表
        let list = [];
        let result = db.collection('test').find();
        result.each((err1, doc) => {
            if (err) {
                console.log(err1)
            }
            if (doc != null) {
                list.push(doc); //获取真正可用的数据

            } else {
                // 当数据遍历完成doc==null
                client.close(); // 关闭数据库
                console.log(list);
                res.send("ALL");
            }
        })

    })


})

http.createServer(app).listen(3000);