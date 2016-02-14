/*
	稳妥对象，最适合在一些安全的环境中，或者防止数据
	被其他应用程序改动时使用
	1）没有公共属性
	2）不引用this的对象
*/
function Person(name,age,job){
	var o = new Object();
	o.sayName = function(){
		console.log(name.last);
	}
	return o;
}
var p = Person({last:'zhang'},25,'programmer');
p.sayName();
