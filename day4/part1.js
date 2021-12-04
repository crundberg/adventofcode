const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day4/input.txt').asString();

let lastDrawnNumber;
let firstBingoBoard;

// Parse number
const [strNumbers, ...strBoards] = input.split('\r\n\r\n');
const numbers = strNumbers.split(',').map(Number);

// Parse boards
const boards = strBoards.map((board) => {
	const rows = board.split('\n');
	const cols = rows.map((row) => {
		return row.trim().split(/\s+/).map(Number);
	});
	return cols;
});

// Mark boards
let bingoBoards = boards;

const drawNumber = (number) => {
	bingoBoards = bingoBoards.map((rows) => {
		return rows.map((cols) => {
			return cols.map((value) => {
				return number === value ? value + 100 : value;
			});
		});
	});
};

// Check if the board has bingo horizontal
const hasBingoHorizontal = (rows) => {
	return rows.filter((cols) => {
		return cols.every((val) => val >= 100);
	});
};

// Rotate matrix
const flipMatrix = (matrix) => {
	return matrix[0].map((_, index) => matrix.map((row) => row[index]));
};
const rotateMatrix = (matrix) => flipMatrix(matrix.reverse());

// Check if the board has bingo vertical
const hasBingoVertical = (rows) => {
	const cols = rotateMatrix(rows);

	return hasBingoHorizontal(cols);
};

// Check if the board has bingo
const hasBoardBingo = (board) => {
	const horizontal = hasBingoHorizontal(board).length;
	const vertical = hasBingoVertical(board).length;

	return horizontal + vertical;
};

// Find first board with bingo
const firstBoardWithBingo = () => {
	return bingoBoards.find((board) => {
		return hasBoardBingo(board) > 0;
	});
};

// Draw numbers
numbers.forEach((number) => {
	if (!lastDrawnNumber) {
		drawNumber(number);

		firstBingoBoard = firstBoardWithBingo();

		if (firstBingoBoard) {
			lastDrawnNumber = number;
		}
	}
});

// Summaries unmarked numbers
const sumUnmarked = firstBingoBoard.reduce((acc, row) => {
	const rowSum = row
		.filter((value) => value < 100)
		.reduce((rowAcc, value) => rowAcc + value, 0);

	return acc + rowSum;
}, 0);

// Result 63424
const result = lastDrawnNumber * sumUnmarked;
logging.values({ lastNumber: lastDrawnNumber, firstBingoBoard, sumUnmarked });
logging.result(result);
