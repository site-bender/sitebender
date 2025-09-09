import isTemporalZonedDateTime from "../isTemporalZonedDateTime/index.ts"

//++ Alias for isTemporalZonedDateTime - checks if a value is a Temporal.ZonedDateTime instance
export default function isZonedDateTime(value: unknown): value is Temporal.ZonedDateTime {
	return isTemporalZonedDateTime(value)
}

//?? [EXAMPLE] isZonedDateTime(Temporal.ZonedDateTime.from("2024-01-15T12:30:00-05:00[America/New_York]")) // true
//?? [EXAMPLE] isZonedDateTime("2024-01-15T12:30:00Z") // false (string)
//?? [EXAMPLE] isZonedDateTime(new Date()) // false (legacy Date)
/*??
 * [EXAMPLE]
 * const zdt = Temporal.ZonedDateTime.from("2024-01-15T12:30:00-05:00[America/New_York]")
 * if (isZonedDateTime(zdt)) {
 *   zdt.withTimeZone("Europe/Paris")  // TypeScript knows it's ZonedDateTime
 * }
 *
 * [PRO] More intuitive name matching Temporal API naming
 */