// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Board from "components/Board";
import Keyboard from "components/Keyboard";

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
	return (
		<div className="App">
			<h1>WERDLE</h1>
			<Board numRows={6} numLetters={5} words={wordsList} />
			<Keyboard />
		</div>
	);
};

export default App;
