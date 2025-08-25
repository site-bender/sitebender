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
 * // ISO 8601 calendar (default)
 * const isoDate = Temporal.PlainDate.from("2024-03-15")
 * getCalendar(isoDate)                    // "iso8601"
 *
 * const isoDateTime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getCalendar(isoDateTime)                // "iso8601"
 *
 * // Other calendar systems
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 12,
 *   day: 15,
 *   calendar: "hebrew"
 * })
 * getCalendar(hebrewDate)                 // "hebrew"
 *
 * const japaneseDate = Temporal.PlainDate.from({
 *   year: 2024,
 *   month: 3,
 *   day: 15,
 *   calendar: "japanese"
 * })
 * getCalendar(japaneseDate)               // "japanese"
 *
 * const islamicDate = Temporal.PlainDate.from({
 *   year: 1445,
 *   month: 9,
 *   day: 5,
 *   calendar: "islamic"
 * })
 * getCalendar(islamicDate)                // "islamic"
 *
 * // Works with PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * getCalendar(yearMonth)                  // "iso8601"
 *
 * const hebrewYearMonth = Temporal.PlainYearMonth.from({
 *   year: 5784,
 *   month: 12,
 *   calendar: "hebrew"
 * })
 * getCalendar(hebrewYearMonth)            // "hebrew"
 *
 * // Works with PlainMonthDay
 * const monthDay = Temporal.PlainMonthDay.from("03-15")
 * getCalendar(monthDay)                   // "iso8601"
 *
 * // Works with ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getCalendar(zonedDateTime)              // "iso8601"
 *
 * // Checking calendar type for logic
 * function formatForCalendar(date: Temporal.PlainDate): string {
 *   const calendar = getCalendar(date)
 *
 *   switch (calendar) {
 *     case "hebrew":
 *       return `Hebrew date: ${date.day}/${date.month}/${date.year}`
 *     case "islamic":
 *       return `Islamic date: ${date.day}/${date.month}/${date.year}`
 *     case "japanese":
 *       return `Japanese date: ${date.era} ${date.eraYear}年${date.month}月${date.day}日`
 *     default:
 *       return date.toString()
 *   }
 * }
 *
 * // Calendar conversion helper
 * function convertCalendar(
 *   date: Temporal.PlainDate,
 *   targetCalendar: string
 * ): Temporal.PlainDate | null {
 *   const currentCalendar = getCalendar(date)
 *   if (currentCalendar === targetCalendar) {
 *     return date
 *   }
 *
 *   try {
 *     return date.withCalendar(targetCalendar)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * const gregorian = Temporal.PlainDate.from("2024-03-15")
 * const hebrew = convertCalendar(gregorian, "hebrew")
 * getCalendar(hebrew)                     // "hebrew"
 *
 * // Null handling
 * getCalendar(null)                       // null
 * getCalendar(undefined)                  // null
 * getCalendar("2024-03-15")              // null (string, not Temporal object)
 * getCalendar(new Date())                 // null (Date, not Temporal)
 *
 * // Calendar comparison
 * function haveSameCalendar(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean {
 *   return getCalendar(date1) === getCalendar(date2)
 * }
 *
 * const date1 = Temporal.PlainDate.from("2024-03-15")
 * const date2 = Temporal.PlainDate.from("2024-04-20")
 * haveSameCalendar(date1, date2)          // true (both iso8601)
 *
 * const date3 = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 1,
 *   day: 1,
 *   calendar: "hebrew"
 * })
 * haveSameCalendar(date1, date3)          // false (different calendars)
 *
 * // Multi-calendar date display
 * function displayInCalendars(
 *   date: Temporal.PlainDate,
 *   calendars: Array<string>
 * ): Record<string, string> {
 *   const result: Record<string, string> = {}
 *
 *   for (const cal of calendars) {
 *     try {
 *       const converted = date.withCalendar(cal)
 *       result[cal] = converted.toString()
 *     } catch {
 *       result[cal] = "Not available"
 *     }
 *   }
 *
 *   return result
 * }
 *
 * const today = Temporal.Now.plainDateISO()
 * displayInCalendars(today, ["iso8601", "hebrew", "islamic"])
 * // { iso8601: "2024-03-15", hebrew: "5784-12-05", islamic: "1445-09-05" }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Universal - Works with all Temporal date/time types that have calendars
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
	if (date == null) {
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
