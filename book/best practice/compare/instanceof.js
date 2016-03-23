/*
	value instanceof constructor

	用来检测引用值的类型
*/

//检测日期
if(value instanceof Date){}

/*
	instanceof不仅能检测构造对象的构造器，还检测原型链
*/

var now=new Date();

now instanceof Date; //true
now instanceof Object; //true

/*
	instanceof 也可以检测自定义的类型
*/
function Person(){};

var person = new Person();

person instanceof Person; //true

/*
	【！！】
	instanceof 有一个严重的限制，假设在一个浏览器的帧(frame A)
	里的一个对象呗传入到另外另外一个帧（frame B）中，两个帧都
	定义了一个构造函数Person，如果来自帧A的对象是帧A的Person实例
	则
	frameAPersonInstance instanceof frameAPerson //true
	frameAPersonInstance instanceof frameBPerson //false
*/

/*
	ECMA3中instanceof的规范的实现，
	【！！！】并不是construct，而是判断__proto__
*/
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;// 取 R 的显示原型
 L = L.__proto__;// 取 L 的隐式原型
 while (true) {
   if (L === null)
     return false;
   if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
     return true;
   L = L.__proto__;
  }
}