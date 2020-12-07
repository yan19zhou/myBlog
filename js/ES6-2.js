ES6-2
1. map,set:
	map 是一组键值对的结构
	初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：
		var m = new Map(); // 空Map
		m.set('Adam', 67); // 添加新的key-value
		m.set('Bob', 59);
		m.has('Adam'); // 是否存在key 'Adam': true
		m.get('Adam'); // 67
		m.delete('Adam'); // 删除key 'Adam'
		m.get('Adam'); // undefined

		由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

		var m = new Map();
		m.set('Adam', 67);
		m.set('Adam', 88);
		m.get('Adam'); // 88
	 set也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
	 要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：

		var s1 = new Set(); // 空Set
		var s2 = new Set([1, 2, 3]); // 含1, 2, 3
		通过add(key)方法可以添加元素到Set中，通过delete(key)方法可以删除元素
	用for ... of循环遍历集合，用法如下：

		var a = ['A', 'B', 'C'];
		var s = new Set(['A', 'B', 'C']);
		var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
		for (var x of a) { // 遍历Array
			alert(x);
		}
		for (var x of s) { // 遍历Set
			alert(x);
		}
		for (var x of m) { // 遍历Map
			alert(x[0] + '=' + x[1]);
		}
	更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数。以Array为例：

		var a = ['A', 'B', 'C'];
		a.forEach(function (element, index, array) {
			// element: 指向当前元素的值
			// index: 指向当前索引
			// array: 指向Array对象本身
			alert(element);
		});
