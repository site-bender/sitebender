import isNullish from "../../validation/isNullish/index.ts"

/**
 * Combines map and reduce, returning both accumulated value and mapped array
 *
 * Performs a stateful map operation that threads an accumulator through the
 * array from left to right. Each iteration produces both a new accumulator
 * value and a mapped element. Returns a tuple containing the final accumulator
 * and an array of all mapped values. Useful for stateful transformations,
 * running totals with transformations, or any operation that needs both
 * aggregation and mapping.
 *
 * @param fn - Function that takes accumulator and element, returns [newAcc, mappedValue]
 * @param initial - Initial accumulator value
 * @param array - Array to process
 * @returns Tuple of [finalAccumulator, mappedArray]
 *
 * @pure
 * @curried
 * @immutable
 *
 * @example
 * ```typescript
 * // Running sum with differences
 * const sumWithDiff = (acc: number, x: number): [number, number] =>
 *   [acc + x, x - acc]
 * mapAccum(sumWithDiff)(0)([1, 2, 3, 4])
 * // [10, [1, 1, 1, 1]]
 *
 * // Running average
 * const runningAvg = (acc: { sum: number; count: number }, x: number) => {
 *   const newSum = acc.sum + x
 *   const newCount = acc.count + 1
 *   return [{ sum: newSum, count: newCount }, newSum / newCount]
 * }
 * mapAccum(runningAvg)({ sum: 0, count: 0 })([10, 20, 30])
 * // [{ sum: 60, count: 3 }, [10, 15, 20]]
 *
 * // Line numbering
 * const addLineNumber = (lineNo: number, text: string): [number, string] =>
 *   [lineNo + 1, `${lineNo}: ${text}`]
 * mapAccum(addLineNumber)(1)(["First", "Second", "Third"])
 * // [4, ["1: First", "2: Second", "3: Third"]]
 *
 * // Fibonacci sequence
 * const fibonacci = (acc: [number, number], _: unknown): [[number, number], number] =>
 *   [[acc[1], acc[0] + acc[1]], acc[0]]
 * mapAccum(fibonacci)([0, 1])([1, 2, 3, 4, 5])
 * // [[5, 8], [0, 1, 1, 2, 3]]
 *
 * // Partial application
 * const withRunningTotal = mapAccum(
 *   (sum: number, x: number) => [sum + x, { value: x, total: sum + x }]
 * )
 * withRunningTotal(0)([10, 20, 30])
 * // [60, [{ value: 10, total: 10 }, { value: 20, total: 30 }, { value: 30, total: 60 }]]
 *
 * // Edge cases
 * mapAccum((acc: number, x: number) => [acc + x, x * 2])(10)([])  // [10, []]
 * mapAccum((acc: number, x: number) => [acc + x, x])(0)(null)      // [0, []]
 * ```
 */
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
