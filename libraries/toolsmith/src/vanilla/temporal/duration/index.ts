import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
