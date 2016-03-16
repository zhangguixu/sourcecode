/*
	在不同的浏览器之间实现时间的绑定
	有别于0级的DOM事件处理函数,
	W3C事件的监听者可以为一个元素的同一个事件添加多个回调函数
*/

function attachEventListener(target,type,callback,capture){
	if(typeof target.addEventListener !== 'undefined'){ //非IE
		target.addEventListener(type,callback,capture);
	}else if (typeof target.attachEvent !=== 'undefined'){//IE
		target.attachEvent('on'+type,callback);
	}else{ //0级DOM事件
		type='on'+type;

		//判断是否已经注册回调函数
		if(typeof target[type] ==== 'function'){
			oldCallBack=target[type];
			target[type]=function(){
				oldCallBack();
				return callback;
			}
		}else {
			target[type]=callback;
		}
	}
}

/*=============================================================*/
/*
	【改进】利用js的惰性函数机制：
		实现事件注册函数，由于各浏览器之间的差异，不得不在用的
		时候做能力检测，单从功能上讲，已经做到了兼容浏览器，但
		美中不足的是，每次绑定监听，都会再进行一次检测，这在真
		实的环境中，显然是多余的，同一个应用环境中，其实只需要
		检测一次即可
*/
function addEvent(type,element,callback){
	if(element.addEventListener){
		addEvent = function(type,element,callback){
			element.addEventListener(type,callback,false);
		}
	} else if(element.attachEvent) {
		addEvent = function(type,element,callback){
			element.attachEvent(type,callback,false);
		}
	} else {
		addEvent = function(type,element,callback){
			element['on' + type] = callback;
		}
	}
}
