import isNullish from "../../validation/isNullish/index.ts"

/**
 * Checks if a date falls on a weekday (Monday-Friday)
 *
 * Determines whether a given Temporal date or datetime represents a weekday.
 * Weekdays are defined as Monday (1) through Friday (5) in the ISO 8601 system.
 * Returns true for Monday-Friday, false for Saturday-Sunday or invalid inputs.
 * This is useful for business logic, scheduling, and calendar applications.
 *
 * @param date - The Temporal object to check
 * @returns True if weekday (Mon-Fri), false if weekend or invalid
 * @example
 * ```typescript
 * // Basic usage - Monday-Friday are weekdays
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * isWeekday(monday)                       // true
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isWeekday(friday)                       // true
 *
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * isWeekday(saturday)                     // false
 *
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * isWeekday(sunday)                       // false
 *
 * // With different Temporal types
 * const weekdayMorning = Temporal.PlainDateTime.from("2024-03-13T09:00:00")
 * isWeekday(weekdayMorning)               // true (Wednesday)
 *
 * const zonedWeekday = Temporal.ZonedDateTime.from(
 *   "2024-03-14T15:00:00-04:00[America/New_York]"
 * )
 * isWeekday(zonedWeekday)                 // true (Thursday)
 *
 * // Composition example
 * const filterWeekdays = (dates: Array<Temporal.PlainDate>) =>
 *   dates.filter(isWeekday)
 *
 * const isBusinessHours = (dt: Temporal.PlainDateTime): boolean =>
 *   isWeekday(dt) && dt.hour >= 9 && dt.hour < 17
 *
 * // Functional approach to find next weekday
 * const getNextWeekday = (date: Temporal.PlainDate): Temporal.PlainDate => {
 *   const next = date.add({ days: 1 })
 *   return isWeekday(next) ? next : getNextWeekday(next)
 * }
 *
 * // Edge cases
 * isWeekday(null)                         // false
 * isWeekday(undefined)                    // false
 * ```
 * @pure
 * @safe
 * @predicate
 */
const isWeekday = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean => {
	if (isNullish(date)) {
		return false
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return false
	}

	try {
		const dayOfWeek = date.dayOfWeek
		return dayOfWeek >= 1 && dayOfWeek <= 5
	} catch {
		return false
	}
}

export default isWeekday
