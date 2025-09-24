//++ Type guard that checks if a value is a Temporal.Duration instance
export default function isDuration(value: unknown): value is Temporal.Duration {
	try {
		return value instanceof Temporal.Duration
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isDuration(Temporal.Duration.from({ hours: 2, minutes: 30 })) // true
//?? [EXAMPLE] isDuration("PT2H30M") // false (string)
//?? [EXAMPLE] isDuration({ hours: 2, minutes: 30 }) // false (plain object)
//?? [EXAMPLE] isDuration(null) // false
/*??
 | [EXAMPLE]
 | const dur = Temporal.Duration.from({ hours: 2, minutes: 30 })
 | if (isDuration(dur)) {
 |   dur.total({ unit: "minutes" })  // TypeScript knows it's Duration
 | }
 |
 | [GOTCHA] Returns false if Temporal API is not available
 | [PRO] TypeScript type guard for safe Duration operations
 |
*/
