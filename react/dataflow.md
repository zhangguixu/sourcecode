# 数据流

## props和state

**props**

在React中，数据的流向是单向的，从父节点传递到子节点，子节点组件从父节点获取props，进行渲染。如果顶层组件的某个prop改变了，React会递归向下遍历整颗组件树，重新渲染所有使用这个属性的组件。

**state**

React的每个组件内部都有自己的状态，这些状态只能在组件内修改。

**总结**

* 使用props在整个组件树中传递数据和配置
* 避免在组件内部修改this.props或调用this.setProps，把props当作是只读的
* 使用props来做事件处理器，与子组件通信
* 使用state存储简单的视图状态，比如说下拉框是否可见这样的状态
* 使用this.setState来设置状态，而不要使用this.state直接修改状态

### Props

在挂载组件的时候，设置组件的props

```javascript
var surveys = [{title : 'Superheroes'}];
<ListSurveys surveys={surveys} />
```

```javascript
var SaveButton = React.createElement({
    handleClick : function(){},
    render : function() {
        return (
            <a className='button save' onClick={this.handleClick}>Save</a>
        );
    }
})
```

#### PropTypes

通过在组件中定义一个配置对象，React提供一个验证props的方式

```javascript
var SurveyTableRow = React.createElement({
    propTypes : {
        survey : React.PropTypes.shape({
            id : React.PropTypes.number.isRequired
            }).isRequired,
        onClick : React.PropTypes.func
    }
})
```

#### getDefaultProps

getDefaultProps并不是在组件实例化时被调用，而是在React.createClass调用时就被调用了，返回值会被缓存起来。

```javascript
var SurveyTable = React.createClass({
    getDefaultProps : function() {
        return {
            surveys : []
        }
    }
});
```

### state

*state与props的区别在于前者只存在于组件的内部*

state可以用来确定一个元素的视图状态

```javascript
var CountryDropDown = React.createElement({
    getInitialState : function() {
        return {
            showOptions : false
        };
    },
    handleClick : function() {
        this.setState({
            showOptions : true
        });
    },
    render : function() {
        var options;

        if(this.state.showOptions){
            options = (
                <ul className='options'>
                    <li>United States of America</li>
                    <li>New Zealand</li>
                    <li>Denmark</li>
                </ul>
            );
        }

        return (
            <div className="dropdown" onClick={this.handleClick}>
                <label>Choose a country</label>.{options}
            </div>
        );
    }
});
```