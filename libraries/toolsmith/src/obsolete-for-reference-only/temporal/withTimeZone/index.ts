import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function withTimeZone(timeZone: string) {
	return function convertToTimeZone(
		temporal:
			| Temporal.ZonedDateTime
			| Temporal.PlainDateTime
			| Temporal.Instant
			| null
			| undefined,
	): Temporal.ZonedDateTime | null {
		if (isNullish(temporal)) {
			return null
		}

		try {
			// Validate timezone
			try {
				// Test if timezone is valid by creating a test ZonedDateTime
				Temporal.Now.zonedDateTimeISO(timeZone)
			} catch {
				return null // Invalid timezone
			}

			// Handle ZonedDateTime - change timezone preserving instant
			if (temporal instanceof Temporal.ZonedDateTime) {
				return temporal.withTimeZone(timeZone)
			}

			// Handle PlainDateTime - interpret as local time in timezone
			if (temporal instanceof Temporal.PlainDateTime) {
				return temporal.toZonedDateTime(timeZone)
			}

			// Handle Instant - convert to timezone
			if (temporal instanceof Temporal.Instant) {
				return temporal.toZonedDateTimeISO(timeZone)
			}

			return null
		} catch {
			return null
		}
	}
}
