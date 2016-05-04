# 条件渲染

## v-if

```html
<h1 v-if="ok">Yes</h1>
```

## template v-if

想要切换多个元素，可以使用`template`元素当作包装元素，并在上面使用`v-if`

```html
<template v-if="ok">
    <h1>Title</h1>
    <p>1</p>
    <p>2</p>
</template>
```

## v-show

不同于`v-if`，有`v-show`的元素会始终渲染并保持在DOM中（简单的切换元素的display属性）

```html
<h1 v-show="ok">Hello</h1>
```

*v-show不支持<template>语法*

## v-else

可以用`v-else`指令给`v-if`或`v-show`添加一个`else`块

```html
<div v-if="Math.random()">
    Sorry
</div>
<div v-else>
    Not sorry
</div>
```

*v-else元素必须立即跟在v-if或v-show元素的后面，否则它不能被识别*

## v-if vs v-show

1. v-if是真实的条件渲染，会确保条件块在切换当中合适地销毁与重建条件块内的事件监听器和子组件。
2. v-if是`惰性的`，在条件第一次变为真时才开始局部编译（编译会被缓存起来）
3. v-show只是简单地基于css的切换

因此可以看出

1. v-if有更高的切换消耗
2. v-show有更高的初始渲染消耗（频繁切换的选择）
