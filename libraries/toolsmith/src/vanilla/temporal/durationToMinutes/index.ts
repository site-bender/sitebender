import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const durationToMinutes = (
	duration: Temporal.Duration | null | undefined,
): number | null => {
	if (isNullish(duration)) {
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
