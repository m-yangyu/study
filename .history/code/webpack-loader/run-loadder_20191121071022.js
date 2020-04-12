const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
        require(__dirname, './src/raw-loader.js')
    ],
    context: {
        minimize: true
    },
    readResource: fs.readFile.bind(fs)
}, (err, result) => {

})