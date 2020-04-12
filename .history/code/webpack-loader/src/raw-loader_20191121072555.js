const loaderUtils = require('loader-utils');
const fs = require('fs');

module.exports = function(resource) {
    const { name } = loaderUtils.getOptions(this);

    console.log(name);

    const json = JSON.stringify(resource)
                     .replace(/\u2028/g, '\\u2028')
                     .replace(/\u2029/g, '\\u2029');

    return `export default ${json}`;
    // this.callback(null, json, 1, 2, 3, 4);
}   