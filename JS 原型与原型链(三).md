# JS 原型与原型链(三)

标签（空格分隔）： JS

---

七. 函数对象 （复习一下前面的知识点）
所有函数对象的proto都指向Function.prototype，它是一个空函数（Empty function）
Number.__proto__ === Function.prototype  // true
Number.constructor == Function //true

Boolean.__proto__ === Function.prototype // true
Boolean.constructor == Function //true

String.__proto__ === Function.prototype  // true
String.constructor == Function //true

// 所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身
Object.__proto__ === Function.prototype  // true
Object.constructor == Function // true

// 所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身
Function.__proto__ === Function.prototype // true
Function.constructor == Function //true

Array.__proto__ === Function.prototype   // true
Array.constructor == Function //true

RegExp.__proto__ === Function.prototype  // true
RegExp.constructor == Function //true

Error.__proto__ === Function.prototype   // true
Error.constructor == Function //true

Date.__proto__ === Function.prototype    // true
Date.constructor == Function //true
JavaScript中有内置(build-in)构造器/对象共计12个（ES5中新加了JSON），这里列举了可访问的8个构造器。剩下如Global不能直接访问，Arguments仅在函数调用时由JS引擎创建，Math，JSON是以对象形式存在的，无需new。它们的proto是Object.prototype。如下

Math.__proto__ === Object.prototype  // true
Math.construrctor == Object // true

JSON.__proto__ === Object.prototype  // true
JSON.construrctor == Object //true
上面说的函数对象当然包括自定义的。如下

// 函数声明
function Person() {}
// 函数表达式
var Perosn = function() {}
console.log(Person.__proto__ === Function.prototype) // true
console.log(Man.__proto__ === Function.prototype)    // true
这说明什么呢？

** 所有的构造器都来自于 Function.prototype，甚至包括根构造器Object及Function自身。所有构造器都继承了·Function.prototype·的属性及方法。如length、call、apply、bind**

（你应该明白第一句话，第二句话我们下一节继续说，先挖个坑：））
Function.prototype也是唯一一个typeof XXX.prototype为 function的prototype。其它的构造器的prototype都是一个对象（原因第三节里已经解释过了）。如下（又复习了一遍）：

console.log(typeof Function.prototype) // function
console.log(typeof Object.prototype)   // object
console.log(typeof Number.prototype)   // object
console.log(typeof Boolean.prototype)  // object
console.log(typeof String.prototype)   // object
console.log(typeof Array.prototype)    // object
console.log(typeof RegExp.prototype)   // object
console.log(typeof Error.prototype)    // object
console.log(typeof Date.prototype)     // object
console.log(typeof Object.prototype)   // object
噢，上面还提到它是一个空的函数，console.log(Function.prototype) 下看看（留意，下一节会再说一下这个）

知道了所有构造器（含内置及自定义）的__proto__都是Function.prototype，那Function.prototype的__proto__是谁呢？
相信都听说过JavaScript中函数也是一等公民，那从哪能体现呢？如下
console.log(Function.prototype.__proto__ === Object.prototype) // true
这说明所有的构造器也都是一个普通 JS 对象，可以给构造器添加/删除属性等。同时它也继承了Object.prototype上的所有方法：toString、valueOf、hasOwnProperty等。（你也应该明白第一句话，第二句话我们下一节继续说，不用挖坑了，还是刚才那个坑；））

最后Object.prototype的proto是谁？
Object.prototype.__proto__ === null // true
已经到顶了，为null。(读到现在，再回过头看第五章，能明白吗？)

八. Prototype
在 ECMAScript 核心所定义的全部属性中，最耐人寻味的就要数 prototype 属性了。对于 ECMAScript 中的引用类型而言，prototype 是保存着它们所有实例方法的真正所在。换句话所说，诸如 toString()和 valuseOf() 等方法实际上都保存在 prototype 名下，只不过是通过各自对象的实例访问罢了。

——《JavaScript 高级程序设计》第三版 P116

我们知道 JS 内置了一些方法供我们使用，比如：
对象可以用 constructor/toString()/valueOf() 等方法;
数组可以用 map()/filter()/reducer() 等方法；
数字可用用 parseInt()/parseFloat()等方法；
Why ？？？
why??
当我们创建一个函数时：
var Person = new Object()
Person 是 Object 的实例，所以 Person 继承了Object 的原型对象Object.prototype上所有的方法：
Object.prototype

