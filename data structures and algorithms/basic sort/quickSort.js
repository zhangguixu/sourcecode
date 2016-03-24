/*
	快排
*/
(function (exports){

	//每次确定一个位置
	function partition(a,low,high){
		var pivot = a[low],
			tmp;

		while(low < high){

			while(low < high && a[high] > pivot)high--;

			tmp = a[low];
			a[low] = a[high];
			a[high] = tmp;

			while(low < high && a[low] <= pivot)low++;

			tmp = a[low];
			a[low] = a[high];
			a[high] = tmp;
		}

		return low;

	}


	function quickSort(a,low,high){
		if(low < high){
			var pivotKey = partition(a,low,high); //排好序
			quickSort(a,low,pivotKey-1);
			quickSort(a,pivotKey+1,high);
		}
		return a;
	}



	function sort(array){
		if(Object.prototype.toString.call(array) === '[object Array]'){
			return quickSort(array,0,array.length-1);
		} else {
			throw  new Error('illegal parameter');
		}
	}

	exports.quickSort = sort;

})(window);