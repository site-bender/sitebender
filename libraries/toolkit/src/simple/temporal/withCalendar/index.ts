import isNullish from "../../../simple/validation/isNullish/index.ts"

/**
 * Changes the calendar system of a date
 *
 * Converts a Temporal date/datetime to use a different calendar system while
 * preserving the same instant in time. Supports various calendar systems like
 * Islamic, Hebrew, Buddhist, Chinese, and others. The date representation may
 * change but the underlying point in time remains the same. Returns null for
 * invalid inputs to support safe error handling.
 * @param calendar - The calendar system to use (e.g., "iso8601", "hebrew", "islamic", "buddhist", "chinese", "japanese")
 * @param temporal - The Temporal date to convert
 * @returns Date with new calendar system, or null if invalid
 * @example
 * ```typescript
 * // Convert to different calendar systems
 * const isoDate = Temporal.PlainDate.from("2024-03-15")
 * withCalendar("hebrew")(isoDate)         // PlainDate in Hebrew calendar
 * withCalendar("islamic")(isoDate)        // PlainDate in Islamic calendar
 * withCalendar("buddhist")(isoDate)       // PlainDate in Buddhist calendar
 * withCalendar("japanese")(isoDate)       // PlainDate with Japanese era
 *
 * // Works with different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * withCalendar("hebrew")(datetime)        // PlainDateTime in Hebrew calendar
 *
 * // Round-trip conversion preserves date
 * const original = Temporal.PlainDate.from("2024-03-15")
 * const hebrew = withCalendar("hebrew")(original)
 * const backToISO = withCalendar("iso8601")(hebrew)
 * // backToISO equals original date
 *
 * // Multi-calendar display using functional approach
 * const displayInCalendars = (
 *   date: Temporal.PlainDate,
 *   calendars: Array<string>
 * ): Map<string, Temporal.PlainDate | null> => {
 *   return calendars.reduce((results, cal) => {
 *     return results.set(cal, withCalendar(cal)(date))
 *   }, new Map<string, Temporal.PlainDate | null>())
 * }
 *
 * // Batch conversion with partial application
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-01"),
 *   Temporal.PlainDate.from("2024-06-15")
 * ]
 * const toHebrew = withCalendar("hebrew")
 * dates.map(toHebrew)  // Array of dates in Hebrew calendar
 *
 * // Invalid inputs return null
 * withCalendar("hebrew")(null)            // null
 * withCalendar("invalid")(isoDate)        // null (invalid calendar)
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const withCalendar = (calendar: string) =>
(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay
	| null => {
	if (isNullish(temporal)) {
		return null
	}

	// Validate temporal is a type that supports calendar
	const isValidTemporal = temporal instanceof Temporal.PlainDate ||
		temporal instanceof Temporal.PlainDateTime ||
		temporal instanceof Temporal.PlainYearMonth ||
		temporal instanceof Temporal.PlainMonthDay

	if (!isValidTemporal) {
		return null
	}

	try {
		// Validate calendar by attempting to create a test date
		Temporal.PlainDate.from({ year: 2000, month: 1, day: 1, calendar })

		// Use withCalendar method to change the calendar system
		// @ts-ignore - TypeScript doesn't recognize the common withCalendar method
		return temporal.withCalendar(calendar)
	} catch {
		return null
	}
}

export default withCalendar
