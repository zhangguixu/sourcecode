#JavaScript 高级程序设计

##JavaScript 简介

	>JavaScript 诞生于1995 年。当时，它的主要目的是处理以前由服务器端语
	言（如Perl）负责的一些输入验证操作。在JavaScript 问世之前，必须把表
	单数据发送到服务器端才能确定用户是否没有填写某个必填域，是否输入了
	无效的值。Netscape Navigator 希望通过JavaScript 来解决这个问题。自
	此以后，JavaScript 逐渐成为市面上常见浏览器必备的一项特色功能。如今
	，JavaScript 的用途早已不再局限于简单的数据验证，而是具备了与浏览器
	窗口及其内容等几乎所有方面交互的能力。

	###JavaScript 实现

		1.组成：
			1）核心（ECMAScript）
			2）文档对象模型（DOM）
			3）浏览器对象模型（BOM）

		2.ECMAScript

			>由ECMA-262 定义的ECMAScript 与Web 浏览器没有依赖关系。实际
			上，这门语言本身并不包含输入和输出定义。ECMA-262 定义的只是
			这门语言的基础，而在此基础之上可以构建更完善的脚本语言。
			我们常见的Web 浏览器只是ECMAScript 实现可能的宿主环境之一。
			宿主环境不仅提供基本的ECMAScript 实现，同时也会提供该语言的
			扩展，以便语言与环境之间对接交互。

			其他宿主环境包括Node（一种服务端JavaScript 平台）和Adobe Flash。

			ECMAScript提供：
			  语法
 				类型
 				语句
 				关键字
 				保留字
 				操作符
 				对象
		3.文档对象模型（DOM）

			文档对象模型（DOM，Document Object Model）是针对XML 但经过
			扩展用于HTML 的应用程序编程接口（API，Application Programming Interface）。
			DOM把整个页面映射为一个多层节点结构

			*DOM级别

				*DOM Level 1

					DOM Level 1）于1998 年10 月成为W3C 的推荐标准。DOM1 级由两个模块组成：DOM
					核心（DOM Core）和DOM HTML。其中：

						·DOM 核心规定的是如何映射基于XML 的文档结构，以便简化对文档中任意部分的访问和操作。
						·DOM HTML 模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法

				*DOM Level 2

					在原来DOM的基础上又扩充了

					 DOM 视图（DOM Views）：
						定义了跟踪不同文档（例如，应用CSS 之前和之后的文档）视图的接口
 					   DOM 事件（DOM Events）：
						定义了事件和事件处理的接口
 					   DOM 样式（DOM Style）：
						定义了基于CSS 为元素应用样式的接口
 					   DOM 遍历和范围（DOM Traversal and Range）：
						定义了遍历和操作文档树的接口

				*DOM Level 3

					DOM加载和保存(DOM Load and Save):
						引入以统一方式加载和保存文档的方法
					DOM验证（DOM Validation）：
						验证文档的方法

				*其他的DOM标准

					基于XML的其他DOM标准，并且都添加了与特定语言相关的新方法和新接口

					·SVG（可伸缩矢量图）
					·MathML（数学标记语言）
					·SMIL（同步多媒体集成语言）

		4.浏览器对象模型（BOM）

			BOM：支持访问和操作浏览器窗口的浏览器对象模型，
				 可以使用BOM来控制浏览器显示页面之外的部分

			问题：BOM作为JavaScript实现的一部分但却没有相关
				  标准，这个问题在HTML5中得到了解决，HTML5
				  致力于把很多BOM功能写入正是规范。

			BOM对象包括：

			 弹出新浏览器窗口的功能；
 			   移动、缩放和关闭浏览器窗口的功能；
  		   Navigator:浏览器详细信息
  		   location :浏览器所加载页面的详细信息
  		   screen   :用户显示器分辨率详细信息
  		   cookies 
  		   XMLHttpRequest 和IE 的ActiveXObject 

