# 单例模式

## 定义

单例模式的定义是产生一个类的唯一实例。

*javscript是面向对象的语言，没有类的概念*

很多文章把`{}`当成一个单例，因为没有构造函数，无法再生成跟上面一样的对象实例了。然而这并没有什么意义。

## 场景分析

设想这样的一个场景，我们在点击某个按钮的时候需要在页面弹出一个遮罩层，这个遮罩层是全局唯一的，即我们需要一个单例来保存这样的一个遮罩层实例。

```javascript
var createMask = function () {
    var mask;
    return function () {
        return mask || (document.createElement("div"));
    }
}
```

*此处里面闭包来进行封装，为的是生成的单例不被修改*

## 实现

我们来实现一个通用的`singleton`包装器

```javascript
var createSingleton = function (factory) {
    var singleton;
    return function () {
        return singleton || (factory.apply(this,arguments));
    }
}
···