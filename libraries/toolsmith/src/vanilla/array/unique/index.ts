import nub from "../nub/index.ts"

/*++
 | Returns a new array with duplicate elements removed
 |
 | Alias for `nub`. The term "unique" is more commonly used in JavaScript/TypeScript
 | while "nub" comes from Haskell. Both functions are identical - they remove
 | duplicate elements from an array, keeping only the first occurrence of each
 | unique element. Uses SameValueZero equality for comparison.
 */
const unique = nub

export default unique

//?? [EXAMPLE] `unique([1, 2, 2, 3, 1, 4]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `unique(["a", "b", "a", "c"]) // ["a", "b", "c"]`
//?? [EXAMPLE] `unique([]) // []`
//?? [EXAMPLE] `unique([NaN, NaN, 0, -0]) // [NaN, 0]`
//?? [EXAMPLE] `unique([1, 2, 3, 2, 1, 4, 3]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `unique(null) // []`
