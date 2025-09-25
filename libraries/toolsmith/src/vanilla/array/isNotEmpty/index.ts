import isArray from "../../validation/isArray/index.ts"

//++ Checks if an array is not empty (has at least one element)
export default function isNotEmpty<T>(array: ReadonlyArray<T>): boolean {
	return isArray(array) && array.length > 0
}

//?? [EXAMPLE] isNotEmpty([]) // false
//?? [EXAMPLE] isNotEmpty([1, 2, 3]) // true
//?? [EXAMPLE] isNotEmpty([undefined]) // true (has one element)
//?? [EXAMPLE] isNotEmpty([null]) // true (has one element)
