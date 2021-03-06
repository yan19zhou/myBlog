Ajax:
//各大浏览器支持ajax的方式略有不同：
1.普通的标准浏览器：
	var xhr=new XMLHttpRequest();
2.ie7以下IE版本：
	var xhr=new ActiveXObject("Msxml2.XMLHTTP");

//ajax没有破坏js单线程机制：
 浏览器有4种线程：
	 1.GUI渲染线程；
	 2.js引擎线程；
	 3.浏览器事件触发线程；
	 4.http请求线程；
	 线程间交互以事件的方式发生，通过事件回调的方式通知，事件回调通过先进先出的方式添加到任务队列，任务队列中的回调事件在js引擎空闲时依次执行；
	 这些回调包括：setTimeOut setInterval,click,ajax等；
 //浏览器中，js引擎线程会循环从任务队列中读取事件并执行，这种机制成为event Loop(事件循环)；
 对于一个ajax请求，首先生成一个xmlhttpRequest对象，open过后，调用send方法，这时产生了http请求，请求被异步发送出去，js引擎不会等待回应而继续执行其他动作；当response后，浏览器监捕获到了ajax的回调事件onreadystatechange，然后将此事件添加到任务队列的末尾；直到js引擎空闲了再执行；
	 在onreadystatechange内部可能会执行dom事件，执行GUI渲染线程，对UI进行重绘或回流，当JS引擎重新执行时，GUI线程会暂时挂起，等引擎空闲时执行；
 //ajax和setTimeOut排队问题：
	ajax和setTimeOut的回调事件会按照顺序自动添加到任务列队，依次执行，然而，ajax并非所有事件都是异步，
	readyState==1的onreadystatechange回调和onloadstart回调是同步执行的
 //XMLHttpRequest对象属性解读：
 1.在谷歌浏览器console中创建一个XMLHttpRequest对象并输出他
 //继承：inherit
	XMLHttpRequest 实例对象没有自有属性. 实际上, 它的所有属性均来自于 XMLHttpRequest.prototype .
	追根溯源, XMLHttpRequest 实例对象具有如下的继承关系. (下面以a<<b表示a继承b)
	xhr << XMLHttpRequest.prototype << XMLHttpRequestEventTarget.prototype << EventTarget.prototype << Object.prototype
	由上, xhr也具有Object等原型中的所有方法. 如toString方法.
//readyState只读属性：
	 readyState属性记录了ajax调用过程中所有可能的状态. 它的取值简单明了, 如下:
			readyState 	对应常量 	                  描述
		0 (未初始化) 	xhr.UNSENT 	            请求已建立, 但未初始化(此时未调用open方法)
		1 (初始化) 	    xhr.OPENED 	            请求已建立, 但未发送 (已调用open方法, 但未调用send方法)
		2 (发送数据) 	xhr.HEADERS_RECEIVED 	请求已发送 (send方法已调用, 已收到响应头)
		3 (数据传送中) 	xhr.LOADING 	        请求处理中, 因响应内容不全, 这时通过responseBody和responseText获取可能会出现错误
		4 (完成) 	    xhr.DONE 	            数据接收完毕, 此时可以通过通过responseBody和responseText获取完整的响应数据

		注意, readyState 是一个只读属性, 想要改变它的值是不可行的.
//onreadystatechange：
	此回调方法在readyState改变时触发，所以在一个ajax响应周期中，此方法会触发4次，另：此方法回调中默认传入event实例；
//status：
	只读属性，表示 http请求的状态，初始为0，默认为200即成功；
//StatusText：
	只读属性，http请求的状态信息；例如：200，返回OK；
//onloadstart：
	 此事件回调方法在ajax请求发送之前触发，触发时机为readyState==1和readystate==2之间；此回调方法默认传入ProgressEvent事件进度对象；
	 ProgressEvent对象具有三个重要的Read only属性.
		lengthComputable 表示长度是否可计算, 它是一个布尔值, 初始值为false.
		loaded 表示已加载资源的大小, 如果使用http下载资源, 它仅仅表示已下载内容的大小, 而不包括http headers等. 它是一个无符号长整型, 初始值为0.
		total 表示资源总大小, 如果使用http下载资源, 它仅仅表示内容的总大小, 而不包括http headers等, 它同样是一个无符号长整型, 初始值为0.

//	onprogress事件回调方法在 readyState==3 状态时开始触发,
		默认传入 ProgressEvent 对象, 可通过 e.loaded/e.total 来计算加载资源的进度, 该方法用于获取资源的下载进度.
		注意: 该方法适用于 IE10+ 及其他现代浏览器.
		xhr.onprogress = function(e){
		  console.log('progress:', e.loaded/e.total);
		} 
			 
//onload：
	onload事件回调方法在ajax请求成功后触发, 触发时机在 readyState==4 状态之后.
		想要捕捉到一个ajax异步请求的成功状态, 并且执行回调, 一般下面的语句就足够了:
		xhr.onload = function(){
		  var s = xhr.status;
		  if((s >= 200 && s < 300) || s == 304){
			var resp = xhr.responseText;
			//TODO ...
		  }
		}		
