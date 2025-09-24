//++ Type guard that checks if a value is a Temporal.PlainDateTime instance
export default function isPlainDateTime(
	value: unknown,
): value is Temporal.PlainDateTime {
	try {
		return value instanceof Temporal.PlainDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isPlainDateTime(Temporal.PlainDateTime.from("2024-01-15T12:30:00")) // true
//?? [EXAMPLE] isPlainDateTime("2024-01-15T12:30:00") // false (string)
//?? [EXAMPLE] isPlainDateTime(new Date()) // false (legacy Date)
//?? [EXAMPLE] isPlainDateTime(Temporal.PlainDate.from("2024-01-15")) // false
/*??
 | [EXAMPLE]
 | const dt = Temporal.PlainDateTime.from("2024-01-15T12:30:00")
 | if (isPlainDateTime(dt)) {
 |   dt.add({ hours: 1 })  // TypeScript knows it's PlainDateTime
 | }
 |
 | [GOTCHA] Returns false if Temporal API is not available
 | [PRO] TypeScript type guard for safe PlainDateTime operations
 |
*/
