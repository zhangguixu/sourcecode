/*
	Queuing and Flushing Render Tree Changes
	访问这些属性，会强迫队列刷新，并要求所有计划改变的部分立刻应用，
	offsetTop, offsetLeft, offsetWidth, offsetHeight
    scrollTop, scrollLeft, scrollWidth, scrollHeight
    clientTop, clientLeft, clientWidth, clientHeight
    getComputedStyle() (currentStyle in IE)（在IE 中此函数称为currentStyle）

    任何一个访问都将刷新渲染队列，即使你正在获取那些最近未发生改变的
    或者与最新的改变无关的布局信息
*/
function forceToFlush(){
	var computed,
	tmp='',
	bodystyle=document.body.style;

	if(document.body.currentStyle){
		computed=documnet.body.currentStyle;
	}else{
		computed=document.defaultView.getComputedStyle(document.body,'');
	}

	bodystyle.color='red';
	tmp=computed.backgroundColor;
	alert(tmp);
	bodystyle.color='yellow'
	tmp=computed.backgroundImage;
	alert(tmp);
	bodystyle.color='green';
	tmp=computed.backgroundAttachment;
	alert(tmp);
}

/*
	当你需要对DOM 元素进行多次修改时，你可以通过以下步骤减少重绘和重排版的次数：
	1、从文档流中摘除该元素（3种基本的方法）
		1-1 隐藏元素，进行修改，然后再显示它
		1-2 使用一个文档片断在已存DOM之外创建一个子树，然后将它拷贝到文档中
		1-3 将原始元素拷贝到一个脱离文档的节点中，修改副本，然后覆盖原始元素
	2、对其应用多重改变
	3、将元素带回文档中
*/
function batch(){
	var ul=document.getElementById("mylist");
	appendDataToElement(ul);
}
function batch_hide(){  //方法1：隐藏元素
	var ul=document.getElementById("mylist");
	ul.style.display="none"; //先将元素隐藏
	appendDataToElement(ul); //应用多重改变
	ul.style.display="block"; //再显示元素，此时进行一次重排版
}

function batch_fragment(){ //方法2：创建文档片段 【推荐】
	var fragment=document.createDocumentFragment();
	appendDataToElement(fragment);
	document.getElementById("mylist").appendChild(fragment);
}
function batch_clone(){  //方法3：复制副本，覆盖旧的版本
	var old=document.getElementById('mylist');
	var clone=old.cloneNode(true);
	appendDataToElement(clone);
	old.parentNode.replaceChild(clone, old);
}
function appendDataToElement(appendToElement){
	var data=[
		{
			"name":"Nicholas",
			"url":"http://nczonline.net"
		},
		{
			"name":"Ross",
			"url":"http://techfoolery.com"
		}
	];
	var a,li;
	for(var i=0,max=data.length;i<max;i++){
		a=document.createElement('a');
		a.href=data[i].url;
		a.appendChild(document.createTextNode(data[i].name));
		li=document.createElement("li");
		li.appendChild(a);
		appendToElement.appendChild(li);
	}
}