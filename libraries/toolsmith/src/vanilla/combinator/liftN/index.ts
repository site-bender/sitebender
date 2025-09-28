//++ Like lift but with specified arity, lifting a function to work with exactly n wrapped values
const liftN = <R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => {
	return (
		...arrays: ReadonlyArray<ReadonlyArray<unknown>>
	): Array<R> => {
		if (n === 0) {
			// Zero arity - return single value in array
			return [fn()]
		}

		if (n === 1) {
			// Unary - just map
			return arrays[0] ? arrays[0].map((x) => fn(x)) : []
		}

		// Take only first n arrays
		const relevantArrays = arrays.slice(0, n)

		// If we don't have enough arrays, return empty
		if (relevantArrays.length < n) {
			return []
		}

		// Compute Cartesian product of n arrays functionally
		const cartesian = relevantArrays.reduce<unknown[][]>(
			(acc, arr) => {
				const current = Array.from(arr) as unknown[]
				return acc.flatMap((combo) =>
					current.map((item) => [...combo, item] as unknown[])
				)
			},
			[[]] as unknown[][],
		)

		// Apply function to each combination
		return cartesian.map((args) => fn(...(args as ReadonlyArray<unknown>)))
	}
}

//?? [EXAMPLE] liftedSum2([1, 2], [10, 20]) // [11, 21, 12, 22]
//?? [EXAMPLE] liftedSum3([1], [10], [100, 200]) // [111, 211]
//?? [EXAMPLE] process3(["a"], ["b"], ["c"], ["d"]) // ["a-b-c"]
//?? [EXAMPLE] liftedDouble([1, 2, 3, 4]) // [2, 4, 6, 8]
//?? [EXAMPLE] liftedConstant() // [42]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Specify arity explicitly for variadic functions
 | const sum = (...nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 |
 | // Lift as binary
 | const liftedSum2 = liftN(2, sum)
 | liftedSum2([1, 2], [10, 20]) // [11, 21, 12, 22]
 |
 | // Lift as ternary
 | const liftedSum3 = liftN(3, sum)
 | liftedSum3([1], [10], [100, 200]) // [111, 211]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Control exact number of arrays processed
 | const process3 = liftN(3, (a: string, b: string, c: string) =>
 |   `${a}-${b}-${c}`)
 |
 | // Even if you pass more arrays, only first 3 are used
 | process3(["a"], ["b"], ["c"], ["d"]) // ["a-b-c"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Unary lifting (just maps)
 | const double = (x: number) => x * 2
 | const liftedDouble = liftN(1, double)
 | liftedDouble([1, 2, 3, 4]) // [2, 4, 6, 8]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Zero arity returns constant
 | const constant = () => 42
 | const liftedConstant = liftN(0, constant)
 | liftedConstant() // [42]
 | liftedConstant([1, 2], [3, 4]) // [42] (arrays ignored)
 | ```
 |
 | [GOTCHA]
 | This is useful when you need to control exactly how many
 | arrays are processed, especially with variadic functions.
 */

export default liftN
