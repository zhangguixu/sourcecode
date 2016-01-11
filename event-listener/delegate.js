/*
	实现简易版的事件托管,
	用于列表，表格等，可以提高性能
*/

function delegate(parent,childNodeName,type,callback){
	//事件
	type='on'+type;

	parent[type]=function(e){
		e=e||window.event;

		var target =e.target||e.srcElement;

		if(target.nodeName.toLowerCase()!==childNodeName){
			return;
		}

		if(typeof e.preventDefault()==='function'){
			e.preventDefault();
			e.stopPropagation();
		}else {
			e.returnValue=false;
			e.cancelBubble=true;
		}

		callback(target);
	}
}

//用法示例
delegate(document.getElementById('parent'),'li','click',function(t){});
