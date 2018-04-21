# thunk及函数柯里化

标签（空格分隔）： thunk

---柯里化

所谓柯里化就是：将函数与其参数的一个子集绑定起来后返回个新函数。
正常情况下：
    function simpleURL(protocol, domain, path) {
        return protocol + "://" + domain + "/" + path;
    }
    
    simpleURL('http','www.jackzxl.net', 'index.html');                       //http://www.jackzxl.net/index.html

柯里化后：

    var myURL = simpleURL.bind(null, 'http', 'www.jackzxl.net'); 
    myURL('myfile.js'); 
    //http://www.jackzxl.net/myfile.js 
    
    //站点加上SSL 
    var mySslURL = simpleURL.bind(null, 'https', 'www.jackzxl.net'); 
    mySslURL('myfile.js'); 
    //https://www.jackzxl.net/myfile.js

柯里化的作用：

 1. 参数复用
 2. 延迟执行
 3. 扁平化
学习地址（很详细）：https://www.jianshu.com/p/9b6b5c7527fc

---thunk
Thunk函数在JS里的应用，将多参的异步函数，转换成单参。

1.普通调用方式：

    function someCallback(err, data) { 
        if (err) throw err;
        console.log(data); 
    }
    fs.readFile('./oranges.txt','utf8', someCallback);

用Thunk改造一下：

    function someCallback(err, data) { 
        if (err) throw err;
        console.log(data); 
    }
    var Thunk = function (fileName, options){
        return function (callback){
            return fs.readFile(fileName, options, callback); 
        };
    };

    var readFileThunk = Thunk('./oranges.txt', 'utf8');
    readFileThunk(someCallback);

2.再者，以读取文件为例，Generator函数封装了两个异步操作：

    var fs = require('fs');
    var thunkify = require('thunkify');
    var readFileThunk = thunkify(fs.readFile);

    var gen = function* (){
        var r1 = yield readFileThunk('./apples.txt', 'utf8');
        console.log(r1);
        var r2 = yield readFileThunk('./oranges.txt', 'utf8');
        console.log(r2);
    };

定义的异步操作很清晰（这也是Generator的优点，可以用同步化的方式定义异步操作步骤）。可以如下执行异步操作：

    var g = gen();
    var r = g.next();
    r.value(function(err, data){
    //r.value是一个function，等价于fs.readFile(callback)
    
        if (err) throw err;
        var r2 = g.next(data);
        r2.value(function(err, data){
            if (err) throw err;
            g.next(data);
        });
    });


链接：https://www.jianshu.com/p/4b0f8947fb3a









