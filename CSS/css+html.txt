HTML CSS 基础

HTML、CSS部分
要点：对Web标准的理解、浏览器差异、CSS基本功：布局、盒子模型、选择器优先级及使用、HTML5、CSS3、移动端开发 技术等

1.Doctype作用? 严格模式与混杂模式-如何触发这两种模式，区分它们有何意义?
（1）、<!DOCTYPE> 声明位于文档中的最前面，处于 <html> 标签之前。告知浏览器的解析器，用什么文档类型 规范来解析这个文档。 
（2）、严格模式的排版和 JS 运作模式是  以该浏览器支持的最高标准运行。
（3）、在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
（4）、DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。

2.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
（1）CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，比如div默认display属性值为“block”，成为“块级”元素；span默认display属性值为“inline”，是“行内”元素。
（2）行内元素有：a b span img input select strong（强调的语气） 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
（3）知名的空元素： 
<img> <input> <link> <meta>
 鲜为人知的是： <area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>

3.CSS的盒子模型？
（1）两种， IE 盒子模型、标准 W3C 盒子模型；IE 的content部分包含了 border 和 pading;
（2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border).

4.link 和@import 的区别是?
（1）、link属于XHTML标签，而@import是CSS提供的;
（2）、页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
（3）、import只在IE5以上才能识别，而link是XHTML标签，无兼容问题;
（4）、link方式的样式的权重 高于@import的权重.

5.CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？
1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul < li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a: hover, li: nth - child）
可继承： font-size font-family color, UL LI DL DD DT;
不可继承 ：border padding margin width height ;
优先级就近原则，样式定义最近者为准;
载入样式以最后载入的定位为准;
优先级为:
!important >  id > class > tag  
important 比 内联优先级高

CSS3新增伪类举例：
p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
:enabled、:disabled 控制表单控件的禁用状态。
:checked，单选框或复选框被选中。

6.如何居中div,如何居中一个浮动元素?
给div设置一个宽度，然后添加margin:0 auto属性

    div{
        width:200px;
        margin:0 auto;
     }  

居中一个浮动元素

      确定容器的宽高 宽500 高 300 的层
      设置层的外边距

     .div { 
      Width:500px ; height:300px;//高度可以不设
      Margin: -150px 0 0 -250px;
      position:relative;相对定位
      background-color:pink;//方便看效果
      left:50%;
      top:50%;
    } 

7.浏览器的内核分别是什么?经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？
IE浏览器的内核Trident、 Mozilla的Gecko、google的WebKit、Opera内核Presto；
png24为的图片在iE6浏览器上出现背景，解决方案是做成PNG8.
浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。
IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。
浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}
这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)
渐进识别的方式，从总体中逐渐排除局部。
首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。 
接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
css
  .bb{
   background-color:#f1ee18;/*所有识别*/
  .background-color:#00deff\9; /*IE6、7、8识别*/
  +background-color:#a200ff;/*IE6、7识别*/
  _background-color:#1e0bd1;/*IE6识别*/

  } 
IE下,可以使用获取常规属性的方法来获取自定义属性,
也可以使用getAttribute()获取自定义属性;
Firefox下,只能使用getAttribute()获取自定义属性. 
解决方法:统一通过getAttribute()获取自定义属性.
IE下,even对象有x,y属性,但是没有pageX,pageY属性; 
Firefox下,event对象有pageX,pageY属性,但是没有x,y属性.
（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。
Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决.
超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
L-V-H-A : a:link {} a:visited {} a:hover {} a:active {}

8.html5\CSS3有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，地理定位等功能的增加。
绘画 canvas 元素
用于媒介回放的 video 和 audio 元素
本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
sessionStorage 的数据在浏览器关闭后自动删除
语意化更好的内容元素，比如 article、footer、header、nav、section
表单控件，calendar、date、time、email、url、search
CSS3实现圆角，阴影，对文字加特效，增加了更多的CSS选择器 多背景 rgba
新的技术webworker, websockt, Geolocation
移除的元素
纯表现的元素：basefont，big，center，font, s，strike，tt，u；
对可用性产生负面影响的元素：frame，frameset，noframes；
是IE8/IE7/IE6支持通过document.createElement方法产生的标签，
可以利用这一特性让这些浏览器支持HTML5新标签，
浏览器支持新标签后，还需要添加标签默认的样式：
当然最好的方式是直接使用成熟的框架、使用最多的是html5shim框架
<!--[if lt IE 9]> 
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script> 
<![endif]-->

9.你怎么来实现页面设计图，你认为前端应该如何高质量完成工作? 一个满屏 品 字布局 如何设计?
首先划分成头部、body、脚部；。。。。。
实现效果图是最基本的工作，精确到2px；
与设计师，产品经理的沟通和项目的参与
做好的页面结构，页面重构和用户体验
处理hack，兼容、写出优美的代码格式
针对服务器的优化、拥抱 HTML5。

