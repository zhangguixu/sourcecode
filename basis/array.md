# JavaScript之数组

## Array property

1. constructor：返回对创建此对象的数组函数的引用。

2. length：设置或返回数组中元素的数目。

	数组的length不仅是可读的，而且是可写的，通过设置length可以改变数组大小

	```javascript
	var a = [1,2,3]
	a.length; //3
	a.length = 2;
	console.log(a);//[1,2]
	```

3. prototype：使您有能力向对象添加属性和方法。

## Array prototype

1. concat()：连接两个或更多的数组，并返回结果。

2. join()：把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。

3. pop()：删除并返回数组的最后一个元素

4. push()：向数组的末尾添加一个或更多元素，并返回新的长度。

5. shift()：删除并返回数组的第一个元素

6. unshift()：向数组的开头添加一个或更多元素，并返回新的长度。

	```javascript
	//利用pop()和push()来实现栈
	var stack = [];
	stack.push(1);
	var item = stack.pop();
	```

	```javascript
	//利用push()和shift()来实现队列
	var queue = [];
	queue.push(1);
	var item = queue.shift();
	```

	```javascript
	//利用unshift()和pop()来实现反向队列
	var reverseQueue = [];
	reverseQueue.unshift(1);
	var item = reverseQueue.pop();
	```

7. slice()：从某个已有的数组返回选定的元素

	经常用来将类数组转化成数组，这样做一方面可以利用现有的数组方法更加方便的处理，另一方面是处于性能的考虑。

	```javascript
	//将函数内的arguments对象转化为数组
	function f(){
		var args = Array.prototype.slice.call(arguments,0);
	}
	```

8. splice()：删除元素，插入元素，替换元素。

	1. 删除元素：(index,numOfDelete)

		```javascript
		var a = [1,2,3,4,5]
		//删除3
		for(var i = 0, len = a.length; i < len; i++){
			if(a[i] === 3){
				break;
			}
		}
		var removed = a.splice(i,1); //3
		console.log(a); //[1,2,4,5]
		```

	2. 插入元素：(index,0,insertItems)

		```javascript
		var a = [1,2,5,6];
		a.splice(2,0,3,4);
		console.log(a);//[1,2,3,4,5]
		```

	3. 替换元素：(index,numOFdelete,replaceItems)

		```javascript
		var a = [1,2,2,2,2]
		a.splice(2,3,3,4,5);
		console.log(a);//[1,2,3,4,5]
		```

9. sort()：对数组的元素进行排序

	默认情况下，sort()是`升序`排序，而且是调用每一项的`toString()`，然后比较得到的`字符串`。

	```javascript
	var a = [0,1,5,10,15];
	a.sort();
	console.log(a);//[0,1,10,15,5]
	```

	sort()方法可以接收一个`比较函数`作参数，实现我们想要的排序。

	```javascript
	//升序
	function asc(v1,v2){
		if(v1 > v2){
			return 1;
		} else if (v1 < v2){
			return -1;
		} else {
			return 0;
		}
	}
	//降序
	function desc(v1,v2){
		return -asc(v1,v2);
	}

	var a = [0,1,5,15,10];
	a.sort(asc);
	console.log(a);//[0,1,5,10,15]
	a.sort(desc);
	console.log(a);//[15,10,5,1,0]
	```

10. reverse()：颠倒数组中元素的顺序。

11. valueOf()：返回数组对象的原始值

12. toSource()：返回该对象的源代码。

13. toString()：把数组转换为字符串，并返回结果。

14. toLocaleString()：把数组转换为本地数组，并返回结果。