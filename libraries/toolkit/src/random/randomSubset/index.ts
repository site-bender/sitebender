import randomInteger from "../randomInteger/index.ts"
import isNullish from "../../simple/validation/isNullish/index.ts"

/**
 * Selects a random subset from an Array or Set
 *
 * Returns a randomly selected subset of elements from the provided collection.
 * If size is not specified, randomly chooses a size between 0 and the
 * collection length (inclusive of both empty and full collection).
 * Maintains the input type: Arrays return Arrays, Sets return Sets.
 * Elements are selected without replacement (no duplicates in result).
 *
 * ⚠️ IMPURE: This function is non-deterministic and returns different
 * values each time it's called.
 *
 * @param collection - Array or Set to select from
 * @param size - Optional subset size (defaults to random between 0 and length)
 * @returns Random subset as same type as input, or null if invalid
 * @example
 * ```typescript
 * // Random subset with specified size
 * randomSubset([1, 2, 3, 4, 5])(2)          // [3, 5]
 * randomSubset(['a', 'b', 'c', 'd', 'e'])(3) // ['b', 'd', 'e']
 * 
 * // Random subset with random size
 * randomSubset([1, 2, 3, 4, 5])()  // [2, 4] (random size)
 * 
 * // Works with Sets
 * const colors = new Set(['red', 'green', 'blue', 'yellow', 'purple'])
 * randomSubset(colors)(2)  // Set(['blue', 'yellow'])
 * 
 * // Team selection
 * const players = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
 * const team = randomSubset(players)(3)  // ['Bob', 'Diana', 'Frank']
 * 
 * // Partial application for repeated sampling
 * const deck = Array.from({ length: 52 }, (_, i) => i + 1)
 * const drawHand = randomSubset(deck)
 * const hand1 = drawHand(5)  // [3, 12, 28, 41, 50]
 * const hand2 = drawHand(5)  // [7, 15, 22, 38, 44]
 * 
 * // Edge cases
 * randomSubset([1, 2, 3])(10)  // [1, 2, 3] (size > length)
 * randomSubset([])(5)           // []
 * randomSubset(null)(2)         // null
 * ```
 * @curried
 * @impure
 * @safe
 */
const randomSubset = <T>(
	collection: Array<T> | Set<T> | null | undefined,
) =>
(
	size: number | null | undefined = undefined,
): Array<T> | Set<T> | null => {
	if (isNullish(collection)) {
		return null
	}

	// Get items as array for processing
	let items: Array<T>
	let collectionSize: number

	if (Array.isArray(collection)) {
		items = [...collection] // Clone to avoid mutation
		collectionSize = collection.length
	} else if (collection instanceof Set) {
		items = Array.from(collection)
		collectionSize = collection.size
	} else {
		return null
	}

	// Handle empty collections
	if (collectionSize === 0) {
		return Array.isArray(collection) ? [] : new Set()
	}

	// Determine subset size
	let subsetSize: number
	if (isNullish(size)) {
		// Random size between 0 and collection size
		subsetSize = randomInteger(0)(collectionSize)
	} else if (typeof size !== "number" || !isFinite(size)) {
		return null
	} else if (size < 0) {
		// Negative size returns empty collection
		subsetSize = 0
	} else {
		// Use provided size, but cap at collection size
		subsetSize = Math.min(Math.floor(size), collectionSize)
	}

	// Fisher-Yates shuffle for first n elements using functional approach
	const shuffled = items.reduce((acc, _, idx) => {
		if (idx >= subsetSize) return acc
		const j = idx + Math.floor(Math.random() * (collectionSize - idx))
		const result = [...acc]
		const temp = result[idx]
		result[idx] = result[j]
		result[j] = temp
		return result
	}, items)

	// Take the first subsetSize elements
	const subset = shuffled.slice(0, subsetSize)

	// Return same type as input
	if (Array.isArray(collection)) {
		return subset
	} else {
		return new Set(subset)
	}
}

export default randomSubset
