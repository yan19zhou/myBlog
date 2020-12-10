
数组：array：
栈方法
	1.后入：push();先出pop();在数组尾部添加或弹出数数据，push()返回修改后的数组长度，pop()返回弹出的数据；
队列方法	
	2.unshift(),shift(),在数组前端添加或弹出数据，，unshift()返回修改后的数组长度，shift()返回弹出的数据；
排序方法
	1.reverse将原来的数组进行反转并返回更改后的数组；
	2.sort：在默认情况下会比较数组中的值调用toString()方法后得到的字符串，然后按照升序排列；
		实现数字类型的排序：从小到大：
									array.sort(function(a,b){return:a-b})
							从大到小：
									array.sort(function(a,b){return:b-a})	
转换方法
	1.toLocalString(),toString(),valueOf();
		默认返回以逗号分隔的数组项
	2.将数组中的元素用连接符连接成字符串：join; 如：array.join("-")，不会改变原数组的数据；
操作方法
	1.concat:创建一个当前数组的副本，将接收到的参数添加到这个数组的末尾，如果接收的是数组也一样，原数组不变；
		如：var array=[2,4,5]; var newarray=array.concat(222,"dididi");newarray=[2,4,5,222,"dididi"];
	2.slice:基于当前数组的一项或多项创建新的数组，如一个参数则 返回接收参数指定位置到数组末尾的所有项，
			原数组值不变，如：var array=[4,2,6];var array2=array.slice(-2,-1);array2=[2];
	3.splice:可以在数组的任意部位插入，删除和替换，返回值为删除后的值，原数组会改变；
		如：var spliceArr = array.splice(1,2,"hello","world")
			//解释一下，把Array数组进在第1个下标之后删除2个，添加hello world，还个字符串
位置方法
	1.indexOf：从头开始查找，返回查找结果的下标索引，如果没有找到则返回-1；
		如：array.indexOf(10,3);//从下为3的数开始查，查找10这个数值；
	2.lastIndexOf：从尾部开始查找，返回查找结果的下标索引，如果没有找到则返回-1；1.
迭代方法
	ECMAScript为数组定义了5个迭代方法，每个方法可以接收两个参数；
	1.forEach():
		<1:在每一项运行函数function(item,index,array){}这里有三个参数分别为，每一项的值，其下标，其原数组；
		<2:运行其函数的作用域对象，影响的是this的值，这就是第二个参数的作用，改变内部的this指向；
		如：//首先新建一个this指向类数组对象，然后再进行this改变之后的运用
			var array = [1,1,1,1,1]
			var obj = {
				0 : "z",
				1 : "i",
				2 : "k",
				3 : "s",
				4 : "n",
				length:5
			}
			array.forEach(function(item,index,array){
					console.log(this)  //5次obj 类数组对象
				console.log(this[index])  //=>z,i,k,s,a,n 类型都是String类型
			},obj)
			
			ps:forEach返回值是undefined，map返回的是一个新数组，原数组不变
	2.map():对数组的每一项返回，影射成一个新数组；
		如：var array = [1,3,4,5,6]
			var array2 = [7,2,3]
			var mapresult = array.map(function(item,index,array){
				return this.slice(0,2)
				   //解释一下把this指向到array2数组上去，然后把每个进行截取再返回到新数组里
			},array2)
			console.log(mapresult)//5个[7,2];
	3.filter();过滤，筛选，接收一个每项返回为true的值，如果为true把当前每项的值推入一个新的数组返回出来；
		如：var array = [1,2,3,4,6]
			var filteresult = array.filter(function(item,index,array){
				if(item == index+1){  //判断每项值是否等于每项的下标+1
					return true   //则返回true，然后把把项的值推入数组，否则不推
				}
			})
			console.log(filterresult) // [1, 2, 3, 4]
	4.every();	如果每一项都符合条件返回true则最后为true，否则为false；
		如：var array = [1,2,3,4,6]
			var everyresult = array.every(function(item,index,array){
				if(item == index+1){
					return true     //因为最后一项的值为false,只有一项为false最后则为false
				}
			})
			console.log(everyresult) //false
										
	5.some();只要有一项为true，则结果为true，否则为flase；
		如：var array = [1,2,3,4,6]
			var someresult = array.some(function(item,index,array){
				if(item == index+1){
					return true     //只要有一项为true，则最后就返回true
				}
			})
			console.log(someresult)  //true
减小方法//汇总
	1.reduce()从0项开始，reduceRight()从最后一项开始;
		该函数接收一个函数参数，函数接受4个参数：之前值、当前值、索引值以及数组本身。
		initialValue参数可选，表示初始值。若指定，则当作最初使用的previous值；
		如果缺省，则使用数组的第一个元素作为previous初始值，同时current往后排一位，
		相比有initialValue值少一次迭代。

		var array = [1,2,3]
		var reduceResult= array.reduce(function(pre,cur,index,array){
			return pre-cur
		})      //pre是1 执行1-2 =-1    此时pre就是-1 再-1-3 = -4 迭代到最后一个值停止
		console.log(reduceResult)  //-4
						
		// 求平均数		
		var  arr = [152,44,28,658] 
		var sum =  arr.reduce((pre,item,index)=>{
			if(index<arr.length-1){
				return pre+item       // 第二次进入reduce的pre为前一个return表达式的值
			}else if(index === arr.length-1){
				return (pre+item)/index
			}
		})
		console.log(sum)	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	