'use strict'
const { isDate } = require('./date');
const { isEmail } = require('./email');
const { isString } = require('./string');

const stringValidationErrors = function(input) {
  if (this.isRequired === false && (input === undefined || input === ''))
		return (null);
	if (this.isRequired === true && (input === undefined || input === ''))
		return `${this.label} is required.`;
	else if (!isString(input))
		return `"${this.label}" must be a string.`;
	else if (this.isDate === true && isDate(input) === false)
		return `"${this.label}" must be an date.`;
	else if (this.isEmail === true && isEmail(input) === false)
		return `"${this.label}" must be an email.`;
	else if (this.pattern instanceof RegExp && this.pattern.test(input) === false)
		return `"${this.label}" must be valid.`;
    return (null);
}

module.exports = {
    stringValidationErrors
}