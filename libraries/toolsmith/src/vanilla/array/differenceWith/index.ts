import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
Returns elements in the first array that are not in the second array using a comparator

Like difference but uses a custom comparator function to determine equality
between elements. Returns a new array containing only the elements from the
first array for which no equivalent element exists in the second array
according to the comparator. Useful when comparing complex objects or when
you need custom equality logic.
*/
const differenceWith = <T, U>(
	comparator: (a: T, b: U) => boolean,
) =>
(
	subtrahend: ReadonlyArray<U> | null | undefined,
) =>
(
	minuend: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(minuend)) {
		return []
	}

	if (
		isNullish(subtrahend) ||
		subtrahend.length === 0
	) {
		return [...minuend]
	}

	return minuend.filter((element) =>
		not(
			subtrahend.some((excludeElement) => comparator(element, excludeElement)),
		)
	)
}

//?? [EXAMPLE] `differenceWith((a, b) => a === b)([])([1, 2, 3])     // [1, 2, 3]`
//?? [EXAMPLE] `differenceWith((a, b) => a === b)([1, 2])([])        // []`
//?? [EXAMPLE] `differenceWith(() => true)([1])([2, 3])              // [] (always match)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Case-insensitive comparison
 | const caseInsensitive = (a: string, b: string) =>
 |   a.toLowerCase() === b.toLowerCase()
 | differenceWith(caseInsensitive)(["B", "C"])(["a", "B", "c", "D"])
 | // ["a", "D"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Object comparison by property
 | const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 | const users = [{ id: 1 }, { id: 2 }, { id: 3 }]
 | const exclude = [{ id: 2 }]
 | differenceWith(byId)(exclude)(users)
 | // [{ id: 1 }, { id: 3 }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Number comparison with tolerance
 | const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.01
 | differenceWith(approxEqual)([1.001, 2.002])([1.0, 1.5, 2.0, 3.0])
 | // [1.5, 3.0]
 | ```
 */

export default differenceWith
