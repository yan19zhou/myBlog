React :
  1.安装：先安装node.js，node.js中自带npm，通过npm安装react，
  2.React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。 
	
		要渲染 HTML 标签，只需在 JSX 里使用小写字母的标签名。
		var myDivElement = <div className="foo" />;
		ReactDOM.render(myDivElement, document.getElementById('example'));

		要渲染 React 组件，只需创建一个大写字母开头的本地变量。
		var MyComponent = React.createClass({/*...*/});
		var myElement = <MyComponent someProperty={true} />;
		ReactDOM.render(myElement, document.getElementById('example'));

		React 的 JSX 使用大、小写的约定来区分本地组件的类和 HTML 标签。
			注意:
			由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。
			作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。
			<label htmlFor="for-text" className="">
	3.注释：
	<div>{/*可以当成元素的子节点放在花括号中*/}</div>
	<input /*可以内联中写注释  *//>
	
	4.React State(状态)
	 react把组件当成一个状态机，通过与用户的交互，实现不同的state，然后渲染UI，react中通过更新state，根据新的state从新渲染组件；
	 通过this.state获取状态，通过this.setState方法更改状态，然后通过this.render重新渲染组件；
	5.Reace props：
		state 的主要作用是用于组件保存、控制、修改自己的可变状态。state 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 state 是一个局部的、只能被组件自身控制的数据源。state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染。
		props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props，否则组件的 props 永远保持不变。

		state 和 props 有着千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的 state 中的数据可以通过 props 传给子组件，一个组件可以使用外部传入的 props 来初始化自己的 state。但是它们的职责其实非常明晰分明：state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。
		
		当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为。
		props和state的区别在于props是不可变的，而state可以通过与用户交互来改变，有些组件通过state来更新和修改数据，子组件只能通过props来传递数据；
		可以通过getDefaultProps()方法来为props设置默认值；
		props验证：
			Props 验证使用 propTypes，它可以保证我们的应用组件被正确使用，
			React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。
		验证器说明：
		
			React.createClass({
			  propTypes: {
				// 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
			    optionalArray: React.PropTypes.array,
				optionalBool: React.PropTypes.bool,
				optionalFunc: React.PropTypes.func,
				optionalNumber: React.PropTypes.number,
				optionalObject: React.PropTypes.object,
				optionalString: React.PropTypes.string,
			 
				// 可以被渲染的对象 numbers, strings, elements 或 array
				optionalNode: React.PropTypes.node,
			 
				//  React 元素
				optionalElement: React.PropTypes.element,
			 
				// 用 JS 的 instanceof 操作符声明 prop 为类的实例。
				optionalMessage: React.PropTypes.instanceOf(Message),
			 
				// 用 enum 来限制 prop 只接受指定的值。
				optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
			 
				// 可以是多个对象类型中的一个
				optionalUnion: React.PropTypes.oneOfType([
				  React.PropTypes.string,
				  React.PropTypes.number,
				  React.PropTypes.instanceOf(Message)
				]),
			 
				// 指定类型组成的数组
				optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),			 
				// 指定类型的属性构成的对象
				optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),			 
				// 特定 shape 参数的对象
				optionalObjectWithShape: React.PropTypes.shape({
				  color: React.PropTypes.string,
				  fontSize: React.PropTypes.number
				}),
			 
				// 任意类型加上 `isRequired` 来使 prop 不可空。
				requiredFunc: React.PropTypes.func.isRequired,
			 
				// 不可空的任意类型
				requiredAny: React.PropTypes.any.isRequired,
			 
				// 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
				customProp: function(props, propName, componentName) {
				  if (!/matchme/.test(props[propName])) {
					return new Error('Validation failed!');
				  }
				}
			  },
			  /* ... */
			});
	
	6.状态提升：
		当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为。
	
	7.组件的挂载：
		 React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载；
		 React.js内部对待组件都有一个这样的过程，就是初始化组件->将组件挂载到页面；		 
		 React.js 为了让我们能够更好的掌控组件的挂载过程，往上面插入了两个方法：

			-> constructor()
			-> componentWillMount()//定时器的启动或ajax数据的拉取可以放到里面去执行
			-> render()
			// 然后构造 DOM 元素插入页面
			-> componentDidMount()

			constructor()
			componentWillMount
			render()
			componentDidMount
			componentWillUnmount
	8.组件的变化过程：
		setState 导致 React.js 重新渲染组件并且把组件的变化应用到 DOM 元素上的过程，这是一个组件的变化过程
			
	shouldComponentUpdate(nextProps,nextState)
	componentWillReceiveProps(nextProps)


























