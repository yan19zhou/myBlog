vue:数据驱动视图
	new Vue({
		el:"#app",
		data:{
			mes:'this is a message'
		},
		methods:{
			handleEvent:function(){
				this.mes='change this message'
			}
		}
	})
	<input type='text' v-model='mes'/>
	<!--
		v-for:绑定列表；todo in todos 相当于for in,不仅可以遍历对象的集合，也可以遍历单个对象的内部属性
		v-on：click绑定事件 //v-on:click 如果等号后面不带括号就是vue方法，默认传入event，如果带括号就是js表达式，如果带括号不传入event，则取不到event对象
		v-model：双向数据绑定
		v-once:元素添加此属性后，视图不会随着数据的变化而变化
		v-text='message'等同于{{message}}
		v-html="Dhtml",用来显示带html标签的内容，Dhtml来自data；
		v-bind:href="url",用来绑定html已有的属性，url来自data，这样属性就变成动态，响应式的了
		v-bind:class='classObj'直接绑定一个class对象，class对象在data中设置class值，
		v-bind:style="[style1,style2]"可以用数组的形式绑定多个对象，
		v-on:submit.prevent="submit" submit事件后有个.prevent,它其实代表的就是event.preventDefault(); 这种带点的写法就是修饰器，它们一般都带有一些特殊功能。
		v-if="ok"对应元素的显示隐藏，
		v-else如果ok为false则v-else对应的元素显示；必须跟在v-if之后才有用；
			如：<div v-if="ok">3</div> <div v-else>222</div>
		v-show：和v-if一样，但是v-show仅仅改变display的属性而已，不会重新渲染dom，如果要频繁更改显示隐藏的状态则使用v-show否则使用v-if；
		vm.$el:实例自身属性
		vm.$catch('message',function(newval,oldval){}):数据变化时触发
		Directive中运行表达式：  <div v-bind:id="'list-' + id"></div>

		v-for：循环列表
			<li v-for="(item,index) in items">{{index}}--{{item.message}}</li>
			data:{
				items:[
				{message:351564},
				{message:56815}
				]
			}
		
		修饰器的使用,改变原来的数据，而不是返回新数据
		push()     //在结尾增加一条或多条数据 vm.items.push({text:2222})
	    pop()      //删除最后一条数据
	    shift()     //删除第一条数据，并返回这条数据
	    unshift()    //在开始增加一条或多条数据，并返回数组长度
	    splice()    //向/从数组中添加/删除项目，然后返回被删除的项目。
	    sort()    //对数组的元素进行排序。
	    reverse()    //颠倒数组中元素的顺序。
	   
	   返回新的数组：
	    filter()     //返回条件为真的数据
	    concat()    //连接两个或多个数组
	    slice()    //从已有的数组中返回选定的元素。
	    Vue.set(example1.items, indexOfItem, newValue)//直接通过索引修改数组元素
	     example1.items = example1.items.splice(indexOfItem, 1, newValue)
			例如：Vue.set(vm.items,1,{message:"34234234"})
		//这里是找到某个元素然后用新值替换，理解起来没有set方法简单。splice是返回值，所以要接一下。
		 example1.items = example1.items.splice(newLength)
		//比如newLength你写的是10，那么原来的数组就只保留最前面10个元素。
	    
	    显示过滤或排序后的列表有两种方法；一种是计算，一种是方法：本例中的toNum1及toNum;
	   
	    事件修饰器：
	     阻止点击事件的冒泡行为 
	    <a v-on:click.stop="doThis"></a>
	     阻止默认的表单提交 
	    <form v-on:submit.prevent="onSubmit"></form>
	     事件修饰器可以连用 
	    <a v-on:click.stop.prevent="doThat">
	    只需要修饰器，而无需处理方法 
	    <form v-on:submit.prevent></form>
	    使用 capture 模式
	    <div v-on:click.capture="doThis">...</div>
	     仅当event.target是自身的时候才执行 
	     比如，这样写了之后点击子元素就不会执行后续逻辑 
	    <div v-on:click.self="doThat">...</div>
		
		当input一输入值，视图就有了变化。有时候你不想这么高度同步，而是等输入完了，视图再变化，可以这样写：
		    synced after "change" instead of "input"
		    <input v-model.lazy="msg">
		如果你想让输入的数据自动转化为数字的话，可以这样写：
  		  <input v-model.number="age">
		   <input v-model.trim="msg">
			自动去除字符串首尾空格
		组件
		ps：组件注册要写在前面，vue实例化要写在后面，否则会报错
		1.创建组件：
		<div id="app"><my-component></my-component></div>
		创建组件第一种：
			Vue.component("my-component",{
				template:"<div>this is a component</div>"
			})
			var vm=new Vue({
				el:"#app"
			})
		第二种：
			var child={
				template:"<div>this is another component</div>"
			}
		var vm=new Vue({
			el:"#app",
			components:{
				'my-component':child  //child只有在vm作用域下才有效
			}
		})
		
		2.组件中的data属性
		组件中的data属性后面一定要跟一个回调函数，将属性return回来；
		 example：
		 var data={counter:0}
		 Vue.component("simple-counter",{
			 template:"<button v-on:click="counter+=1">{{counter}}</button>"
			 data：function(){
				 return counter:0
			 }
		 })
		var vm=new Vue({
			el:"#app"
		})
		
		<div id="app">
		<simple-counter></simple-counter>
		<simple-counter></simple-counter>
		<simple-counter></simple-counter>//组件可以复用
		</div>
		3.组件里的el属性
		组件里的el属性也要用闭包+return的写法。它定义组件的有效作用域。
		Vue.component("my-component",{
			el:function(){
				return '#app'
			},
			template:'<div>111</div>',
			data:function(){
				return data
			}
		})
		
		组件的嵌套使用：
			参数往下传，事件往上传
		
		1.使用props属性传参
		Vue.component('simple-counter',{
			props:['myMessage'],
		  template:'<div>{{myMessage}}<div>'//在js中用驼峰命名
			})
			new Vue({
			el:'#app'
			})
		<div id="app">
		<simple-counter my-message='rrrr'></simple-counter>		//在html中要用短线命名 
		</div>
		
		动态传参：
		 Vue.component('child',{
			 props:['message'],
			 template:'<span>{{message}}</span>'
		 })
		
		new Vue({
			el:'#app',
			data:{
				psMes:''
			}
		})
		
		<div id='app'>
		<input v-model='psMes'/>
		<br>
		<child v-bind:message='psMes'></child>
		</div>
		
		传入参数限定：
		    Vue.component('example', {
			  props: {
				// 基础类型检查 (`null` 表示可以接受任何类型)
				propA: Number,
				// 多个类型限定
				propB: [String, Number],
				// 必填限制
				propC: {
				  type: String,
				  required: true
				},
				// 默认值设置
				propD: {
				  type: Number,
				  default: 100
				},
				// 对象/数组 默认值需要用闭包返回
				propE: {
				  type: Object,
				  default: function () {
					return { message: 'hello' }
				  }
				},
				// 自定义验证条件
				propF: {
				  validator: function (value) {
					return value > 10
				  }
				}
			  }
			})
		type参数可以是以下值：

		- String
		- Number
		- Boolean
		- Function
		- Object
		- Array
	
	自定义事件：
		
		Vue有两个方法是用来处理事件的：
			侦听事件使用 $on(eventName)
			定义和触发事件使用 $emit(eventName)
	
	 Vue.component('button-counter', {
      template: '<button v-on:click="increment">{{ counter }}</button>',
      data: function () {
        return {
          counter: 0
        }
      },
      methods: {
        increment: function () {
          this.counter += 1
          this.$emit('increment')//把increment方法传到组件上级
        }
      },
    })
    new Vue({
      el: '#counter-event-example',
      data: {
        total: 0
      },
      methods: {
        incrementTotal: function () {
          this.total += 1
        }
      }
    })	
		
	<div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter> //这里我们调用了v-on:increment="incrementTotal"侦听，它侦听到组件内部事件后将会执行父级实例的incrementTotal方法。
    </div>	
		
	绑定js原生事件到组件	
		    <my-component v-on:click.native="doTheThing"></my-component> // click后面加个.native修饰器就可以了。
		
	表单类型组件的自定义事件
			
	非父子关系的组件信息传递	
		有时，2个组件之间并不是上下级关系，但是你也需要在他们之间交换数据，做法是：
		建议一个空的Vue实例作为事件传递中介：
			var bus = new Vue()
		然后
			// 组件A的method中广播事件
			bus.$emit('id-selected', 1)
		意思是在bus中广播这个事件
			// 组件B's 事件钩子
			bus.$on('id-selected', function (id) {
			  // ...
			})
		意思在bus中侦听事件
	组件内容分发
		
	组件标签之间可以写点啥？组件编译的作用域

    <parent-component>
        <child-component>
          {{ message }}
        </child-component>
    </parent-component>

