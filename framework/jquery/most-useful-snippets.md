# 高效Web开发的10个jQuery代码片段

## 1. 检测IE版本

```javascript
$(function(){
    if(navigator.userAgent.match(/msie/i)){
        alert('I am IE');
    }
});
```

## 2. 平稳滑动到页面顶部

```javascript
$("a[href='#top']").click(function(){
    $(html,body).animate({scrollTop:0},'slow');
    return false;
});
```

## 3. 固定在顶部

```javascript
$(function(){
    var $win = $(window)
    var $nav = $('.mytoolbar');
    var navTop = $('.mytoolbar').length && $('.mytoolbar').offset().top;
    var isFixed=0;
    processScroll();
    $win.on('scroll', processScroll);
    function processScroll() {
        var i, scrollTop = $win.scrollTop()
        if (scrollTop >= navTop && !isFixed) {
            isFixed = 1
            $nav.addClass('subnav-fixed')
        } else if (scrollTop <= navTop && isFixed) {
            isFixed = 0
            $nav.removeClass('subnav-fixed')
        }
    }
});
```

## 4. 用其他内容取代html标志

```javascript
$('li').replaceWith(function(){
    return $('<div />').append($(this).contents());
})
```

## 5. 检测视窗宽度

```javascript
var responsive_viewport = $(window).width();

if(responsive_viewport < 481){
    alert('Viewport is smaller than 481px');
}
```

## 6. 自动定位并修复损坏图片

```javascript
$('img').error(function(){
    $(this).attr('src','img/broken.png');
});
```

## 7. 检测复制、粘贴和剪切的操作

```javascript
$('#textA').bind('copy',function(){
    //复制
});
$('#textA').bind('paste',function(){
    //粘贴
});
$('#textA').bind('cut',function(){
    //剪切
});
```

## 8. 遇到外链自动添加target=_blank

```javascript
var root = location.protocol + '//' + location.host;
$('a').not(':contains(root)').click(function(){
    this.target = "_blank";
});
```

## 9. 在图片上停留时变化的透明效果

```javascript
$(function(){
    $('img').fadeTo('slow',0.6);
    $('img').hover(function(){
        $(this).fadeTo('slow',1.0);
    },function(){
        $(this).fadeTo('slow',0.6);
    });
});
```

## 10. 在文本或密码输入时禁止空格键

```javascript
$('input.nospace').keydown(function(e){
    if(e.keyCode === 32){
        return false;
    }
});
```

