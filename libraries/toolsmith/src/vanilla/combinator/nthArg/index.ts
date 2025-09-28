//++ Returns a function that returns its nth argument, useful for selecting specific arguments in functional pipelines
const nthArg = (n: number) => (...args: ReadonlyArray<unknown>): unknown => {
 	if (n < 0) {
 		// Negative index - count from end
 		return args[args.length + n]
 	}
 	return args[n]
}

//?? [EXAMPLE] first("a", "b", "c") // "a"
//?? [EXAMPLE] second("a", "b", "c") // "b"
//?? [EXAMPLE] third("a", "b", "c") // "c"
//?? [EXAMPLE] fifth("a", "b") // undefined
/*??
 | [EXAMPLE]
 | ```typescript
 | // Select specific arguments
 | const first = nthArg(0)
 | const second = nthArg(1)
 | const third = nthArg(2)
 |
 | first("a", "b", "c") // "a"
 | second("a", "b", "c") // "b"
 | third("a", "b", "c") // "c"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Returns undefined for out-of-bounds
 | const fifth = nthArg(4)
 | fifth("a", "b") // undefined
 | ```
 |
 | [GOTCHA]
 | Returns undefined if the index is out of bounds.
 | Negative indices count from the end of the arguments.
 */

export default nthArg
