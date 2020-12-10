ES-6

http://www.cnblogs.com/jarson-7426/p/5481491.html
  1.定义函数

		我们先来看一个基本的新特性，在javascript中，定义函数需要关键字function，但是在es6中，还有更先进的写法，我们来看：

		es6写法：

		var human = {
			breathe(name) {   //不需要function也能定义breathe函数。
				console.log(name + ' is breathing...');
			}
		};
		human.breathe('jarson');   //输出 ‘jarson is breathing...’

		转成js代码：

		var human = {
			breathe: function(name) {
				console.log(name + 'is breathing...');
			}
		};
		human.breathe('jarson');

	2.创建类
		我们知道，javascript不像java是面向对象编程的语言，而只可以说是基于对象编程的语言。所以在js中，我们通常都是用function和prototype来模拟类这个概念。

		但是现在有了es6，我们可以像java那样‘明目张胆’的创建一个类了：

		class Human {
			constructor(name) {
				this.name = name;
			}
			breathe() {
				console.log(this.name + " is breathing");
			}
		} 
		var man = new Human("jarson");
		man.breathe();    //jarson is breathing

		上面代码转为js格式：

		function Human(name) {
			this.name = name;
			this.breathe = function() {
				console.log(this.name + ' is breathing');
			}
		}
		var man = new Human('jarson');
		man.breathe();    //jarson is breathing

	3.继承	
	所以我们看到，我们可以像java那样语义化的去创建一个类。另外，js中的继承父类，需要用prototype来实现。那么在es6中，又有什么新的方法来实现类的继承呢？继续看：

		假如我们要创建一个Man类继承上面的Human类，es6代码：

		class Man extends Human {
			constructor(name, sex) {
				super(name);
				this.sex = sex;
			}
			info(){
				console.log(this.name + 'is ' + this.sex);
			}
		}

		var xx = new Man('jarson', 'boy');
		xx.breathe();   //jarson is breathing
		xx.info();   //arsonis boy

		代码很简单，不作赘述，可以使用文章里提到的在线工具去试试效果就能明白了。需要注意的是：super()是父类的构造函数。
		模块
	4.导出
		在ES6标准中，javascript原生支持module了。将不同功能的代码分别写在不同文件中，各模块只需导出(export)公共接口部分，然后在需要使用的地方通过模块的导入(import)就可以了。下面继续看例子：
		内联导出

		ES6模块里的对象可在创建它们的声明中直接导出，一个模块中可无数次使用export。

		先看模块文件app.js：

		export class Human{
			constructor(name) {
				this.name = name;
			}
			breathe() {
				console.log(this.name + " is breathing");
			} 
		}  
		export function run(){  
			console.log('i am runing'); 
		}
		function eat() {
			console.log('i am eating');
		}

		例子中的模块导出了两个对象：Human类和run函数， eat函数没有导出，则仍为此模块私有，不能被其他文件使用。
		导出一组对象

		另外，其实如果需要导出的对象很多的时候，我们可以在最后统一导出一组对象。

		更改app.js文件：

		class Human{
			constructor(name) {
				this.name = name;
			}
			breathe() {
				console.log(this.name + " is breathing");
			} 
		}  
		function run(){  
			console.log('i am runing'); 
		}
		function eat() {
			console.log('i am eating');
		}
		export {Human, run}; 

		这样的写法功能和上面一样，而且也很明显，在最后可以清晰的看到导出了哪些对象。
		Default导出

		导出时使用关键字default，可将对象标注为default对象导出。default关键字在每一个模块中只能使用一次。它既可以用于内联导出，也可以用于一组对象导出声明中。

		查看导出default对象的语法：

		...   //创建类、函数等等
		export default {  //把Human类和run函数标注为default对象导出。
			Human,  
			run  
		}; 

	5.无对象导入

		如果模块包含一些逻辑要执行，且不会导出任何对象，此类对象也可以被导入到另一模块中，导入之后只执行逻辑。如：

		import './module1.js'; 

		导入默认对象

		使用Default导出方式导出对象，该对象在import声明中将直接被分配给某个引用，如下例中的“app”。

		import app from './module1.js'; 

		上面例子中，默认./module1.js文件只导出了一个对象；若导出了一组对象，则应该在导入声明中一一列出这些对象，如：

		import {Human, run} from './app.js'

	6.let与const

		在我看来，在es6新特性中，在定义变量的时候统统使用let来代替var就好了，const则很直观，用来定义常量，即无法被更改值的变量。

		for (let i=0;i<2;i++) {
			console.log(i);  //输出: 0,1
		}

	7.箭头函数

		ES6中新增的箭头操作符=>简化了函数的书写。操作符左边为输入的参数，而右边则是进行的操作以及返回的值，这样的写法可以为我们减少大量的代码，看下面的实例：

			let arr = [6, 8, 10, 20, 15, 9];
			arr.forEach((item, i) => console.log(item, i));
			let newArr = arr.filter((item) => (item<10));
			console.log(newArr); //[6, 8, 9];

			上面的(item, i)就是参数，后面的console.log(item, i)就是回到函数要执行的操作逻辑。

			上面代码转为js格式：

			var arr = [6, 8, 10, 20, 15, 9];
			arr.forEach(function(item, i) {
				return console.log(item, i);
			});
			var newArr = arr.filter(function(item) {
				return (item < 10);
			});
			console.log(newArr);
			
			ps: 如果只有一个参数，()可以省略，如果只有一个return， {return}可以省略


	8.字符串模版

		ES6中允许使用反引号 来创建字符串，此种方法创建的字符串里面可以包含由美元符号加花括号包裹的变量${vraible}。看一下实例就会明白了：

		//产生一个随机数
		let num = Math.random();
		//将这个数字输出到console
		console.log(`your num is ${num}`);

	9.解构

		若一个函数要返回多个值，常规的做法是返回一个对象，将每个值做为这个对象的属性返回。在ES6中，利用解构这一特性，可以直接返回一个数组，然后数组中的值会自动被解析到对应接收该值的变量中。我们来看例子：

		function getVal() {
			return [1, 2];
		}
		var [x,y] = getVal(); //函数返回值的解构
		console.log('x:'+x+', y:'+y);   //输出：x:1, y:2 
		
		json的结构赋值：
		
		let {a,c} = {a:12,c:22} // 12 22 左右两边一样就行

	10.默认参数

		现在可以在定义函数的时候指定参数的默认值了，而不用像以前那样通过逻辑或操作符来达到目的了。

		function sayHello(name){
			var name=name||'tom';   //传统的指定默认参数的方式
			console.log('Hello '+name);
		}
		//运用ES6的默认参数
		function sayHello2(name='tom'){  //如果没有传这个参数，才会有默认值，
			console.log(`Hello ${name}`);
		}
		sayHello();//输出：Hello tom
		sayHello('jarson');//输出：Hello jarson
		sayHello2();//输出：Hello tom
		sayHello2('jarson');//输出：Hello jarson

		注意： sayHello2(name='tom')这里的等号，意思是没有传这个参数，则设置默认值，而不是给参数赋值的意思。
		
		Proxy
	Proxy可以监听对象身上发生了什么事情，并在这些事情发生后执行一些相应的操作。一下子让我们对一个对象有了很强的追踪能力，同时在数据绑定方面也很有用处。

		//定义被监听的目标对象
		let engineer = { name: 'Joe Sixpack', salary: 50 };
		//定义处理程序
		let interceptor = {
			set(receiver, property, value) {
				console.log(property, 'is changed to', value);
				receiver[property] = value;
			}
		};
		//创建代理以进行侦听
		engineer = new Proxy(engineer, interceptor);
		//做一些改动来触发代理
		engineer.salary = 70;//控制台输出：salary is changed to 70

		对于处理程序，是在被监听的对象身上发生了相应事件之后，处理程序里面的方法就会被调用。				
	一、从数组及对象中提取数据：
	数组：const names=['luke','bici','lixiaolu'];
			const [first]=names;
			console.log(first);//'luke';
			const [first,second]=names;
			console.log(first,second);//'luke' 'bici'
			const[first,,second]=names;
			console.log(first,second)//'luke' 'lixiaolu'
			const[first,....rest]=names;
			console.log(rest)//'bici' 'lixiaolu'取数组中后面连续部分
	对象：const person = {  
			  name: 'Luke',
			  age: '24',
			  facts: {
				hobby: 'Photo',
				work: 'Software Developer'
			  }
			}
			const{name,age}=person;
			console.log(name,age);//'Luke' '24'
			const{facts:{hobby}}=person;
			console.log(hobby)//'Photo'
			const {hometown = 'Unknown'} = person;  //需要抽取的值不存在时可以在对象里给要抽取的值设置默认值；
			console.log(hometown); // 'Unknown' 
	假设你有一个函数，接受一个对象作为参数。那么你可以直接在参数列表中对对象进行解构。例如下面这个 toString 函数，打印出 name 和 age。
			const toString = ({name, age}) => {  
			  return `${name} is ${age} years old`;
			}
			
		   toString(person); // Luke is 24 years old  
	二、展开运算符：
		http://www.cnblogs.com/mingjiezhang/p/5903026.html
		函数调用中使用展开运算符

			在以前我们会使用apply方法来将一个数组展开成多个参数：

			function test(a, b, c) { }
			var args = [0, 1, 2];
			test.apply(null, args);

			如上，我们把args数组当作实参传递给了a,b,c，这边正是利用了Function.prototype.apply的特性。

			不过有了ES6，我们就可以更加简洁地来传递数组参数：
			
			function test(a,b,c) { }
			var args = [0,1,2];
			test(...args);

			我们使用...展开运算符就可以把args直接传递给test()函数。
			数组字面量中使用展开运算符

			''
			在ES6的世界中，我们可以直接加一个数组直接合并到另外一个数组当中：

			var arr1=['a','b','c'];
			var arr2=[...arr1,'d','e']; //['a','b','c','d','e']

			展开运算符也可以用在push函数中，可以不用再用apply()函数来合并两个数组：

			var arr1=['a','b','c'];
			var arr2=['d','e'];
			arr1.push(...arr2); //['a','b','c','d','e']

			用于解构赋值

			解构赋值也是ES6中的一个特性，而这个展开运算符可以用于部分情景：

			let [arg1,arg2,...arg3] = [1, 2, 3, 4];
			arg1 //1
			arg2 //2
			arg3 //['3','4']

			展开运算符在解构赋值中的作用跟之前的作用看上去是相反的，将多个数组项组合成了一个新数组。

			不过要注意，解构赋值中展开运算符只能用在最后：

			let [arg1,...arg2,arg3] = [1, 2, 3, 4]; //报错

			类数组对象变成数组

			展开运算符可以将一个类数组对象变成一个真正的数组对象：

			var list=document.getElementsByTagName('div');
			var arr=[..list];

			list是类数组对象，而我们通过使用展开运算符使之变成了数组。
			ES7草案中的对象展开运算符

			ES7中的对象展开运算符符可以让我们更快捷地操作对象：

			let {x,y,...z}={x:1,y:2,a:3,b:4};
			x; //1
			y; //2
			z; //{a:3,b:4}

			如上，我们可以将一个对象当中的对象的一部分取出来成为一个新对象赋值给展开运算符的参数。

			同时，我们也可以像数组插入那样将一个对象插入另外一个对象当中：

			let z={a:3,b:4};
			let n={x:1,y:2,...z};
			n; //{x:1,y:2,a:3,b:4}

			另外还要很多用处，比如可以合并两个对象：

			let a={x:1,y:2};
			let b={z:3};
			let ab={...a,...b};
			ab //{x:1,y:2,z:3}
	
	9.iterable
		遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。

		具有iterable类型的集合可以通过新的for ... of循环来遍历。

		for ... of循环是ES6引入的新的语法：
		var a=[5,9,11];
		for(x of a){
			console.log(x)
		}
	10.字符串方法
		startsWith(),endsWith(),以某字符开始或结束，返回布尔值
		
		
	11.generator 
		//  generator函数执行时可以暂停，遇到yield则暂停，
		
		function *show(){ // generator函数和普通函数的区别为有个*，*可以靠近function或函数名
			console.log("a")
			yield;// 暂停
			console.log("b")
		}
		let showObj = show() // generator函数只是创建了一个generator对象
			showObj.next() //打印a  使用generator对象.next（）函数继续执行
			showObj.next() // b
		
		// yield 既可以传参也可以返回
		
		function *show(){
			console.log("a")
			let a = yield;
			console.log("b")
			console.log(a) // 5
		}
		
		let showObj = show();
		showObj.next(12) // a 第一个next给yield传参不生效
		showObj.next(5)  // b 5 变量a=5
		
		// yield返回
		
		function* 炒菜(买回来的菜){
			// 买回来的菜 -->洗-->洗好的菜
			let 干净的菜 = yield 洗好的菜
			// 干净的菜 -- >切 --> 切好的菜
			let 切好的菜 = yield 切好的菜
			//  切好的菜 -->炒菜-->成品菜
			return 成品菜 // 最后用return来返回结果
		}
		
		let gen = 炒菜()
		let res1 = gen.next() // {value：“洗好的菜”，done：false}
		let res2 = gen.next() // {value：“切好的菜”，done：false}
		let res3 = gen.next() // {value：“成品菜”，done：true}
		// 判断generator是否走完程序可以通过 done是否为true来判断
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		