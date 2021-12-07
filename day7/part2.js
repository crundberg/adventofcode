const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day7/input.txt').asSingleLineNumbers();

const highestPos = Math.max(...input);
const consumptionToPos = Array(highestPos).fill(0);

const calculateConsumption = (n) => {
	const consumption = input.reduce((acc, value) => {
		const diff = Math.abs(n - value);

		let calcValue = 0;
		for (let x = 1; x <= diff; x += 1) {
			calcValue += x;
		}

		return acc + calcValue;
	}, 0);

	consumptionToPos[n] = consumption;
};

for (let n = 0; n < highestPos; n += 1) {
	calculateConsumption(n);
}

const result = Math.min(...consumptionToPos);

// Result 96987874
logging.result(result);
