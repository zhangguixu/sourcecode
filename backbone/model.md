# Backbone.Model

Model在Backbone中为数据模型，是一个最基础、最根本的数据基类，用于原始数据、底层方法的封装和定义。它的结构类似于关系数据库中的映射对象，可以装载数据库中的记录信息，并通过自定义的方法，完成数据的操作之后，将数据同步到服务器中。

## 一、Backbone.Model常见操作

### 1-1. 赋值的两个形式

**set()**

```javascript
obj.set(attrName,attrValue);
obj.set({attr1 : v1, attr2 : v2});
```

### 1-2. 取值的两者形式

**get() & escape()**

```javascript
obj.get(attrName);
obje.escape(attrName); //避免XSS攻击
```

### 1-3. 监听对象属性值变化

**change:attr事件**

```javascript
var student = Backbone.Model.extend({
    initialize : function(){
        this.on('change:Name',function(){
            var oldName = this.previous('Name');
            var newName = this.get('Name');
            if(oldName !== newName){
                console.log( oldName + '->' + newName);
            }
        });
    },
    defaults : {
        Code : '',
        Name : 'zhang'
    }
});

var stuA = new student;
stuA.set('Name','小明');
```

### 1-4. 数据验证

要实现对数据中某个属性值的验证，需要完成以下3个步骤

1. 添加validate方法，这个方法确定数据校验的标准

2. 绑定对象invalid事件

3. 使用set方法添加/修改属性时，必须将validate属性值设置为true

```javascript
var student = Backbone.Model.extend({
    initialize : function(){
        this.on('invalid',function(model,error){
            console.log(error);
        });
    },
    validate : function(attrs){
        if(!_.isString(attrs.Name))return '姓名必须是字符!';
        if(!_.isNumber(attrs.Score))return '分数必须是数字!';
    },
    defaults : {
        Name : 'zhang',
        Score : 100
    }
});

var stuA = new student;
stuA.set({
    Name : 1234,
    Score : 600
},{'validate' : true});
console.log(stuA.toJSON());
```

验证的流程是：若是validate()中有验证不过的，返回任何值，都会被当作error

若要关闭数据验证，则设置{'slient':true}

### 1-5. 更新数据回滚

在Backbone中调用set方法时，可以将`slient`属性设置true，采用静默方式更新数据，但是为了确保数据的安全性，可以针对已更新的数据进行二次验证，如果不符合验证规则，可以调用对象的`previous`方法进行上一次数据的回滚。

```javascript
var student = Backbone.Model.extend({
    initialize : function(){
        this.on('invalid',function(model,error){
            console.log(error);
        });
        this.on('change:Name',function(model,value){
            if(!_.isString(model.get('Name'))){
                model.set('Name',model.previous('Name'));
            }
        });
    },
    validate : function(attrs){
        if(!_.isString(attrs.Name))return '姓名必须是字符!';
        if(!_.isNumber(attrs.Score))return '分数必须是数字!';
    },
    defaults : {
        Name : 'zhang',
        Score : 100
    }
});

var stuA = new student;
stuA.set({
    Name : 1234,
    Score : 600
},{'slient' : true});
console.log(stuA.get('Name'));
```

### 1-6. 删除数据

**unset() & clear()**

```javascript
obj.unset(attrName);//清除指定名称的数据
obj.clear(); //清除对象中的全部数据
```

### 1-7. 全部的属性值

**attributes**

```javascript
var student = Backbone.Model.extend({
    initialize : function(){},
    defaults : {
        Code : '10001',
        Name : 'zhang',
        Score : 100
    }
});
var stu = new student;
stu.set({
    Code : '10004',
    Name : 'gui',
    Score : 650
});
console.log(stu.attributes);
//遍历后输出attributes对象中的每项属性和值
var attrs = stu.attributes;
for(var i in attrs){
    console.log(i + ':' + stu.attributes[i]);
}
```

### 1-8. 上一个状态值

**previous(attrName) & previousAttributes()**

## 二、同步数据到服务器

在Backbone中，客户端的静态页与服务器之间的数据，可以通过save、fetch、destory方法分别实现在服务器中保存、获取、删除数据的操作，通过这些方法可以实现客户端与服务器之间的无缝连接，完成客户端数据与服务器的同步。

### 2-1.save方法

在Backbone中，对象save方法的功能是在服务器中保存客户端发送的数据，在数据发送过程中，还能通过模型内部的`isNew`方法检测数据是否是新建还是更新，如果是新创建，通过`POST`方法发送，否则通过`PUT`方式发送。服务器根据数据发送的方式进行数据添加或更新操作，并向客户端返回操作结果。

此外，save方法中可以设置`wait`属性，当wait属性值设置为true时，将会调用validate方法，对发送数据的有效性进行验证，如果没有通过验证，`将不会向服务器发送数据，对象的数据进行回滚，返回上一状态`。另外，如果向服务器发送数据的请求地址异常时，设置了wait，也会发送数据回滚。

```javascript
var student = Backbone.Model.extend({
    initialize : function(){},
    url : '/11',
    defaults : {
        Code : '10001',
        Name : 'zhang',
        Score : 100
    }
});

var stu = new student;
stu.save({
    Code : '100002',
    Name : 'foo',
    Score : 50
},{ success : function(model,response){
    console.log(response);
}, wait : true
});
console.log(stu.toJSON());
```

