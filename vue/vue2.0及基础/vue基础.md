

## vue基础

### 指令

​	

- v-for:绑定列表；todo in todos 相当于for in,不仅可以遍历对象的集合，也可以遍历单个对象的内部属性
- v-on：click绑定事件 //v-on:click 如果等号后面不带括号就是vue方法，默认传入event，如果带括号就是js表达式，如果带括号不传入event，则取不到event对象
- v-model：双向数据绑定
- v-once:元素添加此属性后，视图不会随着数据的变化而变化
- v-text='message'等同于{{message}}
- v-html="Dhtml",用来显示带html标签的内容，Dhtml来自data；
- v-bind:href="url",用来绑定html已有的属性，url来自data，这样属性就变成动态，响应式的了
- v-bind:class='classObj'直接绑定一个class对象，class对象在data中设置class值，
- v-bind:style="[style1,style2]"可以用数组的形式绑定多个对象，
- v-on:submit.prevent="submit" submit事件后有个.prevent,它其实代表的就是event.preventDefault(); 这种带点的写法就是修饰器，它们一般都带有一些特殊功能。
- v-if="ok"对应元素的显示隐藏，
- v-else如果ok为false则v-else对应的元素显示；必须跟在v-if之后才有用；
- v-show：和v-if一样，但是v-show仅仅改变display的属性而已，不会重新渲染dom，如果要频繁更改显示隐藏的状态则使用v-show否则使用v-if；
  		vm.$el:实例自身属性
    		vm.$catch('message',function(newval,oldval){}):数据变化时触发
    		Directive中运行表达式：  <div v-bind:id="'list-' + id"></div>

### 修饰器

修饰器的使用,改变原来的数据，而不是返回新数据

- 事件修饰器：

```js

// 阻止点击事件的冒泡行为 
<a v-on:click.stop="doThis"></a>
// 阻止默认的表单提交 
<form v-on:submit.prevent="onSubmit"></form>
/// 事件修饰器可以连用 
<a v-on:click.stop.prevent="doThat">
//只需要修饰器，而无需处理方法 
<form v-on:submit.prevent></form>
//使用 capture 模式
<div v-on:click.capture="doThis">...</div>
 //仅当event.target是自身的时候才执行 
// 比如，这样写了之后点击子元素就不会执行后续逻辑 
<div v-on:click.self="doThat">...</div>
```




```js
// 当input一输入值，视图就有了变化。有时候你不想这么高度同步，而是等输入完了，视图再变化，可以这样写：
    <input v-model.lazy="msg">

// 如果你想让输入的数据自动转化为数字的话，可以这样写：
  <input v-model.number="age">
 
// 自动去除字符串首尾空格
   <input v-model.trim="msg">
	
```

### 组件

> ps：组件注册要写在前面，vue实例化要写在后面，否则会报错

#### 1.创建组件：

```vue

<div id="app"><my-component></my-component></div>
//创建组件第一种：
	Vue.component("my-component",{
		template:"<div>this is a component</div>"
	})
	var vm=new Vue({
		el:"#app"
	})
//第二种：
	var child={
		template:"<div>this is another component</div>"
	}
    var vm=new Vue({
        el:"#app",
        components:{
            'my-component':child  //child只有在vm作用域下才有效
        }
    })
```

#### 2.组件中的data属性

> 组件中的data属性后面一定要跟一个回调函数，将属性return回来；

```vue

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
```

#### 3.组件里的el属性

> 组件里的el属性也要用闭包+return的写法。它定义组件的有效作用域。

```js
Vue.component("my-component",{
	el:function(){
		return '#app'
	},
	template:'<div>111</div>',
	data:function(){
		return data
	}
})
```

#### 4.组件的嵌套使用：

> 参数往下传，事件往上传

##### 1.使用props属性传参

> 


​	
​	
​	

##### 2.动态传参：

```
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
```

##### 3.传入参数限定：

 ```vue
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
 ```

### 异步组件


​	

> 一个组件在dom里面，要么有，要么没有，对于某些大型app，会同时有很多组件，可能你需要根据某些条件来决定如何加载这些组件，而不是一次性全部加载；

