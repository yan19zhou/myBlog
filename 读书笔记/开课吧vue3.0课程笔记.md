day1:

vue3.0初始化：

思维：写一个东西之前，先看需要返回什么，倒推需要实现的功能 和传参

1.createApp----> render

createRender==>createApp（selector,options，template）{

// 根据options --render--template

proxy代理options实现data，methods和setup合并，setup优先级更高

createApp.render.call(this.proxy)//把render指向代理好的app实例

把render的dom插入到mount指向的宿主元素

}