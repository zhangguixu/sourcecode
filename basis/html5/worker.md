# HTML5 API

## Web Worker

> 客户端JavaScript有一个基本的特性就是单线程。

### 基本知识

在Web Worker标准中，定义了解决客户端JavaScript无法多线程的问题。

1. `worker`是指执行代码的并行线程。

2. Web Workers处在一个自包含的执行环境，无法访问Window对象和Document对象，
和主线程之间的通信也只能通过异步消息传递机制来实现。

3. 提供一种使用异步API的方式，同时运行书写需要长时间运行的函数而不会带来循环事件和导致浏览器崩溃的问题。

4. Web Workers标准中，有两部分组成`Worker对象`和`WorkerGlobalScope全局对象`。

### Worker对象

1. 使用构造函数Worker()创建Worker对象

    ```javascript
    var loader = new Worker(url)
    ```

    url:可以采用相对路径和绝对路径，但是采用绝对路径必须和包含该脚本的文档是同源的。

2. 使用postMessage()传递参数给Worker

    传递给postMessage()方法的值hi赋值，最终的副本会通过message事件传递给Worker

    ```javascript
    loader.postMessage('file.txt');
    ```

3. 通过message事件来接收Work的响应消息

    ```javascript
    worker.onmessage = function(e){
        var message = e.data;
        console.log('URL contents: ' + message);
    }
    ```

4. 使用terminate()终止Worker

    ```javascript
    worker.onmessage = function(e){
        //接收处理Worker的响应消息

        //终止worker
        worker.terminate();
    }
    ```

此外，Worker可以通过error事件来处理异常。

```javascript
worker.onerror = function(e){
    concole.log('Error at ' + e.filename + ':' + e.lineno
                + ':' + e.message);
}
```

和所有事件目标一样，Worker对象也定义了标准的`addEventListener()`和`removeEventListener()`

### WorkerGlobalScope全局对象

在通过Worker()构造函数创建一个新Worker的时候，指定了包含JavaScript代码文件的URL。该代码会运行在一个`全新的JavaScript运行环境中`，完全和创建Worker的脚本隔离开来。

WorkerGlobalScope全局对象表示了该新的运行环境，它是新创建的Worker的`全局对象`。

#### 与外部Worker的通信

**1. postMessage() & message事件**

WorkerGlobalScope对象同样有`postMessage()方法`和`message事件`，利用这两者可以与外部Worker进行通信

```javascript
//worker内部
onmessage = function(e){
    postMessage(e.data);
}
```

**2. close()**

同样，Worker可以使用`close()`来关闭自己，但是要注意的是，Worker对象上没有定义任何API用于检测Worker是否已关闭。因此，如果一个Worker要使用close()方法将自己关闭，那么最好是先传递"关闭"的信息。

**3. importScripts()**

Worker内部使用此方法来加载任何需要的库代码。而是此方法是一个`同步的方法`，它在直到所有的脚本都已经载入并运行完成才会返回。

```javascript
//在开始工作前，现在如需要的类、工具函数
importScript('collections/Set.js','utils/base64.js');
```

#### WorkerGlobalScope的属性

它拥有所有核心JavaScript全局对象拥有的属性，同时，还拥有部分客户端Window对象的一些属性。

* self：对全局对象自身的引用

* 计数器方法：setTimeout()/clearTimeout()/setInterval()/clearInterval()

* location：只读

* navigator

* 常用的事件目标方法：addEventListener()和removeEventListener()

* onerror属性

#### 脚本化HTTP请求

WorkerGlobalScope对象好包含一些重要的构造函数，其中就有`XMLHttpRequest()`，以便Worker可以通过它进行脚本化的HTTP请求。

**在Worker中发起同步的XmlHttpRequest**

```javascript
//Worker内部
onmessage = function(e){
    var urls = e.data; //要获取的url
    var contents = []; //url指定的内容
    var i,len,url;

    for(i = 0, len = urls.length; i < len; i++){
        var url = urls[i];
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url,false);//false表示进行同步请求
        xhr.send();
        if(xhr.status !== 200){
            throw Error(xhr.status + ' ' + xhr.statusText + ': ' + url);
        }
        contents.push(xhr.responseText);
    }

    //返回url的内容
    postMessage(contents);
}
```


