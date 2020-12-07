组件的生命周期
 1.组件的生命周期可分成三个状态：
    Mounting：已插入真实 DOM
    Updating：正在被重新渲染
    Unmounting：已移出真实 DOM

 2.生命周期的方法有：

    componentWillMount 在渲染前调用,在客户端也在服务端。
		一些组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等，就可以放在 componentWillMount 里面进行，例如 Ajax：
			componentWillMount () {
				ajax.get('http://json-api.com/user', (userData) => {
				  this.setState({ userData })
				})
			  }
    componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 
		如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。

    componentWillReceiveProps 在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。

    shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
    可以在你确认不需要更新组件时使用。

    componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

    componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

    componentWillUnmount在组件从 DOM 中移除的时候立刻被调用。
		组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。例如清除计时器：
			componentWillUnmount () {
				clearInterval(this.timer)
			  }