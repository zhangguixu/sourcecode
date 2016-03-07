# JavaScript之MVC

## MVC

### 概念

MVC是指Model-View-Controller，是一种把信息展示逻辑和用户交互分离的计算机用户界面开发模式。

1. Model包含应用的数据和业务逻辑

2. Contrller负责把用户的输入，转换为命令传递给Model和View

3. View就是用户界面

### JavaScript的MVC

1. Model

    存放应用的所有数据对象，只需包含数据及直接和这些数据相关的逻辑。当控制器从服务器抓取数据或创建新的记录时，它就将数据包装成模型实例。

2. Controller

    控制器是模型和视图之间的纽带，控制器从视图获得事件和输入，对它们进行处理，并相应地更新视图。当页面加载时，控制器会给视图添加事件监听，比如监听表单提交或者按钮点击，然后当用户和你的应用产生交互时，控制器中的事件触发器开始工作了。

3. View

    视图层是呈现给用户的，用户与之产生交互。在JavaScript应用中，视图大都是由HTML、CSS和JavaScript模版组成的。除了模版中简单的条件语句之外，视图不应当包含任何其他逻辑。

## 30行代码实现MVC

> 来源：http://www.cnblogs.com/front-end-ralph/p/5190442.html

### 从代码讲解

1. MVC的基础是`观察者模式`，这是实现model和view同步的关键

    1. 实现model

    ```javascript
    function Model(value){
        this._value= typeof value === 'undefined' ? '' : value;
        this._listeners = [];
    }
    Model.prototype.set = function (value) {
        var self = this;
        self._value = value;
        //model中的值改变时，应通知注册过的回调函数
        //按照JavaScript事件处理的一般机制，我们异步地调用回调函数
        //如果setTimeout影响性能，也可以采用requestAnimationFrame
        setTimeout(function(){
            self._listener.forEach(function(listener){
                listener.call(self,value);
            });
        });
    };
    Model.prototype.watch = function (listener) {
        //注册监听的回调函数
        this._listener.push(listener);
    };
    ```

    2. 页面调用

    ```html
    <div id="div1"></div>
    ```

    ```javascript
    (function () {
        var model = new Model();
        var div1 = document.getElementById('div1');

        model.watch(function (value) {
            div1.innerHTML = value;
        });

        model.set('hello,this is a div');
    })();
    ```

    借助`观察者模式`，我们实现了在调用model的set方法改变其值的时候，模版也同步地更新。但是这种实现很别扭，因为必须手动监听model值的改变，并传入一个回调函数。

2. 实现bind方法，绑定model和view

    为了实现让view和model更简单的绑定我们可以

    ```javascript
    Model.prototype.bind = function (node) {
        //将watch的逻辑和通用的回调函数放到这里
        this.watch(function (value) {
            node.innerHTML = value;
        });
    }
    ```

    ```html
    <div id="div1"></div>
    <div id="div2"></div>
    ```

    ```javascript
    //逻辑代码
    (function () {
        var model = new Model();
        model.bind(document.getElementById('div1'));
        model.bind(document.getElementById('div2'));
        model.set('this is a div');
    })();
    ```

    通过一个简单的封装，view和model之间的绑定已经初见雏形。

3. 实现controller，将绑定从逻辑代码中解耦

    所谓的"逻辑代码"就是一个框架逻辑和业务逻辑`耦合度很高`的代码段,现在对其进行分解，将绑定的逻辑交给框架完成。

    ```javascript
    function Controller(callback){
        var models = {};
        //找到所有有bind属性的元素
        var views = document.querySelectorAll('[bind]');
        //将view处理为普通数组
        views = [].prototype.slice.call(views,0);

        views.forEach(function (view) {
            var modelName = view.getAttribute('bind');
            //取出或新建该元素所绑定的model
            models[modelName] = models[modelName] || new Model();
            //完成该元素和指定model的绑定
            model[modelName].bind(view);
        });

        //调用controller的具体逻辑，将models传入，方便业务处理
        callback.call(this,model);
    }
    ```

    由于在js中没有annotation(注解)，可以在view中做层标记，`使用HTML的标签属性就是一个简单有效的方法`。

    ```html
    <div id="div1" bind="model1"></div>
    <div id="div2" bind="model2"></div>
    ```

    ```javascript
    //逻辑代码
    new Controller(function (models) {
        var model1 = models[model1];
        model1.set('this is a div');
    });
    ```

