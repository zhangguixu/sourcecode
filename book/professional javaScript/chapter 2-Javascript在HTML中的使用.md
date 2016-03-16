#JavaScript 高级程序设计

##JavaScript 在HTML中使用

### <script\>元素

使用<script\>元素:是在HTML页面中插入JavaScript的主要办法

#### <script\>的6个属性

* async：表示应该立即下载脚本
* defer：表示脚本可以延迟到文档完全被解析和显示之后再执行
* src：表示包含要执行代码的外部文件，可以【跨域】
* type：表示编写代码使用的脚本语言的内容类型（MIME类型）
* language：废弃
* charset：指定脚本的字符集

#### 使用方式

1. 直接在页面嵌入JavaScript代码
2. 包含外部JavaScript文件

#### <script\>元素放置的位置

放置在<body\>元素中页面内容的后面
    
    原因
        1. 减少先加载外部JavaScript文件所造成的延迟，尽快加载显示页面

        2. 避免某些需要操作DOM的JavaScript代码在文档加载之前执行，发生错误

#### 使用外部文件的好处

    1. 可维护性
    
    2. 可缓存：浏览器能够根据具体的设置缓存链接的所有外部JavaScript文件，可以
        加快页面加载的速度