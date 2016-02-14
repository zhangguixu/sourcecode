/*
	1、原型链继承
*/
function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = false;
}
//继承了SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
	return this.subproperty;
};
var instance = new SubType();
instance.getSupperValue(); //true

/*
	2、借用构造函数
*/
function SuperType(){
	this.colors = ['red','blue','green'];
}
function SubType(){
	SuperType.call(this);
}
var instance1 = new SubType();
var instance2 = new SubType();
instance1.colors.push('black');
instance1.colors;//red blue green black
instance2.colors; //red blue green

/*
	3、组合继承（最常用）
*/
function SuperType(name){
	this.name = name;
	this.colors = ['red','blue','grey'];
}

SuperType.prototype.sayName = function(){
	console.log(this.name);
};

function SubType(name,age){
	//继承属性
	SuperType.call(this,name);

	this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;//默认的被重写了，重新赋值
SubType.prototype.sayAge = function(){
	console.log(this.age);
};

var instance1 = new SubType('zhang',26);
instance1.colors.push('black');
instance1.colors;//red blue grey black
instance1.sayName(); //zhang
instance1.sayAge(); //26

var instance2 = new SubType('z',29);
instance2.colors;//red blue grey 
instance2.sayName(); //z
instance2.sayAge(); //29

/*
	4、原型式继承
*/
function object(o){
	function F(){};
	F.prototype = o;
	return new F();
}
var person = {
	name : 'zhang',
	friends : ['li','wang']
};
var anotherPerson = object(person);
//创建自己name属性
anotherPerson.name = 'lao';
//为原型链上的friends数组添加项
anotherPerson.friends.push('foo');
anotherPerson.friends;//li wang foo

//或者用ECMAScript5中的函数
var person = {
	name : 'zhang',
	friends : ['li','wang']
};
var anotherPerson = Object.create(person,{
	name : {
		value : 'lao';
	}
});	

/*
	5、寄生式继承
*/
function createAnother(original){
	//通过调用函数创建一个新对象
	var clone = object(original);
	//以某种方式来增强这个对象
	clone.sayHi = function(){
		console.log('hi');
	};
	return clone;
}
var person = {
	name : 'zhang',
	friends : ['li','wang']
};
var anotherPerson = createAnother(person);

/*
	6、寄生组合式继承【最理想】
*/
`
function inheritPrototype(subType,superType){
	var prototype = object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function SuperType(name){
	this.name = name;
	this.colors = ['red','blue','grey'];
}
SuperType.prototype.sayName = function(){
	console.log(this.name);
};


function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
inheritPrototype(subType,superType);
SubType.prototype.sayAge = function(){
	console.log(this.age);
};
