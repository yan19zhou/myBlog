	1.打乱数组中元素顺序（类似音乐随机播放）

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min)
	}

	export function shuffle(arr) {
	  let _arr = arr.slice()
	  for (let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]

		_arr[j] = t
	  }
	  return _arr
	}

	扩展：
	1.取[10,100) 的随机整数方法

	Math.floor(Math.random()*90+10);

	2.取[10,100] 的随机整数方法

	function randomBy(under, over){ 
	   switch(arguments.length){ 
		 case 1: return parseInt(Math.random()*under+1); 
		 case 2: return parseInt(Math.random()*(over-under+1) + under); 
		 default: return 0; 
	   } 
	} 

	randomBy(10, 100);

	1.回车触发事件的代码

		$(function(){
			$('#username').focus();
			//回车查询
			document.onkeydown = function(event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 13) {
					$("#signIn").trigger('click');
				}
			};
		});
		

	2.把对象格式的参数转成键值对，并以&分割

	/**
	 * 把对象格式的参数转成键值对，并以&分割
	 * @param arr 要转换的对象参数
	 * @returns {string}
	 */
	function maiyaBuildParam(arr){
		var result = '';
		for(var key in arr)
		{
			result += key + "=" + encodeURIComponent(arr[key]) + "&";
		}
		result = result.substr(0,result.length-1);
		return result;
	}

	3.去除表单内容两端的空格，设置cookie缓存,对象转成字符串

	 function submitForm() {
			var param = {
				userName: $.trim($("#username").val()),
				password: $.trim($("#password").val())
				// userName: $("#username").val().trim(),
				// password: $("#password").val().trim()
				// ie8下边支持$.trim,   不支持$("#").val().trim()
			};
			$.ajax({
				type: "post",
				url: serverIp + "rest/login?" + Math.random() + "&" + BuildParam(param),   
				//这里传入一个随机数避免ie8缓存问题,下边cache对ie8无效
				//data: JSON.stringify(param),  //传入组装的参数
				//contentType: "application/json; charset=utf-8",
				cache: false,  //禁用缓存
				dataType: "json",
				success: function (result) {
					if(result.result_code === '1'){
						$.cookie('userinfo', JSON.stringify(result.data), { expires: 7 });
						window.location.href = "index.html";
					}else{
						alert('用户名或密码错误');
					}
				},
				error: function(msg) {
					alert(msg.message || '操作失败！');
				}
			})
		}

	4.设置cookie,获取cookie

	//设置cookie比,并将json数据源转成string
		$.cookie('userinfo', JSON.stringify(json), { expires: 7 });

	//获取cookie,并将返回的string格式数据解析成json
		JSON.parse($.cookie('userinfo'));
	 
	//清除cookie
		$.cookie('userinfo',null);

	项目示例

	//设置cookie
	 $.ajax({
				type: "post",
				url: serverIp + "rest/login?" + Math.random() + "&" + maiyaBuildParam(param),
				dataType: "json",
				success: function (result) {
					if(result.result_code === '1'){
						$.cookie('userinfo', JSON.stringify(result.data), { expires: 7 });
						window.location.href = "index.html";
					}else{
						alert('用户名或密码错误');
					}
				},
				error: function(msg) {
					alert(msg.message || '操作失败!');
				}
			})

	//获取和清空cookie
		if(!$.cookie('userinfo')) {
			location.href="login.html";
		}
		$("#loginOut a").click(function () {
			$.cookie('userinfo',null);
		});
		var userinfo = JSON.parse($.cookie('userinfo'));
		if(userinfo) {
			var _src = userinfo.docPic ? userinfo.docPic : (userinfo.docSex == 2 ? 'images/women.png' : 'images/man.png');
			$('#userInfoImage').attr("src",_src)
			$('#username,#leftusername').html(userinfo.docName);
			$('#jobtitle').html(userinfo.docProfe);
			var docRole = userinfo.docRole == 0 && '医师' || '管理员';
			$('#loginuser').html(docRole);
		}
		if(userinfo.docRole == 0) {
			$('#menu-product').show();
			$('#menu-admin,#menu-tongji').hide();
		} else if(userinfo.docRole == 1) {
			$('#menu-product').hide();
			$('#menu-admin,#menu-tongji').show();
		}

	说明：
	jquery.cookie.js 只允许开发人员存入字符串，故用JSON.stringify(json)将json转换成string

	补充：JSON.stringify与JSON.parse() [ 此类方法在低版本ie上需要引入json2.js ]

	parse用于从一个字符串中解析出json对象,如
	var str = '{"name":"huangxiaojian","age":"23"}'
	JSON.parse(str)
	-->
	Object
	age: "23"
	name: "huangxiaojian"
	__proto__: Object
	注意：单引号写在{}外，每个属性名都必须用双引号，否则会抛出异常。

	stringify()用于从一个对象解析出字符串，如
	var a = {a:1,b:2}
	JSON.stringify(a)
	--->
	结果："{"a":1,"b":2}"

	5.三目运算的另一种写法

	var docRole = userinfo.docRole == 0 && '医师' || '管理员';

	var _src = userinfo.docPic ? userinfo.docPic : (userinfo.docSex == 2 ? 'images/women.png' : 'images/man.png');

	记得以前看过别人写的文章里提到有网易的面试题出现过区分 ||  && 联合使用时返回的结果，当时老记不住，现在有这个应该容易记了

	6.时间格式化

	使用方式

	new Date().format('yyyy-MM-dd');  // "2017-02-18"

	new Date().format('yyyy-MM-dd hh-mm-ss');  //
	"2017-02-18 04-41-08"
	new Date().format('yyyy-MM-dd hh/mm/ss');  //
	"2017-02-18 04/41/18"
	new Date().format('yyyy-MM-dd HH/mm/ss');  //
	"2017-02-18 16/42/30"

	new Date().format('yyyy-MM-dd E HH/mm/ss');
	  //"2017-02-18 六 16/51/16"
	new Date().format('yyyy-MM-dd EE HH/mm/ss');  //
	"2017-02-18 周六 16/51/30"

	new Date().format('yyyy-MM-dd EEE HH/mm/ss');  //
	"2017-02-18 星期六 16/51/77"

	源码

	Date.prototype.format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //12小时
			"H+": this.getHours(), //24小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		var week = {
			"0": "日",
			"1": "一",
			"2": "二",
			"3": "三",
			"4": "四",
			"5": "五",
			"6": "六"
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}

	7.获取输入日期所在周或者前后某周的周一

	使用方式

	new Date();
	  //Sat Feb 18 2017 17:35:25 GMT+0800 (中国标准时间)

	getMonday( new Date(),-1);  //
	Mon Feb 06 2017 17:40:45 GMT+0800 (中国标准时间)

	getMonday( new Date());  //Mon Feb 13 2017 17:34:34 GMT+0800 (中国标准时间)

	getMonday( new Date(),1);  //
	Mon Feb 20 2017 17:34:43 GMT+0800 (中国标准时间)

	源码

	function getMonday(date, offset){
		var today=date || new Date();
		return new Date( today - ((today.getDay() ||7) -1  - (offset||0) *7 )  *864E5  );
	}


	//改进，获取输入日期所在周或者前后某周的任意某天
	function getWeekAnyday(weekday,offset,date){
		var today=date || new Date();
		return new Date( today - ((today.getDay() ||7) -(weekday||0)  - (offset||0) *7 )  *864E5  );
	}

	8.获取输入日期的前后某天日期

	使用方式

	new Date();
	  //Sat Feb 18 2017 17:35:25 GMT+0800 (中国标准时间)

	getOneDayByDate(new Date() ,-2);  //Thu Feb 16 2017 18:20:39 GMT+0800 (中国标准时间)

	getOneDayByDate(new Date() ,2);  //Mon Feb 20 2017 18:20:49 GMT+0800 (中国标准时间)

	源码

	function getOneDayByDate(date, n) {
		var d = typeof date == 'string' && new Date(date) || date;
		d.setTime(d.getTime()+24*60*60*1000*n);
		//return d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate();  //用于获取"2017-2-16"格式日期
		return new Date(d);
	}

	9.My97DatePicker使用

	首先引入js

	<script src="../My97DatePicker/WdatePicker.js"></script>

	场景1：选择时间段，前者不能大于后者的时间，后者不能小于前者时间且不大于当天时间

	<input type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'datemax\')||\'%y-%M-%d\'}'})"   id="datemin" class="input-text">  -

	<input type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'datemin\')}',maxDate:'%y-%M-%d'})" id="datemax" class="input-text">

	给input赋相差一个星期的初始值

	 $("#datemin").val(getOneDayByDate(new Date(), -6).format('yyyy-MM-dd'));
	 $("#datemax").val(thisDate());

	function thisDate() {
		var d = new Date();
		return d.format('yyyy-MM-dd');
	}

	10.刷新当前页面

	//刷新当前页面

	 location.reload();

	//如果把该方法的参数设置为 true，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。这与用户在单击浏览器的刷新按钮时按住 Shift 健的效果是完全一样。

	这是原生的方法
	11. 判断元素是否在数组内

	js方法

	var arr = [1, 2, 3];
	// js arr.indexOf(3)
	var result1 = arr.indexOf(3); //返回index为2

	jquery方法

	var arr = [1, 2, 3];
	// jquery $.inArray(3, arr)
	var result = $.inArray(3, arr); //返回index为2


	自定义方法

	var arr = [1, 2, 3];
	// 自定义 contains(arr, 3)方法
	function contains(arr, obj) {
		//while
		var i = arr.length;
		while(i--) {
			if(arr[i] === obj) {
				return i;
			}
		}
		return -1;
	}
	var result1 = contains(arr, 3); //返回index为2

	12.解析url中传递的参数

	描述：解析ajax get方式传递的参数，
	例如 “https://www.zybuluo.com/mdedi...”
	1.方法一

	使用方式

	$.getUrlParam('url'); //"https://www.zybuluo.com/static/editor/md-help.markdown"

	源码

	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = decodeURIComponent(window.location.search).substr(1).match(reg);
		if (r!=null) return unescape(r[2]); return null;
	};

	说明:此方式是将方法拓展到了jquery,也可以定义成方法

	使用方式

	getUrlParam('url'); //"https://www.zybuluo.com/static/editor/md-help.markdown"

	function getUrlParam(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = decodeURIComponent(window.location.search).substr(1).match(reg);
		if (r!=null) return unescape(r[2]); return null;
	};

	2.方法二将携带的所有参数转化成json对象

	使用方式

	var urlParamsToJson= getUrlParamsToJson(); //Object {url: "https://www.zybuluo.com/static/editor/md-help.markdown"}

	源码

	function getUrlParamsToJson() {
		var url = location.href;
		var nameValue;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var paraObj = {};
		for (var i = 0; nameValue = paraString[i]; i++) {
		  var name = nameValue.substring(0, nameValue.indexOf("=")).toLowerCase();
		  var value = nameValue.substring(nameValue.indexOf("=") + 1, nameValue.length);
		  if (value.indexOf("#") > -1) {
			 value = value.split("#")[0];
		  }
		  paraObj[name] = value;
		}
		return paraObj;
	};

	13.封装折叠（兼容ie8）

	html

	<ul id="Huifold1" class="Huifold">
	  <li class="item">
		<h4>标题<b>+</b></h4>
		<div class="info"> 内容<br>很多内容 </div>
	  </li>
	  <li class="item">
		<h4>标题<b>+</b></h4>
		<div class="info"><img src="pic/2.png" ></div>
	  </li>
	  <li class="item">
		<h4>标题<b>+</b></h4>
		<div class="info"><img src="pic/1.png" ></div>
	  </li>
	</ul>

	css

	.Huifold .item{ position:relative}
	.Huifold .item h4{margin:0;font-weight:bold;position:relative;border-top: 1px solid #fff;font-size:15px;line-height:22px;padding:7px 10px;background-color:#eee;cursor:pointer;padding-right:30px}
	.Huifold .item h4 b{position:absolute;display: block; cursor:pointer;right:10px;top:7px;width:16px;height:16px; text-align:center; color:#666}
	.Huifold .item .info{display:none;padding:10px}

	js

	jQuery.Huifold = function (obj, obj_c, speed, obj_type, Event,selected) {
		/*5个参数顺序不可打乱，分别是：相应区,隐藏显示的内容,速度,类型,事件*/
		//1    只打开一个，可以全部关闭
		//2    必须有一个打开
		//3    可打开多个
		//4全部打开
		var selected = selected ||"selected";
		if (obj_type == 2) {
			$(obj + ":first").find("b").html("-");
			$(obj_c + ":first").show();
		}
		if (obj_type == 4) {
			$(obj).find("b").html("-");
			$(obj_c).show();
		}
		if (obj_type == 5) {
			$(obj).find("b").html("-");
			$(obj_c).hide();
		}

		$(obj).on(Event, function () {
			// console.log("11111");
			if ($(this).next().is(":visible")) {
				if (obj_type == 2) {
					return false;
				}
				else {
					$(this).next().slideUp(speed).end().removeClass(selected);
					$(this).find("b").html("+");
				}
			}
			else {
				if (obj_type == 3 || obj_type == 4) {
					$(this).next().slideDown(speed).end().addClass(selected);
					$(this).find("b").html("-");
				} else {
					$(obj_c).slideUp(speed);
					$(obj).removeClass(selected);
					$(obj).find("b").html("+");
					$(this).next().slideDown(speed).end().addClass(selected);
					$(this).find("b").html("-");
				}
			}
		});
	};

	调用

	$(function(){

		 $.Huifold("#mealContainer>.item>.title", "#mealContainer>.item>.info", "fast", 4, "click");

	});

	14.封装tab页切换（兼容ie8）

	html

	<div id="tab_demo" class="HuiTab">
	  <div class="tabBar clearfix"><span>选项卡一</span><span>选项卡二</span><span>自适应宽度</span></div>
	  <div class="tabCon">内容一</div>
	  <div class="tabCon">内容二</div>
	  <div class="tabCon">内容三</div>
	</div>

	css

	.clearfix:after{content:"\20";display:block;height:0;clear:both;visibility:hidden}.clearfix{zoom:1}
	.tabBar {border-bottom: 2px solid #222}
	.tabBar span {background-color: #e8e8e8;cursor: pointer;display: inline-block;float: left;font-weight: bold;height: 30px;line-height: 30px;padding: 0 15px}
	.tabBar span.current{background-color: #222;color: #fff}
	.tabCon {display: none}

	js

	jQuery.Huitab = function (tabBar, tabCon, class_name, tabEvent, i, callback) {
		var $tab_menu = $(tabBar);
		// 锟斤拷始锟斤拷锟斤拷锟斤拷
		$tab_menu.removeClass(class_name);
		$(tabBar).eq(i).addClass(class_name);
		$(tabCon).hide();
		$(tabCon).eq(i).show();
		callback && callback(i);

		$tab_menu.on(tabEvent, function (event) {
			$tab_menu.removeClass(class_name);
			$(this).addClass(class_name);
			var index = $tab_menu.index(this).toString();
			$(tabCon).hide();
			$(tabCon).eq(index).show();
			callback && callback(index);
			event.stopPropagation();
		});
	};

	调用

	$(function(){

	   $.Huitab("#tabbarSonFirst>.tabBar span", "#tabbarSonFirst>.tabCon", "current", "click", "0", loadChart);

	});
	// #tabbarSonFirst 父级id
	// #tabbarSonFirst>.tabBar span控制条
	// #tabbarSonFirst>.tabCon内容区
	// current 选中tab样式
	// click 事件 点击切换，可以换成mousemove 移动鼠标切换
	// 1    默认第2个tab为当前状态（从0开始）
	// callback 实现选中后再加载函数
	function loadChart(i) {
		switch (i) {
			case '0'
				loopSportData();
				break;
			case '1'
				loopMealData();
				break;
			case '2':
				loadBloodPressureChart();
				break;
			default:
				break;
		}
	}

	15.正则校验Excel

	 var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
	if (!reg.test(path)) {//校验不通过
		alert("请上传excel格式的文件!");
		return;
	}

	16.正则表达式 数字和字母组合且必须含有一个

	$pattern = '/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/';

	分开来注释一下：
	^ 匹配一行的开头位置
	(?![0-9]+$) 预测该位置后面不全是数字
	(?![a-zA-Z]+$) 预测该位置后面不全是字母
	[0-9A-Za-z] {6,10} 由6-10位数字或这字母组成
	$ 匹配行结尾位置

	17.低版本ie支持function.bind()

	只需要添加一下代码，在需要的地方调用checkBind();就可以了

	function checkBind()
	{
		if (!Function.prototype.bind) {
			Function.prototype.bind = function(oThis) {
				if (typeof this !== "function") {
					throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
				}
				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function() {},
					fBound = function() {
						return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
					};
				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();
				return fBound;
			};
		}
	}

	18.标题栏闪动提示

	来源:张鑫旭的博客文章
	样式：

	JS代码：
	var titleInit = document.title, isShine = true;

	setInterval(function() {
		var title = document.title;
		if (isShine == true) {
			if (/新/.test(title) == false) {
				document.title = '【你有新消息】';    
			} else {
				document.title = '【　　　　　】';
			}
		} else {
			document.title = titleInit;
		}
	}, 500);

	window.onfocus = function() {
		isShine = false;
	};
	window.onblur = function() {
		isShine = true;
	};

	// for IE
	document.onfocusin = function() {
		isShine = false;
	};
	document.onfocusout = function() {
		isShine = true;
	};

	19.img图片垂直居中

	<div id="box">
		<img src="images/demo.jpg" alt="" />
	</div>

	#box{
		width:500px;height:400px;
		text-align:center;
		border:1px solid #d3d3d3;background:#fff;
		display: table-cell;
		vertical-align:middle;
	 
	}
	 
	#box img{
		vertical-align:middle;
	}

	20.decodeURI() 函数解码处理不了"+"

	使用javascript的decodeURIComponent函数解码查询字符串时，处理不了"+"，例如下面

	这里需要再做一下处理：

	decodeURIComponent(str.replace(/\+/g, '%20'));

	即在调用decodeURIComponent函数之前要先把+替换为%20,这样就没有问题了

	1.数组去重

	方法1: （ES5）

	function unique(a) {
	  var res = [];

	  for (var i = 0, len = a.length; i < len; i++) {
		var item = a[i];

		(res.indexOf(item) === -1) && res.push(item);
	  }

	  return res;
	}

	var a = [1, 1, '1', '2', 1];
	var ans = unique(a);
	console.log(ans); // => [1, "1", "2"]

	或

	function unique(a) {

	  var res = a.filter(function(item, index, array) {
		  return array.indexOf(item) === index;
	  });
	  
	  return res;
	}


	var a = [1, 1, '1', '2', 1];
	var ans = unique(a);
	console.log(ans); // => [1, "1", "2"]

	方法2: （ES6）

	Set 以及 Array.from 方法：

	function unique(a) {
	  return Array.from(new Set(a));
	}

	var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
	var ans = unique(a);
	console.log(ans); // => [Object, Object, String, Number]

	2.数组不是原始数据类型

	typeof {} === 'object'  // true
	typeof 'a' === 'string' // true
	typeof 1 === number     // true
	// But....
	typeof [] === 'object'  // true

	如果你想知道你的变量是不是数组，你仍然可以用Array.isArray(myVar)

	原始数据 （原始值、原始数据类型）不是一种 object 类型并且没有自己的方法的。在 JavaScript 中，有六种原始数据类型：string，number，boolean，null，undefined，symbol (new in ECMAScript 2015)。
	3.两个数组内的元素相加

	var a = [1,2,3,4,3];
	var b = [4,5,6,7];
	var c = a.map(function(v, i){
		return v + (b[i] || 0);
	});
	console.log(c);

	第二种考虑兼容
	var a=[1,2,3,4,5];
	var b=[6,7,8,9];
	var c=[];
	for (var i=0;i<a.length;i++){
	  c[i]=a[i]+(b[i]||0);
	}
	console.log(c);//[7, 9, 11, 13, 5]

	4.一个数组插入到另一个数组

	通过Array.prototype.push.apply方法将一个数组插入到另外一个数组

		var a = [1,2,3];
		var b = [4,5,6];
		Array.prototype.push.apply(a, b);
		console.log(a); //  [1, 2, 3, 4, 5, 6]

	5.数字排序

	Javascript 的sort()函数在默认情况下使用字母数字（字符串Unicode码点）排序。

	所以

	[1,2,5,10].sort()

	//会输出 

	[1, 10, 2, 5]

	要正确的排序一个数组, 你可以用

	[1,2,5,10].sort((a, b) => a — b)

	//会输出 从小到大排序

	[1, 2, 5, 10]

	从大到小排序即

	[1,2,5,10].sort((a, b) => b-a)

	6.replace替换字符串

	let s = "bob"
	const replaced = s.replace('b', 'l')
	replaced === "lob"
	s === "bob"

	我觉得这是一件好事，因为我不喜欢函数改变它们的输入。 你还应该知道 replace 只会替换第一个匹配的字符串:

	如果你想替换所有匹配的字符串，你可以使用带/g标志的正则表达式 :

	"bob".replace(/b/g, 'l') === 'lol' // 替换所有匹配的字符串

	7. 比较的时候要注意

	// These are ok
	'abc' === 'abc' // true
	1 === 1         // true
	// These are not
	[1,2,3] === [1,2,3] // false
	{a: 1} === {a: 1}   // false
	{} === {}           // false

	原因：[1,2,3]和[1,2,3]是两个独立的数组。它们只是恰好包含相同的值。它们具有不同的引用，无法用===相比较。
	8. 闭包

	const Greeters = []
	for (var i = 0 ; i < 10 ; i++) {
	  Greeters.push(function () { return console.log(i) })
	}
	Greeters[0]() // 10
	Greeters[1]() // 10
	Greeters[2]() // 10

	你是不是认为它会输出 0, 1, 2… ？ 你知道它为什么不是这样输出的吗? 你会怎样修改让它输出 0, 1, 2… ？

	这里有两种可能的解决方法：

		用 let 替代 var. Boom. 解决了.

		let和var的不同在于作用域。var的作用域是最近的函数块，let的作用域是最近的封闭块，封闭块可以小于函数块（如果不在任何块中，则let和var都是全局的）。（来源）

		替代方法: 用 bind:

	Greeters.push(console.log.bind(null, i))

	9.当点击 复制 按钮的时候, 将选中的文字复制到粘贴板上

	<input type="text" id="copytest"/>
	<input type="button" value="复制" onclick="clickBtn()"/>

	function clickBtn(){
		// 获取 input 元素
		var input = document.querySelector('#copytest');
		//或 var input = document.getElementById('copytest');
		input.focus();
		input.select();
	   
		// 执行复制命令
		document.execCommand('Copy')
	 }

	核心代码 document.execCommand() 方法, 该方法的大概用途是 对选中区域 进行一些操作
	10.JS获取textarea中剩余字数

	html部分：

	<textarea id="text_txt1"></textarea>
	<span id ="num_txt1">剩余可输入600字</span>

	js部分：

	function changeLength(obj,num){
		obj.on('keyup',function(){
		var txtval = obj.val().length;
		//console.log(txtval);
		var str = parseInt(600-txtval);
		//console.log(str);
		if(str > 0 ){
			num.html('剩余可输入'+str+'字');
		}else {
			num.html('剩余可输入0字');
			obj.val(obj.val().substring(0, 600));
		}
			//console.log($('#num_txt').html(str));
		});
	}
	$(function(){ //我这里有四个，所以调用4次
		changeLength($('#text_txt1'),$('#num_txt1'));
		changeLength($('#text_txt2'),$('#num_txt2'));
		changeLength($('#text_txt3'),$('#num_txt3'));
		changeLength($('#text_txt4'),$('#num_txt4'));
	});

	11.js中的点击事件

	//html
	<button id="btn">click</button>
	var btn=document.getElementById('btn');

	//js 第一种：
	btn.onclick=function(){
		alert('hello world');
	}

	//消除事件
	btn.onclick=null;//就不会弹出框了

	//js 第二种：
	btn.addEventListener('click',function(){
		alert('hello world')
	},false);
	btn.addEventListener('click',function(){
		alert(this.id)
	},false);

	//js 第三种：
	function demo(){
	　　alert('hello');
	}
	<button id="btn" onclick="demo()">click</button>

		js触发按钮点击事件
		模拟JS触发按钮点击功能

	<html> 
	  <head> 
		<title>usually function</title> 
	  </head> 
	  <script> 
	function load(){ 
	  //下面两种方法效果是一样的 
	  document.getElementById("target").onclick(); 
	  document.getElementById("target").click(); 
	} 
	function test(){ 
	  alert("test"); 
	} 
	</script> 
	  <body onload="load()"> 
		<button id="target" onclick="test()">test</button> 
	  </body> 
	<html>
	//备注：
	//btnObj.click()是真正地用程序去点击按钮，触发了按钮的onclick()事件
	//btnObj.onclick()只是简单地调用了btnObj的onclick所指向的方法，
	//只是调用方法而已，并未触发事件

	12.清除浮动clearfix一种写法(stylus)

	.clearfix
	  display :inline-block
	  &:after
		display :block
		content:"."
		height:0
		line-height: 0
		clear :both
		visibility :hidden

	13.星星评分计算

	很多商品评价中都会涉及评分，再根据评分计算星星个数

	现介绍一种方法：

	每个都是单个星星，分为三种.png图

	  const LENGTH = 5;//星星个数
	  const CLS_ON = 'on';//全部选中星星的classNmae
	  const CLS_HALF = 'half';//半个选中的classNmae
	  const CLS_OFF = 'off';//未选中的classNmae

	  let result = [];
	  let score = Math.floor(this.score * 2) / 2; 
	 //计算评分，如4.7会计算成4.5分，4.3会计算成4分
	  let hasDecimal = score % 1 !== 0; //计算是否存在半颗星
	  let integer = Math.floor(score); //计算有几个完全选中的星星
	  for (let i = 0; i < integer; i++) {
		result.push(CLS_ON);//数组中添加全部选中星星的classNmae
	  };
	  if (hasDecimal) {
		result.push(CLS_HALF);//数组中添加半颗星星的classNmae
	  };
	  while (result.length < LENGTH) {
		result.push(CLS_OFF);//数组中补充未点亮星星的classNmae
	  };
	  return result;//返回数组
			

	14.关闭页面弹框提示

	类似下图效果

	window.onbeforeunload=function (){
	   var warning = "请确认保存后再退出哦!";
	   return warning;
	}
	//注：现在不能弹出自定义的信息，暂时不知道原因，
	//后续会追踪这个问题（如果你知道可以留下评论）
	//关闭页面时的一些清楚缓存，ajax退出登录等操作可以写在函数里

	15.封装jsonp

	import originJSONP from 'jsonp'

	// 封装的 jsonp 函数
	export default function jsonp(url, data, options) {		
	  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)	  
	  return new Promise((resolve, reject) => {
		originJSONP(url, options, (err, data) => {
		  if(!err) {
			resolve(data)
		  } else {
			reject(err)
		  }
		})
	  })
	}

	// url 拼接函数
	function param(data) {
	  let url = ''
	  for(let k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += `&${k}=${encodeURIComponent(value)}`
	  }
	  return url ? url.substring(1) : ''
	}

	16.firefox 加入toolTip提示信息后 页面抖动

		在firefox中 默认页面不超过一页是没有滚动条的 加入页面中某些元素会临时改变页面高度 比如用了toolTip 之类的提示小工具 就会出现滚动条时有时无 导致页面抖动

	解决方法: 添加css代码

	body{
	  overflow: -moz-scrollbars-vertical;
	}

	17.判断游览器内核，自动添加前缀实现css属性兼容

	let elementStyle = document.createElement('div').style
	// 主流浏览器内核

	let vendor = (() => {
	  let transfromNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		ms: 'msTransform',
		O: 'OTransform',
		standard: 'transform'
	  }

	  for (let key in transfromNames) {
		if (elementStyle[transfromNames[key]] !== undefined) {
		  return key
		}
	  }

	  return false
	})()

	// 添加样式的浏览器前缀
	export function prefixStyle(style) {
	  if (vendor === false) {
		return false
	  }

	  if (vendor === 'standard') {
		return style
	  }

	  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
	}

	18.添加className

	// 为元素添加类名
	export function addClass(el, className) {
	  // 先判断一下元素是否含有需要添加的类名，有则直接 return
	  if (hasClass(el, className)) {
		return
	  }
	  // 把该元素含有的类名以空格分割
	  let newClass = el.className.split(' ')
	  // 把需要的类名 push 进来
	  newClass.push(className)
	  // 最后以空格拼接
	  el.className = newClass.join(' ')
	}

	// 判断是否有要查看的 className，有则返回true，否则返回 false
	export function hasClass(el, className) {
	  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

	  return reg.test(el.className)
	}

	19.获取或设置data- 属性

	export function getData(el, name, val) {
	  const prefix = 'data-'
	  name = prefix + name
	  if (val) {
		return el.setAttribute(name, val)
	  } else {
		console.log('el.getAttribute(name)', el.getAttribute(name))
		return el.getAttribute(name)
	  }
	}

	20.基于jq的datatables(兼容ie8)基本配置

	描述：采用基于jq的datatables(兼容ie8)
	主要功能：基本配置，服务端分页，清楚缓存，刷新等 

	/************************表格刷新*****************************/
				$("#searchFormBtn").click(function () {
					tablebyGroup.ajax.reload();
				});

		function queryUserByGroup() {
				tablebyGroup = $('#workArr').DataTable({
					destroy: true,
					serverSide: true,  //启用服务器端分页
					searching: false,  //禁用原生搜索
					orderMulti: false,  //启用多列排序
					order: [],  //取消默认排序查询,否则复选框一列会出现小箭头
					renderer: "bootstrap",  //渲染样式：Bootstrap和jquery-ui
					pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers

					iDisplayLength:100,
					ajax: function (data, callback, settings) {
						var selected = $('#selectWorkArr').val();
						var param = {
							depId: parseInt(selected),
							docId: JSON.parse($.cookie('userinfo')).docId
						};
						//ajax请求数据
						$.ajax({
							type: "post",
							url: serverIp + "rest/doctor/selectWorkGroup?" + Math.random() + "&" + maiyaBuildParam(param),
							cache: false,  //禁用缓存
	//                        data: JSON.stringify(param),  //传入组装的参数
	//                        contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function (result) {
								var returnData = {};
								returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
								returnData.recordsTotal = result.data.length;//返回数据全部记录
								returnData.recordsFiltered = result.data.length;//后台不实现过滤功能，每次查询均视作全部结果
								returnData.data = result.data;//返回的数据列表
								//调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
								//此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
								callback(returnData);
							},
							error: function(msg) {
								alert(msg.message || '查询失败')
							}
						});
					},
					bFilter: false,//去掉搜索框方法
					bLengthChange: false, //去掉每页显示多少条数据方法
					"ordering": false,//禁止排序
					"columns": [
						{"data": "pName"},
						{"data": "pSex"},
						{"data": "strBirthDate"},
						{"data": "pCardNum"},
						{"data": "pPhone"},
						{"data": "cName"},
						{"data": "pActivited"}
					],
					paging: false,
					"columnDefs": [{
						"render": function(data, type, row, meta) {
							//渲染 把数据源中的标题和url组成超链接
							return '<a href="javascript:showStatistics(' + row.pId  +','+ row.pActivited + ');" style="color:blue;text-decoration: underline">'+data+'</a>';
						},
						//指定是第1列
						"targets": 0
					},{
						"render": function(data, type, row, meta) {
							return data == 1 && '男' || '女';
						},
						//指定是第1列
						"targets": 1
					},{
						"render": function(data, type, row, meta) {
							return data == 1 && '已注册' || '未注册';
						},
						//指定是第1列
						"targets": 6
					}]
				});
			}

		引用：
		
		
		
		
	21.jquery根据option的text定位选中option
			
		解决一：精确匹配，选择文本与所给字符串完全一样的option。

		$('#test option').filter(function(){return $(this).text()=="b";}).attr("selected",true);  

		解决二：子串匹配，选择文本包含所给字符串的option。

		$("#test option:contains('b')").attr('selected', true);  	
				
		
		
		
		
		
	22.发布名称悬浮显示全部文字	tips
	
	 var timer = null;
	 window.publishEvents = {
	 	'mouseover .publishNameCol': function (e, value, row, index) {
			clearTimeout(timer);
	 		var clientX = e.clientX;
	 		var clientY = e.clientY;
	 		var scrollTop = 0;
	 		if (document.documentElement && document.documentElement.scrollTop) {
	 			scrollTop = document.documentElement.scrollTop;
			} else if (document.body) {
	 			scrollTop = document.body.scrollTop;
	 		}
	 		timer = setTimeout(function () {
	 			// console.log(clientX, clientY);
	 			$("#showbox").css("left", clientX).css("top", clientY + scrollTop);
	 			if (value == "") {
	 				$("#showbox").hide();
				} else {
					$("#showbox").show();
					$("#showbox").html(value);
	 			}
	 		}, 1000);
	 	},
	 	'mouseout .publishNameCol': function (e, value, row, index) {
	 		clearTimeout(timer);
			$("#showbox").hide();
	 	}
	 }
		
	23.拖拽

		$(function () {		
			$('.box').on('mousedown',function(e) {  // .box为固定布局
			var positionDiv = $(this).offset();
			var distenceX = e.pageX - positionDiv.left;
			var distenceY = e.pageY - positionDiv.top;

			$(document).mousemove(function(e) {
			var x = e.pageX - distenceX;
			var y = e.pageY - distenceY;
			if (x < 0) {
			x = 0;
			} else if (x > $(document).width() - $('.box').outerWidth(true)) {
			x = $(document).width() - $('.box').outerWidth(true);
			}
			if (y < 0) {
			y = 0;
			} else if (y > $(document).height() - $('.box').outerHeight(true)) {
			y = $(document).height() - $('.box').outerHeight(true);
			}
			$('.box').css({
			'left': x + 'px',
			'top': y + 'px'
			});
			});
			$(document).mouseup(function() {
			$(document).off('mousemove');
			});
			return false;
			});
		})
		
	24.侧滑显示删除按钮

		*{margin:0;padding:0;}
		body{font-size:.14rem;}
		li{list-style:none;}
		i{font-style:normal;}
		a{color:#393939;text-decoration:none;}
		.list{overflow:hidden;padding-left:.3rem;}
		.list li{width:120%;border-bottom:1px solid #ddd;}
		.list li p{overflow:hidden;height:.88rem;line-height:.88rem;-webkit-transition:all 0.3s linear;transition:all 0.3s linear;}
		.list li a{display:inline-block;width:85%;}
		.list li i{float:right;width:15%;text-align:center;background:#E2421B;color:#fff;}
		.swipeleft{transform:translateX(-15%);-webkit-transform:translateX(-15%);}

			//计算根节点HTML的字体大小
			function resizeRoot(){
				var deviceWidth = document.documentElement.clientWidth,
					num = 750,
					num1 = num / 100;
				if(deviceWidth > num){
					deviceWidth = num;  
				}
				document.documentElement.style.fontSize = deviceWidth / num1 + "px";
			}
			//根节点HTML的字体大小初始化
			resizeRoot();

			window.onresize = function(){
				resizeRoot();
			};
			</script>
			</head>
			<body>
			<section>
			<div class="list">
				<ul>
					<li><p><a href="#">侧滑显示删除按钮</a><i>删除</i></p></li>
					<li><p><a href="#">侧滑显示删除按钮</a><i>删除</i></p></li>
					<li><p><a href="#">侧滑显示删除按钮</a><i>删除</i></p></li>
				</ul>
			</div>
			<script>
			//侧滑显示删除按钮
			var expansion = null; //是否存在展开的list
			var container = document.querySelectorAll('.list li p');
			for(var i = 0; i < container.length; i++){    
				var x, y, X, Y, swipeX, swipeY;
				container[i].addEventListener('touchstart', function(event) {
					x = event.changedTouches[0].pageX;
					y = event.changedTouches[0].pageY;
					swipeX = true;
					swipeY = true ;
					if(expansion){   //判断是否展开，如果展开则收起
						this.className = "";
					}        
				});
				container[i].addEventListener('touchmove', function(event){     
					X = event.changedTouches[0].pageX;
					Y = event.changedTouches[0].pageY;        
					// 左右滑动
					if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
						// 阻止事件冒泡
						event.stopPropagation();
						if(X - x > 10){   //右滑
							event.preventDefault();
							this.className = "";    //右滑收起
						}
						if(x - X > 10){   //左滑
							event.preventDefault();
							this.className = "swipeleft";   //左滑展开
							expansion = this;
						}
						swipeY = false;
					}
					// 上下滑动
					if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
						swipeX = false;
					}        
				});
			}

			var i = document.querySelectorAll('.list li i');
			i.forEach(function(item, index){
				i[index].onclick = function(){
					this.parentNode.parentNode.remove();
				};
			});

		
		
		
		
		
		
		
		