# 方法与事件处理器

## 方法处理器

用`v-on`指令监听DOM事件，在`methods`中实现事件处理程序

```html
<div id="example">
    <button v-on:click="greet">Greet</button>
</div>
```
```javascript
var vm = new Vue({
    el : '#example',
    data : {
        name : 'Vue.js'
    },
    methods : {
        greet : function(e){
            alert('Hello ' + this.name + '!');
            alert(e.target.tagName);
        }
    }
});

//也可以手动调用
vm.greet();
```

## 内联语句处理器

除了直接绑定一个方法，也可以用内联JavaScript语句

```html
<div id="example">
    <button v-on:click="say('hi')">Say Hi</button>
    <button v-on:click="say('what')">Say What</button>
</div>
```
```javascript
new Vue({
    el : '#example',
    methods : {
        say : function(msg){
            alert(msg);
        }
    }
});
```
可以使用特殊变量`$event`来传入原生的DOM事件

```html
<button v-on:click="say('what',$event)">Say What</button>
```
```javascript
methods : {
    say : function(msg,e){
        //现在可以访问原生的事件对象
    }
}
```

## 事件修饰符

在事件处理中经常需要调用`event.preventDefault()`或`event.stopPropagation()`。为了让方法中进行纯粹的数据逻辑而不用处理DOM事件细节（比较优秀的做法），Vue.js为`v-on`提供两个事件修饰符：`.prevent`与`.stop`

```html
<!--阻止冒泡-->
<a  v-on:click.stop="doThis"></a>

<!--阻止默认行为-->
<form  v-on:click.prevent="onSubmit"></form>
```

此外，1.0.16添加了两个修饰符：`.capture`和`.self`

```html
<!--使用capture模式-->
<div v-on:click.capture="doThis"></div>

<!--当事件在该元素本身触发时触发回调-->
<div v-on:click.self="doThis"></div>
```

## 按键修饰符

在监听键盘事件时，我们经常需要检测keyCode，Vue.js允许为`v-on`添加按键修饰符

```html
<input type="text" @keyup.13="submit">
```

Vue.js为最常用的按键提供别名

* enter
* tab
* delete
* esc
* space
* up
* down
* left
* right

1.0.8+ : 支持单字母按键别名

1.0.17+ : 可以自定义按键别名

```javascript
//可以使用 @keyup.f1
Vue.directive('on').keyCodes.f1 = 112
```

## 说明

`v-on`指令的事件监听方式并没有违背`separation of concern`的理念（看看编译之后的html代码就知道了），所有Vue.js事件处理方式和表达式都严格绑定在当前视图的ViewModel上，不会导致任何维护困难。

此外，使用`v-on`的好处还有

1. 扫一眼HTML模板便能轻松定位在JavaScript代码里对应的方法
2. 无须在JavaScript里手动绑定事件，在ViewModel代码可以是非常纯粹的逻辑，和DOM完全解耦，更易于测试
3. 当一个ViewModel被销毁时，所有事件处理器都会自动被删除（提供了一个管理）




