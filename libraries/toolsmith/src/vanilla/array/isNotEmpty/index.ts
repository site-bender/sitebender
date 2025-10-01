import isArray from "../../validation/isArray/index.ts"

//++ Checks if an array has elements
export default function isNotEmpty<T>(
	array?: ReadonlyArray<T> | null,
): boolean {
	return isArray(array) && array.length > 0
}
