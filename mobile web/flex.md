# flex

## 实践

```css
/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */
.flex{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
}
.flex-v{
    -webkit-box-orient:vertical;
    -webkit-flex-direction:column;
    -ms-flex-direction:column;
    flex-direction:column;
}
.flex-1{
    -webkit-box-flex:1;
        -webkit-flex:1;
        -ms-flex:1;
        flex:1;
}
.flex-align-center{
    -webkit-box-align:center;
    -webkit-align-items:center;
    -ms-flex-align:center;
    align-items:center;
}
.flex-pack-center{
    -webkit-box-pack:center;
    -webkit-justify-content:center;
    -ms-flex-pack:center;
    justify-content:center;
}
.flex-pack-justify{
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
    -ms-flex-pack:justify;
    justify-content:space-between;
}
```