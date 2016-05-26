# JSX

## JSX简介

要了解JSX必须先了解语法糖的概念。

### 语法糖

语法糖（Syntactic sugar），也译为糖衣语法，是由英国计算机科学家彼得·约翰·兰达（Peter J. Landin）发明的一个术语，指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。

在JavaScript中常见的语法糖有CoffeeScript，TypeScript，JSX

### 什么是JSX

JSX即Javascript XML，一种在React组件内部构建标签的类XML语法。

*React在不使用JSX的情况下一样可以工作，然后使用JSX可以提高组件的可读性，因此推荐使用JSX*

### 为什么采用JSX

相比于现有的一些MV*框架通常会采用指令（类似于HTML模板）来构建页面的标签结构的做法，React的理念则是认为要做到`关注点分离`，需要将HTML标签以及生成这些标签的代码内在地紧密联系在一起。在React中，你不需要讲整个应用程序甚至单个组件的关注点分离成视图和模板文件。相反，React鼓励采取为每一个关注点创建一个独立的组件，并将所有的逻辑和标签封装在其中。

结合前面介绍的语法糖也就可以理解React为什么使用JSX。

总结起来，JSX的好处有：

1. 允许使用熟悉的语法来定义HTML元素树
2. 提供更加语义化且易懂的标签
3. 程序结构更容易被直观化
4. 抽象了React Element的创建过程（在JSX中的HTML标签并非就直接创建DOM元素）
5. 可以随时掌控HTML标签以及生成这些标签的代码
6. 是原生的Javascript

在这里可以对比一下使用JSX和不使用JSX的情况

```javascript
//不使用JSX
render : function() {
    return React.createElement('div',{className : 'divider'},
        'Label Text',
        React.createElement('hr')
        );
}
//使用JSX
render : function() {
    return (
        <div className='divider'>
            Label Text<hr/>
        </div>
        );
}
```

## JSX与组件





