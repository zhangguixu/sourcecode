# 移动端项目构建-2

## 新建页面

### meta

视图窗口，移动端特属的标签

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
```

    width – // [pixel_value | device-width] viewport 的宽度，范围从 200 到 10,000，默认为 980 像素
    height – // [pixel_value | device-height ] viewport 的高度，范围从 223 到 10,000
    initial-scale – // float_value，初始的缩放比例 （范围从 > 0 到 10）
    minimum-scale – // float_value，允许用户缩放到的最小比例
    maximum-scale – // float_value，允许用户缩放到的最大比例
    user-scalable – // [yes | no] 用户是否可以手动缩放
    target-densitydpi = [dpi_value | device-dpi | high-dpi | medium-dpi | low-dpi] 目标屏幕像素密度

【ios】是否启动webapp功能，会删除默认的苹果工具栏和菜单栏

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

【ios】当启动webapp功能时，显示手机信号、时间、电池的顶部导航栏的颜色。默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。这个主要是根据实际的页面设计的主体色为搭配来进行设置。

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

telephone & email

```html
<meta name="format-detection" content="telphone=no, email=no" />
```

其他

```html
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
```

### link

【ios】如果apple-mobile-web-app-capable设置为yes了，那么在iPhone,iPad,iTouch的safari上可以使用添加到主屏按钮将网站添加到主屏幕上。而通过设置相应apple-touch-icon标签，则添加到主屏上的图标就会使用我们指定的图片

```html
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
```

【ios】同样基于apple-mobile-web-app-capable设置为yes，可以用WebApp设置一个类似NativeApp的启动画面，可以根据media来设置不同的尺寸。

```html
// iPhone
<link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image" />

// iPhone Retina
<link href="apple-touch-startup-image-640x920.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />

// iPhone 5
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="apple-touch-startup-image-640x1096.png">

// iPad portrait
<link href="apple-touch-startup-image-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image" />

// iPad landscape
<link href="apple-touch-startup-image-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image" />

// iPad Retina portrait
<link href="apple-touch-startup-image-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />

// iPad Retina landscape
<link href="apple-touch-startup-image-1496x2048.png"media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"rel="apple-touch-startup-image" />
```