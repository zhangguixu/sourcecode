# 表单控件绑定

## 基础用法

使用`v-model`指令在表单控件元素上创建双向数据绑定，根据`控件类型`它自动选取正确的方法更新元素。

### Text

```html
<div id="text">
    <span>Message is : {{ msg }}</span>
    <br>
    <input type="text" v-model="msg" placeholder="edit me">
</div>
<script>
    new Vue({
        el : '#text',
        data : {
            msg : ''
        }
    });
</script>
```

### Checkbox