我们在定义组件的时候，可以有两个回调函数作为参数：

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
//一个是resolve,一个是reject,它们的意思是，当满足某个条件时，我可以选择渲染这个组件，也可以选择拒绝渲染；
```



### 	静态组件



> 对于完全不需要数据绑定的组件，你可以在模板内部使用v-once，这样可以生成缓存，节约不少性能；

    Vue.component('terms-of-service', {
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>\
      '
    })


### Async/Await

> 应该是目前最简单的异步方案了，首先来看个例子。

> 这个例子是一个小应用，根据电影文件名，自动下载对应的海报。



```js
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
```

​	
​	
​	

### 实例生命周期

> 每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，给予用户机会在一些特定的场景下添加他们自己的代码。

		created 钩子可以用来在一个实例被创建之后执行代码：

​	

### 过渡效果

> Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
> 包括以下工具：

    在 CSS 过渡和动画中自动应用 class
    可以配合使用第三方 CSS 动画库，如 Animate.css
    在过渡钩子函数中使用 JavaScript 直接操作 DOM
    可以配合使用第三方 JavaScript 动画库，如 Velocity.js

> 单元素/组件的过渡

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡

    条件渲染 （使用 v-if）
    条件展示 （使用 v-show）
    动态组件
    组件根节点

这里是一个典型的例子：



```vue
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
```







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


​	
​	
//同时使用 Transitions 和 Animations

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 transitionend 或 animationend ，这取决于给元素应用的 CSS 规则。如果你使用其中任何一种，Vue 能自动识别类型并设置监听。

但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 animation 很快的被触发并完成了，而 transition 效果还没结束。在这种情况中，你就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。
JavaScript 钩子

可以在属性中声明 JavaScript 钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"

><!-- ... -->
></transition>
```



	这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。

当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。 否则，它们会被同步调用，过渡会立即完成。

推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
	
//多个if的单元素的过渡	

```html
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
computed: {
  buttonMessage: function () {
    switch (docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```



### 自定义指令

1、创建和使用

```html
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
```



### 自定义过滤器

Vue1. 支持内置的过滤器，但是Vue2. 就不再内置过滤器，但是支持自定义过滤器。

1、过滤器的创建和使用

```js
//1.创建
   Vue.filter(
    'myFilter',
    function(myInput){
       //myInput是在调用过滤器时，管道前表达式执行的结果
       //针对myInput，按照业务需求做处理
       //返回
       return '处理后的结果'
    })

//2.使用
    <any>{{expression | myFilter}}</any>

//2、如何在调用过滤器时，完成参数的发送和接受

////1.发送
<any>{{expression | myFilter(参数1，参数2)}}</any>

//2.接受
Vue.filter('myFilter',function(myInput，参数1，参数2){
    return '处理后的结果'
})
```

### 响应式原理

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
具体步骤：

- 第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
  这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
- 第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
- 第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
  1、在自身实例化时往属性订阅器(dep)里面添加自己
  2、自身必须有一个update()方法
  3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
- 第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

### 组件通信

#### 父组件通过调用ref调用子组件的方法传递参数 父--->子

    // parent
    <template>
        <div>
            <child ref="msg"></child>
        </div>
    </template>
    
    <script>
        export default {
        mounted(){
            this.$refs.msg.getMessage('给子组件数据')
        }
        }
    </script>
    
    // child
    <template>
        <div>
        </div>
    </template>
    <script>
        export default {
            data() {
                return {
                    message: ''
                }
            },
        methods: {
            getMessage(m) {
                this.message = m
            }
        },   
        }


##### .props 父---->子

##### .$emit()子--->父

#### $attrs

    子组件获取父组件中有但是并没有在子组件props中定义的属性

#### $listeners 

    子组件通过this.$listeners 获取父组件的方法

