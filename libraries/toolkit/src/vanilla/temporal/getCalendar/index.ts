import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the calendar system from a Temporal date or datetime
 *
 * Extracts the calendar identifier from a Temporal PlainDate, PlainDateTime,
 * PlainYearMonth, PlainMonthDay, or ZonedDateTime. The calendar system
 * determines how dates are interpreted and displayed (e.g., 'iso8601',
 * 'hebrew', 'islamic', 'japanese', 'chinese'). Returns null for invalid
 * inputs to support safe error handling.
 *
 * @param date - The Temporal object to get calendar from
 * @returns The calendar identifier string, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const isoDate = Temporal.PlainDate.from("2024-03-15")
 * getCalendar(isoDate)                    // "iso8601"
 *
 * const isoDateTime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getCalendar(isoDateTime)                // "iso8601"
 *
 * // Other calendar systems
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784, month: 12, day: 15, calendar: "hebrew"
 * })
 * getCalendar(hebrewDate)                 // "hebrew"
 *
 * // Works with various types
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * getCalendar(yearMonth)                  // "iso8601"
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getCalendar(zonedDateTime)              // "iso8601"
 *
 * // Edge cases
 * getCalendar(null)                       // null
 * getCalendar(undefined)                  // null
 * getCalendar("2024-03-15")              // null (string, not Temporal)
 *
 * // Calendar comparison
 * const haveSameCalendar = (
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean => getCalendar(date1) === getCalendar(date2)
 *
 * // Multi-calendar display
 * const displayInCalendars = (
 *   date: Temporal.PlainDate,
 *   calendars: Array<string>
 * ): Record<string, string> =>
 *   calendars.reduce((result, cal) => {
 *     try {
 *       result[cal] = date.withCalendar(cal).toString()
 *     } catch {
 *       result[cal] = "Not available"
 *     }
 *     return result
 *   }, {} as Record<string, string>)
 * ```
 * @pure
 * @safe
 */
const getCalendar = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): string | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.calendarId
	} catch {
		return null
	}
}

export default getCalendar
