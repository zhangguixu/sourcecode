#image

## src属性

image元素，不一定要添加到文档后才开始下载，只要设置了src属性，就会开始下载。

```javascript
var image = document.getElementById('img');
image.onload = function(){
    alert('load');
};
//先添加到文档树
document.body.appendChild(image);

//再指定src属性，开始下载图像
image.src = 'smile.gif';
```

## DOM0级的Image对象

在DOM出现之前，开发人员经常使用Image对象在客户端预先加载，可以像使用<img\>元素一样使用Image对象，只不过`无法将其添加到DOM树`。

```javascript
var image = new Image();
image.src = 'smile.gif';
```

