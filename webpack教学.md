# webpack教学

标签（空格分隔）： webpack


---入口

    module.exports = {
        entry: './path/to/my/entry/file.js'
    };


---出口

    const path = require('path');

    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        }
    };
    多入口写法：
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
// 写入到硬盘：./dist/app.js, ./dist/search.js

---Loader
1.Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

     module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
1.test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2.use 属性，表示进行转换时，应该使用哪个 loader。
2.css-loader 会遍历 CSS文件，然后找到url()表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。


---webpack.config.js 配置文件
简单示例：

    module.exports = {
    entry: "./runoob1.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};


---配置plugins插件

    plugins:[
    new webpack.BannerPlugin('头部注释信息')
    ]
    


