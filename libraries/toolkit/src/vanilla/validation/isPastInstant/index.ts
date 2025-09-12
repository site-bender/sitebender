/**
 * Checks if an instant is in the past relative to the current moment
 *
 * Validates whether a given Temporal.Instant is strictly before the current
 * instant. Uses Temporal.Now.instant() to get the current moment in time
 * and compares it with the input instant. An instant represents a fixed
 * point in time, independent of time zones or calendars. Returns false
 * for the current instant, future instants, or invalid inputs.
 *
 * Past instant rules:
 * - Must be strictly before the current instant
 * - Current instant returns false (not considered past)
 * - Nanosecond precision comparison
 * - Time zone independent (absolute time)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The instant to check (Temporal.Instant, ISO string, or epochNanoseconds)
 * @returns true if the instant is in the past, false otherwise
 * @example
 * ```typescript
 * // Basic past instant validation
 * const now = Temporal.Now.instant()
 * const past = now.subtract({ hours: 1 })
 * const future = now.add({ hours: 1 })
 *
 * isPastInstant(past)             // true
 * isPastInstant(now)              // false (current instant)
 * isPastInstant(future)           // false
 *
 * // Using ISO instant strings
 * isPastInstant("2023-01-15T14:00:00Z")     // true (past)
 * isPastInstant("2025-01-15T15:00:00Z")     // false (future)
 *
 * // API request validation
 * const validateRequestTime = (timestamp: string): string | null => {
 *   const instant = Temporal.Instant.from(timestamp)
 *   return !isPastInstant(instant)
 *     ? "Request time cannot be in the future"
 *     : null
 * }
 *
 * // Token expiry check
 * const isTokenExpired = (
 *   issuedAt: Temporal.Instant,
 *   maxAgeSeconds: number = 3600
 * ): boolean => {
 *   if (!isPastInstant(issuedAt)) return true  // Invalid future token
 *   const maxAge = Temporal.Now.instant().subtract({ seconds: maxAgeSeconds })
 *   return Temporal.Instant.compare(issuedAt, maxAge) < 0
 * }
 *
 * // Invalid inputs
 * isPastInstant(null)             // false
 * isPastInstant("invalid")        // false
 * isPastInstant("2024-01-15")     // false (missing Z)
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
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
