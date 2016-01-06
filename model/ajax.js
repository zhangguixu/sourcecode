/*
	ajax的原生实现
*/

var ajax={
	create:function(){
		var xhr=null;
		if(window.XMLHttpRequest){ //非IE
			xhr=new XMLHttpRequest();
		}else if(window.ActiveXObject){ //IE
			//针对IE6，IE5.5，IE5
            //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中
            //排在前面的版本较新
            var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
            for ( var i = 0; i < activexName.length; i++){
                try {
                    xhr= new ActiveXObject(activexName[i]);
                    if(xhr)
                    	break;
                    }catch (e){};
           }
		}
		return xhr;
	},
	get:function(url,callback){
		var req=this.create();
		if(req){
			req.open('GET',url,true);
			req.onreadystatechange=function(){
				if(req.readyState==4){
					if(req.status==200){
						callback(req.responseText);
					}
				}else{
					console.log('error');
				}
			}
		}
	},
	post:function(url,data,callback){//data先简单处理为string a=2&b=3
		var req=this.create();
		if(req){
			req.open('POST',url,true);
			//需要设置请求头
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8;");
			req.send(data);
			req.onreadystatechange=function(){
				if(req.readyState==4){
					if(req.status==200){
						callback(req.responseText);
					}
				}else{
					console.log('error');
				}
			}
		}
	}
}