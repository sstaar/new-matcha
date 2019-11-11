const isNumber = (input) => {
	let regex = /^\d+(?:\.\d*)?$/;
	let is_number = typeof (input) === 'number' || input instanceof Number || regex.test(input);
	return (is_number);
}

module.exports = {
	isNumber
};
