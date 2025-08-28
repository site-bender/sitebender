/**
 * Gets the day of year from a Temporal date or datetime
 *
 * Extracts the day of year (1-366) from a Temporal PlainDate, PlainDateTime,
 * or ZonedDateTime. Returns 1 for January 1st through 365/366 for December 31st
 * (depending on leap year). The value depends on the calendar system of the date.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get day of year from
 * @returns The day of year (1-366), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const jan1 = Temporal.PlainDate.from("2024-01-01")
 * getDayOfYear(jan1)                      // 1 (first day of year)
 *
 * const dec31 = Temporal.PlainDate.from("2024-12-31")
 * getDayOfYear(dec31)                     // 366 (leap year)
 *
 * const dec31NonLeap = Temporal.PlainDate.from("2023-12-31")
 * getDayOfYear(dec31NonLeap)              // 365 (non-leap year)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * getDayOfYear(datetime)                  // 186 (Independence Day)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDayOfYear(zonedDateTime)             // 75
 *
 * // Leap day
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * getDayOfYear(leapDay)                   // 60
 *
 * // Progress through year calculator
 * const yearProgress = (date: Temporal.PlainDate): number => {
 *   const dayOfYear = getDayOfYear(date)
 *   if (dayOfYear === null) return 0
 *   return (dayOfYear / date.daysInYear) * 100
 * }
 *
 * yearProgress(Temporal.PlainDate.from("2024-07-01"))  // ~50.27%
 *
 * // Null handling
 * getDayOfYear(null)                      // null
 * getDayOfYear(undefined)                 // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs  
 * @calendarAware Respects the calendar system of the input date
 */
const getDayOfYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
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
		return date.dayOfYear
	} catch {
		return null
	}
}

export default getDayOfYear
