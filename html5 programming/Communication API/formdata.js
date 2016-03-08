/*
	FormData 对象
*/

/*
	创建一个FormData对象
*/

var oMyForm=new FormData();
//使用append()方法向该对象添加字段
oMyForm.append('username','zhang');
oMyForm.append('psw','111');

//fileinputElement中包含了用户所选择的文件
oMyForm.append('userFile',fileInputElement.files[0]);

var xhr=new XMLHttpRequest();

xhr.open('POST','example.com');

xhr.send(oMyForm);


/*
	使用HTML表单来初始化一个FormData对象
*/

var formElement=document.getElementById('myform');

var formData=new FormData(formElement);

//可以在已有的表单数据的基础上添加新的键值对
formData.append('token','123');

xhr.open('POST','example.com');

xhr.send(formData);