//timeout：属性用于指定ajax的超时时长 ，
    通常设置为0时不生效.
    设置为字符串时, 如果字符串中全部为数字, 它会自动将字符串转化为数字, 反之该设置不生效.
    设置为对象时, 如果该对象能够转化为数字, 那么将设置为转化后的数字.
		xhr.timeout = 0; //不生效
		xhr.timeout = '123'; //生效, 值为123
		xhr.timeout = '123s'; //不生效
		xhr.timeout = ['123']; //生效, 值为123
		xhr.timeout = {a:123}; //不生效	 
//ontimeout 在ajax请求超时时触发，可以在请求超时时做一些后续处理；
//response responseText

	均为只读属性, response表示服务器的响应内容, 相应的, responseText表示服务器响应内容的文本形式.
//responseXML
	只读属性, responseXML表示xml形式的响应数据, 缺省为null, 若数据不是有效的xml, 则会报错.
//responseType
	responseType表示响应的类型, 缺省为空字符串, 可取 "arraybuffer" , "blob" , "document" , "json" , and "text" 共五种类型.
//responseURL
	responseURL返回ajax请求最终的URL, 如果请求中存在重定向, 那么responseURL表示重定向之后的URL.
//getResponseHeader 获取响应头
//setRequestHeader 设置请求头	 
//upload
	upload属性默认返回一个 XMLHttpRequestUpload 对象, 用于上传资源. 该对象具有如下方法:
		onloadstart
		onprogress
		onabort
		onerror
		onload
		ontimeout
		onloadend
	上述方法功能同 xhr 对象中同名方法一致. 其中, onprogress 事件回调方法可用于跟踪资源上传的进度.	 
//XHR二级
XHR2 即 XMLHttpRequest Level 2. XHR2针对XHR1的上述缺点做了如下改进:
    支持二进制数据, 可以上传文件, 可以使用FormData对象管理表单.
    提供进度提示, 可通过 xhr.upload.onprogress 事件回调方法获取传输进度.
    依然受 同源策略 限制, 这个安全机制不会变. XHR2新提供 Access-Control-Allow-Origin 等headers, 设置为 * 时表示允许任何域名请求, 从而实现跨域CORS访问(有关CORS详细介绍请耐心往下读).
    可以设置timeout 及 ontimeout, 方便设置超时时长和超时后续处理.
	这里就H5新增的FormData对象举个例.
	//可直接创建FormData实例
		var data = new FormData();
		data.append("name", "louis");
		xhr.send(data);
	//还可以通过传入表单DOM对象来创建FormData实例
		var form = document.getElementById('form');
		var data = new FormData(form);
		data.append("password", "123456");
		xhr.send(data);
	目前, 主流浏览器基本上都支持XHR2, 除了IE系列需要IE10及更高版本. 因此IE10以下是不支持XHR2的.
	那么问题来了, IE7, 8,9的用户怎么办? 很遗憾, 这些用户是比较尴尬的. 对于IE8,9而言, 只有一个阉割版的 XDomainRequest 可用,IE7则没有. 		 
//XDomainRequest
	XDomainRequest 对象是IE8,9折腾出来的, 用于支持CORS请求非成熟的解决方案. 以至于IE10中直接移除了它, 并重新回到了 XMLHttpRequest 的怀抱.
	XDomainRequest 仅可用于发送 GET和 POST 请求. 如下即创建过程.
	var xdr = new XDomainRequest();
	xdr具有如下属性:
		timeout
		responseText
	如下方法:
		open: 只能接收Method,和url两个参数. 只能发送异步请求.
		send
		abort
	如下事件回调:
		onprogress
		ontimeout
		onerror
		onload
	除了缺少一些方法外, XDomainRequest 基本上就和 XMLHttpRequest 的使用方式保持一致.
	必须要明确的是:
		XDomainRequest 不支持跨域传输cookie.
		只能设置请求头的Content-Type字段, 且不能访问响应头信息.
//$.ajax jQuery封装的ajax；
	他只包含一个参数，该参数为key-value对象；			
		 
//Axios 一个短小精悍的http库
//CORS：跨域资源共享 
//HTML启用CORS
	http-equiv 相当于http的响应头, 它回应给浏览器一些有用的信息,以帮助正确和精确地显示网页内容. 如下html将允许任意域名下的网页跨域访问.
	<meta http-equiv="Access-Control-Allow-Origin" content="*">	 
//jquery文件上传：
		$.ajax({
			  type: method,
			  url: url,
			  data: formData,
			  processData : false,
			  contentType : false ,//必须false才会自动加上正确的Content-Type
			  xhr: function(){
				var xhr = $.ajaxSettings.xhr();//实际上就是return new window.XMLHttpRequest()对象
				if(xhr.upload) {
				  xhr.upload.addEventListener("progress", function(e){
					console.log("jq upload progress:", e.loaded/e.total*100 + "%");
				  }, false);
				  xhr.upload.addEventListener("load", function(){
					console.log("jq upload onload.");
				  });
				  xhr.addEventListener("load", function(){
					console.log("jq onload.");
				  });
				  return xhr;
				}
			  }
			});
