import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Board from "components/Board";
import Keyboard from "components/Keyboard";
import type { Hints } from "./components/types";

const wordsList = [
	[
		{
			value: "I",
			hint: "incorrect",
		},
		{
			value: "R",
			hint: "partial",
		},
		{
			value: "A",
			hint: "correct",
		},
		{
			value: "T",
			hint: "incorrect",
		},
		{
			value: "E",
			hint: "incorrect",
		},
	],
	[
		{
			value: "C",
			hint: "incorrect",
		},
		{
			value: "L",
			hint: "incorrect",
		},
		{
			value: "O",
			hint: "incorrect",
		},
		{
			value: "U",
			hint: "incorrect",
		},
		{
			value: "D",
			hint: "correct",
		},
	],
];

const App = () => {
	const answer = ["S", "H", "A", "R", "D"];
	const settings = {
		letters: 5,
		tries: 6,
	};
	const [hints, setHints] = useState<Hints<string>>({
		A: "incorrect",
		S: "correct",
		Z: "partial",
	});
	const addHint = (hint: string, letter: string) => {
		if (letter in hints && hints[letter] !== hint) {
			const currentHint = hints[letter];
			if (
				hint === "correct" ||
				(hint === "partial" && currentHint === "incorrect") ||
				hint === "incorrect"
			) {
				setHints({ ...hints, [letter]: hint });
			}
		} else if (!(letter in hints)) {
			setHints({ ...hints, [letter]: hint });
		}
	};
	const onSubmit = (word: string) => {
		const submittedRow = [];
		const ans = [...answer];
		for (let i = 0; i < settings.letters; i++) {
			const letter = word[i];
			let hint;
			if (ans[i] === letter) {
				hint = "correct";
				ans[i] = "-";
			} else if (ans.includes(letter)) {
				hint = "partial";
				ans[ans.indexOf(letter)] = "-";
			} else {
				hint = "incorrect";
			}
			addHint(hint, letter);
			submittedRow.push({ value: letter, hint });
		}
	};
	return (
		<div className="App">
			<h1>WERDLE</h1>
			<Board
				numRows={settings.tries}
				numLetters={settings.letters}
				words={wordsList}
			/>
			<Keyboard hints={hints} />
		</div>
	);
};

export default App;
