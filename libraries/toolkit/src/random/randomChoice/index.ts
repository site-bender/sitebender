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
 * randomChoice(['red', 'green', 'blue'])
 * // 'green'
 * 
 * randomChoice([1, 2, 3, 4, 5])
 * // 3
 * 
 * // Random from Set
 * const colors = new Set(['red', 'green', 'blue'])
 * randomChoice(colors)
 * // 'blue'
 * 
 * const numbers = new Set([10, 20, 30, 40])
 * randomChoice(numbers)
 * // 30
 * 
 * // Random user selection
 * const users = ['Alice', 'Bob', 'Charlie', 'Diana']
 * const winner = randomChoice(users)
 * // 'Charlie'
 * 
 * // Random action
 * const actions = ['attack', 'defend', 'heal', 'flee']
 * const enemyAction = randomChoice(actions)
 * // 'defend'
 * 
 * // Random configuration
 * const themes = ['light', 'dark', 'auto']
 * const defaultTheme = randomChoice(themes)
 * // 'dark'
 * 
 * // Random emoji from Set (ensures uniqueness)
 * const reactions = new Set(['👍', '❤️', '😂', '😮', '😢', '😡'])
 * const reaction = randomChoice(reactions)
 * // '😂'
 * 
 * // Random test data
 * const testCases = [
 *   { input: 1, expected: 2 },
 *   { input: 5, expected: 10 },
 *   { input: -1, expected: 0 }
 * ]
 * const testCase = randomChoice(testCases)
 * // { input: 5, expected: 10 }
 * 
 * // Empty collections return undefined
 * randomChoice([])
 * // undefined
 * 
 * randomChoice(new Set())
 * // undefined
 * 
 * // Invalid input returns undefined
 * randomChoice(null)
 * // undefined
 * 
 * randomChoice('not a collection')
 * // undefined
 * 
 * // Works with any element type
 * randomChoice([true, false, null, undefined, 0, ''])
 * // null (or any other element)
 * 
 * randomChoice(new Set([true, false, null, undefined, 0, '']))
 * // false (or any other element)
 * ```
 * @property Impure - Non-deterministic pseudo-random selection
 * @property Uniform - Each element has equal probability
 * @property Type-Preserving - Works with both Arrays and Sets
 * @property Safe - Returns undefined for invalid/empty inputs
 */
const randomChoice = <T>(
	collection: Array<T> | Set<T> | null | undefined
): T | undefined => {
	if (collection == null) {
		return undefined
	}
	
	// Handle Arrays
	if (Array.isArray(collection)) {
		if (collection.length === 0) {
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