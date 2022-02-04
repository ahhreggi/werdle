import "./Board.scss";
import type { Letter, Word } from "./types";
import { getHintColor } from "./helpers";

type SquareParams = {
	letter: Letter;
};
const Square = ({ letter }: SquareParams) => {
	const color = getHintColor(letter.hint);
	return (
		<div className={`Square bg-${color}`}>
			{!!letter.value && <div className="letter">{letter.value}</div>}
		</div>
	);
};

type LetterRowParams = {
	letters: Letter[];
};
const LetterRow = ({ letters }: LetterRowParams) => {
	return (
		<div className="LetterRow">
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
	const isFull = words.length === numRows;
	if (!isFull) {
		const emptyRow = Array(numLetters).fill({ value: null, hint: null });
		while (words.length < numRows) {
			words.push(emptyRow);
		}
	}
	const rows = words.map((word, i) => <LetterRow key={i} letters={word} />);
	return <div className="Board">{rows}</div>;
};

export default Board;
