﻿# JS 原型与原型链（二）

标签（空格分隔）： JS

---

四. __proto__
JS 在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做__proto__ 的内置属性，用于指向创建它的构造函数的原型对象。
对象 person1 有一个 __proto__属性，创建它的构造函数是 Person，构造函数的原型对象是 Person.prototype ，所以：
person1.__proto__ == Person.prototype

请看下图：

![此处输入图片的描述][1]
《JavaScript 高级程序设计》的图 6-1
根据上面这个连接图，我们能得到：

Person.prototype.constructor == Person;
person1.__proto__ == Person.prototype;
person1.constructor == Person;
不过，要明确的真正重要的一点就是，这个连接存在于实例（person1）与构造函数（Person）的原型对象（Person.prototype）之间，而不是存在于实例（person1）与构造函数（Person）之间。

注意：因为绝大部分浏览器都支持__proto__属性，所以它才被加入了 ES6 里（ES5 部分浏览器也支持，但还不是标准）。

五. 构造器
熟悉 Javascript 的童鞋都知道，我们可以这样创建一个对象：
var obj = {}
它等同于下面这样：
var obj = new Object()

obj 是构造函数（Object）的一个实例。所以：
obj.constructor === Object
obj.__proto__ === Object.prototype

新对象 obj 是使用 new 操作符后跟一个构造函数来创建的。构造函数（Object）本身就是一个函数（就是上面说的函数对象），它和上面的构造函数 Person 差不多。只不过该函数是出于创建新对象的目的而定义的。所以不要被 Object 吓倒。

同理，可以创建对象的构造器不仅仅有 Object，也可以是 Array，Date，Function等。
所以我们也可以构造函数来创建 Array、 Date、Function

var b = new Array();
b.constructor === Array;
b.__proto__ === Array.prototype;

var c = new Date(); 
c.constructor === Date;
c.__proto__ === Date.prototype;

var d = new Function();
d.constructor === Function;
d.__proto__ === Function.prototype;
这些构造器都是函数对象：
![此处输入图片的描述][2]
函数对象
六. 原型链
小测试来检验一下你理解的怎么样：

person1.__proto__ 是什么？
Person.__proto__ 是什么？
Person.prototype.__proto__ 是什么？
Object.__proto__ 是什么？
Object.prototype__proto__ 是什么？
答案：
第一题：
因为 person1.__proto__ === person1 的构造函数.prototype
因为 person1的构造函数 === Person
所以 person1.__proto__ === Person.prototype

第二题：
因为 Person.__proto__ === Person的构造函数.prototype
因为 Person的构造函数 === Function
所以 Person.__proto__ === Function.prototype

第三题：
Person.prototype 是一个普通对象，我们无需关注它有哪些属性，只要记住它是一个普通对象。
因为一个普通对象的构造函数 === Object
所以 Person.prototype.__proto__ === Object.prototype

第四题，参照第二题，因为 Person 和 Object 一样都是构造函数

第五题：
Object.prototype 对象也有proto属性，但它比较特殊，为 null 。因为 null 处于原型链的顶端，这个只能记住。
Object.prototype.__proto__ === null


  [1]: https://upload-images.jianshu.io/upload_images/1430985-b650bc438f236877.jpg?imageMogr2/auto-orient/
  [2]: https://upload-images.jianshu.io/upload_images/1430985-b8373019f5f3bab3.jpg?imageMogr2/auto-orient/