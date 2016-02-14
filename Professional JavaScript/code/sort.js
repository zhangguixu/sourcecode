/*
	实现正确的升序，降序排序
*/

//升序
function asc(v1,v2){
	if(v1 > v2){
		return 1;
	} else if (v1 < v2){
		return -1;
	} else {
			return 0;
	}
}
//降序
function desc(v1,v2){
	return -asc(v1,v2);
}

var a = [0,1,5,15,10];
a.sort(asc);
a;//0,1,5,10,15