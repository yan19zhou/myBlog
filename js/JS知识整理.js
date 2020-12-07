js知识整理：

1.map：由于map()方法定义在JavaScript的Array中，我们调用Array的map()方法，传入我们自己的函数，就得到了一个新的Array作为结果：
	function pow(x) {
    return x * x;
		}
		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
2.reduce：
	array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()		把结果继续和序列的下一个元素做累积计算，其效果就是：
	把[1, 3, 5, 7, 9]变换成整数13579：
		var arr = [1, 3, 5, 7, 9];
		arr.reduce(function (x, y) {
			return x * 10 + y;
		}); // 13579
3.filter：filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。
		把一个Array中的空字符串删掉，可以这么写：

			var arr = ['A', '', 'B', null, undefined, 'C', '  '];
			var r = arr.filter(function (s) {
				return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
			});
			r; // ['A', 'B', 'C']

		利用filter，可以巧妙地去除Array的重复元素：
		arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
		var r = arr.filter(function (element, index, self) {
			return self.indexOf(element) === index;
		});
		利用filter筛选质数：
		function get_primes(arr){
		return arr.filter(function(item){
			var count=0;
		   for(var i=2;i<item;i++){
		   if( item % i ==0){
		   ++count;
			break;
				}				
			}
		return count==0&&item!==1;
			})
		}
4.sort: sort()方法默认把所有元素先转换为String再排序,它可以接收一个比较函数来实现自定义的排序
		function str(arr){	
			return arr.sort(function(x,y){
				return x-y
			})
			
			}
5.generator：generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。
	generator由function*定义（注意多出的*号），并且，除了return语句，还可以用yield返回多次。
			function* fib(max) {
			var
				t,
				a = 0,
				b = 1,
				n = 1;
			while (n < max) {
				yield a;
				t = a + b;
				a = b;
				b = t;
				n ++;
			}
			return a;
		}
			for (var x of fib(5)) {
			console.log(x); // 依次输出0, 1, 1, 2, 3
		}
generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。这个好处要等到后面学了AJAX以后才能体会到。
			try {
			r1 = yield ajax('http://url-1', data1);
			r2 = yield ajax('http://url-2', data2);
			r3 = yield ajax('http://url-3', data3);
			success(r3);
		}
		catch (err) {
			handle(err);
		}
6.浏览器对象：
	window：window对象有innerWidth和innerHeight属性，可以获取浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。
	
	充分利用JavaScript对不存在属性返回undefined的特性，直接用短路运算符||计算：
		var width = window.innerWidth || document.body.clientWidth;

	navigator：
	navigator对象表示浏览器的信息，最常用的属性包括：
    navigator.appName：浏览器名称；
    navigator.appVersion：浏览器版本；
    navigator.language：浏览器设置的语言；
    navigator.platform：操作系统类型；
    navigator.userAgent：浏览器设定的User-Agent字符串。
	
	screen
	screen对象表示屏幕的信息，常用的属性有：

		screen.width：屏幕宽度，以像素为单位；
		screen.height：屏幕高度，以像素为单位；
		screen.colorDepth：返回颜色位数，如8、16、24。

	location：
	location对象表示当前页面的URL信息。例如，一个完整的URL：
	可以用location.href获取。要获得URL各个部分的值，可以这么写：

	location.protocol; // 'http'
	location.host; // 'www.example.com'
	location.port; // '8080'
	location.pathname; // '/path/index.html'
	location.search; // '?a=1&b=2'
	location.hash; // 'TOP'

	要加载一个新页面，可以调用location.assign()。如果要重新加载当前页面，调用location.reload()方法非常方便。
	
	document
	document对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，document对象就是整个DOM树的根节点。
	document的title属性是从HTML文档中的<title>xxx</title>读取的，但是可以动态改变：
	document.title="666"
	JavaScript可以通过document.cookie读取到当前页面的Cookie：
	document.cookie; // 'v=123; remember=true; prefer=zh'

7.DOM:
	insertBefore
	parentElement.insertBefore(newElement, referenceElement);，子节点会插入到referenceElement之前。
8.表单操作：
	表单提交：
		(1).利用系统自带的onsubmit：
			<!-- HTML -->
				<form id="login-form" method="post" onsubmit="return checkForm()">//返回true则进行提交，false则终止提交
					<input type="text" id="username" name="username">
					<input type="password" id="input-password">
					<input type="hidden" id="md5-password" name="password">//MD5有32个字符，如果不设置隐藏的input则上面的input会显示32个*
					<button type="submit">Submit</button>
				</form>

				<script>
				function checkForm() {
					var input_pwd = document.getElementById('input-password');
					var md5_pwd = document.getElementById('md5-password');
					// 把用户输入的明文变为MD5:
					md5_pwd.value = toMD5(input_pwd.value);
					// 继续下一步:
					return true;
				}
				</script>

			注意到id为md5-password的<input>标记了name="password"，而用户输入的id为input-password的<input>没有name属性。没有name属性的<input>的数据不会被提交。
