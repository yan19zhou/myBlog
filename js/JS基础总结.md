## js基础总结

### 闭包
    概念：有权访问另一个函数作用域中的变量的函数
1. 父函数包含子函数
2. 返回一个匿名函数
3. 函数的执行环境销毁之后，变量对象依然保存在内存之中
### 闭包中的this
    概念：一般来讲谁调用this指向谁，内部函数在搜索变量时，只会搜索到其活动对象为止，把外部作用域的this对象保存在一个闭包能够访问的变量里，就可以让闭包访问该对象了

### 面向对象的程序设计
1.工厂模式

    function createPerson(name, age, job){
        var o = new Object()
        o.name=name;
        o.age = age;
        o.job = job
        o.sayName = function(){
            return this.name
        };
        return o
    }
    var p1 = createPerson('lufei',23,'haidao')
    var p2 = createPerson('lufei',23,'haidao')
    // 可以无数次的调用这个函数，每次都返回相似的对象
2.构造函数
###### 构造函数可以用来创建对象，它没有返回值，只是通过函数来处理事情
###### 通过构造函数创建的对象都有一个constructor属性，指向Person
    function Person(name,age){
        this.name = name;
        this.age = age;
        this.getName = function(){
            console.log(this.name)
        }
    }
    var p1 = new Person("liming",22)
    

3.原型模式
###### 每个函数都有一个prototype属性
    function Person(){}    
    person.prototype = {
        contructor:Person,
        name:"lusi",
        age:15
    }

4.组合模式
###### 使用构造函数模式和原型模式，构造函数中定义实例属性，则每个实例中的属互不干扰，原型中定义共享的属性和方法
    function Person(name,age){
        this.name = name;
        this.age = age 
    }
    Person.protoType = {
        constructor : Person,
        getName: function(){
            return this.name
        }
    }
    var P1 = new Person('lili',14)
    var P2 = new Person('like',16)
    P1.getName()  // lili
5.动态原型模式
###### 把所有信息都封装在构造函数之中，通过判断来决定是否在构造函数中初始化原型
    function Person(name, age){
        this.name = name;
        this.age = age;

        // 方法
        if(typeof this.sayName != 'function'){
            Person.prototype.sayname = function(){
                console.log(this.name)
            }
        }
    }
    var friend = new Person('lici',29)
        friend.sayName()
6.继承
###### es5主要利用原型来继承
    function son(){

    }
    function parent(){

    }
    son.prototype = new parent()
###### 将子的原型指向父的实例

###### ES6 使用类和extends来继承，如react组件都是用继承component来构建
    class Parent{
        constructor(name){
            this.name = name
        }
    }
    class Son extends Parent{
        constructor(name,age){
            super(name); // 继承父类的参数
            this.age = age 
        }

    }
7.字符串
##### 字符串方法
    1.str.charAt(index) // index位置取一个字符
    // 查找字符串位置
    2.str.indexOf(searchString,startIndex) // 从startIndex位置开始查找
    3.str.lastIndexOf(searchString,startIndex) //从右往左找子字符串，找不到时返回-1
    //截取字符串,截取start到end-1的字符串
    4.str.substring(start,end) 
    5.str.slice(start,end)
    // 分割字符串
    6.str.split(separator,limit) 
    // 返回替换后的字符串
    7.str.replace(rgEXP/substr,replaceText) 
    8.str.match(rgExp) // 正则匹配

8.数组
    