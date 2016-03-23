# Backbone.View

## Backbone.View

Backbone.View是真正与页面交互，它的核心功能有

1. 处理数据业务逻辑

2. 绑定DOM元素事件

3. 渲染模型或集合数据

### 1. 创建视图对象

1. 添加DOM元素
2. 访问模型对象
3. 访问集合对象

<a href="./demo/view.html">demo</a>

### 2.  视图中的模版

1. 默认模版

    ```html
    <ul id="ulshowstus"></ul>
    <script type="text/template" id="stus-tpl">
        <li>编号：<%=Code %></li>
        <li>姓名：<%=Name %></li>
        <li>分数：<%=Score %></li>
    </script>
    ```

2. 自定义模版

    可以调用underscore框架中的templateSettings函数，使用正则表达式自定义模版变量的标记。

    ```javascript
    _.tempateSettings = {
        interpolate : /\{\{.+?\}\}/g
    };
    ```

<a href="./demo/template.html">demo</a>

### 3. 视图中的元素事件

1. 事件绑定

    ```javascript
    events : {
        'click div#backbone' : 'togcls',
        'click input#btnshow' : 'toggle'
    }
    ```

    事件名 元素 : 事件处理函数

2. 动态绑定和取消

    ```javascript
    delegateEvents([events])
    undelegateEvents()
    ```
