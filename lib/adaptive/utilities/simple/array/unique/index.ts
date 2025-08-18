import nub from "../nub/index.ts"

/**
 * Returns a new array with duplicate elements removed
 * 
 * Alias for `nub`. The term "unique" is more commonly used in JavaScript/TypeScript
 * while "nub" comes from Haskell. Both functions are identical - they remove
 * duplicate elements from an array, keeping only the first occurrence of each
 * unique element. Uses SameValueZero equality for comparison.
 * 
 * @see nub - The primary implementation with comprehensive documentation
 * @param array - The array to remove duplicates from
 * @returns New array with only unique elements
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 1, 4]) // [1, 2, 3, 4]
 * unique(["a", "b", "a", "c"]) // ["a", "b", "c"]
 * unique([]) // []
 * unique([NaN, NaN, 0, -0]) // [NaN, 0]
 * 
 * // Remove duplicate IDs
 * const ids = [1, 2, 3, 2, 1, 4, 3]
 * unique(ids) // [1, 2, 3, 4]
 * ```
 */
const unique = nub

export default unique
