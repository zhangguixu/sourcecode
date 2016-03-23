# DOM操作

## DOM基本操作

### 1. 创建

1. 创建普通元素

    ```javascript
    document.createElement(tagName);
    ```

2. 创建文本节点

    ```javascript
    document.createTextNode(string);
    ```

3. 创建文档片段

    ```javascript
    document.createDocumentFragment();
    ```

### 2. 添加

```javascript
parent.appendChild(child);
```

### 3. 替换

```javascript
parent.repalceChild(newNode,oldNode);
```

### 4. 移除

```javascript
parent.removeChild(child);
```

### 5. 插入

```javascript
parent.insertBefore(newNode,ref-Node/null);
```

### 6. 复制

```javascript
cloneNode(true/false); //true表示深复制
```

### 7. 查找

1. id

    ```javascript
    document.getElementById(id);
    ```

2. tagName

    ```javascript
    document.getElementsByTagName(tagName);
    ```

3. name

    ```javascript
    document.getElementsByName();
    ```

4. className（ECMAScript5）

    ```javascript
    document.getElementsByClassName();
    ```


