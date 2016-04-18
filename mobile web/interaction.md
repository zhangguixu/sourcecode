# 交互

## 点击

*触摸才是移动设备交互的核心事件*

1. 基础事件有

    * touchstart
    * touchmove
    * touchend
    * touchcancel

2. touch event的常用属性

    * clientX/clientY
    * identifier
    * pageX/pageY
    * target

3. touch事件包含的专有的触摸属性

    * touches：跟踪触摸操作的touch对象数组
    * targetTouches：特定事件目标的touch对象数组
    * changeTouches：上次触摸改变的touch对象数组

**bug**

在Android只会触发一次touchstart，一次touchmove，不会触发touchend。

解决方法：在touchmove中加入event.prevetDefault()，但event.preventDefault()会导致默认的行为不发生（如页面滚动）。

### tap/click

1. click事件的300ms延迟触发（历史原因）

2. Tap事件的原理

    ![tap](./img/tap.jpg)

    在`touchstart`时记录事件，手指位置，在`touchend`时进行比较，如果手指位置为同一个位置（或允许移动一个非常小的位移且事件间隔小于200ms），且过程中未曾触发过`touchmove`，即可认为触发了手持设备上的`click`，一般称为`tap事件`

3. 点透的bug

    ![ghost-click](./img/ghost-click.jpg)

    点击button正上方的遮罩层时，遮罩层消失后，也会触发button的click事件，原因也是click事件的延迟300ms触发。这种现象叫做`点透bug`。

### 点击态

解决方案

```javascript
$el.on('tap',function(e){
    var $target = $(e.target);
    $target.addClass('active');
    setTimeout(function(){
        $target.removeClass('active');
    },150);
})
```

### 手势

框架在有自定义手势事件（待续）

## 滚动

1. 全局滚动

    滚动条在body节点或更顶层

2. 局部滚动

    滚动条在body下的某一个dom节点

### 弹性滚动效果

**ios**

1. 全局滚动默认支持

    ```css
    body{
        -webkit-overflow-scrolling:touch;
    }
    ```

2. 局部滚动，默认没有滚动条且滑动起来比较干涩

    ```css
    .scroll-el{
        overflow:auto;
    }
    ```

**android**

1. 定制版本较多，表现各异
2. 默认没有弹性滚动效果
3. `-webkit-overflow-scrolling:touch`默认浏览器不支持
4. Android版的chrome支持

### IOS的出界困扰

1. 全局滚动

    * 滚动到页面顶部（底部），继续向下（向上）滑动，就会出现

    * 无法直接解决，只能尽量避免使用

2. 局部滚动

    * 滚动到页面顶部（底部），手机离开停下，再继续向下（向上）滑动，就会出现
    * 使用`scrollFix`解决
    * 页面的固定区域禁止`touchmove`事件

### Android的局部滚动

*建议只使用全局滚动*

### 最佳实践

1. body加上`-webkit-overflow-scrolling:touch`
2. ios尽量使用局部滚动（避免出界）
3. ios引进scrollFix避免出界（局部滚动条件下）
4. Android下尽量使用全局滚动

    * 尽量不使用`overflow:auto`
    * 使用`min-height:100%`代替`height:100%`

5. ios下带有滚动条且`position:absolute`的节点不要设置背景色

## 键盘定制

1. 配置`input`的`type`

    ```html
    <input type="tel"/>
    <input type="email"/>
    <input type="search"/>
    ```

2. 其他优化配置

    * autocapitalize = "off"（关闭首字母大写）
    * autocorrect = "on/off" （自动补全）
