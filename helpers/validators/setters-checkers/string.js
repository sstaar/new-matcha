const isString = function (input) {
        return typeof (input) === 'string' || input instanceof String;
}

module.exports = {
    isString
};