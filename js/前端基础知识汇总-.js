2018-9-14
		js初级之操作字符串

		1.截取字符串 var a = "www.qdjhu.com中的qdjhu"。
		知识点

		substr()第一个参数为起始位置，第二个参数为截取的长度，注意第一个参数为负数则从末尾往前找，第二个参数为负数则返回空字符串，此方法不会修改原字符串，只是查找并返回查找的结果，与slice()方法不同的是，slice()方法第二个参数为结束位置，如果slice()的第一个参数如果大于第二个参数则返回空字符串。

		解答

		a.substr(4,5)或者a.slice(4,9)

		2.判断字符串是否是这样组成的，第一个必须是字母，后面的可以使字母，数字，下划线，总长度为5-20。
		知识点

		正则。[a-zA-Z]是匹配所有字母，\w表示匹配任意字母，数字，下划线。{n}代表重复几次，{n,m}代表重复至少n次，至多m次。

		解答

		var a=/^[a-zA-Z]{1}\w{4，19}/

		3.给定一个字符串 "IamWangZhiJun",要求查找里面的字符串Wang。
		知识点

		对String对象的操作，indexOf()方法表示查找一个字符串在另一个字符串中的位置，返回一个整数，字符串匹配开始的位置。

		解答

		var a = "IamWangZhiJun"
		var b = "wang"
		var c =a.indexOf(b) //3
		var d = a.substr(c,b.length) 
		4.如何实现一个删除字符串左边为空白字符的方法。
		知识点1

		replace(),第一个参数为匹配模式（正则），第二个参数为替换的内容。

		知识点2

		量词符和贪婪模式，？表示0次或者1次{0，1}，*表示0次或者多次{0，}，+表示1次或者多次{1,}。默认情况下匹配贪婪模式。

		解答

		function leftTrim(str){		  
			return str.replace(/^\s*/,"")
			};
		var a = leftTrim("   abc") // abc
		
		5.JavaScript 的typeof 都返回那些数据类型。
		知识点

		js的6种数据基本类型。underfined,String,Number,Object,function,boolean 。

		6.请定义一个函数，实现字符串的反转。
		知识点

		主要是把字符串从末尾开始的每一个元素截取后，在重新组成一个新字符串，用到的方法charAt(), 返回指定位置的字符，注意是从0开始。

		解答

		function reverStr(str){		  
			var temStr = "";		  
			for(var i = str.length-1;i>=0;i—-){
				temStr+=str.charAt(i)
			}
		  }
		  returun temStr;
		 }  
		var str = "abcde";
		
		7.字符串的操作主要有那些。
			解答
			查找类型
			indexOf()，返回匹配开始的位置。
			search(),返回匹配的第一个位置。
			match()，返回一个数组，成员为匹配的字符串。
			length(),返回字符串的长度
			截取，拼接,替换类
			slice(),从原字符串中取回字符串并返回,第一个参数为起始位置，第二个参数为结束位置。
			substr(),从原字符串中取回字符串并返回，第一个参数是子字符串的开始位置，第二个参数是子字符串的长度。
			concat(),方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
			replace(),第一个参数为被替换的内容，第二个参数为要替换的内容，一般只匹配一个。
			charAt()方法返回指定位置的字符，参数是从0开始编号的位置。
			trim()
			转换类
			split(),第一个参数为起始位置 第二个参数为限定放回数组的成员数，注意，第一个参数如果为空，则返回数组的成员是原字符串的每一个字符。此方法会将字符串装换为数组。
		8.有一个字符串 abcd-ef-ghi,请用js把它处理成ghi&ed&abcd。
		知识点

		字符串和数组之间的装换。

		解答

		var a ="abcd-ef-ghi";
		var b = a.spilt("-");
		var result = b.reverse().join("&")
		
		9.请编写代码拓展JavaScript中string对象，让其有一个方法删除字符串中所有英文句号"."
			
		解答

		String.prototype.killPoint = function(){  
			return this.replace(/\./g,"");
		 }
		10.将字符串"wang zhi j un"中由空格分割的每个单词首字母大小写。
		解答

		function str(words) {
		  words = words.split(" ");
		  
		for(var i = 0;i<words.length;i++){
			words[i] = words[i].charAt(0).toUpperCase + words[i].slice(1);
		  }
		  
		return words;
		 }
		var words = "wang zhi j un";
		str(words);      
		JS初级之变量,DOM，循环语句

		1.JS如何检测变量是一个string类型？请写出函数实现。
		解答

		function isString(str){
		  
		if(typeof(str) === "string" || str.constructor === String){
			
		return true;
		  }
		else
		{
			
		return false;
		  }
		}
		var str = "hello world";
		这里需要注意的是也要判断这个值的数据类型。

		2.请说明javaScript中的nodeName,nodeVaule,nodeType的区别
		解答

		nodeName 表示节点的名称
		元素节点的nodeName是标签名称
		属性节点的nodeName是属性名称
		文本节点的nodeName是#text
		文档节点的nodeName是#document
		nodeVaule 表示文本内容
		对于文本节点，nodeVaule属性包含文本
		对于属性节点，nodeValue属性包含属性值
		nodeType 属性返回节点的类型,常用的如下
		元素类型对应的节点类型为1
		属性类型对应的节点类型为2
		文本属性对应的节点类型为3
		3.下列代码执行后，结果是什么
		for(i=0,j=0;i<6,j<10;i++,j++){
		  
		var k =i+j}
		alert(k) 
		//18
		for(i=0,j=0;i<10,j<6;i++,j++){
		  
		var k =i+j}
		alert(k) 
		//10
		知识点

		在for语句中条件用逗号隔开，就相当于“并且”,for循环中，循环条件以分号前最后一项计算。

		解答

		var t =(4,5,6);
		console.log(t) //6,
		这里也说明逗号表达式返回的结果是由最后一个表达式决定的。
		4.统计从1-400之间的自然对数中含有多少个1？
		解答

		 
		var count = 0;
		 
		for(var i=0;i<=400;i++){   
		for(var j=0;j<=i.toString().length;j++){
			
		if(i.toString()[j]=="1"){
			  count++
			}
		  }
		}
		alert(count);
		5.js中基本数据类型有哪些？本地对象，内置对象，宿主对象有那些？
		解答
		基本数据类型： string,boolean,number,null,undefined,object。

		本地对象(常用)： Object,Function,String,Number,Boolean,Data,Array,RegExp。

		内置对象： 简单的说，内置对象是本地对象的一种，其中包含2种对象，Math,Global(isNaN,parseInt,parseFloat)

		宿主对象： 所有BOM,DOM都是宿主对象,其中BOM常用对象有：

		localtion
		navigation
		screen
		history
		JS中级之函数

		1.编写一个函数，参数为一个元素，返回指定元素的第一个元素，函数越简单越好
		解答

		function getFirst(el){
		  
		var nodes = el.children;
		  
		return nodes.length!=0?nodes[0]:null;
		}
		2.简述JavaScript中this的理解。
		解答
		
		this代表函数执行的时候，自动生成一个内部对象，在函数内使用。

		this指的是调用函数的那个对象。 

		一下讨论this的四种用法： 

		纯粹的函数调用

		说明此时this代表全局对象。

			var x = 1;
			function test(){  
				this.x = 0;
				//这里等同于x = 0;已改写
			  }
			test();
			//window.test()
			alert(x);
			//0
		作为对象方法的调用

		说明此时this指向这个的上级对象。

		 
		function test(){
		  alert(this.x);
		 }
		 
		var o = {}; o.x=1;
		 o.m = test;
		 o.m()
		//1    
		作为构造函数的调用

		说明此时this是指向新对象，不是全局对象！！！

		var x = 2;
		function test(){		  
			this.x = 1;
		}
		var o = new test();
			alert(o.x)
			//1
			alert(x)
			//2     
		apply调用
		var x = 0;
		
		function test(){
		  alert(this.x)
		}
		var o = {};
			o.x = 1;
			o.m = test;
			o.m.apply()
			//0,当参数为空的时候，默认调用全局
			o.m.apply(o)
			//1 
		3.什么是闭包？闭包的特性？对页面有什么影响？好处和坏处？请写出一个闭包的简单实例？
			解答

			闭包就是能够读取其他函数内部变量的函数。
			闭包特性
			闭包外层是一个函数
			闭包内层也是一个函数
			闭包会return内部函数
			闭包返回的函数内部不能有return
			执行闭包后，闭包内部的变量会缓存
			闭包只有被执行的时候才会调用
			好处和坏处
			方便上下文调用
			加强封装性
			坏处 浪费内存
			实例
		 
			function a(){
			  var i = 0; 
				function b(){
					console.log(++i)
					
				// i=null 解决内存泄漏 
				  } 
			return b;
			} 
			var c = a();
			//执行a函数
			c()
			//执行b函数，也就是执行闭包，结果为1
			c()
			//2
		…      
		4.IE和Firefox处理兼容。
		解答

		绑定事件监听

			function addEvent(elem,eventName,handler){
			  
				if(elem.attachEvent){
					elem.attachEvent("on"+eventName,handler)
				  }else
				 
				if
				{
					elem.addEventListener(eventName,handler,false)
					}
			  }
			else{
				elem["on"+eventName]
			  }
			}
			function removeEvent(elem,eventName,handler){
			  
				if(elem.detachEvent){
					elem.detachEvent("on"+eventName,handler)
				  }
				else if
				{
					elem.removeEventListener(eventName,handler,false)
				  }
				else
				{
					elem["on"+eventName]
				  }      
			}
		获取到event对象

			function
			 getEvent(e){
			  
				return e ? e : windowm.event;
				}
			function getTarget(e){ 
			 return e.target||e.srcElement
			}
			//阻止默认和冒泡
			function prevent(e){
			  
				if(e.prevent){
					e.preventDefault();
				  }
				else
				{
					e.returnValue = false
				  }
				}
				function stop(e){
				   
				if(e.stopPropagation){
					e.stopPropagation();
				  }
				else
				{
					e.cancelBubble()}
			}
		5.将$(".red").attr("sth",4)装换成Js实现
		知识点

		得到的是数组，要遍历。

		解答

			var a = document.getElementsByClassName("red"); 
				for(var i =0;i<a.length;i++){
					a[i].setAttribute("sth",4)
			} 
		6.作用域问题
		解答

			var a = {n:1};
			var b =a;
			a.x=a={n:2};
			//a.x={n:2};a={n:2}
			console.log(a.x);
			//undefined
			console.log(b.x);
			//{n:2}
		理解，首先 var a={n:1} a这里指向一个对象， var b=a 则是将b也指向这个对象，第三行代码，实际是已经不共享对象了，a已经改写了，而b.x里面则添加了x = {n:2}，故有上结果。

		7.Boolean对象和Boolean值
		解答

			var x = new Boolean(false);
			if (x) {  
			alert('hi');
			} 
			var y = Boolean(0);
			if (y) {
			  alert('hello'); 
			}
			//alert("hi"),undefined
		8.什么是跨域？跨域的几种实现方法？
		解答 

		跨域是通过js在不同域进行数据传输或者通信，当端口号，协议，域名 不同的情况下，使用ajax是拿不到数据的。

		解决方法：

		使用 window.name 进行跨域

		a.html页面,比如说域名是 www.abc.com/a.html;这里需要注意的是 数据只能是字符串形式。

			<script>
			window.name ="我是a.html页面的数据，我是跨域请求的数据"
			</script>
			b.html页面，比如说 www.baidu.com/b.html

			<iframe	 
				id = "proxy"	 
				src = "www.abc.com/a.html"	 
				style ="display:none"	 
				onload ="getdata()"
				>
			</iframe>
			<script>
			  
			var	iframe = document.getElementById("proxy");
			  
			function getdata(){	iframe.onload = function(){		  
			var	data = iframe.contentWindow.name;
				  alert(data);
				}
			iframe.src = "about:blank";
			  }
			</script>
		  
		用H5 window.postMessage,可自行百度。

		9.判断当前浏览器的类型
		解答

			var userAgent = window.navigator.userAgent;
				if(userAgent.indexOf("Chorme")){
				  alert("是Chorme浏览器")
				};
				if(userAgent.indexOf("Safari")){
				  alert("是Safari浏览器")
				};
				if(userAgent.indexOf("Firefox")){
				  alert("是Firefox浏览器")
				};
		主要涉及的知识点 是考察window对象下的navigator对象的userAgent属性，得到是字符串，返回最字符串进行操作。

		HTML5，CSS3初级，中级面试题

		1.CSS3新特性有哪些？请做说明。不少于5条
		解答

		选择器类(稍微特别一点的)

		first-child
		last-child
		nth-child
		:cheecked
		文字样式

		@font-face

		@font
		-face{
		  font-family:BorderWeb;
		  src:url(BorderWeb.eot)
		}
		.border{
			font-family:"BorderWeb"
		}
		text-overflow & white-space & word-warp

		.ellipsis{
		  text-overflow:ellipsis; 
		  overflow:hidden;
		  white-space:nowrap; 
		  width:200px; 
		  background:#ccc;
		}
			   
		text-decoration 为文本添加下划线 默认值none

		边框

		背景
		样式
		圆角

		border-radius，四个参数 从上左到下右 4个方位。

		渐变

		线性渐变： linear-gradient(left,#333,#999) (默认是从上到下)，第一个参数为方位，可以是对角,如left to。也可以是角度，注意这里是顺时钟，如180deg就是从下到上
		径向渐变：`radial-gradient(center,circle,yellow 10%,bule 30%)
		阴影

		box-shadow
		反射， box-reflect
		背景

		background-clip
		布局

		flex布局
		多列布局column,参数column-count,column-gap,column-rule
		动画,过渡

		transition
		transform
		animation
		2.HTML有哪些新特性？
		解答

		新增标签
		<header>
		<footer>
		<nav>
		<section>
		<artical>
		<aside>
		<figure><figcaption>
		<details>
		用于绘画的 canvas 元素
		用于媒介回放的 video 和 audio 元素
		对本地离线存储的更好的支持 Local storge，sessionStorage
		新的表单控件，比如 calendar、date、time、email、url、search，移动端体验更好
		新增获取地理位置，上传文件等API
		新的跨域通信机制 window.postMessage
		3.localStorage,sessionStorage,cookie 的区别
		解答

		localStorage 用于持久化的本地存储，关闭页面还有，除非主动删除，否则一直存在，存储量大
		sessionStorage 不是持久化的本地存储，关闭页面就不会有
		cookie 是与服务器交互的，作为http规范的一部分而存在，在浏览器和服务器之间来回，存储量小
		4.如何触发页面的回流reflow,重绘repaint,解释下它们的基本原理
			解答

			DOM元素的修改，添加，删除。
			仅改变DOM元素的字体颜色，只有repaint
			应用新的样式或者修改任何元素外观的属性
			resilze浏览器窗口，滚动
			读取元素 如(offsetTop,offsetLeft等等)
			原理解析
			repaint 重绘 是当一个元素的外观被改变的时候产生重绘。
			reflow 重排（回流），是当DOM发生改变，如宽高等。如果reflow 的频繁，会导致GPU使用率上升
			减少性能影响的方法
			减少对DOM的操作，如 查询时候将值赋值给局部变量，减少循环对DOM的操作。
			使用JSON格式来进行数据交换
		5.transition的局限性
			解答

			transition 需要事件触发
			transition 是一次性的，不能重复，除非一在触发
			transition 只有开始和结束2种状态，不能定义中间状态
			transition 只能定义一个属性的变化，不能涉及多个属性。
			transition 不能识别display的变化。
		6.如何优化页面速度，提高页面响应。
			解答

			取消重定向，原因是网站都会首先加载一个空白的页面，然后在定向到另外的页面。
			合并javaScript
			合并css
			使用css sprite
			启用GZIP
			css,js引入文件位置，css放在 <head>里面，js放在尾部
			img标签要添加alt属性
			清除无效的a标签，并给a标签加上title属性
			缓存静态资源
			不用iframe/frame
			减少DNS域名查找时间，将DNS的时间设置为较低的水平，比如60-100ms进行一次DNS查询
		7.如何提高前端性能
			解答

			用webStorage代替cookie,可以减少HTTP请求的数据量
			使用css3动画，开启GPU加速。translate3d()
			缓存HTML标记
			8.如何对网站的文件和资源进行优化
			解答

			文件合并
			文件最小化
			使用cdn托管
			缓存的使用
		9.请简单说明浮动和绝对定位的区别和应用。
			解答

			二者都会脱离文档流，并自动转换为块级元素。不同的是绝对定位的元素是按照浏览器的左上角计算的或者对设置相对定位的父元素开始的，它的脱离文档流不占据空间，因此会产生覆盖页面上的其他元素，故有了z-index属性。
			浮动元素还是基于正常的文档流，只是在文档流中抽出，并尽可能的移动到最左侧或者右侧，文字内容会围绕在浮动元素周围，仍然在文档流中的元素会替补原先的空间。
		10.说说移动端的兼容和常见问题解决方案(整理了自己用过的)
			解答

		1. meta 元标签基础知识

		将窗口调整为设备窗口，并禁止用户缩放

		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
		忽略页面中的数字识别为电话号码,Android平台对邮箱的识别
		<meta name="format-detection",content="telephone=no">
		<meta name="format-detection",content="email=no">
		
		当网站添加到主屏幕快速启动方式,以及顶部导航条样式
		<meta name="apple-mobile-wep-app-capable",content="yes">
		<meta name="apple-mobile-web-app-status-bar-sytle",content="black">
		2. 移动端字体

		中文使用默认字体，英文用Helvetica

		3. 触摸事件的响应顺序

		1、ontouchstart 
		2、ontouchmove 
		3、ontouchend 
		4、onclick
		  
		4. Retina屏幕下问题解决

		移动端的视觉稿通常会设计为传统PC的2倍，通常把设计稿乘以2/1得到实际书写时候打大小

		图片则设置为 实际宽高的50%,如 background-position:50% 50%;

		5. IOS系统下被触摸的时候有半透明遮罩

			a,button,input,textarea{-webkit-tap-heightlight-color:rgb(0,0,0,0);}
		6. webkit表单元素的默认外观怎么重置
			.css{-webkit-appearance:none;}
		7. 打电话，发邮件

		<a href="tel:020-62682400">打电话给020-62682400</a>
		<a href="email:13249791010@163.com">13249791010@163.com</a>
		8. 移动端模拟hover效果，添加ontouchstart,ontouchend事件

		var btnBlue = document.querySelector(".btn-blue");
			btnBlue.ontouchstart = function(){		  
			this.className = "btn-blue btn-blue-on"
		}
			btnBlue.ontouchend = function(){
			this.className = "btn-blue"
		}
		9. ios下禁止调整字体大小

		body{-webkit-text-size-adjust:100%}
		
		10. ios下输入框取消大写

		<input autocapitalize="off" autocorrect="off">
		 
		11. css3动画

		尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位,用translate3D开启加速

		11.说说移动端2栏布局，左侧定宽，右侧自适应的几种方法
		解答
		HTML代码

		<div class="main">	
			<div class="left">左侧固定</div>
			<div class="right">右侧自适应<div>
		</div>
		第一种方法，浮动+定位(等高布局)

		.main{
		  position:relative;
		  padding-left:100px;
		  display:inline-block;
		}
		.left{
		  position:relative;		  
		  float:left;
		  width:100px;
		  margin-left:-100px;
		}
		.right{		  
		  float:left;
		}
		.right,.left{
		  height:200px;
		  min-height:200px;
		  height:auto!important;
		}
		第二种，浮动(等高布局)

		.main{
		  overflow:hidden;
		}
		.left{	  
			float:left;
			width:100px;
			padding-bottom:9999px;
			margin-bottom:9999px
		}
		.right{
		  margin-left:100px;
		  padding-bottom:9999px;
		  margin-bottom:9999px	  
		}
		.right,.left{
		  height:200px;
		  min-height:200px;
		  height:auto!important;
		  }
		第三种方法，定位+margin

		.left{
		  position:absolute;
		  top:0;
		  left:0;
		  width:100px;
		  height:400px
		}
		.right{
		  margin-left:100px;
		  height:400px;
		}
		第四种方法，定位

		.left{
		  position:absolute;
		  top:0;
		  left:0;
		  width:100px;
		  height:400px;
		}
		.right{
		  position:absolute;
		  top:0;
		  left:100px;
		  height:400px
		}
		第五种方法，flex

		.main{
			 display:flex;
			 }
		.left{
			 width:100px;
			 height:400px;
			 }
		.right{
			 flex:1;
			 height:400px;
		第六种方法 table

		.main{ 
			 display:table;
			 width:100%;
			 }
		.left{
			 display:table-cell
			 width:100px;
			 height:400px;
			 }
		.right{
			 display:table-cell
			 }
		12.websocket是什么？和http有什么关联(只是基于自己的理解，暂无相关项目经验)
		解答

		websocket属于H5新增的，websocket是基于http的,和http没有基本关系(或者说交集不大)，http只负责websokect的连接
		http不是持久性的协议，websocket是持久性的协议，在http中一个request对应一个response,也就说明了 http的缺点 http是被动的，服务器端不能主动发起请求
		ajax的轮询，每隔几秒发起一个请求给服务端，这样比较消耗内存,需要更快的响应速度
		polling 则是采用阻塞模型(打电话，如果没信息值一直不挂)，则是需要更多的电话，ajax的轮询和 polling 的作用是实时推送
		websokect解决的问题是，让服务端有主动性，只需要消耗一次的HTTP请求
		前后端分离的理解

		解答
		近期前后端分离特别热门，一直搞不懂前后端分离是个什么鬼，有个什么作用。只知道以前前端把写好的页面发给后端，后端套用接口，这样就比较容易出现问题，工作量也比较繁琐。当我自己用vue做webapp，写json数据结构的时候，才稍微有点意识，以前直接是把数据写死或者从后台调用在html上显示，但是在用了vue之后，你是不是很少看见在html模板里面有直接的数据显示！！！基本都是前后端通过json在交流，前端用vue去实现组件化，工程化，但是有一个缺点是不利于seo优化，你html里面都没关键字怎么优化。最后关键一点，后端值负责数据，前端值负责显示。

		分离的好处

		以前崇尚全栈工程师，一个人不但管前端并且管后端，甚至数据库。长期以往，代码的解耦性可能不是很好。
		前后端分离以后，前后端值专注于只自己的开发工作，打造一个全栈式的团队。特点之二是实现前后端的解耦，前后端只需要按照沟通好的参数和接口，只要这个不改变，也只要前端人员修改代码，减少工作量。
		要不要前后端分离，分为三点。

		轻前端页面
		布局简单，样式较少，无css动画，只有少量的业务逻辑，只需要在不同终端兼容
		重前端页面
		页面布局复杂，样式多，css动画多，有复杂的业务代码，需要在不同终端和浏览器上做兼容。
		前后端均衡
		页面布局始终，样式适中，少许动画，业务逻辑较为简单，且只需要在不同终端上兼容


		
		
		
		
		
		
		