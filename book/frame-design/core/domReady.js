/*
	DOMContentLoaded事件
*/

/*
	http://javascript.nwbx.com/IEContentedLoaded/
	by Diego Perini 2007.10.05

	对旧版本IE的hack，思路是

		对DOM进行操作：
			如果不报错，则执行用户回调；
			如果报错，则捕获错误，设置定时器，隔一段时间在对DOM进行操作

*/
function IEContentLoaded(w,fn){
	var d=w.document,
		done=false,
		init=function(){
			if(!done){ //只执行一次
				done=true;
				fn();
			}
		};

	(function(){
		try{ //在DOM未建完之前调用元素doScroll抛出错误
			d.documentElement.doScroll('left'); //IE独有方法，模拟用户滚动条点击
		} catch (e){
			setTimeout(arguments.callee,50);
			return;
		}
		init(); //没有错误则执行用户回调
	})();

	//如果用户是在domReady之后绑定这个函数呢？
	d.onreadystatechange=function(){
		if (d.readyState == 'complete'){
			d.onreadystatechange = null;
			init();
		}
	}
}

/*
	IE 的 script defer hack
*/
document.write("<script id=__ie_onload defer src=//0 mce_src=http://0></scr"+"ipt>");
  script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() { //IE即使是死链也能触发事件
        if (this.readyState == "complete")
         init(); // 指定了defer的script在dom树建完才触发
};

/*
	此外，还有个问题，如果种子模块是动态加载的，在它插入DOM树时，DOM树
	已经建完，那么怎么触发ready的回调？
	jQuery给出的方案是：
		1）监听onload
		2）如果onload都没有赶上，那么判断document.readystate == 'complete'
	还有个问题是：FireFox3.6 之前没有这个属性
*/
//前置声明
var W3C = document.dispatchEvent; //IE9开始支持W3C的事件模型与getComputedStyle取样式值
var readyList=[];
var html=document.documentElement;
var DOC=document;


mass.ready=function(fn){
	if(readyList){
		readyList.push(fn);
	}else{
		fn();
	}
}
var readyFn,
	ready = W3C ? 'DOMContentLoaded' : 'readystatechange' ;

function fireReady(){
	for(var i = 0, fn;fn = readyList[i++];){
		fn();
	}

	readyList=null;
	fireReady=function(){};    //惰性函数，防止IE9二次调用 _checkDeps
}

function doScrollCheck(){
	try{ //IE下通过doScrollCheck检测DOM是否建完
		html.doScroll('left');
		fireReady();
	} catch (e){
		setTimeout(doScrollCheck);
	}
}

//在firefox3.6之前，不存在readyState属性
 //http://www.cnblogs.com/rubylouvre/archive/2012/12/18/2822912.html
if (!DOC.readyState) {
      var readyState = DOC.readyState = DOC.body ? "complete" : "loading";
}
if (DOC.readyState === "complete") {
      fireReady(); //如果在domReady之外加载
} else {
    $.bind(DOC, ready, readyFn = function() {
        if (W3C || DOC.readyState === "complete") {
            fireReady();
            if (readyState) { //IE下不能改写DOC.readyState
                DOC.readyState = "complete";
            }
        }
    });
    if (html.doScroll) {
        try { //如果跨域会报错，那时肯定证明是存在两个窗口
            if (self.eval === parent.eval) {
                doScrollCheck();
            }
        } catch (e) {
            doScrollCheck();
        }
    }
}