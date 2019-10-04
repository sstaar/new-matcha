const setDate = function () {
    this.isDate = true;
    return (this);
};

const _isLeapYear = function (year) {
	return ((!(year % 4) && year % 100) || !(year % 400));
}

// 1  - January - 31 days
// 2  - February - 28 days in a common year and 29 days in leap years
// 3  - March - 31 days
// 4  - April - 30 days
// 5  - May - 31 days
// 6  - June - 30 days
// 7  - July - 31 days
// 8  - August - 31 days
// 9  - September - 30 days
// 10 - October - 31 days
// 11 - November - 30 days
// 11 - December - 31 days

const _daysOfMonth = function (month, year) {
	if ([ 1, 3, 5, 7, 8, 10, 12 ].includes(month))
		return (31);
	if (month !== 2)
		return (30);
	if (month === 2 && _isLeapYear(year))
		return (29);
	return (28);
}

//yyyy-mm-dd
const isDate = (date) => {
    let datePattern = /^([0-9]{4,4})-([0-9]{1,2})-([0-9]{1,2})(?: ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}))?$/;

    const matches = date.match(datePattern);
	if (matches === null)
		return (false);
	const year = matches[1];
	const month = matches[2];
	const day = matches[3];
	if (matches.length > 4) {
		const hour = matches[4];
		const minute = matches[5];
		const second = matches[6];
		if (hour > 23 || minute > 59 || second > 59)
			return (false);
	}
	if (year > 9999 || month > 12 || day > _daysOfMonth(month, year))
		return (false);
	return (true);
};

module.exports = {
    setDate,
    isDate
};