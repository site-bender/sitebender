import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toPlainDateTime = (
	temporal:
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.Instant
		| string
		| null
		| undefined,
): Temporal.PlainDateTime | null => {
	if (isNullish(temporal)) {
		return null
	}

	try {
		// Handle PlainDateTime - return as-is
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal
		}

		// Handle ZonedDateTime - extract local datetime
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.toPlainDateTime()
		}

		// Handle PlainDate - add midnight time
		if (temporal instanceof Temporal.PlainDate) {
			return temporal.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// Handle PlainTime - use reference date (1970-01-01)
		if (temporal instanceof Temporal.PlainTime) {
			const refDate = Temporal.PlainDate.from("1970-01-01")
			return refDate.toPlainDateTime(temporal)
		}

		// Handle Instant - convert via system timezone
		if (temporal instanceof Temporal.Instant) {
			const timeZone = Temporal.Now.timeZoneId()
			const zoned = temporal.toZonedDateTimeISO(timeZone)
			return zoned.toPlainDateTime()
		}

		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainDateTime first
			try {
				return Temporal.PlainDateTime.from(temporal)
			} catch {
				// Try to parse as PlainDate and add midnight
				try {
					const date = Temporal.PlainDate.from(temporal)
					return date.toPlainDateTime(
						Temporal.PlainTime.from("00:00:00"),
					)
				} catch {
					// Try to parse as ZonedDateTime and extract local
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.toPlainDateTime()
					} catch {
						// Try to parse as Instant and convert
						try {
							const instant = Temporal.Instant.from(temporal)
							const timeZone = Temporal.Now.timeZoneId()
							const zoned = instant.toZonedDateTimeISO(timeZone)
							return zoned.toPlainDateTime()
						} catch {
							return null
						}
					}
				}
			}
		}

		return null
	} catch {
		return null
	}
}

export default toPlainDateTime
