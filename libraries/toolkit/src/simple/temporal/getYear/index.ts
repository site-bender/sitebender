import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the year from a Temporal date or datetime
 *
 * Extracts the year component from a Temporal PlainDate, PlainDateTime,
 * PlainYearMonth, or ZonedDateTime. The year value depends on the calendar
 * system of the date. For the ISO calendar, negative years represent BCE
 * (Before Common Era). Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param date - The Temporal object to get year from
 * @returns The year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const currentYear = Temporal.PlainDate.from("2024-03-15")
 * getYear(currentYear)                    // 2024
 *
 * const ancientDate = Temporal.PlainDate.from("-000753-04-21")
 * getYear(ancientDate)                    // -753 (BCE)
 *
 * // With different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * getYear(datetime)                       // 2024
 *
 * const yearMonth = Temporal.PlainYearMonth.from("2024-09")
 * getYear(yearMonth)                      // 2024
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-12-31T23:59:59-05:00[America/New_York]"
 * )
 * getYear(zonedDateTime)                  // 2024
 *
 * // Composition example
 * const getDecade = (date: Temporal.PlainDate): number => {
 *   const year = getYear(date)
 *   return year === null ? 0 : Math.floor(year / 10) * 10
 * }
 *
 * const getFiscalYear = (
 *   date: Temporal.PlainDate,
 *   fiscalStart: number = 4
 * ): number => {
 *   const year = getYear(date)
 *   if (year === null) return 0
 *   return date.month < fiscalStart ? year - 1 : year
 * }
 *
 * // Edge cases
 * getYear(null)                           // null
 * getYear(undefined)                      // null
 * ```
 * @pure
 * @safe
 */
const getYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
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
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.year
	} catch {
		return null
	}
}

export default getYear
