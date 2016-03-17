# JavaScript 小技巧

## 实现继承

```javascript
function Shape(){}

function Rect(){}

//方法1
Rect.prototype = new Shape();

//方法2
Rect.prototype = Shape.prototype;

//方法3
Rect.prototype = Object.create(Shape.prototype);
```

### 优缺点

以上方法都可以正确设置原型链继承。

1. 方法1

    优点：
    缺点：

2. 方法2

    优点：
    缺点：

3. 方法3

    优点：
    缺点：

### 修改