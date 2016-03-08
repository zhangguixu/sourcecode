#HTML5 程序设计

-概述、新功能

	-新的DOCTYPE和字符集

		<!DOCTYPE html>
		<meta charset='utf-8'>

	-新元素和旧元素

		·内嵌：audio,video,canvas,
		·流：
		·标题：hgroup
		·交互：音频和视频控件
		·元数据
		·短语：mark,kbd,sub,sup
		·片段：article,aside

	-语义化标签

		简化HTML页面的设计，将来有利于搜索引擎抓取和索引网页

		header,footer,section,article,aside,nav

	-使用Selectors API简化选取操作

		和CSS中的选择规则是一样的，在遍历DOM的时候，Selectors API的性能也提高了

		-document.querySelector():返回第一个找到的元素

		-document.querySelectorAll()

	-JavaScript日志和调试

		console.log API,不会阻塞脚本的执行

	-window.JSON

		-JSON.parse()：将字符串序列化成对象（原始的使用eval(json)）

		-JSON.stringify()：将对象转换成字符串

	-DOM Level 3

		-addEventListener(),removeEventListener()
			/dispatchEvent()(ie)

	-JavaScript引擎的变化

		Safari  - Nitro
		Chrome  - V8
		IE      - Chakra
		FireFox - JagerMonkey
		Opera   - Carakan

-canvas API（略，大致知道）

-SVG API(略，有过D3.js开发经验，接触过一段时间)

-audio 和 video

-Geolocation API

	通过一个简单有用的Web应用程序-距离跟踪器来了解Geolocation API(暂时不弄)

-Communication API[*]

	构建实时(real-time)跨源(cross-origin)通信的两个重要模块：
		·跨文档消息通信(Cross Document Messaging)
		·XMLHttpRequest level 2

	-postMessage API

		-跨文档消息通信:iframe,标签页，窗口间安全地进行跨源通信，

		-源安全
			源（规则（scheme）、主机（host）、端口（port））

		-framebusting技术【？？暂时理解不了】

	-XMLHttpRequest Level 2

		-跨源XMLHttpRequests

			以前，XMLHttpRequest仅限于同源通信，XMLHttpRequest Level 2通过CORS
			(Cross Origin Resource Sharing,跨源资源共享)实现了跨源XMLHttpRequests

			跨源HTTP请求包括一个Origin实现，它为服务器提供HTTP请求的跨源的源信息，
			头部由浏览器保护，不能被应用程序代码更改，从本质上讲，它与跨文档消息
			通信中的消息事件的origin属性作用相同。

			CORS规范要求，对于一些敏感行为，必须有浏览器发送给服务器，以确定这种
			行为能够被支持和允许，因此，CORS成功通信的背后或许需要具有CORS处理能力
			的服务器来支持。

		-进度事件(Progress events)

			[events]loadstart,progress,abort,error,load,loadend
			保留readystatechange事件

		-FormData
			可以通过JavaScript用一些键值对来模拟一系列表单控件，
			可以使用XMLHttpRequest的send()方法来异步提交这些
			表单，比起普通的ajax，使用FormData的最大优点就是
			我们可以异步上传一个二进制文件


-WebSockets API

	HTML5中最强大的通信功能，定义了一种全双工通信信道，仅通过web上的一个socket
	即可进行通信。【减少不必要的网络流量并降低网络延迟】

	-实时和HTTP

		正常情况下，浏览器访问web页面时，一般会向页面所在的web服务器发送一个
		HTTP请求，web服务器识别请求，然后返回响应，因此如果内容对实时性有要求
		，则需要用户不断刷新页面

		解决思路：大部分围绕轮询和其他服务器端推送技术展开，其中最著名就是Comet;
		Comet技术可以让服务器主动以异步方式向客户端推送数据。

		-轮询：浏览器定期发送HTTP请求

		-长轮询：浏览器向服务器发送一个完整的HTTP请求，但服务器会在一段时间内将其
					保持一个处于打开状态，如果服务器在此期间收到一个通知，就会向
					客户端发送一个包含消息的响应，如果时间到了服务器没有收到通知，
					则会发送一个响应消息来终止打开的请求。并无性能的实质改变

		-流解决：浏览器向服务器发送一个完整的HTTP请求，但是服务器会发送并保持一个处
					于打开状态的响应，该响应持续更新并无限期处于打开状态，每当有消息
					可发送时，该响应就会被更新，但服务器永远不会发出响应完成的信号，
					这样连接就会一直保持在打开状态以便后续消息的发送。

		-websocket 服务器

-Form API

	HTML5 Forms的核心设计理念：规范的核心是功能性动作和语义，而非外观和显示效果

	-新的输入型控件

		根据新的设计原则，在旧的浏览器中新的表单控件会平滑降级

		-新的控件
			tel,email,url,search,range,number
			(color,datetime,time,date,week,month)
			<progress></progress>

	-新的函数和特性

		placeholder、autocomplete、autofocus、spellcheck

		list & datalist、min & max & step & valueAsNumber

		required

	-表单验证

		HTML5的表单验证可让用户快速获得重要反馈，
		但是正确性方面绝对不应依赖于它

