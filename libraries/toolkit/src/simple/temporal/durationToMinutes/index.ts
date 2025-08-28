/**
 * Converts a Temporal.Duration to total minutes
 *
 * Calculates the total number of minutes represented by a Duration object,
 * converting all larger units (years, months, weeks, days, hours) to minutes
 * and adding any fractional minutes from seconds/milliseconds/etc. Returns
 * null for invalid inputs to support safe error handling. Uses precise
 * conversion assuming standard calendar durations.
 *
 * @param duration - The Temporal.Duration to convert to minutes
 * @returns Total minutes as a number, or null if invalid
 * @example
 * ```typescript
 * // Basic conversions
 * durationToMinutes(Temporal.Duration.from({ minutes: 30 }))      // 30
 * durationToMinutes(Temporal.Duration.from({ hours: 2 }))         // 120
 * durationToMinutes(Temporal.Duration.from({ hours: 1, minutes: 30 }))  // 90
 *
 * // Larger units
 * durationToMinutes(Temporal.Duration.from({ days: 1 }))          // 1440
 * durationToMinutes(Temporal.Duration.from({ weeks: 1 }))         // 10080
 *
 * // With seconds
 * durationToMinutes(Temporal.Duration.from({ seconds: 90 }))      // 1.5
 * durationToMinutes(Temporal.Duration.from({ minutes: 5, seconds: 30 }))  // 5.5
 *
 * // Edge cases
 * durationToMinutes(null)                                         // null
 * durationToMinutes(undefined)                                    // null
 *
 * // Calculate billable time
 * const calculateBillableTime = (
 *   sessions: Array<Temporal.Duration>
 * ): number =>
 *   sessions
 *     .map(durationToMinutes)
 *     .filter((mins): mins is number => mins !== null)
 *     .reduce((total, mins) => total + mins, 0)
 * ```
 * @pure
 * @safe
 */
const durationToMinutes = (
	duration: Temporal.Duration | null | undefined,
): number | null => {
	if (duration == null) {
		return null
	}

	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	try {
		// Convert to total seconds first, then to minutes
		// This handles all units consistently
		const totalSeconds = duration.total({ unit: "seconds" })
		return totalSeconds / 60
	} catch {
		return null
	}
}

export default durationToMinutes
