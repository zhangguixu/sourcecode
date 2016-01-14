/*
	单变量模式下，创建命名空间

*/

var globalObject={
	namespace:function(ns){
		var parts=ns.split('.'),
			object=this,
			i,len;

		for(i=0,len=parts.length;i<len;i++){
			if(!object[parts[i]]){
				object[parts[i]]={};
			}
			object=object[parts[i]];
		}

		return object;
	}
}

//示例
globalObject.namespace('Book.MaintainableJavaScript');

gloalObject.Book.MaintainableJavaScript.author='zhang';

