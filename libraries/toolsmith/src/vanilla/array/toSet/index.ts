import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Converts an array to a Set
 |
 | Creates a new Set from an array, automatically removing duplicate values.
 | The Set will contain only unique elements from the original array,
 | maintaining insertion order. Returns empty Set for null/undefined.
 */
export default function toSet<T>(array: Array<T> | null | undefined): Set<T> {
	if (isNullish(array)) {
		return new Set<T>()
	}
	return new Set(array)
}

//?? [EXAMPLE] `toSet([1, 2, 3, 2, 1]) // Set(3) { 1, 2, 3 }`
//?? [EXAMPLE] `toSet(["a", "b", "a"]) // Set(2) { "a", "b" }`
//?? [EXAMPLE] `toSet([]) // Set(0) {}`
//?? [EXAMPLE] `Array.from(toSet([1, 2, 2, 3])) // [1, 2, 3]`
//?? [EXAMPLE] `toSet(null) // Set(0) {}`
//?? [EXAMPLE] `toSet([1, 1, 1, 1]) // Set(1) { 1 }`
