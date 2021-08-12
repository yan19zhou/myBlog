//json:
	json-->js对象：
	1.JSON.parse(jsonStr);第二个参数可以是函数，可以对值进行修改；
	2.eval();var ans = eval('(' + jsonStr + ')');eval可以编译任何js代码，而且非常快，只是容易产生安全问题；
	js对象-->json：
	1.JSON.stringify();
		var obj = {name: 'hanzichi', sex: 'male', age: '10'};
		var jsonStr = JSON.stringify(obj);
		console.log(jsonStr);  // {"name":"hanzichi","sex":"male","age":"10"}

		　　也可以加个参数，规定需要转化为json字符串的属性（数组形式，跟数组同名的js对象属性才会被转换）：

		var obj = {name: 'hanzichi', sex: 'male', age: '10'};
		var jsonStr = JSON.stringify(obj, ['name']);
		console.log(jsonStr);  // {"name":"hanzichi"}

		　　第二个参数也可以是个函数，可以删选符合条件的属性（或者改变属性值，没有return表示放弃该属性，return的值表示该key在json字符串中的值）

			
		var obj = {name: 'hanzichi', sex: 'male', age: '10'};
		var jsonStr = JSON.stringify(obj, function(key, value) {
		  if(key === 'name') {
			return 'my name is ' + value;
		  }
		  return value;
		});
		console.log(jsonStr);  // {"name":"my name is hanzichi","sex":"male","age":"10"}

		　　还可以有第三个参数，可以是数字或者字符串。

		　　如果是数字的话，表示缩进，数字大小超过10了按10处理。

		var obj = {name: 'hanzichi', sex: 'male', age: '10'};
		var jsonStr = JSON.stringify(obj, null, 4);
		console.log(jsonStr); 
		// {
		//     "name": "hanzichi",
		//     "sex": "male",
		//     "age": "10"
		// }

		　　也可以是字符串，会在属性前加上这些字符串充当前缀，同样字符串长度超过10只截取10：

		var obj = {name: 'hanzichi', sex: 'male', age: '10'};
		var jsonStr = JSON.stringify(obj, null, 'pre');
		console.log(jsonStr); 
		// {
		// pre"name": "hanzichi",
		// pre"sex": "male",
		// pre"age": "10"
		// }