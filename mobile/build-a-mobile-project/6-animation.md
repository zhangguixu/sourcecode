# 移动端项目构建-6

> 来源：http://www.w3cplus.com/mobile/mobile-terminal-refactoring-slider-animation.html

## 动画

本文以切入切出动画为例子

### transition动画

```css
.demo{
    -webkit-transform:translate3d(-200px,0,0);
    transform:translate3d(-200px,0,0);
    -webkit-transition:-webkit-transform 0.3s ease-in-out;
    transition:transform 0.3s ease-in-out;
}
.translate-in{
    -webkit-transform:translate3d(0,0,0);
    transform:translate3d(0,0,0);
}
```

### animation动画

语法的学习（自行），本例子中使用`transition`动画比较合适