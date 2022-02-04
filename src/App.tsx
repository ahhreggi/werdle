import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Board from "components/Board";
import Keyboard from "components/Keyboard";
import { LetterRow } from "components/Board";
import type { Hints, Settings, Word } from "./components/types";
import { compareHints } from "components/helpers";

const App = () => {
	const answer = ["S", "H", "A", "R", "D"];
	const [settings, setSettings] = useState<Settings>({
		letters: 5,
		tries: 6,
	});
	const [answers, setAnswers] = useState<Word[]>([]);
	const [hints, setHints] = useState<Hints<string>>({});
	const [field, setField] = useState<string>("");
	const [fieldWord, setFieldWord] = useState<Word>([]);
	const [currentRow, setCurrentRow] = useState<JSX.Element>(
		<LetterRow key={"currentRow"} letters={[]} />
	);
	useEffect(() => {
		const word = Array.from(field).map((letter, index) => {
			return { value: letter.toUpperCase(), hint: null };
		});
		while (word.length < settings.letters) {
			word.push({ value: "", hint: null });
		}
		setFieldWord(word);
	}, [field]);

	useEffect(() => {
		const updatedCurrentRowLetters = fieldWord.map((letter) => {
			return { value: letter.value, hint: letter.hint };
		});
		setCurrentRow(
			<LetterRow key={"currentRow"} letters={updatedCurrentRowLetters} />
		);
	}, [fieldWord]);

	const showError = (msg: string) => {
		alert(msg);
	};

	const keyHandler = (event: any) => {
		const key = event.code;
		if (key === "Tab") {
			event.preventDefault();
		} else if (key.includes("Key")) {
			if (field.length === settings.letters) return;
			const letter = key.replace("Key", "");
			setField(field + letter);
		} else if (key === "Backspace") {
			setField(field.slice(0, field.length - 1));
		} else if (key === "Enter") {
			if (field.length !== settings.letters) {
				showError("invalid word");
			} else {
				onSubmit(field);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", keyHandler, false);
		return () => {
			document.removeEventListener("keydown", keyHandler, false);
		};
	}, [answer]);

	const addRow = (word: Word) => {
		setAnswers([...answers, word]);
	};

	const addHints = (word: Word) => {
		const newHints: Hints<string> = { H: "correct" };
		for (const letter of word) {
			const { value, hint } = letter;
			if (hint && value) {
				const currentHint = hints[value];
				if (!(value in newHints)) {
					if (!currentHint) {
						newHints[value] = hint;
					} else if (compareHints(currentHint, hint)) {
						newHints[value] = hint;
					}
				} else {
					const currentHint = newHints[value];
					if (compareHints(currentHint, hint)) {
						newHints[value] = hint;
					}
				}
			}
		}
		setHints({ ...hints, ...newHints });
	};

	const onSubmit = (word: string) => {
		const submittedRow: Word = [];
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
			submittedRow.push({ value: letter, hint });
		}
		addHints(submittedRow);
		addRow(submittedRow);
		setField("");
	};

	return (
		<div className="App">
			<h1>WERDLE</h1>
			<Board
				numRows={settings.tries}
				numLetters={settings.letters}
				words={answers}
				currentRow={currentRow}
			/>
			<Keyboard hints={hints} />
		</div>
	);
};

export default App;
