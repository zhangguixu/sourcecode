# css基础

## css hack

1. 针对不同浏览器写不同的css，使其能达到想要的相同显示效果，就是css hack

2. IE浏览器Hack分类

    1. 条件hack

        ```html
        <!--[if IE]>
            <style>
                .test{color:red;}
            </style>
        <![endif]-->
        ```

    2. 属性hack

        ```css
        .test{
            color:#090\9; /*IE8+*/
            *color:#f00; /*IE7 and earlier*/
            _color:#ff0; /*IE6 and earlier*/
        }
        ```

    3. 选择符hack

        ```css
        * html .test{color:#090;}/*IE6 and earlier*/
        * +html .test{color:#ff0;}/*IE7*/
        ```


