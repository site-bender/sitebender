import isNullish from "../../validation/isNullish/index.ts"

//++ Converts PlainDateTime to ZonedDateTime with specified timezone
export default function toZonedDateTime(
	disambiguation: "compatible" | "earlier" | "later" | "reject" = "compatible",
) {
	return function toZonedDateTimeWithDisambiguation(
		timeZone: string,
	) {
		return function toZonedDateTimeWithDisambiguationAndTimeZone(
			temporal:
				| Temporal.PlainDateTime
				| Temporal.PlainDate
				| Temporal.ZonedDateTime
				| Temporal.Instant
				| string
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

				// Handle ZonedDateTime - change timezone
				if (temporal instanceof Temporal.ZonedDateTime) {
					return temporal.withTimeZone(timeZone)
				}

				// Handle PlainDateTime - attach timezone
				if (temporal instanceof Temporal.PlainDateTime) {
					return temporal.toZonedDateTime(timeZone, { disambiguation })
				}

				// Handle PlainDate - convert to midnight in timezone
				if (temporal instanceof Temporal.PlainDate) {
					const datetime = temporal.toPlainDateTime(
						Temporal.PlainTime.from("00:00:00"),
					)
					return datetime.toZonedDateTime(timeZone, { disambiguation })
				}

				// Handle Instant - convert to timezone
				if (temporal instanceof Temporal.Instant) {
					return temporal.toZonedDateTimeISO(timeZone)
				}

				// Handle string - try to parse
				if (typeof temporal === "string") {
					// Try to parse as PlainDateTime and attach timezone
					try {
						const datetime = Temporal.PlainDateTime.from(temporal)
						return datetime.toZonedDateTime(timeZone, { disambiguation })
					} catch {
						// Try to parse as PlainDate
						try {
							const date = Temporal.PlainDate.from(temporal)
							const datetime = date.toPlainDateTime(
								Temporal.PlainTime.from("00:00:00"),
							)
							return datetime.toZonedDateTime(timeZone, {
								disambiguation,
							})
						} catch {
							// Try to parse as ZonedDateTime and change timezone
							try {
								const zoned = Temporal.ZonedDateTime.from(temporal)
								return zoned.withTimeZone(timeZone)
							} catch {
								// Try to parse as Instant
								try {
									const instant = Temporal.Instant.from(temporal)
									return instant.toZonedDateTimeISO(timeZone)
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
	}
}
