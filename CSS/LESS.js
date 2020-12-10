less:
	变量：
	example:
	@name："lusi"；
	@var："name";
	@color:#ccc
	div{
		content:@@var;
		color:@color + #111;
	}
mixins:

	class id集合的引用：	
	.class{
		border:solid 1px #ccc;
		color:#fff;
		background-color:red;
	}
	.class1{
		.class;
	}
	
	带参数混合：	
	.a(){}//无参混合；
	.a(@a;)//一个参数；
	.a(@a,...)//1到多参；
	.a(...)//不定参；
	.a(@a,@rest)//@rest为除@a以外的参数；
	.a(@a,@b,@c){
		border:@arguments;//@arguments代表所有参数；ps：如果参数中包含“;”符号，则默认按照;号划分参数，
	}
	
	!important关键字
	调用混合时使用!important关键字表示此混合所有属性都标记为!important;
	
	模式匹配与Guard表达式：通过参数来控制mixin的行为
	 example：利用@switch来控制color
	 .mixin(light,@color){
		 color:lighten(@color,10%);// 执行sass中的HSL函数lighten()
	 }
	 .mixin(dark,@color){ // 混合中非变量形式的参数只能与传入的值完全相同才能匹配成功
		 color:darken(@color,10%)
	 }
	 .mixin(@_,@color){//混合中的变量可接受任意参数
		 display:none;
	 }
	 @switch:light;
	 .class{
		 .mixin(@switch,#888);// 混合中都是变量也可以通过参数来匹配；
	 }
	Guards：
	Guards是被用来匹配表达式的，guard混合(类似使用类似@media)来执行判断条件，不使用if/else声明；
	 
	 Guards 支持的运算符包括：> >= = =< <。说明一下，true关键字是唯一被判断为真的值，也就是这两个混合是相等的：

.truth (@a) when (@a) { ... }
.truth (@a) when (@a = true) { ... }

其他不为 true 的值都判为假：

.class {
    .truth(40); // 不会匹配上面的 mixin
}

多个Guards可以通过逗号表示分隔，如果其中任意一个结果为 true，则匹配成功：

.mixin (@a) when (@a > 10), (@a < -10) { ... }

值得注意的是不同的参数之间也可以比较，而参与比较的也可以一个参数都没有：

@media: mobile;

.mixin (@a) when (@media = mobile) { ... }
.mixin (@a) when (@media = desktop) { ... }

.max (@a, @b) when (@a > @b) { width: @a }
.max (@a, @b) when (@a < @b) { width: @b }

如果需要根据值的类型匹配混合，可以使用 is* 函数：

.mixin (@a, @b: 0) when (isnumber(@b)) { ... }
.mixin (@a, @b: black) when (iscolor(@b)) { ... }

几个检查基本类型的函数：

    iscolor
    isnumber
    isstring
    iskeyword
    isurl

如果需要检查一个值（数字）使用了哪个单位，可以使用下面三个函数：

    ispixel
    ispercentage
    isem

最后，你可以使用关键词 and 在 guard 中加入额外的条件:

.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }

或者，使用关键词 not 否定条件：

.mixin (@b) when not (@b > 0) { ... }
	 
	嵌套规则

LESS 可以让我们以嵌套的方式编写层叠样式。 让我们先看下下面这段 CSS：

#header { color: black; }

#header .navigation {
font-size: 12px;
}

#header .logo {
width: 300px;
}

#header .logo:hover {
text-decoration: none;
}

在 LESS 中, 我们就可以这样写：

#header {
    color: black;

    .navigation {
        font-size: 12px;
    }

    .logo {
        width: 300px;
        &:hover { text-decoration: none }
    }
}

或者这样写：

#header { color: black;
    .navigation { font-size: 12px }
    .logo { width: 300px;
        &:hover { text-decoration: none }
    }
}

代码更简洁了，而且感觉跟 DOM 结构格式有点像。

注意 & 符号的使用 — 如果你想写串联选择器，而不是写后代选择器，就可以用到 & 了。这点对伪类尤其有用如 :hover 和 :focus。
& 的高级用法

用在选择器中的&还可以反转嵌套的顺序并且可以应用到多个类名上。

例如：

.child, .sibling {
    .parent & {
        color: black;
    }
    & + & {
        color: red;
    }
}

输出：

.parent .child,
.parent .sibling {
    color: black;
}
.child + .child,
.child + .sibling,
.sibling + .child,
.sibling + .sibling {
    color: red;
}

&也可以用在混合中用于指示嵌套这个混合的父选择器。
运算

任何数字、颜色或者变量都可以参与运算，运算应该被包裹在括号中。来看一组例子：

@base: 5%;
@filler: (@base * 2);
@other: (@base + @filler);

color: (#888 / 4);
background-color: (@base-color + #111);
height: (100% / 2 + @filler);
命名空间

有时候，你可能为了更好组织 CSS 或者单纯是为了更好的封装，将一些变量或者混合模块打包起来，你可以像下面这样在 #bundle 中定义一些属性集之后可以重复使用：

#bundle {
    .button () {
        display: block;
        border: 1px solid black;
        background-color: grey;
        &:hover { background-color: white }
    }
    .tab { ... }
    .citation { ... }
}

你只需要在 #header a 中像这样引入 .button：

#header a {
    color: orange;
    #bundle > .button;
}
 
	 
	 
	 
	 
	 
	 
	 