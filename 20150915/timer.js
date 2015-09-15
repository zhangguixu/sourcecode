/*
	用定时器让出时间片

	浏览器在JavaScript 运行时间上采取了限制,
	此类限制有两个：调用栈尺寸限制和长时间脚本限制

	在任何一种情况下，创建一个定时器造成UI 线程暂停，如同它从一个任务切换到下一个任务。因此，
	定时器代码复位所有相关的浏览器限制，包括长运行脚本时间。此外，调用栈也在定时器代码中复位为零。
	这一特性使得定时器成为长运行JavaScript 代码理想的跨浏览器解决方案。
*/

/*
	一个常见的长运行脚本就是循环占用了太长的运行时间
	因此可以考虑用定时器来进行优化，可以被优化的关键点有两个：
		1）此处理过程必须是同步处理吗？
		2）数据必须按顺序处理吗？
*/
function processArray(items,process,callback){
	//创建一个副本
	var todo=items.concat();

	//开启定时器
	setTimeout(function(){
		process(todo.shift());
		if(todo.length>0){
			setTimeout(arguments.callee,25);  //再次执行当前的匿名函数
		}else{
			callback(items);
		}
	},25);
}

/*
	分解子任务，将子任务放入到队列中，每一个时间片执行一个子任务
*/
function  multistep(steps,args,callback){
	var tasks=steps.concat();

	setTimeout(function(){
		var task=tasks.shift();
		task.apply(null,args||[]);

		if(tasks.length>0){
			setTimeout(arguments.callee,25)
		}else{
			callback();
		}
	},25);
}


/*=========================================*/
/*
	前面的定时器存在一个很大的问题就是，大部分时候，单个处理会导致任务的处理效率并不高，
	因此可以在任务里面，在一个50毫秒的时间里面，进行批处理，如果处理不完，则等待25毫秒，
	再进行下一轮的批处理。
*/
/*改进版*/
function timedProcessArray(items,process,callback){
	var todo=items.concat();
	setTimeout(function(){
		var start=+new Date(); //小技巧，new Date()和+new Date()是不一样的
		do{
			process(todo.shift())  //进行批处理
		}while(todo.length>0&&(+new Date()-start)<50);

		if(todo.length>0){
			setTimeout(arguments.callee,25);
		}else{
			callback(items);
		}
	},25);
}
