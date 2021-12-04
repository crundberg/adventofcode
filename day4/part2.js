const Input = require('../utils/input');
const logging = require('../utils/logging')();

const input = Input('./day4/input.txt').asString();

let lastDrawnNumber;
let lastBingoBoard;

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
let markedBoards = boards;

const drawNumber = (number) => {
	markedBoards = markedBoards.map((rows) => {
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

// Check if a new board has bingo
const boardsWithBingo = new Array(boards.length).fill(0);

const newBoardWithBingo = () => {
	return markedBoards.filter((board, index) => {
		const noOfBingos = hasBoardBingo(board);

		if (boardsWithBingo[index] === 0) {
			boardsWithBingo[index] = noOfBingos;
			return true;
		}

		return false;
	});
};

// Draw numbers
numbers.forEach((number) => {
	drawNumber(number);

	const newBingo = newBoardWithBingo();

	if (newBingo.length) {
		[lastBingoBoard] = newBingo;
		lastDrawnNumber = number;
	}
});

// Summaries unmarked numbers
const sumUnmarked = lastBingoBoard.reduce((acc, row) => {
	const rowSum = row
		.filter((value) => value < 100)
		.reduce((rowAcc, value) => rowAcc + value, 0);

	return acc + rowSum;
}, 0);

// Result 23541
const result = lastDrawnNumber * sumUnmarked;
logging.values({
	lastNumber: lastDrawnNumber,
	lastBingo: lastBingoBoard,
	sumUnmarked,
});
logging.result(result);
