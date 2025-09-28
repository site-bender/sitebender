//++ Applies an array of functions to a value and returns array of results - each function receives the same arguments and results are collected
const juxt = <T extends ReadonlyArray<unknown>, R>(
	fns: ReadonlyArray<(...args: T) => R>,
) =>
(...args: T): Array<R> => fns.map((fn) => fn(...args))

//?? [EXAMPLE] operations(4) // [8, 14, 16, 2]
//?? [EXAMPLE] getProps({ name: "Alice", age: 25 }) // ["Alice", 25, true]
//?? [EXAMPLE] transforms("Hello") // ["HELLO", "hello", 5]
//?? [EXAMPLE] validators("test@example.com") // [true, true, true]
//?? [EXAMPLE] validators("bad") // [false, false, false]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Apply multiple operations to the same value
 | const operations = juxt([
 |   (x: number) => x * 2,
 |   (x: number) => x + 10,
 |   (x: number) => x * x,
 |   (x: number) => Math.sqrt(x)
 | ])
 |
 | operations(4) // [8, 14, 16, 2]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Extract multiple properties at once
 | const getProps = juxt([
 |   (p: { name: string; age: number }) => p.name,
 |   (p: { name: string; age: number }) => p.age,
 |   (p: { name: string; age: number }) => p.age >= 18
 | ])
 |
 | getProps({ name: "Alice", age: 25 }) // ["Alice", 25, true]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Multiple string transformations
 | const transforms = juxt([
 |   (s: string) => s.toUpperCase(),
 |   (s: string) => s.toLowerCase(),
 |   (s: string) => s.length
 | ])
 |
 | transforms("Hello") // ["HELLO", "hello", 5]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Validation checks
 | const validators = juxt([
 |   (email: string) => email.includes("@"),
 |   (email: string) => email.includes("."),
 |   (email: string) => email.length > 5
 | ])
 |
 | validators("test@example.com") // [true, true, true]
 | validators("bad") // [false, false, false]
 | ```
 */

export default juxt
