一.html & js & css

1.AMD和CMD是什么？它们的区别有哪些？

   AMD和CMD是二种模块定义规范。现在都使用模块化编程，AMD，异步模块定义；CMD，通用模块定义。AMD依赖前置，CMD依赖就近。CMD的API职责单一，没有全局require，AMD的一个API可以多用。

2.web开发常见的漏洞。

   XSS（跨站脚本攻击）：其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。如，盗取用户Cookie、破坏页面结构、重定向到其它网站等。

   SQL 注入：用户可以提交一段数据库查询代码，根据程序返回的结果，获得某些他想得知的数据，这就是所谓的SQL Injection，即SQL注入。

3.cookie和session

		当你在浏览网站的时候，WEB 服务器会先送一小小资料放在你的计算机上，Cookie 会帮你在网站上所打的文字或是一些选择，都纪录下来。当下次你再光临同一个网站，WEB 服务器会先看看有没有它上次留下的 Cookie 资料，有的话，就会依据 Cookie里的内容来判断使用者，送出特定的网页内容给你。当程序需要为某个客户端的请求创建一个session时，服务器首先检查这个客户端的请求里是否已包含了一个session标识
		(称为session id)，如果已包含则说明以前已经为此客户端创建过session，服务器就按照session id把这个session检索出来使用（检索不到，会新建一个），如果客户端请求不包含sessionid，则为此客户端创建一个session并且生成一个与此session相关联的session id

4.MVC BFC

    mvc是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。MVC对应Html，CSS，js。
    BFC全称”Block Formatting Context”, 中文为“块级格式化上下文”。流体特性：块状水平元素，如div元素（下同），在默认情况下（非浮动、绝对定位等），水平方向会自动填满外部的容器；BFC元素特性表现原则就是，内部子元素不会影响外部的元素。

5.HTTP状态码：
  
     1.消息  2.成功 3.重定向 4.请求错误 5.服务器错误
     304：响应禁止包含消息体，如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。
     305：被请求的资源必须通过指定的代理才能被访问。
     400：语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求，或者请求参数有误。
     403：服务器已经理解请求，但是拒绝执行它。
     404：请求失败，请求所希望得到的资源未被在服务器上发现。
     500：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。

6.HTML 5 增加了一项新功能是 自定义数据属性 ，也就是  data- 自定义属性。在HTML5中我们可以使用以 data- 为前缀来设置我们需要的自定义属性，来进行一些数据的存放。
	<div id = "user" data-uid = "12345" data-uname = "愚人码头" > </div>

	// 使用getAttribute获取 data- 属性
	var user = document . getElementById ( 'user' ) ;
	var userName =user . getAttribute ( 'data-uname' ) ; // userName = '愚人码头'
	var userId = user . getAttribute ( 'data-uid' ) ; // userId = '12345'
	 
	使用setAttribute设置 data- 属性
	user . setAttribute ( 'data-site' , 'http://www.css88.com' ) ;

7.使div水平垂直居中

  知道DIV的自身长度和宽度，其实解决的思路是这样的：首们需要position:absolute;绝对定位。而层的定位点，使用外补丁margin负值的方法。负值的大小为层自身宽度高度除以二。[style="position: absolute;top:50%;left: 50%"]只能实现DIV离左边框和上边框的距离为屏幕的物理尺寸的一半，忽略了DIV本身的长度和宽度，所以不会实现DIV的水平垂直居中。
  不知道DIV的本身长度和宽度时:

```
        $(window).load(function(){
            $(".mydiv").css({
                position: "absolute",
                left: ($(window).width() - $(".mydiv").width())/2,
                top: ($(window).height() - $(".mydiv").height())/2
            });
        });
```

8.Call（）和apply（）
   构造函数：

```
function showname(){
    this.name="zygg"；
}
var qq=new showname();
console.log(qq.name);
```

我们发现apply()和call()的真正用武之地是能够扩充函数赖以运行的作用域，可以改变函数体内部 this 的指向：
  

```
      window.firstName = "diz";
        window.lastName = "song";
        var myname = { firstName: "my", lastName: "Object" };
        function show() {
        console.log("Hello " + this.firstName + " " +this.lastName, " glad to meet you!");
        }
        show();
        show.call(myname);//如果不这样写，对象myname是没法调用函数 show()的。
```

二者作用类似，区别就是参数不同：
call(thisObj，Object)
apply(thisObj，[argArray])

9.动态节点绑定事件

  Live（） delegate（）       bind（）【处理文档中的静态部分，不用于。。。】
   delegate()和live（）作用类似，附加的事件处理程序适用于匹配选择器的当前及未来的元素（比如由脚本创建的新元素）。但二者参数不一样。
   $(selector).delegate(childSelector,event,function)
    $(selector).live(event,function)


$("div").delegate("p","click",function(){
    $(this).slideToggle();
  });//只有DIV内的p元素会被绑定事件。
$("p").live("click",function(){
    $(this).slideToggle();
  });//文档内所有p元素都会被绑定事件
bind（）可以向元素添加的一个或多个事件处理程序，以及当事件发生时运行的函数。
$(selector).bind(event,function)
$("button").bind("click",function(){
    $("p").slideToggle();
  });//bind【捆绑】

10.Position的四个属性详解

