# fastclick

> https://github.com/ftlabs/fastclick/

消除点击300ms延迟的小型库，优化移动端的交互

优势：没有tap事件的`点透现象`

## 源码解析

```javascript
/*
    @Param layer : 
*/
function FastClick(layer) {
    'use strict';
    var oldOnClick; //存储用户传入的点击回调函数

    this.trackingClick = false; //是否跟踪一个点击

    this.trackingClickStart = 0;

    this.targetElement = null;

    this.touchStartX = 0;

    this.touchStartY = 0;

    this.lastTouchIdentifier = 0;

    this.touchBoundary = 10;//touchmove最大距离，如果小于10则是点击

    this.layer = layer;

    //旧版本的安卓 bind的原生实现
    function bind(method,context) {
        return function() { return method.apply(context,arguments);};
    }
    
    //是否是安卓系统
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;

    //是否是IOS系统
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

    //需要针对IOS4系统
    var deviceIsIOS4 = deviceIsIOS 
                    && (/OS 4_\d(_\d)?/).test(navigator.userAgent);

    //IOS6+？系统
    var deviceIsIOSWithBadTarget = deviceIsIOS
                 && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent); 

    if(deviceIsAndroid) {
        
    }
}

FastClick.prototype.onMouse = function(event) {
    'use strict';

    if(!this.targetElement) {
        return true;
    }
    //自定义的event属性
    if(event.forwardedTouchEvent) {
        return true;
    }
    //自定义的event属性
    if(!event.cancelable) {

    }
    
    //如果不需要此次点击，或者取消点击
    if(!this.needsClick(this.targetElement) 
        || this.cancelNextClick) {
        /*  
            event.stopImmediatePropagation
            除了可以阻止事件冒泡之外，
            还可以把这个元素绑定的同类型事件也阻止了
        */
        if(event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        } else {
            //hack,当浏览器不支持stopImmediatePropagation
            event.propagationStopped = true;
        }

        //取消事件
        event.stopPropagation();
        event.preventDefault();

        return false;
    }

    return true;
}


```


