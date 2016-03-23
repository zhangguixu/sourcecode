# Backbone

## 一、Backbone概述

###  1-1 Backbone的整体构成

![overview](./img/overview.png)

### 1-2 Backbone的MVC结构

![mvc](./img/mvc.jpg)

### 1-3 特点

1. MVC结构化

2. 继承特性

3. 事件统一管理

4. 绑定页面模版

5. 服务端无缝交互

### 1-4依赖库

加载顺序很重要，先加载backbone的依赖的库，再加载backbone。


## 二、目录

#### <a href="./underscore.md">1. 依赖库underscore</a>

* underscore的API

#### <a href="./events.md">2. Backbone.Events</a>

* API结构

#### <a href="./model.md">3. Backbone.Model</a>

* Backbone.Model常见操作

* 同步数据到服务器

#### <a href="./collection.md">4. Backbone.Collection</a>

* 创建集合对象

* 集合对象的操作方法

* 与服务器的交互方法

#### <a href="./view.md">5. Backbone.View</a>

* 创建视图对象

* 事件的统一管理

* 视图中的模版

#### <a href="./router.md">6. router & history</a>

* 浏览器导航基础

* 绑定导航地址

* router的常用方法

* history的stop方法