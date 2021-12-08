const Input = require('../utils/input');
const logging = require('../utils/logging')();

const inputRows = Input('./day8/input.txt').asArray();
const input = inputRows.map((value) => {
	const [inputStr, outputStr] = value.split(' | ');
	const inputArr = inputStr.split(' ');
	const outputArr = outputStr.split(' ');

	return [inputArr, outputArr];
});

const mapNumber = (data) => {
	const numberByLength = {
		2: 1,
		4: 4,
		3: 7,
		7: 8,
	};

	return numberByLength[data.length];
};

const containsNumber = (cmp1, cmp2) => {
	return [...cmp2].every((char) => [...cmp1].includes(char));
};

const filterNumber = (cmp1, cmp2) => {
	if (cmp1.length !== 1) return false;
	const [val1] = cmp1;

	return [...cmp2].find((char) => [...val1].includes(char));
};

const sortAlphabets = (str) => {
	return str.split('').sort().join('');
};

const result = input.reduce((acc, [inputData, outputData]) => {
	const knownNumbers = inputData.reduce((numberAcc, data) => {
		const newAcc = numberAcc;
		const value = mapNumber(data);

		if (!value) return newAcc;

		newAcc[value] = data;
		return newAcc;
	}, new Array(10).fill(null));

	let numbers = new Array(10).fill(null);
	numbers[1] = [knownNumbers[1]];
	numbers[4] = [knownNumbers[4]];
	numbers[7] = [knownNumbers[7]];
	numbers[8] = [knownNumbers[8]];

	numbers[0] = inputData.filter((data) => {
		if (data.length !== 6) return false;
		if (containsNumber(data, knownNumbers[4])) return false;

		return true;
	});

	numbers[6] = inputData.filter((data) => {
		if (data.length !== 6) return false;
		if (containsNumber(data, knownNumbers[1])) return false;

		return true;
	});

	numbers[9] = inputData.filter((data) => {
		if (data.length !== 6) return false;
		if (!containsNumber(data, knownNumbers[1])) return false;
		if (!containsNumber(data, knownNumbers[4])) return false;

		return true;
	});

	numbers[2] = inputData.filter((data) => {
		if (data.length !== 5) return false;
		if (containsNumber(data, knownNumbers[1])) return false;
		if (containsNumber(data, knownNumbers[4])) return false;

		const charSeg5 = filterNumber(numbers[6], knownNumbers[1]);
		if (data.includes(charSeg5)) return false;

		return true;
	});

	numbers[3] = inputData.filter((data) => {
		if (data.length !== 5) return false;
		if (!containsNumber(data, knownNumbers[1])) return false;

		return true;
	});

	numbers[5] = inputData.filter((data) => {
		if (data.length !== 5) return false;
		if (containsNumber(data, numbers[2])) return false;

		return true;
	});

	// Add solved numbers to an array
	const solvedNumbers = numbers.reduce((newValues, number) => {
		if (number.length !== 1) return newValues;

		newValues.push(number[0]);
		return newValues;
	}, []);

	// Remove solved number
	numbers = numbers.map((number) => {
		if (number.length === 1) return number;

		return number.filter((str) => !solvedNumbers.includes(str));
	});

	// Map input and output
	const res = outputData
		.map((value) =>
			numbers.findIndex(([str]) => sortAlphabets(str) === sortAlphabets(value))
		)
		.join('');

	return acc + parseInt(res, 10);
}, 0);

// Result 915941
logging.result(result);
