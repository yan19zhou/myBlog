多页应用

. 核心思想：多个vue项目，一次webpack打包，使用url关联
	webpcak操作：
		1.多个入口{main1:'./user.main.js',main2:'./goods.main.js'}
		2.多个html插件
.  注意事项
	// 文件名称：
	filename:filename + '.html',
	// 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
	chunks:['manifest','vendor',filename],
	inject:true
.  getHtmls的思路
	。更为灵活的读取各项目下的js文件(入口)，entry:{'js文件名': 'js文件路径'}
	。更为灵活的读取各项目下的html文件(首页.html) plugins:[].concat([new HtmlWebpackPlugin() ]) // 把遍历新增的plugins合并到默认的plugins中去
		filename属性是生成的相对dist的文件名 xxx.html
		template:模板生成的参照物 需要绝对路径||相对路径
		chunks:[filename] 是指引入html的页面js名称