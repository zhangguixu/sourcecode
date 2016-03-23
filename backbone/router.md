# router

## router & history

### 1 浏览器导航基础

1. history对象

    ```javascript
    window.history.back()
    window.history.forward()
    ```

2. HTML5的history API

    对应的还有popstate事件和event.state

    ```javascript
    window.history.pushState(data,title [,title])
    window.history.replaceState(data,title [,url]);
    ```

3. location

    1. window.location.hash
    
    2. window.location.reload()
    
    3. hashchange事件