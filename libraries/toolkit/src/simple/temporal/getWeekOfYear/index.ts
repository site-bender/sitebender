import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the ISO week number of the year from a Temporal date or datetime
 *
 * Returns the ISO 8601 week number (1-53) for a given date. ISO weeks start on
 * Monday and the first week of the year is the week containing the first Thursday
 * of January (or equivalently, the week containing January 4th). Some years have
 * 53 weeks. Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get week number from
 * @returns The ISO week number (1-53), or null if invalid
 * @example
 * ```typescript
 * // Basic usage - ISO week numbering
 * const midYear = Temporal.PlainDate.from("2024-07-15")
 * getWeekOfYear(midYear)                  // 29
 *
 * const firstWeek = Temporal.PlainDate.from("2024-01-04")
 * getWeekOfYear(firstWeek)                // 1 (Jan 4 always in week 1)
 *
 * // Year boundary edge cases
 * const lastWeek2024 = Temporal.PlainDate.from("2024-12-30")
 * getWeekOfYear(lastWeek2024)             // 1 (belongs to 2025 week 1)
 *
 * const week53_2020 = Temporal.PlainDate.from("2020-12-31")
 * getWeekOfYear(week53_2020)              // 53 (2020 had 53 weeks)
 *
 * // With different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-06-15T10:30:00")
 * getWeekOfYear(datetime)                 // 24
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getWeekOfYear(zonedDateTime)            // 11
 *
 * // Composition example - get ISO week year
 * const getISOWeekYear = (date: Temporal.PlainDate): number => {
 *   const week = getWeekOfYear(date)
 *   if (week === null) return date.year
 *   if (week === 1 && date.month === 12) return date.year + 1
 *   if (week >= 52 && date.month === 1) return date.year - 1
 *   return date.year
 * }
 *
 * // Functional approach to find week start
 * const getWeekStart = (date: Temporal.PlainDate): Temporal.PlainDate => {
 *   const daysFromMonday = (date.dayOfWeek - 1 + 7) % 7
 *   return date.subtract({ days: daysFromMonday })
 * }
 *
 * // Edge cases
 * getWeekOfYear(null)                     // null
 * getWeekOfYear(undefined)                // null
 * ```
 * @pure
 * @safe
 */
const getWeekOfYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
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
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.weekOfYear
	} catch {
		return null
	}
}

export default getWeekOfYear
