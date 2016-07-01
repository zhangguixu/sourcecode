# JSBridge资料汇总

## WebView

WebView(网络视图)能加载显示网页，可以将其视为一个浏览器。它使用了WebKit渲染引擎加载显示网页，实现WebView的步骤：

1. 在要Activity中实例化WebView组件：WebView webView = new WebView(this);
2. 调用WebView的loadUrl()方法，设置WevView要显示的网页：
    * 互联网用：webView.loadUrl("http://www.google.com"); 
    * 本地文件用：webView.loadUrl("file:///android_asset/XX.html"); 本地文件存放在：assets 文件中
3. 调用Activity的setContentView( )方法来显示网页视图
4. 用WebView点链接看了很多页以后为了让WebView支持回退功能，需要覆盖覆盖Activity类的onKeyDown()方法，如果不做任何处理，点击系统回退剪键，整个浏览器会调用finish()而结束自身，而不是回退到上一页面
5. 需要在AndroidManifest.xml文件中添加权限，否则会出现Web page not available错误

在WebView的设计中，不是什么任务都由WebView类完成的，辅助的类完全其它辅助性的工作。

1. WebView主要负责解析、渲染。
2. WebViewClient就是辅助WebView处理各种通知、请求事件的，具体来说包括：

    * onLoadResource
    * onPageStart
    * onPageFinish
    * onReceiveError
    * onReceivedHttpAuthRequest
 
3. WebChromeClient是辅助WebView处理Javascript的对话框，网站图标，网站title，加载进度等

## 为什么要使用JSBridge

首先我们来了解一下为什么要使用JSBridge，在开发中，为了追求开发的效率以及移植的便利性，一些展示性强的页面我们会偏向于使用h5来完成，功能性强的页面我们会偏向于使用native来完成，而一旦使用了h5，为了在h5中尽可能的得到native的体验，我们native层需要暴露一些方法给js调用，比如，弹Toast提醒，弹Dialog，分享等等，有时候甚至把h5的网络请求放着native去完成，而JSBridge做得好的一个典型就是微信，微信给开发者提供了JSSDK，该SDK中暴露了很多微信native层的方法，比如支付，定位等

## JSBridge的实现基础

### js调用Java

#### 1. JavascriptInterface

Android提供的js与native通信的官方解决方案。步骤是：

1. 在Java代码要实现一个类

    ```java
    public class JavascriptInterface {
        @JavascriptInterface
        public void showToast(String toast){
            Toast.makeText(MainActivity.this,toast,Toast.LENGTH_SHORT).show();
        }       
    }
    ```

2. 将类添加到WebView的JavascriptInterface中

    ```java
    webView.addJavascriptInterface(new JavascriptInterface(),'javascriptInterface')
    ```

3. Js代码通过`javascriptInterface`直接调用该Native的类的方法

    ```javascript
    function showToast(toast){
        javascript:javascriptInterface.showToast(toast);
    }
    ```

这个官方提供的解决方案在Android4.2之前存在严重的安全漏洞，在Andriod4.2之后，加入了`@JavascriptInterface`才得到解决。

#### 2. WebViewClient.shouldOverrideUrlLoading()

原理是：这个方法的作用是拦截所有WebView的Url跳转，因此我们可以在一个页面上构造一个特殊格式的Url跳转，然后使用这个方法拦截Url后判断其格式，然后Native就能执行自身的逻辑。

*相当于从Web层到Native层的通信*

```java
public class CustomWebViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view,String url){
        if(isJsBridgeUrl(url)){
            //JSBridge的处理逻辑
            return true;
        }
        return super.shouldOverrideUrlLoading(view,url);
    }
}
```

#### 3. WebChromeClient.onConsoleMessage()

这个方法的作用是提供JS调试在Native代码里面打印日志信息的API，同时这也成了其中一种Js与Native代码通信的方法。

通信的原理是：

1. 在js代码中调用`console.log('xxx')`
2. Native代码的WebChromeClient.consoleMessage()会得到回调

    ```java
    public class CustomWebChromeClient extends WebChromeClient{
        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage){
            super.onConsoleMessage(consoleMessage);
            String msg = consoleMessage.message(); //获取Javascript输出的Log的内容
        }
    }
    ```

#### 4. WebChromeClient.onJsPrompt()

除了这个方法之外，还有WebChromeClient.onJsAlert(),WebChromeClient.onJsConfirm()，由于alert和confirm在js使用率很高，不适合作为web层与native层通信的手段，而prompt则很少用到，

步骤：

1. 在js调用`window.prompt(message,value)`
2. WebChromeClient.onJsPrompt()就会受到回调，onJsPrompt方法的参数的值为window.prompt()的message的值

    ```java
    public class CustomWebChroemClient extends WebChromeClient{
        @Override
        public boolean onJsPrompt(WebView view,String url,String message,String defaultValue,JsPromptResult result){
            //处理js的调用逻辑
            result.confirm();
            return true;
        }   
    }
    ```

### Java调用js

只有一种方法，就是调用`WebView.loadUrl()`去执行一个预先定义好的js方法

```java
webView.loadUrl(String.format("javascript:WebViewJavascriptBridge.handleMessageFromNative(%s)",data));
```

## JSBridge的实现

由前面所述，Java和js可以实现互相调用，其本质是web层和Native层的相互通信的实现。

