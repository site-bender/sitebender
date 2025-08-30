import isNullish from "../../validation/isNullish/index.ts"

/**
 * Formats duration in human-readable format
 *
 * Converts a Temporal.Duration into a human-readable string representation
 * using common time unit abbreviations (e.g., "2h 30m", "1d 3h 45m"). Only
 * displays non-zero units and automatically selects the most appropriate
 * units for readability. Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param duration - The Temporal.Duration to format
 * @returns Human-readable duration string, or null if invalid
 * @example
 * ```typescript
 * // Basic time units
 * formatDuration(Temporal.Duration.from({ minutes: 30 }))     // "30m"
 * formatDuration(Temporal.Duration.from({ hours: 2 }))        // "2h"
 * formatDuration(Temporal.Duration.from({ days: 1 }))         // "1d"
 * formatDuration(Temporal.Duration.from({ weeks: 1 }))        // "1w"
 *
 * // Combined units
 * formatDuration(Temporal.Duration.from({ 
 *   hours: 1, minutes: 30 
 * }))  // "1h 30m"
 *
 * formatDuration(Temporal.Duration.from({ 
 *   days: 2, hours: 3, minutes: 45 
 * }))  // "2d 3h 45m"
 *
 * // Sub-second handling
 * formatDuration(Temporal.Duration.from({ milliseconds: 245 }))  // "245ms"
 * formatDuration(Temporal.Duration.from({ seconds: 3, milliseconds: 250 }))  // "3s"
 *
 * // Zero duration
 * formatDuration(Temporal.Duration.from({}))  // "0s"
 *
 * // Invalid inputs
 * formatDuration(null)          // null
 * formatDuration(undefined)     // null
 *
 * // Meeting duration
 * const meeting = Temporal.Duration.from({ hours: 1, minutes: 30 })
 * console.log(`Meeting duration: ${formatDuration(meeting)}`)  // "Meeting duration: 1h 30m"
 *
 * // Time tracking
 * const workday = Temporal.Duration.from({ hours: 8, minutes: 15 })
 * const formatted = formatDuration(workday) ?? "Unknown"  // "8h 15m"
 * ```
 * @pure
 * @safe
 */
const formatDuration = (
	duration: Temporal.Duration | null | undefined,
): string | null => {
	if (isNullish(duration)) {
		return null
	}

	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	try {
		// Extract all units from the duration
		const weeks = Math.abs(duration.weeks ?? 0)
		const days = Math.abs(duration.days ?? 0)
		const hours = Math.abs(duration.hours ?? 0)
		const minutes = Math.abs(duration.minutes ?? 0)
		const seconds = Math.abs(duration.seconds ?? 0)
		const milliseconds = Math.abs(duration.milliseconds ?? 0)

		const parts: Array<string> = []

		// Add non-zero units in descending order
		if (weeks > 0) parts.push(`${weeks}w`)
		if (days > 0) parts.push(`${days}d`)
		if (hours > 0) parts.push(`${hours}h`)
		if (minutes > 0) parts.push(`${minutes}m`)

		// Handle seconds and milliseconds
		if (seconds > 0 || (milliseconds > 0 && parts.length === 0)) {
			if (milliseconds > 0 && parts.length === 0 && seconds === 0) {
				// Show milliseconds only if no larger units and no seconds
				parts.push(`${milliseconds}ms`)
			} else if (milliseconds >= 500 && seconds < 60) {
				// Round up seconds if milliseconds >= 500
				parts.push(`${seconds + 1}s`)
			} else if (seconds > 0) {
				// Show seconds without milliseconds
				parts.push(`${seconds}s`)
			}
		}

		// Handle zero duration
		if (parts.length === 0) {
			return "0s"
		}

		return parts.join(" ")
	} catch {
		return null
	}
}

export default formatDuration