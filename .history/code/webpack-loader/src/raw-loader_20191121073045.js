const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function(resource) {
    const { name } = loaderUtils.getOptions(this);
    const callback = this.async();

    console.log(name);

    const json = JSON.stringify(resource)
                     .replace(/\u2028/g, '\\u2028')
                     .replace(/\u2029/g, '\\u2029');

    // 异步loader读取
    fs.readFile(path.join(__dirname, './src/async.txt'), 'utf-8', (err, data) => {
        callback(null, data);
    })
    // 同步使用
    // return `export default ${json}`;
    // this.callback(null, json, 1, 2, 3, 4);
}   