import isNull from "../../validation/isNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Generates an array by repeatedly applying a function to a seed value
 |
 | The dual of reduce/fold - while reduce consumes an array to produce a value,
 | unfold generates an array from a seed value. The generator function returns
 | either null to stop, or a tuple of [value, nextSeed] to continue.
 */
export default function unfold<T, U>(
	fn: (seed: T) => readonly [U, T] | null,
) {
	return function unfoldFromSeed(
		seed: T | null | undefined,
	): Array<U> {
		if (isNullish(seed)) {
			return []
		}

		// Build array using recursion
		function unfoldRecursive(currentSeed: T): Array<U> {
			const result = fn(currentSeed)

			if (isNull(result)) {
				return []
			}

			const [value, nextSeed] = result
			return [value, ...unfoldRecursive(nextSeed)]
		}

		return unfoldRecursive(seed)
	}
}

//?? [EXAMPLE] `unfold((n: number) => n < 10 ? [n, n + 1] : null)(0) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
//?? [EXAMPLE] `unfold(([a, b]: [number, number]) => a <= 100 ? [a, [b, a + b]] : null)([0, 1]) // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]`
//?? [EXAMPLE] `unfold((n: number) => n <= 256 ? [n, n * 2] : null)(1) // [1, 2, 4, 8, 16, 32, 64, 128, 256]`
//?? [EXAMPLE] `unfold((s: string) => s.length > 0 ? [s[0], s.slice(1)] : null)("hello") // ["h", "e", "l", "l", "o"]`
//?? [EXAMPLE] `unfold((n: number) => n < 3 ? [n * n, n + 1] : null)(0) // [0, 1, 4]`
//?? [EXAMPLE] `unfold((n: number) => n < 5 ? [n, n + 1] : null)(null) // []`
