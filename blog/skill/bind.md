# JavaScript 小技巧

## 绑定作用域

确保函数在正确的作用域中执行，等到正确的结果

ECMAScript5的bind函数的原生实现

```javascript
Function.prototype.bind = Function.prototype.bind || function(context){
    var self = this;
    return function(){
        self.apply(context,arguments);
    }
};
```