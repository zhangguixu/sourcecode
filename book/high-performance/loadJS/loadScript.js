/*
	动态脚本元素，可以不阻塞页面的其他行为，
	下载之后，返回的代码会立即执行，有些情况下就需要去监听
	代码下载的情况，避免出错
*/
function loadScript(url,callback){
	var script=document.createElement("script");
	script.type="text/javascript";

	//设置回调
	if(script.readyState){ //IE
		script.onreadystatechange=function(){
			if(script.readyState=="loaded"||script.readyState=="complete"){
				script.onreadystatechange=null;   //清除句柄
				callback();
			}
		}
	}else{
		script.onload=function(){
			script.onload=null;
			callback();
		}
	}

	script.src=url;
	document.getElementsByTagName("head")[0].appendChild(script);
}


/*
	大部分情况下，浏览器不会按照顺序加载文件，
	所以可以通过设置回调的方式来保证加载的顺序
	loadScript("file1.js",function(){
		loadScript("file2.js",function(){
			loadScript("file3.js",function(){
				alert("completed");
			})
		})
	})
*/
