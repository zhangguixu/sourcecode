/*
	删除掉传入的类名
*/

function deleteClassByName(element,name){

	var classNames = element.className.split(/\s+/);

	var pos = -1,
		i,
		len;

	for(i = 0,len = classNames.length;i < len;i++){
		if(classNames[i] === name){
			pos = i;
			break;
		}
	}

	//用splice函数，来进行数组项的删除
	classNames.splice(i,1);

	//重新设置
	element.className = classNames.join('');
}