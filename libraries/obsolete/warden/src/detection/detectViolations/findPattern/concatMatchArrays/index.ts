import type { Match } from "../types/index.ts"

//++ Concatenates arrays of matches during reduction
export default function concatMatchArrays(
	acc: Array<Match>,
	arr: Array<Match>,
): Array<Match> {
	return acc.concat(arr)
}
