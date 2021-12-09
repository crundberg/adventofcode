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

const basin = (lowPoint) => {
	const coords = [];

	const shouldBeAddedToBasin = (value, row, col) => {
		const alreadyExist = coords.find(
			({ row: r, col: c }) => r === row && c === col
		);

		return value !== 9 && !alreadyExist;
	};

	const down = ({ row, col }) => {
		let value = 0;
		let coordRow = row;

		while (value !== 9 && coordRow < rowLength - 1) {
			coordRow += 1;
			value = parseInt(matrix[coordRow][col], 10);

			if (shouldBeAddedToBasin(value, coordRow, col)) {
				coords.push({ row: coordRow, col, value });
			}
		}
	};

	const up = ({ row, col }) => {
		let value = 0;
		let coordRow = row;

		while (value !== 9 && coordRow > 0) {
			coordRow -= 1;
			value = parseInt(matrix[coordRow][col], 10);

			if (shouldBeAddedToBasin(value, coordRow, col)) {
				coords.push({ row: coordRow, col, value });
			}
		}
	};

	const right = ({ row, col }) => {
		let value = 0;
		let coordCol = col;

		while (value !== 9 && coordCol < colLength - 1) {
			coordCol += 1;
			value = parseInt(matrix[row][coordCol], 10);

			if (shouldBeAddedToBasin(value, row, coordCol)) {
				coords.push({ row, col: coordCol, value });
			}
		}
	};

	const left = ({ row, col }) => {
		let value = 0;
		let coordCol = col;

		while (value !== 9 && coordCol > 0) {
			coordCol -= 1;
			value = parseInt(matrix[row][coordCol], 10);

			if (shouldBeAddedToBasin(value, row, coordCol)) {
				coords.push({ row, col: coordCol, value });
			}
		}
	};

	right(lowPoint);
	left(lowPoint);
	down(lowPoint);
	up(lowPoint);

	let noOfCoords = 0;

	while (coords.length !== noOfCoords) {
		noOfCoords = coords.length;

		coords.forEach((coord) => {
			right(coord);
			left(coord);
			down(coord);
			up(coord);
		});
	}

	return coords.length;
};

const result = lowPoints
	.map((lowPoint) => basin(lowPoint))
	.sort((a, b) => b - a)
	.filter((_, index) => index < 3)
	.reduce((acc, val) => acc * val, 1);

// Result 856716
logging.result(result);
