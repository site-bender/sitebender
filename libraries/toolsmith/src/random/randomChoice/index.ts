import isEmpty from "../../vanilla/array/isEmpty/index.ts"
import isNullish from "../../vanilla/validation/isNullish/index.ts"

//++ Selects a random element from an Array or Set
export default function randomChoice<T>(
	collection: Array<T> | Set<T> | null | undefined,
): T | undefined {
	if (isNullish(collection)) {
		return undefined
	}

	if (Array.isArray(collection)) {
		if (isEmpty(collection)) {
			return undefined
		}
		const index = Math.floor(Math.random() * collection.length)
		return collection[index]
	}

	if (collection instanceof Set) {
		if (collection.size === 0) {
			return undefined
		}
		const items = Array.from(collection)
		const index = Math.floor(Math.random() * items.length)
		return items[index]
	}

	return undefined
}

//?? [EXAMPLE] randomChoice(['red', 'green', 'blue']) // 'green'
//?? [EXAMPLE] randomChoice([1, 2, 3, 4, 5]) // 3
//?? [EXAMPLE] randomChoice(new Set(['red', 'green', 'blue'])) // 'blue'
/*??
 | [EXAMPLE]
 | const users = ['Alice', 'Bob', 'Charlie', 'Diana']
 | const winner = randomChoice(users) // 'Charlie'
 |
 | const testCases = [
 |   { input: 1, expected: 2 },
 |   { input: 5, expected: 10 }
 | ]
 | const testCase = randomChoice(testCases)
 |
 | [GOTCHA] Returns undefined for empty collections or invalid inputs
 |
*/