10.常使用的库有哪些？常用的前端开发工具？开发过什么应用或组件？
使用率较高的框架有jQuery、YUI、Prototype、Dojo、Ext.js、Mootools等。尤其是jQuery，超过91%。
轻量级框架有Modernizr、underscore.js、backbone.js、Raphael.js等。
（理解这些框架的功能、性能、设计原理）

Sublime Text 、Eclipse、Notepad、Firebug、HttpWatch、Yslow。
城市选择插件，汽车型号选择插件、幻灯片插件。弹出层。（写过开源程序，加载器，js引擎更好）

11.JavaScript原型，原型链 ? 有什么特点？
原型对象也是普通的对象，是对象一个自带隐式的 proto 属性，原型也有可能有自己的原型，如果一个原型对象的原型不为null的话，我们就称之为原型链。
原型链是由一些用来继承和共享属性的对象组成的（有限的）对象链。
JavaScript的数据对象有那些属性值？
　　writable：这个属性的值是否可以改。
　　configurable：这个属性的配置是否可以删除，修改。
　　enumerable：这个属性是否能在for…in循环中遍历出来或在Object.keys中列举出来。
　　value：属性值。
当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的话，就会查找他的Prototype对象是否有这个属性。
function clone(proto) {
　　function Dummy() { }
　　Dummy.prototype = proto;
　　Dummy.prototype.constructor = Dummy;
　　return new Dummy(); //等价于Object.create(Person);
} 

function object(old) {
    function F() {};
    F.prototype = old;
    return new F();
 }
   var newObj = object(oldObject);

12.列出display的值，说明他们的作用。position的值， relative和absolute定位原点是？
block 象块类型元素一样显示。
缺省值。向行内元素类型一样显示。
inline-block 象行内元素一样显示，但其内容象块类型元素一样显示。
list-item 象块类型元素一样显示，并添加样式列表标记。

*absolute
  生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。 
*fixed （老IE不支持）

    生成绝对定位的元素，相对于浏览器窗口进行定位。 
*relative

    生成相对定位的元素，相对于其正常位置进行定位。 
static 默认值。没有定位，元素出现在正常的流中
*（忽略 top, bottom, left, right z-index 声明）。
inherit 规定从父元素继承 position 属性的值。

13.页面重构怎么操作？
编写 CSS、让页面结构更合理化，提升用户体验，实现良好的页面效果和提升性能。

14.语义化的理解？
html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；
在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。
搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

15.HTML5的离线储存？
localStorage 长期存储数据，浏览器关闭后数据不丢失；
sessionStorage 数据在浏览器关闭后自动删除。

16.为什么要初始化CSS样式。
因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
最简单的初始化方法就是： {padding: 0; margin: 0;} （不建议）

淘宝的样式初始化： 
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; } 

17.(写)描述一段语义的html代码吧。
（HTML5中新增加的很多标签（如：<article>、<nav>、<header>和<footer>等）
 就是基于语义化设计原则）  

    < div id="header"> 
    < h1>标题< /h1> 
    < h2>专注Web前端技术< /h2> 
    < /div>

语义 HTML 具有以下特性：

文字包裹在元素中，用以反映内容。例如：
段落包含在 <p> 元素中。
顺序表包含在<ol>元素中。
从其他来源引用的大型文字块包含在<blockquote>元素中。
HTML 元素不能用作语义用途以外的其他目的。例如：
<h1>包含标题，但并非用于放大文本。
<blockquote>包含大段引述，但并非用于文本缩进。
空白段落元素 ( <p></p> ) 并非用于跳行。
文本并不直接包含任何样式信息。例如：
不使用 <font> 或 <center> 等格式标记。
类或 ID 中不引用颜色或位置。

18.absolute的containing block计算方式跟正常流有什么不同？

19.position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

20.对BFC规范的理解？（W3C CSS 2.1 规范中的一个概念,它决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）

21.iframe有那些缺点？
*iframe会阻塞主页面的Onload事件；
*iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript
动态给iframe添加src属性值，这样可以可以绕开以上两个问题。

22.css定义的权重

以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值：

/权重为1/
div{
}
/权重为10/
.class1{
}
/权重为100/

id1{
}
/权重为100+1=101/

id1 div{
}
/权重为10+1=11/
.class1 div{
}
/权重为10+10+1=21/
.class1 .class2 div{
}

如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现

23.eval是做什么的？
它的功能是把对应的字符串解析成JS代码并运行；
避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。

