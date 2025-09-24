/**
 * Flips the first two arguments of a function
 * Useful for creating variations of functions with reversed parameter order
 *
 * @param fn - Function whose arguments to flip
 * @returns Function with first two arguments flipped
 * @pure
 * @example
 * ```typescript
 * const subtract = (a: number, b: number) => a - b
 * const flippedSubtract = flip(subtract)
 *
 * subtract(10, 3) // 7
 * flippedSubtract(10, 3) // -7 (equivalent to subtract(3, 10))
 *
 * // Works with regular binary functions
 * const concat = (a: string, b: string) => a + b
 * const flippedConcat = flip(concat)
 * concat("Hello", " World") // "Hello World"
 * flippedConcat("Hello", " World") // " WorldHello"
 *
 * // Works with functions that have more than 2 arguments
 * const greet = (greeting: string, name: string, punctuation: string) =>
 *   `${greeting}, ${name}${punctuation}`
 * const flippedGreet = flip(greet)
 * flippedGreet("Alice", "Hello", "!") // "Hello, Alice!"
 * ```
 */
const flip = <A, B, Rest extends ReadonlyArray<unknown>, R>(
	fn: (a: A, b: B, ...rest: Rest) => R,
) =>
(b: B, a: A, ...rest: Rest): R => fn(a, b, ...rest)

export default flip
