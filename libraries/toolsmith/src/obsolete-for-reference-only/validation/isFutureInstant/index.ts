import not from "../../logic/not/index.ts"

//++ Checks if an instant is in the future relative to the current moment
export default function isFutureInstant(value: unknown) {
	return function checkFutureInstant(): boolean {
		if (not(value)) {
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

			return Temporal.Instant.compare(instant, now) > 0
		} catch {
			return false
		}
	}
}
