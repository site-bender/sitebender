import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Removes duplicate elements from an array (alias for unique)
 |
 | Returns a new array with all duplicate elements removed, keeping only
 | the first occurrence of each unique element. Uses SameValueZero equality
 | for comparison. The term "nub" comes from Haskell and means to remove
 | duplicates. Order is preserved based on first occurrence. This is
 | functionally identical to unique but provided for those familiar with
 | Haskell terminology.
 */
const nub = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	// Use Set for efficient deduplication (O(n) complexity)
	// Set uses SameValueZero equality, which is what we want
	return [...new Set(array)]
}

export default nub

//?? [EXAMPLE] `nub([1, 2, 3, 2, 1, 4]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `nub(["apple", "banana", "apple", "cherry"]) // ["apple", "banana", "cherry"]`
//?? [EXAMPLE] `nub([1, "1", 2, "2", 1]) // [1, "1", 2, "2"]`
//?? [EXAMPLE] `nub([NaN, 1, NaN, 2]) // [NaN, 1, 2]`
//?? [EXAMPLE] `nub([]) // []`
//?? [EXAMPLE] `nub(null) // []`
//?? [EXAMPLE] `nub([7, 7, 7]) // [7]`
