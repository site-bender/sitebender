import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Removes consecutive duplicates with custom equality
const dropRepeatsWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	return array.reduce((acc: Array<T>, curr, index) => {
		if (index === 0 || not(comparator(curr, array[index - 1]))) {
			return [...acc, curr]
		}
		return acc
	}, [])
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

export default dropRepeatsWith
