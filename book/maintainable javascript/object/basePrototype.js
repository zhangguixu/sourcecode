/*
	基于原型的继承，实质就是实例的__proto__指向对象
*/

//原型对象
var person={
	name:'Nicholas',
	sayName():function(){alert(this.name);}
};

var myPerson=Object.create(person,{
	age:{
		value:'11'
	}
});
/*
	myPerson={};
	myPerson.__proto__=person;
*/
myPerson.sayName();   //'Nicholas'
