//++ Type guard that checks if a value is a Temporal.PlainDate instance
export default function isPlainDate(
	value: unknown,
): value is Temporal.PlainDate {
	try {
		return value instanceof Temporal.PlainDate
	} catch {
		// In case Temporal is not available
		return false
	}
}
