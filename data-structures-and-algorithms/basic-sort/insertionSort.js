/*
	插入排序
*/
(function(exports){

	function insertionSort(a){
		if(Object.prototype.toString.call(a) === '[object Array]'){
			var len = a.length,
				index = 1,
				i,tmp;

			while(index < len){
				for(i = index; i > 0; i--){
					if(a[i] < a[i-1]){
						tmp = a[i];
						a[i] = a[i-1];
						a[i-1] = tmp;
					} else {
						break;
					}
				}
				index++;
			}

			return a;
		}
	}

	exports.insertionSort = insertionSort;
})(window);