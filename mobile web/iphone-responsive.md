# 移动web开发

> 来源：http://www.25xt.com/html5css3/10524.html

## iphone的自适应设计

### 1. viewport

使用viewport是一种简单粗暴的方式

```html
<meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">
```

直接设置viewport为320px的`1.3`倍，将页面放大1.3倍

**为什么是1.3**

目前大部分页面都是以320px为基准的布局，而iphone6的宽度比是375/320 = 1.1718，iphone6+则是414/320 = 1.29375，那么以1.29倍也就约等于1.3了


### 2. css media query

```css
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
  /*iphone 6*/
}

@media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
  /*iphone 6 plus*/
}
```

在原有的页面基础上，再针对相应的屏幕大小单独写样式做适配。

### 3. REM布局

REM是相对于dom结构的`根元素`来设置大小，也就是html这个元素。

**计算示例**

我们设置html的font-size:12px，即1rem = 12px，那么18px也就是18/12 = 1.5rem

1. 适配ip6+设备，思路是设置html的font-size来控制rem的大小

    ```css
    /*320px布局*/
    html{font-size:100px;}
    body{font-size:0.14rem ;/*实际相当于14px*/}

    /* iphone 6 */
    @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
        html{font-size: 117.1875px;}
    }
    /* iphone6 plus */
    @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
        html{font-size: 129.375px;}
    }
    ```

2. 当页面大小调整或者屏幕翻转，需要借助js来调整

    ```javascript
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

      // Abort if browser does not support addEventListener
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    ```

相对于百分比布局，它的优势在于可以在复杂的页面小部件内进行细微的调整，能更好的控制元素的大小。

### 4. 图片自适应(无法理解这一章节，以后待考证)

图片宽度为100%时，页面加载时会存在`高度塌陷`的问题。

可以使用`padding-top`设置百分比值来实现自适应，公式如下

    padding-top = (imgHeight / imgWidth) * 100%

原理：padding-top值为百分比时，取值是相对于宽度的。

### 5. 图片高清化

核心点在于`devicePixelRatio`，在iphone6 plus是3倍高清图。

1. 解决：img的`srcset`属性，可以对一张图片设置2个URL，浏览器自动加载对应的图片

    ```html
    <img src="mm-width-128px.jpg" srcset="mm-width-128px.jpg 1x, mm-width-256px.jpg 2x">
    ```

    [进一步阅读](./http://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/)

2. 解决：media query来判断dpr，加载不一样的图片

    ```css
    /* 普通显示屏(设备像素比例小于等于1)使用1倍的图 */
    .css{
        background-image: url(img_1x.png);
    }

    /* 高清显示屏(设备像素比例大于等于2)使用2倍图  */
     @media only screen and (-webkit-min-device-pixel-ratio:2){
        .css{
            background-image: url(img_2x.png);
        }
    }

    /* 高清显示屏(设备像素比例大于等于3)使用3倍图  */
    @media only screen and (-webkit-min-device-pixel-ratio:3){
        .css{
            background-image: url(img_3x.png);
        }
    }
    ```

3. 解决：image-set，是webkit的私有属性，也是css4的一个属性，为解决retina屏幕下的图像显示而生

    ```css
    .css {
      background-image: url(1x.png);    /*不支持image-set的情况下显示*/
      background: -webkit-image-set(
        url(1x.png) 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
        url(2x.png) 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
        url(3x.png) 3x/* 支持image-set的浏览器的[3倍Retina屏幕] */
      );
  }
    ```