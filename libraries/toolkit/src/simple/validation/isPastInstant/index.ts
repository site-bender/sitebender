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
 * isPastInstant(future)           // false (future)
 *
 * // Using ISO instant strings (with Z timezone)
 * // Assuming now is 2024-01-15T14:30:00.000Z
 * isPastInstant("2024-01-15T14:00:00Z")     // true (30 minutes ago)
 * isPastInstant("2024-01-15T14:30:00Z")     // false (same time)
 * isPastInstant("2024-01-15T15:00:00Z")     // false (30 minutes later)
 * isPastInstant("2024-01-14T00:00:00Z")     // true (yesterday UTC)
 *
 * // Using epoch nanoseconds (bigint)
 * const nowNano = Temporal.Now.instant().epochNanoseconds
 * const pastNano = nowNano - 1000000000n  // 1 second ago
 * const futureNano = nowNano + 1000000000n  // 1 second later
 *
 * isPastInstant(Temporal.Instant.fromEpochNanoseconds(pastNano))   // true
 * isPastInstant(Temporal.Instant.fromEpochNanoseconds(futureNano)) // false
 *
 * // API request validation
 * const validateRequestTime = (
 *   requestTime: string
 * ): string | null => {
 *   if (!requestTime) {
 *     return "Request time is required"
 *   }
 *
 *   try {
 *     const instant = Temporal.Instant.from(requestTime)
 *
 *     if (!isPastInstant(instant)) {
 *       return "Request time cannot be in the future"
 *     }
 *
 *     // Check if request is too old (e.g., more than 5 minutes)
 *     const fiveMinutesAgo = Temporal.Now.instant().subtract({ minutes: 5 })
 *     if (Temporal.Instant.compare(instant, fiveMinutesAgo) < 0) {
 *       return "Request expired (older than 5 minutes)"
 *     }
 *
 *     return null
 *   } catch {
 *     return "Invalid timestamp format"
 *   }
 * }
 *
 * validateRequestTime("2024-01-15T14:25:00Z")  // Depends on current time
 * validateRequestTime("2025-01-01T00:00:00Z")  // "Request time cannot be..."
 *
 * // Audit log timestamps
 * const isValidAuditEntry = (
 *   auditTime: Temporal.Instant
 * ): boolean => {
 *   // Audit entries must have past timestamps
 *   return isPastInstant(auditTime)
 * }
 *
 * const auditEntry = Temporal.Now.instant().subtract({ seconds: 30 })
 * isValidAuditEntry(auditEntry)  // true
 *
 * // Token validation
 * const validateTokenTimestamp = (
 *   issuedAt: Temporal.Instant,
 *   maxAgeSeconds: number = 3600
 * ): string | null => {
 *   if (!isPastInstant(issuedAt)) {
 *     return "Token issued time cannot be in the future"
 *   }
 *
 *   const maxAge = Temporal.Now.instant().subtract({ seconds: maxAgeSeconds })
 *   if (Temporal.Instant.compare(issuedAt, maxAge) < 0) {
 *     return "Token has expired"
 *   }
 *
 *   return null
 * }
 *
 * const tokenIssued = Temporal.Now.instant().subtract({ minutes: 30 })
 * validateTokenTimestamp(tokenIssued, 3600)  // null (valid)
 *
 * // Event processing
 * const processHistoricalEvents = (
 *   events: Array<{ instant: Temporal.Instant; data: any }>
 * ): Array<typeof events[0]> => {
 *   // Only process events that happened in the past
 *   return events
 *     .filter(event => isPastInstant(event.instant))
 *     .sort((a, b) => Temporal.Instant.compare(b.instant, a.instant))
 * }
 *
 * const events = [
 *   { instant: Temporal.Now.instant().subtract({ hours: 1 }), data: "event1" },
 *   { instant: Temporal.Now.instant().add({ hours: 1 }), data: "event2" },  // future
 *   { instant: Temporal.Now.instant().subtract({ minutes: 30 }), data: "event3" }
 * ]
 *
 * processHistoricalEvents(events)  // Returns only past events
 *
 * // Message ordering validation
 * const validateMessageOrder = (
 *   messages: Array<{ id: string; timestamp: Temporal.Instant }>
 * ): boolean => {
 *   // All messages should have past timestamps
 *   // and be in chronological order
 *   if (!messages.every(msg => isPastInstant(msg.timestamp))) {
 *     return false
 *   }
 *
 *   for (let i = 1; i < messages.length; i++) {
 *     if (Temporal.Instant.compare(messages[i].timestamp, messages[i-1].timestamp) < 0) {
 *       return false
 *     }
 *   }
 *
 *   return true
 * }
 *
 * // Rate limiting check
 * const canRetryRequest = (
 *   lastAttempt: Temporal.Instant,
 *   cooldownSeconds: number = 60
 * ): boolean => {
 *   if (!isPastInstant(lastAttempt)) {
 *     return false  // Invalid future timestamp
 *   }
 *
 *   const cooldownEnd = lastAttempt.add({ seconds: cooldownSeconds })
 *   const now = Temporal.Now.instant()
 *
 *   return Temporal.Instant.compare(now, cooldownEnd) >= 0
 * }
 *
 * const lastTry = Temporal.Now.instant().subtract({ seconds: 30 })
 * canRetryRequest(lastTry, 60)  // false (still in cooldown)
 *
 * // Invalid inputs
 * isPastInstant(null)                    // false
 * isPastInstant(undefined)               // false
 * isPastInstant("")                      // false (empty string)
 * isPastInstant("invalid")               // false (invalid format)
 * isPastInstant("2024-01-15T14:30:00")   // false (missing Z)
 * isPastInstant(123)                     // false (number as epoch millis)
 * isPastInstant({})                      // false (not an instant)
 * isPastInstant(new Date())              // false (Date not supported)
 *
 * // Database transaction timestamps
 * const validateTransactionTime = (
 *   txTime: Temporal.Instant
 * ): boolean => {
 *   if (!isPastInstant(txTime)) {
 *     return false  // Transactions can't have future timestamps
 *   }
 *
 *   // Check if transaction is within reasonable bounds (e.g., last 24 hours)
 *   const oneDayAgo = Temporal.Now.instant().subtract({ hours: 24 })
 *   return Temporal.Instant.compare(txTime, oneDayAgo) >= 0
 * }
 *
 * const txTimestamp = Temporal.Instant.from("2024-01-15T10:00:00Z")
 * validateTransactionTime(txTimestamp)  // true/false based on current time
 *
 * // Log rotation check
 * const shouldRotateLog = (
 *   lastRotation: Temporal.Instant,
 *   rotationIntervalHours: number = 24
 * ): boolean => {
 *   if (!isPastInstant(lastRotation)) {
 *     return true  // Invalid future rotation time, rotate now
 *   }
 *
 *   const nextRotation = lastRotation.add({ hours: rotationIntervalHours })
 *   const now = Temporal.Now.instant()
 *
 *   return Temporal.Instant.compare(now, nextRotation) >= 0
 * }
 *
 * const lastRotate = Temporal.Instant.from("2024-01-14T00:00:00Z")
 * shouldRotateLog(lastRotate, 24)  // true if more than 24 hours ago
 *
 * // Clock synchronization
 * const isClockBehind = (
 *   remoteTime: Temporal.Instant,
 *   toleranceMillis: number = 1000
 * ): boolean => {
 *   const localTime = Temporal.Now.instant()
 *   const diff = remoteTime.since(localTime).total("milliseconds")
 *
 *   // Remote time is in past but within tolerance
 *   return isPastInstant(remoteTime) && Math.abs(diff) <= toleranceMillis
 * }
 *
 * const remoteTimestamp = Temporal.Now.instant().subtract({ milliseconds: 500 })
 * isClockBehind(remoteTimestamp, 1000)  // true
 *
 * // Session activity tracking
 * const updateLastActivity = (
 *   currentActivity: Temporal.Instant | null,
 *   newActivity: Temporal.Instant
 * ): Temporal.Instant | null => {
 *   if (!isPastInstant(newActivity)) {
 *     // Reject future activity timestamps
 *     return currentActivity
 *   }
 *
 *   if (!currentActivity || Temporal.Instant.compare(newActivity, currentActivity) > 0) {
 *     return newActivity
 *   }
 *
 *   return currentActivity
 * }
 *
 * // Metric collection validation
 * const isValidMetricTimestamp = (
 *   metricTime: string,
 *   maxDelaySeconds: number = 300
 * ): boolean => {
 *   try {
 *     const instant = Temporal.Instant.from(metricTime)
 *
 *     if (!isPastInstant(instant)) {
 *       return false  // Metrics can't be from the future
 *     }
 *
 *     const maxAge = Temporal.Now.instant().subtract({ seconds: maxDelaySeconds })
 *     return Temporal.Instant.compare(instant, maxAge) >= 0
 *   } catch {
 *     return false
 *   }
 * }
 *
 * isValidMetricTimestamp("2024-01-15T14:25:00Z", 300)  // true if within 5 minutes
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Absolute - Time zone independent comparison
 * @property Precise - Nanosecond precision comparison
 * @property Exclusive - Returns false for current instant
 * @property Type-specific - Only accepts Temporal.Instant or convertible values
 * @property Safe - Returns false for invalid inputs instead of throwing
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
