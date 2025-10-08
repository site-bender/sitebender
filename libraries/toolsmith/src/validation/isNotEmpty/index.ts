import isArray from "@sitebender/toolsmith/validation/isArray/index.ts"

//++ Checks if an array is not empty (has at least one element)
//++ Simplified version for Architect PoC - handles arrays only
export default function isNotEmpty<T>(
	array: ReadonlyArray<T> | null | undefined,
): boolean {
	return isArray(array) && array.length > 0
}
