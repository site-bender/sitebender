/**
 * Functional programming pipe utility
 * Composes functions left-to-right (data flows through the pipeline)
 *
 * @pure
 * @param fns - Array of functions to compose
 * @returns Function that takes input and applies all functions in sequence
 * @example
 * ```typescript
 * const double = (x: number) => x * 2
 * const addTen = (x: number) => x + 10
 * const toString = (x: number) => x.toString()
 *
 * const transform = pipe([double, addTen, toString])
 * transform(5) // "20"
 *
 * // Empty pipe returns identity
 * const identity = pipe([])
 * identity("hello") // "hello"
 * ```
 *
 * Note: TypeScript cannot properly type variadic pipe without extensive overloads.
 * The 'any' type here is justified because:
 * 1. Each function's output type becomes the next function's input type
 * 2. This creates a chain of dependent types that TypeScript cannot infer without overloads
 * 3. The alternative would be 20+ overloads for different arities
 */
// deno-lint-ignore no-explicit-any
const pipe = <T>(fns: ReadonlyArray<(value: any) => any> = []) =>
// deno-lint-ignore no-explicit-any
(input: T): any => fns.reduce((out, fn) => fn(out), input)

export default pipe
