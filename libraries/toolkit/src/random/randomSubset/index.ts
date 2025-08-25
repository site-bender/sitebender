import randomInteger from "../randomInteger/index.ts"

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
 * @curried (collection) => (size?) => same type as input
 * @param collection - Array or Set to select from
 * @param size - Optional subset size (defaults to random between 0 and length)
 * @returns Random subset as same type as input, or null if invalid
 * @example
 * ```typescript
 * // Random subset with specified size
 * randomSubset([1, 2, 3, 4, 5])(2)
 * // [3, 5]
 *
 * randomSubset(['a', 'b', 'c', 'd', 'e'])(3)
 * // ['b', 'd', 'e']
 *
 * // Random subset with random size
 * randomSubset([1, 2, 3, 4, 5])()
 * // [2, 4] (size was randomly chosen as 2)
 *
 * randomSubset([1, 2, 3, 4, 5])()
 * // [1, 2, 3, 4, 5] (size was randomly chosen as 5 - full array)
 *
 * randomSubset([1, 2, 3, 4, 5])()
 * // [] (size was randomly chosen as 0 - empty array)
 *
 * // Works with Sets
 * const colors = new Set(['red', 'green', 'blue', 'yellow', 'purple'])
 * randomSubset(colors)(2)
 * // Set(['blue', 'yellow'])
 *
 * randomSubset(colors)()
 * // Set(['red', 'purple', 'green']) (random size 3)
 *
 * // Team selection
 * const players = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
 * const team = randomSubset(players)(3)
 * // ['Bob', 'Diana', 'Frank']
 *
 * // Random feature flags
 * const features = new Set(['feature-a', 'feature-b', 'feature-c', 'feature-d'])
 * const enabledFeatures = randomSubset(features)(2)
 * // Set(['feature-b', 'feature-d'])
 *
 * // Random sampling without replacement
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const sample = randomSubset(data)(5)
 * // [2, 5, 7, 8, 10]
 *
 * // Lottery draw
 * const tickets = Array.from({ length: 100 }, (_, i) => i + 1)
 * const winners = randomSubset(tickets)(5)
 * // [12, 34, 67, 89, 91]
 *
 * // Partial application for repeated sampling
 * const deck = Array.from({ length: 52 }, (_, i) => i + 1)
 * const drawHand = randomSubset(deck)
 * const hand1 = drawHand(5)  // [3, 12, 28, 41, 50]
 * const hand2 = drawHand(5)  // [7, 15, 22, 38, 44]
 *
 * // Size larger than collection returns full collection
 * randomSubset([1, 2, 3])(10)
 * // [1, 2, 3]
 *
 * randomSubset(new Set([1, 2, 3]))(10)
 * // Set([1, 2, 3])
 *
 * // Empty collection returns empty
 * randomSubset([])(5)
 * // []
 *
 * randomSubset(new Set())(5)
 * // Set()
 *
 * // Negative size returns empty collection
 * randomSubset([1, 2, 3])(-1)
 * // []
 *
 * randomSubset(new Set([1, 2, 3]))(-5)
 * // Set()
 *
 * // Invalid inputs return null
 * randomSubset(null)(2)
 * // null
 *
 * randomSubset('not a collection')(2)
 * // null
 * ```
 * @property Impure - Non-deterministic pseudo-random selection
 * @property Type-Preserving - Returns same type as input (Array/Set)
 * @property No-Replacement - Elements selected without replacement
 * @property Safe - Returns null for invalid inputs
 */
const randomSubset = <T>(
	collection: Array<T> | Set<T> | null | undefined,
) =>
(
	size: number | null | undefined = undefined,
): Array<T> | Set<T> | null => {
	if (collection == null) {
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
	if (size == null || size === undefined) {
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

	// Fisher-Yates shuffle for first n elements
	// This is more efficient than shuffling the entire array
	for (let i = 0; i < subsetSize; i++) {
		const j = i + Math.floor(Math.random() * (collectionSize - i))
		const temp = items[i]
		items[i] = items[j]
		items[j] = temp
	}

	// Take the first subsetSize elements
	const subset = items.slice(0, subsetSize)

	// Return same type as input
	if (Array.isArray(collection)) {
		return subset
	} else {
		return new Set(subset)
	}
}

export default randomSubset
