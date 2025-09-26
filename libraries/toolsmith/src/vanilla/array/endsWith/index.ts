import is from "../../validation/is/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Checks if an array ends with a given suffix array
export default function endsWith<T>(
	suffix: ReadonlyArray<T> | null | undefined,
) {
	return function checkEndsWith(
		array: ReadonlyArray<T> | null | undefined,
	): boolean {
		if (isNullish(array)) {
			return false
		}

		if (isNullish(suffix)) {
			return false
		}

		if (suffix.length === 0) {
			return true
		}

		if (suffix.length > array.length) {
			return false
		}

		const startIndex = array.length - suffix.length

		return suffix.every(function checkElement(value, i) {
			return is(value)(array[startIndex + i])
		})
	}
}

//?? [EXAMPLE] `endsWith([3, 4])([1, 2, 3, 4])        // true`
//?? [EXAMPLE] `endsWith([2, 3])([1, 2, 3, 4])        // false`
//?? [EXAMPLE] `endsWith([])([1, 2, 3])               // true (empty suffix)`
//?? [EXAMPLE] `endsWith([1, 2, 3, 4])([1, 2, 3])     // false (suffix too long)`
//?? [EXAMPLE] `endsWith(null)([1, 2, 3])             // false`
//?? [EXAMPLE] `endsWith([1])(null)                   // false`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Check file extensions match
 | const hasExtension = endsWith(['.', 't', 's'])
 | hasExtension(['f', 'i', 'l', 'e', '.', 't', 's']) // true
 | ```
 */
