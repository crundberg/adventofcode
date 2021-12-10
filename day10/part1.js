const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day10/input.txt').asArray();

const points = {
	'(': 3,
	')': 3,
	'[': 57,
	']': 57,
	'{': 1197,
	'}': 1197,
	'<': 25137,
	'>': 25137,
};

const result = input
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
		return illegal;
	})
	.filter((row) => row !== undefined)
	.reduce((point, row) => {
		const [, lastChar] = [...row];
		const countChar = [...row].filter((char) => lastChar === char).length;
		const noPoints = points[lastChar];

		return point + noPoints * countChar;
	}, 0);

// Result 339537
logging.result(result);
