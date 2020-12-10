	
	### 闭包的概念：
  1.函数嵌套函数；
  2.内部函数可以使用外部函数的局部变量和参数
### 闭包的用途
  1.可以定义一些作用域局限的持久化变量，这些变量可以用来做缓存或者计算的中间量等；
  2.避免全局污染，全局函数可以改用闭包的形式来写；
  3.成员私有化


// 简单的缓存工具
// 匿名函数创造了一个闭包
const cache = (function() {
  const store = {};

  return {
    get(key) {
      return store[key];
    },
    set(key, val) {
      store[key] = val;
    }
  }
}());
console.log(cache) //{get: ƒ, set: ƒ}
cache.set('a', 1);
cache.get('a');  // 1

** 上面例子是一个简单的缓存工具的实现，匿名函数创造了一个闭包，使得 store 对象 ，一直可以被引用，不会被回收。
** 闭包的弊端:持久化变量不会被正常释放，持续占用内存空间，很容易造成内存浪费，所以一般需要一些额外手动的清理机制


	1.即使创建它的上下文已经销毁，它仍然存在（比如：内部函数从父函数中返回）
	2.在代码中引用了自由变量 (在A作用域中使用的变量x，却没有在A作用域中声明（即在其他作用域中声明的），对于A作用域来说，x就是一个自由变量 )
		// 函数作为返回值，函数作为参数传递 ,执行时自由变量取的是函数创建时作用域的变量，而不是调用时作用域的变量
		var scope = "global scope";
		function checkscope(){
			var scope = "local scope";
			function f(){
				return scope;
			}
			return f;
		}

		var foo = checkscope();
		foo();
		
	
	example1:
	
		var data = [];
		for (var i = 0; i < 3; i++) {
		  data[i] = function () {
			console.log(i);
		  };
		}

		data[0](); // 3  执行到data[i]的时候，函数的执行上下文中并没有变量i，所以获取的是globalContext中的i，此时的i=3；ps:for循环不会创建执行上下文环境，所以i是全局变量
		data[1](); // 3
		data[2](); // 3
			
		
	example2：
	
		var data = []
		for(var i=0; i<3 ;i++){
			data[i]=(function(i){
				console.log(i)
			})(i)
		}
		
		data[0](); // 0  globalContext中arguments中i=3，但是匿名函数执行环境中有一个参数i=0，使用匿名函数中的i 则为0
		data[1](); // 1
		data[2](); // 2
	
	
	
		// 给编辑器添加name用于验证
		//$("#editor").attr('name',"edui1")
		console.log($("#edui1"))
          $("#week").html(weekHtml);
	

	

	
	
	
	<html></!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
		<title>4654</title>
	</head>
	<body>
	<script type="text/javascript">
	for (var i = 0; i < 5; i++) {
		
			(function(j){
			console.log(new Date(),j);
		})(i)
	}
	console.log(new Date(),i);
	</script>
	</body>
	</html>