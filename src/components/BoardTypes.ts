export interface Letter {
	value: string | null;
	hint: string | null;
}
export type Word = Letter[];
export type SquareParams = {
	letter: Letter;
};
