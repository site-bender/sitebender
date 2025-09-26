import head from "../head/index.ts"

/*++
 | Returns the first element of an array
 |
 | Alias for `head`. The term "first" is more intuitive in JavaScript/TypeScript
 | while "head" comes from Haskell and traditional functional programming.
 | Both functions are identical - they safely return the first element of an
 | array or undefined if the array is empty.
 */
const first = head

//?? [EXAMPLE] `first([1, 2, 3])  // 1`
//?? [EXAMPLE] `first(["a", "b"]) // "a"`
//?? [EXAMPLE] `first([])         // undefined`

//>> [RELATED] [head](../head/index.ts)

export default first