写在child-component中间的这个{{message}},到底算是绑定child-component的还是parent-component的？
答案是：parent-component的。
规则就是：
所有在父组件模板里的东西都将视为父组件的作用域，所有在子组件的东西都将视为子组件的作用域；

最常见的一个错误就是：

    <child-component v-show="someChildProperty"></child-component>

你以为someChildProperty是子组件的数据属性，其实它绑定了父组件的数据属性；所以你只能这样写：

    Vue.component('child-component', {
      // this does work, because we are in the right scope
      template: '<div v-show="someChildProperty">Child</div>',
      data: function () {
        return {
          someChildProperty: true
        }
      }
    })

写在子组件的模板里，someChildProperty就可以和子组件里的数据绑定了。
讲完这个概念，我们来看“内容分发”，也是这个原则；
单插槽(Single-Slot)

slot这个单词，我们以前玩过红白机或者街机的同学都会知道（不好意思，暴露年龄了），卡带的插槽，还有投币孔，都叫做slot；
大概意思就是把一个东西通过slot丢到另一个东西里面去；

我们来看这个例子：

    <div id="example">
      <parent-com>
      </parent-com>
    </div>
    <template id='parent-com'>
      <div>
      <h1>I'm the parent title</h1>
      <child-com>
           <p>
            我是在父组件的内容，写在子组件的标签内，将会自动传入子组件模板中的slot
            </p>
      </child-com>
    </div>
    </template>
    <template id='child-com'>
      <div>
      <h2>I'm the child title</h2>
      <slot>
        没有slot注入时，这段文字才会被显示。
      </slot>
    </div>
    </template>

    Vue.component('parent-com', {
      template: '#parent-com'
     });
     Vue.component('child-com', {
      template: '#child-com'
     });
    new Vue({
      el: '#example'
    });



