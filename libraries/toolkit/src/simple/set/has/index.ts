/**
 * Checks if a Set contains an element
 *
 * Tests whether an element exists in the Set using SameValueZero equality.
 * This is a curried wrapper around the native Set.has method, useful for
 * functional composition and partial application.
 *
 * @param element - Element to check for
 * @param set - Set to check in
 * @returns True if element exists in Set, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * has(3)(new Set([1, 2, 3, 4, 5]))      // true
 * has(6)(new Set([1, 2, 3, 4, 5]))      // false
 * has("hello")(new Set(["hello", "world"]))  // true
 *
 * // Object references
 * const obj = { id: 1 }
 * has(obj)(new Set([obj, { id: 2 }]))   // true
 * has({ id: 1 })(new Set([{ id: 1 }]))  // false (different reference)
 *
 * // Special values
 * has(NaN)(new Set([1, 2, NaN, 3]))     // true
 * has(0)(new Set([-0]))                 // true (SameValueZero)
 *
 * // Edge cases
 * has(1)(new Set())      // false
 * has(1)(null)          // false
 * has(1)(undefined)     // false
 * ```
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const has = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): boolean => {
	if (set == null || !(set instanceof Set)) {
		return false
	}

	return set.has(element)
}

export default has
