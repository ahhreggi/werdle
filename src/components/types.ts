// App
export type Settings = {
	letters: number;
	tries: number;
};
export type Hints<T> = {
	[key: string]: T;
};

// Board
export interface Letter {
	value: string | null;
	hint: string | null;
}
export type Word = Letter[];
export type SquareParams = {
	letter: Letter;
};

// Keyboard
export interface Key {
	value: string;
	color: string;
	wide: boolean;
}
