/**
 * Wraps a function to accept exactly 1 argument
 * Equivalent to arity(1, fn) but more semantic
 *
 * @pure Creates a new function without side effects
 * @param fn - Function to wrap
 * @returns Unary function (accepts exactly 1 argument)
 * @example
 * ```typescript
 * // Fix parseInt issues with map
 * const numbers = ["1", "2", "3", "10", "11"]
 *
 * // parseInt takes (string, radix), map passes (value, index)
 * numbers.map(parseInt) // [1, NaN, NaN, 3, 4] (index used as radix!)
 * numbers.map(unary(parseInt)) // [1, 2, 3, 10, 11] (correct)
 *
 * // Limit variadic functions
 * const sum = (...nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 * const sumOne = unary(sum)
 *
 * sumOne(5, 10, 15) // 5 (only first argument used)
 * [1, 2, 3].map(sumOne) // [1, 2, 3] (identity function)
 *
 * // Useful for callback functions
 * const logValue = unary(console.log)
 * ["a", "b", "c"].forEach(logValue)
 * // Logs only values, not (value, index, array)
 * ```
 *
 * Note: This is a convenience function for the common case of
 * needing exactly 1 argument. Particularly useful with array methods
 * that pass multiple arguments to callbacks.
 */
const unary =
	<T, R>(fn: (arg: T, ...rest: ReadonlyArray<unknown>) => R) => (arg: T): R =>
		fn(arg)

export default unary
