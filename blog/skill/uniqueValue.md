# JavaScript 小技巧

## 生成唯一值函数

**利用js的闭包性质**

```javascript
var uniqueValue = (function(){
    var value = 0;
    return function(){
        return value++;
    }
})();
```
