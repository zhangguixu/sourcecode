# JavaScript 小技巧

## API

1. JSON.parse()

2. JSON.stringify()

## 原生实现

```javascript
function toJsonString(object){

    var jsonStringArray = [];

    for (property in object){
        if(object.hasOwnProperty(property)){
            jsonStringArray.push(property + ':' + object[property]);
        }
    }

    return '{' + jsonStringArray.join(',') + '}';
}
```
