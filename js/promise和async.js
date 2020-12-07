promise和async

编写Promise代码
创建流程

    使用new Promise(fn)返回一个Promise对象
	
    在fn中制定异步等处理:
       处理结果正常的情况，调用resolve(处理结果值)
       处理结果错误的话,调用reject(Error对象)

创建Promise对象

最基本的情况，是使用new Promise()来创建Promise对象。也可以使用Promise.resolve(value)代替new Promise()快捷方法。比如:

	Promise.resolve(42);
	// 等价于
	new Promise(function(resolve) {
		reslove(42);
	})

Thenable

就像我们有时称具有 .length 方法的非数组对象为Array like一样，thenable指的是一个具有 .then 方法的对象。

这种将thenable对象转换为promise对象的机制要求thenable对象所拥有的 then 方法应该和Promise所拥有的 then 方法具有同样的功能和处理过程，在将thenable对象转换为promise对象的时候，还会巧妙的利用thenable对象原来具有的 then 方法。变成了promise对象的话，就能直接使用 then 或者 catch, 比如:

	var promise = Promise.resolve($.ajax('/json/comment.json'));// => promise对象
	promise.then(function(value){
	   console.log(value);
	});
	var promise=promise.resolve($.ajax('/json/comment.json'))
	promise.then(function(value){
		console.log(value)		
	})
需要注意的是:即使一个对象具有 .then 方法，也不一定就能作为ES6 Promises对象使用。比如jQuery的Defeered Object的then方法机制与Promise不同。

其实在Promise里可以将任意个方法连在一起作为一个方法链（method chain），比如：

	aPromise.then(function taskA(value){
	// task A
	}).then(function taskB(vaue){
	// task B
	}).catch(function onRejected(error){
		console.log(error);
	});

Promise.reject

Promise.reject(error)是和 Promise.resolve(value) 类似的静态方法，是 new Promise() 方法的快捷方式。

	Promise.reject(new Error("出错了"));
	// 等价于
	new Promise(function(resolve,reject){
		reject(new Error("出错了"));
	});


先看下面这段代码:

	function onReady(fn) {
		var readyState = document.readyState;
		if (readyState === 'interactive' || readyState === 'complete') {
			fn();
		} else {
			window.addEventListener('DOMContentLoaded', fn);
		}
	}
	onReady(function () {
		console.log('DOM fully loaded and parsed');
	});
	console.log('==Starting==');

这段代码会根据执行时DOM是否已经装载完毕来决定是对回调函数进行同步调用还是异步调用。这实际上会让我们的代码是同步还是异步产生混淆，所以为了解决这个问题，我们应该统一使用异步调用的方式:

	function onReady(fn) {
		var readyState = document.readyState;
		if (readyState === 'interactive' || readyState === 'complete') {
			setTimeout(fn, 0);
		} else {
			window.addEventListener('DOMContentLoaded', fn);
		}
	}
	onReady(function () {
		console.log('DOM fully loaded and parsed');
	});
	console.log('==Starting==');

我们看到的 promise.then也属于此类，为了避免上述中同时使用同步、异步调用可能引起的混乱问题，Promise在规范上规定 Promise只能使用异步调用方式 ，修改代码如下:

	function onReadyPromise() {
		return new Promise(function (resolve, reject) {
			var readyState = document.readyState;
			if (readyState === 'interactive' || readyState === 'complete') {
				resolve();
			} else {
				window.addEventListener('DOMContentLoaded', resolve);
			}
		});
	}	
	onReadyPromise().then(function () {
		console.log('DOM fully loaded and parsed');
	});
	console.log('==Starting==');
	
	Promise#catch  
	
链式上的catch会捕获前面所有then的错误情况。其实这也是个语法糖:

	var promise = Promise.reject(new Error("message"));
		promise.catch(function (error) {
			console.error(error);
	});
	
	// 等价于
	var promise = Promise.reject(new Error("message"));
		promise.then(undefined, function (error) {
			console.error(error);
	});

提倡使用catch的原因还有一个就是: 使用promise.then(onFulfilled, onRejected) 的话, 在 onFulfilled 中发生异常的话，在 onRejected 中是捕获不到这个异常的。

然而实际上不管是 then 还是 catch 方法调用，都返回了一个新的promise对象。
Promise chain

通过then方法，我们可以将代码写成方法链的形式。比如:

	function taskA() {
		console.log("Task A");
	}
	function taskB() {
		console.log("Task B");
	}
	function onRejected(error) {
		console.log("Catch Error: A or B", error);
	}
	function finalTask() {
		console.log("Final Task");
	}

	var promise = Promise.resolve();
	promise
		.then(taskA)
		.then(taskB)
		.catch(onRejected)
		.then(finalTask);