9.操作文件：
	上传文件时对文件后缀名做检查
	if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
		alert('Can only upload image file.');
		return false;
	}
	H5读取文件内容：
			var
			fileInput = document.getElementById('test-image-file'),
			info = document.getElementById('test-file-info'),
			preview = document.getElementById('test-image-preview');
		// 监听change事件:
		fileInput.addEventListener('change', function () {
			// 清除背景图片:
			preview.style.backgroundImage = '';
			// 检查文件是否选择:
			if (!fileInput.value) {
				info.innerHTML = '没有选择文件';
				return;
			}
			// 获取File引用:
			var file = fileInput.files[0];
			// 获取File信息:
			info.innerHTML = '文件: ' + file.name + '<br>' +
							 '大小: ' + file.size + '<br>' +
							 '修改: ' + file.lastModifiedDate;
			if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
				alert('不是有效的图片文件!');
				return;
			}
			// 读取文件:
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'            
				preview.style.backgroundImage = 'url(' + data + ')';
			};
			// 以DataURL的形式读取文件:
			reader.readAsDataURL(file);
		});
10.JQuery事件：

		鼠标事件
			click: 鼠标单击时触发；
			dblclick：鼠标双击时触发；
			mouseenter：鼠标进入时触发；
			mouseleave：鼠标移出时触发；
			mousemove：鼠标在DOM内部移动时触发；
			hover：鼠标进入和退出时触发两个函数，相当于mouseenter加上mouseleave。
		
		键盘事件
		键盘事件仅作用在当前焦点的DOM上，通常是<input>和<textarea>。
			keydown：键盘按下时触发；
			keyup：键盘松开时触发；
			keypress：按一次键后触发。
		
		其他事件
			focus：当DOM获得焦点时触发；
			blur：当DOM失去焦点时触发；
			change：当<input>、<select>或<textarea>的内容改变时触发；
			submit：当<form>提交时触发；
			ready：当页面被载入并且DOM树完成初始化后触发:$(function(){...})

11.jQuery插件
	对于默认值的处理，我们用了一个简单的&&和||短路操作符，总能得到一个有效的值。
	它把多个object对象的属性合并到第一个target对象中，遇到同名属性，总是使用靠后的对象的值，也就是越往后优先级越高：
		$.fn.highlight = function (options) {
			// 合并默认值和用户设定值:
			var opts = $.extend({}, $.fn.highlight.defaults, options);
			this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
			return this;
		}

			// 设定默认值:
			$.fn.highlight.defaults = {
				color: '#d85030',
				backgroundColor: '#fff8de'
			}

			这次用户终于满意了。用户使用时，只需一次性设定默认值：

			$.fn.highlight.defaults.color = '#fff';
			$.fn.highlight.defaults.backgroundColor = '#000';

			然后就可以非常简单地调用highlight()了。

	我们得出编写一个jQuery插件的原则：

		给$.fn绑定函数，实现插件的代码逻辑；
		插件函数最后要return this;以支持链式调用；
		插件函数要有默认值，绑定在$.fn.<pluginName>.defaults上；
		用户在调用时可传入设定值以便覆盖默认值
