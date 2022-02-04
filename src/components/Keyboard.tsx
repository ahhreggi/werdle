import "./Keyboard.scss";
import { Hints } from "../App";
import { Key } from "./KeyboardTypes";
import { getHintColor } from "./helpers";

type KeyParams = {
	config: Key;
};
const KeyButton = ({ config }: KeyParams) => {
	return (
		<div
			className={`KeyButton bg-${config.color} ${config.wide ? "wide" : ""}`}
		>
			{config.value}
		</div>
	);
};
type RowParams = {
	keys: Key[];
};
const Row = ({ keys }: RowParams) => {
	return (
		<div className="Row">
			{keys.map((key, index) => (
				<KeyButton key={index} config={key} />
			))}
		</div>
	);
};

type KeyboardParams = {
	hints: Hints<string>;
};
const Keyboard = ({ hints }: KeyboardParams) => {
	const { incorrect, partial, correct } = hints;
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
	const getHintedRow = (row: Key[]) => {
		const result = row.map((key, index) => {
			if (key.value in hints) {
				return { ...key, color: getHintColor(hints[key.value]) };
			} else {
				return key;
			}
		});
		return result;
	};
	const row1colored = getHintedRow(row1);
	const row2colored = getHintedRow(row2);
	const row3colored = getHintedRow(row3);
	return (
		<div className="Keyboard">
			<Row keys={row1colored} />
			<Row keys={row2colored} />
			<Row keys={row3colored} />
		</div>
	);
};

export default Keyboard;
