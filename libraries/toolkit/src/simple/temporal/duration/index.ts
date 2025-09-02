import isNullish from "../../validation/isNullish/index.ts"

/**
 * Creates a Temporal.Duration from a units specification object
 *
 * Constructs a duration from an object containing time units (years, months,
 * days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds).
 * All units are optional and default to 0. Negative values are allowed for
 * creating negative durations. Returns null for invalid inputs.
 *
 * @param units - Object specifying duration units
 * @returns New Temporal.Duration, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * duration({ days: 7 })                   // 7-day duration
 * duration({ hours: 2, minutes: 30 })     // 2.5-hour duration
 * duration({ months: 1, days: 15 })       // 1 month 15 days
 *
 * // Complex durations
 * duration({
 *   years: 1,
 *   months: 2,
 *   days: 15,
 *   hours: 3,
 *   minutes: 30
 * })  // 1 year, 2 months, 15 days, 3 hours, 30 minutes
 *
 * // Negative durations
 * duration({ days: -7 })                  // Negative 7-day duration
 * duration({ months: -1 })                // Negative 1 month
 *
 * // High precision
 * duration({
 *   seconds: 1,
 *   milliseconds: 500,
 *   microseconds: 250
 * })  // 1.50025 seconds
 *
 * // Edge cases
 * duration(null)                          // null
 * duration(undefined)                     // null
 * duration({})                            // Empty duration (all zeros)
 *
 * // With dates
 * const today = Temporal.Now.plainDateISO()
 * const nextWeek = today.add(duration({ weeks: 1 }))
 *
 * // Total duration from array
 * const sumDurations = (
 *   durations: Array<Temporal.Duration>
 * ): Temporal.Duration =>
 *   durations.reduce(
 *     (total, d) => total.add(d),
 *     Temporal.Duration.from({})
 *   )
 * ```
 * @pure
 * @safe
 */
const duration = (
	units:
		| {
			years?: number
			months?: number
			weeks?: number
			days?: number
			hours?: number
			minutes?: number
			seconds?: number
			milliseconds?: number
			microseconds?: number
			nanoseconds?: number
		}
		| null
		| undefined,
): Temporal.Duration | null => {
	if (isNullish(units)) {
		return null
	}

	try {
		// Temporal.Duration.from handles the conversion
		return Temporal.Duration.from(units)
	} catch {
		return null
	}
}

export default duration
