import isNullish from "../../validation/isNullish/index.ts"
import replaceAt from "../replaceAt/index.ts"

/*++
 | Replaces the last occurrence of a value using a transformation function
 |
 | Uses strict equality (===) to find the item. Returns original array
 | if item not found. Only replaces the last occurrence.
 */
const replaceLast =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		return replaceAt<T>(array.lastIndexOf(target))(replacer)(array)
	}

export default replaceLast

//?? [EXAMPLE] `replaceLast(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 2, 3, 20, 4]`
//?? [EXAMPLE] `replaceLast("old")(s => "new")(["old", "test", "old"]) // ["old", "test", "new"]`
//?? [EXAMPLE] `replaceLast(5)(n => n)([1, 2, 3]) // [1, 2, 3] (not found)`
//?? [EXAMPLE] `replaceLast("ERROR")(s => "WARNING")(["ERROR", "info", "ERROR"]) // ["ERROR", "info", "WARNING"]`
//?? [EXAMPLE] `replaceLast(null)(() => 0)([1, null, 2, null]) // [1, null, 2, 0]`
//?? [EXAMPLE] `replaceLast(1)(n => n * 2)(null) // []`
