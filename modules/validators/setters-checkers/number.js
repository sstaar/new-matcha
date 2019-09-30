const isNumber = (input) => {
	let is_number = typeof(input) === 'number' || input instanceof Number;

	return (is_number);
}

module.exports = {
    isNumber
};