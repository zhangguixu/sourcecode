# JavaScript 基础

> 参考1：http://www.mamicode.com/info-detail-458395.html <br>
> 参考2：http://isux.tencent.com/introduction-of-webp.html <br>
> 参考3：http://www.zhangxinxu.com/wordpress/?p=2341 <br>
> 参考4：https://segmentfault.com/a/1190000003881643 <br>
> 参考5：https://github.com/icepy/_posts/issues/30?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io

## 一、认识图片

### 1-1 矢量图与位图

1. 矢量图

    矢量图是通过组成图形的一些基本元素，如点、线、面，边框，填充色等信息通过计算的方式来显示图形的。

    一般来说矢量图表示的是几何图形，文件相对较小，并且放大缩小不会失真。

    用途：SVG，图标字体font-awesome

2. 位图

    位图又叫像素图或栅格图，它是通过记录图像中每一个点的颜色、深度、透明度等信息来存储和显示图像。

    位图的优点是利于显示色彩层次丰富的写实图像。

    缺点则是文件大小较大，放大和缩小图像会失真。

    用途：png,gif,jpg,canvas

### 1-2 有损压缩和无损压缩

1. 有损压缩

    有损压缩是对图像数据进行处理，去掉那些图像上会被人眼忽略的细节，然后使用附件的颜色通过渐变或其他形式进行填充。

    优点是：能大大降低图像信息的数据量，又不会影响图片的还原效果。

    用途：JPG

    注意：压缩的的品质一般在60-80之间，60以下图片失真会很严重。

2. 无损压缩

    无损压缩是先判断图像上哪些区域的颜色是相同的，哪些是不同的，然后把这些相同的数据信息进行压缩记录，而把不同的数据另外保存。

    用途：PNG

    注意：无损压缩只是一种相对的说法，图片还是会失真的。例如PNG8只能索引256中颜色，所以图像上出现的颜色数量大于我们可以保存的数量时，就不能真实地记录和还原图像了。

### 1-3 透明度

1. 索引透明

    即布尔透明，类似于GIF，某一个像素只有全透和全不透明两者效果，不能对透明度进行设置。

2. Alpha透明

    半透明

### 1-4 常用图片格式

1. GIF

    支持动画。仅支持索引透明

2. JPG

    1. 优点

        * 支持摄影图像或写实图像的高级压缩，并且可利用压缩比例控制图像文件大小

        * 有损压缩会是图像数据质量下降

        * 适合颜色较少的图片

        * 比较适合网站的背景图、轮播图、用户头像等

    2. 缺点

        * 不适合具有大块颜色相近的区域或亮度(锐度)差异十分明显的较简单的图片

        * 图像颜色少于一定值时，PNG8可能更合适

3. PNG

    1. 细分为（后面的数字代表最多可以索引和存储的颜色值，`8`表示`2的8次方`）

        - PNG8

        - PNG24

        - PNG32

    2. 透明支持

        - PNG8支持索引透明和alpha透明

        - PNG24不支持透明

        - PNG32在24位的PNG基础上增加了8位的alpha透明

    3. 优缺点

        - 能在保证最不失真的情况下尽可能压缩图像文件的大小

        - 存储灰度图像时，灰度图像的深度可多到16位，存储彩色图像时，深度可多到48位，并且还可存储多到16位的alpha通道数据

        - 需要高保真的较复杂的图像，PNG虽然能无损压缩，但是图片较大，不适应在Web页面上

### 1-5 新型的图片格式

1. WebP

    出自于谷歌，是一种支持有损压缩和无损压缩的图片文件格式，派生自图像编码格式VP8。

    优势：

    1. 具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量。

    2. 具备了无损和有损的压缩模式

    3. 支持Alpha透明以及动画的特性

    4. 在JPEG和PNG的转化效果都非常优秀，稳定和统一。

### 1-6 css图片

1. base64

    1. 基本认识

        Base64是网络上最常见的用于传输8bit字节代码的编码方式之一，可用于在HTTP环境下传递较长的标识信息。

        示例：base64:URL就是base64编码的URL地址

        ```html
        <img src="data:image/gif;base64,R0lGODlhAwADAIABAL6+vv///yH5BAEAAAEALAAAAAADAAMAAAIDjA9WADs=" />
        ```

    2. 文件数据编码

        通过HTTP传输的文件还可以通过base64对数据进行编码传输。

        ```css
        background-image:url(data:image/gif;base64,R0lGODlhBAABAIABAMLBwfLx8SH5BAEAAAEALAAAAAAEAAEAAAICRF4AOw==);
        ```

    3. 获取图片的base64编码

        通过HTML5的`FileReader`可以获取一个文件的base64编码数据

        ```javascript
        var reader = new FileReader(),htmlImage;
        reader.onload = function(e){
            //e.target.result 就是base64编码
            htmlImage = '<img src="' + e.target.result + '"/>';
        }
        reader.readAsDataURL(file);
        ```

    4. base64:URL传输图片

        本质是将图片的二进制大小以一些字母的形式展开，例如一个1024字节的图片，base64编码后至少1024个字符，这个大小会被完全嵌入到css文件中。

        因此可以看到这种技术的一个优点

        * 减少HTTP请求
        * 没有图片更新要重新上传，清理缓存的问题

        缺点：

        * 增加了CSS文件的尺寸
        * 编码成本

        使用场景：解决图片大小极小，但又占据一次HTTP请求，同时不能与其他背景图片Sprite的情况

