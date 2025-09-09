//++ Type guard that checks if a value is a Temporal.ZonedDateTime instance (datetime with timezone)
export default function isTemporalZonedDateTime(
	value: unknown,
): value is Temporal.ZonedDateTime {
	try {
		return value instanceof Temporal.ZonedDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isTemporalZonedDateTime(Temporal.ZonedDateTime.from("2024-01-15T12:30:00-05:00[America/New_York]")) // true
//?? [EXAMPLE] isTemporalZonedDateTime("2024-01-15T12:30:00Z") // false (string)
//?? [EXAMPLE] isTemporalZonedDateTime(new Date()) // false (legacy Date)
//?? [EXAMPLE] isTemporalZonedDateTime(Temporal.PlainDateTime.from("2024-01-15T12:30:00")) // false
/*??
 * [EXAMPLE]
 * const zdt = Temporal.ZonedDateTime.from("2024-01-15T12:30:00-05:00[America/New_York]")
 * if (isTemporalZonedDateTime(zdt)) {
 *   zdt.withTimeZone("Europe/Paris")  // TypeScript knows it's ZonedDateTime
 * }
 *
 * [GOTCHA] Returns false if Temporal API is not available
 * [PRO] TypeScript type guard for safe ZonedDateTime operations
 */
