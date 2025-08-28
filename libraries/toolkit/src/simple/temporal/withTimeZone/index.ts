/**
 * Converts datetime to a specific timezone
 *
 * Changes the timezone of a ZonedDateTime while preserving the same instant in
 * time. The wall-clock time will change to reflect the local time in the new
 * timezone. Also converts PlainDateTime and Instant to the specified timezone.
 * This is useful for displaying times in different regions and handling
 * international scheduling. This is a curried function for easy composition.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param timeZone - The target timezone identifier (e.g., "America/New_York")
 * @param temporal - The datetime to convert
 * @returns ZonedDateTime in new timezone, or null if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // From ZonedDateTime - preserve instant, change timezone
 * const nyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * withTimeZone("Europe/London")(nyTime)
 * // ZonedDateTime 2024-03-15T18:30:00+00:00[Europe/London]
 *
 * // From PlainDateTime - interpret as local time in timezone
 * const plainDateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * withTimeZone("America/New_York")(plainDateTime)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 *
 * // From Instant - convert to timezone
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * withTimeZone("Asia/Tokyo")(instant)
 * // ZonedDateTime 2024-03-16T03:30:00+09:00[Asia/Tokyo]
 *
 * // Partial application for batch conversion
 * const toLondon = withTimeZone("Europe/London")
 * const events = [
 *   Temporal.ZonedDateTime.from("2024-03-15T09:00:00-04:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-03-15T14:00:00-04:00[America/New_York]")
 * ]
 * events.map(toLondon)  // Events in London time
 *
 * // Invalid input handling
 * withTimeZone("America/New_York")(null)  // null
 * withTimeZone("Invalid/Zone")(nyTime)  // null
 * ```
 */
const withTimeZone = (timeZone: string) =>
(
	temporal:
		| Temporal.ZonedDateTime
		| Temporal.PlainDateTime
		| Temporal.Instant
		| null
		| undefined,
): Temporal.ZonedDateTime | null => {
	if (temporal == null) {
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

export default withTimeZone
