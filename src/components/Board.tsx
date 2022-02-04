import React, { useState, useEffect, ReactElement } from "react";
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
	const [rows, setRows] = useState<JSX.Element[]>([]);
	useEffect(() => {
		const wordsList = [...words];
		const isFull = wordsList.length === numRows;
		if (!isFull) {
			const emptyRow = Array(numLetters).fill({ value: null, hint: null });
			while (wordsList.length < numRows) {
				wordsList.push(emptyRow);
			}
		}
		setRows(wordsList.map((word, i) => <LetterRow key={i} letters={word} />));
	}, [words]);
	return <div className="Board">{rows}</div>;
};

export default Board;
