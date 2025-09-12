/**
 * Wraps a value in an array (singleton)
 * Creates a single-element array containing the value
 *
 * @pure
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
 * // Compose with array methods
 * const process = (value: unknown) =>
 *   of(value)
 *     .map(x => String(x))
 *     .map(s => s.toUpperCase())
 *     .map(s => s.length)
 *
 * process("hello") // [5]
 * ```
 *
 * Note: This is the monadic return/pure function for arrays.
 * It's the simplest way to lift a value into the array context.
 */
const of = <T>(value: T): Array<T> => [value]

export default of
