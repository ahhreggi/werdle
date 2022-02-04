import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Board from "components/Board";
import Keyboard from "components/Keyboard";
import { LetterRow } from "components/Board";
import type { Hints, Settings, Word } from "./components/types";
import { compareHints } from "components/helpers";
import { words } from "data/words";

const App = () => {
	const [settings, setSettings] = useState<Settings>({
		letters: 5,
		tries: 6,
		wordsOnly: false,
	});
	const [answer, setAnswer] = useState<string[]>([]);
	const [answers, setAnswers] = useState<Word[]>([]);
	const [hints, setHints] = useState<Hints<string>>({});
	const [field, setField] = useState<string>("");
	const [fieldWord, setFieldWord] = useState<Word>([]);
	const [currentRow, setCurrentRow] = useState<JSX.Element>(
		<LetterRow key={"currentRow"} letters={[]} />
	);
	const [active, setActive] = useState<boolean>(true);

	const generateAnswer = (length = settings.letters.toString()) => {
		const wordsList = words[length];
		const answer = wordsList[Math.floor(Math.random() * wordsList.length)];
		return Array.from(answer);
	};
	useEffect(() => {
		setAnswer(generateAnswer());
	}, [settings.tries]);

	useEffect(() => {
		const word = Array.from(field).map((letter) => {
			return { value: letter.toUpperCase(), hint: null };
		});
		while (word.length < settings.letters) {
			word.push({ value: "", hint: null });
		}
		setFieldWord(word);
	}, [field, settings.letters]);

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

	const getStatus = (
		answers: Word[],
		settings: Settings,
		answer: string[],
		field: string
	) => {
		if (answers.length === settings.tries) return false;
		if (answer.join("") === field) return false;
		return true;
	};
	useEffect(() => {
		setActive(getStatus(answers, settings, answer, field));
		setField("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answer, answers, settings]);

	const resetGame = () => {
		setAnswer(generateAnswer());
		setAnswers([]);
		setHints({});
	};

	const addRow = (word: Word) => {
		setAnswers([...answers, word]);
	};

	const addHints = (word: Word) => {
		const newHints: Hints<string> = {};
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
	};

	const onPressKey = (key: string, currentField: string) => {
		if (key === "Backspace") {
			setField(currentField.slice(0, currentField.length - 1));
		} else if (key === "Enter") {
			if (!active) {
				resetGame();
			} else if (currentField.length !== settings.letters) {
				showError("invalid word");
			} else {
				onSubmit(currentField);
			}
		} else {
			if (!active || currentField.length >= settings.letters) return;
			const letter = key.replace("Key", "");
			setField(currentField + letter);
		}
	};
	useEffect(() => {
		const keyHandler = (event: KeyboardEvent) => {
			const key = event.code;
			if (key === "Tab") {
				event.preventDefault();
			} else if (
				key.includes("Key") ||
				key === "Backspace" ||
				key === "Enter"
			) {
				onPressKey(key, field);
			} else if (key === "Escape") {
				resetGame();
			}
		};
		document.addEventListener("keydown", keyHandler, false);
		return () => {
			document.removeEventListener("keydown", keyHandler, false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field, settings.letters, answers, hints, active]);

	useEffect(() => {
		resetGame();
	}, [settings]);

	return (
		<div className="App">
			<h1>WERDLE({JSON.stringify(answer)})</h1>
			<button onClick={() => resetGame()}>new game</button>
			<button onClick={() => setSettings({ ...settings, letters: 4 })}>
				4
			</button>
			<button onClick={() => setSettings({ ...settings, letters: 5 })}>
				5
			</button>
			<button onClick={() => setSettings({ ...settings, letters: 6 })}>
				6
			</button>
			<button onClick={() => setSettings({ ...settings, tries: 5 })}>
				5 tries
			</button>
			<button onClick={() => setSettings({ ...settings, tries: 6 })}>
				6 tries
			</button>
			<button
				onClick={() => setSettings({ ...settings, letters: 5, tries: 6 })}
			>
				reset settings
			</button>
			{!!answer?.length && (
				<>
					<Board
						settings={settings}
						words={answers}
						currentRow={answers.length < settings.tries ? currentRow : null}
					/>
					<Keyboard
						settings={settings}
						field={field}
						hints={hints}
						active={active}
						onClick={(key: string, field: string) => {
							onPressKey(key, field);
						}}
					/>
				</>
			)}
		</div>
	);
};

export default App;
