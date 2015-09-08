/*
	HTMLCollection实际上在查询文档，当你更新信息时，每次
	都要重复执行这种查询操作，例如读取集合中元素的数目，
	也就是集合的length，这正是低效率的来源
*/
var alldivs=document.getElementsByTagName("div");
for(var i=0;i<alldivs.length;i++){
	console.log(alldivs.length);
	document.body.appendChild(document.createElement("div"));
}