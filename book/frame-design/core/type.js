/*
	类型判定：
		mass framework的思路和jQuery的一致，尽量减少isXXX的数量
*/
//建立类型的映射
var class2type={
	'[objectHTMLDocument]'    : 'Document',
	'[objectHTMLCollection]'  : 'NodeList',
	'[objectStaticNodeList]'  : 'NodeList',
	'[objectIXMLDOMNodeList]' : 'NodeList',
	'[objectDOMWindow]'       : 'Window',           //safari4.04
	'[object global]'         : 'Window',           //chrome 5.0.3.22
	'null'                    : 'Null',
	'NaN'                     : 'NaN',
	'undefined'               : 'undefined'
},
toString=class2type.toString;

//正常情况下
'Boolean,Number,String,Function,Array,Date,RegExp,Window,Document,Arguments,NodeList'
	.replace(/[^, ]/g,function(name){
		class2type['[object '+ name + ']'] = name;
	});

mass.type = function(obj,str){
	var result = class2type[ (obj == null || obj !== obj) ? obj : toString.call(obj) ]
					|| obj.nodeName || '#';

	if(result.charAt(0) === '#' ){  //兼容旧版浏览器与处理个别情况，如window.opera

		//hack,利用IE6,IE7,IE8 window == document 为 true，document == window 为 false的特性
		if(obj == obj.document && obj.document != obj){
			result='Window';
		} else if (obj.nodeType === 9){ //nodeType 属性返回以数字值返回指定节点的节点类型。9代表document
			result='Document';
		} else if (obj.callee){ //arguments 特有的属性
			resutl='Arguments';
		} else if (isFinite(obj.length) && obj.item){ //obj.item()方法，可返回节点列表中处于指定的索引号的节点。
			result='NodeList';
		} else {
			result=toString.call(obj).slice(8,-1); //[object XXXX]
		}

	}

	if(str){ //提供一个进行类型比较的功能
		return str === result;
	}

	return result;
}

