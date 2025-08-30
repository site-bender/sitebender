/**
 * Returns the first day of the month for a date
 *
 * Creates a new Temporal date/datetime set to the first day of the month at
 * midnight (00:00:00.000000000). Preserves the year, month, and timezone
 * information while resetting the day to 1 and all time components to zero.
 * This is useful for monthly comparisons, billing cycles, and monthly aggregations.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal date to get start of month for
 * @returns Date/datetime at start of month, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * startOfMonth(date)                      // PlainDateTime 2024-03-01T00:00:00
 *
 * const endOfMonth = Temporal.PlainDate.from("2024-03-31")
 * startOfMonth(endOfMonth)                // PlainDateTime 2024-03-01T00:00:00
 *
 * const firstDay = Temporal.PlainDate.from("2024-03-01")
 * startOfMonth(firstDay)                  // PlainDateTime 2024-03-01T00:00:00
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123")
 * startOfMonth(datetime)                  // PlainDateTime 2024-03-01T00:00:00
 *
 * // With ZonedDateTime (preserves timezone)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfMonth(zonedDateTime)             // ZonedDateTime 2024-03-01T00:00:00-05:00[America/New_York]
 * // Note: March 1st is before DST, so offset is -05:00
 *
 * // Different months
 * const february = Temporal.PlainDate.from("2024-02-15")
 * startOfMonth(february)                  // PlainDateTime 2024-02-01T00:00:00
 *
 * const december = Temporal.PlainDate.from("2024-12-25")
 * startOfMonth(december)                  // PlainDateTime 2024-12-01T00:00:00
 *
 * // Leap year February
 * const leapFeb = Temporal.PlainDate.from("2024-02-29")
 * startOfMonth(leapFeb)                   // PlainDateTime 2024-02-01T00:00:00
 *
 * // Batch processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-29"),
 *   Temporal.PlainDate.from("2024-03-31")
 * ]
 * dates.map(startOfMonth)
 * // [2024-01-01T00:00:00, 2024-02-01T00:00:00, 2024-03-01T00:00:00]
 *
 * // Same month comparison  
 * const early = Temporal.PlainDate.from("2024-03-05")
 * const late = Temporal.PlainDate.from("2024-03-25")
 * const next = Temporal.PlainDate.from("2024-04-05")
 * 
 * startOfMonth(early).equals(startOfMonth(late))  // true (same month)
 * startOfMonth(early).equals(startOfMonth(next))  // false (different months)
 *
 * // Null handling
 * startOfMonth(null)                      // null
 * startOfMonth(undefined)                 // null
 * startOfMonth("2024-03-15")             // null (string, not Temporal)
 * 
 * // DST handling with ZonedDateTime
 * const dstDate = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfMonth(dstDate)                   // 2024-03-01T00:00:00-05:00[America/New_York]
 * // Note: March 1st is before DST, so offset is -05:00
 * ```
 * @pure
 * @safe
 */
import { isNullish } from "../../../validation/isNullish"

const startOfMonth = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		// Handle PlainDate by converting to PlainDateTime
		if (date instanceof Temporal.PlainDate) {
			const firstOfMonth = date.with({ day: 1 })
			return firstOfMonth.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// For PlainDateTime and ZonedDateTime, set to first day at midnight
		return date.with({
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			microsecond: 0,
			nanosecond: 0,
		})
	} catch {
		return null
	}
}

export default startOfMonth
