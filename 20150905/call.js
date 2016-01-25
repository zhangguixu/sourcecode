/*
	关于call的用法
	1)用于继承
	2）可以使用不属于该对象的属性和方法而不用修改该对象
*/
/*=================错误纠正 2016-01-25===================================*/
/*
  首先使用call实现继承不符合继承的的含义

    console.log(cat instanceof Animal) //false
    console.log(cat instanceof Cat)       //true

  按照继承的含义，cat既是animal也是cat才对，因此不能这样

  其次：

    function Cat(name){
      var that=this;  //不需要
      Animal.call(this,name); //会向实例添加属性name和showName
      that.talk=function(){  //用this就可以了
        console.log(name !== this.name);//false
        console.log('i am '+name) //name和this.name是不一样的，这里的name是局部变量name，而不是this的属性this.name
      }
      return that;
    }

    代码各种错误，

    function Cat(name){

      Animal.call(this,name);
      this.talk=function(){
        console.log('i am '+this.name)
      }
      return this;
    }

*/
function Animal(name){
  this.name=name;
  this.showName=function(){
    console.log(name);
  }
}

function Cat(name){
  var that=this;
  Animal.call(this,name);
  that.talk=function(){
    console.log('i am '+name)
  }
  return that;
}


var cat=new Cat('john');
cat.showName();  //john
cat.talk();        //i am john
console.log(cat instanceof Animal) //false
console.log(cat instanceof Cat)       //true

/*===========================================*/
function Animal(name){
  this.name=name;
  this.showName=function(){
    console.log(this.name);
  }
}

function Cat(name){

  this.talk=function(){
  	console.log(this instanceof Animal);
    console.log('i am '+this.name)
  }
  this.name='cat';
  this.showName=function(){
    console.log('cat');
  }
  Animal.call(this,name);
}


var cat=new Cat('john');
cat.showName();           //john
cat.talk();              //i am john ?为什么Animal对象替代了this对象，
// var a=new Animal('a');
// a.talk();  error
console.log(cat instanceof Animal)
console.log(cat instanceof Cat)

/*=========================================*/
function Animal(name){
  this.name=name;
  this.showName=function(){
    console.log(this instanceof Cat);  //true
    console.log(this.name);
  }
}

function Cat(name){

  this.talk=function(){
    console.log(this instanceof Cat);  //true
    console.log('i am '+this.name)
  }
  this.name='cat';
  this.showName=function(){
    console.log('cat');
  }
  Animal.call(this,name);
}


var cat=new Cat('john');
cat.showName();
cat.talk();
console.log(cat instanceof Animal)
console.log(cat instanceof Cat)