Position的四个属性：static，fixed，absolute，relative
首先，static，是position属性的默认值，也就是无特殊定位，遵循html定位规则。
然后，fixed，是相对于浏览器窗口进行定位，不随页面的上下翻动而移动，比如固定在页面末端的二维码等。
下来，就是absolute，它是相对于它的第一个父元素进行定位，如果你想让这个div#demo里的一个子div#sub相对于#demo定位在右上角的某个地方，应该给#demo相对定位，#sub绝对定位。 此时，它的第一个父元素就是id=demo的div；否则它的父元素就是body，这样它的位置在页面中保持不变，但是随着页面移动会发生变化（区别fixed）。
最后，relative，relative是相对于自己来定位的，相对于其正常位置进行定位。例如：#demo{position:relative;top:-50px;},这时#demo会在相对于它原来的位置上移50px。 
P.S:采用左列left浮动，右列不浮动，采用margin-left定位的方式。

11.理解CSS盒子模型

什么是CSS的盒子模式呢？为什么叫它是盒子？先说说我们在网页设计中常听的属性名：内容(content)、填充(padding)、边框(border)、边界(margin)， CSS盒子模式都具备这些属性。

CSS盒子模式
这些属性我们可以把它转移到我们日常生活中的盒子（箱子）上来理解，日常生活中所见的盒子也具有这些属性，所以叫它盒子模式。那么内容就是盒子里装的东西；而填充就是怕盒子里装的东西（贵重的）损坏而添加的泡沫或者其它抗震的辅料；边框就是盒子本身了；至于边界则说明盒子摆放的时候的不能全部堆在一起，要留一定空隙保持通风，同时也为了方便取出嘛。在网页设计上，内容常指文字、图片等元素，但是也可以是小盒子（DIV嵌套），与现实生活中盒子不同的是，现实生活中的东西一般不能大于盒子，否则盒子会被撑坏的，而CSS盒子具有弹性，里面的东西大过盒子本身最多把它撑大，但它不会损坏的。而且填充只有宽度属性。

12.区别onmouseover和mouseover

onmouseover是Event 对象的一个属性，Mouseover是jQuery中的一个事件 。
推荐使用jQuery，直接执行方法$("#id").mouseover(function(){});
完全使用js则是如下写法：document.getElementById("id").onmouseover=function(){};
document.getElementsByTagName("body")[0].style.backgroundColor="pink”; //注意不要忘了style，深刻理解DOM的本质。


13.一个简单的AJAX 的请求

```
<script type="text/javascript">
function loadXMLDoc(){
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","/ajax/demo_get.asp",true);
xmlhttp.send();
}
</script>
</head>
<body>
<h2>AJAX</h2>
<button type="button" onclick="loadXMLDoc()">请求数据</button>
<div id="myDiv"></div>
</body>
```

14.Javascript 的addEventListener()及attachEvent()区别分析

addEventListener()和attachEvent()是一个侦听事件并处理相应的函数，
可以动态的为网页内的元素添加一个或多个事件。可以将事件和元素分离，这样可编辑性就高了。
addEventListener的使用方式： 
target.addEventListener(type, listener, useCapture); 
target： 文档节点、document、window 或 XMLHttpRequest。 
type： 字符串，事件名称，不含“on”，比如“click”、“mouseover”、“keydown”等。 
listener ：实现了 EventListener 接口或者是 JavaScript 中的函数。 
useCapture ：是否使用捕捉，一般用 false 。例如：document.getElementById("testText").addEventListener("keydown", function (event) { alert(event.keyCode); }, false); 
而attachEvent()则是，target.attachEvent(type, listener); 

注意：attachEvent（）中的type： 字符串，事件名称，含“on”，比如“onclick”、“onmouseover”、“onkeydown”等。

15.关于事件监听

     比如，<button onclick='A();' /> 就表示"你正在监听 click 事件", 而事件监听器就是我们为了要响应这个事件而写的函数。至于事件监听机制了，就是冒泡和捕获。

16.事件监听机制（冒泡和捕获）

事件捕获：事件从最上一级标签开始往下查找，直到捕获到事件目标(target)。
事件冒泡：事件从事件目标(target)开始，往上冒泡直到页面的最上一级标签。
假设一个元素div，它有一个下级元素p。
<div>
　　<p>元素</p>
</div>
这两个元素都绑定了click事件，如果用户点击了p，它在div和p上都触发了click事件，那这两个事件处理程序哪个先执行呢？ 
如div先触发，这就叫做事件捕获。
如p先触发，这就叫做事件冒泡。
IE只支持事件冒泡，其他主流浏览器两种都支持。
程序员可以自己选择绑定事件时采用事件捕获还是事件冒泡，方法就是绑定事件时通过addEventListener函数，它有三个参数，第三个参数若是true，则表示采用事件捕获，若是false，则表示采用事件冒泡。
事件的传播是可以阻止的：
• 在W3c中，使用stopPropagation（）方法
在捕获的过程中stopPropagation（）；后，后面的冒泡过程也不会发生了~
propagation        【传播，蔓延】
3.阻止事件的默认行为，例如click a标签后的跳转~
• 在W3c中，使用preventDefault（）方法；
• 在IE下设置window.event.returnValue = false;


17.DNS的工作原理（递归和迭代）（应用层）

    DNS的工作原理及过程分下面几个步骤：
        第一步：客户机提出域名解析请求，并将该请求发送给本地的域名服务器。
        第二步：当本地的域名服务器收到请求后，就先查询本地的缓存，如果有该纪录项，则本地的域名服务器就直接把查询的结果返回。 
        第三步：如果本地的缓存中没有该纪录，则本地域名服务器就直接把请求发给根域名服务器，然后根域名服务器再返回给本地域名服务器一个所查询域(根的子域) 的主域名服务器的地址。
        第四步：本地服务器再向上一步返回的域名服务器发送请求，然后接受请求的服务器查询自己的缓存，如果没有该纪录，则返回相关的下级的域名服务器的地址。
        第五步：重复第四步，直到找到正确的纪录。
        第六步：本地域名服务器把返回的结果保存到缓存，以备下一次使用，同时还将结果返回给客户机。

