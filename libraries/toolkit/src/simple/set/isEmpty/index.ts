/**
 * Checks if a Set is empty
 *
 * Returns true if the Set has no elements (size is 0), false otherwise.
 * This is a simple wrapper around checking the size property, but provides
 * a more semantic and functional interface.
 *
 * @param set - Set to check
 * @returns True if Set is empty, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isEmpty(new Set())           // true
 * isEmpty(new Set([1, 2, 3]))  // false
 * isEmpty(new Set([1]))        // false
 *
 * // Special values
 * isEmpty(new Set([undefined]))  // false (has one element)
 * isEmpty(new Set([null]))       // false (has one element)
 *
 * // Edge cases
 * isEmpty(null)       // true
 * isEmpty(undefined)  // true
 *
 * // Use in filtering
 * const sets = [new Set([1, 2]), new Set(), new Set(["a"])]
 * sets.filter(set => !isEmpty(set))  // [Set { 1, 2 }, Set { "a" }]
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isEmpty = <T>(
	set: Set<T> | null | undefined,
): boolean => {
	if (set == null || !(set instanceof Set)) {
		return true
	}

	return set.size === 0
}

export default isEmpty
