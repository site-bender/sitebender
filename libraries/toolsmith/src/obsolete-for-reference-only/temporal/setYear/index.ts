//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function setYear(year: number) {
	return function setYearOnDate(
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

		// Validate year is an integer
		if (!Number.isInteger(year)) {
			return null
		}

		// Temporal year limits
		const MIN_YEAR = -271821
		const MAX_YEAR = 275760

		if (year < MIN_YEAR || year > MAX_YEAR) {
			return null
		}

		try {
			// Use 'constrain' overflow mode to handle Feb 29 in non-leap years
			return date.with({ year }, { overflow: "constrain" })
		} catch {
			return null
		}
	}
}
