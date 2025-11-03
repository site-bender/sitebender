//++ Type guard that checks if a value is a Temporal.Duration instance
export default function isDuration(value: unknown): value is Temporal.Duration {
	try {
		return value instanceof Temporal.Duration
	} catch {
		// In case Temporal is not available
		return false
	}
}
