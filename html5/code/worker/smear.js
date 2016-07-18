/*
	负责创建一个worker，然后使用worker处理图片
*/
 function smear(img){
 	//创建一个canvas
 	var canvas = document.createElement('canvas');
 	canvas.width = img.width;
 	canvas.height = img.height;

 	//将图片复制到画布中，随后提取其像素
 	var context = canvas.getContext('2d');
 	context.drawImage(img,0,0);
 	var pixels = context.getImageData(0,0,img.width,img.height);

 	//将像素信息传递给Worker线程
 	var worker = new Worker('SmearWorker.js');
 	worker.postMessage(pixels);

 	//注册事件来获取Worker的响应
 	worker.onmessage = function(e){
 		var smeared_pixels = e.data; //从Worker获取的像素信息
 		context.putImageData(smeared_pixels,0,0);
 		img.src = canvas.toDataURL();

 		//关闭Worker线程
 		worker.terminate();
 		canvas.width = canvas.height = 0;
 	}
 }