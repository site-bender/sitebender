import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function totalDuration(unit: Temporal.DateTimeUnit | string) {
	return function getTotalDurationForUnit(
		duration: Temporal.Duration | null | undefined,
	): number | null {
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
}
