/*
	利用匿名立即执行函数和闭包，来创建私有作用域
*/
var Person=function(){};

(function(){

	var findById=function(){/*....*/}; //私有方法

	Person.find=function(id){
		if(typeof id==='number')
			return findById(id);  //闭包，匿名对象仍然存在
	};

})();

//将变量挂载到全局对象上

var global=window; //在浏览器的环境下，window为全局变量
(function(exports){
	var foo='bar';

	//将变量暴露出去
	exports.foo=foo;
})(global);

assertEqual(foo,'bar');