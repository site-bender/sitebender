/**
 * Partially applies a function with fixed arguments
 * Returns a new function that takes the remaining arguments
 *
 * @pure
 * @param fn - Function to partially apply
 * @param fixedArgs - Arguments to fix at the beginning
 * @returns Partially applied function
 * @example
 * ```typescript
 * const greet = (greeting: string, name: string, punctuation: string) =>
 *   `${greeting}, ${name}${punctuation}`
 *
 * const sayHello = partial(greet, "Hello")
 * sayHello("Alice", "!") // "Hello, Alice!"
 *
 * const sayHelloAlice = partial(greet, "Hello", "Alice")
 * sayHelloAlice("!") // "Hello, Alice!"
 * sayHelloAlice("?") // "Hello, Alice?"
 *
 * // Useful for creating specialized functions
 * const multiply = (a: number, b: number, c: number) => a * b * c
 * const double = partial(multiply, 2, 1)
 * double(5) // 10
 *
 * const quadruple = partial(multiply, 2, 2)
 * quadruple(5) // 20
 * ```
 *
 * Note: Unlike curry, partial fixes arguments immediately and doesn't
 * support progressive partial application. For that behavior, use curry.
 */
// deno-lint-ignore no-explicit-any
const partial = <T extends ReadonlyArray<any>, U extends ReadonlyArray<any>, R>(
	fn: (...args: [...T, ...U]) => R,
	...fixedArgs: T
) =>
(...remainingArgs: U): R => fn(...fixedArgs, ...remainingArgs)

export default partial
