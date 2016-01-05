/*
	基于事件的编程，能够使得应用架构充分解耦，让功能变得更加内聚
	且具有更好的可维护性，这种模式成为发布/订阅模式

	只需记录回调和事件名称的对应关系及调用它们的方法
*/
var PubSub={
	subscribe:function(ev,callback){
		//创建_callbacks对象
		var calls=this._callbacks||(this._callbacks={});

		//针对给定的key创建一个数组，除非这个数组已经存在
		//然后将回调函数追加到这个数组中
		(this._callbacks[ev]||(this._callbacks[ev]=[])).push(callback);
		return this;  //链式调用
	},
	publish:function(){
		//将arguments转为真正的数组（性能要求！apply参数需求）
		var args=Array.prototype.slice.call(arguments,0);

		//拿出第1个参数，即事件名称
		var ev=args.shift();

		//如果不存在_callback对象，则返回
		//或者如果不包含给定事件对应的数组
		var list,calls,i,l;

		//优先使用局部变量，提高性能
		if(!(calls=this._callbacks))return this;

		if(!(list=this._callbacks[ev]))return this;

		//触发回调
		for(i=0,l=list.length;i<l;i++)
			list[i].apply(this,args);

		return this;
	}
}

//使用方法
PubSub.subscribe("wem",function(){alert("Wem!");});

PubSub.publish("wem");

//封装到jQuery上 !!重要技巧
var Asset={};
jQuery.extend(Asset,PubSub);

//示例
Asset.subcribe("create",function(){});


//基于jQuery的实现 Ben Alman
(function($){

	var o=$({});

	$.subscribe=function(){
		o.bind.apply(o,arguments);
	};

	$.unsubscribe=function(){
		o.unbind.apply(o,arguments);
	};

	$.publish=function(){
		o.trigger.apply(o,arguments);
	};
})(jQuery);