Object 的每个实例都具有以上的属性和方法。
所以我可以用 Person.constructor 也可以用 Person.hasOwnProperty。
当我们创建一个数组时：
var num = new Array()
num 是 Array 的实例，所以 num 继承了Array 的原型对象Array.prototype上所有的方法：
Array.prototype
Are you f***ing kidding me? 这尼玛怎么是一个空数组？？？
doge

我们可以用一个 ES5 提供的新方法：Object.getOwnPropertyNames
获取所有（包括不可枚举的属性）的属性名不包括 prototy 中的属性，返回一个数组：
var arrayAllKeys = Array.prototype; // [] 空数组
// 只得到 arrayAllKeys 这个对象里所有的属性名(不会去找 arrayAllKeys.prototype 中的属性)
console.log(Object.getOwnPropertyNames(arrayAllKeys)); 
/* 输出：
["length", "constructor", "toString", "toLocaleString", "join", "pop", "push", 
"concat", "reverse", "shift", "unshift", "slice", "splice", "sort", "filter", "forEach", 
"some", "every", "map", "indexOf", "lastIndexOf", "reduce", "reduceRight", 
"entries", "keys", "copyWithin", "find", "findIndex", "fill"]
*/
这样你就明白了随便声明一个数组，它为啥能用那么多方法了。

细心的你肯定发现了Object.getOwnPropertyNames(arrayAllKeys) 输出的数组里并没有 constructor/hasOwnPrototype等对象的方法（你肯定没发现）。
但是随便定义的数组也能用这些方法

var num = [1];
console.log(num.hasOwnPrototype()) // false (输出布尔值而不是报错)
Why ？？？


why??
因为Array.prototype 虽然没这些方法，但是它有原型对象（__proto__）：

// 上面我们说了 Object.prototype 就是一个普通对象。
Array.prototype.__proto__ == Object.prototype
所以 Array.prototype 继承了对象的所有方法，当你用num.hasOwnPrototype()时，JS 会先查一下它的构造函数 （Array） 的原型对象 Array.prototype 有没有有hasOwnPrototype()方法，没查到的话继续查一下 Array.prototype 的原型对象 Array.prototype.__proto__有没有这个方法。

当我们创建一个函数时：
var f = new Function("x","return x*x;");
//当然你也可以这么创建 f = function(x){ return x*x }
console.log(f.arguments) // arguments 方法从哪里来的？
console.log(f.call(window)) // call 方法从哪里来的？
console.log(Function.prototype) // function() {} （一个空的函数）
console.log(Object.getOwnPropertyNames(Function.prototype)); 
/* 输出
["length", "name", "arguments", "caller", "constructor", "bind", "toString", "call", "apply"]
*/
我们再复习第八小节这句话：

所有函数对象proto都指向 Function.prototype，它是一个空函数（Empty function）

嗯，我们验证了它就是空函数。不过不要忽略前半句。我们枚举出了它的所有的方法，所以所有的函数对象都能用，比如:
函数对象
如果你还没搞懂啥是函数对象？


去屎 | center
还有，我建议你可以再复习下为什么：

Function.prototype 是唯一一个typeof XXX.prototype为 “function”的prototype

我猜你肯定忘了。

九. 复习一下
第八小节我们总结了：

所有函数对象的 __proto__ 都指向 Function.prototype，它是一个空函数（Empty function）
但是你可别忘了在第三小节我们总结的：

所有对象的 __proto__ 都指向其构造器的 prototype
咦，我找了半天怎么没找到这句话……


doge | center
我们下面再复习下这句话。

先看看 JS 内置构造器：

var obj = {name: 'jack'}
var arr = [1,2,3]
var reg = /hello/g
var date = new Date
var err = new Error('exception')
 
console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype)  // true
console.log(reg.__proto__ === RegExp.prototype) // true
console.log(date.__proto__ === Date.prototype)  // true
console.log(err.__proto__ === Error.prototype)  // true
再看看自定义的构造器，这里定义了一个 Person：

function Person(name) {
  this.name = name;
}
var p = new Person('jack')
console.log(p.__proto__ === Person.prototype) // true
p 是 Person 的实例对象，p 的内部原型总是指向其构造器 Person 的原型对象 prototype。

