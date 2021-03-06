# 跨域传输

## JSONP

### 原理

动态添加一个script标签，而script标签的src属性是没有跨域限制的。

### 特点

只支持get方法

### 流程

1. 设定一个script标签

    ```html
    <script src="http://jsonp.js?callback=xxx"></script>
    ```

2. callback定义了一个函数名，而远程服务端通过调用指定的函数并传入参数来实现传递参数，将`fn(response)`传递回客户端

    ```php
    $callback = !empty($_GET['callback']) ? $_GET['callback'] : 'callback';
    echo $callback.'(.json_encode($data).)';
    ```

3. 客户端接收到返回的js脚本，开始解析和执行`fn(response)`

### jsonp简单实现

```javascript
function jsonp(req){
    var script = document.createElement('script');
    var url = req.url + '?callback=' + req.callback.name;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script); 
}
```

前端js示例

```javascript
function hello(res){
    alert('hello ' + res.data);
}
jsonp({
    url : '',
    callback : hello 
});
```

服务器端代码

```javascript
var http = require('http');
var urllib = require('url');

var port = 8080;
var data = {'data':'world'};

http.createServer(function(req,res){
    var params = urllib.parse(req.url,true);
    if(params.query.callback){
        console.log(params.query.callback);
        //jsonp
        var str = params.query.callback + '(' + JSON.stringify(data) + ')';
        res.end(str);
    } else {
        res.end();
    }
    
}).listen(port,function(){
    console.log('jsonp server is on');
});
```




