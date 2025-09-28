//++ Lifts a function to work with functors/applicatives, transforming it to work with wrapped values (Arrays, Promises, etc.)
const lift = <R>(fn: (...args: ReadonlyArray<unknown>) => R) => {
	return (
		...arrays: ReadonlyArray<ReadonlyArray<unknown>>
	): Array<R> => {
		if (arrays.length === 0) return []
		if (arrays.length === 1) {
			// Unary function - just map
			return arrays[0].map(fn)
		}

		// For n-ary functions, compute Cartesian product functionally
		const cartesianProduct = arrays.reduce<Array<Array<unknown>>>(
			(acc, currentArray) =>
				acc.flatMap((combo) =>
					Array.from(currentArray).map((item) => [...combo, item])
				),
			[[]],
		)

		// Apply function to each combination
		return cartesianProduct.map((args) => fn(...args))
	}
}

//?? [EXAMPLE] liftedAdd([1, 2], [10, 20]) // [11, 21, 12, 22]
//?? [EXAMPLE] liftedSum3([1, 2], [10], [100, 200]) // [111, 211, 112, 212]
//?? [EXAMPLE] liftedConcat(["Hello", "Hi"], [" World", " There"]) // ["Hello World", "Hello There", "Hi World", "Hi There"]
//?? [EXAMPLE] liftedMultiply([2, 3, 4], [10, 100]) // [20, 200, 30, 300, 40, 400]
//?? [EXAMPLE] liftedDouble([1, 2, 3, 4]) // [2, 4, 6, 8]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Lift binary function to work with arrays
 | const add = (a: number, b: number) => a + b
 | const liftedAdd = lift(add)
 |
 | liftedAdd([1, 2], [10, 20]) // [11, 21, 12, 22]
 | // Applies add to all combinations: 1+10, 1+20, 2+10, 2+20
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Lift to work with multiple arrays
 | const sum3 = (a: number, b: number, c: number) => a + b + c
 | const liftedSum3 = lift(sum3)
 |
 | liftedSum3([1, 2], [10], [100, 200])
 | // [111, 211, 112, 212]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String operations
 | const concat = (a: string, b: string) => a + b
 | const liftedConcat = lift(concat)
 |
 | liftedConcat(["Hello", "Hi"], [" World", " There"])
 | // ["Hello World", "Hello There", "Hi World", "Hi There"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Mathematical operations
 | const multiply = (a: number, b: number) => a * b
 | const liftedMultiply = lift(multiply)
 |
 | liftedMultiply([2, 3, 4], [10, 100])
 | // [20, 200, 30, 300, 40, 400]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Unary functions just map
 | const double = (x: number) => x * 2
 | const liftedDouble = lift(double)
 |
 | liftedDouble([1, 2, 3, 4]) // [2, 4, 6, 8]
 | ```
 */

export default lift
