/**
 * Checks if a date falls on a weekend (Saturday or Sunday)
 *
 * Determines whether a given Temporal date or datetime represents a weekend day.
 * Weekends are defined as Saturday (6) and Sunday (7) in the ISO 8601 system.
 * Returns true for Saturday-Sunday, false for Monday-Friday or invalid inputs.
 * This is useful for scheduling, calendar applications, and leisure planning.
 *
 * @param date - The Temporal object to check
 * @returns True if weekend (Sat-Sun), false if weekday or invalid
 * @example
 * ```typescript
 * // Basic usage - Saturday and Sunday are weekends
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * isWeekend(saturday)                     // true
 *
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * isWeekend(sunday)                       // true
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isWeekend(friday)                       // false
 *
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * isWeekend(monday)                       // false
 *
 * // With different Temporal types
 * const saturdayNight = Temporal.PlainDateTime.from("2024-03-16T23:59:59")
 * isWeekend(saturdayNight)                // true
 *
 * const zonedWeekend = Temporal.ZonedDateTime.from(
 *   "2024-03-16T12:00:00-04:00[America/New_York]"
 * )
 * isWeekend(zonedWeekend)                 // true
 *
 * // Composition example
 * const filterWeekends = (dates: Array<Temporal.PlainDate>) =>
 *   dates.filter(isWeekend)
 *
 * const isOvertimeEligible = (dt: Temporal.PlainDateTime): boolean =>
 *   isWeekend(dt) || dt.hour < 9 || dt.hour >= 17
 *
 * // Functional approach to find next weekend
 * const getNextWeekend = (date: Temporal.PlainDate): Temporal.PlainDate => {
 *   const next = date.add({ days: 1 })
 *   return isWeekend(next) ? next : getNextWeekend(next)
 * }
 *
 * // Edge cases
 * isWeekend(null)                         // false
 * isWeekend(undefined)                    // false
 * ```
 * @pure
 * @safe
 * @predicate
 */
import isNullish from "../../../validation/isNullish"

const isWeekend = (
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
		return dayOfWeek === 6 || dayOfWeek === 7
	} catch {
		return false
	}
}

export default isWeekend
