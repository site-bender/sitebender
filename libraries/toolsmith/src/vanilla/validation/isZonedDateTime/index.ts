//++ Type guard that checks if a value is a Temporal.ZonedDateTime instance (datetime with timezone)
export default function isZonedDateTime(
	value: unknown,
): value is Temporal.ZonedDateTime {
	try {
		return value instanceof Temporal.ZonedDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}