23.写一个通用的事件侦听器函数
// event(事件)工具集，来源：https://github.com/markyun
markyun.Event = {

// 页面加载完成后
readyEvent : function(fn) {
    if (fn==null) {
        fn=document;
    }
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = fn;
    } else {
        window.onload = function() {
            oldonload();
            fn();
        };
    }
},
// 视能力分别使用dom0||dom2||IE方式 来绑定事件
// 参数： 操作的元素,事件名称 ,事件处理程序
addEvent : function(element, type, handler) {
    if (element.addEventListener) {
        //事件类型、需要执行的函数、是否捕捉
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, function() {
            handler.call(element);
        });
    } else {
        element['on' + type] = handler;
    }
},
// 移除事件
removeEvent : function(element, type, handler) {
    if (element.removeEnentListener) {
        element.removeEnentListener(type, handler, false);
    } else if (element.datachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
}, 
// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
stopPropagation : function(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else {
        ev.cancelBubble = true;
    }
},
// 取消事件的默认行为
preventDefault : function(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
},
// 获取事件目标
getTarget : function(event) {
    return event.target || event.srcElement;
},
// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
getEvent : function(e) {
    var ev = e || window.event;
    if (!ev) {
        var c = this.getEvent.caller;
        while (c) {
            ev = c.arguments[0];
            if (ev && Event == ev.constructor) {
                break;
            }
            c = c.caller;
        }
    }
    return ev;
}
};

24.99%的网站都需要被重构是那本书上写的？
网站重构：应用web标准进行设计（第2版）

25.什么叫优雅降级和渐进增强？
优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会检查以确认它们是否能正常工作。由于IE独特的盒模型布局问题，针对不同版本的IE的hack实践过优雅降级了,为那些无法支持功能的浏览器增加候选方案，使之在旧式浏览器上以某种形式降级体验却不至于完全失效.
渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能,向页面增加无害于基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。

26.Node.js的适用场景
高并发、聊天、实时消息推送

27.WEB应用从服务器主动推送Data到客户端有那些方式？
全选复制放进笔记html5 websoket
WebSocket通过Flash
XHR长时间连接
XHR Multipart Streaming
不可见的Iframe
<script>标签的长时间连接(可跨域)

28. 三列布局实现(两侧固定宽度，中间自适应)
	1. 固定布局和margin  // 左右设置固定宽度和绝对定位，中间设置magin来控制内容在div之中   
        .wrap {
            position: relative;
            width: 100%;
            height: 200px;
        }
        
        .left,
        .right {
            width: 300px;
            position: absolute;
            background: #ccc;
            height: 200px;
			top: 0;
        }
        
        .middle {
            background: greenyellow;
            height: 200px;
        }
        
        .left {
            left: 0;
        }   
        .right {
            right: 0
        }
	2.float和magin //  左右设置固定宽度和float，中间width设置auto 
		#left,#right{ width: 200px;height: 200px; background-color: #ffe6b8 }
		#left {float: left;}  //左边块左浮动
		#right{float: right;}  //右边块右浮动
		#middle{height: 200px; background-color: #a0b3d6;}
	3.flex
	    #box {
            width: 100%;
            height: 200px;
            display: flex;
        }
        
        #left,
        #right {
            width: 200px;
            height: 200px;
            background: pink;
        }
        
        #middle {
            flex: auto;
            /* flex属性是flex-grow（项目放大比例）, flex-shrink（缩小比例） 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选*/
            background: skyblue;
        }
29.移动端rem和em
	rem的根据根元素的字体大小来定义1rem
	em根据父元素的字体大小来定义
	
30. CSS中抗锯齿
	transform:rotate(5deg) translateZ(0)
31.object拷贝
	1.浅拷贝：Object.assign()
	2.深拷贝：JSON.Stringify() JSON.parse();  lodash工具库中的cloneDeep()
32. 实现给数字添加千分位符的方法
	正则表达式："12345678".replace(/(\d)(?=(?:\d{3})+$)/g,'$1,')
	字符串分析， 循环，然后3位加','
	数字分析， 取到整数部分， %1000 操作， 然后加逗号 拼接字符串 
	(12345678).toLocaleString("en-US") => "12,345,678"	

33.比较 HTML XML XHTML 和 JSON
	HTML:我们最熟悉的就是 HTML（HyperText Markup Language / 超文本标记语言），用来描述和定义 网络内容的标记语言，
		超文本的意思是说，除了能标记本文，还能标记 图片，视频，链接 等其他内容
	XML:（Extensible Markup Language / 可扩展标记语言），表现就是给一堆文档加上标签，说明里面的数据是什么意思，
		方便存储、传输、分享数据。和 HTML 的区别是 HTML 的标签就预定义的，XML 是可扩展的 XHTML: Extensible Hypertext Markup Language / 
		可扩展超文本标记语，其实就是 HTML 的严格语法形式，约定了 属性名必需小写，空元素必需关闭，元素名小写，属性名必需加引号，布尔类型必需加属性值
	JSON:（Javascript Object Notation）比较轻量级的数据交换格式，由键值对组成，数据格式比较简单, 易于读写, 格式都是压缩的, 占用带宽小
34.解决页面js和css缓存的问题
	引入链接之中加随机数<"link href=url？random ='"+ Math.random()+"'">

35.




