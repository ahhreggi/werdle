import { useState, useEffect } from "react";
import "./Board.scss";
import type { Settings, Letter, Word } from "./types";
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
	settings: Settings;
	words: Word[];
	currentRow: JSX.Element | null;
};
const Board = ({ settings, words, currentRow }: BoardParams) => {
	const [rows, setRows] = useState<JSX.Element[]>([]);
	useEffect(() => {
		const wordsList = [...words];
		const isFull = words.length === settings.tries;
		if (!isFull) {
			const emptyRow = Array(settings.letters).fill({
				value: null,
				hint: null,
			});
			while (wordsList.length < settings.tries) {
				wordsList.push(emptyRow);
			}
		}
		const letterRows = wordsList.map((word, i) => (
			<LetterRow key={i} letters={word} />
		));
		if (currentRow) {
			letterRows.splice(words.length, 1, currentRow);
		}
		setRows(letterRows);
	}, [words, currentRow, settings]);
	return <div className="Board">{rows}</div>;
};

export default Board;
