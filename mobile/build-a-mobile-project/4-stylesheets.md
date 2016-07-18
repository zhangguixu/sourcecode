# 移动端项目构建-4

> 来源：http://www.w3cplus.com/mobile/mobile-terminal-refactoring-reset-style.html

## 样式重置

具体可参考[sandal中的reset文件](https://github.com/marvin1023/sandal/blob/master/core/_reset.scss)

[reset.css](./code/reset.css)

### 字体

1. 在移动端并没有`微软雅黑`字体的存在，不过可以使用默认的中文字体，因为都是无称线字体
2. IOS

    iOS 4.0+ 使用英文字体 Helvetica Neue，之前的iOS版本降级使用 Helvetica，中文字体设置为华文黑体STHeiTi

3. Android

    原生Android下中文字体与英文字体都选择默认的无衬线字体，4.0之前版本英文字体原生Android使用的是Droid Sans，中文字体原生Android会命中Droid Sans Fallback，4.0+ 中英文字体都会使用原生Android新的Roboto字体。其他第三方Android系统也一致选择默认的无衬线字体。

4. 加上Arial字体方便pc端查看效果。

## 移动端css项目

[sandal](http://marvin1023.github.io/sandal/)
