# Ajax

## hash技术

*解决ajax的刷新、前进和后退的问题*

背景知识

1. #的含义

    #代表网页中的一个位置，其右边的字符，就是该位置的标识。

2. HTTP请求不包括#

    #是知道浏览器动作的，对服务器端完全无用，所有HTTP请求中不包括#部分

3. #后的字符

    第一个#后面出现的任何字符，都会被浏览器解析为位置标志符，不会被发送到服务器端。

4. 改变#不会触发网页的重载

5. 改变#会改变浏览器的访问历史

6. 获取#值

    ```javascript
    var hash = window.location.hash;
    ```

7. onhashchange事件

    HTML5新增事件，IE8+，Firefox，Chrome，Safari支持

    ```javascript
    window.addEventListener('hashchange',function(){}.false);
    ```
解决的大概模式：

```javascript
var HashUtil = {
    addHash : function(){
        /*
            制定添加hash值，可以采用特殊标识记住ajax 的请求的url
            保证hash值不会重复
        */
    },
    parseHash : function(){
        /*
            制定规则解析hash值，获取对应的url，利用Ajax技术，
            发送请求，加载对应的模块
        */
    }
}
```