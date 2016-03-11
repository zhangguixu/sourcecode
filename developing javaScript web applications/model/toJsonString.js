/*
	把对象转换成json数据
*/

function toJsonString(object){

	var jsonStringArray = [];

	for (property in object){
		if(object.hasOwnProperty(property)){
			jsonStringArray.push(property + ':' + object[property]);
		}
	}

	return '{' + jsonStringArray.join(',') + '}';
}