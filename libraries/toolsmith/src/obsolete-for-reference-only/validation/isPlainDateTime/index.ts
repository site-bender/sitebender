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
