/*
	运行在Node的服务器端的JavaScript，基于Socket.IO实现与客户端的
	WebSocket通信
*/

var http = require('http'),
	sio = require('socket.io'),
	fs = require('fs');

var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(fs.readFileSync('wschatclient.html'));
});

server.listen(8080);

var ws = sio.listen(8000);

ws.on('connection',function(socket){
	console.log('connected!');
	socket.send('Welcome to the chat room');
	socket.on('message',function(msg){
		socket.broadcast.send(msg);
	});
})

