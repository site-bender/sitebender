/**
 * Adds a Temporal.Duration to a date, time, or datetime
 *
 * Immutably adds a duration to any Temporal object that supports addition.
 * Returns a new Temporal object with the duration added. Negative duration
 * values subtract time. Handles all duration units appropriately based on
 * the target type. Returns null for invalid inputs to support safe error handling.
 *
 * @curried (duration) => (temporal) => result
 * @param duration - The Temporal.Duration to add
 * @param temporal - The Temporal object to add duration to
 * @returns New temporal object with duration added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const weekDuration = Temporal.Duration.from({ weeks: 2 })
 * addDuration(weekDuration)(date)         // PlainDate 2024-03-29
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * const complexDuration = Temporal.Duration.from({
 *   days: 3,
 *   hours: 5,
 *   minutes: 45
 * })
 * addDuration(complexDuration)(datetime)  // PlainDateTime 2024-03-18T16:15:45
 *
 * // Negative durations (subtraction)
 * const subtractWeek = Temporal.Duration.from({ days: -7 })
 * addDuration(subtractWeek)(date)         // PlainDate 2024-03-08
 *
 * // Partial application for reusable operations
 * const addWeek = addDuration(Temporal.Duration.from({ weeks: 1 }))
 * const addMonth = addDuration(Temporal.Duration.from({ months: 1 }))
 * const addQuarter = addDuration(Temporal.Duration.from({ months: 3 }))
 *
 * const today = Temporal.Now.plainDateISO()
 * addWeek(today)                          // 1 week from today
 * addMonth(today)                         // 1 month from today
 *
 * // Project milestone calculations
 * function calculateMilestone(
 *   start: Temporal.PlainDate,
 *   phase: { weeks?: number; days?: number }
 * ): Temporal.PlainDate | null {
 *   const duration = Temporal.Duration.from(phase)
 *   return addDuration(duration)(start)
 * }
 *
 * // Null handling
 * addDuration(weekDuration)(null)         // null
 * addDuration(null)(date)                 // null
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
import isNullish from "../../../validation/isNullish"

const addDuration = (duration: Temporal.Duration | null | undefined) =>
(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.PlainYearMonth
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| null => {
	if (isNullish(temporal) || isNullish(duration)) {
		return null
	}

	// Check if it's a valid Temporal type that supports add
	if (
		!(temporal instanceof Temporal.PlainDate) &&
		!(temporal instanceof Temporal.PlainDateTime) &&
		!(temporal instanceof Temporal.PlainTime) &&
		!(temporal instanceof Temporal.PlainYearMonth) &&
		!(temporal instanceof Temporal.ZonedDateTime) &&
		!(temporal instanceof Temporal.Instant)
	) {
		return null
	}

	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	try {
		return temporal.add(duration)
	} catch {
		return null
	}
}

export default addDuration
