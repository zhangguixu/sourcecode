# 移动端项目构建-3

## 整体布局

![layout](../img/layout1.png)

一般来说，`header`和`footer`部分都为`fixed`，中间部分内容可以滚动

### fixed布局

```html
<header class="header fixed-top">header</header>
    <div class="wrap-page">
        <section class="page">1</section>
        <section class="page">2</section>
        <section class="page">3</section>
        <section class="page">4</section>
    </div>
<footer class="footer fixed-bottom">footer</footer>
```

因为移动端单页面特性，所以每个page为一个页面，然后整体使用wrap-page包裹。考虑到可滚动的为page内容，所以我们得给wrap-page一个具体的高度，然后使用原生的`-webkit-overflow-scrolling:touch;`来实现滚动，当然对于不支持的，也可以使用`iscroll`来兼容，而`iscroll`同样也需要一个固定高度的容器来包裹可滚动的内容。

```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html, body, .wrap-page {
  height: 100%;
}
.wrap-page {
  -webkit-overflow-scrolling: touch;
}
.fixed-top {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 960;
  height:44px;
}

.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 940;
  height:44px;
}
```

虽然header和footer部分采用了fixed定位，脱离了文档流，但还是会挡住下面的内容，所以有必要对wrap-page设置上下的padding间隔，以防止header和footer遮挡page内容。



