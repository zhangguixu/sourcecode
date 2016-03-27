# css基础

## display属性

### 取值

1. inline

2. block

3. inline-block

4. none

#### 行内元素

1. 特性

    * 和相邻的内联元素在同一行

    * width,height,padding-top,padding-bottom,margin-top,margin-bottom都不可以设置

2. inline-block

    浏览器还有默认的天生的inline-block元素，它们拥有内在的尺寸，可以设置高宽，但不会自动换行。

    input,img,button,textarea,label

#### 块级元素

特性：

1. 独占一行

2. 宽度，高度，内边距，外边距都可控制

#### none

与visility:hidden的区别是：none会脱离文档流