/**
 * Wraps a function to accept exactly 2 arguments
 * Equivalent to arity(2, fn) but more semantic
 *
 * @param fn - Function to wrap
 * @returns Binary function (accepts exactly 2 arguments)
 * @example
 * ```typescript
 * // Variadic functions can cause issues
 * const sum = (...nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 * [1, 2, 3].reduce(sum) // 6 on first call, then NaN
 *
 * // Fix by making it binary
 * const add = binary(sum)
 * [1, 2, 3].reduce(add) // 6 (works correctly)
 * add(5, 10, 20) // 15 (ignores third argument)
 *
 * // Useful with array methods
 * const parseIntBinary = binary(parseInt)
 * ["1", "2", "3"].map(parseIntBinary) // [1, 2, 3]
 * // Without binary: ["1", "2", "3"].map(parseInt) // [1, NaN, NaN]
 *
 * // Create binary operations from variadic ones
 * const multiply = (...nums: Array<number>) =>
 *   nums.reduce((a, b) => a * b, 1)
 * const mult2 = binary(multiply)
 *
 * mult2(3, 4) // 12
 * mult2(3, 4, 5) // 12 (ignores 5)
 *
 * // Works with any function
 * const greet = (first: string, last: string, ...titles: Array<string>) =>
 *   [titles.join(" "), first, last].filter(Boolean).join(" ")
 *
 * const greetBinary = binary(greet)
 * greetBinary("John", "Doe", "Dr.", "PhD") // "John Doe" (ignores titles)
 * ```
 *
 * Note: This is a convenience function for the common case of
 * needing exactly 2 arguments. Use arity(n, fn) for other arities.
 */
const binary =
	<A, B, R>(fn: (a: A, b: B, ...rest: ReadonlyArray<unknown>) => R) =>
	(a: A, b: B): R => fn(a, b)

export default binary
