const path = require('path');

module.exports = {

    entry: path.join(__dirname, 'index.js'),
    output: {
        filename: '[name].[ext]',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    require(path.join(__dirname, './src/test-loader.js'))
                ]
            }
        ]
    }
}