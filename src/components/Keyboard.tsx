import { useState, useEffect } from "react";
import "./Keyboard.scss";
import { Hints, Key } from "./types";
import { getHintColor } from "./helpers";

type KeyParams = {
	config: Key;
	active: boolean;
	onClick: (key: string) => void;
};
const KeyButton = ({ config, active, onClick }: KeyParams) => {
	return (
		<button
			className={`KeyButton bg-${config.color} ${config.wide ? "wide" : ""} ${
				active ? "active" : ""
			}`}
			onClick={() => {
				let key = "";
				switch (config.value) {
					case "ENTER":
						key = "Enter";
						break;
					case "BACK":
						key = "Backspace";
						break;
					default:
						key = "Key" + config.value;
				}
				onClick(key);
			}}
		>
			{config.value}
		</button>
	);
};
type RowParams = {
	keys: Key[];
	active: boolean;
	onClick: (key: string) => void;
};
const Row = ({ keys, active, onClick }: RowParams) => {
	const [row, setRow] = useState<JSX.Element[]>([]);
	useEffect(() => {
		setRow(
			keys.map((key, index) => (
				<KeyButton
					key={index}
					config={key}
					active={key.value === "ENTER" ? true : active}
					onClick={onClick}
				/>
			))
		);
	}, [keys, active]);
	return <div className="Row">{row}</div>;
};

type KeyboardParams = {
	hints: Hints<string>;
	active: boolean;
	onClick: (key: string) => void;
};
const Keyboard = ({ hints, active, onClick }: KeyboardParams) => {
	const [rows, setRows] = useState<JSX.Element[]>([]);
	useEffect(() => {
		const row1 = [
			{
				value: "Q",
				color: "light",
				wide: false,
			},
			{
				value: "W",
				color: "light",
				wide: false,
			},
			{
				value: "E",
				color: "light",
				wide: false,
			},
			{
				value: "R",
				color: "light",
				wide: false,
			},
			{
				value: "T",
				color: "light",
				wide: false,
			},
			{
				value: "Y",
				color: "light",
				wide: false,
			},
			{
				value: "U",
				color: "light",
				wide: false,
			},
			{
				value: "O",
				color: "light",
				wide: false,
			},
			{
				value: "I",
				color: "light",
				wide: false,
			},
			{
				value: "P",
				color: "light",
				wide: false,
			},
		];
		const row2 = [
			{
				value: "A",
				color: "light",
				wide: false,
			},
			{
				value: "S",
				color: "light",
				wide: false,
			},
			{
				value: "D",
				color: "light",
				wide: false,
			},
			{
				value: "F",
				color: "light",
				wide: false,
			},
			{
				value: "G",
				color: "light",
				wide: false,
			},
			{
				value: "H",
				color: "light",
				wide: false,
			},
			{
				value: "J",
				color: "light",
				wide: false,
			},
			{
				value: "K",
				color: "light",
				wide: false,
			},
			{
				value: "L",
				color: "light",
				wide: false,
			},
		];
		const row3 = [
			{
				value: "ENTER",
				color: "light",
				wide: true,
			},
			{
				value: "Z",
				color: "light",
				wide: false,
			},
			{
				value: "X",
				color: "light",
				wide: false,
			},
			{
				value: "C",
				color: "light",
				wide: false,
			},
			{
				value: "V",
				color: "light",
				wide: false,
			},
			{
				value: "B",
				color: "light",
				wide: false,
			},
			{
				value: "N",
				color: "light",
				wide: false,
			},
			{
				value: "M",
				color: "light",
				wide: false,
			},
			{
				value: "BACK",
				color: "light",
				wide: true,
			},
		];
		const getHintedRow = (row: Key[], hints: Hints<string>) => {
			const result = row.map((key) => {
				if (key.value in hints) {
					return { ...key, color: getHintColor(hints[key.value]) };
				} else {
					return key;
				}
			});
			return result;
		};
		setRows([
			<Row
				key={1}
				keys={getHintedRow(row1, hints)}
				active={active}
				onClick={(key: string) => onClick(key)}
			/>,
			<Row
				key={2}
				keys={getHintedRow(row2, hints)}
				active={active}
				onClick={(key: string) => onClick(key)}
			/>,
			<Row
				key={3}
				keys={getHintedRow(row3, hints)}
				active={active}
				onClick={(key: string) => onClick(key)}
			/>,
		]);
	}, [hints, active]);
	return <div className="Keyboard">{rows}</div>;
};

export default Keyboard;