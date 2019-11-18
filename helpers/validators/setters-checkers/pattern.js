const setPattern = function (pattern, errorMessage) {
	this.pattern = pattern;
	this.patternMsg = errorMessage;
	return (this);
};

module.exports = {
	setPattern
};