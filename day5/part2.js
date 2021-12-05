const Input = require('../utils/input');
const logging = require('../utils/logging')();

const inputArr = Input('./day5/input.txt').asArray();

const input = inputArr.map((row) => {
	const [part1, part2] = row.split(' -> ');
	const xy1 = part1.split(',').map(Number);
	const xy2 = part2.split(',').map(Number);
	return [...xy1, ...xy2];
});

const matrix = Array(999)
	.fill(null)
	.map(() => Array(999).fill(0));

const logMatrix = () =>
	matrix.forEach((row) => {
		console.log(row.join('').replaceAll(0, '.'));
	});

const count = () =>
	matrix.reduce((sum, row) => {
		const rowSum = row.filter((col) => col > 1).reduce((acc) => acc + 1, 0);
		return sum + rowSum;
	}, 0);

const fillX = (x1, x2, y) => {
	const val1 = x1 < x2 ? x1 : x2;
	const val2 = x1 < x2 ? x2 : x1;

	for (let x = val1; x <= val2; x += 1) {
		matrix[y][x] += 1;
	}
};

const fillY = (y1, y2, x) => {
	const val1 = y1 < y2 ? y1 : y2;
	const val2 = y1 < y2 ? y2 : y1;

	for (let y = val1; y <= val2; y += 1) {
		matrix[y][x] += 1;
	}
};

const fill = (x1, x2, y1, y2) => {
	const x1Larger = x1 > x2;
	const y1Larger = y1 > y2;
	const valY1 = y1 < y2 ? y1 : y2;
	const valY2 = y1 < y2 ? y2 : y1;

	let x = x1;

	if (!y1Larger) {
		for (let y = valY1; y <= valY2; y += 1) {
			matrix[y][x] += 1;

			if (x1Larger) {
				x -= 1;
			} else {
				x += 1;
			}
		}
	} else {
		for (let y = valY2; y >= valY1; y -= 1) {
			matrix[y][x] += 1;

			if (x1Larger) {
				x -= 1;
			} else {
				x += 1;
			}
		}
	}
};

input.forEach(([x1, y1, x2, y2]) => {
	if (x1 === x2) {
		fillY(y1, y2, x1);
	} else if (y1 === y2) {
		fillX(x1, x2, y1);
	} else {
		fill(x1, x2, y1, y2);
	}
});

const result = count();

// Result 20012
logging.result(result);
