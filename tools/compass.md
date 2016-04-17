# compass/sass

## 安装

1. 安装ruby环境

    下载安装包即可

2. 安装sass，可以利用包管理工具gem来进行安装

    gem install sass -V 可以查看到状态

3. 安装compass

    gem install compass -V

## 创建项目

1. 创建指令

    compass create myproject

2. 项目目录结构

    ![compass](./img/compass.png)

    * sass：存放sass的源文件
    * stylesheets：存放编译后的文件
    * config.rb：配置文件

## compass指令

1. 编译指令

    compass compile

2. 生成压缩后的css文件

    compass compile --output-style compressed

3. 强制编译未变动的文件

    compass compile --force

4. 在命令行模式下，还可以自动编译

    compass watch

## 配置文件

1. 配置`output_style`

    `output_style = :value`

    * :nested
    * :compact
    * :compressed

2. 指定`environment`

    environment = :development
    output_style = (environment == :production)? :compressed : :expanded

## compass模块

* reset

    重置浏览器的默认样式，导入之后会生成相应的reset代码
    
    ```sass
    @import "compass/reset"
    ```

* css3

    1. 圆角(border-radius)

        ```sass
        @import "compass/css3";
        .rounded{
            @include border-radius(5px)
        }
        .top-left-rounded{
            @include border-corner-radius(top,left,5px);
        }
        ```

    2. 透明(opacity)

        ```sass
        @import "compass/css3";
        .opacity{
            @include opacity(0.5)
        }
        ```

    3. 行内区块(inline-block)

        ```sass
        @import "compass/css3";
        .inline-block{
            @inlcude inline-block;
        }
        ```

* layout

    

* typography
* utilities
