#框架设计之种子模块

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