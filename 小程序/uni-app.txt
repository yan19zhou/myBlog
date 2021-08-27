uni-app

1.在uni-app中使用vant-weapp
	1.github中下载vant-weapp，放入wxcomponents中
	2.pages中添加easycom项
	"easycom":{
		"autoscan":true,
		"custom":{
			"van-(.*)":  "@/wxcomponents/vant/$1/index"
		}
	}
	3.在vue页面中直接使用组件

2.配置安全域名
	微信公众平台-->开发设置-->配置服务器信息  ps:安全域名必须为https
3.获取小程序场景值：
	app.vue 中onLauch(option){
		option.scene
	}
4.bus通信
	uni.$on("eventName",(val)=>{})
	uni.$emit("eventName",params)
	uni.$once("eventName",(val)=>{})
5.scroll-view滚动
	.scroll-wrap{
		position:absolute;//设置外层或者view为固定布局
		left:0;
		right:0
	}
	.scroll-tab-wrap {
		white-space: nowrap; // 滚动必须加的属性
		width: 100%;
		height: 180upx;
		padding: 20upx;
		margin: 0 auto;
		overflow: hidden;
	}

	.item {
		width: 18%;
		height: 180px;
		margin-right: 20upx;
		display: inline-block; // 子元素必须为inline-block
		vertical-align: top;
	}
	// ps: 隐藏scroll-view的滚动条：
			// 设置外层高度小于view高度并overflow：hidden
			// 内层可加padding以比外层高

6.使用font-icon
	下载到项目--->在css文件url引入前加入https-->在app。vue中引入css文件-->组件中使用(class)

7.下拉刷新，上拉加载
	1.pages中 页面的style中设置：
							"enablePullDownRefresh":true,
							"backgroundTextStyle":"dark" // 下拉刷新的时候会显示点点点
	2.onPullDownRefresh下拉刷新时触发，onReachBottom上拉加载时触发