//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function addDuration(
	duration: Temporal.Duration | null | undefined,
) {
	return function addDurationToTemporal(
		temporal:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.PlainTime
			| Temporal.PlainYearMonth
			| Temporal.ZonedDateTime
			| Temporal.Instant
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null {
		if (isNullish(temporal) || isNullish(duration)) {
			return null
		}

		// Check if it's a valid Temporal type that supports add
		if (
			!(temporal instanceof Temporal.PlainDate) &&
			!(temporal instanceof Temporal.PlainDateTime) &&
			!(temporal instanceof Temporal.PlainTime) &&
			!(temporal instanceof Temporal.PlainYearMonth) &&
			!(temporal instanceof Temporal.ZonedDateTime) &&
			!(temporal instanceof Temporal.Instant)
		) {
			return null
		}

		if (!(duration instanceof Temporal.Duration)) {
			return null
		}

		try {
			return temporal.add(duration)
		} catch {
			return null
		}
	}
}
