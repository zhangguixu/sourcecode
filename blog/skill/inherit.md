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

### 最佳继承实现

示例：基类Animal

```javascript
function Animal(legs){
    this.legs = legs;
}
Animal.prototype.getLegs = function(){
    console.log('I has ' + this.legs + 'legs');
}
```

继承类Cat

```javascript
function Cat(name,legs){
    Animal.call(this,legs);
    this.name = name;
}
Cat.prototype = Object.create(Animal.protoype);
Cat.prototype.sayName = function(){
    console.log('my name is ' + this.name);
}

//Object.create的兼容性实现
if(!Object.create){
    Object.create = function(o){
        function F(){}; //消除实例化之后所携带的基类的属性
        F.prototypr = o;
        return new F();
    }
}
```