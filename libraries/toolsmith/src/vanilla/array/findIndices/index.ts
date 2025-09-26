import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Returns all indices of elements that satisfy the predicate
 |
 | Finds and returns an array of all indices where the predicate function
 | returns true for the element at that index. Unlike findIndex which returns
 | only the first match, this returns all matching indices. Useful for locating
 | all occurrences, pattern matching, or multi-element operations.
 */
const findIndices = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<number> => {
	if (isNullish(array)) {
		return []
	}

	return array.reduce<Array<number>>((indices, value, index) => {
		return predicate(value, index, array) ? [...indices, index] : indices
	}, [])
}

//?? [EXAMPLE] `findIndices((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])  // [1, 3, 5]`
//?? [EXAMPLE] `findIndices((x: string) => x === "a")(["a", "b", "a", "c"])  // [0, 2]`
//?? [EXAMPLE] `findIndices((x: number) => x > 100)([1, 2, 3])  // [] (no matches)`
//?? [EXAMPLE] `findIndices(() => true)([])                     // [] (empty array)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // With complex predicates
 | const users = [
 |   { name: "Alice", active: true },
 |   { name: "Bob", active: false },
 |   { name: "Charlie", active: true }
 | ]
 | findIndices(u => u.active)(users)  // [0, 2]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const findEvens = findIndices((n: number) => n % 2 === 0)
 | findEvens([1, 2, 3, 4, 5])  // [1, 3]
 | ```
 */

export default findIndices
