/**

 * http://mongodb.github.io/node-mongodb-native

 * http://mongodb.github.io/node-mongodb-native/3.0/api/
 1.安装mongodb 引入mongodb.MongoClient;
 2.编写工具类
    1.使用单例，防止实例化重复链接数据库
    2.将client传入到构造函数的属性中，通过判断client是否存在，避免在请求中重复链接数据库
    3.connent(url,(err,client))连接数据库
    4.client.collection(db).find();操作数据库

 */

//DB
var MongoDB=require('mongodb');
var MongoClient =MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;

var Config=require('./config.js');

class Db{

    static getInstance(){   

        if(!Db.instance){
            Db.instance=new Db();
        }
        return  Db.instance;
    }

    constructor(){

        this.dbClient=''; 
        this.connect();   

    }

    connect(){ 
      let _that=this;
     return  new Promise((resolve,reject)=>{
          if(!_that.dbClient){        
              MongoClient.connect(Config.dbUrl,{ useUnifiedTopology: true } ,(err,client)=>{

                  if(err){
                      reject(err)

                  }else{

                      _that.dbClient=client.db(Config.dbName);
                      resolve(_that.dbClient)
                  }
              })

          }else{
              resolve(_that.dbClient);

          }


      })

    }

    find(collectionName,json){

       return new Promise((resolve,reject)=>{

            this.connect().then((db)=>{

                var result=db.collection(collectionName).find(json);

                result.toArray(function(err,docs){

                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(docs);
                })

            })
        })
    }
    update(collectionName,json1,json2){
        return new Promise((resolve,reject)=>{


                this.connect().then((db)=>{

                    //db.user.update({},{$set:{}})
                    db.collection(collectionName).updateOne(json1,{
                        $set:json2
                    },(err,result)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })

                })

        })

    }
    insert(collectionName,json){
        return new  Promise((resolve,reject)=>{
            this.connect().then((db)=>{

                db.collection(collectionName).insertOne(json,function(err,result){
                    if(err){
                        reject(err);
                    }else{

                        resolve(result);
                    }
                })


            })
        })
    }

    remove(collectionName,json){

        return new  Promise((resolve,reject)=>{
            this.connect().then((db)=>{

                db.collection(collectionName).removeOne(json,function(err,result){
                    if(err){
                        reject(err);
                    }else{

                        resolve(result);
                    }
                })

            })
        })
    }
    getObjectId(id){   

        return new ObjectID(id);
    }
}


module.exports=Db.getInstance();
