# class与style绑定

数据绑定一个常见需求是操作元素的class列表和它的内联样式。可以使用`v-bind`来进行处理。在`v-bind`用于`class`和`style`时，表达式的结果类型可以是

* 字符串
* 对象
* 数组

## 绑定class

### 对象

```html
<div class="static" v-bind:class="{'class-a':isA,'class-b',isB}">
    绑定类
</div>
```
```javascript
data : {
    isA : true,
    isB : false
}
```

渲染结果为

```html
<div class="static class-a"></div>
```

**直接绑定对象**

```html
<div v-bind:class="classObject"></div>
```
```javascript
data : {
    classObject : {
        'class-a' : true,
        'class-b' : false
    }
}
```

也可以在这里绑定一个返回对象的计算属性。【常用而且强大的模式】

### 数组

我们可以把一个数组传给`v-bind:class`，以应用于一个class列表

```html
<div v-bind:class="[classA,classB]"></div>
```
```javascript
data : {
    classA : 'class-a',
    classB : 'class-b'
}
```
渲染为

```html
<div class="class-a class-b"></div>
```

**条件切换class**

1. 三元表达式

    ```html
    <div v-bind:class="[classA, isB ? classB : '']"></div>
    ```

    当`isB`为`true`时添加`classB`

2. 在1.0.19+中，可以在数据语法中使用对象语法

    ```html
    <div v-bind:class="[classA,{classB:isB,classC:isC}]"></div>
    ```

## 绑定style

### 对象语法

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
````

*CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）*

**直接绑定一个样式对象，让模板更清晰**

```html
<div v-bind:style="styleObject"></div>
```
```javascript
data : {
    styleObject : {
        color : 'red',
        fontSize : '13px'
    }
}
```

### 数组语法

`v-bind:style`的数组语法可以将多个样式对象应用到一个元素上

```html
<div v-bind:style="[styleObjectA,styleObjectB]"></div>
```

### 自动添加前缀

当`v-bind:style`使用需要厂商前缀的CSS属性时，如transform，Vue.js会自动侦测并添加相应的前缀。





