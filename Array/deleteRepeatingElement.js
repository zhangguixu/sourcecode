/*
	实现思路：

		使用shift()获取并删除数组第一个元素，判断这个元素是否还存在于数组中，
		如果存在则说明这个元素是重复的，无需进行push()操作；循环数组，就能删
		除所有重复的元素。
*/

function deleteRepeatingElements(array){

	var i,len,item;

	for(i = 0, len = array.length;i < len;i++){
		item = array.shift();
		if(array.indexOf(item) === -1){
			array.push(item);
		}
	}

	return array;
}