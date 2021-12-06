const Input = require('../utils/input');
const logging = require('../utils/logging')();

const inputStr = Input('./day6/input.txt').asString();
const input = inputStr.split(',').map(Number);

let data = input.reduce((acc, number) => {
	acc[number] += 1;

	return acc;
}, new Array(8).fill(0));

const newDay = () => {
	data = data.reduce((acc, value, index) => {
		if (index === 0) {
			acc[6] = value;
			acc[8] = value;
		} else {
			acc[index - 1] += value;
		}

		return acc;
	}, new Array(8).fill(0));
};

for (let day = 1; day <= 256; day += 1) {
	newDay();
}

const result = data.reduce((sum, number) => sum + number);

// Result 1640526601595
logging.result(result);
