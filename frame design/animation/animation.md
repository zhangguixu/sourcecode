# 动画引擎

## 动画基础

### 原理

在定时器里面，每隔20ms~30ms改变元素的样式值，这就是动画的原理。

基本代码结构

```javascript
setInterval(function(){
    update();
    render();
},25)
```

### 可计算的样式值

动画引擎的第一步就是`获取元素的精确的样式值`。

1. px：例如width、height、margin-x；

2. RGB：此外还有color、background-color，这些可以分解为RGB，这些很容易就格式化为一个数组，

3. 透明度：opacity，filter(IE旧版本)

4. transform：有两类传值方式，要进行特别处理才可以。

*在标准的浏览器，可计算的样式值基本上都可以获取的到，但是在旧版本的IE，就得自行处理。*

### fps

fps通俗来说，叫刷新率，在1秒中更新多少次画面。在兼顾人眼睛的视觉停留效应和显示器的显示速度两方面，根据外国的统计，`25ms`为最佳的数值。

### 简单动画例子

```javascript
window.onload = function(){
        var el = document.getElementById('move'),
            parent = document.getElementById('taxiway');

         var distance = parent.offsetWidth - el.offsetWidth,//总的移动距离
            begin = parseFloat(window.getComputedStyle(el,null).left), //开始位置
            end = begin + distance,//结束位置
            fps = 30,//刷新率
            interval = 1000 / fps,//每隔多少ms刷新一次
            duration = 2000,//时长
            times = duration / 1000 * fps,//一共刷新多少次
            step = distance / times, //每次移动的距离
            timer = null; //定时器id

        el.onclick = function(){
            clearInterval(timer);
            var now = new Date;
            timer = setInterval(function(){
                if(begin >= end){
                    el.style.left = end + 'px';
                    clearInterval(timer);
                    alert(new Date - now);
                } else {
                    begin += step;
                    el.style.left = begin + 'px';
                }
            }, interval);
        }

    }
```

### 缓动公式

改写上面的例子，加入`进度`这个变量（jquery的一个参数的风格）。

```javascript
el.onclick = function(){
    var beginTime = new Date;
    var id = setInterval(function(){
        var t = new Date - beginTime; //当时已用掉的时间
        if (t >= duration){
            el.style.left = end + 'px';
            clearInterval(id);
            alert(t);
        } else {
            var per = t / duration; //当前进度
            el.style.left = begin + per * distance + 'px';
        }
    },interval)
}
```

如果我们能随意控制per这个数值，那么就能轻易实现加速减速。这就是缓动公式的由来。

而所谓的缓动公式其实是来自数学上的三角函数，二项式方程，重力，摇摆，弹簧，来回弹动等效果。

#### 框架中的缓动公式

现在所有缓动公式，基本上除了linear外，也常被成为`easeNone`，它们都以ease开头命名。添加后缀的含义：

1. In：表示加速
2. Out：表示减速
3. InOut：表示加速到中途又开始减速
4. Sine：表示由三角函数实现
5. Quad：二次方
6. Cubic：三次方
7. Quart：四次方
8. Qunit：五次方
9. Circ：开平方根的Math.sqit
10. Expo：开立方根的Math.pow
11. Elastic：结合三角函数与开立方根的初级弹簧效果
12. Back：使用一个1.70158常数来计算的回退效果
13. Bounce：高级弹簧效果

这些公式都可以在AS、jquery.easing.js、mootools等库中找到。

*jQuery是一个参数的风格，其实是当前时间减去动画开始时间除以总时间的比值，一个0到1的小数，它用于乘以总变化量，然后加上起始值。*

## API设计

### JavaScript的实现方式

1. jQuery的animate

    ```javascript
    .animate( properties [, duration] [, easing] [, complete] )

    .animate( properties, options )
    ```

2. Queue

    由于使用纯JavaScript的方式，需要一个queue，目的是让作用于同一个元素的动画进行排队，先处理完这个再处理后一个。避免同时运行于浏览器中的定时器过多。

### CSS3的实现方式

```css
.animate {
    animation-duration: 3s;
    animation-name: slidein;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
}

@keyframes slidein {
    from {
        left: 0%;
        background: white;
    }
    to {
        left: 200px;
        background: red;
    }
}
```

## 基于JavaScript的动画引擎








