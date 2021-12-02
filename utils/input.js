const fs = require('fs');

const Input = (fileName) => {
	const asArray = () => {
		return fs
			.readFileSync(fileName, 'utf8')
			.split('\r\n')
			.map((row) => {
				return row.split(' ');
			});
	};

	const asNumbersArray = () => {
		return fs.readFileSync(fileName, 'utf8').split('\r\n').map(Number);
	};

	return {
		asArray,
		asNumbersArray,
	};
};

module.exports = Input;
