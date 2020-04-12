const path = require('path');

module.exports = function(source) {


    this.emitFile('index.js', source);

    return source;
}