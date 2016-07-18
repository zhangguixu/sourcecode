/*
	制表(memoization):通过缓存先前计算结果为后续计算所重复使用，
		 			  避免了重复工作,这使得制表成为递归算法中有用的技术

	可作为性能优化的一个重点掌握的技术
*/

/*
	原始的阶乘函数
*/
function factorial(n){
	if(n==0){
		return 1;
	}else{
		return n*factorial(n-1);
	}
}

/*
	var fact6=factorial(6)
	var fact5=factorial(5)
	var fact4=factorial(4)
	递归函数重复多次，而2和3的结果都在1中被计算过了，2和3又重复计算
*/
function memfactorial(n){
	if(!memfactorial.cache){ //生成缓存
		memfactorial.cache={
			"0":1,
			"1":1
		};
	}
	if(!memfactorial.cache.hasOwnProperty(n)){ //如果缓存中没有
		memfactorial.cache[n]=n*memfactorial(n-1);
	}
	return memfactorial.cache[n];
}

/*
	制表函数:提供一个基本的制表过程，但是存在显著的性能问题
*/
function memoize(func,cache){
	cache=cache||{};
	var shell=function(arg){
		if(!cache.hasOwnProperty(arg)){
			cache[arg]=func(arg);
		}
		return cache[arg];
	};
	return shell;
}


