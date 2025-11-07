//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isPastInstant = (
	value: unknown,
): boolean => {
	if (!value) {
		return false
	}

	try {
		let instant: Temporal.Instant

		if (value instanceof Temporal.Instant) {
			instant = value
		} else if (typeof value === "string") {
			// Try to parse as ISO instant string
			instant = Temporal.Instant.from(value)
		} else if (typeof value === "bigint") {
			// Try as epoch nanoseconds
			instant = Temporal.Instant.fromEpochNanoseconds(value)
		} else if (typeof value === "number") {
			// Try as epoch milliseconds
			instant = Temporal.Instant.fromEpochMilliseconds(value)
		} else {
			return false
		}

		const now = Temporal.Now.instant()
		return Temporal.Instant.compare(instant, now) < 0
	} catch {
		return false
	}
}

export default isPastInstant
