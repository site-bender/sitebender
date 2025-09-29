//++ Transforms arguments before passing to a function, applying transformer functions to corresponding arguments
const useWith = <R>(
	fn: (...args: ReadonlyArray<unknown>) => R,
	transformers: ReadonlyArray<(arg: unknown) => unknown>,
) =>
(...args: ReadonlyArray<unknown>): R => {
	const transformedArgs = args.map((arg, index) =>
		transformers[index] ? transformers[index](arg) : arg
	)
	return fn(...transformedArgs)
}

//?? [EXAMPLE] parseInts("10", "20") // 30
//?? [EXAMPLE] processData("alice", "25", "yes") // "ALICE is 25 and active"
/*??
 | [EXAMPLE]
 | ```typescript
 | const parseInts = useWith(
 |   (a: number, b: number) => a + b,
 |   [parseInt, parseInt]
 | )
 | parseInts("10", "20") // 30
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Different transformers for each argument
 | const processData = useWith(
 |   (name: string, age: number, active: boolean) =>
 |     `${name} is ${age} and ${active ? "active" : "inactive"}`,
 |   [
 |     (s: string) => s.toUpperCase(),
 |     (s: string) => parseInt(s),
 |     (s: string) => s === "yes"
 |   ]
 | )
 | processData("alice", "25", "yes") // "ALICE is 25 and active"
 | ```
 |
 | [GOTCHA]
 | The number of transformers should match the number of arguments
 | expected by the function. Extra transformers are ignored, missing ones
 | pass arguments through unchanged.
 */

export default useWith
