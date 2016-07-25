# JavaScript基础

> 来源：http://www.ruanyifeng.com/blog/2014/10/event-loop.html

## 一、单线程的JavaScript

JavaScript的一大特点就是`单线程`。

> JavaScript的单线程与它的用途有关，作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。

为了利用多核CPU的计算能力，HTML5提出了Web Worker标准，运行JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

## 二、任务队列

单线程就意味着，所有任务需要排队。

所有任务分为两种：

1. 同步任务（synchronous）

    在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

2. 异步任务（asynchronous）

    不进入主线程，而进入`任务队列`的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

### 异步执行

![task-queue.jpg](./img/task-queue.jpg)

1. 所有同步任务都在主线程上执行，形成一个执行栈(execution context stack)

2. 主线程之外，还有一个任务队列(task queue)。只要异步任务有了运行结果，就在任务队列之中放置一个事件。

3. 一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列，看看里面有哪些事件。那些对应的异步的任务，于是结束等待状态，进入执行栈，开始执行。

4. 主线程会不断重复上面的第三步。

## 三、事件和回调函数

`任务队列`是一个事件的队列，IO设备完成任务或者用户的某些行为，都会给这个队列添加一个事件，表示相关的异步任务可以进入执行栈。

`回调函数（callback）`，就是那些会被主线程挂起的代码，异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。


## 四、Event Loop

![event-loop](./img/event-loop.png)

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以这种运行机制又称为Event Loop（事件循环）。

## 五、定时器

除了放置异步任务的事件，`任务队列`还可以放置定时事件，即指定某些代码在多少时间之后执行。这叫做`定时器`功能。

定时期的功能主要由`setTimeout()`和`setInterval()`这两个函数来完成。

**setTimeout(fn,0)**

```javascript
console.log(1);
setTimeout(function(){console.log(2);},0);
console.log(3);
```

输出结果

    1
    3
    2

setTimeout(fn,0)的含义是：`指定某个任务在主线程最早可得的空闲时间执行`。它在`任务队列`的尾部添加一个事件，因此要等到同步任务和`任务队列`现有的事件都处理完了，才得到执行。

**最短间隔**

1. HTML5标准规定了setTimeout()的第二参数的最小值不得低于`4ms`，如果低于这个值，就会自动增加

2. 老版本的浏览器都将最短间隔设为`10ms`

3. 对于DOM的变动，通常不会立即执行，而是每`16ms`执行一次。

*这时使用requestAnimationFrame()的效果要好于setTimeout()*

## 六、Node.js的Event Loop

![node-event-loop](./img/node-event-loop.png)

Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器。

**运行机制**

1. v8引擎解析的JavaScript脚本

2. 解析后的代码，调用Node API

3. libuv库负责Node API的执行，它将不同的任务分配给不同的线程，形成一个Event Loop，以异步的方式将任务的执行结果返回给v8引擎

4. v8引擎再将结果返回给用户

**任务队列方法**

1. process.nextTick

    这个方法可以在当前`执行栈`的尾部，下一次Event Loop之前，触发回调函数。

2. setImmediate

    则是在当前`任务队列`的尾部添加事件。
