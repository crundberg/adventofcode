const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day3/input.txt').asArray();
const inputLength = input.length;
const bitsPerRow = input[0].length;

const mostCommonBitPerCol = input.reduce((acc, row) => {
	const newAcc = acc;
	const bitArr = [...row];

	bitArr.forEach((bit, index) => {
		newAcc[index] += parseInt(bit, 10);
	});

	return newAcc;
}, new Array(bitsPerRow).fill(0));

const reducer = (mcbValue, lcbValue) => {
	return (acc, col, index, arr) => {
		let newAcc = acc;
		const mostCommonBit = col > inputLength / 2;
		const bit = mostCommonBit ? mcbValue : lcbValue;
		const binaryValue = 2 ** (arr.length - 1 - index);

		newAcc += bit * binaryValue;

		return newAcc;
	};
};

const gamma = mostCommonBitPerCol.reduce(reducer(1, 0), 0);
const epsilon = mostCommonBitPerCol.reduce(reducer(0, 1), 0);
const result = gamma * epsilon;

// Result 2003336
logging.values({ gamma, epsilon });
logging.result(result);
