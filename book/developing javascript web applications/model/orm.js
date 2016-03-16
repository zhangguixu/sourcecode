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
	created:function(){},  //扩展性考虑
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
	},
	extend:function(o){
		var extended=o.extended;
		for(var i in o)
			Model[i]=o[i]
		if(extended)extended(this);
	},
	include:function(o){
		var included=o.extended;
		for(var i in o)
			this.prototype[i]=o[i]
		if(included)included(this);
	}
};
//使用
var User=Model.create();

var user=User.init();

//持久化记录

Model.include({
	newRecord:true,
	create:function(){
		if(!this.id)this.id=Math.guid();
		this.newRecord=false;
		this.parent.records[this.id]=this;
	},
	destroy:function(){
		delete this.parent.records[this.id];
	},
	update:function(){
		this.parent.records[this.id]=this;
	},
	save:function(){
		this.newRecord?this.create():this.update();
	}
});

//查找资源的
Model.extend({
	find:function(id){
		return this.records[id]||throw('Unknown record');
	}
});

//示例
var Asset=Model.create();
var asset=Asset.init();
asset.name='same,same';
asset.id=1
asset.save();

var asset2 = Asset.init();
asset2.name = "but different";
asset2.id = 2;
asset2.save();

asset2.destroy();

//GUID

Math.guid=function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
		var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
};

//向ORM中添加纪录
Model.extend({
	populate:function(values){
		this.records={};

		for(var  i=0,il=values.length;i<il;i++){
			var record=this.init(values[i]);
			record.newRecord=false;
			this.records[record.id]=record;
		}
	}
});


//示例
jQuery.getJSON("/assets",function(result){
	Asset.populate(result);
});

//给ORM添加本地存储,将记录序列化为JSON字符串，然后使用
//localStorage对象存储它们
Model.extend({
	created:function(){
		this.records={};
		this.attributes=[];
	}
});

Model.include({
	attributes:function(){
		var result={};
		for(var i in this.parent.attributes){
			var attr=this.parent.attributes[i];
			result[attr]=this[attr];
		}
		result.id=this.id;
		return result;
	}
});

Model.include({
	toJSON:function(){
		return (this.attributes());
	}
})


