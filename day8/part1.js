const Input = require('../utils/input');
const logging = require('../utils/logging')();

const inputRows = Input('./day8/input.txt').asArray();
const input = inputRows.map((value) => {
	const [inputStr, outputStr] = value.split(' | ');
	const inputArr = inputStr.split(' ');
	const outputArr = outputStr.split(' ');

	return [inputArr, outputArr];
});

const mapNumber = (data) => {
	const numberByLength = {
		2: 1,
		4: 4,
		3: 7,
		7: 8,
	};

	return numberByLength[data.length] || 0;
};

const result = input.reduce((acc, [, outputData]) => {
	const numbers = outputData.map((data) => mapNumber(data)).filter(Number);

	return acc + numbers.length;
}, 0);

// Result 310
logging.result(result);
