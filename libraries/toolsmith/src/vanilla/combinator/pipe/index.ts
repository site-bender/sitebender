//++ Functional programming pipe utility that composes functions left-to-right (data flows through the pipeline)
// deno-lint-ignore no-explicit-any
const pipe = <T>(fns: ReadonlyArray<(value: any) => any> = []) =>
// deno-lint-ignore no-explicit-any
(input: T): any => fns.reduce((out, fn) => fn(out), input)

//?? [EXAMPLE] transform(5) // "20"
//?? [EXAMPLE] identity("hello") // "hello"
/*??
 | [EXAMPLE]
 | ```typescript
 | const double = (x: number) => x * 2
 | const addTen = (x: number) => x + 10
 | const toString = (x: number) => x.toString()
 |
 | const transform = pipe([double, addTen, toString])
 | transform(5) // "20"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty pipe returns identity
 | const identity = pipe([])
 | identity("hello") // "hello"
 | ```
 |
 | [GOTCHA]
 | TypeScript cannot properly type variadic pipe without extensive overloads.
 | The 'any' type here is justified because each function's output type becomes
 | the next function's input type, creating a chain of dependent types that
 | TypeScript cannot infer without 20+ overloads for different arities.
 */

export default pipe
