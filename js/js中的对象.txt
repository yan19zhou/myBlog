//javascript中的对象:
	1.基本类型通过值来传递和比较；而两个对象的值是否相同，则是取决于他们是否指向相同的底层对象；
	2.基本类型和引用类型的区别在于：可变性，比较的方式，程序中的传值；
	//instanceof运算符
		验证原型对象与实例对象之间的关系 (cat1 instanceOf cat)结果为boolean值；
	3.实例对象会有一个constructor属性，指向它们的构造函数。
	每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
	我们可以把那些不变的属性和方法，直接定义在prototype对象上。
	//isPrototypeOf()
	这个方法用来判断，某个proptotype对象和某个实例之间的关系。
    　　alert(Cat.prototype.isPrototypeOf(cat1)); //true
    　　alert(Cat.prototype.isPrototypeOf(cat2)); //true
	// hasOwnProperty()
	每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
    　　alert(cat1.hasOwnProperty("name")); // true
    　　alert(cat1.hasOwnProperty("type")); // false
	// in运算符
	in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
    　　alert("name" in cat1); // true
    　　alert("type" in cat1); // true
	in运算符还可以用来遍历某个对象的所有属性。
    　　for(var prop in cat1) { alert("cat1["+prop+"]="+cat1[prop]); }
	
	ps: js创建对象时先建立原型关系，而后执行构造函数；“当 new Person() 的时候，是先建立的原型关系，即 person .proto = Person.prototype，而后修改了 Person.prototype 的值