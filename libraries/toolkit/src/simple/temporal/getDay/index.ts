import { isNullish } from "../../../simple/validation/isNullish/index.ts"

/**
 * Gets the day of month from a Temporal date or datetime
 *
 * Extracts the day component (1-31) from a Temporal PlainDate, PlainDateTime,
 * PlainMonthDay, or ZonedDateTime. The day represents the day of the month
 * in the object's calendar system. Returns null for invalid inputs to support
 * safe error handling.
 *
 * @param date - The Temporal object to get day from
 * @returns The day of month (1-31), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * getDay(date)                            // 15
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getDay(datetime)                        // 15
 *
 * // With PlainMonthDay
 * const monthDay = Temporal.PlainMonthDay.from("03-15")
 * getDay(monthDay)                        // 15
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDay(zonedDateTime)                   // 15
 *
 * // Non-Gregorian calendars
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 12,
 *   day: 15,
 *   calendar: "hebrew"
 * })
 * getDay(hebrewDate)                      // 15
 *
 * // Null handling
 * getDay(null)                            // null
 * getDay(undefined)                       // null
 *
 * // Grouping dates by day (functional approach)
 * const groupByDay = (
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> =>
 *   dates.reduce((grouped, date) => {
 *     const day = getDay(date)
 *     if (day !== null) {
 *       const group = grouped.get(day) ?? []
 *       grouped.set(day, [...group, date])
 *     }
 *     return grouped
 *   }, new Map<number, Array<Temporal.PlainDate>>())
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @universal Works with all Temporal date/time types that have day component
 */
const getDay = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.day
	} catch {
		return null
	}
}

export default getDay
