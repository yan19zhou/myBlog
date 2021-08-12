1.类数组
	1.类数组可以使用for循环，但是不能使用数据方法，但是可以用call来使用例如：Array.prototype.join.call(arrLike,"&") 
	2.类数组转换成数组
		1. Array.prototype.slice.call(arrLike)     // 使用slice转化
		2. Array.prototype.splice.call(arrLike,0) 		
		3. Array.from(arrLike)  // 使用ES6的from方法
		4. Array.prototype.concat.Apply([],arrLike) // 把类数组传入一个空数组对象
	3.Arguments就是一个类数组，Arguments的callee属性可以让函数调用自身
		example： 
			var data=[]
			for(var i=0;i<3;i++){
				(data[i]=function(){
					console.log(arguments.callee.i)
				}).i=i
					}
			data[0]() // 0
			data[1]() // 1
			data[2]() // 2
	