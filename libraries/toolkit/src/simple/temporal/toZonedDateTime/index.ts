import isNullish from "../../validation/isNullish/index.ts"

/**
 * Converts PlainDateTime to ZonedDateTime with specified timezone
 *
 * Attaches timezone information to a PlainDateTime, creating a ZonedDateTime
 * that represents a specific instant in time. Handles ambiguous times during
 * DST transitions using the disambiguation option. Also converts from PlainDate
 * (at midnight), Instant, and ISO strings. Returns null for invalid inputs to
 * support safe error handling.
 * @param timeZone - The timezone identifier (e.g., "America/New_York")
 * @param disambiguation - How to handle ambiguous times: "compatible", "earlier", "later", "reject"
 * @param temporal - The value to convert to ZonedDateTime
 * @returns ZonedDateTime representation, or null if invalid
 * @example
 * ```typescript
 * // Attach timezone to PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toZonedDateTime("America/New_York")(datetime)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 *
 * toZonedDateTime("Europe/London")(datetime)
 * // ZonedDateTime 2024-03-15T14:30:00+00:00[Europe/London]
 *
 * // Convert from various types
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toZonedDateTime("America/New_York")(date)
 * // ZonedDateTime 2024-03-15T00:00:00-04:00[America/New_York]
 *
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * toZonedDateTime("America/New_York")(instant)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 *
 * // Handle DST transitions
 * const dstAmbiguous = Temporal.PlainDateTime.from("2024-03-10T02:30:00")
 * toZonedDateTime("America/New_York", "earlier")(dstAmbiguous)
 * // ZonedDateTime 2024-03-10T01:30:00-05:00[America/New_York]
 * toZonedDateTime("America/New_York", "later")(dstAmbiguous)
 * // ZonedDateTime 2024-03-10T03:30:00-04:00[America/New_York]
 *
 * // Multi-timezone converter using functional approach
 * const convertToTimezones = (
 *   datetime: Temporal.PlainDateTime,
 *   timezones: Array<string>
 * ): Map<string, Temporal.ZonedDateTime | null> => {
 *   return timezones.reduce((results, tz) => {
 *     return results.set(tz, toZonedDateTime(tz)(datetime))
 *   }, new Map<string, Temporal.ZonedDateTime | null>())
 * }
 *
 * // Batch timezone attachment
 * const times = [
 *   Temporal.PlainDateTime.from("2024-03-15T09:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * ]
 * const toNYTime = toZonedDateTime("America/New_York")
 * times.map(toNYTime)  // Array of ZonedDateTimes in NY timezone
 *
 * // Invalid inputs return null
 * toZonedDateTime("America/New_York")(null)        // null
 * toZonedDateTime("Invalid/Zone")(datetime)        // null
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const toZonedDateTime = (
	timeZone: string,
	disambiguation: "compatible" | "earlier" | "later" | "reject" = "compatible",
) =>
(
	temporal:
		| Temporal.PlainDateTime
		| Temporal.PlainDate
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| string
		| null
		| undefined,
): Temporal.ZonedDateTime | null => {
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
					return datetime.toZonedDateTime(timeZone, { disambiguation })
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

export default toZonedDateTime
