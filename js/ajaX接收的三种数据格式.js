ajax方法的参数
常用的ajax参数比如url,data,type,包括预期返回类型dataType，发送到服务器的数据的编码类型contentType,成功方法，失败方法，完成方法。除了这些以外还有很多其他内置的参数
需要注意的是：
1.url:
要求为String类型的参数，（默认为当前页地址）发送请求的地址。
2.type:
要求为String类型的参数，请求方式（post或get）默认为get。注意其他http请求方法，例如put和delete也可以使用，但仅部分浏览器支持。
3.timeout:
要求为Number类型的参数，设置请求超时时间（毫秒）。此设置将覆盖$.ajaxSetup()方法的全局设置。
4.async:
要求为Boolean类型的参数，默认设置为true，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为false。注意，同步请求将锁住浏览器，用户其他操作必须等待请求完成才可以执行。
5.cache:
要求为Boolean类型的参数，默认为true（当dataType为script时，默认为false），设置为false将不会从浏览器缓存中加载请求信息。
6.data:
要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后。防止这种自动转换，可以查看　　processData选项。对象必须为key/value格式，例如{foo1:"bar1",foo2:"bar2"}转换为&foo1=bar1&foo2=bar2。如果是数组，JQuery将自动为不同值对应同一个名称。例如{foo:["bar1","bar2"]}转换为&foo=bar1&foo=bar2。
7.dataType:
要求为String类型的参数，预期服务器返回的数据类型。如果不指定，JQuery将自动根据http包mime信息返回responseXML或responseText，并作为回调函数参数传递。可用的类型如下：
xml：返回XML文档，可用JQuery处理。
html：返回纯文本HTML信息；包含的script标签会在插入DOM时执行。
script：返回纯文本JavaScript代码。不会自动缓存结果。除非设置了cache参数。注意在远程请求时（不在同一个域下），所有post请求都将转为get请求。
json：返回JSON数据。
jsonp：JSONP格式。使用SONP形式调用函数时，例如myurl?callback=?，JQuery将自动替换后一个“?”为正确的函数名，以执行回调函数。
text：返回纯文本字符串。
8.beforeSend：
要求为Function类型的参数，发送请求前可以修改XMLHttpRequest对象的函数，例如添加自定义HTTP头。在beforeSend中如果返回false可以取消本次ajax请求。XMLHttpRequest对象是惟一的参数。

        function(XMLHttpRequest){
           this;   //调用本次ajax请求时传递的options参数
        }
9.complete：
要求为Function类型的参数，请求完成后调用的回调函数（请求成功或失败时均调用）。参数：XMLHttpRequest对象和一个描述成功请求类型的字符串。

      function(XMLHttpRequest, textStatus){
         this;    //调用本次ajax请求时传递的options参数
      }
10.success：
要求为Function类型的参数，请求成功后调用的回调函数，有两个参数。

     (1)由服务器返回，并根据dataType参数进行处理后的数据。
     (2)描述状态的字符串。
     function(data, textStatus){
        //data可能是xmlDoc、jsonObj、html、text等等
        this;  //调用本次ajax请求时传递的options参数
     }
11.error:
要求为Function类型的参数，请求失败时被调用的函数。该函数有3个参数，即XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。ajax事件函数如下：

   function(XMLHttpRequest, textStatus, errorThrown){
      //通常情况下textStatus和errorThrown只有其中一个包含信息
      this;   //调用本次ajax请求时传递的options参数
   }
12.contentType：
要求为String类型的参数，当发送信息至服务器时，内容编码类型默认为"application/x-www-form-urlencoded"。该默认值适合大多数应用场合。
13.dataFilter：
要求为Function类型的参数，给Ajax返回的原始数据进行预处理的函数。提供data和type两个参数。data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数。函数返回的值将由jQuery进一步处理。

        function(data, type){
            //返回处理后的数据
            return data;
        }
14.dataFilter：
要求为Function类型的参数，给Ajax返回的原始数据进行预处理的函数。提供data和type两个参数。data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数。函数返回的值将由jQuery进一步处理。

        function(data, type){
            //返回处理后的数据
            return data;
        }
15.global：
要求为Boolean类型的参数，默认为true。表示是否触发全局ajax事件。设置为false将不会触发全局ajax事件，ajaxStart或ajaxStop可用于控制各种ajax事件。
16.ifModified：
要求为Boolean类型的参数，默认为false。仅在服务器数据改变时获取新数据。服务器数据改变判断的依据是Last-Modified头信息。默认值是false，即忽略头信息。
17.jsonp：
要求为String类型的参数，在一个jsonp请求中重写回调函数的名字。该值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，例如{jsonp:‘onJsonPLoad‘}会导致将"onJsonPLoad=?"传给服务器。
18.username：
要求为String类型的参数，用于响应HTTP访问认证请求的用户名。
19.password：
要求为String类型的参数，用于响应HTTP访问认证请求的密码。
20.processData：
要求为Boolean类型的参数，默认为true。默认情况下，发送的数据将被转换为对象（从技术角度来讲并非字符串）以配合默认内容类型"application/x-www-form-urlencoded"。如果要发送DOM树信息或者其他不希望转换的信息，请设置为false。
21.scriptCharset：
要求为String类型的参数，只有当请求时dataType为"jsonp"或者"script"，并且type是GET时才会用于强制修改字符集(charset)。通常在本地和远程的内容编码不同时使用。
案例代码：

