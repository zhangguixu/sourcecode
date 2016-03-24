/*
	归并排序
*/
(function(exports){

	//合并排好序的数组
	function merge(arr1,arr2){
		var len1 = arr1.length,
			len2 = arr2.length,
			i = 0,
			j = 0,
			tmp = [];

		while(i < len1 && j < len2){
			if(arr1[i] < arr2[j]){
				tmp.push(arr1[i]);
				i++;
			} else {
				tmp.push(arr2[j]);
				j++;
			}
		}

		while(i < len1){
			tmp.push(arr1[i]);
			i++;
		}

		while(j < len2){
			tmp.push(arr2[j]);
			j++;
		}

		return tmp;
	}
	//进行递归分治
	function mergeSort(array){

		if(array.length <= 1){
			return array;
		}
		var len = array.length,
			mid = parseInt(len / 2), //注意转化成整数
			left = [],
			right = [],
			i;

		//进行数组切分
		for(i = 0; i < mid; i++){
			left.push(array[i]);
		}

		for(i = mid; i < len; i++){
			right.push(array[i]);
		}


		left = mergeSort(left); //
		right = mergeSort(right);//切分之后

		return merge(left,right);
	}

	function sort(array){
		if(Object.prototype.toString.call(array) === '[object Array]'){
			return mergeSort(array);
		} else {
			throw  new Error('illegal parameter');
		}
	}

	exports.mergeSort = sort;

})(window);