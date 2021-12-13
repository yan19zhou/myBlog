本文的目标是以“输入 URL 后发生了什么”这个经典面试题为引子，写一篇既能够涵盖面试中大部分网络试题，又能够将“输入 URL 后发生什么”讲得有深度的文章。
以前写过一篇类似的文章，但实在过于简单。另外，HTTPS 逐渐普及，文章中没有这部分过程也说不过去。不想修改原来的文章，就重新写一篇吧。
文中以我所在的项目“兴趣部落”的官网 https://buluo.qq.com/index.html 为例子。

生成 HTTP 请求消息

解析完要访问的目标服务器是啥了，接下来浏览器就会用 HTTP 协议生成请求消息去 web服务器请求资源，消息格式如下：

请求信息主要包括：

    请求行：请求的方法（POST/GET/…）、URL、HTTP版本（1.1/2）；
    消息头：请求的附加信息，以空行结束；
    消息体：数据，比如 POST 请求时的表单数据。

对应的，响应消息也有 3 个部分组成：

    状态行：HTTP版本、状态码（200/304/404/…）、解释状态的响应短语；
    消息头
    消息体：返回的数据。

用图表示：
DNS

生成 HTTP 消息后，浏览器委托操作系统将消息发送给 web服务器。而通过 web服务器的名称是没法找到服务器在哪的，好比知道一个人的名字没法找到他家在哪一样，
网络中的地址是用 IP 地址表示的，所以要想跟服务器通信，得先找到它的 IP 地址，使用 DNS（Domain Name System，域名服务系统） 服务器可以将 web服务器名称转换成 IP 地址。
那这个过程是怎样的呢？

操作系统有一个 Socket 库，这个库中的程序主要是让应用程序调用操作系统的网络功能，而在这些功能中，浏览器需要调取操作系统的 DNS 解析功能。DNS 解析器生成一条表示“告诉我 https://buluo.qq.com/index.html 的 IP 地址”的消息，然后委托操作系统的协议栈发送 UDP 消息到 DNS 服务器。那这条消息是如何发送到 DNS 服务器又是如何将 IP 地址返回的呢？

首先介绍下操作系统中 DNS 解析器发送给 DNS 服务器的消息内容，消息中包含 1）域名：buluo.qq.com；2）Class: IN，代表当前的网络是因特网，DNS 设计之初还考虑了其他网络，虽然现在只有互联网，但这个字段还是保留了下来；3）记录类型：A，表示域名对应的是 IP 地址，因为 DNS 还能解析其他地址，比如类型为 MX 时 DNS 服务器会查询邮件服务器地址。DNS 服务器中维护一张表，表的每一项包含上面三个字段还有服务器地址，当域名、Class、记录类型全部匹配时，DNS 服务器返回地址，在例子中会返回兴趣部落首页的 IP 地址。

但这个时候问题来了，世界上有不计其数的服务器，将这些所有的服务器信息都保存在一个 DNS 的表中肯定是不现实的，所以肯定有很多台 DNS 服务器一起配合完成这个域名解析过程的，那具体过程是什么样的呢？

首先，DNS 服务器中的所有信息都是按照域名来划分层次的，这个层次是用 . 来分隔的，越靠右层次越高，比如 “buluo.qq.com” 中 “com” 层次最高，“qq” 次之，“buluo” 最后，其中每一层都被称为“域”，比如 “com 域”下是 “qq” 域，再下是 “buluo” 域，域的层次划分是为了更好地分配给不同国家、公司和组织等，典型的例子像南京市政府的官网：“www.nanjing.gov.cn”，“cn” 代表中国这个国家的域，“gov” 代表这个国家下的政府组织，“nanjing” 代表南京市政府。域有层次之分，那 DNS 服务器呢？规定将管理下级域的 DNS 服务器的 IP地址注册到上级的 DNS 服务器中，比如管理 “buluo.qq.com” 这个域的 DNS 服务器的 IP地址需要注册到 “qq.com” 域的 DNS 服务器中，以此类推，一直到“根域”，就是 “cn”、“com” 这类域的上一层次，根域中就保存了 “cn”、“com” 等域名的 DNS 服务器信息。此外，还需要将根域的 DNS 服务器信息保存在所有的 DNS 服务器中，这样只要找到一台 DNS 服务器就可以顺藤摸瓜找到下层任何一个 DNS 服务器。知道了域的层次划分以及 DNS 服务器的分布，下面就正式介绍如何寻找到相应的 DNS 服务器并获取 IP 地址。

