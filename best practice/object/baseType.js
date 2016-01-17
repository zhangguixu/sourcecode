/*
	基于类型的继承，与基于对象的继承的工作方式差不多，
	它从一个已存在的对象基础，这里的继承是依赖于原型，
	这种继承的方式更加的灵活。
*/
//构造函数
function MyError(message){
	this.message=message;
}

MyError.prototype=new Error();

/*
	Myerror.prototype.__proto__=Error.prototype

	因此在进行实例化之后
*/
var myErrorInstance=new MyError();

/*
	myErrorInstance.__proto__=MyError.prototype;
	则：
	myErrorInstance.__proto__.__proto__===Error.prototype;
	根据原型链的查找规则，则
	myErrorInstance可以使用Error的原型方法
*/

myErrorInstance instanceof MyError; //true

myErrorInstance instanceof Error; // true