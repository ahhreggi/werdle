import "./Board.scss";

interface Letter {
	value: string | null;
	hint: string | null;
}
type Word = Letter[];

type SquareParams = {
	letter: Letter;
};
const Square = ({ letter }: SquareParams) => {
	let color;
	switch (letter.hint) {
		case "correct":
			color = "green";
			break;
		case "partial":
			color = "yellow";
			break;
		default:
		case "incorrect":
			color = "dark";
			break;
	}
	return (
		<div className={`Square bg-${color}`}>
			<div className="letter">{letter.value}</div>
		</div>
	);
};

type WordParams = {
	letters: Letter[];
};
const Word = ({ letters }: WordParams) => {
	return (
		<div className="Word">
			{letters.map((letter, index) => (
				<Square key={index} letter={letter} />
			))}
		</div>
	);
};

type BoardParams = {
	numRows: number;
	numLetters: number;
	words: Word[];
};
const Board = ({ numRows, numLetters, words }: BoardParams) => {
	const isFull = words.length < numRows;
	if (!isFull) {
		const emptyRow = Array(numLetters).fill({ value: null, hint: null });
		while (words.length < numRows) {
			words.push(emptyRow);
		}
	}
	const rows = words.map((word, i) => <Word key={i} letters={word} />);
	return <div className="Board">{rows}</div>;
};

export default Board;
