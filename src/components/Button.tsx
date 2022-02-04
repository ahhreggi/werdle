import "./Button.scss";

type ButtonParams = {
	onClick: () => void;
	label: string;
	active?: boolean;
};
const Button = ({ onClick, label, active = true }: ButtonParams) => {
	return (
		<button
			className={`Button ${active ? "active" : ""}`}
			onClick={() => onClick()}
			disabled={!active}
		>
			{label}
		</button>
	);
};

export default Button;
