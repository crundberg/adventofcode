const fs = require('fs');
const logging = require('./logging')();

const Input = (fileName, logInput) => {
	const asString = () => {
		const input = fs.readFileSync(fileName, 'utf8');

		if (logInput) logging.input(input);

		return input;
	};

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
		asString,
		asArray,
		asTable,
		asNumbersArray,
	};
};

module.exports = Input;
