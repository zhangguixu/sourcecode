# JavaScript 小技巧

## 获取一个范围的随机整数

知识点：

1. Math.random()随机返回[0,1)的任意实数

2. Math.floor()向下取整

```javascript
function getRandom(start,end){
    return Math.floor(Math.random() * (end-start)  + start);
}
```
