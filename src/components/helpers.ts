import { Letter } from "./types";

const getHintColor = (hint: string | null) => {
	let color;
	switch (hint) {
		case "correct":
			color = "green";
			break;
		case "partial":
			color = "yellow";
			break;
		case "incorrect":
			color = "dark";
			break;
		default:
			color = "black";
	}
	return color;
};

const compareHints = (prevHint: string, newHint: string) => {
	return (
		newHint === "correct" ||
		(newHint === "partial" && prevHint === "incorrect") ||
		(newHint === "incorrect" && !["correct", "partial"].includes(prevHint))
	);
};

export { getHintColor, compareHints };
