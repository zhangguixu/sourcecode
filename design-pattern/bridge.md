# 桥接模式

## 作用

桥接模式的作用在于将实现部分和抽象部分分离开来，以便两者可以独立的变化，在实现API的时候，桥接模式特别有用。

## 例子

forEach函数的实现，用来迭代一个数组。

```javascript
forEach = function (arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++){
        var c = arr[i];
        if(fn.call(c, i, c) === false){
            return false;
        }
    }
}
```

可以看到，forEach函数并不关心fn里面的具体实现，fn里面的逻辑也不会被forEach函数改写影响。

