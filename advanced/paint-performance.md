# 页面性能优化

## 1. chrome的timeline

先思考这样的一个问题：

**什么叫页面性能好？如何进行评判？**

直观上讲，我们通常会通过一个页面流不流畅来判断一个页面的性能好不好。

本质上，流畅的程度可以用`fps`来进行量化。

### 1-1 fps

FPS(frame per second)，即一秒之间能够完成多少次重新渲染.

网页动画的每一帧（frame）都是一次重新渲染，每秒低于`24帧`的动画，人眼就能感受到停顿。一般的网页动画，`需要达到每秒30帧到60帧的频率，才能比较流畅`。

而大多数显示器的刷新频率是`60Hz`，为了与系统一致，以及节省电力，浏览器会自动按照这个频率，刷新动画。所以，如果网页能够做到每秒60帧，就会跟显示器同步刷新，达到最佳的视觉效果。这意味着，一秒之内进行60次重新渲染，每次重新渲染的时间不能超过`16.66ms`。

*在实际的开发，只要达到30fps就可以了*

### 1-2 timeline

强大的chrome给我们提供了一个工具，叫做timeline，在帧模式下，我们可以看到代码的执行情况

![animation-timeline.png](./img/animation-timeline.png)

1. 柱状'frame'：表示渲染过程中的一帧，也就是浏览器为了渲染单个内容块而必须要做的工作，包括：执行js，处理事件，修改DOM，更改样式和布局，绘制页面等。帧柱的高度表示了该帧的总耗时，帧柱中的颜色分别对应该帧中包含的不停类型的事件。我们的目标就是控制其在30fps，即1000ms / 30 = `33.34ms`

    * 蓝色: 网络和HTML解析
    * 黄色: JavaScript 脚本运行
    * 紫色: 样式重计算和布局 ( Layout , Recaculate Style, Update Layer tree)
    * 绿色: 绘制和合成 ( Paint , Composite Layers)

2.  30fps和60fps的基准线，可以直观地看到页面每一帧的情况
3. 灰色区块：那些没有被DevTools感知到的活动
4. 空白区块：显示刷新周期（display refresh cycles）中的空闲时间段？？
5. event ：事件，上面可以看到触发了什么的事件，然后执行的语句是哪些，
6. recalculate style: 重新计算样式
7. update layer tree: 【耗时】
8. composite layers: 【耗时】
9. paint X n: 【耗时】

## 2. 页面渲染的原理和过程

接下来思考这个问题：

**什么是update layer tree，什么是compsite layers，它们为什么那么耗时？**

要理解`update layer tree`和`composite layers`，我们必须了解页面的渲染原理和过程。

### 2-1 页面生成的过程

我们都知道网页生成过程，大致可以分成五步

1. HTML代码转化为DOM
2. CSS代码转化成CSSOM（CSS Object Model）
3. 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成
5. 将布局绘制（paint）在屏幕上

那么，浏览器是如何进行渲染的？

### 2-2 理解图层

浏览器在渲染一个页面时，会将页面分为很多个图层，图层有大有小，每个图层上有一个或多个节点。浏览器实际所做的工作有：

1. 获取DOM后分隔为多个图层
2. 对每个图层的节点计算样式结果（recalculate style）
3. 为每个节点生成图形和位置（layout即reflow和重布局）
4. 将每个节点绘制填充到图层位图汇总（paint，repaint）
5. 图层作为纹理加载到GPU
6. 合并多个图层到页面上，生成最终图像（composite layers）

渲染的过程通常是相当耗时，低效的代码往往就是触发过程的layout，paint，composite layers，导致页面卡顿。

## 3. 低效的代码

明白了整个渲染的过程和timeline的操作的含义，那么可以思考这样的一个问题：

**什么样的代码会触发这么耗时的操作，导致我们的页面卡顿？**

### 3-1. 重排和重绘

网页生成的时候，至少会渲染一次。而我们需要关注的是用户访问过程中，那些会导致网页重新渲染的行为：

* 修改DOM

* 修改样式表

* 用户事件（例如鼠标悬停，页面滚动，输入框输入文字等）

重新渲染，就涉及`重排`和`重绘`

**重排（reflow）**

即重新生成布局，重排必然导致重绘，如元素位置的改变，就会触发重排和重绘。

