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
