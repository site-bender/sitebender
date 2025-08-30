import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Checks if two Temporal objects are equal
 *
 * Compares two Temporal objects for equality using their built-in equals method.
 * Works with any Temporal type that has an equals method (PlainDate, PlainTime,
 * PlainDateTime, ZonedDateTime, Duration, etc.). Returns false for type mismatches
 * or null/undefined values. More precise than using compare() === 0.
 *
 * @param first - The first Temporal object to compare
 * @param second - The second Temporal object to compare
 * @returns True if objects are equal, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const date1 = Temporal.PlainDate.from("2024-03-15")
 * const date2 = Temporal.PlainDate.from("2024-03-15")
 * const date3 = Temporal.PlainDate.from("2024-03-16")
 *
 * equals(date1)(date2)                    // true
 * equals(date1)(date3)                    // false
 *
 * // With different types
 * const time1 = Temporal.PlainTime.from("10:30:00")
 * const time2 = Temporal.PlainTime.from("10:30:00")
 * equals(time1)(time2)                    // true
 *
 * const dur1 = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * const dur2 = Temporal.Duration.from({ minutes: 150 })
 * equals(dur1)(dur2)                      // true (same total time)
 *
 * // Edge cases
 * equals(null)(date2)                     // false
 * equals(date1)(null)                     // false
 *
 * // Partial application
 * const isToday = equals(Temporal.Now.plainDateISO())
 * const isNoon = equals(Temporal.PlainTime.from("12:00:00"))
 *
 * // Filtering duplicates
 * const removeDuplicates = <T extends { equals(other: T): boolean }>(
 *   items: Array<T>
 * ): Array<T> =>
 *   items.filter((item, index, array) =>
 *     !array.slice(0, index).some(equals(item))
 *   )
 *
 * // High precision
 * const precise1 = Temporal.PlainTime.from("10:30:00.123456789")
 * const precise2 = Temporal.PlainTime.from("10:30:00.123456789")
 * equals(precise1)(precise2)              // true (exact match)
 * ```
 * @pure
 * @safe
 * @curried
 * @predicate
 */
const equals = <T extends { equals(other: T): boolean }>(
	first: T | null | undefined,
) =>
(
	second: T | null | undefined,
): boolean => {
	if (isNullish(first) || isNullish(second)) {
		return false
	}

	// Check if both have equals method and are same type
	if (typeof first.equals !== "function") {
		return false
	}

	try {
		// Use Temporal's built-in equals method
		return first.equals(second)
	} catch {
		// Type mismatch or other error
		return false
	}
}

export default equals
