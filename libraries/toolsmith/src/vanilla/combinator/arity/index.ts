//++ Wraps a function to report a specific arity, forcing it to accept exactly n arguments and ignoring extras
const arity = <R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => {
 	// Create a wrapper with the exact arity requested
 	const wrappers: { [key: number]: (...args: ReadonlyArray<unknown>) => R } = {
 		0: () => fn(),
 		1: (a: unknown) => fn(a),
 		2: (a: unknown, b: unknown) => fn(a, b),
 		3: (a: unknown, b: unknown, c: unknown) => fn(a, b, c),
 		4: (a: unknown, b: unknown, c: unknown, d: unknown) => fn(a, b, c, d),
 		5: (a: unknown, b: unknown, c: unknown, d: unknown, e: unknown) =>
 			fn(a, b, c, d, e),
 	}

 	// For arities > 5, use a generic wrapper
 	return wrappers[n] ||
 		((...args: ReadonlyArray<unknown>) => fn(...args.slice(0, n)))
}

//?? [EXAMPLE] sum3.length // 3
//?? [EXAMPLE] sum3(1, 2, 3, 4, 5) // 6 (only sums first 3)
//?? [EXAMPLE] nums.map(arity(1, parseInt)) // [1, 2, 3]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Variadic functions report arity 0
 | const sum = (...nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 | sum.length // 0
 |
 | // Force it to report arity 3
 | const sum3 = arity(3, sum)
 | sum3.length // 3
 | sum3(1, 2, 3, 4, 5) // 6 (only sums first 3)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Fix parseInt issues with array methods
 | const nums = ["1", "2", "3"]
 | nums.map(arity(1, parseInt)) // [1, 2, 3]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Works with any function
 | const greet = (first: string, last?: string, title?: string) => {
 |   const parts = [title, first, last].filter(Boolean)
 |   return parts.join(" ")
 | }
 |
 | const greetOne = arity(1, greet)
 | const greetTwo = arity(2, greet)
 |
 | greetOne("Alice", "Smith", "Dr.") // "Alice"
 | greetTwo("Alice", "Smith", "Dr.") // "Alice Smith"
 | ```
 |
 | [GOTCHA]
 | This actually limits the number of arguments passed to the function,
 | not just the reported arity. Extra arguments are discarded.
 */

export default arity
