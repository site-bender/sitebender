import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Converts various Temporal types to Temporal.PlainDate
 *
 * Extracts or converts the date portion from various Temporal objects to a
 * PlainDate. For datetime objects, extracts just the date components. For
 * zoned datetimes and instants, converts to the specified or system timezone
 * first. For strings, attempts to parse as an ISO date. Returns null for
 * invalid inputs to support safe error handling.
 * @param timeZone - Optional timezone for Instant/ZonedDateTime conversion
 * @param temporal - The value to convert to PlainDate
 * @returns PlainDate representation, or null if invalid
 * @example
 * ```typescript
 * // Extract date from various Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * toPlainDate()(datetime)                 // PlainDate 2024-03-15
 *
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toPlainDate()(date)                     // PlainDate 2024-03-15 (returns as-is)
 *
 * // Timezone-aware conversion for Instant
 * const instant = Temporal.Instant.from("2024-03-15T23:00:00Z")
 * toPlainDate()(instant)                  // PlainDate in system timezone
 * toPlainDate("America/New_York")(instant) // PlainDate 2024-03-15
 * toPlainDate("Asia/Tokyo")(instant)      // PlainDate 2024-03-16 (next day)
 *
 * // Parse ISO strings
 * toPlainDate()("2024-03-15")            // PlainDate 2024-03-15
 * toPlainDate()("2024-03-15T14:30:45")   // PlainDate 2024-03-15
 *
 * // Batch date extraction
 * const datetimes = [
 *   Temporal.PlainDateTime.from("2024-01-15T10:00:00"),
 *   Temporal.PlainDateTime.from("2024-02-20T14:30:00")
 * ]
 * const extractDate = toPlainDate()
 * datetimes.map(extractDate)  // [PlainDate 2024-01-15, PlainDate 2024-02-20]
 *
 * // Multi-timezone dates using functional approach
 * const getDateAcrossTimezones = (
 *   instant: Temporal.Instant,
 *   timezones: Array<string>
 * ): Map<string, Temporal.PlainDate | null> => {
 *   return timezones.reduce((dates, tz) => {
 *     return dates.set(tz, toPlainDate(tz)(instant))
 *   }, new Map<string, Temporal.PlainDate | null>())
 * }
 *
 * // Invalid inputs return null
 * toPlainDate()(null)                     // null
 * toPlainDate()("invalid")                // null
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const toPlainDate = (timeZone?: string) =>
(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| string
		| null
		| undefined,
): Temporal.PlainDate | null => {
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

export default toPlainDate
