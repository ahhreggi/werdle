import { useState, useEffect } from "react";
import "./Board.scss";
import type { Settings, Letter, Word } from "./types";
import { getHintColor } from "./helpers";

type SquareParams = {
	letter: Letter;
	showAnswer?: boolean;
};
const Square = ({ letter, showAnswer }: SquareParams) => {
	const color = getHintColor(letter.hint);
	return (
		<div className={`Square bg-${showAnswer ? "red" : color}`}>
			{!!letter.value && <div className="letter">{letter.value}</div>}
		</div>
	);
};

type LetterRowParams = {
	letters: Letter[];
	isCurrent?: boolean;
	showAnswer?: boolean;
};
export const LetterRow = ({
	letters,
	isCurrent,
	showAnswer,
}: LetterRowParams) => {
	return (
		<div className={`LetterRow ${isCurrent ? "current" : ""}`}>
			{letters.map((letter, index) => (
				<Square key={index} letter={letter} showAnswer={showAnswer} />
			))}
		</div>
	);
};

type BoardParams = {
	settings: Settings;
	words: Word[];
	currentRow: JSX.Element | null;
	showAnswer: boolean;
};
const Board = ({ settings, words, currentRow, showAnswer }: BoardParams) => {
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
			<LetterRow
				key={i}
				letters={word}
				showAnswer={showAnswer && i === settings.tries - 1}
			/>
		));
		if (currentRow) {
			letterRows.splice(words.length, 1, currentRow);
		}
		setRows(letterRows);
	}, [words, currentRow, settings, showAnswer]);
	return <div className="Board">{rows}</div>;
};

export default Board;
