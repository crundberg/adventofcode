const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day2/input.txt').asTable();

let horizontalPos = 0;
let depth = 0;

const calc = {
	forward: (value) => {
		horizontalPos += value;
	},
	down: (value) => {
		depth += value;
	},
	up: (value) => {
		depth -= value;
	},
};

input.forEach(([direction, value]) => {
	const newValue = parseInt(value, 10);
	calc[direction](newValue);
});

const result = horizontalPos * depth;

// Result 2102357
logging.values({ horizontalPos, depth });
logging.result(result);
