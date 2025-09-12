/**
 * Auto-curries a function to allow partial application
 * Transforms a function to accept arguments one at a time
 *
 * @param fn - Function to curry
 * @returns Curried version of the function
 * @pure
 * @curried
 * @example
 * ```typescript
 * const add = (a: number, b: number, c: number) => a + b + c
 * const curriedAdd = curry(add)
 *
 * curriedAdd(1)(2)(3) // 6
 * curriedAdd(1, 2)(3) // 6
 * curriedAdd(1)(2, 3) // 6
 * curriedAdd(1, 2, 3) // 6
 *
 * const add5 = curriedAdd(5)
 * const add5and10 = add5(10)
 * add5and10(2) // 17
 * ```
 */
// deno-lint-ignore no-explicit-any
const curry = (fn: (...args: any[]) => any): any => {
	const arity = fn.length

	// deno-lint-ignore no-explicit-any
	return function curried(...args: any[]): any {
		if (args.length >= arity) {
			return fn(...args.slice(0, arity))
		}
		// deno-lint-ignore no-explicit-any
		return (...nextArgs: any[]) => curried(...args, ...nextArgs)
	}
}

export default curry
