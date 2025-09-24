import isNullish from "../../validation/isNullish/index.ts"

/**
 * Accumulates values progressively, returning all intermediate results
 *
 * Like reduce, but returns an array of all intermediate accumulator values
 * including the initial value. Useful for running totals, progressive
 * transformations, or tracking state changes over time.
 *
 * @param fn - Accumulator function (acc: U, item: T, index?: number) => U
 * @param initial - Starting value (becomes first element of result)
 * @param array - The array to scan
 * @returns Array of all intermediate accumulator values
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Running sum
 * scan((acc: number, n: number) => acc + n)(0)([1, 2, 3, 4])
 * // [0, 1, 3, 6, 10]
 *
 * // Running product
 * scan((acc: number, n: number) => acc * n)(1)([2, 3, 4])
 * // [1, 2, 6, 24]
 *
 * // Build strings progressively
 * scan((acc: string, char: string) => acc + char)("")(["h", "e", "l", "l", "o"])
 * // ["", "h", "he", "hel", "hell", "hello"]
 *
 * // Track maximum so far
 * scan((max: number, n: number) => Math.max(max, n))(-Infinity)([3, 1, 4, 1, 5])
 * // [-Infinity, 3, 3, 4, 4, 5]
 *
 * // Build array progressively
 * scan((acc: Array<number>, n: number) => n % 2 === 0 ? [...acc, n] : acc)([])([1, 2, 3, 4, 5])
 * // [[], [], [2], [2], [2, 4], [2, 4]]
 *
 * // Fibonacci sequence
 * scan(([a, b]: [number, number]) => [b, a + b])([0, 1])(Array(8).fill(0))
 * // [[0, 1], [1, 1], [1, 2], [2, 3], [3, 5], [5, 8], [8, 13], [13, 21], [21, 34]]
 *
 * // State machine transitions
 * type State = "idle" | "loading" | "success" | "error"
 * type Action = "fetch" | "succeed" | "fail" | "reset"
 *
 * const transition = (state: State, action: Action): State => {
 *   switch (state) {
 *     case "idle": return action === "fetch" ? "loading" : state
 *     case "loading":
 *       return action === "succeed" ? "success" :
 *              action === "fail" ? "error" : state
 *     case "success":
 *     case "error":
 *       return action === "reset" ? "idle" : state
 *   }
 * }
 *
 * scan(transition)("idle")(["fetch", "succeed", "reset", "fetch", "fail"])
 * // ["idle", "loading", "success", "idle", "loading", "error"]
 *
 * // Partial application for reusable scanners
 * const runningSum = scan((acc: number, n: number) => acc + n)(0)
 * runningSum([1, 2, 3]) // [0, 1, 3, 6]
 * runningSum([10, 20, 30]) // [0, 10, 30, 60]
 *
 * // Handle null/undefined gracefully
 * scan((acc: number, n: number) => acc + n)(0)(null) // [0]
 * scan((acc: number, n: number) => acc + n)(0)(undefined) // [0]
 * scan((acc: number, n: number) => acc + n)(0)([]) // [0]
 * ```
 */
const scan = <T, U>(
	fn: (acc: U, item: T, index?: number) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<U> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return [initial]
	}

	// Build result array with all intermediate values
	const scanRecursive = (
		acc: U,
		remaining: ReadonlyArray<T>,
		index: number,
		results: Array<U>,
	): Array<U> => {
		if (remaining.length === 0) {
			return results
		}

		const [head, ...tail] = remaining
		const newAcc = fn(acc, head, index)

		return scanRecursive(
			newAcc,
			tail,
			index + 1,
			[...results, newAcc],
		)
	}

	return scanRecursive(initial, array, 0, [initial])
}

export default scan
