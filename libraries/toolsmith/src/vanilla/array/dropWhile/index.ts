import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Drops elements from the beginning of an array while predicate returns true
 |
 | Returns a new array with elements from the beginning removed as long as
 | the predicate returns true. Once predicate returns false, all remaining
 | elements are included. Does not continue checking after the first false.
 */
const dropWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	const dropIndex = array.findIndex((element, index) =>
		not(predicate(element, index, array))
	)

	return dropIndex === -1 ? [] : array.slice(dropIndex)
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

export default dropWhile
