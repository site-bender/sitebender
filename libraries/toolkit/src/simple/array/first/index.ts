import head from "../head/index.ts"

/**
 * Returns the first element of an array
 *
 * Alias for `head`. The term "first" is more intuitive in JavaScript/TypeScript
 * while "head" comes from Haskell and traditional functional programming.
 * Both functions are identical - they safely return the first element of an
 * array or undefined if the array is empty.
 *
 * @pure
 * @idempotent
 * @see head - The primary implementation
 * @param array - The array to get the first element from
 * @returns The first element or undefined if array is empty
 * @example
 * ```typescript
 * first([1, 2, 3]) // 1
 * first(["a", "b"]) // "a"
 * first([]) // undefined
 * ```
 */
const first = head

export default first
