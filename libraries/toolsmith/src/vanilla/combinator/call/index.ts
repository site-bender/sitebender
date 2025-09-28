//++ Calls a function with individual arguments - functional wrapper for immediate function invocation
const call = <T extends ReadonlyArray<unknown>, R>(
 	fn: (...args: T) => R,
 	...args: T
): R => fn(...args)

//?? [EXAMPLE] call(add, 5, 3) // 8
//?? [EXAMPLE] operate("add", 10, 5) // 15
//?? [EXAMPLE] operate("multiply", 10, 5) // 50
//?? [EXAMPLE] funcs.map(f => call(f)) // ["first", "second", "third"]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Simple function call
 | const add = (a: number, b: number) => a + b
 | call(add, 5, 3) // 8
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Useful for invoking functions dynamically
 | const operations = {
 |   add: (a: number, b: number) => a + b,
 |   multiply: (a: number, b: number) => a * b
 | }
 |
 | const operate = (op: keyof typeof operations, x: number, y: number) =>
 |   call(operations[op], x, y)
 |
 | operate("add", 10, 5) // 15
 | operate("multiply", 10, 5) // 50
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Invoke functions from arrays
 | const funcs = [
 |   () => "first",
 |   () => "second",
 |   () => "third"
 | ]
 |
 | funcs.map(f => call(f)) // ["first", "second", "third"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Conditional function execution
 | const maybeCall = <T>(cond: boolean, fn: () => T, defaultVal: T): T =>
 |   cond ? call(fn) : defaultVal
 |
 | maybeCall(true, () => "yes", "no") // "yes"
 | maybeCall(false, () => "yes", "no") // "no"
 | ```
 |
 | [GOTCHA]
 | This is primarily useful when you need to invoke a function
 | that's been selected dynamically or passed as a parameter.
 */

export default call
