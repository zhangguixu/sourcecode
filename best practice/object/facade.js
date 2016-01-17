/*
	门面模式（包装器）
		为一个已存在的对象创建一个新的接口，
		门面是一个全新的对象，其背后有一个已存在的对象

	门面实现一个特定的接口，让一个对象看上去像另外一个对象，
	就称作一个适配器
*/

/*
	jQuery和YUI的DOM接口都使用了门面，无法从DOM对象上继承，
	所以唯一能够安全地为其新增功能的选择就是创建一个门面
*/
function DOMWrapper(element){
	this.element=element;
}

DOMWrapper.prototype.addClass= function(className){
	element.className+=' '+className;
};

DOMWrapper.prototype.remove=function(){
	this.element.parentNode.removeChild(this.element);
};


//用法示例
var wrapper=new DOMWrapper(document.getElementById('my-div'));

//添加一个class
wrapper.addClass('selected');

//删除元素
wrapper.remove();
