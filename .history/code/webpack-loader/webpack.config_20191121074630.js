const path = require('path');
console.log(__dirname);
module.exports = {

    entry: path.join(__dirname, 'index.js'),
    output: {
        filename: '[name].[ext]',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loader: [
            {
                test: /\.js$/,
                loader: require(path.join(__dirname, './src/test-loader.js'))
            }
        ]
    }
}