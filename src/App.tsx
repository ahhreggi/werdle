import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Board from "components/Board";
import Keyboard from "components/Keyboard";
import Button from "components/Button";
import { LetterRow } from "components/Board";
import type { Hints, Settings, Word } from "./components/types";
import { compareHints } from "components/helpers";
import { words } from "data/words";

const App = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [settings, setSettings] = useState<Settings>({
		letters: 5,
		tries: 6,
		wordsOnly: true,
	});
	const [answer, setAnswer] = useState<string[]>([]);
	const [answers, setAnswers] = useState<Word[]>([]);
	const [hints, setHints] = useState<Hints<string>>({});
	const [field, setField] = useState<string>("");
	const [fieldWord, setFieldWord] = useState<Word>([]);
	const [currentRow, setCurrentRow] = useState<JSX.Element>(
		<LetterRow key={"currentRow"} letters={[]} isCurrent={true} />
	);
	const [active, setActive] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const [bank, setBank] = useState<string[]>(
		words[settings.letters.toString()]
	);

	useEffect(() => {
		setBank(words[settings.letters.toString()]);
	}, [settings.letters]);

	const generateAnswer = () => {
		const answer = bank[Math.floor(Math.random() * bank.length)];
		return Array.from(answer);
	};
	useEffect(() => {
		setAnswer(generateAnswer());
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<LetterRow
				key={"currentRow"}
				letters={updatedCurrentRowLetters}
				isCurrent={active ? true : false}
			/>
		);
	}, [fieldWord, active, showAnswer]);

	const getStatus = (
		answers: Word[],
		settings: Settings,
		answer: string[],
		field: string
	) => {
		let result = true;
		const secret = answer.join("");
		if (answers.length === settings.tries || secret === field) {
			result = false;
		}
		if (answers.length === settings.tries) {
			const finalAnswer = answers[settings.tries - 1]
				.map((letter) => letter.value)
				.join("");
			if (finalAnswer !== secret) {
				setShowAnswer(true);
				result = false;
			}
			result = false;
		}
		return result;
	};
	useEffect(() => {
		setField("");
		setActive(getStatus(answers, settings, answer, field));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answer, answers, settings]);

	const resetGame = () => {
		setAnswer(generateAnswer());
		setAnswers([]);
		setHints({});
		setError("new game started!");
		setShowAnswer(false);
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
		setField("");
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

	const validateWord = (word: string, bank: string[]) => {
		return bank.includes(word);
	};

	const onPressKey = (key: string, currentField: string) => {
		if (key === "Backspace") {
			setField(currentField.slice(0, currentField.length - 1));
		} else if (key === "Enter") {
			if (!active) {
				resetGame();
			} else if (currentField.length !== settings.letters) {
				setError("not enough letters");
			} else if (settings.wordsOnly && !validateWord(currentField, bank)) {
				setError("word not found");
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
			if (key === "Tab" || key === "Enter") {
				event.preventDefault();
			}
			if (key === "Tab") {
				resetGame();
			} else if (
				key.includes("Key") ||
				key === "Backspace" ||
				key === "Enter"
			) {
				onPressKey(key, field);
			} else if (key === "Escape") {
				if (!active) {
					resetGame();
				} else {
					setField("");
				}
			}
		};
		document.addEventListener("keydown", keyHandler, false);
		return () => {
			document.removeEventListener("keydown", keyHandler, false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field, settings.letters, answers, hints, active]);

	useEffect(() => {
		setError("");
	}, [field]);

	// useEffect(() => {
	// 	if (!error) return;
	// 	const timeout = setTimeout(() => {
	// 		setError("");
	// 	}, 2000);
	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// }, [error]);

	return (
		<div className="App">
			<h1>WERDLE</h1>
			{!!answer?.length && (
				<>
					<div className="container">
						<div className="menu-container">
							<Button label="new&nbsp;game" onClick={() => resetGame()} />
							<Button
								label="clear&nbsp;row"
								onClick={() => setField("")}
								active={active && !!field.length}
							/>
						</div>
						<Board
							settings={settings}
							words={answers}
							currentRow={answers.length < settings.tries ? currentRow : null}
							showAnswer={showAnswer}
						/>
						<span className="error-container">
							{error ||
								(!active && showAnswer
									? `the answer was: ${answer.join("")}`
									: "") ||
								(!active && !showAnswer ? "you won!" : "")}
						</span>
					</div>

					<Keyboard
						settings={settings}
						field={field}
						hints={hints}
						active={active}
						onClick={(key: string, field: string) => {
							onPressKey(key, field);
						}}
						error={error}
					/>
				</>
			)}
		</div>
	);
};

export default App;