$(function(){
    $(‘#send‘).click(function(){
        $.ajax({
            type: "GET",
            url: "test.json",
            data: {username:$("#username").val(), content:$("#content").val()},
            dataType: "json",
            success: function(data){
                $(‘#resText‘).empty();  //清空resText里面的所有内容
                var html = ‘‘;
                $.each(data, function(commentIndex, comment){
                      html += ‘<div class="comment"><h6>‘ + comment[‘username‘]
                                + ‘:</h6><p class="para"‘ + comment[‘content‘]
                                + ‘</p></div>‘;
                });
                $(‘#resText‘).html(html);
            }
        });
    });
});
22.顺便说一下$.each()函数:$.each()函数不同于JQuery对象的each()方法，它是一个全局函数，不操作JQuery对象，而是以一个数组或者对象作为第1个参数，以一个回调函数作为第2个参数。回调函数拥有两个参数：第1个为对象的成员或数组的索引，第2个为对应变量或内容。

需要注意的地方：

1. 如果不指定dataType的话，会根据返回的头部信息判断（就是Content-type）。

综论
ajax返回3种数据格式：html文本格式，xml通用格式，json格式，
数据类型：整数，字符串，数组，对象

ajax返回整数类型
/**
 * ajax_delete
 */
$(".delete").click(function(){
  var id = $(this).attr('id');
  var flag = confirm("确定要删除第"+id+"条信息吗？");
  if(flag){
    var tr = $(this).parent().parent();
    $.get("index.php?r=demo1/delete",{id:id},function(data){
      console.log(data);
      if(data==1){
        tr.remove();
        alert("删除成功");
      }else{
        alert("删除失败");
      }
    })
  }
})
这样，后台一个判断，执行则返回1就好了，可以说是最简单的ajax了。通常返回整形都是做判断用。是否删除啊，.....，虽然简单，但是很常用。

ajax返回Html/text（字符串类型）
与上面返回int相对应的呢...比如ajax添加，就会返回html或者text，也就是string类型的数据。

ajax返回json
因为json没有格式，相同内容占用空间少处理快，所以较xml，字符串(text/html)而言，我们更经常处理json。

$.ajax({
      type:"GET",
      url:"address_do.php",
      //dataType:"json",
      data:{postcode:postcode},

      success:function(data){
      console.log(data);
      location.href="address_do.php";
        if(data.success == 1){
          var str = "";
          str += "<p>"+data.result.lists[0].simcall+"</p>";
          str += "<p>"+data.result['asc']+"</p>";
          $("button").after("<span>"+str+"</span>");
        }
      }
})

$.get(url,data,function(msg){
  msg = eval("("+msg+")");
  if(!(/^[0-9][0-9]{5}$/.test(postcode))){
    str += "<p>您输入的邮政编码不正确</p>";
    $("button").after("<span>"+str+"</span>");
  }else{
    str += "<p>"+msg.result.lists[0].simcall+"</p>";
    str += "<p>"+msg.result['asc']+"</p>";
    $("button").after("<span>"+str+"</span>");
  }
},'json');alert(data);

success:function(data){
  console.log(data);
  var result = data['result'];
  var str = "";
  str += "<table border='1'><tr><td>手机号</td><td>归属地</td><td>区号</td><td>数据来源</td></tr><tr><td>"+result['phone']+"</td><td>"+result['att']+"</td><td>"+result['postno']+"</td><td></td></tr></table>";
  $("#click").after(str);
}

$.ajax({
    type: "GET",
    url: "Ajax/Test.ashx",
    data: "HandleType=GetList&PName=" + escape($("#localvalue").val()), //要发送的数据   
    dataType: "text",
    success: function (data) {
        if (data != null && data != "") {
            var dataObj = eval("(" + data + ")"); //转换为json对象 
            var html = "";
            for (var i = 0; i < dataObj.length; i++) {            
                html += "<tr style=\'cursor:pointer;\' onclick=\"InfoWindow(\'" + dataObj[i].Name + "\',\'" + dataObj[i].ID + "\',\'" + dataObj[i].Code + "\');\">";
                html += "<td>" + (parseInt(i) + parseInt(1)) + "</td><td>" + dataObj[i].Name + "</td>";
                html += "</tr>";             
            }
            $("#table").html(html);
        }
    }
})

html部分
 <table id="table"  style="line-height:25px; margin:2px; "></table>

eval的使用
PS：红色部分是容易出错的地方，也就是ajax返回数据的拼接,也是ajax的难点之一。
另外，需要注意的是，这段代码里设定返回数据类型是text，所以需要用eval把返回数据处理
参考http://blog.csdn.net/ztzy520/article/details/54410967
用eval()方法把返回来的json数据转换成数组
data=eval('('+data+')');

$("#search").click(function(){
      var obj = $(this);
      var searchContent = obj.prev().val();
      alert(searchContent);
      $.ajax({
        url:"index.php?r=news/search",
        type:"post",
        dataType:"json",
        data:{searchContent:searchContent},
        success:function(data){
          var str = "";
          str+='<table border="1" id="table">';
          str+='<tr>';
          str+='<td>ID</td>';
          str+='<td>新闻标题</td>';
          str+='<td>新闻内容</td>';
          str+='<td>分类</td>';
          str+='<td>图片</td>';
          str+='<td>操作</td>';
          str+='</tr>';
          if(data == 0){
            str+="<tr>没有搜索到相关数据</tr>";
          }else{
            for(var i=0;i<data.length;i++){

              str+='<tr>';
              str+='<td>'+data[i].news_id+'</td>';
              str+='<td>'+data[i].newsTitle+'</td>';
              str+='<td>'+data[i].newsContent+'</td>';
              str+='<td>'+data[i].cate_name+'</td>';
              str+='<td><img src="'+data[i].img_name+'" alt="" width="100px" height="60"></td>';
              str+='<td><a href="'+data[i].news_id+'">删除</a>/<a href="'+data[i].news_id+'">修改</a></td>';
              str+='</tr>';
            }
          }
          $("#table").html(str);

        }
      })
    })
