# 数据绑定

## 插值

### 文本

```html
<span>Message: {{ msg }}</span>
```

Mustache标签会与对象的`msg`属性绑定，并且被替换掉，每当属性变化时，它也会更新。

**单次插值**

即今后的数据变化不会引起插值更新。

```html
<span>This will never change: {{* msg }}</span>
```

### html

```html
<div>{{{ raw_html }}}</div>
```

内容以 HTML 字符串插入——数据绑定将被忽略。如果需要复用模板片断，应当使用`partials`。

*注意XSS攻击*

### HTML 属性

```html
<div class="item-{{ id }}"></div>
```

在Vue.js指令和特殊属性内不能用插值

## 绑定表达式

`绑定表达式`：放在Mustache标签内的文本，它可以是

* 简单的Javascript表达式
* 可选的一个或多个过滤器

### Javascript表达式

```html
{{ number + 1 }}

{{ ok ? 'Yes' : 'No' }}

{{ message.split('').reverse().join() }}
```

注意：每个绑定只能包含单个表达式

```html
<!--无效的语句-->
{{ var a = 1 }}

{{ if(ok){return msg;} }}
```

### 过滤器

在表达式后添加可选的`过滤器`，以`管道符`指示

```html
{{ message | capitalize }}
```

## 指令

指令 (Directives) 是特殊的带有前缀 v- 的特性。作用是当其表达式的值改变时把某些特殊的行为应用到DOM上。

```html
<p v-if="greeting">Hello!</p>
```

这里的`v-if`指令将根据表达式`greeting`值的真假删除/插入p元素

### 参数

有些指令可以在其名称后面带一个参数，中间用冒号隔开。

```html
<a v-bind:href="url"></a>

<!--等价的写法-->
<a href="{{ url }}"></a>
```

### 修饰符

修饰符是以`.`开始的特殊后缀，用于表示指令应当以特殊的方式绑定

```html
<a v-bind:href.literal="/a/b/c"></a>
```

这里的`.literal`就是一个修饰符，告诉指令将它的值解析为一个字面字符串而不是一个表达式。

## 缩写

Vue.js 为两个最常用的指令 v-bind 和 v-on 提供特别的缩写。

1. v-bind

    ```html
    <a v-bind:href="url"></a>

    <a :href="url"></a>
    ```

2. v-on

    ```html
    <a v-on:click="doSomething"></a>

    <a @click="doSomething"></a>
    ```


