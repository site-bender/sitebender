/**
 * Like mapAccum but processes the array from right to left
 *
 * Performs a stateful map operation that threads an accumulator through the
 * array from right to left. Each iteration produces both a new accumulator
 * value and a mapped element. Returns a tuple containing the final accumulator
 * and an array of all mapped values (in original left-to-right order). Useful
 * for operations that need to process elements with knowledge of what comes
 * after, suffix operations, or right-associative transformations.
 *
 * @curried
 * @param fn - Function that takes accumulator and element, returns [newAcc, mappedValue]
 * @param initial - Initial accumulator value
 * @param array - Array to process
 * @returns Tuple of [finalAccumulator, mappedArray]
 * @example
 * ```typescript
 * // Suffix sums
 * const suffixSum = (acc: number, x: number): [number, number] =>
 *   [acc + x, acc + x]
 * mapAccumRight(suffixSum)(0)([1, 2, 3, 4, 5])
 * // [15, [15, 14, 12, 9, 5]]
 *
 * // Build path from end
 * const buildPath = (path: string, segment: string): [string, string] => {
 *   const newPath = path ? `${segment}/${path}` : segment
 *   return [newPath, newPath]
 * }
 * mapAccumRight(buildPath)("")(["usr", "local", "bin", "node"])
 * // ["usr/local/bin/node", ["usr/local/bin/node", "local/bin/node", "bin/node", "node"]]
 *
 * // Count elements after each position
 * const countAfter = (count: number, _: any): [number, number] =>
 *   [count + 1, count]
 * mapAccumRight(countAfter)(0)(["a", "b", "c", "d"])
 * // [4, [3, 2, 1, 0]]
 *
 * // Calculate future values
 * const futureMax = (maxSoFar: number, x: number): [number, number] => {
 *   const newMax = Math.max(maxSoFar, x)
 *   return [newMax, maxSoFar]
 * }
 * mapAccumRight(futureMax)(-Infinity)([3, 1, 4, 1, 5, 9, 2])
 * // [9, [9, 9, 9, 9, 9, 2, -Infinity]]
 *
 * // Suffix string concatenation
 * const suffixConcat = (suffix: string, x: string): [string, string] => {
 *   const combined = x + suffix
 *   return [combined, combined]
 * }
 * mapAccumRight(suffixConcat)("")(["a", "b", "c"])
 * // ["abc", ["abc", "bc", "c"]]
 *
 * // Calculate remaining sum at each position
 * const remainingSum = (sum: number, x: number): [number, number] =>
 *   [sum + x, sum]
 * mapAccumRight(remainingSum)(0)([10, 20, 30, 40])
 * // [100, [90, 70, 40, 0]]
 *
 * // Empty array
 * mapAccumRight((acc: number, x: number) => [acc + x, x * 2])(10)([])
 * // [10, []]
 *
 * // Single element
 * mapAccumRight((acc: string, x: string) => [acc + x, acc])("end")(["value"])
 * // ["endvalue", ["end"]]
 * ```
 * @pure
 * @immutable
 * @safe
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
	if (array == null || !Array.isArray(array)) {
		return [initial, []]
	}

	const processArray = (arr: ReadonlyArray<T>, acc: U, result: Array<V>): [U, Array<V>] => {
		if (arr.length === 0) {
			return [acc, result]
		}
		const [newAcc, mappedValue] = fn(acc, arr[arr.length - 1])
		return processArray(
			arr.slice(0, -1),
			newAcc,
			[mappedValue, ...result]
		)
	}

	return processArray(array, initial, [])
}

export default mapAccumRight