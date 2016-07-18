/*
	用于typeof对基本类型（js中5个基本类型）
		string
		number
		boolean
		undifined

		function类型
	来检测原始值

	用于一个为声明的变量不会报错，
	未定义的变量和值为‘undefined’的变量通过typeof都将返回undefined
*/

//检测字符串
if(typeof name === 'string'){}

//检测数字
if(typeof count === 'number'){}

//检测布尔值
if(typeof found === 'boolean' && found){}

//检测undefined
if(typeof MyApp === 'undefined'){}

//检测函数
if(typeof func === 'function'){}
/*
	对于null，如果需要检测，则使用!== 或者 === 来进行比较
*/
var e=document.getElementById('id')

if(e !== null){}
