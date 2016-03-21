# JavaScript 小技巧

## 数组反转

### 思路1

使用栈，后进后出

```javascript
function reverse(array){
    var stack = [],item;
    while((item = array.pop())){
        stack.push(item);
    }
    array = stack;
    return array;
}
```