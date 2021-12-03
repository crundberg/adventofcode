const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day3/input.txt').asArray();
const bitsPerRow = input[0].length;

let listOxygen = input;
let listCO2 = input;

const mostCommonBit = (arr, col, mcbValue, lcbValue) => {
	const halfLength = arr.length / 2;
	const count = arr.reduce((acc, row) => {
		let newAcc = acc;
		const bitArr = [...row];

		newAcc += parseInt(bitArr[col], 10);

		return newAcc;
	}, 0);

	return count >= halfLength ? mcbValue : lcbValue;
};

const filterList = (col, mcbValue, lcbValue) => {
	return (row, _, arr) => {
		const bits = [...row];
		const bit = parseInt(bits[col], 10);
		const mcb = mostCommonBit(arr, col, mcbValue, lcbValue);

		return bit === mcb;
	};
};

for (let n = 0; n < bitsPerRow; n += 1) {
	if (listOxygen.length > 1) {
		listOxygen = listOxygen.filter(filterList(n, 1, 0));
	}

	if (listCO2.length > 1) {
		listCO2 = listCO2.filter(filterList(n, 0, 1));
	}
}

const oxygen = parseInt(listOxygen[0], 2);
const co2 = parseInt(listCO2[0], 2);
const result = oxygen * co2;

// Result 1877139
logging.values({ oxygen, co2 });
logging.result(result);
