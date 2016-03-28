# JavaScript 字符串

## String类

### 1. 属性

**length**

表示字符串中包含的字符的个数

### 2.字符方法

1. charAt(index)

    以单字符字符串的形式返回给定位置的那个字符

2. charCodeAt(index)

    返回字符编码

```javascript
    var s = 'hello world';
    s.charAt(1); //e
    s.charCodeAt(1);//101
```

### 3. 字符串操作方法

1. concat(string)

    用于将一或多个字符串拼接起来

    ```javascript
        var s = 'hello';
        var s1 = s.concat('world');
        s1; //hello world
        s;//hello
    ```

    在实践中，更多的还是使用'+'操作符

2. slice(start,end?)

    将传入的负值与字符串的长度相加

3. substr(start,end?)

    将负的第一参数加上字符串的长度，负的第二个参数转换为0

4. substring(start,end?)

    将所有负值参数都转换为0


```javascript
    var s = 'hello world';
    s.slice(-3);//rld
    s.substr(-3);//rld
    s.substring(-3);//hello world
    s.slice(3,-4);//lo w
    s.substr(3,-4);//''
    s.substring(3,-4)/;//helo
```

### 4. 字符串位置方法

从一个字符串中搜索给定的子字符串，返回子字符串的位置

1. indexOf(s[,start])

    从头向后搜索

2. lastIndexOf(s[,start])

    从后向前搜索

```javascript
 /*
    循环搜索，匹配所有的字字符串
*/
var s = 'Lorem ipsum dolor sit amet, consectetur'
            +' adipisicing elit',
    positions = [],
    pos = s.indexOf('e');
while(pos > -1){
    positions.push(pos);
    pos = s.indexOf('e',pos + 1);
}
positions;//3,24,32,35,52
```

### 5. trim()【ECMAScript5】

创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果

```javascript
    var s = '    hello world     ';
    var trims = s.trim();
    trims;//hello world
```

### 6. 字符串大小写转换方法

借鉴java.lang.String的同名方法

1. toLowerCase()

2. toUpperCase()

3. toLocaleLowerCase()

4. toLocaleUpperCase()

### 7. 字符串的模式匹配方法

1. match(RegExp对象/正则表达式)

    本质上与调用RegExp的exec()方法相同

    ```javascript
        var text = 'cat,bat,sat,fat';
        var pattern = /.at/;
        var matches = text.match(pattern);
        matches.index; //0
        matches[0];//cat
        pattern.lastIndex; //0
    ```

2. search()

    返回字符串中第一个匹配项的索引，如果没有，则返回-1

    ```javascript
        var text = 'cat,bat';
        var pos = text.search(/at/);
        pos;//1
    ```

3. replace(RegExp/字符串,字符串/函数)

    替换子字符串的操作，如果第一个参数是字符串，那么只替换第一个字符串，要替换
    所有的子字符串，需要是正则表达式，且指定'g'标志

    ```javascript
        var text = 'cat,bat,sat,fat';
        var result = text.replace('at','ond');
        result;//'cond,bat,sat,fat'
        result = text.replace(/at/g,'ond');
        result;//'cond,bond,sond,fond'
    ```

    如果第二个参数是字符串，还可以使用一些特殊的字符序列，将正则表达式操作得到
    的值插入到结果字符中
        1. $$ $
        2. $& 匹配整个模式的子字符串。与RegExp.lastMatch的值相同
        3. $' 匹配的子字符串之前的子字符串。与RegExp.leftContext的值相同
        4. $` 匹配的子字符串之后的子字符串。与RegExp.rightContext的值相同
        5. $n 匹配第n个捕获组的子字符串，其中n等于0～9
        6. $nn 匹配第nn个捕获组的子字符串，其中nn等于01～99

    ```javascript
        var text = 'cat,bat,sat,fat';
        var result = text.replace(/(.at)/g,'word($1)');
        result;//word(cat),word(bat),word(sat),word(fat)
    ```

    如果第二个参数是一个函数，在只有一个匹配项，会向这个函数传递3个参数：
                 (模式匹配项 模式匹配项index 原始字符串)
    在正则表达式中定义了多个捕获组的情况下，传递的参数会是:
            (模式匹配项,第一个捕获组,第二个捕获组...,index,原始字符串)

    ```javascript
            function htmlEscape(text){
                return text.replace(/[<>"&]/g,function(match,pos,originalText){
                    switch(match){
                        case '<':
                            return '&lt';
                        case '>':
                            return '&gt';
                        case '&':
                            return '&amp';
                        case '\"':
                            return '&quot';
                    }
                });
            }
    ```

4. split(字符串或RegExp,数组大小)

    基于指定的分隔符将一个字符串分割成多个子字符串，将结果放在一个数组中

    ```javascript
        var color = 'red,blue,green,yellow',
            color1 = color.split(','),
            color2 = color.split(',',2),
            color3 = color.split(/[^\,]+/);

        color1;//['red','blue','green','yellow']
        color2;//['red','blue']
        color3;//["", ",", ",", ",", ""]
    ```

### 8. 其他

1. localeCompare()

    比较两个字符串，并返回下列值中的一个

    1. 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数(大多数情况下是-1)
    2. 如果字符串等于字符串参数，则返回0；
    3. 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数(大多数是1)

2. fromCharCode()

    接收一或者多个字符编码，将它们转换成一个字符串

    ```javascript
        String.fromCharCode(104,101,108,108,111);//'hello'
    ```

