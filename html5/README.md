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