import is from "../../validation/is/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import length from "../length/index.ts"
import subtract from "../../math/subtract/index.ts"
import all from "../all/index.ts"

//++ Checks if an array ends with a given suffix array
export default function endsWith<T>(
	suffix: ReadonlyArray<T> | null | undefined,
) {
	return function endsWithSuffix(
		array: ReadonlyArray<T> | null | undefined,
	): boolean {
		if (isArray(suffix) && isArray(array)) {
			if (isEmpty(suffix)) {
				return true
			}

			const arrayLen = length(array)
			const suffixLen = length(suffix)

			if (suffixLen <= arrayLen) {
				const startIndex = subtract(suffixLen)(arrayLen) as number

				return all<T>(function checkElement(value, i) {
					return is(value)(array[startIndex + i])
				})(suffix as Array<T>)
			}
		}
		return false
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
