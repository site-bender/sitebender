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
 * // Basic future instant validation
 * const now = Temporal.Now.instant()
 * const future = now.add({ hours: 1 })
 * const past = now.subtract({ hours: 1 })
 *
 * isFutureInstant(future)         // true
 * isFutureInstant(past)           // false
 * isFutureInstant(now)            // false (current instant)
 *
 * // Using ISO instant strings (with Z timezone)
 * // Assuming now is 2024-01-15T14:30:00.000Z
 * isFutureInstant("2024-01-15T15:00:00Z")     // true (30 minutes later)
 * isFutureInstant("2024-01-15T14:30:00Z")     // false (same time)
 * isFutureInstant("2024-01-15T14:00:00Z")     // false (30 minutes ago)
 * isFutureInstant("2024-01-16T00:00:00Z")     // true (tomorrow UTC)
 *
 * // Using epoch nanoseconds (bigint)
 * const nowNano = Temporal.Now.instant().epochNanoseconds
 * const futureNano = nowNano + 1000000000n  // 1 second later
 * const pastNano = nowNano - 1000000000n    // 1 second ago
 *
 * isFutureInstant(Temporal.Instant.fromEpochNanoseconds(futureNano))  // true
 * isFutureInstant(Temporal.Instant.fromEpochNanoseconds(pastNano))    // false
 *
 * // API request timestamps
 * const validateRequestTimestamp = (
 *   timestamp: string
 * ): string | null => {
 *   if (!timestamp) {
 *     return "Timestamp is required"
 *   }
 *
 *   try {
 *     const instant = Temporal.Instant.from(timestamp)
 *
 *     if (isFutureInstant(instant)) {
 *       return "Timestamp cannot be in the future"
 *     }
 *
 *     // Check if too old (e.g., more than 5 minutes)
 *     const fiveMinutesAgo = Temporal.Now.instant().subtract({ minutes: 5 })
 *     if (Temporal.Instant.compare(instant, fiveMinutesAgo) < 0) {
 *       return "Request timestamp too old"
 *     }
 *
 *     return null
 *   } catch {
 *     return "Invalid timestamp format"
 *   }
 * }
 *
 * validateRequestTimestamp("2024-01-15T14:30:00Z")  // Depends on current time
 * validateRequestTimestamp("2025-01-01T00:00:00Z")  // "Timestamp cannot be..."
 *
 * // Token expiry validation
 * const isTokenValid = (
 *   expiryInstant: Temporal.Instant
 * ): boolean => {
 *   return isFutureInstant(expiryInstant)
 * }
 *
 * const tokenExpiry = Temporal.Now.instant().add({ hours: 24 })
 * isTokenValid(tokenExpiry)  // true (valid for 24 hours)
 *
 * // Rate limiting with future allowance
 * type RateLimitInfo = {
 *   resetInstant: Temporal.Instant
 *   remainingRequests: number
 * }
 *
 * const canMakeRequest = (
 *   rateLimit: RateLimitInfo
 * ): boolean => {
 *   if (rateLimit.remainingRequests > 0) {
 *     return true
 *   }
 *
 *   // If no requests remaining, check if reset time has passed
 *   return !isFutureInstant(rateLimit.resetInstant)
 * }
 *
 * const limit: RateLimitInfo = {
 *   resetInstant: Temporal.Now.instant().add({ minutes: 15 }),
 *   remainingRequests: 0
 * }
 *
 * canMakeRequest(limit)  // false until reset time passes
 *
 * // Session timeout management
 * const extendSession = (
 *   currentExpiry: Temporal.Instant,
 *   extensionMinutes: number = 30
 * ): Temporal.Instant => {
 *   if (!isFutureInstant(currentExpiry)) {
 *     // Session expired, create new from now
 *     return Temporal.Now.instant().add({ minutes: extensionMinutes })
 *   }
 *
 *   // Extend from current expiry
 *   return currentExpiry.add({ minutes: extensionMinutes })
 * }
 *
 * const sessionExpiry = Temporal.Now.instant().add({ minutes: 10 })
 * const newExpiry = extendSession(sessionExpiry, 20)
 *
 * // Cache expiration
 * const isCacheValid = (
 *   cacheExpiry: Temporal.Instant
 * ): boolean => {
 *   return isFutureInstant(cacheExpiry)
 * }
 *
 * const cacheEntry = {
 *   data: { ...cachedData },
 *   expiry: Temporal.Now.instant().add({ seconds: 300 })  // 5 minutes
 * }
 *
 * if (isCacheValid(cacheEntry.expiry)) {
 *   // Use cached data
 * } else {
 *   // Refresh cache
 * }
 *
 * // JWT token generation
 * const generateToken = (
 *   expirationHours: number = 1
 * ): { token: string; expiry: Temporal.Instant } => {
 *   const expiry = Temporal.Now.instant().add({ hours: expirationHours })
 *
 *   return {
 *     token: "jwt-token-here",
 *     expiry: expiry
 *   }
 * }
 *
 * const { token, expiry } = generateToken(24)
 * console.log(isFutureInstant(expiry))  // true
 *
 * // Scheduled job execution
 * const shouldExecuteJob = (
 *   scheduledInstant: Temporal.Instant
 * ): boolean => {
 *   // Execute if scheduled time is not in the future
 *   return !isFutureInstant(scheduledInstant)
 * }
 *
 * const jobTime = Temporal.Instant.from("2024-01-15T15:00:00Z")
 * shouldExecuteJob(jobTime)  // true/false based on current time
 *
 * // Invalid inputs
 * isFutureInstant(null)                   // false
 * isFutureInstant(undefined)              // false
 * isFutureInstant("")                     // false (empty string)
 * isFutureInstant("invalid")              // false (invalid format)
 * isFutureInstant("2024-01-15T14:30:00")  // false (missing Z)
 * isFutureInstant(123)                    // false (not an instant)
 * isFutureInstant({})                     // false (not an instant)
 * isFutureInstant(new Date())             // false (Date not supported)
 *
 * // Retry mechanism with backoff
 * const getNextRetryTime = (
 *   attemptNumber: number
 * ): Temporal.Instant => {
 *   const backoffSeconds = Math.min(Math.pow(2, attemptNumber), 300)  // Max 5 min
 *   return Temporal.Now.instant().add({ seconds: backoffSeconds })
 * }
 *
 * const retryTime = getNextRetryTime(3)  // 8 seconds from now
 * console.log(isFutureInstant(retryTime))  // true
 *
 * // Event timestamp validation
 * const processEvent = (
 *   eventTimestamp: Temporal.Instant
 * ): string | null => {
 *   if (isFutureInstant(eventTimestamp)) {
 *     return "Cannot process future events"
 *   }
 *
 *   const oneHourAgo = Temporal.Now.instant().subtract({ hours: 1 })
 *   if (Temporal.Instant.compare(eventTimestamp, oneHourAgo) < 0) {
 *     return "Event too old to process"
 *   }
 *
 *   return null  // Valid for processing
 * }
 *
 * // Distributed system clock sync
 * const isClockAhead = (
 *   remoteInstant: Temporal.Instant,
 *   toleranceMillis: number = 1000
 * ): boolean => {
 *   const localWithTolerance = Temporal.Now.instant().add({
 *     milliseconds: toleranceMillis
 *   })
 *
 *   return Temporal.Instant.compare(remoteInstant, localWithTolerance) > 0
 * }
 *
 * const remoteTime = Temporal.Instant.from("2024-01-15T15:00:01Z")
 * isClockAhead(remoteTime, 500)  // true if remote is > 500ms ahead
 *
 * // Subscription billing cycles
 * const getNextBillingDate = (
 *   lastBilled: Temporal.Instant,
 *   intervalDays: number = 30
 * ): Temporal.Instant => {
 *   let nextBilling = lastBilled.add({ days: intervalDays })
 *
 *   // Ensure next billing is in the future
 *   while (!isFutureInstant(nextBilling)) {
 *     nextBilling = nextBilling.add({ days: intervalDays })
 *   }
 *
 *   return nextBilling
 * }
 *
 * const lastPayment = Temporal.Instant.from("2024-01-01T00:00:00Z")
 * const nextPayment = getNextBillingDate(lastPayment, 30)
 * ```
 *
 * @pure
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
