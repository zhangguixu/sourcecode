# Vue.js

> 项目主页: http://vuejs.org/

## 概述

Vue.js（读音 /vjuː/, 类似于 view）是一个构建数据驱动的 web 界面的库。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。

Vue.js 自身不是一个全能框架——它只聚焦于视图层。因此它非常容易学习，非常容易与其它库或已有项目整合。另一方面，在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。

*Vue.js的文档做的相当好，因此基本内容都主要浏览主页就可以知道了。*

### 响应的数据绑定

Vue.js 的核心是一个响应的数据绑定系统，它让数据与 DOM 保持同步非常简单。在使用 jQuery 手工操作 DOM 时，我们的代码常常是命令式的、重复的与易错的。Vue.js 拥抱`数据驱动`的视图概念。通俗地讲，它意味着我们在普通HTML模板中使用特殊的语法将 DOM “绑定”到底层数据。一旦创建了绑定，DOM将与数据保持同步。每当修改了数据，DOM 便相应地更新。这样我们应用中的逻辑就几乎都是直接修改数据了，不必与DOM更新搅在一起。这让我们的代码更容易撰写、理解与维护。

![mvvm](./img/mvvm.png)

```html
<div class="example">
    Hello {{name}} !
</div>
```
```javascript
var exampleData = {
    name : 'Vue.js'
};
var exampleM = new Vue({
    el : '#example',
    data : exampleData
});
```

我们只需要修改`exampleData`，就可以改变视图显示的数据

### 组件系统

组件系统是Vue.js另一个重要概念，因为它提供了一种抽象，让我们可以用独立可复用的小组件来构件大型应用。

![components](./img/components.png)

```html
<div class="app">
    <app-nav></app-nav>
    <app-view>
        <app-sidebar></app-sidebar>
        <app-content></app-content>
    </app-view>
</div>
```

组件系统是用Vue.js构建大型应用的基础。另外,Vue.js生态系统也提供了高级工具与多种支持库，它们和Vue.js一起构成了一个更加“框架”性的系统。

> 更多教程：http://vuejs.org.cn/guide/overview.html
