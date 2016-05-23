(function(){

//ADS命名空间
if(!window.ADS){
	window['ADS'] = {};
}

//检测正常使用ADS库的必要条件
function isCompatible(other){
	if(other === false
		|| !Array.prototype.push
		|| !Object.hasOwnProperty
		|| !document.createElement
		|| !document.getElementsByTagName
		){
		return false;
	}
	return true;
};
window['ADS']['isCompatible'] = isCompatible;


//document.getElementById()的替换--来自于Prototype框架
function $(){
	var elements = [],
		args = Array.prototype.slice.call(arguments);

	for(var i = 0, len = args.length; i < len; i++){
		var el = args[i];

		//如果该参数是一个字符串那假设它是一个id
		if(typeof el == 'string'){
			el = document.getElementById(el);
		}
		if(el){
			elements.push(el);
		}
	}

	if(elements.length > 1){
		return elements;
	} else {
		return elements[0];
	}
};
window['ADS']['$'] = $;

//事件处理程序绑定兼容性实现
function addEvent(node,type,listener){
	if(!( node = $(node) )){
		return false;
	}
	if(node.addEventListener){
		node.addEventListener(type,listener,false);
		return true;
	} else if(node.attachEvent){
		node.attachEvent('on'+type,function(){
			listener.apply(node,arguments);
		});
		return true;
	} else{
		node['on' + type] = listener;
		return true;
	}
	return false;
};
window['ADS']['addEvent'] = addEvent;

//事件处理程序移除兼容性实现
function removeEvent(node,type,listener){
	if(!( node = $(node) )){
		return false;
	}
	if(node.removeListener){
		node.removeListener(type,listener,false);
		return true;
	} else if(node.detachEvent){
		node.detachEvent('on'+type,function(){
			listener.apply(node,arguments);
		});
		return true;
	} else{
		node['on' + type] = null;
		return true;
	}
	return false;
};
window['ADS']['removeEvent'] = removeEvent;


//ECMA5的getElementsByClassName的兼容性实现
function getElementsByClassName(className,tag,parent){
	parent = parent || document;

};
window['ADS']['getElementsByClassName'] = getElementsByClassName;

//
function toggleDisplay(node,value){};
window['ADS']['toggleDisplay'] = toggleDisplay;

//节点操作

function insertAfter(node,referenceNode){};
window['ADS']['insertAfter'] = insertAfter;

function removeChildren(parent){};
window['ADS']['removeChildren'] = removeChildren;

function prependChild(parent,newChild){};
window['ADS']['prependChild'] = prependChild;

})();