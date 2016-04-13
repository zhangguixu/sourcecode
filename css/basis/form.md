# css基础

## 表单美化

### 思路

1. 设置表单元素input和a标签完全重叠（定位）
2. 设置表单元素不可见和`z-index`大于a标签的`z-index`

### 代码模拟实现

```css
a,input{
    width:100px;
    height:100px;
}
a{
    position:relative;
    z-index:10;
}
input{
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    z-index:1000;
}
```