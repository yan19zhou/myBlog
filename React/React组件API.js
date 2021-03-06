React组件API：
	1.设置状态setState(object nextState/*新状态，会和当前状态合并*/,[function callback]/*会在setState设置成功组件重新渲染后调用*/)
	2.替换状态：replaceState(object nextState[, function callback])，replaceState()方法与setState()类似，
			但是方法只会保留nextState中状态，原state不在nextState中的状态都会被删除。
	3.设置属性：setProps
			setProps(object nextProps[, function callback])
		props相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中。当和一个外部的JavaScript应用集成时，
		我们可能会需要向组件传递数据或通知React.render()组件需要重新渲染，可以使用setProps()。
		更新组件，我可以在节点上再次调用React.render()，也可以通过setProps()方法改变组件属性，触发组件重新渲染。
	4.替换属性：replaceProps(object nextProps[, function callback])
		replaceProps()方法与setProps类似，但它会删除原有
	5.强制更新：forceUpdate
		forceUpdate([function callback])//callback，可选参数，回调函数。该函数会在组件render()方法调用后调用。
			forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。但是，
			组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。
			forceUpdate()方法适用于this.props和this.state之外的组件重绘（如：修改了this.state后），通过该方法通知React需要调用render()
			一般来说，应该尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。
	6.获取DOM节点：findDOMNode
		DOMElement findDOMNode()
		返回值：DOM元素DOMElement
			如果组件已经挂载到DOM中，该方法返回对应的本地浏览器 DOM 元素。
			当render返回null 或 false时，this.findDOMNode()也会返回null。
			从DOM 中读取值的时候，该方法很有用，如：获取表单字段的值和做一些 DOM 操作。
	7.判断组件挂载状态：isMounted
		bool isMounted()
		返回值：true或false，表示组件是否已挂载到DOM中
		isMounted()方法用于判断组件是否已挂载到DOM中。可以使用该方法保证了setState()和forceUpdate()在异步场景下的调用不会出错。
		
