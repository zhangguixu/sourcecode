# 模块加载系统

## AMD规范

AMD（Asynchronous Module Definition）：异步模块定义。重点有

1. 异步：有效避免了采用同步加载方式中导致的页面假死现象

2. 模块定义：每个模块必须按照一定的格式编写，主要接口有两个

	1.define与require，define是模块开发者关注的方法，
	2. require是模块使用者关注的方法。

	```javascript
	define(id?,deps?,factory)
	require(deps?,callback)
	```

## 加载器所在路径的探知

要加载一个模块，需要将一个URL作为加载地址，一个script作为加载媒介，用户在require时都用ID，因此我们需要一个将ID转换为URL的方法，思路很简单，强加个约定，URL的合成规则为：

	basepath + 模块ID + '.js'

## require方法

作用是：当依赖列表加载完毕之后，执行用户回调。加载的过程：

1. 取得依赖列表的第一个ID，转换为URL

2. 检测此模块有没有被加载过，或正在被加载，用一个对象来保持所有模块加载的情况，当用户从来没有加载过此节点时，就进入加载流程

3. 创建script节点，绑定oerror，onload，onreadychange等事件判定加载成功与否，然后添加href并插入DOM树，开始加载

4. 将模块的URL，依赖列表等构建成一个对象，放到检测队列中，在上面的事件触发时进行检测。
