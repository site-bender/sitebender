import isNullish from "../../validation/isNullish/index.ts"

//++ Maps with an accumulator from left to right
const mapAccum = <T, U, V>(
	fn: (accumulator: U, element: T) => [U, V],
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [U, Array<V>] => {
	if (isNullish(array)) {
		return [initial, []]
	}

	return array.reduce<[U, Array<V>]>(
		([acc, mappedArray], element) => {
			const [newAcc, mappedValue] = fn(acc, element)
			return [newAcc, [...mappedArray, mappedValue]]
		},
		[initial, []],
	)
}

export default mapAccum

//?? [EXAMPLE] `mapAccum((acc: number, x: number) => [acc + x, x - acc])(0)([1, 2, 3, 4]) // [10, [1, 1, 1, 1]]`
//?? [EXAMPLE] `mapAccum((lineNo: number, text: string) => [lineNo + 1, \`${lineNo}: ${text}\`])(1)(["First", "Second", "Third"]) // [4, ["1: First", "2: Second", "3: Third"]]`
//?? [EXAMPLE] `mapAccum((acc: [number, number], _: unknown) => [[acc[1], acc[0] + acc[1]], acc[0]])([0, 1])([1, 2, 3, 4, 5]) // [[5, 8], [0, 1, 1, 2, 3]]`
//?? [EXAMPLE] `mapAccum((acc: number, x: number) => [acc + x, x * 2])(10)([]) // [10, []]`
//?? [EXAMPLE] `mapAccum((acc: number, x: number) => [acc + x, x])(0)(null) // [0, []]`
//?? [EXAMPLE] `mapAccum((acc: number, x: number) => [acc + x, x])(0)(undefined) // [0, []]`
