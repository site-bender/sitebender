//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function subtractDuration(
	duration: Temporal.Duration | null | undefined,
) {
	return function subtractDurationFromTemporal(
		temporal:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.PlainTime
			| Temporal.ZonedDateTime
			| Temporal.Instant
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null {
		if (isNullish(duration) || isNullish(temporal)) {
			return null
		}

		// Validate duration is a Temporal.Duration
		if (!(duration instanceof Temporal.Duration)) {
			return null
		}

		// Validate temporal is a valid Temporal type
		const isValidTemporal = temporal instanceof Temporal.PlainDate ||
			temporal instanceof Temporal.PlainDateTime ||
			temporal instanceof Temporal.PlainTime ||
			temporal instanceof Temporal.ZonedDateTime ||
			temporal instanceof Temporal.Instant

		if (!isValidTemporal) {
			return null
		}

		try {
			// Handle PlainTime specially (it doesn't have a subtract method)
			if (temporal instanceof Temporal.PlainTime) {
				// Convert to PlainDateTime for calculation
				const refDate = Temporal.PlainDate.from("2000-01-01")
				const dateTime = refDate.toPlainDateTime(temporal)
				const result = dateTime.subtract(duration)
				return result.toPlainTime()
			}

			// For all other types, use the subtract method
			// @ts-ignore - TypeScript doesn't recognize the common subtract method
			return temporal.subtract(duration)
		} catch {
			return null
		}
	}
}
