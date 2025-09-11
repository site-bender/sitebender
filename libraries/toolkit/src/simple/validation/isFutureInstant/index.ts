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

//?? [EXAMPLE] isFutureInstant("2099-01-15T15:00:00Z")() // true
//?? [EXAMPLE] isFutureInstant("2000-01-15T14:00:00Z")() // false
//?? [EXAMPLE] isFutureInstant(null)() // false
/*??
 | [EXAMPLE]
 | const future = Temporal.Now.instant().add({ hours: 1 })
 | isFutureInstant(future)() // true
 |
 | [EXAMPLE] Token expiry validation
 | const tokenExpiry = Temporal.Now.instant().add({ hours: 24 })
 | const isValid = isFutureInstant(tokenExpiry)
 | isValid() // true if token not expired
 |
 | [GOTCHA] Current instant returns false (not considered future)
 | [GOTCHA] String must include Z timezone (e.g., "2024-01-15T14:30:00Z")
 | [PRO] Accepts Temporal.Instant, ISO strings, epoch nanoseconds/milliseconds
 |
*/
