//++ Type guard that checks if a value is a Temporal.PlainDate instance
export default function isTemporalDate(value: unknown): value is Temporal.PlainDate {
	try {
		return value instanceof Temporal.PlainDate
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isTemporalDate(Temporal.PlainDate.from("2024-01-15")) // true
//?? [EXAMPLE] isTemporalDate("2024-01-15") // false (string)
//?? [EXAMPLE] isTemporalDate(new Date()) // false (legacy Date)
//?? [EXAMPLE] isTemporalDate(null) // false
/*??
 * [EXAMPLE]
 * const date = Temporal.PlainDate.from("2024-01-15")
 * if (isTemporalDate(date)) {
 *   date.add({ days: 1 })  // TypeScript knows it's PlainDate
 * }
 *
 * [GOTCHA] Returns false if Temporal API is not available
 * [PRO] TypeScript type guard for safe PlainDate operations
 */
