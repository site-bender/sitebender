/**
 * Creates a function that accepts exactly n arguments
 * Alias for arity with a different name convention
 *
 * @pure
 * @param n - The exact number of arguments to accept
 * @param fn - Function to wrap
 * @returns Function that accepts exactly n arguments
 * @example
 * ```typescript
 * // Limit variadic functions to specific arity
 * const sum = (...nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 *
 * const sum0 = nAry(0, sum)
 * const sum2 = nAry(2, sum)
 * const sum5 = nAry(5, sum)
 *
 * sum0(1, 2, 3) // 0 (no arguments passed to sum)
 * sum2(1, 2, 3, 4) // 3 (only 1 and 2 passed)
 * sum5(1, 2, 3) // 6 (all three passed, padded with undefined)
 *
 * // Fix array method issues
 * const nums = ["10", "20", "30"]
 * nums.map(parseInt) // [10, NaN, NaN] (parseInt gets index as radix)
 * nums.map(nAry(1, parseInt)) // [10, 20, 30] (only value passed)
 *
 * // Create fixed-arity versions
 * const greet = (first: string, last?: string, title?: string, suffix?: string) => {
 *   return [title, first, last, suffix].filter(Boolean).join(" ")
 * }
 *
 * const greetSimple = nAry(1, greet)
 * const greetFull = nAry(2, greet)
 * const greetFormal = nAry(3, greet)
 *
 * greetSimple("Alice", "Smith", "Dr.") // "Alice"
 * greetFull("Alice", "Smith", "Dr.") // "Alice Smith"
 * greetFormal("Alice", "Smith", "Dr.") // "Dr. Alice Smith"
 *
 * // Nullary function (no arguments)
 * const getRandom = nAry(0, Math.random)
 * getRandom(1, 2, 3) // Random number (arguments ignored)
 * ```
 *
 * Note: This is the same as arity but follows the naming convention
 * used in some functional libraries (n-ary for n arguments).
 */
const nAry = <R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => {
	// Create wrappers for common arities for better performance
	const wrappers: { [key: number]: (...args: ReadonlyArray<unknown>) => R } =
		{
			0: () => fn(),
			1: (a: unknown) => fn(a),
			2: (a: unknown, b: unknown) => fn(a, b),
			3: (a: unknown, b: unknown, c: unknown) => fn(a, b, c),
			4: (a: unknown, b: unknown, c: unknown, d: unknown) =>
				fn(a, b, c, d),
			5: (
				a: unknown,
				b: unknown,
				c: unknown,
				d: unknown,
				e: unknown,
			) => fn(a, b, c, d, e),
		}

	// For arities > 5, use a generic wrapper
	return wrappers[n] ||
		((...args: ReadonlyArray<unknown>) => fn(...args.slice(0, n)))
}

export default nAry
