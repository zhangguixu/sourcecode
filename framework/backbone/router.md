# router

## router & history

### 1 浏览器导航基础

1. history对象

    ```javascript
    window.history.back()
    window.history.forward()
    ```

2. HTML5的history API

    对应的还有popstate事件和event.state

    ```javascript
    window.history.pushState(data,title [,title])
    window.history.replaceState(data,title [,url]);
    ```

3. location

    1. window.location.hash

    2. window.location.reload()

    3. hashchange事件

### 2. 绑定导航地址

1. action方式绑定url地址

    将页面特定的url或hash属性与一个对应的函数想绑定，即在构建router类时，通过添加`routes`属性，在该属性中声明url或hash属性和函数的对应关系，这样就完成了两者间的绑定。一旦绑定完成，在浏览器中浏览对应的url地址时，执行对应函数中的代码。

    ```javascript
    var testrouter = Backbone.Router.extend({
        routes : {
            '' : 'main',
            'search' : 'search_list',
            'search/:key/p:page' : 'search_key_page',
            '*search' : 'search_default'
        },
        search_key_page : function(key,page){
            $divShow.html();
        }
    });
    var router = new testrouter;
    Backbone.history.start();
    ```
2. event方式绑定url地址

    在构建router类中，通过添加routes属性声明需要监听的url地址列表时，每绑定一个对应的key/value关系，会触发一个基于动作函数名的事件，实例化的router类对象可以绑定该事件，并在事件中还可以接收url地址传来的实参数据。

    ```javascript
    var testrouter = Backbone.Router.extend({
        routes : {
            '' : 'main',
            'search' : 'search_list',
            'search/:key/p:page' : 'search_key_page',
            '*search' : 'search_default'
        }
    });
    var router = new testrouter;
    router.on('router:main',function(){
        $divShow.html('main')
    });
    router.on('router:search_key_page',function (key,page){
        $divShow.html(key + page);
    })
    Backbone.history.start();
    ```

3. 定义hash属性绑定规则

    hash属性的规则

    1. '/'反斜杠字符表示内容的分隔，该字符在router类内部会自动转成`([^\/]+)`表达式。例如定义如下匹配的规则

        `'#search/a/b/c' : 'search_a_b_c'`

    必须在地址栏中输入`url#search/a/b/c`，才能执行`search_a_b_c`函数代码。

    2. ':'冒号表示该段内容以参数的方式传给对应的动作函数，如

        `'#search/:a/m:b/n:c' : 'search_a_m_n'`

    可以在地址栏中输入`url#search/1/m2/m3`，就会获得参数a = 1,b=2,c=3

    3. '*'表示零个或多个任意字符，该字符在router类内部会自动转成为`(.*?)`表达式，它可以与反斜杠或冒号组合。

        `'*search/:a/m:b/n:c' : 'default_a_m_n'`

    可以在地址栏中输入`url#error/1/m2/n3`。

    ```javascript
    var testrouter = Backbone.Router.extend({
        routes : {
            '*path/p:page' : 'search_other'
        },
        search_other : function(path,page){
            //do something
        }
    });
    var router = new testrouter;
    Backbone.history.start();
    ```

### 3. router类的方法

1. objrouter.route(route,name,callback)

    动态修改url中hash属性的匹配规则和动作函数

    ```javascript
    var testrouter = Backbone.Router.extend({
        routes : {
            '' : 'main',
            'search' : 'search_list',
            'search/:key/p:page' : 'search_key_page',
            '*search' : 'search_default'
        },
        initialize : function(){
            this.route('search','search_list',function(){
                // do something
            });
        }
    });
    var router = new testrouter;
    router.route('search2/:key/p:page','searh_key_page',function(key,page){
        //do something
    });
    Backbone.history.start();
    ```

2. objrouter.navigate(fragment,options)

    自动跳转到指定的hash属性中，并通过方法中的配置对象是否执行与hash属性匹配规则对应的作用函数。

    ```javascript
    router.navigate('search2/abc',{trigger : true});
    ```

3. Backbone.history

    router对象的导航功能实际上是有router和history两个类共同完成的

    * router

        定义和解析hash属性的匹配规则，并将规则中的url映射到对应的动作函数。

    * history

        监听url的变化，并执行对应动作函数。

    通常不会直接对history进行对象声明，因为在实例化一个router对象时，就已经创建一个单独的history对象，可以调用`Backbone.history`来进行访问。

    ```javascript
    Backbone.history.start(); //开始监听url的变化
    Backbone.history.stop(); //停止监听url的变化
    ```
