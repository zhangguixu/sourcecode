/*
	多库共存原理
*/

//jQuery 1.2

var _jQuery=window.jQuery,_$=window.$; //先把可能存在的同名变量保存起来

jQuery.extend({
	noConflict:function(deep){
		window.$=_$; //这个时候再放回去

		if(deep)
			window.jQuery=_jQuery;

		return jQuery;
	}
});