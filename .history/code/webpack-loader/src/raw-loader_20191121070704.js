module.exports = function(resource) {
    const json = JSON.stringify(resource)
                     .replace(/\u2028/g, '\\u2028')
                     .replace(/\u2029/g, '\\u2029');

    return `export default ${json}`;
}   