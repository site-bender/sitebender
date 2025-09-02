import isNullish from "../../validation/isNullish/index.ts"

/**
 * Filters a Set based on a predicate function
 *
 * Creates a new Set containing only the elements that satisfy the predicate.
 * The predicate receives each element and should return true to keep it.
 * This is the Set equivalent of Array.filter, maintaining immutability.
 *
 * @param predicate - Function that returns true for elements to keep
 * @param set - Set to filter
 * @returns New Set with only elements that satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage
 * filter((n: number) => n > 2)(new Set([1, 2, 3, 4, 5]))  // Set { 3, 4, 5 }
 * filter((n: number) => n % 2 === 0)(new Set([1, 2, 3, 4]))  // Set { 2, 4 }
 *
 * // Filter objects
 * const active = filter((obj: { active: boolean }) => obj.active)
 * active(new Set([{ id: 1, active: true }, { id: 2, active: false }]))
 * // Set { { id: 1, active: true } }
 *
 * // Type guards
 * filter((x: unknown): x is number => typeof x === "number")(new Set([1, "two", 3]))
 * // Set { 1, 3 }
 *
 * // Edge cases
 * filter((x: number) => x > 0)(new Set())     // Set { }
 * filter((x: number) => x > 0)(null)         // Set { }
 * filter((x: number) => x > 10)(new Set([1, 2, 3]))  // Set { }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const filter = <T>(
	predicate: (value: T) => boolean,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set()
	}

	return new Set(Array.from(set).filter(predicate))
}

export default filter
