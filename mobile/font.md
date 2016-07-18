# 字体

> http://www.cnblogs.com/PeunZhang/p/3592096.html

## font-family

手机系统ios、android等是不支持微软雅黑字体的，如果要使用微软雅黑字体，可以使用`@font-face`定义微软雅黑字体，并存放到服务器，供页面下载。

### 三大手机系统字体

1. ios

    * 默认中文字体是Heiti SC
    * 默认英文字体是Helvetica
    * 默认数字字体是HelveticaNeue

2. android

    * 默认中文字体是Droidsansfallback
    * 默认英文和数字字体是Droid Sans

3. winphone

    * 默认中文字体是Dengxian(方正等线体)
    * 默认英文和数字字体是Segoe

*三种不同的中文字体和微软雅黑一样是无衬线字体*

![font](./img/font.jpg)

### 最佳实践

中文字体使用系统默认即可，英文使用`Helvetica`

```css
body{
    font-family:Helvetica;
}
```

## font-size

1. 对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可
2. 对于需要适配各种移动设备，使用rem

### 字体配置

```css
html{font-size:10px}
@media screen and (min-width:321px) and (max-width:375px){html{font-size:11px}}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:12px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:15px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:20px}}
@media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
@media screen and (min-width:800px){html{font-size:25px}}
```