首先，客户端会访问最近的一台 DNS 服务器，但由于这台 DNS 服务器上没有 “buluo.qq.com” 这个域名的对应的信息，所以就向根域 DNS 服务器发请求询问，但根域中也没有，但判定这个域名是属于 “com” 域的，所以就返回其管理的 “com” 域的 DNS 服务器的 IP地址，意思是“虽然我不知道，但你可以去某某处问问，他应该知道”。然后 最近的那个 DNS 服务器又向 “com” 域的 DNS 服务器发请求，同理，也不知道，然后返回 “qq.com” 域的 DNS 服务器，然后这台最近的 DNS 服务器又向 “qq.com” 域 DNS 服务器发请求，仍然没有，直到最后，向 “buluo.qq.com” 这个域下的 DNS 服务器发请求才拿到 IP 地址。接着，这台最近的 DNS 服务器将获得的 “buluo.qq.com” 的 IP 地址返回给客户端，客户端再拿着这个 IP 地址去请求资源。以上的过程用图表示如下：

以上就是通过 DNS 服务获取目标服务器 IP 地址的过程，可以说是非常耗时，为了优化性能，DNS 服务器会对中间的查询结果做个缓存，为了保存缓存的实时性，每隔一段时间就会将缓存设为过期。
委托协议栈发送消息

现在客户端拿到了目标服务器的 IP 地址，下面就要与其连接并发送消息了，这个过程同样不是浏览器做的，而是委托协议栈来完成的，具体过程是：

    操作系统创建一个套接字，协议栈返回一个描述符，浏览器存储起来，这个描述符是套接字的 ID，用于识别套接字，原因是同一个客户端可能跟很多服务器同时连接；
    客户端的套接字与服务端的套接字进行连接，连接成功后，协议栈将目标服务器的 IP 地址和端口号保存在套接字中，下面就可以收发数据；
    发送的数据是 HTTP 请求消息，发送的过程是：浏览器通过描述符查找到指定的套接字，并向套接字发送数据，数据便会通过网络传输到服务端的套接字，服务器接收到消息后处理然后返回响应消息；
    消息返回后会被放入一块内存缓冲区内，浏览器可以直接读取这段消息。之后，操作系统断开套接字连接，本地的套接字也会被删除。

TCP 连接

在“委托协议栈发送消息”部分简单地提了下客户端和服务端利用套接字进行连接，那这个连接具体是什么样的呢？

首先什么是套接字？套接字其实就是个放在内存的备忘录，协议栈在发送数据时先看一眼备忘录，了解这个数据是发到哪个端口，当数据发送出去后，这个备忘录还得记录什么时间收到响应、什么时候断开等控制信息，协议栈需要根据这些信息来决定下一步做什么。

客户端和服务端的连接是通过套接字连接的，那“连接”又是什么意思呢？连接实际上是客户端和服务端互相交换控制信息的过程，控制信息主要包含两种，一种是上面提到的套接字里要来帮助协议栈进行下一步操作的信息，另一种是客户端和服务端通信时交换的控制信息，这种控制信息就是我们俗称的 TCP 头部。 那连接的过程是怎样的呢？

这个连接过程就是我们平时经常听到的三次握手。

    首先客户端创建 TCP 头部，头部包含目标服务器的端口号等，同时将头部的 SYN 设为 1，表示开始请求连接。TCP 头部创建好了之后，TCP 模块便将信息传递给 IP 模块并委托它发送，然后信息经过网络到达服务器的 IP 模块再到 TCP 模块，TCP 模块则会根据 TCP 头部的信息找到端口号对应的套接字，套接字则会写入相应的信息，然后将状态改为“正在连接”；
    服务端的 TCP 模块收到连接请求后就要回应，与客户端一样， 需要在 TCP 头部设置发送方和接收方的端口号，以及将 SYN 设为 1，同时，返回响应时还要将 ACK 设为 1，表示已经接收到相应的包。接着，将信息打包好，发送给客户端；
    客户端收到消息后，发现 SYN 为 1，则表示连接成功，所以在套接字中写入服务器的端口号，同时将状态改为连接完毕。为了告诉服务器收到消息，客户端也要将 ACK 设为 1，接着发送给服务端。

