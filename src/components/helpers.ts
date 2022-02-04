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
		case null:
			color = "black";
	}
	return color;
};

export { getHintColor };