2. SVG

3. CSS sprite

## 二、图片优化

### 2-1 常用策略

1. 图片大小与展示区一致

2. GIF转为PNG8

3. 缩略图（大图片，先加载一张缩略图）

### 2-2 加载优化

1. 预加载

    1. 原理

        通过CSS或者JavaScript，先请求图片到本地，再利用浏览器的缓存机制，当要使用图片时（图片路径一致），浏览器直接从本地缓存获取到图片，加快图片的加载速度。

    2. 场景

        背景，幻灯片，相册等，将要展示的前一张和后一张优先下载

    3. 实现

        * css的实现方式

            ```css
            #preload {background : url(01.png) no-repeat -9999px -9999px;}
            ```

            使用这个方法加载图片会同页面的其他内容一起加载，增加了页面的整体加载时间。

        * JavaScript的实现方式

            ```javascript
            var img = document.createElement('img');
            img.src = '01.png'; //就会开始下载，不用添加到dom树中
            ```

            ```javascript
            var img = new Image();
            img.src = '01.png'; //原理同上
            ```

2. 懒加载

    1. 原理

        当要使用到图片时，再加载图片，而不是一下子加载完所有的图片的方式，来提高页面其他图片的加载速度。

    2. 场景

        长页面中不可见区域的图片可以先不加载。

        ![lazy-load](./img/lazyload.png)

    3. 实现

        思路很简单，一般都是在页面上添加一个滚动条事件，判断图片位置与浏览器顶部的距离是否小于（可视高度+滚动距离），如果小于则优先加载。

        1. 获取对象距离页面顶端的距离

            ```javascript
            function getH(obj){
                var h = 0;
                while(obj){
                    h += obj.offsetTop;//距离上一个标签的距离
                    obj += obj.offsetParent;
                }
                return h; //文档坐标
            }
            ```

        2. 判断是否在可视区域内

            ```javascript
            function isVisible(obj){
                var t = document.documentElement.clientHeight +
                    (document.documentElement.scrollTop || document.body.scrollTop);
                var h = getH(obj);
                return (h < t);
            }
            ```

        3. 绑定滚动事件，进行判断那些元素在可视区域内，然后进行图片加载

            ```javascript
            window.onscroll = function(){}
            ```

        4. 在页面onload的时候，触发一次onscroll

            ```javascript
            window.onload = function(){
                window.onscroll();
            }
            ```

## 三、图片上传

### 3-1 传统的form表单上传

```html
<form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="img">
</form>
```

1. 必须使用`post`方法

2. `enctype`的值必须为`multipart/form-data`

### 3-2 隐藏iframe模拟Ajax上传

```html
<iframe  name="ajaxUpload" style="display:none"></iframe>
<form action="url" method="post" enctype="multipart/form-data" target="ajaxUpload">
    <input type="file" name="img">
</form>
```

1. 隐藏iframe

2. form表单的target为隐藏的iframe，这样服务器返回的消息就会显示在iframe上

### 3-3 HTML5特性实现Ajax上传

1. 使用已有的form表单，来实例化`FormData`对象

    ```javascript
    var form = document.getElementById('form');
    var formData = new FormData(form);
    ```

2. 此外，可以使用`append`来添加更多的信息

    ```javascript
    var img = document.getElementById('img').files[0];
    var formData = new FormData();
    formData.append('img',img);
    ```

3. 利用`XHR`上传图片

    ```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url);
    xhr.onreadystatechange = function(){};
    xhr.send(formData);
    ```

4. 使用`XHR2`可以获取上传的进度

    ```javascript
    xhr.upload.ongress = function(evt){
        console.log(evt);
        var loaded = evt.loaded; //已经上传的大小
        var total = evt.total;//附件总大小
        var per = Math.floor(100 * loaded / total );//已经上传的百分比
    }
    ```

### 3-4 检验图片信息

HTML5提供了一些属性来检索图片信息后缀，即`file`对象的信息

* name 名字

* size 大小

* type 类型

* lastModified 最后上传的时间毫秒

例子

```html
<input type="file" id="img" name="img">
```

获取file对象

```javascript
var img = document.getElementById('img');
var files = img.files;
var file = files[0];
```