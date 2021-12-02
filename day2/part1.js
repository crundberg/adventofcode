const Input = require('../utils/input');

const input = Input('./day2/input.txt').asArray();

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

/*
Horizontal position 1927
Depth 1091
Result 2102357
*/

console.log('Horizontal position', horizontalPos);
console.log('Depth', depth);
console.log('Result', horizontalPos * depth);