##JavaScript 在HTML中使用

	1.<script>元素

		使用<script>元素:是在HTML页面中插入JavaScript的主要办法

		<script>的6个属性：

			·async：表示应该立即下载脚本
			·defer：表示脚本可以延迟到文档完全被解析和显示之后再执行
			·src：表示包含要执行代码的外部文件，可以【跨域】
			·type：表示编写代码使用的脚本语言的内容类型（MIME类型）

			·language：废弃
			·charset：指定脚本的字符集

		*使用方式

			1）直接在页面嵌入JavaScript代码
			2）包含外部JavaScript文件

	2.<script>元素放置的位置

		放置在<body>元素中页面内容的后面，原因：

		1）减少先加载外部JavaScript文件所造成的延迟，尽快加载显示页面
		2）避免某些需要操作DOM的JavaScript代码在文档加载之前执行，发生错误

	3.使用外部文件的好处

		1）可维护性
		2）可缓存：浏览器能够根据具体的设置缓存链接的所有外部JavaScript文件，可以加快页面加载的速度

##JavaScript 基本概念
	
	1.语法

		1、区分大小写

		2、标识符：驼峰大小写格式

		3、注释
			// 单行注释
			/*
			 *多行
			 *注释
			 */

		4、严格模式
			ECMAScript5引入了严格模式（strict mode）,它是为了
			JavaScript定义了一种不同的解析与执行模型。在严格
			模式下，ECMAScript3中的一些不确定的行为将得到处理，
			而且对某些不安全的操作也会抛出错误

			"use strict"

			严格模式下，JavaScript的执行结果会有很大不同

		5、语句
			语句以一个分号结尾，如果省略分号，则有解析器确定语句的结尾

	2.关键字和保留字

		关键字（*号表示第5版新增）

		`
			break do instanceof typeof
			case else new var
			catch finally return void
			continue for switch while
			debugger* function this with
			default if throw
			delete in try
		`

		保留字

		`
			abstract enum int short
			boolean export interface static
			byte extends long super
			char final native synchronized
			class float package throws
			const goto private transient
			debugger implements protected volatile
			double import public
		`

	3.变量

		ECMAScript的变量是松散类型的
		（松散类型就是可以用来保存任何类型的数据）

		var 变量名

		注：如果省略var，变量则会变成全局变量，在严格模式下
			，给未经声明的变量赋值会导致ReferenceError错误

	4.数据类型

		5种基本类型：number,string,undefined,null,boolean

		1种复杂数据类型：Object

		不支持任何创建自定义类型的机制

		-typeof操作符

			检测给定变量的数据类型
				'undefined' --- 值未初始化 或 未定义
				'boolean'   --- 布尔值
				'number'    --- 数值
				'string'    --- 字符串
				'function'  --- 函数
				'object'    --- 对象 null 

	5.操作符

	6.语句

		*for in 语句
			是一种精确的迭代语句，可以用来枚举对象的属性
			for (property in expression) statement

		*with
			将代码的作用域设置到一个特定的对象中
			with (expression) statement

			`
				var qs=location.search.substring(1);
				var hostName=location.hostname;

				with(location){
					var qs=search.substring(1);
					var hostName=hostname;
				}
			`

			注：大量使用with语句会导致性能下降，同时会给调试代码造成困难，不建议使用

	7.函数

		*参数
			在函数体内通过arguments对象来访问参数数组，从而获取传递给函数的每一个参数
			【*】ECMAScript的所有参数传递的都是值，不可能通过引用传递参数

				*arguments
					特点：
						1）类数组，常常需要进行数组化
						2）值永远与对应命名参数的值保持同步

						`
							function test(num){
								arguments[0]=10;
								console.log(num); //10
								num=1;
								console.log(arguments[0]);//1
							}
						`

					在严格模式下，arguments对象无法被赋值，重写argumens的值会导致语法错误

			注：没有传递值的命名参数将自动被赋予undefined值

		*没有重载
			ECMAScript函数不能像传统意义上那样实现重载，因为函数没有签名，
			因为其参数是有包括0或者多个值的数组来表示

			如果在ECMAScript中定义了两个名字相同的函数，该名字只属于后定义的函数

			`
				function add(num){
					return num+100;
				}
				function add(){
					return arguments[0]+200;
				}
				var result=add(1); //201
			`

			注：可以通过检查传入函数中的参数的类型和数量并作不同的反应，可以模拟方法的重载

