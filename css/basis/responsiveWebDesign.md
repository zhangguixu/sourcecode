# css基础

## 自适应网页设计

> 来源：http://www.ruanyifeng.com/blog/2012/05/responsive_web_design.html

### 1. 概念

> 2010年，Ethan Marcotte提出了"自适应网页设计"这个名词，指可以自动识别屏幕宽度，并作出相应调整的网页设计。

### 2. 允许网页宽度自动调整

`viewport`是网页默认的宽度和高度。首先要设置

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

主流浏览器都支持这个设置。

### 3. 不使用绝对宽度

由于网页会根据屏幕宽度调整布局，所以不能使用绝对宽度的布局，也不能使用具有绝对宽度的元素。

```css
width:xx%;
width:auto;
```

### 4. 相对大小的字体

字体大小可以使用`rem`，它与`em`的区别

* em是相对于父元素大小，在默认情况下，浏览器的默认大小为16px，即1em = 16px

* rem是相对于HTML根元素，通过它既可以做到至修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层符合的连锁反应。

目前除了IE8及更早版本外，所有浏览器均已支持rem。

### 5. 流动布局（fluid grid）

流动布局的含义是`各个区块的位置都是浮动的，不是固定不变的`。

```css
.main{
    float : right;
    width : 70%;
}
.leftBar{
    float : left;
    width : 25%;
}
```

这样做的好处是：如果宽度太小，放不下两个元素，后面的元素会自动滚动到前面的元素的下方，不会在水平方向`overflow`，避免了水平滚动条的出现。

### 6. 选择加载css

`自适应网页设计`的核心，就是css3引入的`media query`模块，它的思路是自动探测屏幕宽度，然后加载相应的css文件。

```css
<link rel="stylesheet" media="screen and (max-width:400px;)" href="tinyScreen.css">
```

```css
<link rel="stylesheet" media="screen and (min-width:400px) and (max-width:600px;)" href="tinyScreen.css">
```

### 7. CSS的@media规则

同一个css文件中，可以根据不同的屏幕分辨率，选择应用不同的CSS规则。

```css
@media screen and (max-width:400px){
    .column{
        float : none;
        width:auto
    }
    #sidebar{
        display:none;
    }
}
```

### 8. 图片的自适应(fluid image)

```css
img{
    max-width:100%;
}
```

在有条件的情况下，最好还是要根据不同大小的屏幕，加载不同分辨率的图片。


