import isTemporalDateTime from "../isTemporalDateTime/index.ts"

//++ Alias for isTemporalDateTime - checks if a value is a Temporal.PlainDateTime instance
export default function isPlainDateTime(value: unknown): value is Temporal.PlainDateTime {
	return isTemporalDateTime(value)
}

//?? [EXAMPLE] isPlainDateTime(Temporal.PlainDateTime.from("2024-01-15T12:30:00")) // true
//?? [EXAMPLE] isPlainDateTime("2024-01-15T12:30:00") // false (string)
//?? [EXAMPLE] isPlainDateTime(new Date()) // false (legacy Date)
/*??
 * [EXAMPLE]
 * const dt = Temporal.PlainDateTime.from("2024-01-15T12:30:00")
 * if (isPlainDateTime(dt)) {
 *   dt.add({ hours: 1 })  // TypeScript knows it's PlainDateTime
 * }
 *
 * [PRO] More intuitive name matching Temporal API naming
 */