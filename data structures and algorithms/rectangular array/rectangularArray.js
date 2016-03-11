/*
	参照Crockford通过扩展JavaScript数组对象，来实现二维数组
*/

if(!Array.matrix){
	Array.matrix = function(numrows,numcols,initial){
		var arr = [];
		for(var i = 0; i < numrows; i++){
			var column = [];
			for(var j = 0; j < numcols; j++){
				column[j] = initial;
			}
			arr[i] = column;
		}
		return arr;
	}
}
