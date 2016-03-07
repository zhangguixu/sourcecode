# JavaScript 模块规范

参考1：

> 来源：http://blog.chinaunix.net/uid-26672038-id-4112229.html

参考2：

> 来源：http://zccst.iteye.com/blog/2215317

## 模块化

### 定义

> 模块化是软件系统的属性，这个系统被分解为一组高内聚，低耦合的模块。

模块化是指在解决某一个复杂问题或一系列的杂糅问题时，依照一种`分类`的思维把问题进行`系统性的分解`以之处理。模块化是一种处理复杂系统分解为代码结构更合理，可维护性高的可管理的模块的方式。


### 模块化设计的3个能力

1. 定义封装的模块

2. 定义新模块对其他模块的依赖

3. 可对其他模块的引入支持

## CommonJS 与 Node

### CommonJS

CommonJS是服务器端模块的规范，node.js采用了这个规范。

根据CommonJS规范，一个单独的文件就是一个模块，加载模块使用require方法，该文件读取一个文件并执行，最后返回文件内部的exports对象。

CommonJS加载模块是`同步`的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地的硬盘，所有加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较使用。

## AMD与RequireJS

### AMD

AMD指的是异步模块定义（Asynchronous Module Definition）。即所有模块将被异步加载，模块加载不影响后面语句运行，所有依赖某些模块的语句均放置在回调函数中。

1. define(id?,dependencies?,factory)
2. require()

### RequireJS

RequireJS是一个前端的模块化管理的工具库，遵循AMD规范，它的作者就是AMD规范的创始人James Burke。

**基本思想**

通过同一个函数来将所有需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），我们所有的关于新模块的业务代码都在这个函数内部操作，其内部也可限制的使用已经记载进来的模块。

```javascript
<script data-main="scripts/main" src="scripts/require.js"></script>
```

**优点**

1. 定义模块清晰，清晰的显示依赖关系

2. 不会污染全局变量

3. 允许非同步加载模块，也可以按需动态加载模块

#### 1. define

define用于定义模块，RequireJS要求每个模块均放在独立的文件之中。按照是否有依赖其他模块的情况分为`独立模块`和`非独立模块`。

1. 独立模块

```javascript
define({
    method1 : function(){},
    method2 : function(){}
});

//等价于
define({
    return {
        method1 : function(){},
        method2 : function(){}
    }
});
```

2. 非独立模块

```javascript
define(['module1','module2'],function(m1,m2){
   //do something
});
```

## CMD 与 seaJS

### CMD

CMD（Common Module Definition）通用模块定义，是`SeaJS`在推广过程中模块定义ide规范化产出的。

### 与AMD的区别

1. 对于依赖的模块AMD是提前执行，CMD是延迟执行。（RequireJs从2.0开始，也改成可以延迟执行）

2. CMD推崇`依赖就近`，AMD推崇`依赖前置`

    AMD写法

    ```javascript
    define(['a','b'],function(a,b){
        //依赖一开始就写好
        a.test();
        b.test();
    })
    ```

    CMD写法

    ```javascript
    define(function(require,exports,module){
        //依赖可以就近书写
        var a = require('a');
        a.test();

        //软依赖
        if(status){
            var b = require('b');
            b.test();
        }
    })
    ```

3. AMD的API默认是一个当多个用，CMD严格的区分，推崇职责单一。

    例如：AMD里的require分全局的和局部的，CMD里面没有全局的require，而是使用seajs.use()来实现模块系统额加载启动。CMD里的每个API都简单纯粹。





