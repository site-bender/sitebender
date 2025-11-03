import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toPlainDate(timeZone?: string) {
	return function convertToPlainDate(
		temporal:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| Temporal.Instant
			| Temporal.PlainYearMonth
			| string
			| null
			| undefined,
	): Temporal.PlainDate | null {
		if (isNullish(temporal)) {
			return null
		}

		try {
			// Handle PlainDate - return as-is
			if (temporal instanceof Temporal.PlainDate) {
				return temporal
			}

			// Handle PlainDateTime - extract date portion
			if (temporal instanceof Temporal.PlainDateTime) {
				return temporal.toPlainDate()
			}

			// Handle ZonedDateTime - convert to PlainDate
			if (temporal instanceof Temporal.ZonedDateTime) {
				if (timeZone) {
					// Convert to specified timezone first
					const converted = temporal.withTimeZone(timeZone)
					return converted.toPlainDate()
				}
				return temporal.toPlainDate()
			}

			// Handle Instant - convert via timezone
			if (temporal instanceof Temporal.Instant) {
				const tz = timeZone || Temporal.Now.timeZoneId()
				const zoned = temporal.toZonedDateTimeISO(tz)
				return zoned.toPlainDate()
			}

			// Handle PlainYearMonth - use first day of month
			if (temporal instanceof Temporal.PlainYearMonth) {
				return temporal.toPlainDate({ day: 1 })
			}

			// Handle string - try to parse
			if (typeof temporal === "string") {
				// Try to parse as PlainDate first
				try {
					return Temporal.PlainDate.from(temporal)
				} catch {
					// Try to parse as PlainDateTime and extract date
					try {
						const datetime = Temporal.PlainDateTime.from(temporal)
						return datetime.toPlainDate()
					} catch {
						// Try to parse as Instant and convert
						try {
							const instant = Temporal.Instant.from(temporal)
							const tz = timeZone || Temporal.Now.timeZoneId()
							const zoned = instant.toZonedDateTimeISO(tz)
							return zoned.toPlainDate()
						} catch {
							return null
						}
					}
				}
			}

			return null
		} catch {
			return null
		}
	}
}
