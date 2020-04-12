## webpack学习

之前跟着视频走了一趟webpack的内容，感觉没有深刻领会webpack，所以我决定自己从头整理一趟webpack的内容

### 打包结果

``` javascript
    // webpack.js
    const path = require('path');
    module.exports = {
        entry: path.resolve(__dirname, './index.js'),
        output: {
            filename: 'build.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            minimize: false
        }
    }
    // index.js
    const a = '123';

```

最基础的webpack的配置就是一个入口一个出口，这样就能将js的内容打包出来，那么来看下打包之后的结果是怎么样的

``` javascript

(function(modules){
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }

    return __webpack_require__(__webpack_require__.s = 0);
})([
    (function(module, exports) {
        const a = '123';
    })
])

```

去掉多余累赘内容，就剩下了一个自调用函数，先看下函数内部

有一个 `__webpack_require__` 的方法，这个是webpack自己实现的commonjs规范的require方法，然后看下面的参数

是一个function，里面就一句 `const a = '123';` ，这很明显，这个就是我们刚刚写的 `index.js`，然后自调用函数里面默认返回了类似 `require(0)` 的操作，这表明，在这个js加载的时候，默认会引用我们的入口文件
