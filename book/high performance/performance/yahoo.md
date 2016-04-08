# yahoo 性能优化规则

## 服务器端优化

#### 1. Flush the Buffer Early（尽早释放缓存）

当用户进行页面请求时，服务器端需要花费200到500毫秒时间来拼合HTML，将写在head与body之间，释放缓冲，这样可以将文件头先发送出去，然后再发送文件内容，提高效率。

## 客户端优化

#### 1. Put Stylesheets at the Top（css放在顶部）

让浏览者能尽早地看到网站的完整样式

#### 2. Put Scripts at the Bottom（js放在底部）

网站呈现之后，再进行功能设置。当然这些js要在加载过程中不影响内容表现。

#### 3. Avoid CSS Expression（避免使用CSS Expressions）

CSS表达式性能很差，还会导致IE崩溃。

#### 4. Make JavaScript and CSS External（采用外链的形式来使用JS和CSS*）

1. 缓存
2. 可维护

减少网站从外部调用资源

#### 5. Remove Duplicate Scripts（删除重复的脚本）

重复调用的代码浏览器并不会识别忽略，而是会再次运算一次。

#### 6. Minimize the Number of iframes（减少iframe数量）

iframe的优点：

    有利于下载缓慢的广告内容，安全沙箱，并行下载脚本

iframe的缺点：

    即使为空也会有较大资源消耗，会阻止页面的onload，标签没有语义

#### 7. Minimize DOM Access（减少DOM的访问次数）

在使用JS进行DOM操作时，尽可能减少DOM操作（实际产生影响的操作）的次数。

#### 8. Develop Smart Event Handlers（灵活地设置事件处理程序）

避免DOM树上过多的元素被加上事件句柄（这样会消耗很多的资源），可以利用事件委托的技术，来避免这种情况。

#### 9. Choose <link> over @import（使用link取代@import指令）

IE中的@import就跟在页面底部使用<link\>一样，触发浏览器重绘，甚至重排版。

#### 10. Void Filters（避免使用Filter）

如果需要Alpha透明，不要使用AlphaImageLoader，它效率低下而且只对IE6及以下的版本适用，用PNG8图片。如果你非要使用，加上_filter以免影响IE7+用户。

## 传输优化

### 缓存

#### 1. Add an Expires or a Cache-Control Header（设置过期时间或静态缓存*）

Expires:

* HTTP1.0就有了，简单易用。

* 服务器通过这个Header告知浏览器资源的过期时间，在资源没有过期之前，浏览器就直接使用本地缓存。

Cache-Control:

* 服务器通过一个Header(Last-Modified)告诉浏览器资源的最后修改时间。

* 浏览器在请求的时候，包含一个Header(If-Modified-Since)，然后服务器可以进行比较，如果在该时间后资源没有修改过，则返回304。

* 比Expires多很多选项设置。

浏览器会用缓存减少http请求数来加快页面加载的时间，如果在页面头部加一个很长的过期时间，浏览器会一直缓存页面里的元素。不过缓存也会带来一定的麻烦，当缓存的内容变动时，需要进行一定的管理。

![request-header](./img/request-header.png)

#### 2. Configure ETags（配置ETags）

ETag主要`提供对资源的版本标识，以避免无谓的重复下载`。由两部分组成：时间戳+修改编号。服务器实际上是比较了ETag的值，如果发现浏览器提供的值与该资源实际的值是一样的，就返回304的状态码，而且不需要在响应的正文里面包含任何实际内容。浏览器得到304的状态码之后，就知道该资源并没有被修改，所以直接使用本地缓存的版本。

    ETag的值；例如：6ab823201a4ece1:0

![response-header](./img/response-header.png)

#### 3. Make Ajax Cacheable（缓存Ajax）

