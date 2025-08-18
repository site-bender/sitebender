/**
 * Wraps a function to accept exactly 1 argument
 * Equivalent to arity(1, fn) but more semantic
 *
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
 *
 * // Create simple transformers
 * const getData = (obj: any, key?: string, defaultVal?: any) => {
 *   if (key) return obj[key] || defaultVal
 *   return obj
 * }
 *
 * const getDataSimple = unary(getData)
 * const objects = [{ name: "Alice" }, { name: "Bob" }]
 * objects.map(getDataSimple) // Returns objects as-is
 *
 * // Combine with other utilities
 * const double = (x: number) => x * 2
 * const add = (a: number, b: number) => a + b
 *
 * const doubleFirst = compose([double, unary(add)])
 * doubleFirst(5, 10) // 10 (ignores 10, doubles 5)
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
