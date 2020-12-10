ES6中的react语法：
	
	1. 创建组件：
		import React ,{Component} from 'react';
		class MyComponent extends Component{
			render(){
			return :();
			}
		}
	
	2.propTypes和getDefaultProps:
	使用React.Component创建组件，需要通过constructor中调用super()讲props传给React.Component,由于是使用ES6 class创建组件，其内部只能定义方法，
	不能定义属性，所以propTypes要在class的外面定义；
	class MyComponent extends Component{
		constructor (props){
			super(props);
		}
		render(){
			return ()
		}
	}
	MyComponent.propTypes={
		nameProp:React.propTypes.string
	};
	MyComponent.defaultProps={
		nameprop:""
	};
	export default MyComponent;
	
	3.State
		使用ES6 class创建组件，state的初始化需要在constructor中进行；
		class MyComponent extends Component{
			constructor(props){
				super(props);
				this.state={
					data:[]
				}
			}
			render(){
				return ()
			}
		}
	
	4.this
		class中this不会自动绑定到实例，必须使用bind()方法或者使用箭头函数=>进行绑定；
		class MyComponent extends Component{
			handleClick(){
				...
			}
			render(){
				return (
				<div onclick={this.handleClick.bind(this)}>ES6方式创建的组件</div>
				)
			}
		}
		也可以讲绑定方法写到constructor中：
		class MyComponent extends Component{
			constructor(props){
				super(props);
				this.handleClick=this.handleClick.bind(this);
			}
			handleClick(){
				console.log();
			}
			render(){
				return (<div onclick={this.handleClick}>...</div>)
			}
		}
		使用箭头函数：
		class MyComponent extends Component{
			handleClick=>{
				console.log()
			}
			render(){
				return (<div onclick={this.handleClick}>...</div>)
			}
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		