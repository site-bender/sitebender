import isNullish from "../../validation/isNullish/index.ts"
import not from "../../logic/not/index.ts"

/**
 * Reduces an array while a predicate returns true
 *
 * Like reduce but stops processing when the predicate returns false.
 * The predicate receives the current accumulator and element, allowing
 * you to stop based on either the accumulated value or the current element.
 * Useful for short-circuit evaluation, early termination, or conditional
 * aggregation.
 *
 * @param predicate - Function that determines whether to continue (acc, element) => boolean
 * @param reducer - Reducer function (acc, element, index, array) => newAcc
 * @param initial - Initial accumulator value
 * @param array - Array to reduce
 * @returns Final accumulated value when predicate becomes false or array ends
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic usage - sum until limit
 * const underLimit = (acc: number) => acc < 100
 * const add = (acc: number, x: number) => acc + x
 * reduceWhile(underLimit)(add)(0)([10, 20, 30, 40, 50, 60])  // 100
 *
 * // Collect until specific element
 * const notStop = (_: string[], x: string) => x !== "STOP"
 * const collect = (acc: string[], x: string) => [...acc, x]
 * reduceWhile(notStop)(collect)([])(["a", "b", "STOP", "c"])  // ["a", "b"]
 *
 * // Product until zero
 * const noZero = (_: number, x: number) => x !== 0
 * const multiply = (acc: number, x: number) => acc * x
 * reduceWhile(noZero)(multiply)(1)([2, 3, 4, 0, 5])  // 24
 *
 * // Process while ascending
 * const isAscending = (acc: { last: number }, x: number) => acc.last < x
 * const track = (acc: { sum: number; last: number }, x: number) =>
 *   ({ sum: acc.sum + x, last: x })
 * reduceWhile(isAscending)(track)({ sum: 0, last: -Infinity })([1, 3, 5, 4])
 * // { sum: 9, last: 5 }
 *
 * // Edge cases
 * reduceWhile(() => false)((acc, x) => acc + x)(10)([1, 2, 3])  // 10
 * reduceWhile(() => true)((acc, x) => acc + x)(0)([1, 2, 3])    // 6
 * reduceWhile(() => true)((acc, x) => acc + x)(0)(null)         // 0
 * ```
 */
const reduceWhile = <T, U>(
	predicate: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => boolean,
) =>
(
	reducer: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (isNullish(array)) {
		return initial
	}

	const recurse = (acc: U, idx: number): U => {
		if (idx >= array.length) {
			return acc
		}
		if (not(predicate(acc, array[idx], idx, array))) {
			return acc
		}
		return recurse(reducer(acc, array[idx], idx, array), idx + 1)
	}

	return recurse(initial, 0)
}

export default reduceWhile
