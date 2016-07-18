# 移动端项目构建-3

> 来源：http://www.w3cplus.com/mobile/mobile-terminal-refactoring-mobile-layout.html

## 整体布局

![layout](../img/layout1.png)

一般来说，`header`和`footer`部分都为`fixed`，中间部分内容可以滚动

### fixed布局

因为移动端单页面特性，所以每个page为一个页面，然后整体使用wrap-page包裹。考虑到可滚动的为page内容，所以我们得给wrap-page一个具体的高度，然后使用原生的`-webkit-overflow-scrolling:touch;`来实现滚动，当然对于不支持的，也可以使用`iscroll`来兼容，而`iscroll`同样也需要一个固定高度的容器来包裹可滚动的内容。

```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.wrap-page {
  padding-top:44px;
  padding-bottom:44px;
  -webkit-overflow-scrolling: touch;
}
.header,.footer{
  position: fixed;
  left: 0;
  z-index: 960;
  height:44px;
  width: 100%;
  text-align: center;
  z-index:990;
  background-color: #fff;
  line-height: 44px;
}
.header{
  top:0;
  border-bottom:1px solid #f00;
}
.footer{
  bottom:0;
  border-top:1px solid #f00;
}
.page{
    padding:10px;
  }
.page p{
    margin-bottom:10px;
}
```

虽然header和footer部分采用了fixed定位，脱离了文档流，但还是会挡住下面的内容，所以有必要对wrap-page设置上下的padding间隔，以防止header和footer遮挡page内容。

**特点**

属于全局滚动

### 绝对定位布局

关键在于设置wrap-page的top，bottom的距离为header和footer的高度

```css
.header,.footer,.wrap-page{
  position:absolute;
  left:0;
  right:0;
}
.header,.footer{
  height:44px;
  background-color:#fff;
  text-align:center;
  line-height:44px;
  z-index:900;
}
.header{
  top:0;
  border-bottom:1px solid #f00;
}
.footer{
  bottom:0;
  border-top:1px solid #f00;
}
.wrap-page{
  top:44px;
  bottom:44px;
  overflow-y:auto;
  -webkit-overflow-scrolling:touch;
}
.page{
  padding:10px;
}
.page p{
  margin-bottom:10px;
}
```

**问题**

滚动的时候地址栏不隐藏，是局部滚动带来的问题，不会有出界的情况

[测试页](./code/layout-absolute.html)

**解决**

1. safari（实际测试解决不了）

  ```javascript
  window.addEventListener('load', function(){
   setTimeout(function(){ window.scrollTo(0, 1); }, 100);
  });
  ```

2. 其他

  ```html
  <!--UC-->
  <meta name="browsermode" content="application">
  <!--QQ应用模式-->
  <meta name="x5-page-mode" content="app">
  ```

### flex布局

设置body为flex布局，方向为垂直方向，wrap-page的flex为1。实际测试为全局滚动效果，会自动隐藏地址栏

```css
*{
  margin:0;
  padding:0;
}
body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.wrap-page {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.header,.footer{
  height:44px;
  background-color: #fff;
  text-align: center;
  line-height:44px;
  position:relative;
  z-index:990;
}
.header{
  border-bottom: 1px solid #f00;
}
.footer{
  border-top: 1px solid #f00;
}
.wrap-page{
  overflow-y:auto;
  -webkit-overflow-scrolling:touch;
}
.page{
  padding: 10px;
}
.page p{
  margin-bottom: 10px;
}
```

**问题**

兼容性有问题，性能？


## 总结

此文章实际上忽略一个全局滚动和局部滚动带来的问题，有点错误，不过可以作为借鉴吧。