##变量、作用域和内存问题

	1.基本类型和引用类型的值

		1）基本类型：
			简单的数据段，按值访问，可以操作保存在变量中实际的值
		
		2）引用类型：
			它的值是保存在内存中的对象，JavaScript不允许直接访问内存中的位置，
			也就是说不能直接操作对象的内存空间，在操作对象时，实际上是在操作对象而不是实际的对象

		*动态的属性
			1）引用类型的值，我们可以为其任意添加修改删除其属性和方法

			`
				var person={};
				person.name='zhang';
				console.log(person.name);//zhang
			`

			2）基本类型，我们不能添加任何属性，尽管不会导致任何错误

			`
				var name='zhang';
				name.age=17;
				console.log(name.age); //undefined
			`

		*复制变量值
			1）基本类型：如果从一个变量向另一个变量复制基本类型的值，
			   会在变量对象上创建一个新值，然后把改值复制到为新变量分
			   配的位置上

			`
				var num1 = 5;
				var num2 = num1;
				num2=6;
				console.log(num1); //5,两个变量不会有任何的影响，完全是独立的
			`

			2）引用类型：当从一个变量向另一个变量复制引用类型的值时，
			   同样也会将存储在变量对象的值复制一份放到为新变量分配的
			   空间中，不同的是，这个值的副本实际上是一个指针，而这个
			   指针执行存储在堆中的一个对象。

			两个变量实际上引用同一个对象

			`
				var o1 = {};
				var o2 = o1;
				o1.name = 'zhang';
				console.log(o2.name); //zhang
			`

		*传递参数
			ECMAScript中所有的函数的参数都是按值传递的。

			1）基本类型：被传递的值会被复制给一个局部变量（即命名参数）

			`	
				function add(num){
					num += 10;
					return num;
				}
				var count = 20;
				var result = add(count);
				console.log(count); //20,没有变化
				console.log(result); //30
			`

			2）引用类型：把引用类型的值在内存中的地址复制给一个局部变
			   量，因此局部变量的变化会反映在函数的外部

			`
				function setName(obj){
					obj.name = 'zhang';
					obj = new Object();
					obj.name = 'whatever';
				}
				var person = {};
				setName(person);
				console.log(person.name); //zhang
			`
			***
				obj和person只是复制了值，共同指向同一个对象，但是他们
				是完全独立的变量，因此当obj指向了新的对象，person并没
				有改变
			***

		*检测类型

			1）typeof：
				检测number,string,boolean,undefined最佳工具

				对于null和Object，都返回'object'，用处不大

			2）instanceof
				目的是：知道某个值是什么类型的对象
				result = variable instanceof constructor
				如果变量是给定引用类型（根据原型链）的实例，那么
				instanceof操作符就会返回true

	2.执行环境及作用域

		· 执行环境（execution context）：
			定义了变量或函数有权访问的其他数据，决定了它们各自的行为。

		· 每个执行环境都有一个与之关联的变量对象（variable object）,
			环境中定义的所有变量和函数都保存在这个对象中。

		· 全局执行环境是最外围的一个执行环境，当某个执行环境中的所有代
			码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义
			也随之销毁。

		· 每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环
			境就会被推入一个环境栈中。而函数执行之后，栈将其环境弹出，
			把控制权返回给之前的执行环境。

		· 当代码在一个环境中执行时，会创建变量对象的一个作用域链
			（scope chain），作用域的用途，是保证对执行环境有权访问的
			所有变量和函数的有序访问。作用域的前端，始终都是当前执行的
			代码所在环境的变量对象。

		· 如果这个环境是函数，则将其活动对象（activation object）作为
			变量对象，活动对象在最开始时只包含一个变量，即arguments对象

		· 作用域链中的下一个变量对象来自包含（外部）环境，而在下一个变
			量对象则来自下一个包含环境，这样一直延续到全局执行环境，全
			局执行环境的变量对象始终都是作用域链中的最后一个对象

		· 标识符解析是沿着作用域链一级一级地搜索标识符的过程，搜索过程
			始终从作用域的前端开始，然后逐级地向后回溯吗，直至找到标识
			符为止。

			`
				var color = "blue";
				function changeColor(){
					var anotherColor = "red";
					function swapColors(){
						var tempColor = anotherColor;
						anotherColor = color;
						color = tempColor;
					}
					swapColors();
				}
				// 这里只能访问color
				changeColor();
			`

		*延长作用域链
			这么说因为有些语句可以在作用域链的前端临时增加一个变量对象
			，该变量对象会在代码执行后被移除
				1）try-catch语句的catch块
				2）with语句

		*没有块级作用域

		*查询标识符
			搜索过程从作用域链的前端开始，向上逐级查询与给定名字匹配的
			标识符。

			`
				var color = 'blue';
				function getColor(){
					return color;
				}
				console.log(getColor()); //blue
			`

	3.垃圾收集

		· JavaScript具有自动垃圾收集机制，也就是说，执行环境会负责管理
			执行过程中使用的内存。

		· 垃圾收集机制的原理：找到那些不再继续使用的变量，然后释放其占
			用的内存

		*垃圾收集机制策略

			1）标记清除（mark-and-sweep）
				JavaScript中最常用的垃圾收集方式当变量进入环境时，就将
				这个变量标记为“进入环境”，从逻辑上讲，永远不能释放进入
				环境的变量所占用的内存，因为只要执行流进入相应的环境，
				就可能会用到它们，而当变量离开环境时，则将其标记为“离
				开环境”。

				垃圾收集器在运行的时候会给存储在内存中的所有变量都加上
				标记，然后它会去掉环境中的变量以及被环境中的变量引用的
				变量的标记，在此之后，在被加上标记的变量将被视为准备删
				除的变量，原因是环境中的变量已经无法访问到这些变量了。
				最后，垃圾收集器完成内存清除工作，销毁那些带标记的值，
				并回收它们所占用的内存空间。

			2）引用计数（reference counting）
				不太常见的垃圾收集策略。原理是：跟踪记录每个值被引用的
				次数，当声明了一个变量并且一个引用类型赋值给变量时，则
				这个值的引用次数就是1。当这个值的引用次数变成0时，则说
				明没有办法再访问这个值了，因而就可以将其占用的内存空间
				回收回来。这样当垃圾收集器下次再运行时，它就会释放那些
				引用次数为0的值所占用的内存。
				
				这种策略有个严重的问题：循环引用

				`	
					function problem(){
						var objA = {},
							objB = {};
						objA.someOtherObject = objB;
						objB.someOtherObject = objA;
					}	
				`
				***
					objA和objB通过各自的属性相互引用，它们的引用次数都
					是2，如果才有引用计数的策略，由于objA，objB的引用
					次数永远不会 是0，那么它们在函数执行完毕后，还会继
					续存在。
				***

				在IE中，有一部分对象并不是原生的JavaScript对象，而是使
				用c++以COM对象的形式实现的，COM对象的垃圾收集机制采用
				的就是引用计数策略。也就是说，在IE中涉及COM对象，就会
				存在循环引用的问题。

		*性能问题

			垃圾收集器是周期性运行的，而且如果为变量分配内存数量很可观
			，那么回收工作量也是相当大的，在这种情况下，确定垃圾收集的
			时间间隔是一个非常重要的问题。
			（之前IE的垃圾收集器是根据内存分配量运行的，导致性能不佳）

		*管理内存

			虽然JavaScript具备垃圾收集机制，但是由于Web浏览器的可用内存
			数量通常要比分配给桌面应用程序的少，因此确保占用最少的内存
			可以让页面获得更好的性能。

			之所以限制内存的原因：
				处于安全方面的考虑，防止运行JavaScript的网页耗尽全部系
				统内存而导致系统崩溃。内存限制问题不仅会影响给变量分配
				内存，同时还会影响调用栈以及在一个线程中能够同时执行的
				语句数量。

			解除引用（dereferencing）：
				一旦数据不再有用，最好通过将其值设置为null来释放其引用
				，这样做并不意味着自动回收该值所占用的内存，而是让值脱
				离执行环境，以便垃圾收集器在下次运行时将其回收。
			








