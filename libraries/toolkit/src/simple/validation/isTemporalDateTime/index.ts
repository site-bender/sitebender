//++ Type guard that checks if a value is a Temporal.PlainDateTime instance
export default function isTemporalDateTime(
	value: unknown,
): value is Temporal.PlainDateTime {
	try {
		return value instanceof Temporal.PlainDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isTemporalDateTime(Temporal.PlainDateTime.from("2024-01-15T12:30:00")) // true
//?? [EXAMPLE] isTemporalDateTime("2024-01-15T12:30:00") // false (string)
//?? [EXAMPLE] isTemporalDateTime(new Date()) // false (legacy Date)
//?? [EXAMPLE] isTemporalDateTime(Temporal.PlainDate.from("2024-01-15")) // false
/*??
 * [EXAMPLE]
 * const dt = Temporal.PlainDateTime.from("2024-01-15T12:30:00")
 * if (isTemporalDateTime(dt)) {
 *   dt.add({ hours: 1 })  // TypeScript knows it's PlainDateTime
 * }
 *
 * [GOTCHA] Returns false if Temporal API is not available
 * [PRO] TypeScript type guard for safe PlainDateTime operations
 */