我们在写parent-com的时候，写到了<child-com></child-com>，本来child-com标签之间是不应该写内容的，因为内容是内部模板渲染出来的。但是如果你写了，这些html内容将会当做参数传入child-com内部定义有slot的地方。
官网例子看不懂，就看看这个例子吧；
命名插槽（Named-Slots）

上面的例子，只要你把内容写在child-com标签之间，这些内容就会自动在child-com内部找到slot的位置并注入；
如果我有多个内容要分别注入不同的slot怎么办？

给slot起个名字不就可以了；
这个时候，子组件模板：

    <template id='child-com'>
     <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
    </template>

父组件传入的时候这样写：

    <template id='parent-com'>
      <div>
      <h1>I'm the parent title</h1>
      <child-com>
            <h1 slot="header">Here might be a page title</h1>
            <p>A paragraph for the main content.</p>
            <p>And another one.</p>
            <p slot="footer">Here's some contact info</p>
      </child-com>
    </div>
    </template>
	
	需要重用组件的考虑

如果一个组件需要重复使用多次，那么请一开始就充分考虑接口，不要已经使用了很多组件了，然后才想起扩充接口。
总的来说，Vue组件的接口包括3个方面：

    Props（数据）允许外部将数据传入组件内；
    Events（事件） 允许将组件内的事件向外传播；
    Slots（插槽）允许在外部编辑组件内的html内容；

    <my-component
      :foo="baz"
      :bar="qux"
      @event-a="doThis"
      @event-b="doThat"
    >
      <img slot="icon" src="...">
      <p slot="main-text">Hello!</p>
    </my-component>

以上就是这三种接口在组件调用时的运用；

	
	异步组件

一个组件在dom里面，要么有，要么没有，对于某些大型app，会同时有很多组件，可能你需要根据某些条件来决定如何加载这些组件，而不是一次性全部加载；

我们在定义组件的时候，可以有两个回调函数作为参数：

    Vue.component('async-example', function (resolve, reject) {
      setTimeout(function () {
        resolve({
          template: '<div>I am async!</div>'
        })
      }, 1000)
    })

一个是resolve,一个是reject,它们的意思是，当满足某个条件时，我可以选择渲染这个组件，也可以选择拒绝渲染；
	
	静态组件

对于完全不需要数据绑定的组件，你可以在模板内部使用v-once，这样可以生成缓存，节约不少性能；

    Vue.component('terms-of-service', {
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>\
      '
    })
	
	父子组件props
		动态props
		类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件：

			<div>
			  <input v-model="parentMsg">
			  <br>
			  <child v-bind:my-message="parentMsg"></child>
			</div>

			使用 v-bind 的缩写语法通常更简单：

			<child :my-message="parentMsg"></child>
		
		字面量语法 vs 动态语法
		
			初学者常犯的一个错误是使用字面量语法传递数值：<div some-props='1'></div> 这样的话传递是字符串'1',而不是数值1；
			要使用v-bind，让他的值被当做JS表达式计算：<div v-bind:some-props='1'></div>
	
		单向数据流
	
		每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

			通常有两种改变 prop 的情况：

				prop 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用；

				prop 作为需要被转变的原始值传入。

			更确切的说这两种情况是：

				定义一个局部 data 属性，并将 prop 的初始值作为局部数据的初始值。

				props: ['initialCounter'],
				data: function () {
				  return { counter: this.initialCounter }
				}

				定义一个 computed 属性，此属性从 prop 的值计算得出。

				props: ['size'],
				computed: {
				  normalizedSize: function () {
					return this.size.trim().toLowerCase()
				  }
				}
				
				注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。
				
	async await			
				
	第一个例子

