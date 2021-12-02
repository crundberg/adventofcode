const Input = require('../utils/input');

const input = Input('./day2/input.txt').asArray();

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

/*
Horizontal position 1927
Depth 1090312
Result 2101031224
*/

console.log('Horizontal position', horizontalPos);
console.log('Depth', depth);
console.log('Result', horizontalPos * depth);
