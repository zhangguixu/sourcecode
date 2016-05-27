# React基础

> http://facebook.github.io/react/docs/getting-started.html

## React简介

React发源自Facebook的PHP框架XHP的一个分支。XHP作为一个PHP框架，旨在每次有请求进来时渲染整个页面。React的产生就是为了把这种重新渲染整个页面的PHP式工作流带到客户端应用中来。

React的本质上是一个“状态机”，可以帮助开发者管理复杂的随着时间而变化的状态。React只关心两件事：

1. 更新DOM
2. 响应事件

它并不处理Ajax、路由和数据存储，因此它并不是一个MVVM框架。

React最大的特点在于采用了虚拟DOM的机制，使用了非常高效的算法，计算出虚拟页面当前版本和新版间的差异，基于这些差异对DOM进行必要的最少的更新。而采取这种做法的目的就是最小化重绘，避免不必要的DOM操作（这两点是公认的性能瓶颈）。

React实现了组件化开发的思想，践行了Web Components的理念。

## 基础

###[1. JSX](./jsx.md)

###[2. 组件的生命周期](./components.md)

## 深入了解

###[1. virtual dom](./virtual-dom.md)

###[2. web components](./web-components.md)

