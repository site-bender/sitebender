/**
 * Curries a function to exactly n arguments
 * Useful when you need to curry a variadic function to a specific arity
 *
 * @param n - The exact number of arguments to curry
 * @param fn - Function to curry
 * @returns Curried version accepting exactly n arguments
 * @pure
 * @curried
 * @example
 * ```typescript
 * // Math.max is variadic, but we want to curry it for exactly 3 arguments
 * const max3 = curryN(3, Math.max)
 * max3(1)(2)(3) // 3
 * max3(5, 2)(1) // 5
 *
 * // Works with any function, enforcing the specified arity
 * const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0)
 * const sum4 = curryN(4, sum)
 * sum4(1)(2)(3)(4) // 10
 * sum4(1, 2)(3, 4) // 10
 * ```
 */
// deno-lint-ignore no-explicit-any
const curryN = (n: number, fn: (...args: any[]) => any): any => {
	// deno-lint-ignore no-explicit-any
	return function curried(...args: any[]): any {
		if (args.length >= n) {
			return fn(...args.slice(0, n))
		}
		// deno-lint-ignore no-explicit-any
		return (...nextArgs: any[]) => curried(...args, ...nextArgs)
	}
}

export default curryN
