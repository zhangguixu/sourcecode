# 浏览器资源加载

> http://www.infoq.com/cn/articles/browser-resource-loading-optimization

## preloader的存在

在资源加载上，早在IE8开始，就有一种叫做`lookahead pre-parser(preloader)`的机制就已经开始在不同浏览器中兴起。

它的原理大致是：浏览器通常会准备两个页面解析器，一个`main parser`用于正常的页面解析，而另一个`preloader`则试图去文档中搜寻更多需要加载的资源，但这里的资源通常仅限于外链的js、stylesheet、image。

1. preloader的触发，并非与解析页面同时开始，而通常是加载某个head中的外链脚本阻塞了`main parser`的情况下才启动。

2. 也不是所有浏览器的preloader会把图片列为预加载的资源，可能它认为图片加载过于耗费带宽而不把它列为预加载资源之列。

3. preloader并非最优，在某些浏览器中它会阻塞body的解析。因为有的浏览器将页面文档拆分为head和body两部分进行解析，在head没有解析完之前，body不会被解析。一旦解析head的过程中触发了preloader，这无疑会导致head的解析时间过长。


### preloader在响应式设计的问题

filamentgroup有一种著名的响应式设计的图片解决方案[Responsive Design Images](https://github.com/filamentgroup/Responsive-Images/tree/cookie-driven)

```html
<html>
<head>
    <title></title>
    <script type="text/javascript" src="./responsive-images.js"></script>
</head>
<body>
    <img src="./running.jpg?medium=_imgs/running.medium.jpg&large=_imgs/running.large.jpg">
</body>
</html>
```

这个方案的思路是：

当responsive-images.js加载完成之后，它会检测当前显示器的尺寸，并且设置一个cookie来标记当前的尺寸。同时你需要在服务器端准备一个.htaccess文件，接下来请求图片的时，.htaccess中的配置会检测随图片请求异同发送的cookie是被设置成medium还是large，这样就保证根据显示器的尺寸来加载对于图片的大小。

很显然，这个方案成果的前提是：js执行先于发出图片请求。

### preloader在加载的顺序的问题

当脚本的顺序和位置或许是开发者有意而为之的，但由于preloader的存在会导致这种顺序难以得到保证。

## JS loader

由前面可见，使用第三方的加载器来保证脚本的加载顺序就很有必要了。



*待续*
