//++ Type guard that checks if a value is a Temporal.PlainTime instance
export default function isPlainTime(
	value: unknown,
): value is Temporal.PlainTime {
	try {
		return value instanceof Temporal.PlainTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isPlainTime(Temporal.PlainTime.from("12:30:00")) // true
//?? [EXAMPLE] isPlainTime("12:30:00") // false (string)
//?? [EXAMPLE] isPlainTime({ hour: 12, minute: 30 }) // false (plain object)
//?? [EXAMPLE] isPlainTime(null) // false
/*??
 | [EXAMPLE]
 | const time = Temporal.PlainTime.from("12:30:00")
 | if (isPlainTime(time)) {
 |   time.add({ hours: 1 })  // TypeScript knows it's PlainTime
 | }
 |
 | [GOTCHA] Returns false if Temporal API is not available
 | [PRO] TypeScript type guard for safe PlainTime operations
 |
*/
