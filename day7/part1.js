const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day7/input.txt').asSingleLineNumbers();

const highestPos = Math.max(...input);
const consumptionToPos = Array(highestPos).fill(0);

const calculateConsumption = (n) => {
	const consumption = input.reduce((acc, value) => {
		return acc + Math.abs(n - value);
	}, 0);

	consumptionToPos[n] = consumption;
};

for (let n = 0; n < highestPos; n += 1) {
	calculateConsumption(n);
}

const result = Math.min(...consumptionToPos);

// Result 340987
logging.result(result);
