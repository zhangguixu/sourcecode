/*
	函数调用：主要探讨函数上下文，this的取值,调用的作用域
	利用call()和apply()来实现手动更换上下文，来实现共享状态
	bind()
*/

//小技巧
var clicky={
	wasClicked:function(){},
	addListeners:function(){
		var self=this;
		$('.clicky').click(function(){
			self.wasClicked();
		});
	}
}

//基于apply的委托方式

var proxy=function(func,thisObject){
	return(function(){
		return func.apply(thisObject,arguments);
	}); //返回一个匿名的函数，
}
var clicky={
	wasClicked:function(){},
	addListeners:function(){
		$('.clicky').click(proxy(this.wasClicked,this));
	}
};

//ECMAScript5的bind()函数，用以控制调用的作用域
Button.include({
	init:function(element){
		this.element=jQuery(element);
		this.element.click(this.click.bind(this));
	},
	click:function(){}
});

//兼容的bind()函数实现
if(!Function.prototype.bind){
	Function.prototype.bind=function(obj){
		var slice=[].slice, //Array.slice,切分数组，对原数组没有任何影响
			args=slice.call(arguments,1), //除了obj之外的参数数组
			self=this,
			nop=function(){},
			bound=function(){
				return self.apply(this instanceof nop? this:(obj ||{}),//判断this类型是否为一个函数
					args.concat(slice.call(arguments))); //合并bound函数接收的参数
			};
		nop.prototype=self.prototype;

		bound.prototype=new nop();  //原型继承调用者的原型

		return bound; //返回一个新的对象
	};
}