18.什么是DOM事件处理程序？
     首先要理解什么是DOM？Dom是针对HTML文档的一个API。什么是事件流？事件流分为：事件冒泡（IE的事件流）和事件捕获。事件冒泡就是由最具体的元素开始接收，然后逐级向上；事件捕获就是由不太具体的元素开始接收，逐级向下，最具体的元素最后才接收到事件。
     DOM事件处理程序分为DOM0级、DOM2级。DOM0级具有简单，跨浏览器的优势，它是把函数赋值给一个事件的处理程序属性。例如：btn.onlick=function（）{。。。}；DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作。addEventListener()和removeEventListener()。它们都接收三个参数，要处理的事件名、作为事件处理程序的函数和布尔值。布尔值为true表示在捕获阶段调用事件处理程序，布尔值为false是在冒泡处调用。注意：事件名要去掉“on”。通过addEventListener（）添加的事件，
	 只能由removeEventListener()删除。IE存在兼容问题，可以用attachEvent()添加事件和detachEvent（）删除事件。接收两个参数，事件处理程序的名称和函数。注意：事件名此时要加”on”。

19.如果给一个元素同时绑定两个事件，会怎么样？

    Dom 0级和Dom 2级都可以给一个元素添加多个事件，Dom 0级的每个事件只支持一个事件处理程序，如果绑定同一个事件，那么后边的那个事件，函数会覆盖掉前边的那个事件函数。Dom2级可以添加多个事件处理程序，他们会按照添加的顺序触发。

20.深入理解闭包

  要理解闭包，首先必须理解Javascript特殊的变量作用域。我的理解是，闭包就是能够读取其他函数内部变量的函数。
示意图：

    既然函数b可以读取函数a中的局部变量，那么只要把b作为返回值，我们不就可以在a外部读取它的内部变量了吗！

   闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。


                                 来自于：http://www.jb51.net/article/24101.htm
21.jQuery源码分析：

  选择器 Sizzle引擎   回调对象 - Callbacks   事件绑定 - 绑定设计
  DOM操作方法与核心   Ajax - 整体结构
  选择器 Sizzle引擎：个人认为，sizzle选择器是增强版的querySelectorAll 函数：返回指定元素节点的子树中匹配selector的节点集合，采用的是深度优先预查找；如果没有匹配的，这个方法返回空集合） 

22.设计模式：

	一共有23种设计模式
	1.观察者模式
	2.监听模式
	3. Factory Method（工厂方法）：定义一个用于创建对象的接口，让子类决定实例化哪一个类。就行构造函数
	4. Abstract Factory（抽象工厂）：。。。
	5. Prototype（原型）：当要实例化的类是在运行时刻指定时，例如，通过动态装载。
    ......

23.CSS框架：

  YUI、JQuery、Prototype，bootstrap。

24.几个前端框架的区别：

jQuery 
   核心js只有50K，小而精，占用带宽小，侧重于对js dom编程。有灵活便捷的Ajax请求和回调操作。
ExtJS 
  一整套带有UI的js库，封装得很多，核心js就600多K，这么大的东西门户网站当然就别想了，里面的效果当然也不会运用到门户网站，所以它是专门为管理系统而生的。
3、YUI 
  或者是类似于网盘应用这种东东。 
4.Dojo 
  Dojo是功能最为强大的javascript框架，刻意提醒一下：功能最强大。所以它几乎包含了所有你可能想要用到的东西。）。 Dojo更适合企业应用和产品开发的需要，
5、Prototype 
  最成熟的。但个人认为可以被Jquery取代。两者相似度也比较高。

25.说说float和position

  float:none|left|right|inherit
  Inherit:规定应该从父元素继承 float 属性的值。
  float是相对定位的，会随着浏览器的大小和分辨率的变化而改变，而position就不行了，所以一般情况下还是float布局！在局部可能会用到position进行定位！既然是布局，就用float好，这个我比较常用。这个浮动是可以清除的，
  一般不会影响整体布局。 而position，定位，是不受约束的，这个貌似都谈不上布局了，一般要是做什么特殊的定位或者浮动层的时候，可以考虑使用！float会影响后面的元素，而position不会影响后面的元素。

26.清除浮动：

    父级div定义 height,父级div手动定义height，就解决了父级div无法自动获取到高度的问题。
    结尾处加空div标签 clear:both
	父级div定义 overflow:hidden /auto

27.前端性能优化

  ①对于页面来说：尽量减少DOM元素的数量
                  减少iframe的数量
                  减少http的请求次数
                  提前加载
  ②对于CSS来说：将样式表置顶
                  使用link代替@import
　　区别1：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
　　区别2：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。link支持定义RSS(简易信息聚合).
区别3：link支持使用Javascript控制DOM去改变样式；而@import不支持。

  ③对于JS来说： 将脚本置底
                  使用外部JS和CSS文件
                  精简JS和CSS文件，去除重复脚本

     目前，前端性能测试的执行工具也有很多，比如YSlow，Page Speed，dynaTrace AJAX Edition，webload等等。

28.HTML语义化

   就是当你写html时，要按照人们的思考逻辑写。不但要自己能看懂，也要让别人也能看懂，不要让别人觉得你的代码很乱。语义化的主要目的就是让大家直观的认识标签(markup)和属性(attribute)的用途和作用。
    语义化的网页的好处，最主要的就是对搜索引擎友好，有了良好的结构和语义你的网页内容自然容易被搜索引擎抓取，你网站的推广便可以省下不少的功夫。
