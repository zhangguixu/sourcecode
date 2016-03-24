# JavaScript 小技巧

## 清除字符串前后空格

思路：

替换掉开头连续的空格和结尾连续的空格

```javascript
function trim(s){
    return s.replace(/^\s+|\s+$/g,'')
}
```