//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function setHour(hour: number) {
	return function setHourOnTime(
		time:
			| Temporal.PlainTime
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	):
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null {
		if (isNullish(time)) {
			return null
		}

		if (
			!(time instanceof Temporal.PlainTime) &&
			!(time instanceof Temporal.PlainDateTime) &&
			!(time instanceof Temporal.ZonedDateTime)
		) {
			return null
		}

		// Validate hour is in valid range
		if (hour < 0 || hour > 23 || !Number.isInteger(hour)) {
			return null
		}

		try {
			return time.with({ hour })
		} catch {
			return null
		}
	}
}
