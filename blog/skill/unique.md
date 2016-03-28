# JavaScript 小技巧

## 删除数组中的重复元素

### 思路1

使用shift()获取并删除删除数组的第一个元素，判断这个元素是否还存在于数组中，如果存在则说明这个元素的是重复的；如果不存在，进行push()操作

```javascript
function unique(a){
    if(Array.isArray(a)){
        var len = a.length,item;
        while(len--){
            item = a.shift();
            if(a.indexOf(item) === -1){
                a.push(item);
            }
        }
    }
    return a;
}
```

### 思路2

建立一个哈希表，通过对象属性查询去除重复元素

```javascript
function unique(array){
    var hash = {},
        len = array.length,
        result = [],
        i;

    for(i = 0; i < len; i++){
        if(!hash[a[i]]){
            hash[a[i]] = true;
            result.push(a[i]);
        }
    }

    return result;
}
```



