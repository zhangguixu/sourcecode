#种子模块

-命名空间[namespace]

	IIFE(立即调用函数表达式)是现代JavaScript框架最主要的基础设施，防止变量污染。
	但是，因为必须在Windows里设置一个立足点，这个就是命名空间，基本上可以把命名
	空间等同于框架的名字

	-多库共存原理

	-短命名空间（ex：$）和长命名（ex：jQuery）

-对象扩展

	需要一种机制，将新功能添加到命名空间上，这方法通常称为extend或mixin

-数组化

	浏览器下存在很多的类数组对象，如function内的arguments，通过document.forms,
	form.elements、document.links、document.getElementsByName、document.getElementsByTagName
	childNodes、select.options等方式获取的节点集合（HTMLCollection、NodeList）

		var arrayLike={
			0:'a',
			1:'b',
			2:'c',
			length:3
		}

	类数组对象是一个很好的存储结构，不过功能太弱了，为了享受纯数组的那些便捷方法，
	在处理它们之前都会做一下转换（也是基于性能方面的考虑）

-类型的判定

	JavaScript存在两套类型系统，一套是基本数据类型，另一套是对象类型系统

		1）基础数据类型包括6种（number,string,boolean,null,undefined,object），通过typeof来检测
		2）对象类型系统以基础数据类型为基础，通过instanceof来检测

	但是JavaScript自带的两套识别机制非常“不靠谱”

		之所以会这么说，总结一下
			1）自带的坑 typeof null //object
			2）document和window的怪异实现，如typeof documents.childNodes //functions,
			3）跨文档，instanceof失效，在best practice/compare中有详细提到
			4）IE下的种种，在IE下，typeof还会返回unknown的情况
				typeof window.ActiveXObject

	判定类型中出现了isXXX系列，但是有个问题就是isXXX系列会不断膨胀，而且似乎很难满足用户
	的全部需求。因此，jQuery框架就实现了最常用的isFunction，isArray，isPlainObject则是用
	来判定是否为纯净的JavaScript对象，制造它的最初目的是用于深拷贝，避开像window那样自己
	引用自己的对象，isEmptyObject是用于数据缓存系统，当此对象为空时，就可以删除它

-domReady

	window的load事件会在页面中的一切都加载完毕时触发

	DOMContentLoaded事件在形成完整的DOM树之后就会触发，不理会图像、JavaScript文件、CSS文
	件或其他资源是否已经下载完毕。与load事件不同，DOMContentLoaded支持在页面下载的早期添
	加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。

	domReady其实是一种名为“DOMContentLoaded”事件的别称。在一些书中会教导我们把JavaScript
	逻辑写在window.onload回调中，以防DOM树还没有建完就开始对节点进行操作，导致出错。

	但是对于框架来说，越早介入对DOM的干涉就越好，如要进行什么特征侦测之类的。此外，domReady
	还可以满足用户提前绑定事件的需求，因为有时页面图片等资源过多，window.onload就迟迟不能
	触发，这时若还没有绑定事件，用户点击哪个按钮都没有反应。

	具体的策略
	1）对于支持DOMContentLoaded事件的使用DOMContentLoaded事件
	2）旧版本IE使用Diego Perini发现的著名hack