每个对象都有一个 constructor 属性，可以获取它的构造器，因此以下打印结果也是恒等的：

function Person(name) {
    this.name = name
}
var p = new Person('jack')
console.log(p.__proto__ === p.constructor.prototype) // true
上面的Person没有给其原型添加属性或方法，这里给其原型添加一个getName方法：

function Person(name) {
    this.name = name
}
// 修改原型
Person.prototype.getName = function() {}
var p = new Person('jack')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // true
可以看到p.__proto__与Person.prototype，p.constructor.prototype都是恒等的，即都指向同一个对象。

如果换一种方式设置原型，结果就有些不同了：

function Person(name) {
    this.name = name
}
// 重写原型
Person.prototype = {
    getName: function() {}
}
var p = new Person('jack')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // false
这里直接重写了 Person.prototype（注意：上一个示例是修改原型）。输出结果可以看出p.__proto__仍然指向的是Person.prototype，而不是p.constructor.prototype。

这也很好理解，给Person.prototype赋值的是一个对象直接量{getName: function(){}}，使用对象直接量方式定义的对象其构造器（constructor）指向的是根构造器Object，Object.prototype是一个空对象{}，{}自然与{getName: function(){}}不等。如下：

var p = {}
console.log(Object.prototype) // 为一个空的对象{}
console.log(p.constructor === Object) // 对象直接量方式定义的对象其constructor为Object
console.log(p.constructor.prototype === Object.prototype) // 为true，不解释(๑ˇ3ˇ๑)
十. 原型链（再复习一下：）
下面这个例子你应该能明白了！

function Person(){}
var person1 = new Person();
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype) //true
console.log(Object.prototype.__proto__) //null

Person.__proto__ == Function.prototype; //true
console.log(Function.prototype)// function(){} (空函数)

var num = new Array()
console.log(num.__proto__ == Array.prototype) // true
console.log( Array.prototype.__proto__ == Object.prototype) // true
console.log(Array.prototype) // [] (空数组)
console.log(Object.prototype.__proto__) //null

console.log(Array.__proto__ == Function.prototype)// true
疑点解惑：

Object.__proto__ === Function.prototype // true
Object 是函数对象，是通过new Function()创建的，所以Object.__proto__指向Function.prototype。（参照第八小节：「所有函数对象的__proto__都指向Function.prototype」）

Function.__proto__ === Function.prototype // true
Function 也是对象函数，也是通过new Function()创建，所以Function.__proto__指向Function.prototype。

自己是由自己创建的，好像不符合逻辑，但仔细想想，现实世界也有些类似，你是怎么来的，你妈生的，你妈怎么来的，你姥姥生的，……类人猿进化来的，那类人猿从哪来，一直追溯下去……，就是无，（NULL生万物）
正如《道德经》里所说“无，名天地之始”。

Function.prototype.__proto__ === Object.prototype //true
其实这一点我也有点困惑，不过也可以试着解释一下。
Function.prototype是个函数对象，理论上他的__proto__应该指向 Function.prototype，就是他自己，自己指向自己，没有意义。
JS一直强调万物皆对象，函数对象也是对象，给他认个祖宗，指向Object.prototype。Object.prototype.__proto__ === null，保证原型链能够正常结束。

十一 总结
原型和原型链是JS实现继承的一种模型。
原型链的形成是真正是靠__proto__ 而非prototype
要深入理解这句话，我们再举个例子，看看前面你真的理解了吗？

 var animal = function(){};
 var dog = function(){};

 animal.price = 2000;
 dog.prototype = animal;
 var tidy = new dog();
 console.log(dog.price) //undefined
 console.log(tidy.price) // 2000
这里解释一下：

 var dog = function(){};
 dog.prototype.price = 2000;
 var tidy = new dog();
 console.log(tidy.price); // 2000
 console.log(dog.price); //undefined
 var dog = function(){};
 var tidy = new dog();
 tidy.price = 2000;
 console.log(dog.price); //undefined
这个明白吧？想一想我们上面说过这句话：

实例（tidy）和 原型对象（dog.prototype）存在一个连接。不过，要明确的真正重要的一点就是，这个连接存在于实例（tidy）与构造函数的原型对象（dog.prototype）之间，而不是存在于实例（tidy）与构造函数（dog）之间。







