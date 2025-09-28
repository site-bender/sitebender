//++ Calls a function with an array of arguments, spreading array elements as individual arguments
const apply = <T extends ReadonlyArray<unknown>, R>(
 	fn: (...args: T) => R,
 	args: T,
): R => fn(...args)

//?? [EXAMPLE] apply(add3, [1, 2, 3]) // 6
//?? [EXAMPLE] apply(Math.max, [1, 5, 3, 9, 2]) // 9
//?? [EXAMPLE] apply(Math.min, [1, 5, 3, 9, 2]) // 1
/*??
 | [EXAMPLE]
 | ```typescript
 | // Convert between function signatures
 | const greet = (first: string, last: string, title: string) =>
 |   `${title} ${first} ${last}`
 |
 | const greetFromArray = (parts: [string, string, string]) =>
 |   apply(greet, parts)
 |
 | greetFromArray(["Jane", "Doe", "Dr."]) // "Dr. Jane Doe"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Dynamic function calls
 | const operations = {
 |   add: (a: number, b: number) => a + b,
 |   multiply: (a: number, b: number) => a * b
 | }
 |
 | const calculate = (op: keyof typeof operations, args: [number, number]) =>
 |   apply(operations[op], args)
 |
 | calculate("add", [5, 3]) // 8
 | calculate("multiply", [5, 3]) // 15
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Useful with Math functions
 | const add3 = (a: number, b: number, c: number) => a + b + c
 | apply(add3, [1, 2, 3]) // 6
 | ```
 */

export default apply
