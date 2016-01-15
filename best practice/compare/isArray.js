/*
	检测数组：
	问题：在js中，最古老的跨域问题之一就是frame之间来回传递数组，但是instanceof不能跨帧，
	于是就会出现一个帧中的实例在另外一个帧不会被识别
*/

/*
	解决方法1：鸭式辨型（duck typing）
	即：“像鸭子一样走路、游泳并且嘎嘎叫的鸟就是鸭子”，
	本质是关注“对象能做什么”，而不是关注“对象是什么”
*/

//采用鸭式辨型的方法检测数组
function isArray(value){
	return typeof value.sort === 'function';
}

/*
	解决方法2：kangax
	Kangax发现调用某个值的内置toString()方法在所有浏览器中都返回
	标准的字符串结果，对于数组来说，返回的字符串为"[object Array]",
	这种方法对识别 “内置对象” 非常有效
*/
function isArray(value){
	return Object.prototype.toString.call(value) === '[object Array]';
}


/*
	ECMA5将Array.isArray()正式引入Javascript，唯一的目的就是准确
	地检测一个值是否为数组
*/
function isArray(value){
	if(typeof Array.isArray === 'function'){
		return Array.isArray(value);
	}else{
		return Object.prototype.toString.call(value) === '[object Array]';
	}
}