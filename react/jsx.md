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

## JSX语法

JSX是作为一种ECMAScript特性来设计的

### 属性

```html
<!-- html写法 -->
<div id="some-id" class="some-class-name"></div>

<!-- JSX写法 -->
<div id={this.getSurveyId()} className={classes}></div>
```

### 条件判断

在JSX中是无法使用if语句，要进行条件判断，可以使用下列方法

* 三目运算符
* 设置一个变量并在属性中引用它
* 将逻辑转化到函数中
* 使用&&运算符

1. 三目运算符

    ```javascript
    render : function() {
        return (
            <div className={
                this.state.isComplete ? 'is-complete' : ''
             }>...</div>
        );
    }
    ```

    *三目运算符可能显得笨重又麻烦*

2. 使用变量

    ```javascript
    getIsComplete : function() {
        return this.state.isComplete ? 'is-complete' : ''
    },
    render : function() {
        var isComplete = this.getIsComplete();
        return <div className={isComplete}></div>
    }
    ```

3. 使用函数

    ```javascript
     getIsComplete : function() {
        return this.state.isComplete ? 'is-complete' : ''
    },
    render : function() {
        return <div className={this.getIsComplete()}></div>
    }
    ```

4. 使用&&运算符

    ```javascript
    render : function() {
        return <div className={this.state.isComplete && 'is-complete'}></div>
    }
    ```

### 非DOM属性

在JSX中存在一些特殊的属性

* key
* ref
* dangerouslySetInnerHTML

1. key

    key是一个可选的唯一标识符，通过它可以给组件设置一个独一无二的键，并确保它在一个渲染周期中保持一致，使得React能够更加智能地决定应该重用一个组件，还是销毁并重新创建一个组件，进而提升渲染性能。

    设想这样一个场景，在程序运行的过程中，组件可能会在组件树中调整位置，比如当用户在进行搜索时，或者当一个列表中的物品被增加、删除时，这些情况下，组件可能并不需要被销毁并重新创建，这个时候key就可以发挥比较大的作用，React能够匹配对应的键并进行相应的移动，且不需要完全重新渲染DOM。

2. ref

    ref允许父组件在render方法之外对子组件的一个引用。

    ```javascript
    render : function() {
        return (<div>
                    <input ref="myInput" />
                </div>
                );
    }
    ```

    这样就可以在组件中的任何地方使用this.refs.myInput获取这个引用了。通过这个引用获取到的对象被称为`支持实例`，它并不是真的DOM，而是React在需要时用来创建DOM的一个描述对象。

    *可以使用this.refs.myInput.getDOMNode()访问真实的DOM节点*

3. dangerouslySetInnerHTML

    有时候需要将HTML内容设置为字符串，尤其是使用了通过字符串操作DOM的第三方库时，为了提升React的互操作性，这个属性允许你使用HTML字符串。

    要使用这个属性，需要将字符串设置到一个主键为`_html`的对象里

    ```javascript
    render : function() {
        var htmlString = {
            _html : "<span>an html string</span>"
        };
        return <div dangerouslySetInnerHTML={htmlString}></div>
    }
    ```

### 事件

在JSX中，通过属性设置事件对应的事件处理程序

```javascript
handleClick : function(event) {},
render : function() {
    return (
        <div onClick={this.handleClick}></div>
    );
}
```

*React自动绑定了组件所有方法的作用域，永远都不需要手动绑定*

### 注释

JSX本质上就是JavaScript

1. 作为子节点的注释

    ```javascript
    <div>
        {/*
            多行注释
        */}
        <input type="text"/>
    </div>
    ```

2. 作为内联属性的注释

    ```javascript
    <div>
        <input
            /*
                多行注释
            */
            name="email"
        />
    </div>

    <div>
        <input
            name="email" //单行注释
        />
    </div>
    ```

### 特殊属性

由于JSX会转换为原生的JavaScript函数，因此有一些关键词是不能用的，常见有的

* for -> htmlFor
* class -> className

### 内联样式style

React把所有的内联样式都规范化为了驼峰形式，与JavaScript中的DOM的style属性一致

```javascript
render : function() {
    var styles = {
        borderColor : '#999',
        borderThickness : '1px'
    };
    return (
        <div style={style}>..</div>
    );
}
```

## React without JSX

所有的JSX的标签最后都会被转换为原生的JavaScript，如果不使用JSX，则需要知道在React中创建元素时需要进行以下步骤：

* 定义组件类

    使用React.createElement来创建HTML元素

    ```javascript
    var DividerClass = React.createClass({
        displayName : 'Divider',
        render : function() {
            return React.createElement('div',{className : 'divider'},
                        React.createElement('h2',null,this.props.children),
                        React.createElement('hr',null));
        }
    });
    ```

    React在React.DOM.*命名空间提供了一系列的工厂来创建普通的HTML元素

    ```javascript
    var R = React.DOM;
     var DividerClass = React.createClass({
        displayName : 'Divider',
        render : function() {
            return R.div({className : 'divider'},
                        R.h2(null,this.props.children),
                        R.hr());
        }
    });
    ```

* 直接调用React.createElement

    在创建了组件类之后，可以使用这个方法直接创建一个实例

    ```javascript
    var divider = React.createElement(DividerClass,null,'Questions');
    ```

* 创建一个工厂，再用工厂创建实例

    ```javascript
    var Divider = React.createFactory(DividerClass);
    var divider = Divider(null,'Questions');
    ```




