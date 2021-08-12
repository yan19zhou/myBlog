//JS模块化:
	模块化的特征：
		1.模块化，能重用；
		2.封装了function和变量，与全局namespace不接触，松耦合；
		3.只暴露可用public方法，其他私有方法全部隐藏；
	*可以把模块写成一个对象，将所有模块成员都放到这个对象里面，外部可通过变量名访问，但是会暴露所有模块成员，内部状态可以被外部改写；
		var model={
			_count:0,
			m1=function(){
				
			},
			m2=function(){
				
			}
		}
	//立即执行函数or匿名闭包：
		如果你不需要传参数或者没有一些特殊苛刻的要求的,可以使用立刻执行函数，该实例在内存中只会存在一份copy；
			var model={
				var _count=0;
				m1=function(n,m){
					return n+m;
				}
				m2=function(){
					
				}
				return {m1:m1,
						m2:m2
							}
			}//这样可以很好的保护私有变量，通过return来设置公开的方法。缺点也有: 动态添加方法的时候比较麻烦，且无法修改内部私有变量.
	//放大放宽模式
	如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。
		var module1 = (function (mod){
		　　　　mod.m3 = function () {
		　　　　　　//...
		　　　　};
		　　　　return mod;
		　　})(module1);
	在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。
		var module1 = ( function (mod){
		　　　　//...
		　　　　return mod;
		　　})(window.module1 || {});
	//构造函数
	使用new操作符完成的构造函数，比如:
		var Person = function(name) {
			var name = name || 'leo'; // 私有变量，通过闭包访问
			return {
				// 暴露公开的成员
				setName: function (name) {
					name = name;
				},
				getName: function () {
					return name;
				}
			};
		}
		var leo = new Person(); // Object{setName: function, getName: function()}
		console.log(leo.getName());
		每次用的时候都要new一下，也就是说每个实例在内存里都是一份copy。
	//引用全局变量：
		可以将全局变量当初一个参数传入匿名函数；
	//基本的Module模式
	有时候可能不仅仅要使用全局变量，而是也想声明全局变量，如何做呢？我们可以通过匿名函数的返回值来返回这个全局变量，
	这也就是一个基本的Module模式，来看一个完整的代码：
		var blogModule = (function () {
			var my = {}, privateName = "博客园";
			function privateAddTopic(data) {
				// 这里是内部处理代码
			}
			my.Name = privateName;
			my.AddTopic = function (data) {
				privateAddTopic(data);
			};
			return my;
		} ());
	上面的代码声明了一个全局变量blogModule，并且带有2个可访问的属性：blogModule.AddTopic和blogModule.Name，
	除此之外，其它代码都在匿名函数的闭包里保持着私有状态。同时根据上面传入全局变量的例子，我们也可以很方便地传入其它的全局变量。	
	//Module扩展方式:
		可以将blogModule传进去，添加属性方法，在返回，
		var blogmodule=(function(my){
			my.addPort=function(){	
				//添加内部代码；
			}
			return my;
		}(blogModule));
	//松耦合扩展：
		var blogmodule=(function(my){
			//添加一些功能
		}(bolgmodule||{}))
		每个分离的文件保持这个结构，可以实现任意顺序加载；
	//紧耦合扩展：
			var blogModule = (function (my) {
			var oldAddPhotoMethod = my.AddPhoto;

			my.AddPhoto = function () {
				// 重载方法，依然可通过oldAddPhotoMethod调用旧的方法
			};

			return my;
		} (blogModule));
		限制了加载的顺序，但是提供了重载的能力；
	//跨文件共享私有对象
		如果一个module分割到多个文件的话，每个文件需要保证一样的结构，也就是说每个文件匿名函数里的私有对象都不能交叉访问，
		那如果我们非要使用，那怎么办呢？ 我们先看一段代码：
		var blogModule = (function (my) {
			var _private = my._private = my._private || {},

				_seal = my._seal = my._seal || function () {
					delete my._private;
					delete my._seal;
					delete my._unseal;
				},
				_unseal = my._unseal = my._unseal || function () {
					my._private = _private;
					my._seal = _seal;
					my._unseal = _unseal;
				};
			return my;
		} (blogModule || {}));
		任何文件都可以对他们的局部变量_private设属性，并且设置对其他的文件也立即生效。
		一旦这个模块加载结束，应用会调用 blogModule._seal()"上锁"，这会阻止外部接入内部的_private。如果这个模块需要再次增生，
		应用的生命周期内，任何文件都可以调用_unseal() ”开锁”，然后再加载新文件。加载后再次调用_seal()”上锁”。
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			