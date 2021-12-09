const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day9/input.txt').asArray();

const matrix = input.map((row) => {
	return [...row];
});

const colLength = matrix[0].length;
const rowLength = matrix.length;

const lowPoints = [];

const adjacentLocations = (row, col) => {
	const startRow = row - 1;
	const endRow = row + 1;
	const startCol = col - 1;
	const endCol = col + 1;

	const adjacentValues = [];
	for (let y = startRow; y <= endRow; y += 1) {
		for (let x = startCol; x <= endCol; x += 1) {
			if (
				x >= 0 &&
				x < colLength &&
				y >= 0 &&
				y < rowLength &&
				(x === col || y === row) &&
				!(x === col && y === row)
			) {
				adjacentValues.push(matrix[y][x]);
			}
		}
	}

	return adjacentValues;
};

for (let row = 0; row < rowLength; row += 1) {
	for (let col = 0; col < colLength; col += 1) {
		const coordinatesToCompare = adjacentLocations(row, col);
		const min = Math.min(...coordinatesToCompare);

		if (matrix[row][col] < min) {
			lowPoints.push({
				row,
				col,
				value: parseInt(matrix[row][col], 10),
			});
		}
	}
}

const result = lowPoints.reduce((acc, lowPoint) => {
	return acc + lowPoint.value + 1;
}, 0);

// Result 580
logging.result(result);
