const path = require('path');

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
                loader: path.resolve('./src/test-loader.js')
            }
        ]
    }
}