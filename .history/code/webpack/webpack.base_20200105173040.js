const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        name: 'build.js',
        path: path.resolve(__dirname, 'dist')
    }
}