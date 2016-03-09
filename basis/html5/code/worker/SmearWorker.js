/*
	Worker线程内部的代码
*/

//从主线程中获取ImageData对象，对其进行处理并将它传递回去
onmessage = function(e) {
	postMessage(smear(e.data));
};

function smear(pixels){
	var data = pixels.data,
		width = pixels.width,
		height = pixels.height;

	var n = 10,m = n-1,row,i,col;

	for (row = 0; row < height; row++){
		i = row * width * 4 + 4;
		for (col = 1; col < width; col++, i += 4){
			data[i] = (data[i] + data[i-4] * m) / n;
			data[i+1] = (data[i+1] + data[i-3] * m) / n;
			data[i+2] = (data[i+2] + data[i-2] * m) / n;
			data[i+3] = (data[i+3] + data[i-1] * m) / n;
		}
	}

	return pixels;
}