# JavaScript 小技巧

> 来源：http://www.cnblogs.com/tugenhua0707/p/5272539.html <br>
>       http://www.alloyteam.com/2012/11/javascript-throttle/

## 函数节流

### 一、基本认识

函数节流技术的主要思路是：通过一个定时器，阻断连续重复的函数调用。

### 二、应用场景

函数节流技术对于用户界面调用的函数，有着一定的意义，特别是`事件监听函数`。

**事件监听函数**

1. 短时间内连续多次触发

2. 大量的DOM操作。

对于具有这两类特征的事件监听函数，就比较适合采用函数节流。

### 三、例子

例如，一个简单的window.resize

```javascript
var count = 0;
window.onresize = function(){
    count++;
    console.log(count);
}
```

![throttle-resize](./img/throttle-resize.png)

*简单的缩放一次就会打印多次。这并不是我们想要的效果。*

#### 解决方案1

```javascript
function throttleFunc(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    },100);
}
```

**demo**

```javascript
var count = 0;
function myFunc(){
    count++;
    console.log(count);
}
window.onresize = function(){
    throttleFunc(myFunc)
}
```

#### 解决方案2

**采用闭包的形式**

```javascript
function throttle(fn,delay){
    var timer = null;
    return function(){
        var context = this,
            args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(context,arguments);
        },delay);
    }
};
```

**demo**

```javascript
var count = 0;
function myFunc(){
    count++;
    console.log(count);
}
var func = throttle(myFunc,100);
window.onresize = function(){func();}
```

#### 解决方案3

**深入理解**

真正的节流应该是在`可接受的范围内尽量延迟这个调用时间`，也就是我们自己控制这个执行频率。因此可以增加一个必须执行时间


```javascript

var throttle = function(fn,delay,mustRunDelay){
    var timer = null;
    var t_start;
    return function(){
        var context = this,
            args = arguments,
            t_curr = +new Date();

        clearTimeout(timer);
        if(!t_start){
            t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay){
            fn.apply(context,args);
            t_start = t_curr;
        } else {
            timer = setTimeout(function(){
                fn.apply(context,args);
            },delay)
        }
    }
}

```






