/*
	利用Haversine公式的原理，来计算地球上两个位置之间的距离
*/

Number.prototype.toRadians=function(){
	return this * Math.PI / 180;
}

function distance(latitude1,longitude1,latitude2,longitude2){

	//R是地球的半径，以km为单位
	var R=6371;

}