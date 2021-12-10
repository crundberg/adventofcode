const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day10/input.txt').asArray();

const points = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
};

const output = input
	.map((row) => {
		let newRow = row;

		const expr = /(\(\)|\[\]|<>|\{\})/;
		let continueLoop = true;

		while (continueLoop) {
			newRow = newRow.replace('()', '');
			newRow = newRow.replace('[]', '');
			newRow = newRow.replace('{}', '');
			newRow = newRow.replace('<>', '');

			continueLoop = expr.test(newRow);
		}

		const [illegal] = newRow.match(/([([{<][)\]}>])/) || [];

		if (illegal) return undefined;

		return newRow;
	})
	.filter((row) => row !== undefined)
	.map((row) => {
		const endStr = row
			.replaceAll('(', ')')
			.replaceAll('[', ']')
			.replaceAll('{', '}')
			.replaceAll('<', '>');

		const end = [...endStr].reverse();

		const rowPoints = end.reduce((acc, char) => acc * 5 + points[char], 0);
		return rowPoints;
	}, 0)
	.sort((a, b) => a - b);

const middleValue = Math.floor((output.length - 1) / 2);
const result = output[middleValue];

// Result 2412013412
logging.result(result);