语义 Web 技术有助于利用基于开放标准的技术，从数据、文档内容或应用代码中分离出意义。


29.可以谈谈自己对SEO和title和keywords堆砌问题。

30.说说jsonp，getJSON(),getScript():

Jsonp（解决跨域）
    一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。
因为，<script> 元素的这个开放策略。

getJSON():

所以getJSON和ajax的方式(实际就是jsonp)想比较，也就是callback函数一个是自动生成的函数名，一个是手工指定的函数名。
getScript():

客户端：

```
<script type="text/javascript">
      jQuery.getScript("http://alloyteamzygg.sinaapp.com/js/test.js",function(){
          console.log(zy.name)
      })

</script>
```

服务端：

```
Var zy={“name”:”zygg”,
“age”:”22”
};
```

31.prototype属性

    每一个构造函数都有一个属性叫做原型(prototype)。这个属性非常有用：为一个特定类声明通用的变量或者函数。prototype是一个对象，因此，你能够给它添加属性。你添加给prototype的属性将会成为使用这个构造函数创建的对象的通用属性。

32.js实现类:

	构造函数方式：
	   由于js类的定义方法和函数的定义方法一样，所以定义构造函数的同时就定义了类。构造函数内的方法和属性也就是类中的方法和属性。
	原型方式 
	  该方式利用了对象的prototype属性。首先定义了一个空函数，然后通过prototype属性来定义对象的属性。调用该函数时，原型的所有属性都会立即赋予要创建的对象

33.js面向对象

  面向对象的语言有一个标志，即拥有类的概念

34.构造函数

	js创建对象的方式包括两种：对象字面量和使用new表达式。对应代码：

	```
	Var zy={
	  “name”:”zygg”,
	  “age”:22
	}

	function zy(name,age){

			this.name=name;
			this.age=age;
		}
		zy.prototype.sex="male";

		var zygg=new zy("bailu",18)
		console.log(zygg.name)  //bailu		
	```
35.js继承

继承是指一个对象直接使用另一对象的属性和方法
实现方法：
对象冒充，及call（）Apply（）参见上述call和apply的用法。

原型链方式：
   js中每个对象均有一个隐藏的__proto__属性，一个实例化对象的__proto__属性指向其类的prototype方法，而这个prototype方法又可以被赋值成另一个实例化对象，这个对象的__proto__又需要指向其类，由此形成一条链。

   那么__proto__是什么？我们在这里简单地说下。每个对象都会在其内部初始化一个属性，就是__proto__，当我们访问一个对象的属性 时，如果这个对象内部不存在这个属性，那么他就会去__proto__里找这个属性，这个__proto__又会有自己的__proto__，于是就这样 一直找下去，也就是我们平时所说的原型链的概念。

36.js事件委托

  “事件处理程序过多”问题的解决方案就是事件委托。
  事件委托利用的是事件冒泡机制，只制定一事件处理程序，就可以管理某一类型的所有事件（使用事件委托，只需在DOM树中尽量最高的层次上添加一个事件处理程序）。
  这里要用到事件源：event 对象，需要用到target属性，其 事件属性可返回事件的目标节点（触发该事件的节点）

```
oUl.onmouseover = function(ev){
            var target = ev.target
            if(target.nodeName.toLowerCase() == "li"){
                target.style.background = "red";
            }
        }
```

37.js自定义事件：

	js自定义事件用处较多，最主要的就是实现观察者模式.
	观察者模式( 又叫发布者-订阅者模式 )应该是最常用的设计模式之一。
	平时接触的dom事件. 也是js和dom之间实现的一种观察者模式.
	观察者模式举例：
	div.onclick  =  function click (){
	 
	   alert ( 'click' )
	 
	}
   只要订阅了div的click事件. 当点击div的时候, function click就会被触发.Div为发布者，click事件为订阅者
自定义事件例子：

```
<script src="Scripts/jquery-2.1.1.min.js"></script>
    <script type="text/javascript">
        $(function() {
            $('body').on('someclick', function () {
                console.log('被点击了~~');
            });
            $('body').trigger('someclick');
        });      
    </script>
```

on（）是jQuery中的类似于bind（），live（），delegate（）等绑定事件的方法。
trigger() 方法触发被选元素的指定事件类型。先给固定元素绑定一个自定义事件”someclick”，然后必须通过trigger（）来使自定义事件可以使用。
Trigger【引发，触发;】

38.回调函数：

函数a有一个参数，这个参数是个函数b，当函数a执行完以后执行函数b。那么这个过程就叫回调。函数b是你以参数形式传给函数a的，那么函数b就叫回调函数。回调函数可以继续扩展一个函数的功能，可以是程序非常灵活。

```
function zy(callback){
          alert("开始");
          callback();
      }
        function zygg(){
            alert("我是回调函数");
        }
       function test(){
           zy(zygg)
       }

```

39.说一说css中box和flex

恩恩，首先'box'呐是比较早的语法，使用它时需要带上前缀，比如  display: -webkit-box; ，而"flex"是2012年的语法，是css3新规定的，也将是以后标准的语法。将父元素的display属性设置为-webkit-box（box），然后子元素通过属性-webkit-box-flex来指定一个框的子元素是否是灵活的或固定的大小，如上，定义两个灵活的p元素。如果父级box的总宽度为300px，＃P1将有一个100px的宽度，＃P2将有一个200px的宽度，也就是呈固定比例划分。当然了，也可以这样写：

```
	<div style="background-color: pink;width: 500px;height:500px;display:flex">
		<p style="background-color: orange;flex:1.0;border:1px solid red;">111111111111</p>
		<p style="background-color: orangered;flex:2.0;border:1px solid blue;">22222222222</p>
	</div>
```

