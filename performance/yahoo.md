# yahoo 性能优化规则

### Minimize HTTP Requests

**减少HTTP请求**

图片、css、script、flash等这些都会增加http请求次数，减少这些元素的数量能减少响应时间。例如可以：

* 合并脚本文件

* css sprites：拼合小图，利用background来定位。

### Use a Content Delivery Network

**利用CDN技术**

CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

### Add an Expires or a Cache-Control Header

**设置头文件过去或静态缓存**

浏览器会用缓存减少http请求数来加快页面加载的时间，如果在页面头部加一个很长的过期时间，浏览器会一直缓存页面里的元素。不过缓存也会带来一定的麻烦，当缓存的内容变动时，需要进行一定的管理。

### Gzip Components

**Gzip压缩**

Gzip格式是一种很普遍的压缩技术，几乎所有浏览器都有解压Gzip格式的能力，而且它可以压缩的比例非常大，一般压缩率为85%。

### Put Stylesheets at the Top

**css放在顶部**

让浏览者能尽早地看到网站的完整样式

## Put Scripts at the Bottom

**js放在底部**

网站呈现之后，再进行功能设置。当然这些js要在加载过程中不影响内容表现。

### Avoid CSS Expression

**避免使用CSS Expressions**

CSS表达式性能很差。

### Make JavaScript and CSS External

**采用外链的形式来使用JS和CSS**

1. 缓存
2. 可维护

### Reduce DNS Lookups

**减少DNS查询**

减少网站从外部调用资源

### Minify JavaScript and CSS

**减少js和css的体积**

通过脚本压缩来去除缩进、空格等。

### Avoid Redirects

**避免重定向**

在写入链接时，`http://www.example.com`和`http://www.example.com/`仅有一个最后的"\"只差，但是却会触发浏览器花时间把前者重定向为后者，然后进行跳转。





