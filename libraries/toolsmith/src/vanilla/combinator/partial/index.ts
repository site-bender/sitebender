//++ Partially applies a function with fixed arguments, returning a new function that takes the remaining arguments
// deno-lint-ignore no-explicit-any
const partial = <T extends ReadonlyArray<any>, U extends ReadonlyArray<any>, R>(
	fn: (...args: [...T, ...U]) => R,
	...fixedArgs: T
) =>
(...remainingArgs: U): R => fn(...fixedArgs, ...remainingArgs)

//?? [EXAMPLE] sayHello("Alice", "!") // "Hello, Alice!"
//?? [EXAMPLE] sayHelloAlice("!") // "Hello, Alice!"
//?? [EXAMPLE] sayHelloAlice("?") // "Hello, Alice?"
//?? [EXAMPLE] double(5) // 10
//?? [EXAMPLE] quadruple(5) // 20
/*??
 | [EXAMPLE]
 | ```typescript
 | const greet = (greeting: string, name: string, punctuation: string) =>
 |   `${greeting}, ${name}${punctuation}`
 |
 | const sayHello = partial(greet, "Hello")
 | sayHello("Alice", "!") // "Hello, Alice!"
 |
 | const sayHelloAlice = partial(greet, "Hello", "Alice")
 | sayHelloAlice("!") // "Hello, Alice!"
 | sayHelloAlice("?") // "Hello, Alice?"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Useful for creating specialized functions
 | const multiply = (a: number, b: number, c: number) => a * b * c
 | const double = partial(multiply, 2, 1)
 | double(5) // 10
 |
 | const quadruple = partial(multiply, 2, 2)
 | quadruple(5) // 20
 | ```
 |
 | [GOTCHA]
 | Unlike curry, partial fixes arguments immediately and doesn't
 | support progressive partial application. For that behavior, use curry.
 */

export default partial
