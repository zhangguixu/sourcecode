# Backbone

## 一、初识Backbone

### 1-1 Backbone的整体构成

![overview](./img/overview.png)

### 1-2 Backbone的MVC结构

![mvc](./img/mvc.jpg)

### 1-3 特点

1. MVC结构化

2. 继承特性

3. 事件统一管理

    在视图模型中，开发者可以通过以下代码对事件进行统一管理：

    ```javascript
    events : {
        'click #btnAdd' : 'btnAdd_Click'
    }
    ```

4. 绑定页面模版

5. 服务端无缝交互

### 1-4 依赖库

#### 1-4-1 加载

加载顺序很重要，先加载backbone的依赖的库，再加载backbone。

## 二、依赖库underscore

依赖库underscore是一个非常简洁、实用的JavaScript库，包含60多个独立的函数，这些函数可以在不扩展原生JavaScript对象的情况下，为代码的开发提供丰富的使用功能。

### underscore的类型模块

![underscore](./img/underscore.jpg)

<a href="./underscore.md">Underscore API</a>

## 三、Backbone.Events

### API结构

![events](./img/events.jpg)

<a href="./events.md">Events API</a>

## 四、Backbone.Model

Model在Backbone中为数据模型，是一个最基础、最根本的数据基类，用于原始数据、底层方法的封装和定义。它的结构类似于关系数据库中的映射对象，可以装载数据库中的记录信息，并通过自定义的方法，完成数据的操作之后，将数据同步到服务器中。

### 4-1 Backbone.Model常见操作

<a href="./model.md">数据管理操作</a>

### 4-2 同步数据到服务器

<a href="./model.md">同步数据</a>