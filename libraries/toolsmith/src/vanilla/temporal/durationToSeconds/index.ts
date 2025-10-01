import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
