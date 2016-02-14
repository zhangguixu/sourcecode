/*
	在一个数值的范围随机返回一个数
*/
function selectFrom(lowerValue,upperValue){
	var choices = uppperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}