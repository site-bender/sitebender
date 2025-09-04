import isNullish from "../../validation/isNullish/index.ts"

/**
 * Replaces the first occurrence of a value using a transformation function
 *
 * Uses strict equality (===) to find the item. Returns original array
 * if item not found. Only replaces first occurrence.
 *
 * @param target - The value to find and replace
 * @param replacer - Function to transform the found item
 * @param array - The array to search in
 * @returns New array with first occurrence replaced
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * replaceFirst(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 2, 4]
 * replaceFirst("old")(s => "new")(["old", "test", "old"]) // ["new", "test", "old"]
 * replaceFirst(5)(n => n)([1, 2, 3]) // [1, 2, 3] (not found)
 *
 * // Update first error
 * const fixFirstError = replaceFirst("ERROR")(s => "WARNING")
 * fixFirstError(["ERROR", "info", "ERROR"]) // ["WARNING", "info", "ERROR"]
 * ```
 */
const replaceFirst =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const idx = (array as Array<T>).indexOf(target)
		if (idx === -1) return [...array]
		const out = [...array]
		out[idx] = replacer(out[idx] as T)
		return out
	}

export default replaceFirst
