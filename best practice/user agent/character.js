/*
	特性探测不依赖于所使用的浏览器，而仅仅依据特性是否存在，
	所以具有更高的健壮性
*/

//例如浏览器的一下新的特性
function setAnimation(callback){

	if (window.requestAnimationFrame){     //标准
		return requestAnimationFrame();
	} else if (window.mozRequestAnimationFrame){ //Firefox
		return mozRequestAnimationFrame(callback);
	} else if (window.webkitRequestAnimationFrame){ //Webkit
		return webkitRequestAnimationFrame(callback);
	} else if (window.oRequestAnimationFrame){ //Opera
		return oRequestAnimationFrame(callback);
	} else if (window.msRequestAnimationFrame){ //IE
	 	return msRequestAnimationFrame(callback);
	} else {
		return setTimeout(callback,0);
	}

}