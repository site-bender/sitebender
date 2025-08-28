/**
 * Returns the start of day for a date (00:00:00)
 *
 * Creates a new Temporal date/datetime set to the beginning of the day (midnight,
 * 00:00:00.000000000). Preserves the date and timezone information while resetting
 * all time components to zero. This is useful for date comparisons, day boundaries,
 * and daily aggregations. Returns null for invalid inputs to support safe error
 * handling.
 *
 * @param date - The Temporal date to get start of day for
 * @returns Date/datetime at start of day, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123")
 * startOfDay(datetime)                     // PlainDateTime 2024-03-15T00:00:00
 *
 * const evening = Temporal.PlainDateTime.from("2024-03-15T23:59:59.999")
 * startOfDay(evening)                      // PlainDateTime 2024-03-15T00:00:00
 *
 * const midnight = Temporal.PlainDateTime.from("2024-03-15T00:00:00")
 * startOfDay(midnight)                     // PlainDateTime 2024-03-15T00:00:00 (unchanged)
 *
 * // With PlainDate (adds time component)
 * const date = Temporal.PlainDate.from("2024-03-15")
 * startOfDay(date)                         // PlainDateTime 2024-03-15T00:00:00
 *
 * // With ZonedDateTime (preserves timezone)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfDay(zonedDateTime)                // ZonedDateTime 2024-03-15T00:00:00-04:00[America/New_York]
 *
 * // DST transition handling (Spring forward)
 * const dstDay = Temporal.ZonedDateTime.from(
 *   "2024-03-10T14:00:00-04:00[America/New_York]"
 * )
 * startOfDay(dstDay)                       // 2024-03-10T00:00:00-05:00[America/New_York]
 * // Note: Midnight is before DST transition
 *
 * // DST transition handling (Fall back)
 * const fallBack = Temporal.ZonedDateTime.from(
 *   "2024-11-03T14:00:00-05:00[America/New_York]"
 * )
 * startOfDay(fallBack)                     // 2024-11-03T00:00:00-04:00[America/New_York]
 * // Note: Midnight is before DST transition
 *
 * // Batch processing
 * const dates = [
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-16T09:15:00"),
 *   Temporal.PlainDateTime.from("2024-03-17T23:59:59")
 * ]
 * dates.map(startOfDay)
 * // [2024-03-15T00:00:00, 2024-03-16T00:00:00, 2024-03-17T00:00:00]
 *
 * // DST transition handling
 * const springForward = Temporal.ZonedDateTime.from(
 *   "2024-03-10T14:00:00-04:00[America/New_York]"
 * )
 * startOfDay(springForward)                // 2024-03-10T00:00:00-05:00[America/New_York]
 * // Note: Midnight is before DST transition
 *
 * // Null handling
 * startOfDay(null)                         // null
 * startOfDay(undefined)                    // null
 * startOfDay("2024-03-15")                // null (string, not Temporal)
 *
 * // Date comparison example
 * const morning = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const evening = Temporal.PlainDateTime.from("2024-03-15T21:00:00") 
 * startOfDay(morning).equals(startOfDay(evening))  // true (same day)
 * ```
 * @pure
 * @safe
 */
const startOfDay = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (date == null) {
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
			return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// For PlainDateTime and ZonedDateTime, set time to midnight
		return date.with({
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

export default startOfDay
