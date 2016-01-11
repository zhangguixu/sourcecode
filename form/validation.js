/*
	表单常见数据验证
*/

//是否为空
function isEmpty(d){
	if(typeof d==='undefined')return true; //当值为undefined时，
	return d.length===0?true:false;
}

//手机号码
function isPhoneNumber(n){
	if(isEmpty(n)|| n.length!==11)
		return false;
	var reg= /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

	if(!reg.test(n))
		return false;

	return true;
}


