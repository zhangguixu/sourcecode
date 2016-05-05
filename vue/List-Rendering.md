# 列表渲染

## v-for

可以使用`v-for`指令基于一个数组渲染一个列表。这个指令使用特殊的语法，形式为`item in items`，`items`是数据数组，`item`是当前数组元素的别名。

在v-for块内我们能完全访问父组件作用域内的属性，此外还有一个特殊变量`$index`

```html
<ul id="example-1">
    <li v-for="item in items">
      {{ parentMessage}} - {{ $index }} - {{ item.message }}
    </li>
</ul>
```

```javascript
var example1 = new Vue({
    el : '#example-1',
    data : {
        parentMessage : 'Parent',
        items : [
            { message : 'Foo' },
            { message : 'Bar' }
        ]
    }
});
```

此外，可以为索引指定一个别名

```html
<div v-for="(index,item) in items">
    {{ index }}
</div>
```

在1.0.17开始可以使用`of`分隔符

```html
<div v-for="item of items"></div>
```

## template v-for

```html
<ul>
    <template v-for="item in items">
        <li> {{ item.message }} </li>
        <li class="divider"></li>
    </template>
</ul>
```

## 数组变动检测

### 变异方法

Vue.js包装了被观察数组的变异方法，故它们能触发视图更新，被包装的方法有：

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

*数组使用这些方法更新数据的同时也会更新视图*

### 替换数组

非变异方法有

* filter()
* concat()
* slice()

在使用非变异方法时，可以直接用新数组替换旧数组

```javascript
example1.items = example1.items.filter(function(item){
    return item.message.match(/Foo/);
})
```

*Vue.js实现了一些启发算法，以最大化复用DOM元素，因而用另一个数组替换数组是一个非常高效的操作。*

### track-by

当使用全新对象替换数组时，因为`v-for`默认可以通过数据对象的特征来决定对已有作用域和DOM元素的复用程度，为了避免导致重新渲染整个列表，可以赋予每个对象唯一的ID属性和`track-by`给Vue.js一个提示，提高已有实例的复用率。

例如，有数据：

```javascript
{
    items : [
        { _uid : '123123131',...},
        { _uid : 'a324asd34',...}
    ]
}
```

可以使用属性`track-by`，提高性能

```html
<div v-for="item in items" track-by="uid"></div>
```

在替换数组的时候，如果Vue.js遇到一个包含`_uid:'123123131'`的新对象，它就知道可以复用这个已有对象的作用域和DOM元素，从而提高了性能。

### track-by $index

使用`track-by="$index"`将会强制让`v-for`进入原位更新模式：片段不会被移动，而是简单地以对应索引的新值刷新。

【暂时理解不能】？？？

### 问题

因为JavaScript的限制，Vue.js不能检测到下面数组的变化：

1. 直接用索引设置元素，

    为了解决这个问题，Vue.js扩展了观察数组，为它添加一个`$set()`方法

    ```javascript
    example1.items.$set(0,{childMsg : 'Changed!'});

    //相当于原生的
    example1.items[0] = {childMsg : 'Changed!'}
    ```

2. 修改数据的长度


**$remove()**

Vue.js还为观察数组添加了`$remove()`方法，用于从目标数据中查找并删除元素

```javascript
this.items.$remove(item)
```

相当于

```javascript
var index = this.items.indexOf(item);
if(index !== -1){
    this.items.splice(index,1);
}
```

## 对象 v-for

`v-for`也可以用于对象，有特殊属性`$index`和`$key`

```html
<ul id="repeat-object">
    <li v-for="value in object">
        {{ $key }} : {{ value }}
    </li>
</ul>
```
```javascript
new Vue({
    el : '#repeat-object',
    data : {
        object : {
            firstName : 'John',
            lastName : 'Doe',
            age : 30
        }
    }
});
```

也可以给对象的键提供一个别名

```html
<div v-for="(key,val) in object">
    {{ key }} {{ val }}
</div>
```

## 值域 v-for

`v-for`也可以接收一个整数

```html
<div id="number">
    <span v-for="n in 10">{{ n }}</span>
</div>
```
```javascript
new Vue({
    el : '#number'
});
```

## 显示过滤/排序的结果

实现过滤/排序的方法有两种

1. 创建一个计算属性，返回过滤/排序过的数组

    这种方法有更好的控制力，也更灵活

2. 使用内置的过滤器`filterBy`和`orderBy`

    优点就是方便






