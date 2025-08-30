import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Constrains a date between minimum and maximum bounds
 *
 * Immutably clamps a Temporal date or datetime to fall within the specified
 * range. If the date is before the minimum, returns the minimum. If after
 * the maximum, returns the maximum. Otherwise returns the original date.
 * Works with PlainDate, PlainDateTime, PlainTime, and other Temporal types.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param min - The minimum bound (inclusive)
 * @param max - The maximum bound (inclusive)
 * @param date - The date/time to constrain
 * @returns Date constrained to range, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const min = Temporal.PlainDate.from("2024-01-01")
 * const max = Temporal.PlainDate.from("2024-12-31")
 * const clamp2024 = clampDate(min)(max)
 *
 * clamp2024(Temporal.PlainDate.from("2024-06-15"))  // 2024-06-15 (within)
 * clamp2024(Temporal.PlainDate.from("2023-11-01"))  // 2024-01-01 (clamped)
 * clamp2024(Temporal.PlainDate.from("2025-02-01"))  // 2024-12-31 (clamped)
 *
 * // With PlainDateTime
 * const minTime = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const maxTime = Temporal.PlainDateTime.from("2024-03-15T17:00:00")
 * const clampBusinessHours = clampDate(minTime)(maxTime)
 *
 * clampBusinessHours(Temporal.PlainDateTime.from("2024-03-15T10:30:00"))
 * // 2024-03-15T10:30:00 (within hours)
 *
 * // With PlainTime
 * const clampWorkHours = clampDate(
 *   Temporal.PlainTime.from("09:00:00")
 * )(
 *   Temporal.PlainTime.from("17:00:00")
 * )
 * clampWorkHours(Temporal.PlainTime.from("22:00:00"))  // 17:00:00
 *
 * // Null handling
 * clampDate(min)(max)(null)               // null
 * clampDate(null)(max)(date)              // null
 * ```
 * @pure
 * @immutable
 * @safe - Returns null for invalid inputs
 * @curried
 */
const clampDate = <
	T extends {
		compare(other: T): number
	},
>(min: T | null | undefined) =>
(max: T | null | undefined) =>
(date: T | null | undefined): T | null => {
	if (isNullish(min) || isNullish(max) || isNullish(date)) {
		return null
	}

	// Ensure all parameters have a compare method
	if (
		typeof min.compare !== "function" ||
		typeof max.compare !== "function" ||
		typeof date.compare !== "function"
	) {
		return null
	}

	try {
		// Compare with minimum
		if (date.compare(min) < 0) {
			return min
		}

		// Compare with maximum
		if (date.compare(max) > 0) {
			return max
		}

		// Within bounds
		return date
	} catch {
		return null
	}
}

export default clampDate
