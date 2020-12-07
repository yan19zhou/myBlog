
特性：
	1. 双向
	2. 可以直接跨域

// 使用socket.io库
	//1.引入库
	const http = require('http')
	const io = require('socket.io')
	//2.创建一个http服务
	const httpSever = new createSever()
	httpSever.listen(3000)
	3.创建webSocket服务
	const wsSever = io.listen(httpSever)
	wsSever.on('connector',function(sock){
		// 发数据则用sock.emit('数据名'，...参数)，接收则用on
		sock.on('a',function(a){
		})
	})
	// 前端
	1.引入socket.io库
	<script src="<>"></script>
	2.创建sock对象
	 const sock = io.connect("ws://localhost:3000")
	 sock.emit('a',220)
	 
****vue中使用websocket:
	
	webSocketConnect() {
      if (typeof WebSocket === "undefined") {
        alert("Your browser don't support socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket("ws://127.0.0.1:90/echo");
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      console.log("socket connect success", "success");
      this.connectState = 1;
    },
    error() {
      this.connectState = 0;
      console.log("socket connect error", "error");
    },
    getMessage(msg) {
      // 获取socket接收到的数据
      var retmsg = msg.data;
      var jsonMsg;
      try {
        jsonMsg = JSON.parse(retmsg);
        if (jsonMsg.Type == "Notify") {
			
			// 根据返回数据进行逻辑处理
          this.processNotify(jsonMsg);
        }
        return;
      } catch (exception) {
        this.connectState = 0;
      }
    },
    send() {
      //socket发送参数到后台
      this.socket.send();
    },
    close() {
      // 关闭链接
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }