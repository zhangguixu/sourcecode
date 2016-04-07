# jquery基础

## XHR相关函数

1. $.ajax()

    ```javascript
    $.ajax({
        type : 'POST',//GET
        url : url,
        data : data,
        success : success,
        dataType : dataType
    });
    ```

2. $.get()
3. $.post()
4. $.load()

    载入远程HTML文件代码并插入至DOM中，默认使用GET方式，传递参数自动转换为POST方式
