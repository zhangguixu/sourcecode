# fastclick

## 主流程

1. FastClick.attach()

2. FastClick(layer)

3. 初始化化变量

    ```javascirpt
    this.trackingClick = false; //追踪一个click
    this.trackingClickStart = 0; //追踪时间
    this.targetElement = null; // 目标元素
    this.touchStartX = 0;// X坐标
    this.touchStartY = 0;// y坐标
    this.lastTouchIndentifier = 0;
    this.touchBoundary = 10;//边界条件（是否是一个点击）
    this.layer = layer;//layer可以是document.body/document.documentElement
    ```

4.  安卓设备绑定鼠标事件（在捕获阶段，为的是第一时间处理到事件）

    ```javascript
    layer.addEventListener('mouseover',bind(this.onMouse,this),true);
    layer.addEventListener('mousedown',bind(this.onMouse,this),true);
    layer.addEventListener('mouseup',bind(this.onMouse,this),true);
    ```
5. 绑定touch和click事件（判定是否是click行为，取消之前的click）,

    ```javascript
    //最先捕获到
    layer.addEventListener('click', bind(this.onClick, this), true);
    //冒泡阶段捕获
    layer.addEventListener('touchstart', bind(this.onTouchStart, this), false);
    layer.addEventListener('touchmove', bind(this.onTouchMove, this), false);
    layer.addEventListener('touchend', bind(this.onTouchEnd, this), false);
    layer.addEventListener('touchcancel', bind(this.onTouchCancel, this), false);
    ```

6. 判断是否存在`stopImmediatePropagation`，如果不存在则进行hack，在`onMouse`中会利用`stopImmediatePropagation`来阻止其他点击事件的回调函数的执行，避免`ghost click`的现象

    onMouse中，防止点透等诡异现象的代码

    ```javascript
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
        // Prevent any user-added listeners declared on FastClick element from being fired.
        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        } else {
            // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
            event.propagationStopped = true;
        }
        // Cancel the event
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
    ```


7. 判断是否通过`onclick`绑定了回调函数，如果有读取出来，使用`addEventListener`，绑定事件处理函数

    ```javascript
    if (typeof layer.onclick === 'function') {
        // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
        // - the old one won't work if passed to addEventListener directly.
        oldOnClick = layer.onclick;
        layer.addEventListener('click', function (event) {
            oldOnClick(event);
        }, false);
        layer.onclick = null;
    }
    ```

### 触发click流程

#### onTouchStart()

当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的touch操作，即触发ontouchcancel。一般会在ontouchcancel时暂停游戏、存档等操作。因此在调试的时候才会在touchStart之后，就触发了`touchCancel`

直接断点`touchend`，在控制台打印，可以看到`touchstart`也是触发的了、

1. 判断是不是单点触发

    ```javascript
    if (event.targetTouches.length > 1) {
        return true;
    }
    ```

2. 获取目标对象和`touch`事件对象

    ```javascript
    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];
    ```

3. 根据`touch`事件对象，设置一些初始属性

    ```javascript
    this.trackingClick = true; //标识跟踪该次点击
    this.trackingClickStart = event.timeStamp;//点击开始的时间
    this.targetElement = targetElement;//目标元素

    this.touchStartX = touch.pageX; //x坐标
    this.touchStartY = touch.pageY; //y坐标
    ```

#### onTouchMove()

如果刚触发完touchstart事件马上就触发touchend，说明手指只是轻轻点了一下屏幕，也就是所谓的点击操作。这样即使不监听click事件也能实现点击的侦听。不过这里有一个实际的情况，很多山寨的Android设备屏幕很不灵敏，需要使劲按下才能有所感知。这种情况下一定会触发touchmove事件。所以针对Android设备的点击操作可以适当放宽，比如touchstart和touchend之间可以允许有少量几个touchmove，并且touchmove的距离不能超过多少个像素等等

因此

#### onTcouhEnd()

1. 在`touchend`的时候，执行`this.onTouchEnd`，（上个流程绑定了）

2. 判断是否在追踪该click，在`this.onTouchMove`的时候，如果移动的距离大于边界，则将`this.trackingClick=false`，在`touchend`就不用再判断是否为一个click的行为
    
    this.onTouchMove

    ```javascript
    // If the touch has moved, cancel the click tracking
    if ( 
    this.targetElement !== this.getTargetElementFromEventTarget(event.target) 
        || this.touchHasMoved(event)
        ) {
        this.trackingClick = false;
        this.targetElement = null;
    }
    ```

    this.onTouchEnd

    ```javascript
    if(!this.trackingClick){
        return true;
    }
    ```
3.  获取目标元素标签，需要根据标签名来做一些判断

    ```javascript
    targetTagName = targetElement.tagName.toLowerCase();
    ```

4. 如果是`label`，进行bug修复

5. 执行`this.needsFocus`，针对表单元素的focus和click事件的处理

    1. 先focus表单
    2. 在触发点击事件

6. 针对IOS，滚动层bug修复

7. 判断元素是否需要原生的click，实际上就是有些行为还是要浏览器来执行默认的行为

    1. 表单元素`disabled`，点击不了
    2. `type=file`的控件
    3. video
    4. label

8. 如果不需要，则发送一个click事件

    ```javascript
    event.preventDefault();
    this.sendClick(targetElement, event);
    ```
    
#### sendClick()流程

1. 在一些安卓设备上，必须让一个元素`blured`，才能使创建的`clickEvent`生效

    ```javascript
    if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
    }
    ```

2. 创建`clickEvent`，使用`touch`事件对象的属性来进行初始化

    ```javascript
    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(
            this.determineEventType(targetElement), //bug修复针对select
            true, 
            true, 
            window, 
            1, 
            touch.screenX, 
            touch.screenY, 
            touch.clientX, 
            touch.clientY, 
            false, false, false, false, 0, null);
    ```

3. 创建完成之后，赋予对象一个额外的属性，在`onClick`中可以使用，然后触发点击事件，此时通过`addEventListner`绑定的`click`事件就会触发

    ```javascript
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
    ```

#### onClick()

*addEventListener添加会按照添加顺序执行*

onClick作为第一个注册监听的，因此，是第一个执行的`click`事件的回调函数

1. 特殊情况处理，一般不会执行

    ```javascript
    /*
        It's possible for another FastClick-like library delivered with third-
        party code to fire a click event before FastClick does (issue #44). In 
        that case, set the click-tracking flag back to false and return early. 
        This will cause onTouchEnd to return early.
    */
    if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true;
    }
    ```

2. 特殊情况处理

    ```javascipt
    if (event.target.type === 'submit' && event.detail === 0) {
        return true;
    }
    ```

3. 执行`onMouse`，

    ```javascript
    //创建时，附带的一个属性
    if (event.forwardedTouchEvent) {
        return true;
    }
    ```

4.  最后返回为真

    ```javascript
    return permitted; //true
    ```

注意：在这里的`return`的true或false并不会影响绑定的其他回调函数的执行