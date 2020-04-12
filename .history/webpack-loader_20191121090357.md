## webpack loader

webpack loader 是webpack解析文件的地方，通过调用不同的loader对对应的文件做不同的解析生成不一样的文件内容

loader是按照从下往上执行的，本质上而言loader只是一个纯函数，传入的是源代码字符串，传出源代码

loader-runner 提供一个loader开发的环境

loader-utils 提供获取参数的库

loader分为异步和同步

### 代码实例

同步，异步loader

```javascript

    module.exports = function(resource) {
        const { name } = loaderUtils.getOptions(this);
        const callback = this.async();
        this.cacheabled = false;
        const json = JSON.stringify(resource)
                        .replace(/\u2028/g, '\\u2028')
                        .replace(/\u2029/g, '\\u2029');

        // 异步loader读取
        fs.readFile(path.join(__dirname, './src/async.txt'), 'utf-8', (err, data) => {
            callback(null, data);
        })

        // 同步使用
        return `export default ${json}`;
        // this.callback(null, json, 1, 2, 3, 4);
    }

```

使用loader context

```javascript

    // webpack.config.js
    module.exports = {

        entry: path.join(__dirname, 'index.js'),
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // 直接写入路径，不用引入，引入的话，webpack没法将context传入
                    loader: path.resolve('./src/test-loader.js')
                }
            ]
        }
    }

    // test-loader.js
    // 最简洁的loader，传入什么直接传出
    module.exports = function(source) {

        // 在dist目录下面生成文件
        this.emitFile('index.js', source);
        return source;
    }

```
