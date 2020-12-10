跨域
onload;ajax请求完成之后
xhr.onload=function(){
	var st=xhr.status;
	if((st>200&&st<300)||st===304){
		var rep=xhr.responseText;
	}
}
gui渲染线程
js引擎线程
http请求线程

一，HTML5解决跨域方案之postMessage

postMessage()方法可以使不同源的脚本采用异步方式进行数据传递
两个参数

    data

    传递的数据，在传递参数的时候需要使用JSON.stringify()方法将对象参数序列化

    origin

    目标的源，协议，主机，端口号

将主页面和次级页面分别用node或者其他方法启动起来查看效果
详细说明在代码注释中
主页面
<body>   
  <input type="button" value="点击发送数据到postmessage_01.html" onclick="sendInfoToAnotherDomain();"/>    
  <iframe width="1200" src="http://localhost:8180"></iframe>   
  <script> 
    function sendInfoToAnotherDomain(){                     
        var personInfo= new Object;
        // 要发送的数据   
        personInfo.name='Yuelu';  
        personInfo.title='Hello';   
        personInfo.info="World";   
        var str=JSON.stringify(personInfo);   
               
        // 获取iframe       
        var iframe=window.frames[0];
        /**
         * [http description]
         * @type {[type]} 要发送的数据， 目标url
         */
        // 传递数据
        iframe.postMessage(str,'http://localhost:8180');   
    }  
  </script>
</body>

次级页面(iframe)

<body onload="receiveInfoFromAnotherDomain();">    
<p>postmessage_01</p>
</body>
<script> 
  function receiveInfoFromAnotherDomain(){   
      //监听窗口对象的message事件    
      window.addEventListener("message",function(ev){        
          //判断是否来自指定的url
          if(ev.origin !="http://localhost:8080"){   
              console.log("the event doesn't come from Domain1!");   
              return;   
          }   
          console.log(ev.data);   
          //将json字符串转为json对象
          var personInfoJSON = JSON.parse(ev.data);   
          var name = personInfoJSON.name;   
          var title = personInfoJSON.title;   
          var info = personInfoJSON.info;  
          //构造信息文本并显示
          var personInfoString="从域为： "+ev.origin+"那里传来的数据."+"<br>";   
          personInfoString+="姓名是: "+name+"<br>";   
          personInfoString+="标题为：  "+title+"<br>";   
          personInfoString+="信息为：  "+info+"<br>";   
          document.body.innerHTML=personInfoString;              
          }    

二、Axios
































