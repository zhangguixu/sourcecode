# 从零编写自己的JavaScript框架

> http://www.ituring.com.cn/article/48461

此文章的目的有两个：

1. 通过问题思考的形式来整理原文的知识点，会有一些补充
2. 检验自己对JavaScript知识的理解

## 1. 模块的定义和加载

### 1.1 模块的定义

考虑以下几个问题

1. 为什么要有模块化？
2. JavaScript的模块化对比其他语言的特殊性
3. 如何实现JavaScript的模块化

1. 首先在大型系统中开发中，模块化是很常见的。前端开发如今越来越复杂，模块化也是必然的。模块化带来了几点好处：

    1. 提高代码的封装性，尽可能降低全局变量污染程度（始终需要一个全局变量来挂载，例如window对象），避免命名的冲突，这一点可以大大提高团队协作开发的效率。
    2. 提高系统的可扩展性，在大型的系统应用中，可以说扩展性始终摆在第一位，扩展性可以保证一个系统在面对业务变化更迭时，不用被大幅度的修改，从而提高开发的效率。

2. JavaScript并没有`package`和`class`之类的东西（目前的ES6实际上已经有了），此外就是JavaScript的作用域比较特殊，它并没有所谓的块级作用域（现在也有了），只有函数作用域，因此，JavaScript的模块化有其特殊性（相对比于其他的语言）。

3. 那么如何实现模块化？需要知道几个知识点

    1. 立即执行函数（IIFE），用于创建一个函数作用域
    2. 命名空间，实际上就是挂载在全局对象下的一个属性
    3. 模块命名冲突解决，定义模块时命名也有可能冲突，这里可以使用hash来解决

    ```javascript
    (function (){
        //用于hash
        var moduleMap = {};
        //定义命名空间
        window.thin = {
            //模块定义函数
            define : function(name,dependencies,factory){
                //判断，避免模块命名冲突
                if(!moduleMap[name]){
                    var module = {
                        name : name,
                        dependencies : dependencies,
                        factory : factory
                    };
                    moduleMap[name] = module;
                }
                return moduleMap[name];
            }
        };
    })();
    ```


