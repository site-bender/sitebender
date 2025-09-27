import not from "../../logic/not/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import filter from "../filter/index.ts"
import some from "../some/index.ts"

//++ Set difference with custom equality
export default function differenceWith<T, U>(
	comparator: (a: T, b: U) => boolean,
) {
	return function differenceWithComparator(
		subtrahend: ReadonlyArray<U> | null | undefined,
	) {
		return function differenceWithSubtrahend(
			minuend: ReadonlyArray<T> | null | undefined,
		): Array<T> {
			if (isArray(minuend)) {
				if (isArray(subtrahend) && not(isEmpty(subtrahend))) {
					return filter(function notInSubtrahend(element: T) {
						return not(
							some(function matches(excludeElement: U) {
								return comparator(element, excludeElement)
							})(subtrahend as Array<U>),
						)
					})(minuend as Array<T>)
				}

				return [...minuend]
			}

			return []
		}
	}
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
