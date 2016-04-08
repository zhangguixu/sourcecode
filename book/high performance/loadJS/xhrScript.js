/*
	优点是有的，可以异步下载js文件，且控制js脚本运行的
	但是缺点就是js文件必须与页面处于同一个域内（这也是xhr的安全策略：同源策略）
	导致无法从CDNs下载js文件，因此这项技术并不被采用

	注：200-300表示有效的响应
		304表示缓存响应
*/
var xhr=new XMLHttpRequest();
if(xhr){
	xhr.open("get","loadScript.js",true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status>=200&&xhr.status<300||xhr.status==304){
				var script=document.createElement("script");
				script.type="text/javascript";
				script.text=xhr.responseText;
				document.body.appendChild(script);
			}
		}
	}
	xhr.send(null);
}else{
	alert("不支持XHR");
}