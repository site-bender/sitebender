//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function setMonth(month: number) {
	return function setMonthOnDate(
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

		// Validate month is in valid range
		if (month < 1 || month > 12 || !Number.isInteger(month)) {
			return null
		}

		try {
			// Use 'constrain' overflow mode to handle day overflow gracefully
			return date.with({ month }, { overflow: "constrain" })
		} catch {
			return null
		}
	}
}