Async/Await应该是目前最简单的异步方案了，首先来看个例子。

这里我们要实现一个暂停功能，输入N毫秒，则停顿N毫秒后才继续往下执行。

	var sleep = function (time) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve();
			}, time);
		})
	};

	var start = async function () {
		// 在这里使用起来就像同步代码那样直观
		console.log('start');
		await sleep(3000);
		console.log('end');
	};

	start();

控制台先输出start，稍等3秒后，输出了end。
基本规则

    async 表示这是一个async函数，await只能用在这个函数里面。

    await 表示在这里等待promise返回结果了，再继续执行。

    await 后面跟着的应该是一个promise对象（当然，其他返回值也没关系，只是会立即执行，不过那样就没有意义了…）

获得返回值

await等待的虽然是promise对象，但不必写.then(..)，直接可以得到返回值。

	var sleep = function (time) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				// 返回 ‘ok’
				resolve('ok');
			}, time);
		})
	};

	var start = async function () {
		let result = await sleep(3000);
		console.log(result); // 收到 ‘ok’
	};

捕捉错误

var sleep=function(time){
	return new Promise(function(resolve,reject){
		setTimeout(function(){resolve},time)
	})
}
var result=async function(){
	await sleep(3000)
}

既然.then(..)不用写了，那么.catch(..)也不用写，可以直接用标准的try catch语法捕捉错误。

var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 模拟出错了，返回 ‘error’
            reject('error');
        }, time);
    })
};

var start = async function () {
    try {
        console.log('start');
        await sleep(3000); // 这里得到了一个返回错误
        
        // 所以以下代码不会被执行了
        console.log('end');
    } catch (err) {
        console.log(err); // 这里捕捉到错误 `error`
    }
};

循环多个await

await看起来就像是同步代码，所以可以理所当然的写在for循环里，不必担心以往需要闭包才能解决的问题。

..省略以上代码

var start = async function () {
    for (var i = 1; i <= 10; i++) {
        console.log(`当前是第${i}次等待..`);
        await sleep(1000);
    }
};

值得注意的是，await必须在async函数的上下文中的。

..省略以上代码

let 一到十 = [1,2,3,4,5,6,7,8,9,10];

// 错误示范
一到十.forEach(function (v) {
    console.log(`当前是第${v}次等待..`);
    await sleep(1000); // 错误!! await只能在async函数中运行
});

// 正确示范
for(var v of 一到十) {
    console.log(`当前是第${v}次等待..`);
    await sleep(1000); // 正确, for循环的上下文还在async函数中
}

第二个例子

这个例子是一个小应用，根据电影文件名，自动下载对应的海报。

直接贴出代码，就不说明了。

import fs from 'fs';
import path from 'path';
import request from 'request';

var movieDir = __dirname + '/movies',
    exts     = ['.mkv', '.avi', '.mp4', '.rm', '.rmvb', '.wmv'];

// 读取文件列表
var readFiles = function () {
    return new Promise(function (resolve, reject) {
        fs.readdir(movieDir, function (err, files) {
            resolve(files.filter((v) => exts.includes(path.parse(v).ext)));
        });
    });
};

// 获取海报
var getPoster = function (movieName) {
    let url = `https://api.douban.com/v2/movie/search?q=${encodeURI(movieName)}`;

    return new Promise(function (resolve, reject) {
        request({url: url, json: true}, function (error, response, body) {
            if (error) return reject(error);

            resolve(body.subjects[0].images.large);
        })
    });
};

// 保存海报
var savePoster = function (movieName, url) {
    request.get(url).pipe(fs.createWriteStream(path.join(movieDir, movieName + '.jpg')));
};


(async () => {
    let files = await readFiles();

    // await只能使用在原生语法
    for (var file of files) {
        let name = path.parse(file).name;

        console.log(`正在获取【${name}】的海报`);
        savePoster(name, await getPoster(name));
    }

    console.log('=== 获取海报完成 ===');
})();
	
	
	
	
二。实例生命周期
	每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，给予用户机会在一些特定的场景下添加他们自己的代码。

		created 钩子可以用来在一个实例被创建之后执行代码：
		
	
