# Visual Studio Code

最近准备入手这个牛逼的编辑器。

1. 功能全面，不用安装任何插件就可以用的飞起
2. 语法提示，代码查看，调试支持都很不错
3. 对markdown的支持非常好，这一点很重要！！
4. 原生支持git（提供图形化的操作）

缺点

1. 好像不支持一个窗口打开多个文件夹

## 1. 快捷键

|常用快捷键|功能|
|:---|:---|
| F1/ctrl+shift+p | 打开命令面板 |
| ctrl+p  | 搜索文件，然后跳转到文件 |
|ctrl+e|快速打开一个文件|
| ctrl+n  | 新建文件 |
| ctrl+tab | 标签页切换 |
| ctrl+1/2/3  | 切换窗口（没有分隔窗口时会进行窗口分隔） |
|ctrl + \ | 分隔 | 
| ctrl+enter  | 当前插入一行 |
| F11    | 全屏切换 |
| ctrl+-/+ | 放大缩小|
| ctrl+b   | 切换侧边栏 |
|ctrl+shift+g|打开git|

### 文本操作

|文本操作快捷键|功能|
|:---|:---|
|ctrl+shift+k|删除当前行|
|ctrl+shift+方向键|快速地扩大或缩小选择范围|

### 搜索

|搜索快捷键|功能|
|:---|:---|
|ctrl+shift+o  |搜索变量或函数|
|ctrl+f|搜索|
|ctrl+h|搜索并且替换|

### 代码格式调整

|代码格式快捷键|功能|
|:---|:---|
|ctrl+[\\]  |代码行缩进对齐|
|shift+alt+f|format code（格式化代码，好用）|

### 光标移动

|光标移动快捷键|功能|
|:---|:---|
|home/ctrl+home|移动到行首/文件开头|
|end/ctrl+end |移动到行尾/文件结尾|
|ctrt+shift+{|匹配{}|
|ctrl+l|跳转到行|

*默认的跳转到行的快捷键(ctrl+g)用不了，自己重新设置了*

### 重构代码

|移动快捷键|功能|
|:---|:---|
|shift+F12|找到所有的引用|
|ctrl+F12|修改本文件中所有的匹配|
|F2|修改一个方法名，自动修改所有的引用|
|ctrl+space|代码提示|

### markdown

|常用快捷键|功能|
|:---|:---|
|ctrl+shift+v|预览|

## 2. git

### 提交

1. 方法1：点击侧边栏的git（ctrl+shift+g），即可，看着操作即可，图形界面，非常好看

2. 方法2：F1->输入git commit ->输入commit的内容 -> git push即可


## 3. 扩展

### 命令安装

1. ctrl+p

2. ext install 插件名

### 设置代理

可能会连接不上，可以设置代理

通过文件-》首选项-》用户设置 打开所有的配置项，覆盖HTTP configuration项

```javascript
{
    "http.proxy": "http://proxyurl:port"
}
```

## 4. cmd

### 控制台打开项目

在命令行下面，cd到项目所在的目录，执行

`code .`

即可快速打开项目

### code参数

code命令的可选参数

|参数|描述|
|:--|:--|
|-g / --goto |file:line:column，定位|
|-n / --new-window|打开一个新的VS Code 窗口|
|-r / --reuse-window | 使用当前VS Code窗口打开文件或文件夹 |
| file |打开文件|
|folder |打开文件夹|

## 5. debug

待续