#### 通过属性把父组件的方法传递给子组件

	// parent
	<template>
	    <div class="parent">
	        <child :fatherMethod='fatherMethod'></child>// 父组件把方法传入子组件中，在子组件里直接调用这个方法
	    </div>
	</template>
	
	<script>
	    import child from '../base/child'
	    
	    export default {
	        methods:{
	            fatherMethod() {
	                alert('我是父组件的know方法');
	            }
	        },
	        components:{
	            child
	        }
	    }
	</script>
	
	// child
	<template>
	<div class="child" @click='childClick'>
	</div>
	</template`>
	
	<script>
	
	    export default {
	        props:{
	            fatherMethod: {
	                type: Function,
	                default: null
	            }
	        },
	        methods:{
	            childClick(){
	                this.fatherMethod()
	            }
	        }
	    }
	</script>

##### 通过 $parent直接 获取父组件数据和调用父组件方法（子->父）

#### provide 和 inject 组件跨级拿到数据

    //祖先组件
    provide(){
        return {
            value:this.value,
            zuxian:this
        }
    },
    data(){
      return {value:"aaa"}  
    }
    // 后代组件
    inject:['value','zuxian'],
    mounted(){
        console.log(this.value) // aaa
    }

##### < solt >插槽，承载分发内容的出口

##### .native获取子组件的原生事件

    var Vcontent={ 
        template:'<div><Vbtn @click.native='add'>删除</Vbtn></div>' ,
        methods:{
            add(){
                alert(1);
            }
        }
    }

##### 兄弟组件通信

    1.var bus = new Vue();
    2.接收方
    bus.$on('eventName',function(msg){})
    3.发送方
    bus.$emit('eventName',123);







## vue小技巧

### 第一招：化繁为简的Watchers

> 场景还原：

```vue
created(){
	this.fetchPostList()
},
watch: {
	searchInputValue(){
		this.fetchPostList()
	}
}
```

> 组件创建的时候我们获取一次列表，同时监听input框，每当发生变化的时候重新获取一次筛选后的列表这个场景很常见，有没有办法优化一下呢？

> 招式解析：
> 首先，在watchers中，可以直接使用函数的字面量名称；其次，声明immediate:true表示创建组件时立马执行一次。

```js
watch: {
    searchInputValue:{
        handler: 'fetchPostList',
        immediate:true
    }
}
```



### 第二招：一劳永逸的组件注册(批量全局)

> 场景还原：

```js
//我们写了一堆基础UI组件，然后每次我们需要使用这些组件的时候，都得先import，然后声明components，很繁琐！秉持能偷懒就偷懒的原则，我们要想办法优化！
import BaseButton from './baseButton'
import BaseIcon from './baseIcon'
import BaseInput from './baseInput'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}

<BaseInput
  v-model="searchText"
  @keydown.enter="search"
/>
<BaseButton @click="search">
  <BaseIcon name="search"/>
</BaseButton>
```

> 招式解析：
> 我们需要借助一下神器webpack，使用 require.context() 方法来创建自己的（模块）上下文，从而实现自动动态require组件。这个方法需要3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。

```js
//我们在components文件夹添加一个叫global.js的文件，在这个文件里借助webpack动态将需要的基础组件统统打包进来。

