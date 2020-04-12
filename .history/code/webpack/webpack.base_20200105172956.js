const path = require('path');

console.log(__dirname);

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: path.resolve(__dirname, 'dist')
}