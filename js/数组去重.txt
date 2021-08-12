
<javaScript> 数组去重的方法总结：

    现在要求去重下面这个数组

	[1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];

    方法一：ES6 Set()

		let arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];
		arr = [...new Set(arr)]; //去重后:  [ 1, 2, 3, '0', '1', '2', '测试', '重复', NaN, false ]

		Set 是ES6新加的集合,集合中的值不会重复。 ...操作符 会将可遍历对象,转换为数组.

    方法二：利用对象
			let arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];
			let obj ={};
			let temp=[];
			for( let i = 0; i < arr.length; i++ ) {
			let type= Object.prototype.toString.call(arr[i]);//不加类型 分不清 1 '1'  
			if( !obj[ arr[i] +type] ) {
				  temp.push( arr[i] );
				  obj[ arr[i]+ type ] =true;//这里给true 利于代码阅读和判断。  如果给 0,'' ,false ,undefined 都会在if那里判断为 false 不利于代码阅读
				  }
			}
			console.log(temp)//去重后:  [ 1, 2, 3, '0', '1', '2', '测试', '重复', NaN, false ]

    方法三：sort排序后 在去重
		1.使用Object.is
		let arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];
		arr = arr.sort();
		let temp =[];
		while(arr.length > 0) {
				if( Object.is(arr[0], arr[1]) ) {//Object.is() 用于比较2个值, 比===更靠谱  例如 Object.is(NaN,NaN) 会判断true
					  arr.shift();
				}else{
					  temp.push( arr.shift() );
		}
		}//此方法会清空原数组,  你可以复制个数组,在去进行操作
		console.log(temp)//去重后:  [ '0', 1, '1', '2', 2, 3, NaN, false, '测试', '重复' ]
		2.使用for循环
		var seen=0
		for(var i=0;i<arr.length;i++){
			if（!i && seen !== arr[i]）{
				temp.push(arr[i])
			}
			seen = arr[i]
		}	
		
    方法四：for in

		let arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];
		let temp =[];
		for(let i = 0; i < arr.length; i++) {
				if( !temp.includes( arr[i]) ) {//includes 检测数组是否有某个值 内部调用Object.is() 利用判断NaN
						temp.push(arr[i]);
				  }
		}
		console.log(temp);//去重后:  [ 1, 2, 3, '0', '1', '2', '测试', '重复', NaN, false ]
	方法五：filter
		
		let arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];