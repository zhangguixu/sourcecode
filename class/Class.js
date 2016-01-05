/*
	用js来模拟类机制
*/

var Class=function(parent){
	var Klass=function(){
		this.init.apply(this,arguments);
	};

	//改变Klass的原型
	if(parent){
		var subClass=function (){};
		subClass.prototype=parent.prototype;
		Klass.prototype=new subClass;
	}
	Klass.prototype.init=function(){};

	//定义prototype的别名
	Klass.fn=Klass.prototype;

	//定义类的别名
	Klass.fn.parent=Klass;
	Klass._supper=Klass.__proto__; //父类指向自己

	//给类添加属性
	Klass.extend=function(obj){
		var extended=obj.extended;
		for(var i in obj){
			Klass[i]=obj[i];
		}
		if(extended)extended(Klass);
	}

	//给实例添加属性
	Klass.include=function(obj){
		var included=obj.included;
		for(var i in obj){
			Klass.fn[i]=obj[i];
		}
		if(included)included(Klass);
	}

	//添加一个proxy函数，控制‘类’库的作用域？？
	Klass.proxy=function(func){
		var self=this;
		return (function(){
			return func.apply(self,arguments);
		});
	}

	//在实例中也添加这个函数
	Klass.fn.proxy=Klass.proxy;

	return Klass;
};

//继承示例
var Animal=new Class;

Animal.include({
	breath:function(){
		console.log('breath');
	}
});

var Cat=new Class(Animal);

var tommy=new Cat;
tommy.breath();

//proxy示例，可以对函数进行包装，以确保它们在正确的作用域中被调用

var Button=new Class;

Button.include({
	init:function(element){
		this.element=jQuery(element);
		//使用proxy，当元素被click的时候，调用的是Button的click函数
		this.element.click(this.proxy(this.click));
	},
	click:function(){}
});




