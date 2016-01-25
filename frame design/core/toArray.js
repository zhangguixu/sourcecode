/*
	通常只要[].slice.call就能完成转换，但是旧版本IE中的
	HTMLCollection、NodeList不是Object的子类，采用如上
	方法将导致IE执行异常
*/
/*
	mass的实现，
		一开始就进行区分：
			W3C方直接[].slice.call
			IE自己手动实现一个slice方法
*/

$.slice=window.dispatchEvent ? function(nodes,start,end){
	return [].slice.call(nodes,start,end);
} : function(nodes,start,end){
	var ret = [],
		  n = nodes.length;

	if(end === void 0 || typeof end === 'number' && isFinite(end)){
		start=parseInt(start,10)|| 0 ;
		end=end == void 0 ? n : parseInt(end, 10);

		if(start<0){
			start += n;
		}

		if(end>n){
			end = n;
		}

		if(end<0){
			end += n;
		}

		for(var i=start;i<end;i++){
			ret[i-start] = nodes[i];
		}
	}

	return ret;
}