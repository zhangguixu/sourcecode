# viewport

## 基础知识

* H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
* 忽略将页面中的数字识别为电话号码
* 忽略Android平台中对邮箱地址的识别
* 当网站添加到主屏幕快速启动方式，可隐藏地址栏（ios的safari）
* 当网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式

## 模板

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi"><!-- width取值与页面定义的宽度一致 -->
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>

<body>
这里开始内容
</body>

</html>
```