12.错误处理：
	try...catch..finally

		var r1, r2, s = null;
		try {
			r1 = s.length; // 此处应产生错误
			r2 = 100; // 该语句不会执行
		} catch (e) {
			alert('出错了：' + e);
		} finally {
			console.log('finally');
		}
		console.log('r1 = ' + r1); // r1应为undefined
		console.log('r2 = ' + r2); // r2应为undefined

	当代码块被try { ... }包裹的时候，就表示这部分代码执行过程中可能会发生错误，一旦发生错误，就不再继续执行后续代码，转而跳到catch块。catch (e) { ... 包裹的代码就是错误处理代码，变量e表示捕获到的错误。最后，无论有没有错误，finally一定会被执行。
	所以，有错误发生时，执行流程像这样：
    先执行try { ... }的代码；
    执行到出错的语句时，后续语句不再继续执行，转而执行catch (e) { ... }代码；
    最后执行finally { ... }代码。
	而没有错误发生时，执行流程像这样：
    先执行try { ... }的代码；
    因为没有出错，catch (e) { ... }代码不会被执行；
    最后执行finally { ... }代码。
	最后请注意，catch和finally可以不必都出现。也就是说，try语句一共有三种形式：
	
	抛出错误
	程序也可以主动抛出一个错误，让执行流程直接跳转到catch块。抛出错误使用throw语句。
	JavaScript允许抛出任意对象，包括数字、字符串。但是，最好还是抛出一个Error对象。
	最后，当我们用catch捕获错误时，一定要编写错误处理语句：
		var r, n, s;
	try {
		s = prompt('请输入一个数字');
		n = parseInt(s);
		if (isNaN(n)) {
			throw new Error('输入错误');
		}
		// 计算平方:
		r = n * n;
		alert(n + ' * ' + n + ' = ' + r);
	} catch (e) {
		alert('出错了：' + e);
	}

	如果在一个函数内部发生了错误，它自身没有捕获，错误就会被抛到外层调用函数，如果外层函数也没有捕获，该错误会一直沿着函数调用链向上抛出，直到被JavaScript引擎捕获，代码终止执行。
	所以，我们不必在每一个函数内部捕获错误，只需要在合适的地方来个统一捕获，一网打尽

13.underscore
	underscore第三方开源库，提供了一套完善的函数式编程的接口	
	
	1. _.map();_.mapObject()
		var upper = _.map(obj, function (value, key) {
		return value+"="+key;
		});
	
	2. every / some
		当集合的所有元素都满足条件时，_.every()函数返回true，当集合的至少一个元素满足条件时，_.some()函数返回true：
		'use strict';
		// 所有元素都大于0？
		_.every([1, 4, 7, -3, -9], (x) => x > 0); // false
		// 至少一个元素大于0？
		_.some([1, 4, 7, -3, -9], (x) => x > 0); // true
	3. max / min

		这两个函数直接返回集合中最大和最小的数：

		'use strict';
		var arr = [3, 5, 7, 9];
		_.max(arr); // 9
		_.min(arr); // 3

		// 空集合会返回-Infinity和Infinity，所以要先判断集合不为空：
		_.max([])
		-Infinity
		_.min([])
		Infinity

		注意，如果集合是Object，max()和min()只作用于value，忽略掉key：

		'use strict';
		_.max({ a: 1, b: 2, c: 3 }); // 3

	4. groupBy
		groupBy()把集合的元素按照key归类，key由传入的函数返回：
		'use strict';
		var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];
		var groups = _.groupBy(scores, function (x) {
			if (x < 60) {
				return 'C';
			} else if (x < 80) {
				return 'B';
			} else {
				return 'A';
			}
		});
		// 结果:
		// {
		//   A: [81, 91, 88, 99],
		//   B: [75, 77, 66, 72],
		//   C: [20, 40, 59]
		// }

		可见groupBy()用来分组是非常方便的。
			
	5. shuffle / sample

		shuffle()用洗牌算法随机打乱一个集合：

		'use strict';
		// 注意每次结果都不一样：
		_.shuffle([1, 2, 3, 4, 5, 6]); // [3, 5, 4, 6, 2, 1]

		sample()则是随机选择一个或多个元素：

		'use strict';
		// 注意每次结果都不一样：
		// 随机选1个：
		_.sample([1, 2, 3, 4, 5, 6]); // 2
		// 随机选3个：
		_.sample([1, 2, 3, 4, 5, 6], 3); // [6, 1, 4]
			
	6. first / last

		顾名思义，这两个函数分别取第一个和最后一个元素：

		'use strict';
		var arr = [2, 4, 6, 8];
		_.first(arr); // 2
		_.last(arr); // 8

		flatten

		flatten()接收一个Array，无论这个Array里面嵌套了多少个Array，flatten()最后都把它们变成一个一维数组：

		'use strict';

		_.flatten([1, [2], [3, [[4], [5]]]]); // [1, 2, 3, 4, 5]

	7. zip / unzip

		zip()把两个或多个数组的所有元素按索引对齐，然后按索引合并成新数组。例如，你有一个Array保存了名字，另一个Array保存了分数，现在，要把名字和分数给对上，用zip()轻松实现：

		'use strict';

		var names = ['Adam', 'Lisa', 'Bart'];
		var scores = [85, 92, 59];
		_.zip(names, scores);
		// [['Adam', 85], ['Lisa', 92], ['Bart', 59]]

		unzip()则是反过来：

		'use strict';
		var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];
		_.unzip(namesAndScores);
		// [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]
						
	8. object()						
					
		_.object(names, scores);  // {Adam: 85, Lisa: 92, Bart: 59}			
	
	9. range()

		range()让你快速生成一个序列，不再需要用for循环实现了：
		'use strict';
		// 从0开始小于10:
		_.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		// 从1开始小于11：
		_.range(1, 11); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		// 从0开始小于30，步长5:
		_.range(0, 30, 5); // [0, 5, 10, 15, 20, 25]
		// 从0开始大于-10，步长-1:
		_.range(0, -10, -1); // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
				
					
	10.bind
		var s = ' Hello  ';
		var fn = _.bind(s.trim, s);
		fn();
		// 输出Hello
		结论：当用一个变量fn指向一个对象的方法时，直接调用fn()是不行的，因为丢失了this对象的引用。用bind可以修复这个问题。
					
	11. partial

		partial()就是为一个函数创建偏函数。偏函数是什么东东？看例子：

		假设我们要计算xy，这时只需要调用Math.pow(x, y)就可以了。

		假设我们经常计算2y，每次都写Math.pow(2, y)就比较麻烦，如果创建一个新的函数能直接这样写pow2N(y)就好了，这个新函数pow2N(y)就是根据Math.pow(x, y)创建出来的偏函数，它固定住了原函数的第一个参数（始终为2）：

		'use strict';

		var pow2N = _.partial(Math.pow, 2);
		pow2N(3); // 8
		pow2N(5); // 32
		pow2N(10); // 1024

		如果我们不想固定第一个参数，想固定第二个参数怎么办？比如，希望创建一个偏函数cube(x)，计算x3，可以用_作占位符，固定住第二个参数：

		'use strict';

		var cube = _.partial(Math.pow, _, 3);
		cube(3); // 27
		cube(5); // 125
		cube(10); // 1000

		可见，创建偏函数的目的是将原函数的某些参数固定住，可以降低新函数调用的难度		
					
					
	12.once

	在页面上点两个按钮的任何一个都可以执行的话，就可以用once()保证函数仅调用一次，无论用户点击多少次：				
		var register = _.once(function () {
		alert('Register ok!');
		});				
		register();				
	13.delay

		delay()可以让一个函数延迟执行，效果和setTimeout()是一样的，但是代码明显简单了：

		'use strict';

		// 2秒后调用alert():
		_.delay(alert, 2000);

		如果要延迟调用的函数有参数，把参数也传进去：

		'use strict';

		var log = _.bind(console.log, console);
		_.delay(log, 2000, 'Hello,', 'world!');
		// 2秒后打印'Hello, world!':
							
	14.keys/allKeys	/values			
	
	15.mapObject()
	就是针对object的map版本：

		'use strict';

		var obj = { a: 1, b: 2, c: 3 };
		// 注意传入的函数签名，value在前，key在后:
		_.mapObject(obj, (v, k) => 100 + v); // { a: 101, b: 102, c: 103 }
			
	16.extend / extendOwn

		extend()把多个object的key-value合并到第一个object并返回：

		'use strict';

		var a = {name: 'Bob', age: 20};
		_.extend(a, {age: 15}, {age: 88, city: 'Beijing'}); // {name: 'Bob', age: 88, city: 'Beijing'}
		// 变量a的内容也改变了：
		a; // {name: 'Bob', age: 88, city: 'Beijing'}

		注意：如果有相同的key，后面的object的value将覆盖前面的object的value。

		extendOwn()和extend()类似，但获取属性时忽略从原型链继承下来的属性。
	17.clone

		如果我们要复制一个object对象，就可以用clone()方法，它会把原有对象的所有属性都复制到新的对象中：	
		注意，clone()是“浅复制”。所谓“浅复制”就是说，两个对象相同的key所引用的value其实是同一对象：
		source.skills === copied.skills; // true  也就是说，修改source.skills会影响copied.skills。
	
	18.isEqual

		isEqual()对两个object进行深度比较，如果内容完全相同，则返回true：

		'use strict';

		var o1 = { name: 'Bob', skills: { Java: 90, JavaScript: 99 }};
		var o2 = { name: 'Bob', skills: { JavaScript: 99, Java: 90 }};

		o1 === o2; // false
		_.isEqual(o1, o2); // true

		isEqual()其实对Array也可以比较：

		'use strict';

		var o1 = ['Bob', { skills: ['Java', 'JavaScript'] }];
		var o2 = ['Bob', { skills: ['Java', 'JavaScript'] }];

		o1 === o2; // false
		_.isEqual(o1, o2); // true

	19.chaining
		jQuery支持链式调用
		$('a').attr('target', '_blank')
			  .append(' <i class="uk-icon-external-link"></i>')
			  .click(function () {});

		如果我们有一组操作，用underscore提供的函数，写出来像这样：

		_.filter(_.map([1, 4, 9, 16, 25], Math.sqrt), x => x % 2 === 1);
		// [1, 3, 5]

		能不能写成链式调用？

		能！

		underscore提供了把对象包装成能进行链式调用的方法，就是chain()函数：

		_.chain([1, 4, 9, 16, 25])
		 .map(Math.sqrt)
		 .filter(x => x % 2 === 1)
		 .value();
		// [1, 3, 5]

		因为每一步返回的都是包装对象，所以最后一步的结果需要调用value()获得最终结果。
	
	



























		
					
					
					
					




