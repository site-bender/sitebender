/**
 * Combines PlainDate with PlainTime to create PlainDateTime
 *
 * Merges a date and time into a single datetime object. The resulting PlainDateTime
 * represents the specified time on the given date. If no time is provided, defaults
 * to midnight (00:00:00). This is useful for scheduling, combining user inputs,
 * and creating precise timestamps. This is a curried function for easy composition.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param time - The PlainTime to combine (or "00:00:00" if null)
 * @param date - The PlainDate to combine with
 * @returns Combined PlainDateTime, or null if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // Basic combination
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const time = Temporal.PlainTime.from("14:30:45")
 * withTime(time)(date)  // PlainDateTime 2024-03-15T14:30:45
 *
 * // Default to midnight when time is null
 * withTime(null)(date)  // PlainDateTime 2024-03-15T00:00:00
 *
 * // Partial application for batch processing
 * const at9AM = withTime(Temporal.PlainTime.from("09:00:00"))
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-03-16"),
 *   Temporal.PlainDate.from("2024-03-17")
 * ]
 * dates.map(at9AM)  // Array of morning datetimes
 *
 * // Invalid input handling
 * withTime(time)(null)  // null
 * withTime("invalid")(date)  // null
 * ```
 */
import isNullish from "../../validation/isNullish/index.ts"

export default function withTime(
	time: Temporal.PlainTime | string | null | undefined,
) {
	return function withTimeOnDate(
		date: Temporal.PlainDate | null | undefined,
	): Temporal.PlainDateTime | null {
		if (isNullish(date)) {
			return null
		}

		// Validate date is a PlainDate
		if (!(date instanceof Temporal.PlainDate)) {
			return null
		}

		try {
			// Handle null/undefined time - default to midnight
			if (isNullish(time)) {
				return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
			}

			// Handle PlainTime
			if (time instanceof Temporal.PlainTime) {
				return date.toPlainDateTime(time)
			}

			// Handle string - try to parse as PlainTime
			if (typeof time === "string") {
				try {
					const plainTime = Temporal.PlainTime.from(time)
					return date.toPlainDateTime(plainTime)
				} catch {
					return null
				}
			}

			return null
		} catch {
			return null
		}
	}
}
