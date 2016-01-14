/*
	典型用法与最佳实践修改
	：松耦合，和便于测试的角度
*/

//不好的写法
function handleClick(event){
	var popup=document.getElementById('popup');
	popup.style.left=event.clientX+'px';
	popup.style.right=event.clientY+'px';

	popup.className='reveal';
}

addListener(element,'click',handleClick);


/*
	这种写法的局限性：
		1、隔离应用逻辑
			应用逻辑是和应用相关的功能性代码，而不是和用户的行为相关的
			因此，将应用逻辑从所有事件处理中抽离出来是一种最佳实践
*/

var application={
	handleClick:function(event){
		this.showPopup(event);
	},
	showPopup:function(event){
		var popup=document.getElementById('popup');
		popup.style.left=event.clientX+'px';
		popup.style.right=event.clientY+'px';

		popup.className='reveal';
	}
}

addListener(element,'click',function(event){
	application.handleClick(event);
});

/*
	这种写法还是有点问题：
		2、不要分发事件对象
			event对象被无节制地分发，event对象包含很多跟事件相关的额外信息，
			应用逻辑不应当依赖于event对象来正确完成功能，原因
				1）方法接口并没有表明哪些数据是必要的，好的API一定是对于期望和依赖都是透明的
				2）在测试方法的时候，必须重新创建一个event对象并将它作为参数传入，而且还必须
					确切地知道这个方法使用了哪些event对象的方法
*/

//好的写法
var application={
	handleClick:function(event){
		this.showPopup(event.clientX,event.clientY);
	},
	showPopup:function(x,y){
		var popup=document.getElementById('popup');
		popup.style.left=x+'px';
		popup.style.right=y+'px';

		popup.className='reveal';
	}
}

addListener(element,'click',function(event){
	application.handleClick(event);
});

//可测试的接口
application.popup(10,10);

/*
	当处理事件时，最好让事件处理程序成为接触到event对象的唯一函数
	因此，应该在进入应用逻辑之前针对event对象执行任何必要的操作，
	包括阻止默认事件和事件冒泡
*/
var application={
	handleClick:function(event){

		//对event对象进行处理
		event.preventDefault();
		event.stopPropagation();

		//进入应用逻辑程序
		this.showPopup(event.clientX,event.clientY);
	},
	showPopup:function(x,y){
		var popup=document.getElementById('popup');
		popup.style.left=x+'px';
		popup.style.right=y+'px';

		popup.className='reveal';
	}
}

addListener(element,'click',function(event){
	application.handleClick(event);
});
