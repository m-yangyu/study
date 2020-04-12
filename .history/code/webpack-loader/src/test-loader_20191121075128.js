const path = require('path');

module.exports = function(source) {

    console.log(this);
    this.emitFile('index.js', source);

    return source;
}