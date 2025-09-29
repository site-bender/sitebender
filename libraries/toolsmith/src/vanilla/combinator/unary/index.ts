//++ Wraps a function to accept exactly 1 argument (equivalent to arity(1, fn) but more semantic)
const unary =
	<T, R>(fn: (arg: T, ...rest: ReadonlyArray<unknown>) => R) => (arg: T): R =>
		fn(arg)

//?? [EXAMPLE] numbers.map(unary(parseInt)) // [1, 2, 3, 10, 11] (correct)
//?? [EXAMPLE] sumOne(5, 10, 15) // 5 (only first argument used)
//?? [EXAMPLE] [1, 2, 3].map(sumOne) // [1, 2, 3] (identity function)
/*??
 | [EXAMPLE]
 | ```typescript
 | // Fix parseInt issues with map
 | const numbers = ["1", "2", "3", "10", "11"]
 |
 | // parseInt takes (string, radix), map passes (value, index)
 | numbers.map(parseInt) // [1, NaN, NaN, 3, 4] (index used as radix!)
 | numbers.map(unary(parseInt)) // [1, 2, 3, 10, 11] (correct)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Limit variadic functions
 | const sum = (...nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 | const sumOne = unary(sum)
 |
 | sumOne(5, 10, 15) // 5 (only first argument used)
 | [1, 2, 3].map(sumOne) // [1, 2, 3] (identity function)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Useful for callback functions
 | const logValue = unary(console.log)
 | ["a", "b", "c"].forEach(logValue)
 | // Logs only values, not (value, index, array)
 | ```
 |
 | [GOTCHA]
 | This is a convenience function for the common case of
 | needing exactly 1 argument. Particularly useful with array methods
 | that pass multiple arguments to callbacks.
 */

export default unary
