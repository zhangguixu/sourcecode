/*
	XMLHttpRequest Level 2
*/

//检测支持的情况

var xhr=new XMLHttpRequest();

if( typeof xhr.withCredentials === 'undefined' ){
	//不支持
}else{
	//支持
}

//示例
xhr.open('GET','http://www.example.com',true);


/*
	XMLHttpRequest Level 2 不再使用数值型状态表示法
	，而是提供了命名进度事件，为事件处理程序设置相应
	的回调函数后，就可以对这些事件进行监听了
*/

xhr.onprogress=function(e){
	var total=e.total;
	var loaded=e.loaded;
	var radio=0;

	if(e.lengthComputable){
		//利用进度信息做些事情
		setProgress(ratio+"% uploaded");
	}
}

xhr.upload.onprogress=function(e){
	var total=e.total;
	var loaded=e.loaded;
	var radio=0;

	if(e.lengthComputable){
		//利用进度信息做些事情
		setProgress(ratio+"% uploaded");
	}
}

xhr.onload=function(e){
	setProgress('finished');
}

xhr.onerror=function(e){
	setProgress('error');
}

/*
	支持二进制API，后面再补充
*/