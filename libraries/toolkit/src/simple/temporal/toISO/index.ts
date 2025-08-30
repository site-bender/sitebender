/**
 * Converts a Temporal object to its ISO 8601 string representation
 *
 * Converts any Temporal date/time object to its standard ISO 8601 string format.
 * Each Temporal type produces its appropriate ISO format: dates as YYYY-MM-DD,
 * times as HH:MM:SS.sss, datetimes combining both, and zoned datetimes including
 * timezone information. Returns null for invalid inputs to support safe error
 * handling.
 *
 * @param temporal - The Temporal object to convert
 * @returns ISO 8601 string representation, or null if invalid
 * @example
 * ```typescript
 * // Different Temporal types produce appropriate ISO formats
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toISO(date)                             // "2024-03-15"
 *
 * const time = Temporal.PlainTime.from("14:30:45.123")
 * toISO(time)                             // "14:30:45.123"
 *
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * toISO(datetime)                         // "2024-03-15T14:30:45"
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toISO(zonedDateTime)                    // "2024-03-15T14:30:00-04:00[America/New_York]"
 *
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * toISO(instant)                          // "2024-03-15T18:30:00Z"
 *
 * const duration = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * toISO(duration)                         // "PT2H30M"
 *
 * // API response formatter using functional approach
 * const formatApiResponse = (data: {
 *   created: Temporal.PlainDateTime;
 *   updated: Temporal.PlainDateTime;
 * }) => ({
 *   created: toISO(data.created),
 *   updated: toISO(data.updated)
 * })
 *
 * // Batch conversion
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-15")
 * ]
 * dates.map(toISO)  // ["2024-01-15", "2024-02-15"]
 *
 * // Invalid inputs return null
 * toISO(null)                             // null
 * toISO("2024-03-15")                    // null (string, not Temporal)
 * ```
 * @pure
 * @immutable
 * @safe
 */
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
