import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the end of week for a given date
 *
 * Creates a PlainDate representing the last day of the week for the given date.
 * The week start day is configurable (default is Monday = 1). Days are numbered
 * 1-7 where 1 is Monday and 7 is Sunday (ISO 8601 standard). Useful for weekly
 * reports, calendar views, and scheduling. Works with PlainDate and PlainDateTime.
 * Returns null for invalid inputs.
 *
 * @param weekStartDay - Day week starts on (1=Mon to 7=Sun, default 1)
 * @param date - The date to get end of week for
 * @returns PlainDate of the last day of the week, or null if invalid
 * @example
 * ```typescript
 * // Basic usage (Monday as week start)
 * const date = Temporal.PlainDate.from("2024-03-15")  // Friday
 * endOfWeek()(date)                       // PlainDate 2024-03-17 (Sunday)
 * endOfWeek(1)(date)                      // PlainDate 2024-03-17 (Sunday)
 *
 * // Sunday as week start (US convention)
 * endOfWeek(7)(date)                      // PlainDate 2024-03-16 (Saturday)
 *
 * // Different week conventions
 * const endOfWeekISO = endOfWeek(1)       // Monday start (ISO)
 * const endOfWeekUS = endOfWeek(7)        // Sunday start (US)
 * const endOfWeekMiddleEast = endOfWeek(6) // Saturday start
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * endOfWeek()(datetime)                   // PlainDate 2024-03-17
 *
 * // Edge cases
 * endOfWeek()(null)                       // null
 * endOfWeek()(undefined)                  // null
 *
 * // Calendar weeks generation
 * const getCalendarWeeks = (month: Temporal.PlainYearMonth) => {
 *   const weeks = []
 *   const firstDay = month.toPlainDate({ day: 1 })
 *   const lastDay = month.toPlainDate({ day: month.daysInMonth })
 *
 *   const daysFromWeekStart = (firstDay.dayOfWeek - 1 + 7) % 7
 *   const current = firstDay.subtract({ days: daysFromWeekStart })
 *
 *   const buildWeeks = (date: Temporal.PlainDate): Array<any> =>
 *     Temporal.PlainDate.compare(date, lastDay) > 0 ? [] :
 *     [{ start: date, end: endOfWeek()(date) }].concat(
 *       buildWeeks(date.add({ days: 7 }))
 *     )
 *
 *   return buildWeeks(current)
 * }
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
const endOfWeek = (weekStartDay: number = 1) =>
(
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDate | null => {
	if (isNullish(date)) {
		return null
	}

	try {
		// Convert to PlainDate if needed
		let plainDate: Temporal.PlainDate

		if (date instanceof Temporal.PlainDateTime) {
			plainDate = date.toPlainDate()
		} else if (date instanceof Temporal.PlainDate) {
			plainDate = date
		} else {
			return null
		}

		// Validate weekStartDay (1-7)
		const startDay = weekStartDay >= 1 && weekStartDay <= 7
			? weekStartDay
			: 1

		// Calculate days until end of week
		// dayOfWeek: 1=Monday, 7=Sunday
		const currentDay = plainDate.dayOfWeek ?? 1

		// Calculate end day (day before start day)
		const endDay = startDay === 1 ? 7 : startDay - 1

		// Calculate days to add
		let daysToAdd: number
		if (currentDay <= endDay) {
			daysToAdd = endDay - currentDay
		} else {
			daysToAdd = 7 - currentDay + endDay
		}

		// Return the end of week
		return plainDate.add({ days: daysToAdd })
	} catch {
		return null
	}
}

export default endOfWeek
