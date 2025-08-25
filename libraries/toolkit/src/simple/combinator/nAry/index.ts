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
// deno-lint-ignore no-explicit-any
const nAry = <R>(n: number, fn: (...args: ReadonlyArray<any>) => R) => {
	// Create wrappers for common arities for better performance
	// deno-lint-ignore no-explicit-any
	const wrappers: { [key: number]: (...args: ReadonlyArray<any>) => R } = {
		0: () => fn(),
		// deno-lint-ignore no-explicit-any
		1: (a: any) => fn(a),
		// deno-lint-ignore no-explicit-any
		2: (a: any, b: any) => fn(a, b),
		// deno-lint-ignore no-explicit-any
		3: (a: any, b: any, c: any) => fn(a, b, c),
		// deno-lint-ignore no-explicit-any
		4: (a: any, b: any, c: any, d: any) => fn(a, b, c, d),
		// deno-lint-ignore no-explicit-any
		5: (a: any, b: any, c: any, d: any, e: any) => fn(a, b, c, d, e),
	}

	// For arities > 5, use a generic wrapper
	// deno-lint-ignore no-explicit-any
	return wrappers[n] ||
		((...args: ReadonlyArray<any>) => fn(...args.slice(0, n)))
}

export default nAry
