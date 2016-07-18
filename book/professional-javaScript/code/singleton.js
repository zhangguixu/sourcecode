/*
	单例模式
	1.采用对象字面量创建
	2.通常是Object对象的实例，因为作为全局对象存在，所以不需要检测单例的类型
	3.使用模块模式来增强单例
*/

/*
	在Web应用程序中，经常需要使用一个单例来管理应用程序级的信息
*/
var application = function(){

	//私有变量和函数
	var components = [];

	components.push(new BaseComponent());

	//公共
	return {
		getComponentCount : function(){
			return components.length;
		},

		registerComponent : function(component){
			if (typeof component == 'object'){
				components.push(component);
			}
		}
	};

}();