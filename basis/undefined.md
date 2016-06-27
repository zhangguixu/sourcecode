# undefined

## 小知识

在Ecmascript 3中，undefined是可变的，不是关键字，这意味着它的值可以被覆盖或者重新赋值。如undefined = true。

*在ECMASCRIPT 5严格模式（’use strict';）中解析器将抛出一个类型错误。现在的代码基本不用考虑这个问题了*

因此我们需要保护我们的undefined,像下面这样：

```javascript
;!function(win,undefined){
    //函数作用域
}
```

这意味着，如果有人重新定义了undefined，就无法对我们的代码产生什么影响了

```javascript
//对undefined进行了赋值
undefined = true;
;!function(win,undefined){
    //undefined是一个局部变量
}
```

