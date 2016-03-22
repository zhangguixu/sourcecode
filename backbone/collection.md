# Backbone.Collection

Collection是依附于基类的另一个数据集合类，它的功能是管理和存储由Model衍生的数据集合。可以从数据库的角度来看，一个实例化后的Model对象好像表中的一条记录，而一个实例化后的Collection对象则是一张数据集合表，可以在这表中进行一系列的增加、删除、修改、查询的操作，还可以与服务器进行数据同步，批量更新和获取数据。

## 1 创建集合对象

通常有两种方法

1. 自定义集合类，在实例化集合对象

    ```javascript
    var student = Backbone.Model.extend({
        defaults : {
            Code : '',
            Name : '',
            Score : ''
        }
    });
    var stuList = Backbone.Collection.extend({
        model : student
    });
    var stuModels = [{
        Code : '101',
        Name : 'foo',
        Score : 500
    },{
        Code : '102',
        Name : 'bar',
        Score : 300
    },{
        Code : '103',
        Name : 'zhang',
        Score : 710
    }];
    var stus = new stuList(stuModels);
    for (var i = 0; i < stus.models.length; i++){
        console.log(stus.models[i].toJSON());
    }
    ```

2. 直接实例化集合对象（更简洁和高效）

    ```javascript
    var student = Backbone.Model.extend({
        defaults : {
            Code : '',
            Name : '',
            Score : ''
        }
    });
    var stuModels = [{
        Code : '101',
        Name : 'foo',
        Score : 500
    },{
        Code : '102',
        Name : 'bar',
        Score : 300
    },{
        Code : '103',
        Name : 'zhang',
        Score : 710
    }];
    var stuList = new Backbone.Collection(stuModels,{
        model : student
    });
    for (var i = 0; i < stus.models.length; i++){
        console.log(stus.models[i].toJSON());
    }
    ```

## 2 集合对象的操作方法

### 2-1 删除

1. remove：从指定的集合对象中移除一个或多个模型对象

    ```javascript
    obj.remove(models,options)
    ```

2. pop：移除集合对象中最后一个模型对象

    ```javascript
    obj.pop(options)
    ```

3. shift：移除集合对象中首个模型对象

    ```javascript
    obj.shift(options)
    ```

### 2-2 添加

1. add：向集合对象中指定的位置插入模型对象

    ```javascript
    obj.add(models,options)
    ```

2. push：向集合对象的尾部插入模型对象

    ```javascript
    obj.push(models,options)
    ```

3. unshift：向集合对象的头部插入模型对象

    ```javascript
    obj.unshift(models,options)
    ```

### 2-3 查找

1. get：通过指定的ID号获取集合中的某一个模型对象

    ```javascript
    obj.get(id)
    ```

    参数id为模型对象在产生时的唯一标志，也是用于与服务器保持同步的唯一编号。如果在构建模型对象类中，没有该属性，也可以通过`idAttribute`属性值指定其他数字类型的属性为id标识。一旦某属性被指定为id标志，它将过滤重复的属性值，不能增加与该属性值相同的模型对象。


2. at：通过指定的索引号获取集合中的某一个模型对象

    ```javascript
    obj.at(index)
    ```

    参数index为集合对象中模型数据的索引号，该索引号以0开始，最大值为obj.models.length -1

3. findWhere：查找与属性名称和属性值匹配的第一个模型对象

    ```javascript
    obj.findWhere(attrs)
    ```

    参数attrs为`key/value`形式的属性值对象。

4. where：查找与属性名称和属性值相匹配的第一个模型或多个模型对象

    ```javascript
    obj.where(attrs,first)
    ```

    first参数是一个布尔类型的值，为true时，跟findWhere方法相同，为false时，返回的是一个数组集合。

### 2-4 排序

```javascript
obj.sort(options)
```

options参数为排序过程中的配置对象，在该对象中可以设置`slient`等属性。在集合对象调用sort方法之前，必须在实例化集合对象时，添加一个名为`comparator`的方法，如果不添加该方法，调用sort则提示"Cannot sort a set without a comparator"异常信息。

注意：

1. 执行效率，每一次的集合模型对象变化都会引发重新排序，如果展示的集合对象数量很大，这种排序时的执行效率将会很慢，建议这个方法不针对大量模型对象。

2. 屏蔽其他按位置插入或删除模型对象的功能。

```javascript
var student = Backbone.Model.extend({
        defaults : {
            Code : '',
            Name : '',
            Score : ''
        }
    });
    var stuModels = [{
        Code : '101',
        Name : 'foo',
        Score : 500
    },{
        Code : '102',
        Name : 'bar',
        Score : 300
    },{
        Code : '103',
        Name : 'zhang',
        Score : 710
    }];
    var stus = new Backbone.Collection(stuModels,{
        model : student,
        comparator : function (m1,m2){
            var intComp = m1.get('Score') > m2.get('Score');
            return intComp ? 0 : 1;
        }
    });
    stus.sort();
    for (var i = 0; i < stus.models.length; i++){
        console.log(stus.models[i].toJSON());
    }
```

## 3. 与服务器的交互方法

1. fetch：从服务器接口获取集合对象初始化的数据

    ```javascript
    obj.fetch(options)
    ```

    options为与服务器进行交互过程的配置对象，在该对象中可以添加success方法，表示当与服务器交互成功后将会调用该方法。此外，如果设置reset为true，在调用自定义的success方法时，还会触发集合对象reset事件。

    ```javascript
    var student = Backbone.Model.extend({
        defaults : {
            Code : '',
            Name : '',
            Score : 0
        }
    });
    var stuList = Backbone.Collection.extend({
        initialize : function (){
            this.on('reset',function (render){
                //进行某些操作
            })
        },
        model : student,
        url : 'fetch'
    });
    var stus = new stuList();
    stus.fetch({
        reset : true,
        success : function(collection,resp,options){
            //执行某些操作
        }
    })
    ```

2. create：将创建好的集合对象中的全部对象数据发送到服务器，完成数据同步的功能

    ```javascript
    obj.create(model,options)
    ```

    1. model参数为发送给服务器的模型对象，参数options则为发送时的方法配置对象，可以配置success方法和wait、slient属性等。

    2. 在集合对象调用create方法过程中，会使用`POST`和`PUT`两种Request Method方法向服务器发送数据，前者表示创建模型对象，后者则为修改模型对象。内部通过isNew方法检测数据是否是新建还是更新。

    3. 集合对象调用create方法后，如果绑定集合对象的`add`事件，还会自动触发该事件。

    两个配置属性的详解

    1. wait : true

        表示只有当客户端与服务器端完成数据同步之后，才会将同步的模型对象数据添加到集合对象中。如果异常，不会触发绑定的集合对象add事件。

    2. slient : true

        表示静默式同步，不需要客户端与服务器数据同步成功，就可以向集合对象添加模型数据。




