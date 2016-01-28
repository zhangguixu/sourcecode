/*
	获取路径
*/
function getBasePath(){

	//特定浏览器的hack
	try{
		a.b.c()
	} catch (e){
		if (e.fileName) { //firefox
			return e.fileName;
		} else if (e.sourceURL) { //safari
			return e.sourceURL;
		}
	}

	var nodes=document.getElementsByTagName('script');
	if(window.VBArray){ //IE6,7,8,倒序查找更快
		for(var i = nodes.length,node;node=node[--i]; ){
			if(node.readyState === 'interactive'){//已加载，文档与用户可以开始交互
				break;
			}
		}
	} else {
		node = nodes[nodes.length - 1];
	}

	var src=document.querySelector ? node.src : node.getAttribute('src',4);

	return src;
}