当然了css3规定了，一系列的有关box的属性，比如 box-shadow。。。。。

40.JavaScript内置对象有以下几种。 
   
     String对象：处理所有的字符串操作 
     Math对象：处理所有的数学运算 
     Date对象：处理日期和时间的存储、转化和表达 
     Array对象：提供一个数组的模型、存储大量有序的数据 
     Event对象：提供JavaScript事件的各种处理信息 
     
41.JavaScript内置函数

①：escape( )escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。 eg:?=%3
②：eval( ) eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
eg:eval("x=10;y=20;document.write(x*y)")
③：isFinite( )isFinite() 函数用于检查其参数是否是无穷大。返回true或者false。
④：isNaN( ) isNaN( ) 函数可用于判断其参数是否是 NaN
⑤：parseFloat( )parseFloat() 函数可解析一个字符串，并返回一个浮点数。
⑥;parseInt( ) parseInt() 函数可解析一个字符串，并返回一个整数。
⑦：unescape( ) unescape() 函数可对通过 escape() 编码的字符串进行解码。


42.自适应问题

  自适应指的就是指其长（宽）度可以根据浏器窗口的大小自动改变其长（宽）度（随浏览器长（宽）的改变而改变）,而不会被浏览器遮住。
  实现方法（以左侧固定，右侧自适应为例）：
①采用左列 left 浮动，右列不浮动，采用 margin-left 定位的方式。
②左列使用绝对定位，右列使用 margin-left 定位。

43.我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡，你来说下会执行几次事件，然后会先执行冒泡还是捕获！！！

44.jQuery的三种绑定事件方式：bind（），live（），delegate（）


45.从输入 URL 到页面加载完的过程中都发生了什么事情？

  ①首先如果我们如果输入的不是ip地址，而是域名的话，就需要IP解析，DNS域名解析（具体见DNS工作机制）。
  ②解析出来对应的IP后，如不包含端口号，http协议默认端口号是80；https（http+ssl（传输层））是430！然后向IP发起网络连接，根据http协议要求，组织一个请求的数据包，里面包含大量请求信息。
  ③服务器响应请求，将数据返回给浏览器。数据可能是根据HTML协议组织的网页，里面包含页面的布局、文字。数据也可能是图片、脚本程序等。
  ④开始根据资源的类型，将资源组织成屏幕上显示的图像，这个过程叫渲染，网页渲染是浏览器最复杂、最核心的功能。
  ⑤将渲染好的页面图像显示出来，并开始响应用户的操作。

46.jQuery 选择器种类

                   

47.Unicode和ASCII的区别是什么回答

   计算机发明后，为了在计算机中表示字符，人们制定了一种编码，叫ASCII码。
中国人利用连续2个扩展ASCII码的扩展区域（0xA0以后）来表示一个汉字，该方法的标准叫GB-2312。因为各个国家地区定义的字符集有交集，因此使用GB-2312的软件，就不能在BIG-5的环境下运行（显示乱码），反之亦然。
    为了把全世界人民所有的所有的文字符号都统一进行编码，于是制定了UNICODE标准字符集。UNICODE 使用2个字节表示一个字符(unsigned shor int、WCHAR、_wchar_t、OLECHAR)。
   
48.JS的数据类型：字符串、数字、布尔、数组、对象、Null、Undefined

   Null和undefined的区别：
undefined表示变量声明但未初始化时的值，javascript解释器不知道这是什麽东西,会抛出"未定义"的错误
null表示准备用来保存对象，还没有真正保存对象的值。从逻辑角度看，null值表示一个空对象指针，意思是你定义了它,但它没有分配内存空间。

                  

二.CSS(3)


css3总的说来大概就是边框的一些特殊样式，比如圆角，还有就是渐变，动画。
在CSS3中border-radius属性被用于创建圆角（前提是有边框属性）：border-radius:10px;

     如果你在 border-radius 属性中只指定一个值，那么将生成 4 个 圆角。
  
     其也可以这样写：border-radius:1px 2px 3px 4px [可以给四个角同时设置]
     也可以border-top/bottom-left/right-radius，给某个角给值。

      其值也可以这样：  border-radius: 15px/50px;

                        border-radius: 50% ;【椭圆效果】
CSS3中的box-shadow属性被用来添加阴影:box-shadow : 3px 3px 3px yellow;[上右下左]
有了CSS3的border-image属性，你可以使用图像创建一个边框：

     -webkit-border-image : url(border.png) 30 30 round;

round : 图像平铺（重复）来填充该区域。

Stretch 这里，图像被拉伸以填充该区域。

background-size指定背景图像的大小。CSS3以前，背景图像大小由图像的实际大小决定。
  
     background-size:80px 60px;
background-Origin属性指定了背景图像的位置区域。
content-box, padding-box,和 border-box区域内可以放置背景图像。

   Eg:background-origin:border-box;


CSS3 允许你在元素,那个添加多个背景图像。
   background-image:url(img_flwr.gif),url(img_tree.gif);
CSS3 background-clip 属性，类比background-origin[背景图片]作用：指定绘图区的背景，也就是规定背景的真正作用区域。
语法：
background-clip: border-box|padding-box|content-box;

CSS3 定义了两种类型的渐变（gradients）：
线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
径向渐变（Radial Gradients）- 由它们的中心定义
语法：background: -webkit-linear-gradient(red, pink);   从上到下
      background: -webkit-linear-gradient(left, red , blue);  从左向右