//angular文件上传：
		$http({
			  method: method,
			  url: url,
			  eventHandlers: {
				progress: function(c) {//下载进度
				  console.log('Progress -> ' + c);
				}
			  },
			  uploadEventHandlers: {
				progress: function(e) {//上传进度
				  console.log('UploadProgress -> ' + e);
				}
			  },
			  data: formData,
			}).success(function(res) {
			  console.log(res);
			}).error(function(err, status) {
			  console.log(err);
			});
//ajax请求二进制文件:主要是H5的fileReader：
	//ajax请求二进制图片并预览
		var xhr = new XMLHttpRequest(),
			url = "http://louiszhai.github.io/docImages/ajax01.png";
			xhr.open("GET", url);
			xhr.responseType = "blob";
			xhr.onload = function(){
		  if(this.status == 200){
			var blob = this.response;
			var img = document.createElement("img");
			//方案一
			img.src = window.URL.createObjectURL(blob);//这里blob依然占据着内存
			img.onload = function() {
			  window.URL.revokeObjectURL(img.src);//释放内存
			};
			//方案二
			/*var reader = new FileReader();
			reader.readAsDataURL(blob);//FileReader将返回base64编码的data-uri对象
			reader.onload = function(){
			  img.src = this.result;
			}*/
			//方案三
			//img.src = url;//最简单方法
			document.body.appendChild(img);
		  }
		}
		xhr.send();
//ajax请求二进制文本并展示
		var xhr = new XMLHttpRequest();
		xhr.open("GET","http://localhost:8080/Information/download.jsp?data=node-fetch.js");
		xhr.responseType = "blob";
		xhr.onload = function(){
		  if(this.status == 200){
			var blob = this.response;
			var reader = new FileReader();
			reader.readAsBinaryString(blob);//该方法已被移出标准api,建议使用reader.readAsText(blob);
			reader.onload=function(){
			  document.body.innerHTML = "<div>" + this.result + "</div>";
			}
		  }
		}
		xhr.send();
//如何等待多个ajax请求完成

原生js可以使用ES6新增的Promise. ES6的Promise基于 Promises/A+ 规范(该部分 Fetch入门指南 一文也有提及).

这里先提供一个解析responses的函数.
		function todo(responses){
		  responses.forEach(function(response){
			response.json().then(function(res){
			  console.log(res);
			});
		  });
		}

原生js使用 Promise.all 方法. 如下:

		var p1 = fetch("http://localhost:10108/test1"),
		p2 = fetch("http://localhost:10108/test2");
		Promise.all([p1, p2]).then(function(responses){
		todo(responses);
		  //TODO do somethings
		});
		//"test1"
		//"test2"
jquery可以使用$.when方法.
//pjax  无刷新通过浏览器页面前进后退来改变页面内容；
	pjax简单易用, 仅需要如下三个api:
    history.pushState(obj, title, url) 表示往页面history末尾新增一个历史项(history entry), 此时history.length会+1.
    history.replaceState(obj, title, url) 表示替换当前历史项为新的历史项. 此时history.length保持不变.
    window.onpopstate 仅在浏览器前进和后退时触发(history.go(1), history.back() 及location.href=”xxx” 均会触发), 此时可在history.state中拿到刚刚塞进去的state, 即obj对象(其他数据类型亦可).
//hosts+nginx+node-webserver
//后端接口测试技巧

通常, 如果后端接口开发OK了, 前端同学需要通过一些手段来确认接口是能正常访问的.
使用命令测试OPTIONS请求
	curl -I -X OPTIONS -H "Origin: http://example.com" http://localhost:10108/
	# response
	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: text/json;charset=UTF-8
	Access-Control-Allow-Credentials: true
	Access-Control-Allow-Headers: x-requested-with,Content-Type
	Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
	Access-Control-Allow-Origin: http://example.com
	Access-Control-Max-Age: 3600
	Server: Node WebServer
	Website: https://github.com/Louiszhai/node-webserver
	Date: Fri, 21 Oct 2016 09:00:40 GMT
	Connection: keep-alive
	Transfer-Encoding: chunked

	以上, http状态码为200, 表示允许OPTIONS请求.

	GET, POST 请求与GET类似, 其他请求亦然.

	curl -I -X GET -H "Origin: http://example.com" http://localhost:10108/
	#HTTP/1.1 200 OK
	curl -I -X POST -H "Origin: http://example.com" http://localhost:10108/test
	#HTTP/1.1 200 OK

 //postman

除此之外, 我们还可以通过chrome的postman扩展进行测试. 请看postman素洁的界面:
postman支持所有类型的http请求, 由于其向chrome申请了cookie访问权限及所有http(s)网站的访问权限. 因此可以放心使用它进行各种网站api的测试.
			 
		
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	
	