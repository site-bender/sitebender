/**
 * Wraps a value in an array (singleton)
 * Creates a single-element array containing the value
 *
 * @param value - Value to wrap in array
 * @returns Array containing just the value
 * @example
 * ```typescript
 * // Create singleton arrays
 * of(5) // [5]
 * of("hello") // ["hello"]
 * of(null) // [null]
 * of(undefined) // [undefined]
 *
 * // Already an array? Still wraps it
 * of([1, 2, 3]) // [[1, 2, 3]]
 *
 * // Useful for consistent array handling
 * const ensureArray = <T>(value: T | Array<T>): Array<T> =>
 *   Array.isArray(value) ? value : of(value)
 *
 * ensureArray(5) // [5]
 * ensureArray([5]) // [5]
 *
 * // Compose with array methods
 * const process = (value: unknown) =>
 *   of(value)
 *     .map(x => String(x))
 *     .map(s => s.toUpperCase())
 *     .map(s => s.length)
 *
 * process("hello") // [5]
 *
 * // Starting point for array operations
 * const buildArray = <T>(first: T, ...rest: Array<T>): Array<T> =>
 *   of(first).concat(rest)
 *
 * buildArray(1, 2, 3, 4) // [1, 2, 3, 4]
 *
 * // Monadic return for arrays
 * const computation = (x: number) =>
 *   x > 0 ? of(x * 2) : []
 *
 * computation(5) // [10]
 * computation(-1) // []
 *
 * // Combine with flatMap for chaining
 * of(3)
 *   .flatMap(x => of(x * 2))
 *   .flatMap(x => of(x + 10)) // [16]
 * ```
 *
 * Note: This is the monadic return/pure function for arrays.
 * It's the simplest way to lift a value into the array context.
 */
const of = <T>(value: T): Array<T> => [value]

export default of
