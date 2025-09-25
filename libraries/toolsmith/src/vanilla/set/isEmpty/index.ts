import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Checks if a Set is empty (has no elements)
export default function isEmpty<T>(
	set: Set<T> | null | undefined,
): boolean {
	if (isNullish(set) || not(set instanceof Set)) {
		return true
	}

	return set.size === 0
}

//?? [EXAMPLE] isEmpty(new Set()) // true
//?? [EXAMPLE] isEmpty(new Set([1, 2, 3])) // false
//?? [EXAMPLE] isEmpty(new Set([1])) // false
//?? [EXAMPLE] isEmpty(new Set([undefined])) // false (has one element)
//?? [EXAMPLE] isEmpty(new Set([null])) // false (has one element)
//?? [EXAMPLE] isEmpty(null) // true
//?? [EXAMPLE] isEmpty(undefined) // true

//?? [GOTCHA] Returns true for non-Set values including nullish values
