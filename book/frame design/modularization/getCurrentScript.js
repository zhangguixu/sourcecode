/*
	用于取得正在被解析的JavaScript文件的src
	而不局限于加载器的JavaScript的地址，这个
	对实现匿名模块非常有用
*/
var head = DOC.head || DOC.getElementsByTagName("head")[0];
var moduleClass = "mass" + (new Date - 0);

function getCurrentScript(base){ //为true时相当于getBasePath

 	var stack;

 	try {
 		a.b.c();
 	} catch (e) { //safari 的错误对象只有line，sourceId，sourceURL
 		stack = e.stack;
 		if(!stack && window.opera) {
 			//opera 9 没有e.stack，但有e.Backstrace,不能直接取得，需要对e对象转字符串进行抽取
 			stack = (String(e).match(/of linked script \S+/g) || []).join(' ');
 		}
 	}

 	if(stack){
 		/**
 			e.stack最后一行在所有支持的浏览器大致如下
 				chrome23:
 					at http://113.93.50.63/data.js:4:1
 				firefox17:
 					@http://113.93.50.63/data.js:4:1
 				IE10:
 					at Global code (http://113.93.50.63/data.js:4:1)
 		*/
 		//进行字符串的正则处理，取出http://113.93.50.63/data.js
 		stack = stack.split(/[@ ]/g).pop(); //取得最后一行，最后一个空格或者@之后的部分
 		stack = stack === '(' ? stack.slice(1,-1) : stack.replace(/\s/,''); //去除掉换行符

 		return stack.replace(/(:\d+)?:\d+$/i,'');//去除掉行号或者存在的出错字符起始位置
 	}

 	//我们在动态加载模块时，节点都插入head中，因此只在head标签中寻找
 	var nodes = (base ? document : head).getElementsByTagName('script');
 	for(var i = nodes.length, node;node = nodes[--i]; ){
 		if((base || node.className === ModuleClass) && node.readyState === 'interactive'){
 			return node.className = node.src;
 		}
 	}
 }