import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Like mapAccum but processes the array from right to left
 |
 | Performs a stateful map operation that threads an accumulator through the
 | array from right to left. Each iteration produces both a new accumulator
 | value and a mapped element. Returns a tuple containing the final accumulator
 | and an array of all mapped values (in original left-to-right order). Useful
 | for operations that need to process elements with knowledge of what comes
 | after, suffix operations, or right-associative transformations.
 */
const mapAccumRight = <T, U, V>(
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

	const processArray = (
		arr: ReadonlyArray<T>,
		acc: U,
		result: Array<V>,
	): [U, Array<V>] => {
		if (arr.length === 0) {
			return [acc, result]
		}
		const [newAcc, mappedValue] = fn(acc, arr[arr.length - 1])
		return processArray(
			arr.slice(0, -1),
			newAcc,
			[mappedValue, ...result],
		)
	}

	return processArray(array, initial, [])
}

export default mapAccumRight

//?? [EXAMPLE] `mapAccumRight((acc: number, x: number) => [acc + x, acc + x])(0)([1, 2, 3, 4, 5]) // [15, [15, 14, 12, 9, 5]]`
//?? [EXAMPLE] `mapAccumRight((path: string, segment: string) => { const newPath = path ? \`${segment}/${path}\` : segment; return [newPath, newPath] })("")(["usr", "local", "bin"]) // ["usr/local/bin", ["usr/local/bin", "local/bin", "bin"]]`
//?? [EXAMPLE] `mapAccumRight((count: number, _: unknown) => [count + 1, count])(0)(["a", "b", "c", "d"]) // [4, [3, 2, 1, 0]]`
//?? [EXAMPLE] `mapAccumRight((acc: number, x: number) => [acc + x, x * 2])(10)([]) // [10, []]`
//?? [EXAMPLE] `mapAccumRight((acc: number, x: number) => [acc + x, x])(0)(null) // [0, []]`
//?? [EXAMPLE] `mapAccumRight((acc: number, x: number) => [acc + x, x])(0)(undefined) // [0, []]`
