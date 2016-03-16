#JavaScript 高级程序设计

##JavaScript 简介

> JavaScript 诞生于1995 年。当时，它的主要目的是处理以前由服务器端语言（如Perl）负责的一些输入验证操作。在JavaScript 问世之前，必须把表单数据发送到服务器端才能确定用户是否没有填写某个必填域，是否输入了无效的值。Netscape Navigator 希望通过JavaScript 来解决这个问题。自此以后，JavaScript逐渐成为市面上常见浏览器必备的一项特色功能。如今，JavaScript的用途早已不再局限于简单的数据验证，而是具备了与浏览器窗口及其内容等几乎所有方面交互的能力。

###JavaScript 实现

组成：

    1. 核心（ECMAScript）
    2. 文档对象模型（DOM）
    3. 浏览器对象模型（BOM）

#### ECMAScript

>由ECMA-262 定义的ECMAScript与Web浏览器没有依赖关系。实际上，这门语言本身并不包含输入和输出定义。ECMA-262定义的只是这门语言的基础，而在此基础之上可以构建更完善的脚本语言。我们常见的Web浏览器只是ECMAScript实现可能的宿主环境之一。宿主环境不仅提供基本的ECMAScript实现，同时也会提供该语言的扩展，以便语言与环境之间对接交互。

*其他宿主环境包括Node（一种服务端JavaScript 平台）和Adobe Flash。*

    ECMAScript提供：
        语法
        类型
        语句
        关键字
        保留字
        操作符
        对象


#### 文档对象模型（DOM）

>文档对象模型（DOM，Document Object Model）是针对XML但经过扩展用于HTML的应用程序编程接口（API，Application Programming Interface）。DOM把整个页面映射为一个多层节点结构

**DOM级别**

DOM Level 1
***

>DOM Level 1 于1998年10月成为W3C的推荐标准。DOM1级由两个模块组成：DOM核心（DOM Core）和DOM HTML。

    1. DOM核心规定的是如何映射基于XML的文档结构，以便简化对文档中任意部分的访问和操作。

    2. DOM HTML 模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法

DOM Level 2
***

*在原来DOM的基础上又扩充了*

DOM 视图（DOM Views）

    定义了跟踪不同文档（例如，应用CSS之前和之后的文档）视图的接口

DOM 事件（DOM Events）

    定义了事件和事件处理的接口

DOM 样式（DOM Style）

    定义了基于CSS为元素应用样式的接口

DOM 遍历和范围（DOM Traversal and Range）：

    定义了遍历和操作文档树的接口

DOM Level 3
***

DOM加载和保存(DOM Load and Save)

    引入以统一方式加载和保存文档的方法

DOM验证（DOM Validation）

    验证文档的方法

**其他的DOM标准**

基于XML的其他DOM标准，并且都添加了与特定语言相关的新方法和新接口

* SVG（可伸缩矢量图）
* MathML（数学标记语言）
* SMIL（同步多媒体集成语言）

### 浏览器对象模型（BOM）

>支持访问和操作浏览器窗口的浏览器对象模型，可以使用BOM来控制浏览器显示页面之外的部分

**问题**

    BOM作为JavaScript实现的一部分但却没有相关标准，这个问题在HTML5中得到了解决
    ，HTML5致力于把很多BOM功能写入正是规范。

**BOM对象**

1. 弹出新浏览器窗口的功能；
2. 移动、缩放和关闭浏览器窗口的功能；
3. Navigator:浏览器详细信息
4. location :浏览器所加载页面的详细信息
5. screen   :用户显示器分辨率详细信息
6. cookies
7. XMLHttpRequest 和IE 的ActiveXObject