整个过程用图表示如下：
HTTPS 的握手过程

上面的过程是最简单的 HTTP 三次握手，但现在越来越多的网站使用了 HTTPS 协议，那与 HTTP 连接有什么不同呢？

先介绍一下什么是 HTTPS。HTTPS 正如其名字，HTTP 代表其并不是自己创建一个新的协议，而是建立在 HTTP 的基础之上，S 代表其是安全的，如何保证安全？利用 SSL/TLS。SSL（Secure Sockets Layer，安全套接层）是网景设计的安全传输协议，经历了 1.0、2.0 和 3.0 版本，但因为 1.0 有严重安全缺陷，所以从未公布。后来 IETF 将 SSL 标准化，称为 TLS（Transport Layer Security， 传输层安全协议） ，TLS 1.0 与 SSL 3.0 差别很小。TLS 经历了 1.0、1.1 到现在最新的 1.2。在 HTTPS 通信中具体使用哪一种还要看客户端和服务端的支持程度。那 SSL/TLS 在网络模型中属于哪一层呢？直接上图：

在客户端和服务端通过 HTTPS 连接的过程中，除了正常的 HTTP 连接中的事情，还有身份验证和加密信息两件事，下面看看具体过程（更详细内容可以查看标准：RFC5246）。

		Client Hello：这次握手是客户端向服务端发起加密通信请求，请求中包含以下关键信息：
	    Version：客户端支持的协议版本，比如 TLS 1.2；
	    Random：第一个随机数，作用在后面的握手步骤中介绍；
	    Session ID：“空”表示这是一次新的连接，“不为空”表示维持前面的连接；
	    Cipher Suites：密码套件；
	    Compression：客户端支持的压缩方法；
	    Extensions：扩展。
	Server Hello：服务端收到客户端消息后返回响应，响应信息跟 ClientHello 类似，只不过每个字段都是一个确定的值，是服务端根据客户端传过来的候选值的最终选择结果，如果服务端没有在候选值中找到合适的，那么将会返回错误提示，需要提一下的是，这次的响应信息中包含第二个随机数。
	Server Certificate：服务端紧接着向客户端发送证书；
	Server Key Exchange Message：当上一条证书消息中的信息不全时，服务端会再次发送一些额外数据到客户端；
	Certificate Request：如果服务端要求客户端提供证书，会发出这样一个请求；
	Server Hello Done：这条消息表示服务端这阶段数据发送完毕，下面就是等待客户端的响应；
	Client Certificate：如果服务端要求客户端提供证书，那么客户端会返回自己的证书；
	
	Client Key Exchange Message：这一步非常关键，客户端会生成 premaster secret（预主密钥），为什么叫 premaster secret？因为后面客户端和服务端会根据 premaster secret 和前面过程中两个随机数共同生成一个 master secret（主密钥，48字节），后面通信的安全全靠这个 master secret。前两个随机数客户端和服务端都知道了，这个步骤最主要的就是协商一个 premaster secret，这个过程叫做“密钥交换”，这里介绍两个方法：
	    RSA 密钥交换：客户端生成 46 字节的随机数，使用服务器的公钥加密，然后发送出去，服务器便可以用私钥解密。但这种方式不太安全，所以现在逐渐使用 DH 密钥交换；
	    Diffie-Hellman 密钥交换：DH 的精髓就是正向计算简单，反向计算困难，好比两种颜色的颜料，混在一起你知道什么颜色，但就给你一种颜色，你几乎没法说出其是由哪两种颜色混合而来。具体生成 premaster secret 的方式可以看Diffie–Hellman key exchange，这里简单提一下，密钥交换需要 6 个参数，其中 2 个叫“域参数”，由服务器选取，交换过程中客户端和服务器各自生成 2 个参数，但是只相互发送 1 个，所以客户端和服务器各自知道 5 个参数，根据这 5 个参数，双方计算得到一个同样的 premaster secret。
	
	Certificate Verify：验证客户端的私钥和之前发送的客户端证书中的公钥是对应的；
	Finished：客户端的握手已经完成，消息内容加密，并且包含 verify_data 字段，值是整个握手过程中所有消息的摘要，供服务端验证消息完整性；
	Finished：表示服务端握手结束，同时也发送前面过程的消息的摘要。