-moz代表firefox浏览器私有属性
-ms代表IE浏览器私有属性
-webkit代表chrome、safari（苹果浏览器）私有属性
-o代表opera（欧朋浏览器）的私有属性

background: -webkit-linear-gradient(left top, red , blue); 渐变呈对角线变化，从左上角开始。
渐变的方向上也可以做更多的控制，您可以定义一个角度，而不用预定义方向：
 background: -webkit-linear-gradient(180deg, red, blue);
  也可以同时使用多个颜色节点：
background: -webkit-linear-gradient(red, green, blue);
CSS3 渐变也支持透明度（transparency），可用于创建减弱变淡的效果：
  background: -webkit-linear-gradient(left, rgba(255,0,0,0), rgba(255,0,0,1));
我们使用 rgba() 函数来定义颜色结点。rgba() 函数中的最后一个参数可以是从 0 到 1 的值，它定义了颜色的透明度：0 表示完全透明，1 表示完全不透明。r代表红色，g代表绿色，b代表蓝色，a代表透明度。
重复的渐变：
background: -webkit-repeating-linear-gradient(...);
为了创建一个径向渐变，您也必须至少定义两种颜色结点。
background: -webkit-radial-gradient(red 5%, green 15%, blue 60%);
比例越大，”半径越大”，它的默认形状是椭圆。也可以自定义形状;
background: -webkit-radial-gradient(circle, red, yellow, green);
CSS3的文本阴影:
text-shadow: 5px 5px 5px #FF0000;分别对应水平阴影，垂直阴影，模糊的距离，以及阴影的颜色.
CSS3文本的强制换行：
p {word-wrap:break-word;}

CSS3 @font-face 规则，自定义字体。

```
<style>
@font-face
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf')
    }

div
{
font-family:myFirstFont;
}
</style>
```

CSS3 2D 转换：
您将了解2D变换方法：
translate()
rotate()
scale()
skew()
matrix()
rotate()方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。
    -webkit-transform:rotate(30deg); 注意是-webkit-transform :是冒号

translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动:
     -webkit-transform:translate(50px,100px)
scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数
     -webkit-transform:scale(1,2); 也就是宽度和高度呈对应的倍数增加。
skew()方法，该元素会根据横向（X轴）和垂直（Y轴）线参数给定角度：
     skew(30deg,20deg)是绕X轴和Y轴周围20度30度的元素。
matrix 方法有六个参数，包含旋转，缩放，移动（平移）和倾斜功能。
rty        描述        CSS
transform        适用于2D或3D转换的元素        3
transform-origin        允许您更改转化元素位置        3
函数        描述
matrix(n,n,n,n,n,n)        定义 2D 转换，使用六个值的矩阵。
translate(x,y)        定义 2D 转换，沿着 X 和 Y 轴移动元素。
translateX(n)        定义 2D 转换，沿着 X 轴移动元素。
translateY(n)        定义 2D 转换，沿着 Y 轴移动元素。
scale(x,y)        定义 2D 缩放转换，改变元素的宽度和高度。
scaleX(n)        定义 2D 缩放转换，改变元素的宽度。
scaleY(n)        定义 2D 缩放转换，改变元素的高度。
rotate(angle)        定义 2D 旋转，在参数中规定角度。
skew(x-angle,y-angle)        定义 2D 倾斜转换，沿着 X 和 Y 轴。
skewX(angle)        定义 2D 倾斜转换，沿着 X 轴。
skewY(angle)        定义 2D 倾斜转换，沿着 Y 轴。

CSS3 3D 转换:
rotateX()
rotateY()
-webkit-transform:rotateX/Y(120deg);


CSS3 过渡 : transition 属性.
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。
要实现这一点，必须规定两项内容：
指定要添加效果的CSS属性
指定效果的持续时间
Eg : -webkit-transition: -webkit-transform 3s;
-webkit-transition-delay        规定过渡效果何时开始。默认是 0。
CSS3 动画
当在@keyframe创建动画，把它绑定到一个选择器，否则动画不会有任何效果。
指定至少这两个CSS3的动画属性绑定向一个选择器：
规定动画的名称
规定动画的时长
<style>
div{
width:100px;
height:100px;
background:red;
-webkit-animation:myfirst 5s;
}
@-webkit-keyframes myfirst
{
from {background:red;}
to {background:yellow;}
}
</style>
也可以这样写：
@-webkit-keyframes myfirst
{
0%   {background:red;}
25%  {background:yellow;}
50%  {background:blue;}
100% {background:green;}
}
其中不仅仅跟background属性，可以跟一系列属性。


属性        描述        CSS
@keyframes        规定动画。        3
animation        所有动画属性的简写属性，除了 animation-play-state 属性。        3
animation-name        规定 @keyframes 动画的名称。        3
animation-duration        规定动画完成一个周期所花费的秒或毫秒。默认是 0。        3
animation-timing-function        规定动画的速度曲线。默认是 "ease"。        3
animation-delay        规定动画何时开始。默认是 0。        3
animation-iteration-count        规定动画被播放的次数。默认是 1。        3
animation-direction        规定动画是否在下一周期逆向地播放。默认是 "normal"。        3
animation-play-state        规定动画是否正在运行或暂停。默认是 "running"。        3
通过 CSS3多列，您能够创建多个列来对文本进行布局 - 就像报纸那样！
在本章中，您将学习如下多列属性：
column-count
column-gap
column-rule

```
div
{
-webkit-column-count:3;     将文章划为3列
-webkit-column-gap:40px;     每列间的距离为40px
-webkit-column-rule:3px outset #ff00ff;   设置列之间
的宽度，样式和颜色
}
```

三．Html5