会触发重排的的属性：

1. 盒子模型相关属性会触发重布局：

    * width
    * height
    * padding
    * margin
    * display
    * border-width
    * border
    * min-height

2. 定位属性及浮动也会触发重布局：

    * top
    * bottom
    * left
    * right
    * position
    * float
    * clear

3. 改变节点内部文字结构也会触发重布局：

    * text-align
    * overflow-y
    * font-weight
    * overflow
    * font-family
    * line-height
    * vertival-align
    * white-space
    * font-size

**重绘（repaint）**

即重新绘制，需要注意的是，`重绘不一定需要重排`，比如改变某个元素的颜色，就只会触发重绘，而不会触发重排。

会触发重绘的属性

* color
* border-style
* border-radius
* visibility
* text-decoration
* background
* background-image
* background-position
* background-repeat
* background-size
* outline-color
* outline
* outline-style
* outline-width
* box-shadow

*手机就算重绘也很慢*

重排和重绘会不断触发，这是不可避免的，但是它们非常消耗资源，是导致网页性能低下的根本原因。

提高网页性能，就是`要降低重排和重绘的频率和成本，尽量少触发重新渲染`。

大部分浏览器通过`队列化修改`和`批量显示`优化重排版过程。然而有些操作会强迫刷新并要求所有计划改变的部分立刻应用。

### 3-2 创建图层

1. 创建图层有什么用？

    我们知道浏览器layout和paint是在每一个图层上进行的，当有一个元素经常变化，为了减少这个元素对页面的影响，我们可以为这个元素创建一个单独的图层，来提供页面的性能。

2. 在什么时候会创建图层？

    * 3D或透视变换（perspective transform）CSS属性（例如translateZ(0)/translate3d(0,0,0)）
    * 使用加速视频解码的\<video\>节点
    * 拥有3D（WebGL）上下文或加速的2D上下文的\<canvas\>节点
    * 混合插件（如Flash）
    * 对自己的opacity做CSS动画或使用一个动画webkit变换的元素
    * 拥有加速CSS过滤器的元素
    * 元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）
    * 元素有一个z-index较低且包含一个复合层的兄弟元素（换句话说就是该元素在复合层上面渲染）

    *position为fixed也会创建图层，而absolute则不会*

3. 创建图层的弊端

    图层的创建也需要一定的开销，太多的图层会消耗过多的内存。这可能导致出现预期之外的行为，可能会导致潜在的崩溃。

### 3-3 硬件加速

1. 什么是硬件加速？

    现代浏览器大都可以利用GPU来加速页面渲染。在GPU的众多特性之中，它可以存储一定数量的纹理（一个矩形的像素点集合）并且高效地操作这些纹理（比如进行特定的移动、缩放和旋转操作）。这些特性在实现一个流畅的动画时特别有用。浏览器不会在动画的每一帧都绘制一次，而是生成DOM元素的快照，并作为GPU纹理（也被叫做层）存储起来。之后浏览器只需要告诉GPU去转换指定的纹理来实现DOM元素的动画效果。这就叫做GPU合成，也经常被称作`硬件加速`。

2. 怎么启用硬件加速？

    CSS animations, transforms 以及 transitions 不会自动开启GPU加速，而是由浏览器的缓慢的软件渲染引擎来执行。那我们怎样才可以切换到GPU模式呢，很多浏览器提供了某些触发的CSS规则。

    例如

    * translate3d(0,0,0)
    * rotate3d(0,0,0,0)
    * scale3d(0,0,0)
    * translateZ(0)【可能】

    只需要在css中使用这类属性，即可开启硬件加速

3. 硬件加速真的那么好吗？

    从本人在移动端开发的实践来看，硬件加速是比较坑的。开启硬件加速会占有手机过多的内存而导致手机卡顿（这个时候页面也肯定卡顿了），因此在我们团队中，是禁止掉硬件加速的。

    具体的原理可以参考[链接5](http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/)

## 4. 参考的文章

1. http://frontenddev.org/link/the-timeline-panel-of-the-chrome-developer-tools.html#heading-1-2
2. https://segmentfault.com/a/1190000003991459
3. http://gold.xitu.io/entry/5584c9a2e4b06b8a728fe53d
4. https://segmentfault.com/a/1190000000490328
5. http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/