1. Ajax缓存和HTTP缓存效果相同

    现代浏览器的HTTP系统和缓存系统要比Ajax的XmlHttpRequest对象更靠近底层，在这个层面上，浏览器不知道或关系Ajax请求，它只是服从正常的基于服务器返回的HTTP响应头的缓存规则。

    可以将HTTP缓存的知识应用到Ajax的缓存，以下HTTP响应头可以用来做Ajax缓存：

    * Expires
    * Last-Modified
    * Cache-Control

    *如果使用Ajax的`POST`方法，因为POST请求不会被缓存*

2. IE浏览器不会刷新过期日期前的Ajax内容

    在IE中，`已加载的Ajax请求被视为和页面刷新无关的内容`，用户的刷新动作也不会被传递到Ajax中。如果缓存的Ajax内容还没过期，IE不会发送GET请求到服务器，它直接从缓存读取内容。

#### 4. Use GET for Ajax Requests（使用Ajax的GET请求方法）

区别对待吧，POST方法也有自己的好处，有时候为了安全和避免缓存造成的问题，还是建议使用POST方法。

#### 5. Make favicon. ico Small and Cacheable（缩小favicon.ico的大小并且缓存）

站点的浏览器ico很少更换，可以长时间缓存，并且最好控制在1KB以下。

#### 6. Keep Components under 25K（保证组件在25K以下）

iPhone不能缓存25K以上的组件。

### 减少字节

#### 1. Gzip Components（Gzip压缩）

Gzip格式是一种很普遍的压缩技术，几乎所有浏览器都有解压Gzip格式的能力，而且它可以压缩的比例非常大，一般压缩率为85%。

#### 2. Minify JavaScript and CSS（减少js和css的体积）

通过脚本压缩来去除缩进、空格等。

#### 3. Reduce the Number of DOM Elements（减少DOM元素的数量）

复杂的页面结果意味着更长的下载及响应时间。

#### 4. Reduce Cookie Size（减小Cookie的体积）

Cookie在服务器及浏览器之间通过头文件进行交换，尽可能减小Cookie的体积，设置合理的过期时间。

#### 5. Optimize Images（优化图片）

将GIF转为PNG8可以减小体积，此外，还有很多方法处理JPG和PNG图片，进行优化

#### 6. Optimize CSS Sprites（优化CSS Sprites）

在CSS Sprites中竖直并尽量紧凑的排列图片，尽量将颜色相似的图片排在一起，会减小图片本身的大小，提高页面图片显示速度。

#### 7. Don’t Scale Images in HTML（不要在HTML中缩放图片）

图片的大小不会应为缩放而改变，也就是说1000*1000的图片被设置"width=100,height=100"，本身的大小不变。

### 请求

#### 1. Minimize HTTP Requests（减少HTTP请求）

图片、css、script、flash等这些都会增加http请求次数，减少这些元素的数量能减少响应时间。例如可以：

* 合并脚本文件

* css sprites：拼合小图，利用background来定位。

#### 2. Use a Content Delivery Network（利用CDN技术）

CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

#### 3. Avoid Redirects（避免重定向）

在写入链接时，`http://www.example.com`和`http://www.example.com/`仅有一个最后的"\"只差，但是却会触发浏览器花时间把前者重定向为后者，然后进行跳转。

#### 4. Reduce DNS Lookups（减少DNS查询）

#### 5. Split Components Across Domains（跨域分离组件）

页面组件多个来源可以增大平行下载量，但是不能过多，超过2-4个域名会引起DNS查询开销过大。

#### 6. No 404（不要出现404页面）

无意义的404页面会影响用户体验并且会消耗服务器资源

#### 7. Use Cookie-free Domians for Components（对组件使用无Cookie的域名）

使用无Cookie的域名来存放静态的组件。

#### 8. Pack Components into a Multipart Document（将组件打包进一个多部分的文档）

就好像在邮件中加入附件一样，一个HTTP请求就够了，但是这一技术需要确保你的代理支持，iPhone就不支持。

### 延迟加载或预加载

#### 1. Post-load Components（延迟加载组件）

先加载页面显示的最小内容集，之后，再加载其余的资源。这样可以提高页面的响应速度。

#### 2. Preload Components（预加载组件）

提前加载以后可能会用到的资源，为后续的请求提供更快的响应。





