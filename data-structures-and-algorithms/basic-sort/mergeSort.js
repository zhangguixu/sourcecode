/*
	归并排序
*/
(function(exports){

	//合并排好序的数组
	function merge(arr,low,mid,high){
		var i,j,k; //辅助下标
		var tmp = []; //辅助数组

		for(k = low; k <= high; k++){
			tmp[k] = arr[k]; //先复制到tmp数组中
		}

		i = k = low;
		j = mid+1;

		while(i <= mid && j <= high){
			if(tmp[i] < tmp[j]){
				arr[k++] = tmp[i++];
			} else {
				arr[k++] = tmp[j++];
			}
		}
		while(i <= mid){
			arr[k++] = tmp[i++];
		}
		while(j <= high){
			arr[k++] = tmp[j++];
		}
	}
	//进行递归分治
	function mergeSort(arr,low,high){

		if(low < high){
			var mid = parseInt( (low + high) / 2);
			mergeSort(arr,low,mid);
			mergeSort(arr,mid+1,high);
			merge(arr,low,mid,high);
		}

		return arr;
	}

	function sort(array){
		if(Object.prototype.toString.call(array) === '[object Array]'){
			return mergeSort(array,0,array.length-1);
		} else {
			throw  new Error('illegal parameter');
		}
	}

	exports.mergeSort = sort;

})(window);