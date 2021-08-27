########小程序学习笔记########

1. wxml：
	// 列表：
	wx:for="{{arr}}" // 遍历
	wx:for-item="itemName"// 定义变量
	wx:key="index" //设置unique的key值 当遍历的是组件时
	// 条件渲染
	wx:if="{{a>0}}" wx:elif="{{a<0}}" wx:else ="{{a==0}}"
	// template
	<template name="a"></template>
	// template调用
	<template  is="a"></template>
	//外部引用
	<import src="../a.wxml"/>
	<include src="../b.wxml"/>
	
2.wxss
	// 引用
	@import url("./a.wxss")
	// 单位
	rpx //响应式单位，页面元素大小可根据屏幕大小变化
	// 选择器
	类选择器，id选择器，元素选择器，::before, ::after
3.js
	// 小程序为一个单例实例，在app.js中要声明App()实例
	App({
		data：{
		}，
		onlauch(){
			
		},
		globalData:{ // 全局变量，在其他页面可以通过getApp().globalData 来获取这个值
		}
	})
	// 模块化
	// 导出的模块A
	module.export={
		
	}
	// 在B模块中引入
	var A = require('./moduleA.js')
	
4.生命周期，事件
	// 程序
	App({
	  onLaunch: function(options) {},
	  onShow: function(options) {},
	  onHide: function() {},
	  onError: function(msg) {},
	  globalData: 'I am global data'
	})
	// 页面
	Page({
	  data: { text: "This is page data." },
	  onLoad: function(options) { },
	  onReady: function() { },
	  onShow: function() { },
	  onHide: function() { },
	  onUnload: function() { },
	  onPullDownRefresh: function() { },
	  onReachBottom: function() { },
	  onShareAppMessage: function () { },
	  onPageScroll: function() { }
	})
	
5.发送请求
	wx.request({ // 参数与ajax请求类似
		url:"./",
		method:"POST",
		data:{},		
		success: function(res){
			console.log(res)// 服务器回包信息	
		},
		fail:function(res){
			wx.showToast({ title: '系统错误' })
		},
		complete:function(res){
			
		}
	})
6.路由
	wx.navigateTo({url:"./"})//向其他页面跳转，除了Tabbar页
	wx.navigateBack() // 路由返回
	wx.redirectTo() // 因为页面栈只支持10层页面跳转，所以超出10层时可以用wx.redirectTo来跳转
	wx.switchTab({ url: 'pageF' }) // 仅支持打开Tabbar页面直接的跳转
7.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	