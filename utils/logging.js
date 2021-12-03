/* eslint-disable no-console */

const Logging = () => {
	const input = (value) => {
		console.log('Input', value);
	};

	const values = (value) => {
		console.log('Values', value);
	};

	const result = (value) => {
		console.log('Result', value);
	};

	return {
		input,
		values,
		result,
	};
};

module.exports = Logging;
