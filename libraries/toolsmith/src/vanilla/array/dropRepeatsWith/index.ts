import isNotEmpty from "../isNotEmpty/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import length from "../length/index.ts"
import reduce from "../reduce/index.ts"
import _dropRepeatsReducer from "./_dropRepeatsReducer/index.ts"

//++ Removes consecutive duplicates with custom equality
export default function dropRepeatsWith<T>(
	comparator: (a: T, b: T) => boolean,
) {
	return function dropRepeatsWithComparator(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNotEmpty(array)) {
			const validArray = array as Array<T>
			if (isEqual(length(validArray))(1)) {
				return [...validArray]
			}

			return reduce(function dropRepeats(acc: Array<T>, curr: T) {
				return _dropRepeatsReducer(comparator, acc, curr)
			})([])(validArray)
		}

		return []
	}
}

//?? [EXAMPLE] `dropRepeatsWith((a, b) => a === b)([])           // []`
//?? [EXAMPLE] `dropRepeatsWith((a, b) => a === b)([1])          // [1]`
//?? [EXAMPLE] `dropRepeatsWith(() => true)([1, 2, 3, 4])        // [1]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Case-insensitive comparison
 | const caseInsensitive = (a: string, b: string) =>
 |   a.toLowerCase() === b.toLowerCase()
 | dropRepeatsWith(caseInsensitive)(["Hello", "HELLO", "world", "WORLD", "foo"])
 | // ["Hello", "world", "foo"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Object comparison by property
 | const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 | const items = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 2 }, { id: 1 }]
 | dropRepeatsWith(byId)(items)
 | // [{ id: 1 }, { id: 2 }, { id: 1 }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Numeric tolerance
 | const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 | dropRepeatsWith(approxEqual)([1.0, 1.05, 1.08, 1.2, 1.25, 1.5])
 | // [1.0, 1.2, 1.5]
 | ```
 */
