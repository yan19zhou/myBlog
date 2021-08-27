支付
1.小程序微信支付

	支付准备：
	    微信小程序账号--> 注册账号--> 认证---> 获取appid，生成secret-->开通支付--> 关联商户号
		微信商户平台账号 --> 认证--> 获取商户号(mch_id) --> 设置api秘钥(mch_key 32位)---> appid授权 --> 配置支付接口
		
		
	小程序登录： wx.login(获取code)-->request(向后端发送请求，通过传参code，获取后端唯一标识码openid) ；
				 ps:通过button的 open-type="getUserInfo" bindgetuserinfo="userInfoHandler" 可以获取用户的微信公开信息
	
	支付流程： 用户提交订单信息request--> 后端返回prepay_id及 其他信息 --> 用户使用返回信息调用requestPayment提交支付
			wx.requestPayment(
					{
					'timeStamp': '',
					'nonceStr': '',
					'package': '',// 即prepay_id
					'signType': 'MD5',
					'paySign': '',
					'success':function(res){},
					'fail':function(res){},
					'complete':function(res){}
					})

2.公众号支付：
	支付准备同小程序，ps:公众号账号和商户号账号认证要是一个公司才可以关联
	appid和serect在公众号的基本配置中
	开通支付功能：功能-->微信支付-->申请接入
	关联商户号：微信支付-->商户号管理-->关联更多商户号
	设置商户api密钥mch_key ：账户中心-->api安全-->api密钥
	配置支付接口：产品中心-->开发配置-->支付配置
	
	支付流程：
		1.用户在客户端完成下单，使用微信支付进行支付
		2.由商户后台向微信支付发起下单请求
		3.统一下单接口返回支付相关参数给商户后台，如支付跳转url，商户通过mweb_url调起微信支付中间页
		4.中间页进行H5权限的校验，安全性检查
		5.如支付成功，商户后台会接收到微信侧的异步通知
		6.用户在微信支付收银台完成支付或取消支付返回商户也没（默认为返回支付发起页面）
		7.商户在展示页面，引导用户主动发起支付结果查询
		8.商户后台判断是否接到微信侧的支付结果通知，如没有，后台调用我们的订单查询接口确认订单状态
		9.展示最终的订单支付结果给用户
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	