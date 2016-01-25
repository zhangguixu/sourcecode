#数据类型转换

	-类型

		1、隐式数据类型转换：大量存在，容易发生错误
		2、显示数据类型转换


	-几种常见的类型转换

		1、从字符串值转换为数值

			-显示
				·Number()
					与以下两种的区别：Number('100x')   //NaN
									  parseInt('100x') //100
				·parseInt()
				·parseFloat()

			-隐式
				·'100'-1
					【！Warn！】'100'+1 //'1001'
				·+'100' //+号作为单目运算，是正号运算

			注：
				无法被转换为数值的字符串  ---> NaN
								空字符串  ---> 0

		2、从数值转换为字符串值

			-显示
				·String(1)
				·1.toString()

			-隐式
				·foo+'100' //foo100
				·100+'foo' //100foo

			注：
				数值NaN       --->   'NaN'
				数值Infinity  --->   'Infinity'
				数值-Infinity --->   '-Infinity'

		3、转换为布尔型

			false：
				-  0
				-  NaN
				-  null
				-  undefined
				-  ''

		4、从Object类型转换为基本数据类型

			var obj={};
			obj++;
			obj  //NaN

			对象要有能返回恰当数值的valueOf方法