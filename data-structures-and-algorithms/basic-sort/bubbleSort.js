/*
	冒泡排序
*/

(function(exports){

	function bubbleSort(array){
		if(Object.prototype.toString.call(array) === '[object Array]'){
			var flag = true,
				len = array.length,
				i,tmp,j = 1;

			while(flag){
				flag = false;
				for(i = 0; i < len-j; i++){
					if(array[i] > array[i+1]){
						tmp = array[i];
						array[i] = array[i+1];
						array[i+1] = tmp;
						flag = true;
					} 
				}
				j++;
			}
			return array;
		}
	}

	exports.bubbleSort = bubbleSort;

})(window);