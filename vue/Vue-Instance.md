# Vue实例

## 构造器

1. 每个Vue.js应用的起步都是通过构造函数`Vue`创建一个Vue的`根实例`。

2. Vue实例就是MVVM模式中的`ViewModel`。

**语法**

1.  生成实例，需要传入一个选项对象，包含数据，模板，挂载元素，方法等

    ```javascript
    var vm = new Vue({
        //选项
    });
    ```

2. 扩展Vue构造器，创建可复用的`组件构造器`

    ```javascript
    var MyComponent = Vue.extend({
        //扩展选项
    });
    var myComponentInstance = new MyComponent();
    ```

## 属性与方法

1. 每个Vue实例都会代理其`data`对象里所有的属性

2. 只有在实例时，data中的属性是`响应`，如果在实例创建之后添加的新的属性到实例上，它不会触发视图更新？？

3. Vue实例暴露一些有用的实例属性与方法，这些都有前缀`$`

```javascript
var data = {a:1};
var vm = new Vue({
    el : '#example',
    data : data
});
vm.$data === data; //true
vm.$watch('a',function(){});
```

## 实例生命周期

![lifecycle](lifecycle.png)

在一个过程中，可以设置一些`生命周期钩子`。

* created
* compiled
* ready
* destroyed

*钩子中的this指向调用它的Vue实例*




