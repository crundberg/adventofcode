const Input = require('../utils/input');

const input = Input('./day1/input.txt').asNumbersArray();

const result = input.reduce((acc, item, index, arr) => {
	let newValue = acc;

	const diff = item - arr[index - 1];

	if (diff > 0) {
		newValue += 1;
	}

	return newValue;
}, 0);

// Result 1266
console.log('Result', result);
