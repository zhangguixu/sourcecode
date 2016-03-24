# JavaScript 小技巧

## 字符串转义

在页面中，为了防止XSS，对页面输出的内容要进行转义

```javascript
function escapeHtml(text){
    return text.replace(/[<>"&]/g,function(match){
        switch(match){
            case '<':
                return '&lt';
            case '<':
                return '&gt';
            case '&':
                return '&amp';
            case '\"':
                return '&quot';
        }
    })
}
```