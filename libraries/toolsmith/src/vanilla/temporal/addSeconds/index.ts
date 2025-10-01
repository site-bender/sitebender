//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function addSeconds(seconds: number) {
	return function addSecondsToTime(
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

		try {
			return time.add({ seconds })
		} catch {
			return null
		}
	}
}
