import isTemporalDate from "../isTemporalDate/index.ts"

//++ Alias for isTemporalDate - checks if a value is a Temporal.PlainDate instance
export default function isPlainDate(value: unknown): value is Temporal.PlainDate {
	return isTemporalDate(value)
}

//?? [EXAMPLE] isPlainDate(Temporal.PlainDate.from("2024-01-15")) // true
//?? [EXAMPLE] isPlainDate("2024-01-15") // false (string)
//?? [EXAMPLE] isPlainDate(new Date()) // false (legacy Date)
/*??
 * [EXAMPLE]
 * const date = Temporal.PlainDate.from("2024-01-15")
 * if (isPlainDate(date)) {
 *   date.add({ days: 1 })  // TypeScript knows it's PlainDate
 * }
 *
 * [PRO] More intuitive name matching Temporal API naming
 */