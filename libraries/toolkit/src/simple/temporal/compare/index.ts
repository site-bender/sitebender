import isNullish from "../../validation/isNullish/index.ts"

/**
 * Compares two Temporal objects and returns their relative ordering
 *
 * Performs a three-way comparison of two Temporal objects, returning -1 if
 * the first is earlier, 1 if the first is later, and 0 if they are equal.
 * Works with any Temporal type that has a compare method (PlainDate,
 * PlainDateTime, PlainTime, etc.). Returns null for invalid inputs.
 *
 * @param first - The first Temporal object to compare
 * @param second - The second Temporal object to compare
 * @returns -1 if first < second, 0 if equal, 1 if first > second, null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const date1 = Temporal.PlainDate.from("2024-03-15")
 * const date2 = Temporal.PlainDate.from("2024-03-20")
 * 
 * compare(date1)(date2)                   // -1 (date1 is earlier)
 * compare(date2)(date1)                   // 1 (date2 is later)
 * compare(date1)(date1)                   // 0 (equal)
 *
 * // Sorting arrays
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-20"),
 *   Temporal.PlainDate.from("2024-03-10"),
 *   Temporal.PlainDate.from("2024-03-15")
 * ]
 * const sorted = [...dates].sort((a, b) => compare(a)(b))
 * // [2024-03-10, 2024-03-15, 2024-03-20]
 *
 * // Finding min/max
 * const findEarliest = <T extends { compare(other: T): number }>(
 *   dates: Array<T>
 * ): T | null =>
 *   dates.length === 0 ? null :
 *   dates.reduce((earliest, date) =>
 *     compare(date)(earliest) < 0 ? date : earliest
 *   )
 *
 * // Checking relationships
 * const isBefore = <T extends { compare(other: T): number }>(
 *   first: T
 * ) => (second: T) => compare(first)(second) < 0
 *
 * const deadline = Temporal.PlainDate.from("2024-12-31")
 * const isBeforeDeadline = isBefore(deadline)
 * isBeforeDeadline(Temporal.PlainDate.from("2024-06-15"))  // true
 *
 * // Null handling
 * compare(null)(date2)                    // null
 * compare(date1)(null)                    // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
const compare = <
	T extends {
		compare(other: T): number
	},
>(first: T | null | undefined) =>
(second: T | null | undefined): number | null => {
	if (isNullish(first) || isNullish(second)) {
		return null
	}

	// Ensure both parameters have a compare method
	if (typeof first.compare !== "function") {
		return null
	}

	try {
		// Use Temporal's built-in compare method
		return first.compare(second)
	} catch {
		return null
	}
}

export default compare
