//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function setMinute(minute: number) {
	return function setMinuteOnTime(
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

		// Validate minute is in valid range
		if (minute < 0 || minute > 59 || !Number.isInteger(minute)) {
			return null
		}

		try {
			return time.with({ minute })
		} catch {
			return null
		}
	}
}
