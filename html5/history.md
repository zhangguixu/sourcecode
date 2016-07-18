# HTML5 API

## History API

HTML5定义了两种用于历史记录管理的机制。

### 简易的历史记录管理技术

**location.hash & hashchange**

这种技术被比较广泛实现了。

1. 设置`location.hash`属性会更新显示在地址栏中的URL（#后的值），同时会在浏览器的历史记录中添加一条记录

2. hash属性设置URL的片段标识符，通常是用于指定要滚动到的文档中某一部分的ID，但是它也可以设置成任何的字符串

3. 可以将一个`应用状态编码成一个字符串`，就可以使用该字符串作为片段的标识符

4. 设置了location.hash属性后，就必须来检测状态的变化，以便它能够读取出存储在片段标识符中的状态并相应地更新自己的状态。

5. 利用`hashchange`事件，通过设置window.onhashchange为一个处理程序，在这个处理程序中对location.hash的值进行`解析`，然后使用该值包含的状态信息来重新显示应用

### 复杂的历史记录管理技术

**history.pushState() & popstate**

1. 当一个Web应用进入一个新的状态的时候，它会调用history.pushSate()方法将该状态添加到浏览器的浏览历史记录中。

    history.pushState(object [,title] [,url] )

    * object:包含用于恢复当前文档状态所需的所有信息。

    * title:可选的标题，用于表示浏览历史记录中保存的状态

    * url:表示当前状态的位置，只是简单指定url的hash部分

2. 当用户通过"后退"和"前进"按钮浏览保存的历史状态时，浏览器会在Window对象上触发一个`popstate`事件。与该事件相关联的事件对象有一个`state`属性，该属性包含传递给pushState()方法的状态对象的副本（另一个结构性复制）。

*但页面新加载时，会触发一个没有状态的popstate事件*

**replaceState()**

跟pushState()接收一样的参数，但是它是用新的状态来替换当前的历史状态。




