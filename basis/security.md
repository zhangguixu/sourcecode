# 安全

## JavaScript不能做什么

### 浏览器不支持的功能

1. JavaScript没有权限写入或删除客户计算机上的任意文件或列出任意目录

    意味着JavaScript程序不能删除数据或植入病毒。

2. 客户端JavaScript没有任何通用的网络能力。

    虽然客户端JavaScript程序可以对HTTP协议编程，此外还有WebSockets，但是这些API都不允许对于范围更广的网络进行直接访问。

### 浏览器限制的功能

1. JavaScript程序可以打开一个新的浏览器窗口，但是为了防止广告商滥用弹出窗口，很多浏览器限制这一功能，使得只有`为了响应鼠标单击这样的用户触发事件的时候`，才能使用。

2. JavaScript程序可以关闭自己打开的浏览器窗口，但是不允许它不经过用户确认就关闭其他的窗口。

3. HTML FileUpload元素的value属性是只读的。

4. 脚本不能读取从不同服务器载入的文档的内容，除非这个就是包含该脚本的文档。

## 同源策略

>同源策略是对JavaScript代码能够操作哪些Web内容的一条完整的安全限制。具体来说，脚本只能读取和所属文档来源相同的窗口和文档的属性。

文档来源

    协议 主机 端口

*脚本本身的来源和同源策略并不相关，相关的是脚本所嵌入的文档的来源*

作用场景

1. 使用多个<iframe\>

2. 打开其他浏览器窗口

3. 使用XmlHttpRequest

### 不严格的同源策略

#### 子域问题（document.domian）

同源策略给使用多个子域的大站点带来一些问题。

例如：来自`home.example.com`的文档里的脚本想要合法地读取`developer.example.com`载入的文档的属性

为了支持这种类型的多域名站点，可以使用Document对象的`domain`属性。在默认情况下，domain存放的是载入文档的服务器的主机名。可以设置这一属性，不过使用的字符串必须具有有效的域前缀或它本身。

```javascript
//设置home.example.com的文档
document.domain = 'example.com';

//设置developer.example.com的文档
document.domain = 'example.com';
```

这样，两个子域就具有同源性，就可以互相读取对方的属性了。

*domain值中必须有一个点号，不能设置为com或其他顶级域名。*

#### 跨域资源共享（CORS）

Cross-Origin Resource Sharing这项技术已经成为一项标准，参见：[http://www.w3.org/TR/cors/](http://www.w3.org/TR/cors/)

这个标准对HTTP进行扩展：

1. 新的`Origin:`请求头
2. 新的`Access-Control-Allow-Origin`响应头

它允许服务器用头信息显示地列出源，或使用通配符来匹配所有源并允许跨域HTTP请求，已经运用到`XMLHttpRequest Level 2`。这样就不会被同源策略所限制了。

#### 跨文档消息

跨文档消息（cross-document messaging），允许来自一个文档的脚本可以传递文本消息到另一个文档里的脚本，而不管脚本的来源是否不同。调用window对象的`postMessage()`，方法，可以异步传递消息，利用`onmessage`事件处理函数来处理它。采用`域判断`来确定信任源。

```javascript
//文档A发送消息给文档B
chatFrame.contentWindow.postMessage('hello','http://www.example.com/')

//文档B监听message事件
window.addEventListener('message',messageHandler,true);

function messageHandler(e){

    if(checkWhiteList(e.origin)){
        //处理消息
        processMessage(e.data);
    }else{
        //忽略来自未知源的消息
    }
}
//进行源的判断
var originWhiteList=['portal.example.com','games.example.com',
                        'www.example.com'];

function checkWhiteList(origin){

    var i;

    for(i = 0;i < originWhiteList.length;i++){
        if(origin === originWhiteList[i]){
            return true
        }
    }

    return false;
}
```

## 脚本化插件和ActiveX控件

> 实际上Java Applet和Flash插件看上去具有健壮的安全性，并且不会为客户端JavaScript引来安全问题。

## 跨站脚本

> 跨站脚本（Cross-Site scripting）,又叫XSS，这个术语表示了一类安全问题，也就是攻击者向目标Web站点注入了HTML标签或脚本。

**攻击原理**

如果一个Web页面动态地产生文档内容，并且这些文档内容是基于用户提交的数据的，而并没有通过从中移除任何嵌入的HTML标签来"消毒"的话，那么这个Web页面很容易遭到跨站脚本的攻击。

例如：脚本使用JavaScript通过用户名字来向用户问好

```javascript
var name = decodeURIComponent(window.location.search.substring(1) || '');
document.write('hello '+name);
```

考虑如果URL为

    http://www.example.com/greet.html?%3Cscript%3Ealert('David')%3C/script%3E

注入的脚本就会显示一个对话框。此外，可以把其他站点的脚本注入到目标站点中，注入的脚本就可以对站点A的内容进行任何想要的操作。

**防止XSS攻击的办法**

在使用任何不可信的数据来动态的创建文档内容之前，从中移除HTML标签。

**iframe的sandbox属性**

HTML5为<iframe\>元素定义了一个`sandbox`属性，在实现之后，它运行显示不可信的内容，并自动禁止脚本。

## 拒绝服务攻击

恶意脚本利用某种循环或长脚本来无限循环占用浏览器，导致Web浏览器无法正常工作。不过实际上是个不常见的问题。