Html5新加了一些语义元素，画布，拖放，web存储（localstarge，sessionstrage）等。
1.HTML5 定了 8 个新的 HTML 语义（semantic） 元素。所有这些元素都是 块级 元素。
为了能让旧版本的浏览器正确显示这些元素，你可以设置 CSS 的 display 属性值为 block:
2.你可以为 HTML 添加新的元素。
   fuck{
Font-family：simhei;
Color:pink
}
本例中，JavaScript 语句 document.createElement("myHero") 是为了为 IE 浏览器添加新的元素。Internet Explorer 8 及更早 IE 版本的浏览器不支持以上的方式。幸运的是， Sjoerd Visscher 创建了 "HTML5 Enabling JavaScript", " shiv":以上代码是一个注释，作用是在 IE 浏览器的版本小于 IE9 时将读取 html5.js 文件，并解析它。
3.HTML5 <canvas> 元素用于图形的绘制，通过脚本 (通常是JavaScript)来完成.
<canvas> 标签只是图形容器，您必须使用脚本来绘制图形。Ie8以及以前不支持、

```
<script>
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
ctx.fillRect(0,0,150,75);
</script>
```

getContext() 方法返回一个用于在画布上绘图的环境。
设置fillStyle属性可以是CSS颜色，渐变，或图案。fillStyle 默认设置是#000000（黑色）。
fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。
canvas 是一个二维网格。canvas 的左上角坐标为 (0,0)
在Canvas上画线，我们将使用以下两种方法：
moveTo(x,y) 定义线条开始坐标
lineTo(x,y) 定义线条结束坐标
然后使用 stroke() 方法来绘制线条:
在canvas中绘制圆形, 我们将使用以下方法: arc(x,y,r,start,stop)
ctx.arc(95,50,20,0,2*Math.PI);
参数分别为，圆心的横坐标，纵坐标，半径，起始角（以弧度记），结束角（以弧度记）
使用 canvas 绘制文本，重要的属性和方法如下：
font - 定义字体
fillText(text,x,y) - 在 canvas 上绘制实心的文本
strokeText(text,x,y) - 在 canvas 上绘制空心的文本
渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色。
以下有两种不同的方式来设置Canvas渐变：
createLinearGradient(x,y,x1,y1) - 创建线条渐变
createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变

```
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

// Create gradient
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");

// Fill with gradient
ctx.fillStyle=grd;
ctx.fillRect(10,10,150,80);
```

将图片画在画布上：

```
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var img=document.getElementById("scream");
ctx.drawImage(img,10,10);
```

SVG 指可伸缩矢量图形 (Scalable Vector Graphics)SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失




Canvas 与 SVG 的比较：
SVG 是一种使用 XML 描述 2D 图形的语言。Canvas 通过 JavaScript 来绘制 2D 图形。
Svg支持事件处理器，canvas不支持事件处理器
在 SVG 中，每个被绘制的图形均被视为对象，而canvas能够以 .png 或 .jpg 格式保存结果图像
如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

Html5的拖放功能、

HTML5 - 使用地理定位：请使用 getCurrentPosition() 方法来获得用户的位置。
Html5新的input类型：

color
date
datetime
datetime-local
email
month
number
range
search
tel
time
url
Week

HTML5 新的表单元素：

<datalist>
<keygen>
<output>

Select和datalist的区别：
select：5个值里面选择1个；
datalist：你可以在文本框里填值，也可以在下面5个值里选1个。



<input list="browser" name="browser">
    <datalist id="browser">
        <option value="Internet Explorer"></option>
        <option value="Firefox">
        <option value="Chrome">
        <option value="Opera">
        <option value="Safari">
    </datalist>
<input type="submit">

<keygen> 元素的作用是提供一种验证用户的可靠方法。
<keygen>标签规定用于表单的密钥对生成器字段。
当提交表单时，会生成两个键，一个是私钥，一个公钥。
<output> 元素用于不同类型的输出，比如计算或脚本输出：

```
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
    <input type="range" id="a" value="50">100
    +<input type="number" id="b" value="50">
    =<output name="x" for="a b"></output>
</form>
```

属性        值        描述
for        element_id        定义输出域相关的一个或多个元素。
form        form_id        定义输入字段所属的一个或多个表单。
name        name        定义对象的唯一名称。（表单提交时使用）


P.S：别忘了给range和number设置value属性。






<form>新属性：

autocomplete
novalidate

<input>新属性：

autocomplete
autofocus
form
formaction
formenctype
formmethod
formnovalidate
formtarget
height and width
list
min and max
multiple
pattern (regexp)
placeholder
required
step
   ①. autocomplete 属性规定 form 或 input 域应该拥有自动完成功能。
当用户在自动完成域中开始输入时，浏览器应该在该域中显示填写的选项。有on（开）,off（关）。
②．novalidate 属性规定在提交表单时不验证 form 或 input 域输入元素的合法性。
③．autofocus 属性是一个 boolean 属性.autofocus 属性规定在页面加载时，域自动地获得焦点，就是进去就可以直接输入。
④．form 属性规定输入域所属的一个或多个表单。Eg:
<form action="demo-form.php" id="form1">
First name: <input type="text" name="fname"><br>
<input type="submit" value="Submit">
</form>
Last name: <input type="text" name="lname" form="form1">
"Last name" 字段没有在form表单之内，但它也是form表单的一部分。
⑤The formaction 属性用于描述表单提交的URL地址.
⑥formenctype 属性描述了表单提交到服务器的数据编码 (只对form表单中 method="post" 表单)
⑦formmethod 属性定义了表单提交的方式。
⑧novalidate属性描述了 <input> 元素在表单提交时无需被验证。
⑨formtarget 属性指定一个名称或一个关键字来指明表单提交数据接收后的展示。
<input type="submit" formtarget="_blank" value="提交到一个新的页面上">
10.height 和 width 属性规定用于 image 类型的 <input> 标签的图像高度和宽度。
<input type="image" src="05.jpg">这种形式写在表单里，可以实现点击图片提交表单。
11.list 属性规定输入域的 datalist。datalist 是输入域的选项列表。结合datalist标签使用。
12.min、max 和 step 属性用于为包含数字或日期的 input 类型规定限定（约束）。
13.
       multiple 属性是一个 boolean 属性.
      multiple 属性规定<input> 元素中可选择多个值。例如同时选择多个文件上传。
