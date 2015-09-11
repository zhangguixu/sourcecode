/*
	事件托管是一项非常实用的技术，可以大大减少页面中的事件监听的压力，
	原理是：事件分三个阶段（捕获，到达目标，冒泡），监听父节点，
			当事件冒泡时，在父节点处理子元素发生的所有事件
	事件托管：
	1、访问事件对象，并判断事件源（target）
	2、结束文档中的冒泡（可选）
	3、阻止默认行为（可选）
*/
document.getElementById('mylist').onclick=function(e){
	//跨浏览器判断
	e=e||window.event;
	var target=e.target||e.srcElement; //触发事件的对象


	//判断事件源
	if(target.nodeName!='A'){
		return;              //并非所监听的子元素触发的
	}

	console.log(target.href); //执行自定义的行为



	//阻止默认行为
	if(typeof e.preventDefault==='function'){  //跨浏览器判断
		e.preventDefault();
		e.stopPropagation();
	}else{
		e.returnValue=false;
		e.cancelBubble=true;
	}

}

