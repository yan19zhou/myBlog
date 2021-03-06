#### 移动端问题及解决办法
	1.1px问题
	2.响应式布局
	3.iOS滑动不流畅
	原因：在 iOS 5.0 以及之后的版本，滑动有定义有两个值 auto 和 touch，默认值为 auto
		-webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
		-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
		解决方案
		
		1.在滚动容器上增加滚动touch方法
			将-webkit-overflow-scrolling 值设置为 touch

			.wrapper {
				-webkit-overflow-scrolling: touch;
			}
			设置滚动条隐藏： .container ::-webkit-scrollbar {display: none;}

			// 可能会导致使用position:fixed; 固定定位的元素，随着页面一起滚动
			
		2.设置overflow
			设置外部 overflow 为 hidden,设置内容元素 overflow 为 auto。内部元素超出 body 即产生滚动，超出的部分 body 隐藏。

			body {
				overflow-y: hidden;
			}
			.wrapper {
				overflow-y: auto;
			}
			// 两者结合使用更佳！
	
	4.iOS上拉边界下拉出现白色空白
	产生原因
		在 iOS 中，手指按住屏幕上下拖动，会触发 touchmove 事件。这个事件触发的对象是整个 webview 容器，容器自然会被拖动，剩下的部分会成空白。
		解决方案
		1.通过监听touchmove，让需要滑动的地方滑动，不需要滑动的地方禁止滑动。
			document.body.addEventListener('touchmove', function(e) {
				//值得注意的是我们要过滤掉具有滚动容器的元素。
				if(e._isScroller) return;
				// 阻止默认事件
				e.preventDefault();
			}, {
				passive: false
			});
		2.滚动妥协填充空白，装饰成其他功能
			在很多时候，我们可以不去解决这个问题，换一直思路。根据场景，我们可以将下拉作为一个功能性的操作。
			比如：下拉后刷新页面
	5.页面件放大或缩小不确定性行为
	
		原因：HTML 本身会产生放大或缩小的行为，比如在 PC 浏览器上，可以自由控制页面的放大缩小。但是在移动端，我们是不需要这个行为的。
			所以，我们需要禁止该不确定性行为，来提升用户体验。
		原理与解决方案：
		
		设置 maximum-scale、minimum-scale 与 user-scalable=no 用来避免这个问题
		<meta name=viewport content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no">
	6.click点击穿透与延迟
		解决方案
		1.使用touchstart替换click
		
			将 click 替换成 touchstart 不仅解决了 click 事件都延时问题，还解决了穿透问题。因为穿透问题是在 touch 和 click 混用时产生。
			在原生中使用
			el.addEventListener("touchstart", () => { console.log("ok"); }, false);
			在 vue 中使用
			<button @touchstart="handleTouchstart()">点击</button>
			开源解决方案中，也是既提供了 click 事件，又提供了touchstart 事件。如 vant 中的 button 组件
			
			那么，是否可以将 click 事件全部替换成 touchstart 呢？为什么开源框架还会给出 click 事件呢？
			我们想象一种情景，同时需要点击和滑动的场景下。如果将 click 替换成 touchstart 会怎样？
			事件触发顺序: touchstart, touchmove, touchend, click。
			很容易想象，在我需要touchmove滑动时候，优先触发了touchstart的点击事件，是不是已经产生了冲突呢？
			所以呢，在具有滚动的情况下，还是建议使用 click 处理。
		2.使用fastclick库
			import FastClick from 'fastclick';
			FastClick.attach(document.body, options);
			
	7.软键盘弹出将页面顶起来、收起未回落问题
	产生原因
		我们在app 布局中会有个固定的底部。安卓一些版本中，输入弹窗出来，会将解压 absolute 和 fixed 定位的元素。导致可视区域变小，布局错乱。
	8.iPhoneX底部栏适配问题
	9.保存页面为图片和二维码问题和解决方案
	10.微信公众号H5分享问题
	11.H5调用SDK相关问题及解决方案
	12.H5调试相关方案与策略
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
