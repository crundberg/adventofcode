const fs = require('fs');
const logging = require('./logging')();

const Input = (fileName, logInput) => {
	const asArray = () => {
		const input = fs.readFileSync(fileName, 'utf8').split('\r\n');

		if (logInput) logging.input(input);

		return input;
	};

	const asTable = () => {
		const input = fs
			.readFileSync(fileName, 'utf8')
			.split('\r\n')
			.map((row) => {
				return row.split(' ');
			});

		if (logInput) logging.input(input);

		return input;
	};

	const asNumbersArray = () => {
		const input = fs.readFileSync(fileName, 'utf8').split('\r\n').map(Number);

		if (logInput) logging.input(input);

		return input;
	};

	return {
		asArray,
		asTable,
		asNumbersArray,
	};
};

module.exports = Input;