chain的时候，如何传递参数？答案非常简单，那就是在 Task A 中 return 的返回值，会在 Task B 执行时传给它。因为return的值会由 Promise.resolve(return的返回值); 进行相应的包装处理。
多个Promise对象完成后统一处理
通过回调方式来进行多个异步调用

看代码:

	function getURLCallback(URL, callback) {
		var req = new XMLHttpRequest();
		req.open('GET', URL, true);
		req.onload = function () {
			if (req.status === 200) {
				callback(null, req.responseText);
			} else {
				callback(new Error(req.statusText), req.response);
			}
		};
		req.onerror = function () {
			callback(new Error(req.statusText));
		};
		req.send();
	}
	
	
// <1> 对JSON数据进行安全的解析
	function jsonParse(callback, error, value) {
		if (error) {
			callback(error, value);
		} else {
			try {
				var result = JSON.parse(value);
				callback(null, result);
			} catch (e) {
				callback(e, value);
			}
		}
	}
// <2> 发送XHR请求
	var request = {
			comment: function getComment(callback) {
				return getURLCallback('http://azu.github.io/promises-book/json/comment.json', jsonParse.bind(null, callback));
			},
			people: function getPeople(callback) {
				return getURLCallback('http://azu.github.io/promises-book/json/people.json', jsonParse.bind(null, callback));
			}
		};
// <3> 启动多个XHR请求，当所有请求返回时调用callback
	function allRequest(requests, callback, results) {
		if (requests.length === 0) {
			return callback(null, results);
		}
		var req = requests.shift();
		req(function (error, value) {
			if (error) {
				callback(error, value);
			} else {
				results.push(value);
				allRequest(requests, callback, results);
			}
		});
	}
	function main(callback) {
		allRequest([request.comment, request.people], callback, []);
	}
// 运行的例子
	main(function(error, results){
		if(error){
			return console.error(error);
		}
		console.log(results);
	});

缺点:

    需要显示进行异常处理
    为了不让嵌套层次太深，需要一个对request进行处理的函数
    到处都是回调函数

使用Promise#then同时处理多个异步请求

	function getURL(URL) {
		return new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', URL, true);
			req.onload = function () {
				if (req.status === 200) {
					resolve(req.responseText);
				} else {
					reject(new Error(req.statusText));
				}
			};
			req.onerror = function () {
				reject(new Error(req.statusText));
			};
			req.send();
		});
	}
	var request = {
			comment: function getComment() {
				return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
			},
			people: function getPeople() {
				return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
			}
		};
	function main() {
		function recordValue(results, value) {
			results.push(value);
			return results;
		}
		// [] 用来保存初始化的值
		var pushValue = recordValue.bind(null, []);
		return request.comment().then(pushValue).then(request.people).then(pushValue);
	}
	// 运行的例子
	main().then(function (value) {
		console.log(value);
	}).catch(function(error){
		console.error(error);
	});

这种方法也不是我们期望的，和上面的回调函数风格相比:

    可以直接使用 JSON.parse 函数
    函数 main() 返回promise对象
    错误处理的地方直接对返回的promise对象进行处理

Promise.all

Promise.all 接收一个 promise对象的数组作为参数，当这个数组里的所有promise对象全部变为resolve或reject状态的时候，它才会去调用 .then方法。比如:

	function getURL(URL) {
		return new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', URL, true);
			req.onload = function () {
				if (req.status === 200) {
					resolve(req.responseText);
				} else {
					reject(new Error(req.statusText));
				}
			};
			req.onerror = function () {
				reject(new Error(req.statusText));
			};
			req.send();
		});
	}
	var request = {
			comment: function getComment() {
				return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
			},
			people: function getPeople() {
				return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
			}
		};
	function main() {
		return Promise.all([request.comment(), request.people()]);
	}
	// 运行示例
	main().then(function (value) {
		console.log(value);
	}).catch(function(error){
		console.log(error);
	});

这样的优点是:

    main中的处理流程非常清晰
    Promise.all 接收 promise对象组成的数组作为参数

Promise数组是同时开始执行的，then调用参数的结果之中的results顺序和传递的数组的顺序一致。并且调用then的时间由最后一个完成的异步操作决定。
Promise.race

它的使用方法和Promise.all一样，接收一个promise对象数组为参数。与all的区别就是：race只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。但是Promise中的数组也还是会继续执行。但是then只接受第一个完成的Promise返回对象。












