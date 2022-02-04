import { useState, useEffect } from "react";
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
export const LetterRow = ({ letters }: LetterRowParams) => {
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
	currentRow: JSX.Element;
};
const Board = ({ numRows, numLetters, words, currentRow }: BoardParams) => {
	const [rows, setRows] = useState<JSX.Element[]>([]);
	useEffect(() => {
		const wordsList = [...words];
		const isFull = words.length === numRows;
		if (!isFull) {
			const emptyRow = Array(numLetters).fill({ value: null, hint: null });
			while (wordsList.length < numRows - 1) {
				wordsList.push(emptyRow);
			}
		}
		const letterRows = wordsList.map((word, i) => (
			<LetterRow key={i} letters={word} />
		));
		letterRows.splice(words.length, 0, currentRow);
		setRows(letterRows);
	}, [words, currentRow]);
	return <div className="Board">{rows}</div>;
};

export default Board;
