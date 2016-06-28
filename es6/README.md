# ES6 快速了解

> http://webapplog.com/es6/comment-page-1/

快速了解ES6的常见特性

## 如何使用ES6

*目前在chrome 51.0.2704.103，除模块化之外其余代码都可以运行*

[并不是所有的浏览器都完全支持](http://kangax.github.io/compat-table/es6/)，因此要使用ES6，可能需要一个编译器：babel

在nodejs中，可以用构建工具或者独立的Babel模块babel-core来编译js文件


## ES6十大特性

* Default Parameters（默认参数）
* Template Literals（模版文件）
* Multi-line String（多行字符串）
* Destructuring Assignment（解构赋值）
* Enhanced Object Literals（增强的对象文本）
* Arrow Functions（箭头函数）
* Promises
* Block-Scoped Constructs Let and Const（块级作用域）
* Classes（类）
* Modules（模块）

### 1. Default Parameters

参数需要进行非空校验，选定默认值，一般使用`||`

```javascript
var link = function (height,color,url) {
    var height = height || 50;
    var color = color || 'red';
    var url = url || 'qq.com';
}
```

在ES6，可以直接把默认值放在函数申明中

```javascript
var link = function(height = 50,color = 'red',url='qq.com'){
    //
}
```

*类Ruby的语法*

### 2. Template Literals

如果需要拼接一个字符串，一般的做法

```javascript
var name = 'Your name is ' + first + ' ' + last + '.';
var url = 'qq.com/' + id; 
```

在ES6中，可以使用语法`${NAME}`，并把它放在反引号里

```javascript
var name = `Your name is ${first} ${last} .`;
var url = `qq.com/${id}`;
```

### 3. Multi-line Strings

拼接多行字符串

```javascript
var roadPoem = 'Then took the other, as just as fair,nt'
    + 'And having perhaps the better claimnt'
    + 'Because it was grassy and wanted wear,nt'
    + 'Though as for that the passing therent'
    + 'Had worn them really about the same,nt';
```

在ES6中，用反引号\`\`

```javascript
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`;
```

### 4. Destructuring Assignment

对象属性的赋值，通常的做法是

```javascript
var data = $('body').data(), //data has properties house and mouse
    house = data.house,
    mouse = data.mouse;
```

在ES6中，可以这样写

```javascript
var {house,mouse} = $('body').data();
```

对于数组也可以有这种便利的写法

```javascript
var a = [1,2];
var [v1,v2] = a;
```

### 5. Enhanced Object Literals

一个典型的ES5对象文本

```javascript
var serviceBase = {port:3000,url:'qq.com'},
    getAccounts = function(){return[1,2,3]};

var accountService = Object.create(serviceBase);
accountServiceES5 = {
    getAccounts : getAccounts,
    toString : function(){
        return JSON.stringify(this.valueOf());
    },
    getUrl : function() {
        return 'http://' + this.url + ':' + this.port
    },
    valueOf_1_2_3 : getAccounts()
}
```

在ES6，可以使用以下便利的写法

```javascript
var accountServiceES6 = {
    __proto__ : serviceBase, //便利的写法
    getAccounts, //便利的写法
    toString : function(){
        return JSON.stringify(this.valueOf());
    },
    getUrl : function() {
        return 'http://' + this.url + ':' + this.port
    },
    valueOf_1_2_3 : getAccounts()
}
```

### 6. Arrow Functions

为了保证this的指向，我们通常需要

```javascript
var logUpperCase = function() {
    var _this = this; //that = this,_self =this
    this.string = this.string.toUpperCase();

    return function() {
        return console.log(_this.string);
    }
}
```

在ES6中，仍然保留以前的function的传递方式，但是引进了`箭头函数`，可以保证this的指向。

```javascript
var logUpperCase = function() {
    this.string = this.string.toUpperCase();
    return () => console.log(this.string);
}

logUpperCase.call({string:'ES6 rocks'})();
```

*以后再详细学习各种写法*

### 7. Promises

在平时，各种回调嵌套回调是很常见的，例如

```javascript
setTimeout(function(){
    console.log('1');
    setTimeout(function(){
        console.log('2')
    },1000);
},1000);
```

在ES6中，使用`promises`重写

```javascript
var wait1000 = () => new Promise( (resolve,reject) => 
                                {setTimeout(resolve,100)});
wait1000()
    .then(function() {
        console.log('1');
        return wait1000()
    })
    .then(function() {
        console.log('2');
    });
```


### 8. Block-Scoped Constructs Let and Const

在ES5中，块级作用域是起不了作用的：

```javascript
function calculateTotalAmount(vip){
    var amount = 0;
    if(vip){
        var amount = 1;
    }
    {
        var amount = 100;
        {
            var amount = 1000;
        }
    }
    return amount;
}
console.log(calculateTotalAmount(true)); //1000
```

在ES6中，`let`限制块级作用域，`var`限制函数作用域

```javascript
function calculateTotalAmount(vip){
    var amount = 0;
    if(vip){
        let amount = 1;
    }
    {
        let amount = 100;
        {
            let amount = 1000;
        }
    }
    return amount;
}
console.log(calculateTotalAmount(true)); //0
```

在ES6中，`const`设置一个不变量

```javascript
function calculateTotalAmount(vip){
    const amount = 0;
    if(vip){
        const amount = 1;
    }
    {
        const amount = 100;
        {
            const amount = 1000;
        }
    }
    return amount;
}
console.log(calculateTotalAmount(true)); //0
```

### 9. Classes

直接看如何用ES6写一个类。ES6没有用函数，而是使用原型实现类。

1. 方法名不需要加function关键字，也不需要冒号`:`
2. 不需要分配属性`this`

```javascript
class baseModel {
    constructor(options,data) {
        this.name = 'Base';
        this.url = 'qq.com';
        this.data = data;
        this.options = options;
    }
    getName(){
        console.log(`Class name:${this.name}`);
    }
}

class AccountModel extends baseModel {
    constructor(options,data){
        super({private:true},['1','2']);
        this.name = 'Account Model';
        this.url += '/accounts/';
    }
    get accountsData() {
        return this.data;
    }
}

let accounts = new AccountModel();
accounts.getName();
console.log(`Data is ${accounts.accountsData}`);
//Class name:Account Model
//Data is 1,2
```

### 10. Modules

通常模块化有requirejs,seajs,commonjs等等，直接看ES6的模块化是什么样子的

在`module.js`，有

```javascript
export var port = 3000;
export function getAccounts(url){
    //...
}
```

将其导入到`main.js`中，

```javascript
import {port,getAccounts} from 'module';
console.log(port); //3000
```

也可以把整个模块导入，并且重新命名为`serivce`

```javascript
import * as service from 'module';
console.log(service.port); //3000
```

## 其他

这里还有许多ES6的其它特性你可能会使用到

* 全新的Math, Number, String, Array 和 Object 方法
* 二进制和八进制数据类型
* 默认参数不定参数扩展运算符
* Symbols符号
* tail调用
* Generators (生成器)
* New data structures like Map and Set(新的数据构造对像MAP和set)