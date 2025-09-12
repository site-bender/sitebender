import isNullish from "../../validation/isNullish/index.ts"

/**
 * Converts a Temporal.Duration to total seconds
 *
 * Calculates the total number of seconds represented by a Duration object,
 * converting all larger units (years, months, weeks, days, hours, minutes)
 * to seconds and adding any fractional seconds from subsecond units. Returns
 * null for invalid inputs to support safe error handling. Uses precise
 * conversion assuming standard calendar durations.
 *
 * @param duration - The Temporal.Duration to convert to seconds
 * @returns Total seconds as a number, or null if invalid
 * @example
 * ```typescript
 * // Basic conversions
 * durationToSeconds(Temporal.Duration.from({ seconds: 30 }))      // 30
 * durationToSeconds(Temporal.Duration.from({ minutes: 2 }))       // 120
 * durationToSeconds(Temporal.Duration.from({ hours: 1 }))         // 3600
 *
 * // Larger units
 * durationToSeconds(Temporal.Duration.from({ days: 1 }))          // 86400
 * durationToSeconds(Temporal.Duration.from({ weeks: 1 }))         // 604800
 *
 * // Subsecond precision
 * durationToSeconds(Temporal.Duration.from({ milliseconds: 500 }))  // 0.5
 * durationToSeconds(Temporal.Duration.from({ microseconds: 500000 }))  // 0.5
 *
 * // Edge cases
 * durationToSeconds(null)                                         // null
 * durationToSeconds(undefined)                                    // null
 *
 * // Aggregate durations
 * const totalSeconds = (durations: Array<Temporal.Duration>): number =>
 *   durations
 *     .map(durationToSeconds)
 *     .filter((s): s is number => s !== null)
 *     .reduce((total, s) => total + s, 0)
 * ```
 * @pure
 * @safe
 */
const durationToSeconds = (
	duration: Temporal.Duration | null | undefined,
): number | null => {
	if (isNullish(duration)) {
		return null
	}

	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	try {
		// Use the built-in total method for seconds
		return duration.total({ unit: "seconds" })
	} catch {
		return null
	}
}

export default durationToSeconds
