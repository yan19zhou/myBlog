## ES6常用知识的一点小总结
 #### let const
class Person{
    // 构造函数
    constructor(name){
        // 属性
        this.name = name
    }
    run(){
        // 实例方法
        console.log(this.name);
    }
    static go(){
        console.log("this is a static method")
    }
}

let person = new Person("张三");
person.run()// 实例方法通过实例来调用
Person.go() // 静态方法通过类名来调用


