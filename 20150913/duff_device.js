/*
	达夫设备：限制循环迭代次数的模式
	达夫设备是一个循环体展开技术，在一次迭代中实际上执行了多次迭代操作

	达夫设备背后的基本理念是：
	每次循环中最多可8 次调用process()函数，
	循环迭代次数为元素总数除以8，
	因为总数不一定是8的整数倍，
	所以startAt 变量存放余数，
	指出第一次循环中应当执行多少次process()。

	适用场景：循环次数>1000
*/


function duff_origin(items){
	var iterations=Math.floor(items.length/8),
	startAt=items.length%8,
	i=0;
	do{
		switch(startAt){     //执行余数次数
			case 0:process(items[i++]);
			case 7:process(items[i++]);
			case 6:process(items[i++]);
			case 5:process(items[i++]);
			case 4:process(items[i++]);
			case 3:process(items[i++]);
			case 2:process(items[i++]);
			case 1:process(items[i++]);
		}
		startAt=0;
	}while(iterations--);
}

//取消了switch，余数和主循环分开
function duff_faster(items){

	var iterations=items.length%8,i=0;

	while(i<iterations){  //最多处理7次
		console.log(items[i++]);
	}

	iterations=Math.floor(items.length/8);
	while(iterations--){
		console.log(items[i++]);
		console.log(items[i++]);
		console.log(items[i++]);
		console.log(items[i++]);
		console.log(items[i++]);
		console.log(items[i++]);
		console.log(items[i++]);
		console.log(items[i++]);

	}
}