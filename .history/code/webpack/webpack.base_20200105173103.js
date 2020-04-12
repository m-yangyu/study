const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    }
}