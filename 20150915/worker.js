/*
	工人线程和网页代码通过事件接口进行交互。
	网页代码可通过postMessage()方法向工人线程传递数据，
	它接收单个参数，即传递给工人线程的数据。
	此外，在工人线程中还有onmessage 事件句柄用于接收信息。
*/
var worker=new Worker("code.js");

worker.onmessage=function(event){
	console.log(event.data);
};

worker.postMessage("zhangguixu");