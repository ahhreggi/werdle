import { useState, useEffect } from "react";
import "./Keyboard.scss";
import { Settings, Hints, Key } from "./types";
import { getHintColor } from "./helpers";

type KeyParams = {
	config: Key;
	active: boolean;
	onClick: (key: string, field: string) => void;
	field: string;
};
const KeyButton = ({ config, active, onClick, field }: KeyParams) => {
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
				onClick(key, field);
			}}
		>
			{config.value}
		</button>
	);
};
type RowParams = {
	keys: Key[];
	active: boolean;
	onClick: (key: string, field: string) => void;
	field: string;
	error: string;
};
const Row = ({ keys, active, onClick, field, error }: RowParams) => {
	const [row, setRow] = useState<JSX.Element[]>([]);
	useEffect(() => {
		const checkError = (key: Key, active: boolean, error: string) => {
			if (!error && active) {
				return true;
			} else if (error) {
				if (error === "word not found" && key.value === "BACK") {
					return true;
				} else if (
					error === "not enough letters" ||
					error === "new game started!"
				) {
					return true;
				}
			}
			return false;
		};
		setRow(
			keys.map((key, index) => (
				<KeyButton
					key={index}
					config={key}
					active={checkError(key, active, error)}
					onClick={(key: string, field: string) => onClick(key, field)}
					field={field}
				/>
			))
		);
	}, [keys, active, field, onClick]);
	return <div className="Row">{row}</div>;
};

type KeyboardParams = {
	settings: Settings;
	field: string;
	hints: Hints<string>;
	active: boolean;
	onClick: (key: string, field: string) => void;
	error: string;
};
const Keyboard = ({
	settings,
	field,
	hints,
	active,
	onClick,
	error,
}: KeyboardParams) => {
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
				onClick={onClick}
				field={field}
				error={error}
			/>,
			<Row
				key={2}
				keys={getHintedRow(row2, hints)}
				active={active}
				onClick={onClick}
				field={field}
				error={error}
			/>,
			<Row
				key={3}
				keys={getHintedRow(row3, hints)}
				active={active}
				onClick={onClick}
				field={field}
				error={error}
			/>,
		]);
	}, [hints, active, settings, field, onClick, error]);
	return <div className="Keyboard">{rows}</div>;
};

export default Keyboard;
