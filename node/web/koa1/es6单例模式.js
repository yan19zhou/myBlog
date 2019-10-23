class Db{
    static getInstance(){
        if(!Db.instance){
            Db.instance = new Db();
        }
    }
    constructor(){
        console.log("执行构造函数");
        this.connect();
    }
    connect(){
        console.log("连接数据库~");
        
    }

    run(){

    }
}

let myDb1 = Db.getInstance(); // 通过静态方法实例化类 这样构造函数只执行一次
let myDb2 = Db.getInstance();
let myDb3 = Db.getInstance();