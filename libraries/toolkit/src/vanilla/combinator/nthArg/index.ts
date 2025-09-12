/**
 * Returns a function that returns its nth argument
 * Useful for selecting specific arguments in functional pipelines
 *
 * @pure
 * @param n - Zero-based index of argument to return
 * @returns Function that returns its nth argument
 * @example
 * ```typescript
 * // Select specific arguments
 * const first = nthArg(0)
 * const second = nthArg(1)
 * const third = nthArg(2)
 *
 * first("a", "b", "c") // "a"
 * second("a", "b", "c") // "b"
 * third("a", "b", "c") // "c"
 *
 * // Returns undefined for out-of-bounds
 * const fifth = nthArg(4)
 * fifth("a", "b") // undefined
 * ```
 *
 * Note: Returns undefined if the index is out of bounds.
 * Negative indices count from the end of the arguments.
 */
const nthArg = (n: number) => (...args: ReadonlyArray<unknown>): unknown => {
	if (n < 0) {
		// Negative index - count from end
		return args[args.length + n]
	}
	return args[n]
}

export default nthArg
