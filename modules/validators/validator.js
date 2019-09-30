const { setEmail } = require('./setters-checkers/email');
const { setPattern } = require('./setters-checkers/pattern');
const { setRequired } = require('./setters-checkers/required');
const { setDate } = require('./setters-checkers/date');
const { stringValidationErrors } = require('./setters-checkers/stringvalidator');
const { numberValidationErrors } = require('./setters-checkers/numbervalidator');

const validate = (obj, schema) => {
	return new Promise((resolve, reject) => {
		let	details = {};
		let	has_error = false;
		let	error = null;
		

		for (const key in schema) {
			const input = obj[key];
			const field = schema[key];

			field.label = key;
			error = field.validate(input);
			if (error !== null) {
				details[key] = error;
				has_error = true;
			}
		}
		if (!has_error)
			return resolve(obj);
		error = new Error('Validation fails.');
		error.customErrors = details;
		return reject(error);
	});
}

const number = () => {
	return {
		'label': '',
		'type': 'number',
		'isRequired': false,
		'validate': numberValidationErrors,
		'required': setRequired
	};
}

const string = () => {
    return {
        'label': '',
		'type': 'string',
		'isDate': false,
		'isEmail': false,
		'isRequired': false,
		'pattern': null,
		'validate': stringValidationErrors,
		'email': setEmail,
		'required': setRequired,
		'match': setPattern,
		'date': setDate
    }
}

module.exports = {
	string,
	number,
	validate
}