import not from "../../logic/not/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import findIndex from "../findIndex/index.ts"
import slice from "../slice/index.ts"

//++ Drops leading elements while predicate is true
export default function dropWhile<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function dropWhileWithPredicate(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isArray(array)) {
			const validArray = array as Array<T>
			const dropIndex = findIndex(
				function stopDropping(element: T, index: number) {
					return not(predicate(element, index, validArray))
				},
			)(validArray)

			if (isEqual(dropIndex)(-1)) {
				return []
			}

			return slice(dropIndex)(undefined)(validArray)
		}

		return []
	}
}

//?? [EXAMPLE] `dropWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1]) // [5, 7, 2, 1]  (keeps everything from 5 onward)`
//?? [EXAMPLE] `dropWhile((x: number) => x % 2 === 0)([2, 4, 6, 7, 8, 10]) // [7, 8, 10]  (keeps from first odd number onward)`
//?? [EXAMPLE] `dropWhile((x: number) => x < 5)([])         // []`
//?? [EXAMPLE] `dropWhile((x: number) => false)([1, 2, 3])  // [1, 2, 3]`
//?? [EXAMPLE] `dropWhile((x: number) => true)([1, 2, 3])   // []`
//?? [EXAMPLE] `dropWhile((x: number) => x > 0)(null)       // []`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Drop leading whitespace characters
 | dropWhile((c: string) => c === " ")([..." hello world"])
 | // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Drop objects while inactive
 | dropWhile((item: { active: boolean }) => !item.active)([
 |   { id: 1, active: false },
 |   { id: 2, active: false },
 |   { id: 3, active: true },
 |   { id: 4, active: false }
 | ])
 | // [{ id: 3, active: true }, { id: 4, active: false }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Skip header rows
 | dropWhile((row: string) => row.startsWith("#"))([
 |   "# Header 1",
 |   "# Header 2",
 |   "Data row 1",
 |   "# Not a header"
 | ])
 | // ["Data row 1", "# Not a header"]
 | ```
 */
