# DOM编程

## DOM与JavaScript

通常DOM编程有三种情况

1. 访问和修改DOM元素
2. 修改DOM元素的样式
3. 通过DOM事件处理用户响应

*由于浏览器通常要求DOM实现和JS实现保持相互独立，因此JS进行DOM操作天生就慢*

下面围绕`性能`对DOM编程进行谈论

### innerHTML 和 document.createElement

在利用两者进行创建DOM元素时，innerHTML更快一些，但是差别不大，不过在需要创建大量DOM元素时，innerHTML更加的灵活

### 节点克隆

使用`element.cloneNode()`代替document.createElement()，稍微快一点，但不多。

### HTMLCollection

以下方法，返回HTMLCollection对象，类数组对象：

* document.getElementsByName()
* document.getElementsByClassName()
* document.getElementsByTagName()
* document.images
* document.links
* document.forms

需要注意的是HTMLCollection的性能问题，它实际上是一个`动态的对象`，每次都会重新执行查询操作。可以借助局部变量进行缓存来优化。

### 重绘和重排版

这个要从浏览器的解析页面的内部数据结构说起，有：

1. DOM树：表示页面结构

2. 渲染树：表示DOM节点如何显示（css）

#### 重排版

如果元素的几何属性改变，浏览器需要重新计算元素的几何属性，而且其他的元素的几何元素的几何属性和位置也会因此改变受到影响。浏览器会使渲染树上受到影响的部分失效，然后重构渲染树，这个过程就称为重排版。

重排版发生的情况：

1. 添加或删除可见的DOM元素
2. 元素位置改变
3. 元素尺寸改变
4. 内容改变
5. 最初的页面渲染
6. 浏览器窗口改变尺寸

大部分浏览器通过`队列化修改`和`批量显示`优化重排版过程。然而有些操作会强迫刷新并要求所有计划改变的部分立刻应用。如

    offsetTop offsetLeft offsetWidth offsetHeight

    getComputedStyle()/currentStyle

为了使上述的属性或方法返回最新的数据，浏览器不得不运行渲染队列中待改变的条目，并重新排版以返回正确的值。

#### 最小化重绘和重排版

1. 批次执行

    例如需要修改一个元素的多个样式，可以将多个样式合成一个类，再赋值给元素

2. 摘除文档流

    这样做可以避免不断触发浏览器重绘、重排版的过程。

    1. 从文档流中摘除该元素：隐藏元素，进行修改，然后再显示
    2. 对其应用多重修改
    3. 将元素带回文档中

3. 文档片段【推荐】

    DocumenFragment，文档片段，是一个轻量级的document对象，它被设计专用于更新、移动节点之类的任务。

    ```javascript
    var fragment = document.createDocumentFragment();
    ```

    推荐使用文档片段，是因为它涉及最小数量的DOM操作和重排版

### 缓存布局信息

前面提到由于读取特定的属性或使用特定的方法，会强制刷新浏览器的渲染队列。利用局部的变量来存储它们的值，就不会因为每次的读取而导致这种情况的发生。

```javascript
var current = el.offsetLeft;
current++;
el.style.left = current + 'px';
```

### 将元素提出动画流

1. 使用绝对坐标定位页面动画的元素，使它位于页面布局流之外。
2. 展开动作只在动画元素上进行，其他元素任何动画元素覆盖。
3. 当动画元素结束时，重新定位，从而只一次下移文档其他元素的位置。

### 事件托管

连接每个句柄都是有代价的，浏览器需要保存每个句柄的记录，占用了更多的内存。


