const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day6/input.txt').asSingleLineNumbers();

let data = input;

const newDay = () => {
	const zeros = data.filter((number) => number === 0).length;

	data = data.map((number) => {
		if (number === 0) return 6;

		return number - 1;
	});

	for (let n = 0; n < zeros; n += 1) {
		data.push(8);
	}
};

for (let day = 1; day <= 80; day += 1) {
	newDay();
}

const result = data.length;

// Result 362666
logging.result(result);
