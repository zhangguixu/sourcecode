/*
	选择排序
*/
(function(exports){

	function selectionSort(a){
		if(Object.prototype.toString.call(a) === '[object Array]'){
			var len = a.length,
				index = 0,
				min,tmp,
				i;

			while(index < len){
				min = index;
				for(i = index; i < len; i++){
					if(a[min] > a[i]){
						min = i;
					}
				}
				tmp = a[index];
				a[index] = a[min];
				a[min] = tmp;
				index++;
			}
			return a;
		}
	}

	exports.selectionSort = selectionSort;

})(window);