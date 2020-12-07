//DOM:
	1.DOM(文档对象模型)是针对html和xml的一个API，通过DOM去改变文档；DOM可以理解为一个访问或操作HTML各种标签的实现标准
	2.每一段HTML标记都可以用相应的节点来表示，一共有12种节点类型，都继承自node类型；(html元素有html元素节点，注释有注释节点，文档有文档节点)
	//node类型(基类型，所有节点都继承自他，所以所有节点都有一个共同的属性和方法)：
	//常用节点名：nodeName，nodeValue
		对于元素：nodeName为标签名，nodeValue为null；
		对于文本：nodeName为“#Text”，nodeValue为文本的值；
	//childNodes：
		1.保存了这个节点所有直接子元素；
		2.比较有用的方法和属性：
			hasChildNodes()，如果包含子节点则返回true；
			ownerDocument，返回文档的节点引用，(html里面也就是document对象)；
	//常用的方法：
		1.appendChild()方法可以在节点的childNodes的末尾增加一个节点，值得注意的是如果这个节点是已经存在在文档中的，那么便会删除原节点，
		感觉上就像是移动节点一样。
		2.insertBefore()方法接受两个参数，一个是插入的节点，另外一个是参照的节点。如果第二个参数为null，则insertBefore和appendChild效果一样。
		否则便会把节点插入到参照节点之前。这里要注意的是，如果第二个参数不为null，那么插入的节点不能是已经存在的节点。
		3.replaceChild()方法可以替换节点，接受两个参数，需要插入的节点和需要替换的节点。返回被替换掉的节点。
		4.removeChild()移除节点。这里有个常见需求，比如我有一个节点 #waste-node ，那么如何移除它呢？
			var wasteNode =  document.getElementById("waste-node");
			wasteNode.parentNode.removeClhid(wasteNode);    // 先拿到父节点，再调用removeClild删除自己
		以上的几个方法都是操作某个节点的子节点，也就是说，操作前必须找到父节点（通过parentNode来找）
		5.cloneNode();复制节点，接受一个参数 true或者false。如果true就是复制那个节点和它的子节点。
			如果是false，就是复制节点本身（复制出来的节点就会没有任何子元素）。这个方法返回复制的节点，
			如果需要操作它，那么需要借助前面讲的4个方法来把这个节点放入到html中去。
	//document类型：
	//document对象上的一些属性
		1.document.childNodes 继承自上面讲的Node类型，可以返回文档的直接子节点（通常包括文档声明和html节点）
		2.document.documentElement 可以直接拿到html节点的引用（等价于document.getElementsByTagName("html")[0]）。
		3.document.body body节点的引用
		4.document.title  页面的title，可以修改，会改变浏览器标签上的名字
		5.document.URL 页面的url
		6.document.referrer 取得referrer，也就是打开这个页面的那个页面的地址，做来源统计时候比较有用
		7.document.domain 取得域名，可以设置，但是通常只能设置为不包含子域名的情况，在一些子域名跨域情况下有效。
	//document的一些方法：
		1.getElementById 和 getElementsByTagName
		2.getElementsByName(根据name返回元素，为htmldocument类型的方法即document对象)；
		3.write() writeln() open() close()
			open和close分别是打开和关闭网页的输出流，在页面加载过程中，就相当于open状态。这两个方法一般不会去用它。
		4.write()和writeln()，它们都是向页面写入东西，区别就是后者会多加入一个换行符。

		//Element类型：日常所操作的都是Element类型，日常所说的“DOM对象”，通常也就是指Element类型的对象。
		//操作属性的方法：getAttribute 、setAttribute 、removeAttribute；
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		