//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function setDay(day: number) {
	return function setDayOnDate(
		date:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime) &&
			!(date instanceof Temporal.ZonedDateTime)
		) {
			return null
		}

		// Validate day is positive
		if (day < 1 || !Number.isInteger(day)) {
			return null
		}

		try {
			// Use 'constrain' overflow mode to handle invalid days gracefully
			return date.with({ day }, { overflow: "constrain" })
		} catch {
			return null
		}
	}
}
