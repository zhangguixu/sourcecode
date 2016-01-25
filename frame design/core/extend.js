/*
	JavaScript对象是可以随意添加、更改和删除其成员
*/
/*
	一个简单的扩展方法的实现

	但是：在旧版本的IE在这里有个问题，它认为像Object的原型方法
			就是不应该被遍历出来，因此用for in 循环是无法遍历
			名为valueOf，toString的属性名
*/
function extend(destination,source){

	for( var property in source)
		destination[property]=source[property];

	return destination;
}

/*
	mass framework的mix方法
*/

function mix(target,source){ //如果最后参数是布尔，判断是否覆写同名属性

	var args=[].slice.call(arguments,0),i=1,key,
			ride=typeof args[args.length - 1] == 'boolean' ? args.pop():true;

	if(args.length === 1){   //处理$.mix(hash)的情形
		target = !this.window? this:{};
		i=0;
	}

	while((source = args[i++])){
		for (key in source){ //允许对象糅杂，用户保证都是对象
			if( ride || !(key in target) ){
				target[key] = source[key];
			}
		}
	}

	return target;
}

