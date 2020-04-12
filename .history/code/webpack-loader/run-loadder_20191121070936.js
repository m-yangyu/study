const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
        require(__dirname, './src/raw-loader.js')
    ]
}, (err, result) => {

})