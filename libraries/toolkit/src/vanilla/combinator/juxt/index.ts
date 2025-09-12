/**
 * Applies an array of functions to a value and returns array of results
 * Each function receives the same arguments and results are collected
 *
 * @param fns - Array of functions to apply
 * @returns Function that returns array of results
 * @pure
 * @example
 * ```typescript
 * // Apply multiple operations to the same value
 * const operations = juxt([
 *   (x: number) => x * 2,
 *   (x: number) => x + 10,
 *   (x: number) => x * x,
 *   (x: number) => Math.sqrt(x)
 * ])
 *
 * operations(4) // [8, 14, 16, 2]
 *
 * // Extract multiple properties at once
 * const getProps = juxt([
 *   (p: { name: string; age: number }) => p.name,
 *   (p: { name: string; age: number }) => p.age,
 *   (p: { name: string; age: number }) => p.age >= 18
 * ])
 *
 * getProps({ name: "Alice", age: 25 }) // ["Alice", 25, true]
 *
 * // Multiple string transformations
 * const transforms = juxt([
 *   (s: string) => s.toUpperCase(),
 *   (s: string) => s.toLowerCase(),
 *   (s: string) => s.length
 * ])
 *
 * transforms("Hello") // ["HELLO", "hello", 5]
 *
 * // Validation checks
 * const validators = juxt([
 *   (email: string) => email.includes("@"),
 *   (email: string) => email.includes("."),
 *   (email: string) => email.length > 5
 * ])
 *
 * validators("test@example.com") // [true, true, true]
 * validators("bad") // [false, false, false]
 * ```
 */
const juxt = <T extends ReadonlyArray<unknown>, R>(
	fns: ReadonlyArray<(...args: T) => R>,
) =>
(...args: T): Array<R> => fns.map((fn) => fn(...args))

export default juxt
