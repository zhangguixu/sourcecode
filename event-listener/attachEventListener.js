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

