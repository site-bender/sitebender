/**
 * Lifts a function to work with functors/applicatives
 * Transforms a regular function to work with wrapped values (Arrays, Promises, etc.)
 *
 * @param fn - Function to lift
 * @returns Lifted function that works with wrapped values
 * @pure
 * @example
 * ```typescript
 * // Lift binary function to work with arrays
 * const add = (a: number, b: number) => a + b
 * const liftedAdd = lift(add)
 *
 * liftedAdd([1, 2], [10, 20]) // [11, 21, 12, 22]
 * // Applies add to all combinations: 1+10, 1+20, 2+10, 2+20
 *
 * // Lift to work with multiple arrays
 * const sum3 = (a: number, b: number, c: number) => a + b + c
 * const liftedSum3 = lift(sum3)
 *
 * liftedSum3([1, 2], [10], [100, 200])
 * // [111, 211, 112, 212]
 *
 * // String operations
 * const concat = (a: string, b: string) => a + b
 * const liftedConcat = lift(concat)
 *
 * liftedConcat(["Hello", "Hi"], [" World", " There"])
 * // ["Hello World", "Hello There", "Hi World", "Hi There"]
 *
 * // Mathematical operations
 * const multiply = (a: number, b: number) => a * b
 * const liftedMultiply = lift(multiply)
 *
 * liftedMultiply([2, 3, 4], [10, 100])
 * // [20, 200, 30, 300, 40, 400]
 *
 * // Unary functions just map
 * const double = (x: number) => x * 2
 * const liftedDouble = lift(double)
 *
 * liftedDouble([1, 2, 3, 4]) // [2, 4, 6, 8]
 * ```
 */
// deno-lint-ignore no-explicit-any
const lift = <R>(fn: (...args: ReadonlyArray<any>) => R) => {
	// deno-lint-ignore no-explicit-any
	return (...arrays: ReadonlyArray<ReadonlyArray<any>>): Array<R> => {
		if (arrays.length === 0) return []
		if (arrays.length === 1) {
			// Unary function - just map
			return arrays[0].map(fn)
		}

		// For n-ary functions, compute Cartesian product functionally
		const cartesianProduct = arrays.reduce(
			(acc, currentArray) =>
				acc.flatMap((combo) => currentArray.map((item) => [...combo, item])),
			[[]] as Array<Array<any>>,
		)

		// Apply function to each combination
		return cartesianProduct.map((args) => fn(...args))
	}
}

export default lift
