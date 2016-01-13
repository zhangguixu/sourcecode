/*
	控制器，抽象成库，使用模块化的开发方式

*/

/*=====================v1==============================*/
(function($,exports){
	//作用是添加自己的上下文，改变this的指向
	var mod=function(includes){
		if(includes)this.include(includes);
	};

	mod.fn=mod.prototype;

	mod.fn.proxy=function(func){//保证了函数在局部上下文中执行
		return $.proxy(func,this);
	};

	mod.fn.load=function(func){
		$(this.proxy(func));
	};


	mod.fn.include=function(ob){
		$.extend(this,ob);
	};

	exports.Controller=mod;
})(jQuery,window);


//示例
(function($,Controller){
	var mod=new Controller;

	mod.toggleClass=function(e){
		this.view.toggleClass('over',e.data);
	};

	mod.load(function(){
		this.view=$("#view");      //this--->mod
		this.view.mouseover(this.proxy(this.toggleClass),true);
		this.view.mouseout(this.proxy(this.toggleClass),false);
	});
})(jQuery,Controller);


/*======================v2=============================*/
//在DOM生成之后统一载入控制器，Controller类并不一定
//非要是构造函数，因为这里并不需要在生成子控制器时传入上下文

var exports=this;

(function($){
	var mod={};

	mod.create=function(includes){
		var result=function(){
			this.init.apply(this,arguments);
		};

		result.fn=result.prototype;

		result.fn.init=function(){};

		result.proxy=function(func){$.proxy(func,this);};
		result.fn.proxy=result.proxy;

		result.include=function(ob){$.extend(this.fn,ob);};
		result.extend=function(ob){$.extend(this,ob);};
		if(includes)result.include(includes);

		return result;
	};

	exports.Controller=mod;
})(jQuery);

//利用jQuery()函数，来实现DOM加载之后再加载入Controller
jQuery(function($){
	//创建控制器类
	var ToggleView=Controller.create({
		init:function(view){
			this.view=$(view);
			this.view.mouseover(this.proxy(this.toggleClass),true);
			this.view.mouseout(this.proxy(this.togggleClass),false);
		},
		this.toggleClass:function(e){
			this.view.toggleClass('over',e.data);
		}
	});

	//实例化控制器，调用init
	new ToggleView("#view");
})

/*===================v3================================*/
/*
	访问视图：一种常见的模式是一个视图对应一个控制器，
			视图包含一个ID，因此可以很容易地传入控制器，
			然后在视图之中的元素则使用class而不是ID，所以
			和其他视图中的元素不会产生冲突
	利用视图的引用来限制住范围，来提高查找速度
*/

var exports=this;

jQuery(function($){
	exports.SearchView=Controller.create({
		//选择器到局部变量名的映射
		elements:{
			'input[type=search]':'searchInput',
			'form':'searchForm'
		},
		//实例化时调用
		init:function(element){
			this.el=$(element);
			this.refreshElements();
			this.searchForm.submit(this.proxy(this.search));
		},
		search:function(){
			console.log('Searching:',this.searchInput.val());
		},

		//私有
		$:function(selector){
			//需要一个‘el’属性，同时传入选择器
			return $(selctor,this.el);
		},

		//设置本地变量
		refreshElements:function(){
			for(var key in this.elements){
				this[this.elements[key]]=this.$(key);
			}
		}
	});

	new SearchView('#users');
});


