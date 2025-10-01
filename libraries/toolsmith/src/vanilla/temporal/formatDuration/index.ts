import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