//过渡效果
Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：

    在 CSS 过渡和动画中自动应用 class
    可以配合使用第三方 CSS 动画库，如 Animate.css
    在过渡钩子函数中使用 JavaScript 直接操作 DOM
    可以配合使用第三方 JavaScript 动画库，如 Velocity.js
//单元素/组件的过渡

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡

    条件渲染 （使用 v-if）
    条件展示 （使用 v-show）
    动态组件
    组件根节点

这里是一个典型的例子：

<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>

new Vue({
  el: '#demo',
  data: {
    show: true
  }
})

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

元素封装成过渡组件之后，在遇到插元素封装成过渡组件之后，在遇到插入或删除时，Vue 将

    自动嗅探目标元素是否有 CSS 过渡或动画，并在合适时添加/删除 CSS 类名。

    如果过渡组件设置了过渡的 JavaScript 钩子函数，会在相应的阶段调用钩子函数。

    如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作（插入/删除）在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，与 Vue，和Vue的 nextTick 概念不同)

过渡的-CSS-类名

会有 4 个(CSS)类名在 enter/leave 的过渡中切换

    v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。

    v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。

    v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。

    v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。

	
	
//同时使用 Transitions 和 Animations

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 transitionend 或 animationend ，这取决于给元素应用的 CSS 规则。如果你使用其中任何一种，Vue 能自动识别类型并设置监听。

但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 animation 很快的被触发并完成了，而 transition 效果还没结束。在这种情况中，你就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。
JavaScript 钩子

可以在属性中声明 JavaScript 钩子

<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
	
	这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。

当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。 否则，它们会被同步调用，过渡会立即完成。

推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
	
//多个if的单元素的过渡	
	<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>

// ...
computed: {
  buttonMessage: function () {
    switch (docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}	


//render函数

//自定义指令

1、创建和使用
 Vue.directive('change',{
    bind:function(el,bindings){
    //首次调用
    },
    update:function(el,bindings){
    //只要是有数据变化，都会调用
    },
    unbind:function(){
    //解绑
    }
 })
 <any v-change="count"></any>

//自定义过滤器

Vue1. 支持内置的过滤器，但是Vue2. 就不再内置过滤器，但是支持自定义过滤器。

1、过滤器的创建和使用

1.创建
   Vue.filter(
    'myFilter',
    function(myInput){
       //myInput是在调用过滤器时，管道前表达式执行的结果
       //针对myInput，按照业务需求做处理
       //返回
       return '处理后的结果'
    })

2.使用
    <any>{{expression | myFilter}}</any>

2、如何在调用过滤器时，完成参数的发送和接受

1.发送
<any>{{expression | myFilter(参数1，参数2)}}</any>

2.接受
Vue.filter('myFilter',function(myInput，参数1，参数2){
    return '处理后的结果'
})


// 监听
    watch:{
    myValue:function(newValue,oldValue){
    
    }
    }
	
	
// axios


1.axios的get方法

export const getAjax= function (getUrl,getAjaxData) {
  return axios.get(getUrl, {
    params: {
      'getAjaxDataObj1': getAjaxData.obj1,//obj1为getAjaxData的一个属性
      'getAjaxDataObj2': getAjaxData.obj2
    }
  })
}

2.axios的post方法

export const postAjax= function (getUrl,postAjaxData) {
return axios.get(postUrl, {

  'postAjaxDataObj1': postAjaxData.obj1,//obj1为postAjaxData的一个属性
  'postAjaxDataObj2': postAjaxData.obj2

})
}

3.axios的拦截器
主要分为请求和响应两种拦截器,请求拦截一般就是配置对应的请求头信息(适用与常见请求方法,虽然ajax的get方法没有请求头,但是axios里面进行啦封装),响应一般就是对reponse进行拦截处理,如果返回结果为[]可以转化为0

1.请求拦截:将当前城市信息放入请求头中

axios.interceptors.request.use(config => {
config.headers.cityCode = window.sessionStorage.cityCode //jsCookie.get('cityCode')
return config
},

2.响应拦截:处理reponse的结果

axios.interceptors.response.use((response) =>{
  let data = response.data
  if(response.request.responseType === 'arraybuffer'&&!data.length){
    reponse.date=0
  }
})
[{"docID":"C7C9D5E54B800001511AEF6FF870EE50",
"docName":"Chrysanthemum.jpg",
"size":"879394",
"docPath":"/defaultDocNameSpace",
"fileID":"91-defaultDocNameSpace",
"time":"2017-12-08T13:54:57.875Z"}


vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
具体步骤：

第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。




	