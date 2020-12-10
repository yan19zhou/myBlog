//原型链：
	每个javascript函数都有一个prototype属性指向函数原型，而根据函数创建的对象也有一个_proto_属性指向这个原型，而函数本身也是一个对象，
	也有一个_proto_属性指向自己的原型，直到object原型为null，这样就形成了原型链，ps：真正形成原型链的是对象的_prototype_属性，而非
	函数的prototype属性：
	
	   1. prototype: 在函数身上，指向原型对象
	   2. __proto__: 在对象身上（包括函数创建的对象, 函数本身和原型对象），指向自身的原型
	   3. constructor: 在原型对象上，指向构造函数, 在多级继承的时候，指明构造函数方便在对象上扩展原型属性
	   4. Object.__protp__为null: 原型的顶端
		function Foo() {
				this.value = 42;
			}
			Foo.prototype = {
				method: function() {}
			};

			function Bar() {}

			// 设置Bar的prototype属性为Foo的实例对象
			Bar.prototype = new Foo();
			Bar.prototype.foo = 'Hello World';

			// 修正Bar.prototype.constructor为Bar本身
			Bar.prototype.constructor = Bar;

			var test = new Bar() // 创建Bar的一个新实例

			// 原型链
			test [Bar的实例]
				Bar.prototype [Foo的实例] 
					{ foo: 'Hello World' }
					Foo.prototype
						{method: ...};
						Object.prototype
							{toString: ... /* etc. */};
			
	
	二。组合继承
	1.组合继承
		原型链继承和经典继承双剑合璧。

		function Parent (name) {
			this.name = name;
			this.colors = ['red', 'blue', 'green'];
		}

		Parent.prototype.getName = function () {
			console.log(this.name)
		}

		function Child (name, age) {

			Parent.call(this, name);
			
			this.age = age;

		}

		Child.prototype = new Parent();
		Child.prototype.constructor = Child;

		var child1 = new Child('kevin', '18');

		child1.colors.push('black');

		console.log(child1.name); // kevin
		console.log(child1.age); // 18
		console.log(child1.colors); // ["red", "blue", "green", "black"]

		var child2 = new Child('daisy', '20');

		console.log(child2.name); // daisy
		console.log(child2.age); // 20
		console.log(child2.colors); // ["red", "blue", "green"]
		优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		