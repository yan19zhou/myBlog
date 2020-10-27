##### ECMAScript 新特性

###### Promise.allSettled()    

```
Promise.all([P1,P2]).then(result=>{
// promise完成之后返回结果数组，如果有一个请求被拒绝，则返回拒绝结果
})
Promise.allSettled([P1,P2]).then(result=>{
// promise返回结果数组，无论拒绝或者完成
})
```





###### import()

```
import命令：静态引入 写在页面顶部
import();可以用在代码块中，异步懒加载模块

```





> String.prototype.{trimStart,trimEnd}

​	字符串出去前后空格

> Object.fromEntries、Object.entries

```
let map = new Map().set("foo",true).set('bar',false);
let obj = Object.fromEntries(map); //将一个键值对列表转换为对象
Object.entries(obj) -->[["foo",true],["bar",false]] //将一个对象转换成数组
```



###### 重新修订字面量转义

```
let s = `\u{54}` //会转义成unicode "T"
console.log(s);//>> T

let str = String.raw`\u{54}`; //不会被转义
console.log(str);//>> \u{54}
```



###### 正则表达式命名捕获组

```
const reDate = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  match = reDate.exec("2018-08-06");
console.log(match);
//>> [2018-08-06, 08, 06, 2018, groups: {day: 06, month: 08, year: 2018}]

//此时用groups对象来获取年月日，无论正则表达式怎么变换，这下面三行不用改了，省事！
let year = match.groups.year; //>> 2018
let month = match.groups.month; //>> 08
let day = match.groups.day; //>> 06
```



###### Function.prototype.toString

```
// 优化函数的toString()方法，包括注释，空格转换
```



###### Rest / Spread

```
/ 扩展运算符
const obj={

a:1,
b:2,
c:3
}

const {a,...param}=obj;// a--> 1,param -->{b:2,c:3} rest

function aa({a,...param}){

// a -->1

//param-->{b:2,c:3} 

//rest

}
const param={b:2,c:3}
function({a:1,...param}){} // spread
```





###### Promise.prototype.finally

```
Promise().then().catch().finally()
// 无论走then还是catch  finally都会执行，相当于try，catch，finally中的finally
```



> 指数函数的中缀表示法

###### Object.values() / Object.keys()

```
获取object中key和values的数组

```





#### 函数

###### var和let的区别 

​	`var声明提前`

```

```

​    ` var变量污染`

```

```



> this