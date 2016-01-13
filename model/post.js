/*
	post打开一个新的页面，思路是生成表单对象，表单具有POST方式，
	利用表单的submit事件，来使浏览器打开新的页面
*/

window.post=function(url,data){

	var form=document.createElement('form');


	// //解析data，实现携带参数,利用E5标准
	// var properties=Object.getOwnPropertyNames(data);

	// for (var i in properties){
	// 	createInput(properties[i],data[properties[i]]);
	// }
	for(var key in data){
		if(data.hasOwnProperty(key)){
			createIntput(key,data[key]);
		}
	};


	//作用域分割
	function createInput(name,value){
		var tmpInput=document.createElement('input');
		tmpInput.type='text';
		tmpInput.name=name;
		tmpInput.value=value;

		form.appendChild(tmpInput);
	}

	document.body.appendChild(form);

	form.method='post'; //指定为post
	form.action=url;
	form.submit();
};