# 计算属性

在模板中绑定表达式是非常便利的，但是它们实际上只用于简单的操作。模板是为了`描述视图的结构`。在模板中放入太多的逻辑会让模板过重且难以维护。这就是为什么Vue.js将绑定表达式限制为一个表达式。如果需要多于一个表达式的逻辑，应当使用计算属性。

## 基础例子

```html
<div id="example">
    a={{ a }},b = {{ b }}
</div>
```

```javascript
var vm = new Vue({
    el : '#example',
    data : {
        a : 1
    },
    computed : {
        b : function(){
            return this.a + 1
        }
    }
});
```

`vm.b`的值始终取决于`vm.a`的值，当`vm.a`的值发生变化的时候，`vm.b`的值也会跟着变化。

## $watch

Vue.js提供了一个方法$watch，它用于观察Vue实例上的数据变动。

*不过通常更好的办法是使用计算属性而不是一个命令式的$watch回调*

```html
<div id="demo">
    {{ fullName }}
</div>
```

**$watch的实现**

```javascript
var vm = new Vue({
    el : '#demo',
    data : {
        firstName : 'Foo',
        lastName : 'Bar',
        fullName : 'Foo bar'
    }
});
vm.$watch('firstName',function(val){
    this.fullName = val + ' ' + this.lastName;
});
vm.$watch('lastName',function(val){
    this.fullName = this.firstName + ' ' + val;
});
```

**计算属性的实现**

```javascript
var vm = new Vue({
    el : '#demo',
    data : {
        firstName : 'Foo',
        lastName : 'Bar'
    },
    computed : {
        fullName : function(){
            return this.firstName + ' ' + this.lastName;
        }
    }
});
```

*计算属性的实现更为简洁*

## 计算setter

计算属性默认只是`getter`，在需要的时候也可以提供一个setter

```javascript
var vm = new Vue({
    el : '#demo',
    data : {
        firstName : 'Foo',
        lastName : 'Bar'
    },
    computed : {
        fullName : {
            get : function(){
                return this.firstName + ' ' + this.lastName;
            },
            set : function(val){
                var names = val.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
});
```

现在调用`vm.fullName = 'John Doe'`时，setter会被调用，`vm.firstName`和`vm.lastName`也会有相应更新。

