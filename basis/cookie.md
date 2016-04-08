# 前端基础

## cookie

### 认识cookie

1. cookie

    * cookie是一种WEB服务器通过浏览器在访问者的硬盘上存储信息的手段。
    * 浏览器一般只允许存放300个cookie，每个站点最多存放20个Cookie，
    * 每个Cookie的大小限制为4KB
    * cookie会包含在http的请求头，发送到服务器端，与h5存储最大的区别

2. cookie的种类

    * 会话cookie：如果不设置过期时间，则表示这个cookie生命周期为浏览器会话期间
    * 持久cookie：如果设置了`过期时间`，浏览器就会把cookie保存到硬盘上，关闭后再次打开浏览器，这些cookie依然有效直到超过了设定的时间
    *存储在硬盘上的cookie可以在不同的浏览器进程间共享

3. cookie的作用

    * 能使站点跟踪特定访问者的次数、最后的访问时间等
    * 告诉在线广告商广告被点击的次数，从而可以更精确的投放广告
    * 在有效期限未到时，cookie能使用户在不键入密码和用户名的情况下进入曾经浏览过的一些站点


### 1. 创建和存储cookie

1. cookie是保存在`document.cookie`中，设置的时候一般会采取`key=value;expires=时间`。

2. `document.cookie`只会执行添加或者修改操作，不能删除里面已添加的值

```javascript
function setCookie(name,value,expiredays){

    //设置cookie有效期
    var d=new Date();
    d.setDate(d.getDate()+expiredays);

    var expires='expires='+d.toUTCString();

    //存储cookie，document.cookie
    document.cookie=name+'='+value+';'+expires;
}
```
### 2. 获取cookie

思路：读取`document.cookie`的值，然后进行分割成数组，再进行匹配

```javascript
function getCookie(name){

    var name=name+'=',
        ca=document.cookie.split(';'), //cookie字符串
        i,len;

    for(i=0,len=ca.length;i<len;i++){
        var c=ca[i];
        //处理空格
        while(c.charAt(0) === ' ') c = c.substring(1);
        if(c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }

    return '';
}
```

### 3. 清除cookie

原理：设置cookie过期，

```javascript
function clearCookie(name){
    setCookie(name,'',-1);
}
```