用图表示一下就是：

整个握手过程总结一下就是：

    客户端提出 HTTPS 连接请求；
    服务器表明身份，表示自己是李逵而不是李鬼；
    客户端生成一个用于以后通信的密钥，并把密钥也告诉了服务器；
    客户端和服务器结束握手。

以上就是握手的整个通信细节，但细心的同学可能会发现少了一个重要步骤，客户端收到服务器发来的证书时是如何判定对方就是自己想要找的服务器呢？这时候就要验证证书的有效性，证书就像现实中的身份证，可以确认某个网站的确是我要访问的网站。那怎么验证证书的有效性呢？首先，数字证书和身份证一样由权威机构签发，不同的是身份证只能由政府签发，而数字证书由 CA（Certification Authorities，数字证书认证机构）签发，Mac 用户可以通过“文件-应用程序-实用工具-钥匙串访问”来查看根 CA，根 CA 可以签发其他 CA，所以一个网站的签发者不是根 CA 也没关系，只要这个 CA 的签发者是根 CA 也行。了解了 CA，下面看一下证书包含什么，先看图：

证书中包含：网站的基本信息、网站的公钥、CA 的名字等信息（详细请看 X.509），然后 CA 根据这几个内容生成摘要（digest），再对摘要用 CA 的私钥加密，加密后的结果即数字签名，最后将数字签名也放入到证书中。那么当系统收到一个证书后，先用公钥解密，解得开说明对方是由权威 CA 签发的，然后再根据证书的信息生成摘要，跟解密出来的摘要对比。
数据传输

建立连接之后，客户端和服务端便可以开始进行数据传输。同样，浏览器委托协议栈来帮忙收发消息，协议栈收到消息后不会立即发送出去，而是先放入到缓存区中，因为向协议栈发送的数据长度由浏览器控制，如果协议栈一收到数据就发送出去，那么可能会发送大量小包，导致网络效率降低，所以协议栈一般会等数据量积累到一定程度再发送出去，那这个程度具体是啥样？

首先，在以太网中，一个包的MTU（Maximum Transmission Unit，最大传输单元）是 1500 字节，除去 TCP、IP 头部的 40字节，MSS（Maximum Segment Size，最大分段大小）就是 1460 字节，但因为加密需要，头部可能会增加，相对的 MSS 就会减少。当缓存区内的数据接近 MSS 时再发送，可以避免发送小包。但是如果数据量本来就很小，或者应用程序发送数据的频率很小，那协议栈就不得不等很长时间，所以协议栈内部还有一个定时器，一定时间之后就会将包发送出去。如果数据较小，那就几个拼个车，放在一个包里发出去，如果数据很大，就要进行拆分。大概是下面这样：

本地一切就绪之后，协议栈就会将消息发送出去，这时还没完，客户端还要确保服务器收到了消息。我们一直都说 TCP 是面向连接的协议，因为它可以纠正丢包错误、连接失败提示等等，使得传输更加可靠。那具体又是怎么样的呢？

首先 TCP 模块在拆分数据时会先算好每一块数据相当于从头开始是第几个字节，然后将这个数字写入到 TCP 头部的“序号”字段中，通过这个字段，接收方就能知道包有没有丢失，比如一个消息长度为 4380（1460 * 3），那么这条消息就被拆分到三个数据块中，三个数据块的 TCP 头部的“序号”依次是 0、1460 和 2920，所以接收方先收到一个序号为 0 的包，再收到一个序号为 2920 的包，但是没收到序号为 1460 的包，说明这个包丢失了，现实中的序号为了安全不会从 0 开始，而是以一个随机数作为初始值。如果确认没有遗漏，那么接收方会将到目前为止收到的数据长度加起来，写入 TCP 的 “ACK 号”中发送给对方，注意 “ACK 号”与 ACK 标记位不是一回事，前者是数字，后者就是一个比特的标记位，但是 “ACK 号”只有在 ACK 标记位为 1 是才有效。
断开连接

