/*
	工人线程内部的代码
*/
self.onmessage=function(event){
	self.postMessage("hello,"+event.data);
};