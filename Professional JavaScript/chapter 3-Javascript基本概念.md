#JavaScript 高级程序设计

##JavaScript 基本概念
    
### 语法
***

**区分大小写**

**标识符：驼峰大小写格式**

**注释**
    
    // 单行注释
    /*
     *多行
     *注释
    */

**严格模式**

>ECMAScript5引入了严格模式（strict mode）,它是为了JavaScript定义了一种不同的解析与执行模型。在严格模式下，ECMAScript3中的一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误

    "use strict"

*严格模式下，JavaScript的执行结果会有很大不同*

**语句**
    
    语句以一个分号结尾，如果省略分号，则有解析器确定语句的结尾

### 关键字和保留字
***

**关键字（*号表示第5版新增）**

```JavaScript
    break do instanceof typeof
    case else new var
    catch finally return void
    continue for switch while
    debugger* function this with
    default if throw
    delete in try
```

**保留字**

```javascript
    abstract enum int short
    boolean export interface static
    byte extends long super
    char final native synchronized
    class float package throws
    const goto private transient
    debugger implements protected volatile
    double import public
```

### 变量
***

>ECMAScript的变量是松散类型的（松散类型就是可以用来保存任何类型的数据）

    var 变量名

*如果省略var，变量则会变成全局变量，在严格模式下，给未经声明的变量赋值会导致
ReferenceError错误*

### 数据类型
***

5种基本类型：

* number
* string
* undefined
* null
* boolean

1种复杂数据类型：Object

***不支持任何创建自定义类型的机制***

### 操作符
***
    
typeof操作符
    
    检测给定变量的数据类型
        'undefined' --- 值未初始化 或 未定义
        'boolean'   --- 布尔值
        'number'    --- 数值
        'string'    --- 字符串
        'function'  --- 函数
        'object'    --- 对象 null 

===严格相等

```javascript
    var a,b;
    a = b = {x:1};
    a == b;//true
    a === b; //true
```
### 语句
***

for in 语句

    是一种精确的迭代语句，可以用来枚举对象的属性
        for (property in expression) statement

with
    
    将代码的作用域设置到一个特定的对象中
            with (expression) statement

```javascript
    var qs=location.search.substring(1);
    var hostName=location.hostname;

    with(location){
        var qs=search.substring(1);
        var hostName=hostname;
    }
```

            注：大量使用with语句会导致性能下降，同时会给调试代码造成困难，不建议使用

###函数
***

>在函数体内通过arguments对象来访问参数数组，从而获取传递给函数的每一个参数ECMAScript的`所有参数传递的都是值`，不可能通过引用传递参数

**arguments**

特点

    1. 类数组，常常需要进行数组化
    
    2. 值永远与对应命名参数的值保持同步

```javascript
    function test(num){
        arguments[0]=10;
        console.log(num); //10
        num=1;
        console.log(arguments[0]);//1
    }
```

*在严格模式下，arguments对象无法被赋值，重写argumens的值会导致语法错误*

*没有传递值的命名参数将自动被赋予undefined值*

**没有重载**

>ECMAScript函数不能像传统意义上那样实现重载，因为函数没有签名，因为其参数是有包括0或者多个值的数组来表示，如果在ECMAScript中定义了两个名字相同的函数，该名字只属于后定义的函数

```javascript
    function add(num){
        return num+100;
    }
    function add(){
        return arguments[0]+200;
    }
    var result=add(1); //201
```

*可以通过检查传入函数中的参数的类型和数量并作不同的反应，可以模拟方法的重载*

##变量、作用域和内存问题

###基本类型和引用类型的值

基本类型
    
    简单的数据段，按值访问，可以操作保存在变量中实际的值
        
引用类型
    
    它的值是保存在内存中的对象，JavaScript不允许直接访问内存中的位置，也就是说
    不能直接操作对象的内存空间，在操作对象时，实际上是在操作对象而不是实际的对
    象

#### 动态的属性

引用类型的值，我们可以为其任意添加修改删除其属性和方法

```javascript
    var person={};
    person.name='zhang';
    console.log(person.name);//zhang
```

基本类型，我们不能添加任何属性，尽管不会导致任何错误

```javascript
    var name='zhang';
    name.age=17;
    console.log(name.age); //undefined
```

#### 复制变量值

基本类型：如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新
值，然后把改值复制到为新变量分配的位置上

```javascript
    var num1 = 5;
    var num2 = num1;
    num2=6;
    console.log(num1); //5,两个变量不会有任何的影响，完全是独立的
```

引用类型：当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象
的值复制一份放到为新变量分配的空间中，不同的是，这个值的副本实际上是一个指针，
而这个指针执行存储在堆中的一个对象。

```javascript
    var o1 = {};
    var o2 = o1;
    o1.name = 'zhang';
    console.log(o2.name); //zhang
```

*两个变量实际上引用同一个对象*

#### 传递参数

>ECMAScript中所有的函数的参数都是**按值传递**的。

基本类型：被传递的值会被复制给一个局部变量（即命名参数）

```javascript   
    function add(num){
        num += 10;
        return num;
    }
    var count = 20;
    var result = add(count);
    console.log(count); //20,没有变化
    console.log(result); //30
```

引用类型：把引用类型的值在内存中的地址复制给一个局部变量，因此局部变量的变化会
反映在函数的外部

```javascript
    function setName(obj){
        obj.name = 'zhang';
        obj = new Object();
        obj.name = 'whatever';
    }
    var person = {};
    setName(person);
    console.log(person.name); //zhang
```

*obj和person只是复制了值，共同指向同一个对象，但是他们是完全独立的变量，因此当
obj指向了新的对象，person并没有改变*


#### 检测类型

typeof
    
    1. 检测number,string,boolean,undefined最佳工具
    2. 对于null和Object，都返回'object'，用处不大

instanceof
    
    目的是：知道某个值是什么类型的对象
        result = variable instanceof constructor
    如果变量是给定引用类型（根据原型链）的实例，那么instanceof操作符就会返回
    true
