# 常见排序

## 一、冒泡排序

### 思路

持续比较相邻元素，大的挪到后面，因此大的会逐步往后挪，直到排序不再变化。

![bubble-sort](../img/bubble-sort.gif)

### 复杂度分析

平均和最坏情况均为O(n^2)

### <a href="./bubbleSort.js">实现</a>

## 二、选择排序

### 思路

不断选择剩余元素中的最小值

1. 找到数组中最小元素将其和数组第一个元素交换位置

2. 在剩下的元素找到最小元素将其与数组第二个元素交换，直到整个数组排序

![selection-sort](../img/selection-sort.gif)

### 复杂度分析

* 比较次数 = <a href="http://www.codecogs.com/eqnedit.php?latex=(N-1)&plus;(N-2)&plus;(N-3)&plus;...&plus;2&plus;1&space;\approx&space;\frac{N^{2}}{2}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?(N-1)&plus;(N-2)&plus;(N-3)&plus;...&plus;2&plus;1&space;\approx&space;\frac{N^{2}}{2}" title="(N-1)+(N-2)+(N-3)+...+2+1 \approx \frac{N^{2}}{2}" /></a>

* 交换次数 = N

* 运行时间与输入无关

* 数据移动最少

### <a href="./selectionSort.js">实现</a>

## 三、插入排序

### 思路

通过构建有序序列，对于未排序序列，在已排序序列中从后向前扫描（对于单向链表则只能从前往后遍历），找到相应位置并插入，实现上通常使用in-place排序。

**步骤**

1. 从第一个元素开始，该元素可认为已排序

2. 去下一个元素，对已排序的数组从后往前扫描

3. 若从排序数组取出的元素大于新元素，则移至下一个位置

4. 重复步骤3，直到找到已排序元素小于或等于新元素的位置

5. 插入新元素至该位置    

![insertion-sort](../img/insertion-sort.gif)


### 复杂度分析

1. 交换操作和数组中倒置的数量相同

2. 最坏情况下需要~N^2/2次比较和~N^2/2次交换，最好情况下需要N-1次比较和0次交换。

3. 平均情况下需要~N^2/4次比较和~N^2/4次交换

### <a href="./insertionSort.js">实现</a>
