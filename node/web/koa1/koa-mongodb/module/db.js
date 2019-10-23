/* 
 封装一个mongodb的数据库DAO工具
*/
// 引入mongodb
const DbClient = require('mongodb').MongoClient;
const config = require('./config.js');


class Db {
    // 单例，使数据库只连接一次
    static getInstance() {
        if (!Db.getInstance) {
            Db.getInstance = new Db();
        } else {
            return Db.getInstance;
        }
    }
    constructor() {
        this.Dbclient = "";
        this.connect();
    }
    connect() {
        // 封装连接方法，返回client对象

        new Promise((reslove, reject) => {
            if (!this.Dbclient) {
                reslove(this.Dbclient);
            } else {
                DbClient.connect(config.dbUrl, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.Dbclient = client.db(config.dbName);
                        reslove(this.Dbclient);
                    }
                });
            }
        });



    }
    find(collectionName, json) {
        return new Promise((reslove, reject) => {
            this.connect.then((err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    let data = result.collection(collectionName).find(json);
                    data.toArray((err, docs) => {
                        reslove(docs);
                    })
                }
            });
        });

    }
    update(collectionName, json) {

    }
    add(collectionName, json) {

    }
}