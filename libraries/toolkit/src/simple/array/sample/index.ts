import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns a random element from the array
 *
 * Selects a single random element from the array using uniform distribution.
 * Each element has an equal probability of being selected. Returns undefined
 * for empty arrays or null/undefined inputs. Uses Math.random() internally.
 *
 * @param array - Array to sample from
 * @returns Random element from the array, or undefined if array is empty
 * @impure
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * sample([1, 2, 3, 4, 5])  // 3 (random element)
 *
 * // String array
 * sample(["red", "green", "blue"])  // "blue" (random)
 *
 * // Object selection
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ]
 * sample(users)  // { id: 2, name: "Bob" }
 *
 * // Weighted selection (duplicate for higher probability)
 * sample(["common", "common", "rare"])  // "common" (66% chance)
 *
 * // Edge cases
 * sample([42])        // 42 (single element)
 * sample([])          // undefined
 * sample(null)        // undefined
 * ```
 */
const sample = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

export default sample
