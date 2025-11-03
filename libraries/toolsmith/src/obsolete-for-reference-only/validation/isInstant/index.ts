//++ Type guard that checks if a value is a Temporal.Instant instance (exact moment in time)
export default function isInstant(value: unknown): value is Temporal.Instant {
	try {
		return value instanceof Temporal.Instant
	} catch {
		// In case Temporal is not available
		return false
	}
}
