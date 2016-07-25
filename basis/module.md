# 模块管理的简单实现

`Keep It Simple，Stupid`

## Q&A

1. 为什么会有这个东西？

    方便组织你的代码，提高项目的可维护性。一个项目的可维护性高不高，也体现一个程序员的水平，在如今越来越复杂的前端项目，这一点尤为重要。

2. 为什么不用requirejs，seajs等

    它们功能强大，但是文件体积是个问题，此外还有就是业务有时候可能没那么复杂。
   
3. 以下的实现从哪里来的？

    这些借鉴了requirejs,seajs,commonjs等的实现，用于真实的项目，稳定运行，效果不错。

4. 适用场景

    * 移动端页面，将js注入到html页面，这样就不用考虑模块加载的问题，从而节省了很多的代码，在实现上也更为的简单。
    * 如果是多文件加载的话，需要手动执行文件加载顺序，那么其实最好用库来进行依赖管理会好一点。

## 实现1

```javascript
(function(global){
    var modules = {};
    var define = function (id,factory) {
        if(!modules[id]){
            modules[id] = {
                id : id,
                factory : factory
            };
        }
    };
    var require = function (id) {
        var module = modules[id];
        if(!module){
            return;
        }

        if(!module.exports){
            module.exports = {};
            module.factory.call(module.exports,require,module.exports,module);
        }

        return module.exports;
    }

    global.define = define;
    global.require = require;
})(this);
```

使用示例

```javascript
define('Hello',function(require,exports,module){
    function sayHello() {
        console.log('hello modules');
    }
    module.exports = {
        sayHello : sayHello
    }
});

var Hello = require('Hello');
Hello.sayHello();
```


## 实现2

```javascript
function Module(main,factory){
    var modules = {};
    factory(function(id,factory){
        modules[id] = {
            id : id,
            factory : factory,
        }
    });

    var require = function (id) {
        var module = modules[id];
        if(!module){
            return;
        }

        if(!module.exports){
            module.exports = {};
            module.factory.call(module.exports,require,module.exports,module);
        }
        return module.exports;
    }

    window.require = require;
    return require(main);
}
```
使用示例

```javascript
Module('main',function(define){
    define('Hello',function(require,exports,module){
        function sayHello () {
            console.log('hello');
        }
        
        //有效的写法
        module.exports = {
            sayHello : syaHello;
        }

        //或者
        exports.sayHello = sayHello;
    });
    //mian，程序入口
    define('main',function(require,exports,module){
        var Hello = require('Hello');
        Hello.sayHello();
    });
});
```

## 实现3

另外一种风格的模块管理

```javascript
(function(global) {
    var exports = {}; //存储模块暴露的接口
    var modules = {}; // 
    global.define = function (id,factory) {
        modules[id] = factory;
    }
    global.require = function (id) {
        if(exports[id])return exports[id];
        else return (exports = modules[id]());
    }
})(this);
```

使用示例

```javascript
define('Hello',function(require,exports,module){
    function sayHello() {
        console.log('hello modules');
    }
    //暴露的接口
    return {
        sayHello : sayHello
    };
});

var Hello = require('Hello');
Hello.sayHello();
```

## 实践

有了简易的模块化管理之后，在项目中，我们就可以采取这样的结构

-- proj
    -- html
        -- index.html
    -- css
    -- js
        -- common
            -- module1.js（通用模块1）
            -- module2.js（通用模块2）
        -- page
            -- index.js（页面逻辑）
        -- lib
            -- moduler.js 模块管理库

配合前端构建工具（wepack，grunt，gulp等等），就可以构建一个移动端的页面

