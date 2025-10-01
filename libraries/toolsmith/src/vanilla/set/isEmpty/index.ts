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
