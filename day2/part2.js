const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day2/input.txt').asTable();

let horizontalPos = 0;
let depth = 0;
let aim = 0;

const calc = {
	forward: (value) => {
		horizontalPos += value;
		depth += aim * value;
	},
	down: (value) => {
		aim += value;
	},
	up: (value) => {
		aim -= value;
	},
};

input.forEach(([direction, value]) => {
	const newValue = parseInt(value, 10);
	calc[direction](newValue);
});

// Result 2101031224
logging.values({
	horizontalPos,
	depth,
});
logging.result(horizontalPos * depth);
