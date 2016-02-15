数据类型转换
=====

##类型

1. 隐式数据类型转换：大量存在，容易发生错误
2. 显示数据类型转换

##常见的类型转换

###从字符串值转换为数值

**显式**

	Number()

	parseInt()
	parseFloat()

*区别*

```javascript
Number('100x');   //NaN
parseInt('100x'); //100						   
```

**隐式**

```javascript
'100'-1 //99
+ '100' //100,+号作为单目运算，是正号运算
```
*注意*

```javascript
'100' + 1 // 1001
1 + '100' // 1001
```

注：无法被转换为数值的字符串  ---> **NaN**
	                空字符串  ---> **0**

### 从数值转换为字符串值

**显式**

```javascript
String(1); // '1'
1.toString();//'1'
```

**隐式**

```javascript
foo+'100' //foo100
100+'foo' //100foo
```

**特殊数值转换**

	数值NaN       --->   'NaN'
	数值Infinity  --->   'Infinity'
	数值-Infinity --->   '-Infinity'

###转换为布尔型

**false**
	
* 0
* NaN
* null
* undefined
* ' '(空字符串)

### 从Object类型转换为基本数据类型

```javascript
var obj={};
obj++;
obj  //NaN
```

*对象要有能返回恰当数值的valueOf方法*