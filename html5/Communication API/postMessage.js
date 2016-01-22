/*
	postMessage API定义为发送消息的标准方式，
*/

chatFrame.contentWindow.postMessage('hello','http://www.example.com/')
/*
	接受消息时，仅需要在页面增加一个事件处理函数
*/
window.addEventListener('message',messageHandler,true);

/*
	消息事件是一个拥有data（数据）和origin（源）属性的DOM事件
		data  : 发送方传递的实际消息
		origin：发送方圆，根据可信源列表能方便判断来源是否可靠

	通过白名单来鉴定源
*/

var originWhiteList=['portal.example.com','games.example.com','www.example.com'];

function checkWhiteList(origin){

	var i;

	for(i = 0;i < originWhiteList.length;i++){
		if(origin === originWhiteList[i]){
			return true
		}
	}

	return false;
}


function messageHandler(e){

	if(checkWhiteList(e.origin)){
		//处理消息
		processMessage(e.data);
	}else{
		//忽略来自未知源的消息
	}
}

/*
	[???暂时理解不了]
	Framebusting技术：
		应用程序首先检测其所在的窗口是否为最外层的窗口，
		若不是，则跳脱包含它的框架
*/

//在iframe中使用postMessage实现互信页面握手通信

var framebustTimer;
var timeout=3000; //超时时间设为3s

if(window !== window.top){
	framebustTimer=setTimeout(
		function(){
			window.top.location=location;
	},timeout);
}

window.addEventListener('message',function(e){
	switch(e.origin){
		case trustedFrame:
			clearTimeout(framebustTimer);
			break;
	}
},true);