# 策略模式

## 定义

策略模式是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。

## 例子

jQuery的animate方法

```javascript
$(div).animate({"left":"200px"}, 1000, "linear"); //匀速运动
$(div).animate({"left":"200px"}, 1000, "cubic"); //三次方的缓动
```

在这里，linear和cubic就是一种策略模式的封装，通过参数的不同来调用不同的算法

