/**
 * Lifts a function to work with functors/applicatives
 * Transforms a regular function to work with wrapped values (Arrays, Promises, etc.)
 *
 * @param fn - Function to lift
 * @returns Lifted function that works with wrapped values
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
 * // Combinations: 1+10+100, 1+10+200, 2+10+100, 2+10+200
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
 * // Validation combinations
 * const isValid = (min: number, max: number, val: number) =>
 *   val >= min && val <= max
 * const liftedValidate = lift(isValid)
 *
 * liftedValidate([0], [100], [50, 150, -10])
 * // [true, false, false]
 *
 * // Unary functions just map
 * const double = (x: number) => x * 2
 * const liftedDouble = lift(double)
 *
 * liftedDouble([1, 2, 3, 4]) // [2, 4, 6, 8]
 * ```
 *
 * Note: This implementation works with Arrays as the functor.
 * For other functors (Maybe, Either, etc.), you'd need specialized versions.
 * The lifted function applies the original function to all combinations
 * of values from the input arrays (Cartesian product).
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

		// For n-ary functions, compute Cartesian product
		let cartesian: Array<Array<any>> = arrays[0].map((x) => [x])

		for (let i = 1; i < arrays.length; i++) {
			const result: Array<Array<any>> = []
			for (const combo of cartesian) {
				for (const item of arrays[i]) {
					result.push([...combo, item])
				}
			}
			cartesian = result
		}

		// Apply function to each combination
		return cartesian.map((args) => fn(...args))
	}
}

export default lift
