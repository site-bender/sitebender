//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const toISO = (
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.Duration
		| null
		| undefined,
): string | null => {
	if (isNullish(temporal)) {
		return null
	}

	// Validate temporal is a valid Temporal type with toString method
	const isValidTemporal = temporal instanceof Temporal.PlainDate ||
		temporal instanceof Temporal.PlainDateTime ||
		temporal instanceof Temporal.PlainTime ||
		temporal instanceof Temporal.ZonedDateTime ||
		temporal instanceof Temporal.Instant ||
		temporal instanceof Temporal.PlainYearMonth ||
		temporal instanceof Temporal.PlainMonthDay ||
		temporal instanceof Temporal.Duration

	if (!isValidTemporal) {
		return null
	}

	try {
		// All Temporal types have a toString() method that produces ISO format
		return temporal.toString()
	} catch {
		return null
	}
}

export default toISO