import Vue from 'vue'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
//找到components文件夹下以.vue命名的文件
const requireComponent = require.context('.', false, /\.vue$/)
// 引入xx开头xx结束的文件时这么写：
const requireComponent = require.context("../components", true, /c-\w+\.(vue)$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

//最后我们在main.js中import 'components/global.js'，然后我们就可以随时随地使用这些基础组件，无需手动引入了。


```



### 第三招：釜底抽薪的router key

> 场景还原：
> 下面这个场景真的是伤透了很多程序员的心...先默认大家用的是Vue-router来实现路由的控制。
> 假设我们在写一个博客网站，需求是从/post-page/a，跳转到/post-page/b。然后我们惊人的发现，页面跳转后数据竟然没更新？！原因是vue-router"智能地"发现这是同一个组件，然后它就决定要复用这个组件，所以你在created函数里写的方法压根就没执行。通常的解决方案是监听$route的变化来初始化数据，如下：

```js
data() {
  return {
    loading: false,
    error: null,
    post: null
  }
}, 
watch: {
  '$route': {
    handler: 'resetData',
    immediate: true
  }
},
methods: {
  resetData() {
    this.loading = false
    this.error = null
    this.post = null
    this.getPost(this.$route.params.id)
  },
  getPost(id){

  }
}
```



> bug是解决了，可每次这么写也太不优雅了吧？秉持着能偷懒则偷懒的原则，我们希望代码这样写：

```js
data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
created () {
  this.getPost(this.$route.params.id)
},
methods () {
  getPost(postId) {
    // ...
  }
}
```



> 招式解析:

> 那要怎么样才能实现这样的效果呢，答案是给router-view添加一个unique的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件。（虽然损失了一丢丢性能，但避免了无限的bug）。同时，注意我将key直接设置为路由的完整路径，一举两得。

```vue
<router-view :key="$route.fullpath"></router-view>
```



### 第四招: 无所不能的render函数

场景还原:

> vue要求每一个组件都只能有一个根元素，当你有多个根元素时，vue就会给你报错

```vue
<template>
  <li
    v-for="route in routes"
    :key="route.name"
  >
    <router-link :to="route">
      {{ route.title }}
    </router-link>
  </li>
</template>
	// ERROR - Component template should contain exactly one root element. 
    // If you are using v-if on multiple elements, use v-else-if 
   //  to chain them instead.
```



> 招式解析:
> 那有没有办法化解呢，答案是有的，只不过这时候我们需要使用render()函数来创建HTML，而不是template。其实用js来生成html的好处就是极度的灵活功能强大，而且你不需要去学习使用vue的那些功能有限的指令API，比如v-for, v-if。（reactjs就完全丢弃了template）

```vue
functional: true,
render(h, { props }) {
  return props.routes.map(route =>
    <li key={route.name}>
      <router-link to={route}>
        {route.title}
      </router-link>
    </li>
  )
}
```



### 第五招：无招胜有招的高阶组件



> 当我们写组件的时候，通常我们都需要从父组件传递一系列的props到子组件，同时父组件监听子组件emit过来的一系列事件。举例子：

```vue
//父组件
<BaseInput 
    :value="value"
    label="密码" 
    placeholder="请填写密码"
    @input="handleInput"
    @focus="handleFocus>
</BaseInput>

//子组件

<template>
  <label>
    {{ label }}
    <input
      :value="value"
      :placeholder="placeholder"
      @focus=$emit('focus', $event)"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>
```



> 有下面几个优化点：

- 1.每一个从父组件传到子组件的props,我们都得在子组件的Props中显式的声明才能使用。这样一来，我们的子组件每次都需要申明一大堆props, 而类似placeholer这种dom原生的property我们其实完全可以直接从父传到子，无需声明。方法如下：

```vue
<input
  :value="value"
  v-bind="$attrs"
  @input="$emit('input', $event.target.value)"
>
```

> $attrs包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。

- 2.注意到子组件的@focus=$emit('focus', $event)"其实什么都没做，只是把event传回给父组件而已，那其实和上面类似，我完全没必要显式地申明：

```vue
<input
    :value="value"
    v-bind="$attrs"
    v-on="listeners"

>

computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: event => 
        this.$emit('input', event.target.value)
    }
  }
}
```



> $listeners包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

- 3.需要注意的是，由于我们input并不是BaseInput这个组件的根节点，而默认情况下父作用域的不被认作 props 的特性绑定将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。所以我们需要设置inheritAttrs:false，这些默认行为将会被去掉, 以上两点的优化才能成功。

### 第六招 动态组件

​    <component :is="viewWhich">
​	</component> 是vue的一个内置组件,通过绑定is来确定渲染哪个组件, 每次切换viewWhich会重新生成一个vue组件，所以可以用<keep-alive>把组件包裹起来

```vue
<button @click="changeComponent">CHANGE

var app = new Vue({
    el:"#app",
    components:{
        aCom:{
            template:`<p>A</p>`
        },
        bCom:{
            template:`<p>b</p>`
        }
    },
    data(){
        return :{
           viewWhich:'aCom' 
        }
    },
    methods:{
        changeComponent(){
            ...
        }
    }
})
```

### 第七招：computed传参

> 利用闭包返回匿名函数给computed传参

```vue
	computed：{
			name(){
				return (arg)=>{
					return 'name:'+arg;
				}
			}		
		}
	:value="name('张三')"
```

### 第八招：组件递归

> compontent

```html
<template>
	<div v-for=(item, index) in data :key="index">
        {{item.name}}
        <digui :data="item.children" v-if="item.children.length"></digui>
         <!-- digui为组件名，可以命名之后直接在组件中调用-->
    </div>
</template>
<script>
   export default {
    	name:"digui",
       props:["data"]
    }
</script>

```

> page 父组件中调用

```
<template>
	<div>
		<Digui :data="list"/>
	</div>
</template>

<script>
import Digui from '@/compontents/digui'
   export default {
   compontnets:{
   Digui
   },
   data(){
   return :{
   	list:[]
   }
   }
    }
</script>

```



### 第九招Object.freeze

> 在 Vue 的文档中介绍数据绑定和响应时，特意标注了对于经过 Object.freeze() 方法的对象无法进行更新响应

> vue会对data中的属性进行代理，但是当发现这个data属性经过freeze处理之后将不会代理getter，setter方法。由此可以对一些静态组件进行冻结处理，从而提高性能

```js
const ojb={a:111}
Object.freeze(ojb);

export default {
    data(){
    	obj:obj
	}    
}

```





