当数据发送完毕后，一方（可能是客户端，可能是服务端）就会发起断开连接过程。这个过程也是大家很熟悉的，即四次挥手。下面以客户端发起断开请求为例：

    浏览器调用 Socket 库关闭连接程序，客户端的协议栈生成 TCP 头部，将 FIN 标记位设为 1，告诉服务器打算断开连接，后面不会再发送数据，同时套接字也记录断开连接操作；
    服务器收到 FIN 为 1 的 TCP 头部时，协议栈将套接字记录为进入断开操作状态，同时向客户端发送一个 ACK 号，告诉客户端已经收到消息；
    服务器收到断开连接信息时，可能还有数据没有传完，所以等待数据全部传输结束后，再发送一条 FIN 为 1 的信息，告诉对方也做了断开连接的准备，但没有断开；
    一段时间后，客户端返回确认信号，到此，连接结束。

以上就是输入 URL 后大概发生的一些事情，但是从面试角度看，仍然还有很多部分没有涉及。后续还会继续更新这篇文章，添加一些重要内容，这里先挖个坑：

    常见状态码解析；
    HTTP 缓存；
    滑动窗口；
    握手与挥手过程中的异常处理。

##### 4.当我们在浏览器中输入 www.baidu.com/** 访问百度的时候浏览器做了哪些事情

首先 Chrome 搜索自身的 DNS 缓存。(如果 DNS 缓存中找到百度的 IP 地址，就跳过了接下来查找 IP 地址步骤，直接访问该 IP 地址。)
搜索操作系统自身的 DNS 缓存。(浏览器没有找到缓存或者缓存已经失效)
读取硬盘中的 host 文件，里面记录着域名到 IP 地址的映射关系，Mac 电脑中位于 /etc/hosts。(如果前1.2步骤都没有找到)
浏览器向宽带运营商服务器或者域名服务器发起一个 DNS 解析请求，这里服务器有两种方式解析请求，这在稍后会讲到，之后浏览器获得了百度首页的 IP 地址。
拿到 IP 地址后，浏览器就向该 IP 所在的服务器建立 TCP 连接(即三次握手)。
连接建立起来之后，浏览器就可以向服务器发起 HTTP 请求了。(这里比如访问百度首页，就向服务器发起 HTTP 中的 GET 请求)
服务器接受到这个请求后，根据路径参数，经过后台一些处理之后，把处理后的结果返回给浏览器，如果是百度首页，就可以把完整的 HTML 页面代码返回给浏览器。
浏览器拿到了百度首页的完整 HTML 页面代码，内核和 JS 引擎就会解析和渲染这个页面，里面的 JS，CSS，图片等静态资源也通过一个个 HTTP 请求进行加载。
浏览器根据拿到的资源对页面进行渲染，最终把完整的页面呈现给用户。
如果浏览器没有后续的请求，那么就会跟服务器端发起 TCP 断开(即四次挥手)。

##### （1）状态码

HTTP 响应中包含一个状态码，用来表示服务器对客户端响应的结果。

状态码一般由3位构成：

1xx : 表示请求已经接受了，继续处理。
2xx : 表示请求已经处理掉了。
3xx : 重定向。
4xx : 一般表示客户端有错误，请求无法实现。
5xx : 一般为服务器端的错误。

##### 比如常见的状态码：

200 OK 客户端请求成功。
301 Moved Permanently 请求永久重定向。
302 Moved Temporarily 请求临时重定向。
304 Not Modified 文件未修改，可以直接使用缓存的文件。
400 Bad Request 由于客户端请求有语法错误，不能被服务器所理解。
401 Unauthorized 请求未经授权，无法访问。
403 Forbidden 服务器收到请求，但是拒绝提供服务。服务器通常会在响应正文中给出不提供服务的原因。
404 Not Found 请求的资源不存在，比如输入了错误的URL。
500 Internal Server Error 服务器发生不可预期的错误，导致无法完成客户端的请求。
503 Service Unavailable 服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常。