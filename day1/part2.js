const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day1/input.txt').asNumbersArray();

const groupedData = input.reduce((acc, item, index) => {
	if (!acc[index]) acc[index] = [];
	if (!acc[index + 1]) acc[index + 1] = [];
	if (!acc[index + 2]) acc[index + 2] = [];

	acc[index].push(item);
	acc[index + 1].push(item);
	acc[index + 2].push(item);

	return acc;
}, {});

const sumArray = (acc, item) => acc + item;

const result = Object.values(groupedData)
	.filter((numbers) => numbers.length === 3)
	.reduce((acc, numbers, index, arr) => {
		let newValue = acc;

		const prevNumbers = arr[index - 1] || [0];
		const currSum = numbers.reduce(sumArray, 0);
		const prevSum = prevNumbers.reduce(sumArray, 0);
		const diff = currSum - prevSum;

		if (diff > 0 && index > 0) {
			newValue += 1;
		}

		return newValue;
	}, 0);

// Result 1217
logging.result(result);
