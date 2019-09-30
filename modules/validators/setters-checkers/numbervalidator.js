'use strict'
const { isNumber } = require('./number');

const numberValidationErrors = function(input) {
	if (this.isRequired === false && input === undefined)
		return (null);
	if (this.isRequired === true && input === undefined)
		return `"${this.label}" is required.`;
	if (isNumber(input) === false)
		return `"${this.label}" must be an number.`;
	return (null);
}

module.exports = {
    numberValidationErrors
}