14.pattern 属性描述了一个正则表达式用于验证 <input> 元素的值。
15.placeholder 属性提供一种提示（hint），描述输入域所期待的值
16.required 属性规定必须在提交之前填写输入域（不能为空）。
    17.step 属性为输入域规定合法的数字间隔。
如果 step="3"，则合法的数是 -3,0,3,6 等
  语义元素：
    一个语义元素能够清楚的描述其意义给浏览器和开发者。
    无语义 元素实例: <div> 和 <span> - 无需考虑内容.
   语义元素实例: <form>, <table>, and <img> - 清楚的定义了它的内容.
HTML5中新的语义元素：
   许多现有网站都包含以下HTML代码： <div id="nav">, <div class="header">, 或者 <div id="footer">, 来指明导航链接, 头部, 以及尾部.

<section> 标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
<article> 标签定义独立的内容。.
<nav> 标签定义导航链接的部分。
<aside> 标签定义页面主区域内容之外的内容（比如侧边栏）。
<header>元素描述了文档的头部区域
<footer> 元素描述了文档的底部区域.
<figure>标签规定独立的流内容（图像、图表、照片、代码等等）。
<figcaption> 标签定义 <figure> 元素的标题.
为了让这些块及元素在所有版本的浏览器中生效，你需要在样式表文件中设置一下属性 (以下样式代码可以让旧版本浏览器支持本章介绍的块级元素):
header, section, footer, aside, nav, article, figure
{ 
display: block; 
}
HTML5 Shiv解决ie旧版本不支持h5新元素。浏览器小于IE9版本时会加载html5shiv.js文件. 你必须将其放置于<head> 元素中。让CSS 样式应用在未知元素上只需执行 document.createElement(elementName) 即可实现。html5shiv就是根据这个原理创建的。如下：

```
<!--[ifltIE9]>
<script
type="text/javascript"
src="scripts/html5shiv.js"></script>
<![endif]-->
```

HTML5 Web 存储

早些时候,本地存储使用的是cookies。但是Web 存储需要更加的安全与快速. 
localStorage - 没有时间限制的数据存储
sessionStorage - 针对一个 session 的数据存储

```
    if(typeof(Storage)!=="undefined")
  {
  if (localStorage.clickcount)
    {
    localStorage.clickcount=Number(localStorage.clickcount)+1;
    }
  else
    {
    localStorage.clickcount=1;
    }
```

  关键词：localStorage.clickcount
HTML5 应用程序缓存
1.离线浏览 - 用户可在应用离线时使用它们
2.速度 - 已缓存资源加载得更快
3.减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

```
<!DOCTYPE HTML>
<html manifest="demo.appcache">
...
</html>
```

manifest 文件需要配置正确的 MIME-type，即 "text/cache-manifest"。必须在 web 服务器上进行配置。manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。
manifest 文件可分为三个部分：
CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

HTML5 Web Workers

web worker 是运行在后台的 JavaScript，不会影响页面的性能。
当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。
web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。
     首先，检测浏览器是否支持web worker。
```
if(typeof(Worker)!=="undefined"){
      ......
}
```
     首先创建 web worker 文件，也就是外部的js文件
     var i=0;
     postMessage(i);
     创建 Web Worker 对象
     w=new Worker("demo_workers.js");

当我们创建 web worker 对象后，它会继续监听消息（即使在外部脚本完成之后）直到其被终止为止。

w.terminate();             terminate【终止】

具体实例：

```
if(typeof(Worker)!=="undefined"){

       var w=new Worker("client.js");

       w.onmessage=function(ev){

           alert(ev.data)
       }

   }
```
     关键：postMessage()   onmessage;

HTML5 服务器发送事件(Server-Sent Events):
Server-Sent 事件指的是网页自动获取来自服务器的更新。 单向消息传递.
客户端代码：

```
<!DOCTYPE html>
<html>
    <meta http-equiv="content-type" content="text/html charset=utf-8">
<body>
<h1>获得服务器更新</h1>
<div id="result"></div>

<script>
if(typeof(EventSource)!=="undefined")
  {
  var source=new EventSource("test.php");
  source.onmessage=function(event)
    {
    document.getElementById("result").innerHTML+=event.data+ "<br />";
    };
  }
else
  {
  document.getElementById("result").innerHTML="Sorry, your browser does not support server-sent events...";
  }
</script>

</body>
</html>
```

服务器代码：

```

<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
echo "data: This is server info! \n\n";
flush();
?>
```

关键字：EventSource对象    flush();


PS:新加一些问题，小伙伴们都会不会呀，不会赶紧去恶补呦。


1.html的doctype作用？严格模式和混杂模式都是什么？

2.列举js异步编程的方法

3.Css选择器（符）有哪些?哪些可继承？优先级如何？

4.setTimeout()的时间参数最小可以是多少？为什么？

5.class_a .class_b(中间有空格) 和 .class_a.class_b 和.class_a,.class_b三者区别是什么？