/*
	ORM：
	可以将模型和远程服务捆绑在一起，任何模型实例的改变都会在后台发起一个Ajax请求到服务器端
	或者将模型实例与HTML元素绑定在一起

	本质上，ORM只是用于抽象JS数据类型，可以通过给它添加自定义的函数和属性来增强基础数据的功能，
	比如：数据的合法性验证，监听，数据持久化及服务器端的回调处理，增加代码的重用率
*/

//原型继承

//Object.create(原型对象)，返回一个新的对象

if(typeof Object.create!=='function')
	Object.create=function(o){
		function F(){};
		F.prototype=o;
		return new F();
	};

//Model对象
var Model={
	inherited:function(){},
	created:function(){},
	prototype:{
		init:function(){}
	},
	create:function(){ //相当于一个类工厂
		var object=Object.create(this);
		object.parent=this;
		object.prototype=object.fn=Object.create(this.prototype);

		object.created();
		this.inherited(object);
		return object;
	},
	init:function(){ //类的实例化
		var instance=Object.create(this.prototype);
		instance.parent=this;
		instance.init.apply(instance,arguments);
		return instance;
	}
}

//使用
var User=Model.create();

var user=User.init();