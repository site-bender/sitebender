import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the total duration in a specific unit
 *
 * Converts a Temporal.Duration to a total numeric value in the specified unit.
 * Unlike the duration properties which show individual components, this returns
 * the entire duration expressed as a single unit (e.g., total seconds, total
 * days). Handles fractional values for precise calculations. Returns null for
 * invalid inputs to support safe error handling.
 * @param unit - The unit to measure: "years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds", "microseconds", "nanoseconds"
 * @param duration - The Temporal.Duration to measure
 * @returns Total duration in the specified unit, or null if invalid
 * @example
 * ```typescript
 * // Convert duration to different units
 * const duration = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * totalDuration("minutes")(duration)      // 150 (2.5 hours = 150 minutes)
 * totalDuration("seconds")(duration)      // 9000
 * totalDuration("hours")(duration)        // 2.5
 *
 * // Complex duration with fractional values
 * const complex = Temporal.Duration.from({
 *   days: 1, hours: 12, minutes: 30, seconds: 45
 * })
 * totalDuration("hours")(complex)         // 36.5125
 * totalDuration("seconds")(complex)       // 131445
 *
 * // Partial application for specific units
 * const toMinutes = totalDuration("minutes")
 * const toSeconds = totalDuration("seconds")
 * const workDay = Temporal.Duration.from({ hours: 8 })
 * toMinutes(workDay)                      // 480
 * toSeconds(workDay)                      // 28800
 *
 * // Calculate billable hours
 * const calculateBillableHours = (
 *   sessions: Array<Temporal.Duration>
 * ): number => {
 *   const getHours = totalDuration("hours")
 *   return sessions
 *     .map(getHours)
 *     .filter((h): h is number => h !== null)
 *     .reduce((sum, h) => sum + h, 0)
 * }
 *
 * // Batch conversion
 * const durations = [
 *   Temporal.Duration.from({ minutes: 30 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 15 })
 * ]
 * durations.map(totalDuration("minutes"))  // [30, 75]
 *
 * // Invalid inputs return null
 * totalDuration("hours")(null)            // null
 * totalDuration("invalid")(duration)      // null (invalid unit)
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const totalDuration = (unit: Temporal.DateTimeUnit | string) =>
(
	duration: Temporal.Duration | null | undefined,
): number | null => {
	if (isNullish(duration)) {
		return null
	}

	// Validate duration is a Temporal.Duration
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	// Validate unit is a valid DateTimeUnit
	const validUnits = [
		"years",
		"months",
		"weeks",
		"days",
		"hours",
		"minutes",
		"seconds",
		"milliseconds",
		"microseconds",
		"nanoseconds",
	]

	if (!validUnits.includes(unit)) {
		return null
	}

	try {
		// Use the total method to get the duration in the specified unit
		return duration.total({ unit: unit as Temporal.DateTimeUnit })
	} catch {
		return null
	}
}

export default totalDuration
