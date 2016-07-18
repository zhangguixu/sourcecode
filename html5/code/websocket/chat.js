window.onload = function(){
	//ui
	var nick = prompt('Enter your nickname'),
		input = document.getElementById('input');

	input.focus();

	//打开一个websocket用于发送和接收聊天消息
	var socket = new WebSocket('ws://' + location.host + '/');

	socket.onmessage = function(event){
		var msg = event.data;
		var node = document.createTextNode(msg);
		var div = document.createElement('div');
		div.appendChild(node);
		document.body.insertBefore(div,input);
		input.scrollIntoView();
	}

	input.onchange = function(){
		var msg = nick + ': ' + input.value;
		socket.send(msg);
		input.value = '';
	}
}