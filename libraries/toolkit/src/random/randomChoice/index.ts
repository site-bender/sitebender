import isNullish from "../../simple/validation/isNullish/index.ts"
import isEmpty from "../../simple/array/isEmpty/index.ts"

/**
 * Selects a random element from an Array or Set
 *
 * Returns a randomly selected element from the provided collection using
 * Math.random(). Each element has an equal probability of being selected.
 * Maintains the input type: Arrays return elements, Sets return elements.
 * Returns undefined for empty collections or invalid inputs.
 *
 * ⚠️ IMPURE: This function is non-deterministic and returns different
 * values each time it's called.
 *
 * @param collection - Array or Set to select from
 * @returns Random element from collection, or undefined if empty/invalid
 * @example
 * ```typescript
 * // Random from array
 * randomChoice(['red', 'green', 'blue'])  // 'green'
 * randomChoice([1, 2, 3, 4, 5])          // 3
 * 
 * // Random from Set
 * const colors = new Set(['red', 'green', 'blue'])
 * randomChoice(colors)  // 'blue'
 * 
 * // Random selection
 * const users = ['Alice', 'Bob', 'Charlie', 'Diana']
 * const winner = randomChoice(users)  // 'Charlie'
 * 
 * // Random test data
 * const testCases = [
 *   { input: 1, expected: 2 },
 *   { input: 5, expected: 10 }
 * ]
 * const testCase = randomChoice(testCases)
 * 
 * // Edge cases
 * randomChoice([])         // undefined
 * randomChoice(new Set())  // undefined
 * randomChoice(null)       // undefined
 * ```
 * @impure
 * @safe
 */
const randomChoice = <T>(
	collection: Array<T> | Set<T> | null | undefined,
): T | undefined => {
	if (isNullish(collection)) {
		return undefined
	}

	// Handle Arrays
	if (Array.isArray(collection)) {
		if (isEmpty(collection)) {
			return undefined
		}
		const index = Math.floor(Math.random() * collection.length)
		return collection[index]
	}

	// Handle Sets
	if (collection instanceof Set) {
		if (collection.size === 0) {
			return undefined
		}
		const items = Array.from(collection)
		const index = Math.floor(Math.random() * items.length)
		return items[index]
	}

	// Invalid input type
	return undefined
}

export default randomChoice
