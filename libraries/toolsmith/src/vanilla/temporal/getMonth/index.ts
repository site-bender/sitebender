import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the month component from a Temporal date or datetime
 *
 * Extracts the month component from a Temporal PlainDate, PlainDateTime,
 * PlainYearMonth, PlainMonthDay, or ZonedDateTime. Returns the month number
 * where 1 represents January through 12 for December. The value depends on
 * the calendar system of the date. Returns null for invalid inputs to support
 * safe error handling.
 *
 * @param date - The Temporal object to get month from
 * @returns The month number (1-12 for Gregorian), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const january = Temporal.PlainDate.from("2024-01-15")
 * getMonth(january)                       // 1 (January)
 *
 * const june = Temporal.PlainDate.from("2024-06-15")
 * getMonth(june)                          // 6 (June)
 *
 * const december = Temporal.PlainDate.from("2024-12-31")
 * getMonth(december)                      // 12 (December)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getMonth(datetime)                      // 3 (March)
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-09")
 * getMonth(yearMonth)                     // 9 (September)
 *
 * // With PlainMonthDay
 * const monthDay = Temporal.PlainMonthDay.from("02-14")
 * getMonth(monthDay)                      // 2 (February - Valentine's Day)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-10-31T18:00:00-05:00[America/New_York]"
 * )
 * getMonth(zonedDateTime)                 // 10 (October - Halloween)
 *
 * // Month name helper
 * const getMonthName = (date: Temporal.PlainDate): string => {
 *   const monthNames = [
 *     "January", "February", "March", "April", "May", "June",
 *     "July", "August", "September", "October", "November", "December"
 *   ]
 *   const month = getMonth(date)
 *   return month ? monthNames[month - 1] : "Unknown"
 * }
 *
 * getMonthName(Temporal.PlainDate.from("2024-01-15"))  // "January"
 * getMonthName(Temporal.PlainDate.from("2024-06-15"))  // "June"
 *
 * // Quarter calculation
 * const getQuarter = (date: Temporal.PlainDate): number => {
 *   const month = getMonth(date)
 *   return month === null ? 0 : Math.ceil(month / 3)
 * }
 *
 * getQuarter(Temporal.PlainDate.from("2024-02-15"))  // 1 (Q1)
 * getQuarter(Temporal.PlainDate.from("2024-05-15"))  // 2 (Q2)
 *
 * // Monthly grouping (functional)
 * const groupByMonth = (
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> =>
 *   dates.reduce((grouped, date) => {
 *     const month = getMonth(date)
 *     if (month !== null) {
 *       const group = grouped.get(month) ?? []
 *       grouped.set(month, [...group, date])
 *     }
 *     return grouped
 *   }, new Map<number, Array<Temporal.PlainDate>>())
 *
 * // Null handling
 * getMonth(null)                          // null
 * getMonth(undefined)                     // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @calendarAware Respects the calendar system of the input
 * @range Returns 1-12 for Gregorian calendar, varies for others
 */
const getMonth = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
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
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	if (date instanceof Temporal.PlainDate) return date.month
	if (date instanceof Temporal.PlainDateTime) return date.month
	if (date instanceof Temporal.PlainYearMonth) return date.month
	if (date instanceof Temporal.PlainMonthDay) {
		const code = date.monthCode // e.g. "M02" or "M08L"
		const digits = code.replace(/[^0-9]/g, "")
		const num = parseInt(digits, 10)
		return Number.isFinite(num) ? num : null
	}
	if (date instanceof Temporal.ZonedDateTime) return date.month
	return null
}

export default getMonth
