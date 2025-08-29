/**
 * Checks if an instant is in the future relative to the current moment
 *
 * Validates whether a given Temporal.Instant is strictly after the current
 * instant. Uses Temporal.Now.instant() to get the current moment in time
 * and compares it with the input instant. An instant represents a fixed
 * point in time, independent of time zones or calendars. Returns false
 * for the current instant, past instants, or invalid inputs.
 *
 * Future instant rules:
 * - Must be strictly after the current instant
 * - Current instant returns false (not considered future)
 * - Nanosecond precision comparison
 * - Time zone independent (absolute time)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The instant to check (Temporal.Instant, ISO string, or epochNanoseconds)
 * @returns true if the instant is in the future, false otherwise
 * @example
 * ```typescript
 * // Basic validation
 * const now = Temporal.Now.instant()
 * const future = now.add({ hours: 1 })
 * const past = now.subtract({ hours: 1 })
 * 
 * isFutureInstant(future)         // true
 * isFutureInstant(past)           // false
 * isFutureInstant(now)            // false (current instant)
 *
 * // ISO instant strings (with Z timezone)
 * isFutureInstant("2025-01-15T15:00:00Z")     // true (if in future)
 * isFutureInstant("2024-01-15T14:00:00Z")     // false (if in past)
 *
 * // Epoch nanoseconds
 * const futureNano = now.epochNanoseconds + 1000000000n
 * isFutureInstant(Temporal.Instant.fromEpochNanoseconds(futureNano))  // true
 *
 * // Token expiry validation
 * const isTokenValid = (expiry: Temporal.Instant): boolean =>
 *   isFutureInstant(expiry)
 * 
 * const tokenExpiry = Temporal.Now.instant().add({ hours: 24 })
 * isTokenValid(tokenExpiry)  // true
 *
 * // Request timestamp validation  
 * const validateTimestamp = (ts: string): string | null => {
 *   try {
 *     const instant = Temporal.Instant.from(ts)
 *     return isFutureInstant(instant) ? "Cannot be in future" : null
 *   } catch {
 *     return "Invalid timestamp"
 *   }
 * }
 *
 * // Cache expiration
 * const isCacheValid = (expiry: Temporal.Instant): boolean =>
 *   isFutureInstant(expiry)
 *
 * // Edge cases
 * isFutureInstant(null)                   // false
 * isFutureInstant(undefined)              // false
 * isFutureInstant("invalid")              // false
 * isFutureInstant("2024-01-15T14:30:00")  // false (missing Z)
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isFutureInstant = (
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
		return Temporal.Instant.compare(instant, now) > 0
	} catch {
		return false
	}
}

export default isFutureInstant
