#### 预渲染
	在什么情况下使用预渲染？
	当项目只对几个页面有seo需求时使用预渲染是最高效的手段
	在vue cli3中使用预渲染
	1.安装依赖：prerender-spa-plugin
	2.在vue.config.js中注册new PrerenderSpaPlugin 并配置相关信息
		const PrerenderSPAPlugin = require('prerender-spa-plugin');
		const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
		const path = require('path');
		module.exports = {
			configureWebpack: config => {
				if (process.env.NODE_ENV !== 'production') return;
				return {
					plugins: [
						new PrerenderSPAPlugin({
						
							// 生成文件的路径，也可以与webpakc打包的一致。
							// 下面这句话非常重要！！！
							// 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
							staticDir: path.join(__dirname,'dist'), // vue2.0中地址为'../dist'
							// 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
							routes: ['/', '/product','/about'],
							// 这个很重要，如果没有配置这段，也不会进行预编译
							renderer: new Renderer({
								inject: {
									foo: 'bar'
								},
								headless: false,
								// 在main.js中document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
								renderAfterDocumentEvent: 'render-event'
							})
						}),
					],
				};
			}
		}
	3.在main.js中分发事件
			new Vue({
			  el: '#app',
			  router,
			  render: h => h(App),
			  mounted () {
				document.dispatchEvent(new Event('render-event'))
			  }
			})
			
	4.将router.js中的mode更改为'history'
		因为路由默认是hash模式
	5.build一下，如果成功会在dist文件中给config中设置的路由都单独生成一个文件夹并有相应的html文件
	
#### ssr
	1.安装插件：npm install vue vue-server-renderer --save
	





































	