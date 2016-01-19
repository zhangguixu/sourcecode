前端学习代码（按日期来组织结构）

-20150905

	call 函数

-20150906

	js加载方式及加载性能优化

-20150908

	DOM编程

		-重绘和重排版

			-最小化重绘和重排版

-20150911

	事件托管：事件冒泡和父元素处理子元素

-20150913

	性能优化
		-循环（达夫设备），选择（优化选择条件），递归（栈不足），迭代，制表（缓存提速）

-20150915

	响应接口
	-使用定时器进行时间分片，来解决浏览器限制的问题
	-web work的应用，可以带来的好处和变化

#改变文件夹命名规则，原因是不好索引代码和知识点，会进行整理

-class

	-js模拟类机制代码示例，生成类，类继承,
	-函数调用的this取值,E5的bind的兼容性实现
	-利用立即执行函数和闭包来实现私有作用域

-event & listener

	-addEventListener/removeEventListener
		-type 事件
			-click,dbclick,mousemove,mouseover,mouseout,focus,blur,change,submit
		-listener callback
		-userCapture
			-false 默认进行事件冒泡(从内往外)
			-true  事件捕捉模式，从外到内传播
	-事件对象
		-button,ctrlKey,altKey,shiftKey,metaKey,isChar(bool)
		-charCode,keyCode,which
		-pageX,pageY,screenX,screenY,
		-currentTarget,target,originalTarget,relatedTarget

	-切换上下文(this)
		-$.proxy

	-委托事件【delegate.js】
	原理：事件的冒泡机制，直接给父元素绑定事件监听，用来检测其子元素内发生的事件
	$('ul').delegate('li','click',function(){})

	-自定义事件
	jQuery的trigger()

	-发布/订阅模式（原生的实现，基于jQuery的实现）

-model

	-思路：在js应用中做数据管理
		-不足：前端并没有请求/响应的模型，没办法访问服务器端的变量，甚至远程取回的数据只是临时的保存在客户端
		-优点：数据存储速度非常快，数据从内存中获取，交互操作可以得到瞬间响应，大大地提高用户的体验

	-命名空间：进行管理

	-ORM(构建对象关系映射)，数据管理和模型

	-持久化记录:GUID,自动化处理

	-装载数据：跨域的问题
		-直接嵌套数据
		-Ajax：
			-同源策略：同一个域名，子域名，地址的端口也一样
			-CORS：赋予了前端代码访问可信的远程服务的权限
				在HTTP协议的响应头里
				Access-Control-Allow-Origin:example.com
				Access-Control-Request-Metho:GET,POST

				认证：
				Access-Control-Request-Headers:Authorization

				var req=new XMLHttpRequest();
				req.open("POST","/endpoint",true);
				req.setRequestHeader("Authorization",oauth_signature);
		-JSONP:通过创建一个script标签，所辖的外部文件包含一段JSON数据，数据是由服务器所返回的，
				作为参数包装在一个函数调用中，script标签获取脚本文件并不受跨域的限制，
				所有浏览器都支持这种技术

	-本地存储数据
		-cookies:容量小（4KB），会发给服务器端
		-H5本地存储：容量大，不会发给服务器端
			-local storage
			-session storage

	-用POST的方式打开一个新的页面
		window.open()/window.location.href都只能是get方式提交参数

-form

	-validation
		-是否为空
		-手机号码
		-邮箱

-control

	-概念
		可以将控制器理解为应用中视图和模型之间的纽带，
		只有控制器知道视图和模型的存在，并将它们连接在一起，
		当加载页面的时候，控制器将事件处理程序绑定在视图里面，并适时地处理回调，以及和模型必要的对接。

	-模块化：控制器是模块化的且非常独立，
		理想状况下不应该定义任何全局变量，而应当定义完全解耦的功能组件
		模块模式是处理组件解耦的非常好的方法

	-控制器
		基于jQuery开发类Controller的类模板;

-best practice

	Nicholas.C.Zakas《编写可维护的JavaScript》读书笔记

-html5

	Peter Lubbers\Brian Albers\Frank Salim HTML5程序设计（2版）读书笔记
