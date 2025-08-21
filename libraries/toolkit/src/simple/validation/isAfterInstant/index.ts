import type { InstantInput } from "../../../types/temporal/index.ts"

/**
 * Checks if an instant is after another instant
 * 
 * Curried function that validates whether one Instant comes chronologically
 * after another Instant. Instants represent exact moments in time (UTC-based)
 * with nanosecond precision. Returns false for equal instants.
 * 
 * Instant comparison rules:
 * - Compares absolute time points (UTC-based)
 * - Strictly after: instant must be chronologically later
 * - Equal instants return false (use isSameOrAfterInstant for inclusive)
 * - Nanosecond precision comparison
 * - Timezone-independent (always UTC)
 * 
 * @param reference - The reference Temporal.Instant to compare against
 * @returns A predicate function that checks if an instant is after the reference
 * @example
 * ```typescript
 * // Using Temporal Instant
 * const { Temporal } = globalThis
 * 
 * const instant1 = Temporal.Instant.from("2024-01-15T14:30:00Z")
 * const instant2 = Temporal.Instant.from("2024-01-15T15:30:00Z")
 * const instant3 = Temporal.Instant.from("2024-01-15T13:30:00Z")
 * 
 * // Basic comparison
 * const isAfterReference = isAfterInstant(instant1)
 * 
 * isAfterReference(instant2)     // true (1 hour later)
 * isAfterReference(instant3)     // false (1 hour earlier)
 * isAfterReference(instant1)     // false (same instant)
 * 
 * // Working with current time
 * const now = Temporal.Now.instant()
 * const isFuture = isAfterInstant(now)
 * 
 * const oneHourLater = now.add({ hours: 1 })
 * const oneHourAgo = now.subtract({ hours: 1 })
 * 
 * isFuture(oneHourLater)   // true
 * isFuture(oneHourAgo)     // false
 * isFuture(now)            // false
 * 
 * // Epoch milliseconds comparison
 * const epochMs1 = 1705329000000 // 2024-01-15 14:30:00 UTC
 * const epochMs2 = 1705332600000 // 2024-01-15 15:30:00 UTC
 * 
 * const instant1FromEpoch = Temporal.Instant.fromEpochMilliseconds(epochMs1)
 * const instant2FromEpoch = Temporal.Instant.fromEpochMilliseconds(epochMs2)
 * 
 * const isAfterEpoch = isAfterInstant(instant1FromEpoch)
 * isAfterEpoch(instant2FromEpoch)  // true
 * 
 * // Nanosecond precision
 * const precise1 = Temporal.Instant.from("2024-01-15T12:00:00.000000001Z")
 * const precise2 = Temporal.Instant.from("2024-01-15T12:00:00.000000002Z")
 * 
 * const isAfterPrecise = isAfterInstant(precise1)
 * isAfterPrecise(precise2)  // true (1 nanosecond later)
 * isAfterPrecise(precise1)  // false (exact same)
 * 
 * // API response timestamp validation
 * const validateTimestamp = (
 *   timestamp: Temporal.Instant,
 *   minTimestamp: Temporal.Instant
 * ): string | null => {
 *   if (!isAfterInstant(minTimestamp)(timestamp)) {
 *     return "Timestamp is too old"
 *   }
 *   return null
 * }
 * 
 * const minAcceptable = Temporal.Now.instant().subtract({ hours: 24 })
 * const receivedTimestamp = Temporal.Now.instant()
 * 
 * validateTimestamp(receivedTimestamp, minAcceptable)  // null (valid)
 * 
 * // Event ordering
 * const events = [
 *   { id: 1, timestamp: Temporal.Instant.from("2024-01-15T10:00:00Z") },
 *   { id: 2, timestamp: Temporal.Instant.from("2024-01-15T11:00:00Z") },
 *   { id: 3, timestamp: Temporal.Instant.from("2024-01-15T09:00:00Z") },
 *   { id: 4, timestamp: Temporal.Instant.from("2024-01-15T12:00:00Z") }
 * ]
 * 
 * const cutoffTime = Temporal.Instant.from("2024-01-15T10:30:00Z")
 * const recentEvents = events.filter(e => isAfterInstant(cutoffTime)(e.timestamp))
 * // [{ id: 2, ... }, { id: 4, ... }]
 * 
 * // Rate limiting check
 * const canMakeRequest = (
 *   lastRequestTime: Temporal.Instant,
 *   cooldownSeconds: number
 * ): boolean => {
 *   const now = Temporal.Now.instant()
 *   const cooldownEnd = lastRequestTime.add({ seconds: cooldownSeconds })
 *   return isAfterInstant(cooldownEnd)(now)
 * }
 * 
 * const lastRequest = Temporal.Now.instant().subtract({ seconds: 5 })
 * canMakeRequest(lastRequest, 10)  // false (still in cooldown)
 * canMakeRequest(lastRequest, 3)   // true (cooldown passed)
 * 
 * // Token expiration
 * const isTokenExpired = (
 *   issuedAt: Temporal.Instant,
 *   ttlSeconds: number
 * ): boolean => {
 *   const now = Temporal.Now.instant()
 *   const expiryTime = issuedAt.add({ seconds: ttlSeconds })
 *   return isAfterInstant(expiryTime)(now)
 * }
 * 
 * const tokenIssued = Temporal.Now.instant().subtract({ seconds: 3500 })
 * isTokenExpired(tokenIssued, 3600)  // false (still valid)
 * isTokenExpired(tokenIssued, 3000)  // true (expired)
 * 
 * // Log retention policy
 * const getLogsToRetain = (
 *   logs: Array<{ timestamp: Temporal.Instant, data: unknown }>,
 *   retentionPeriod: Temporal.Duration
 * ): Array<{ timestamp: Temporal.Instant, data: unknown }> => {
 *   const cutoff = Temporal.Now.instant().subtract(retentionPeriod)
 *   return logs.filter(log => isAfterInstant(cutoff)(log.timestamp))
 * }
 * 
 * const logs = [
 *   { timestamp: Temporal.Now.instant().subtract({ days: 10 }), data: "old" },
 *   { timestamp: Temporal.Now.instant().subtract({ days: 5 }), data: "recent" },
 *   { timestamp: Temporal.Now.instant().subtract({ days: 1 }), data: "new" }
 * ]
 * 
 * const retention = Temporal.Duration.from({ days: 7 })
 * getLogsToRetain(logs, retention)
 * // Keeps logs from last 7 days
 * 
 * // Cache invalidation
 * const isCacheValid = (
 *   cachedAt: Temporal.Instant,
 *   ttl: Temporal.Duration
 * ): boolean => {
 *   const now = Temporal.Now.instant()
 *   const expiry = cachedAt.add(ttl)
 *   return !isAfterInstant(expiry)(now)
 * }
 * 
 * const cacheTime = Temporal.Now.instant().subtract({ minutes: 5 })
 * const cacheTTL = Temporal.Duration.from({ minutes: 10 })
 * isCacheValid(cacheTime, cacheTTL)  // true (still valid)
 * 
 * // Message queue processing
 * const getMessagesToProcess = (
 *   messages: Array<{ timestamp: Temporal.Instant, id: string }>,
 *   afterTimestamp: Temporal.Instant
 * ): Array<{ timestamp: Temporal.Instant, id: string }> => {
 *   return messages
 *     .filter(msg => isAfterInstant(afterTimestamp)(msg.timestamp))
 *     .sort((a, b) => Temporal.Instant.compare(a.timestamp, b.timestamp))
 * }
 * 
 * const messages = [
 *   { timestamp: Temporal.Instant.from("2024-01-15T10:00:00Z"), id: "msg1" },
 *   { timestamp: Temporal.Instant.from("2024-01-15T10:05:00Z"), id: "msg2" },
 *   { timestamp: Temporal.Instant.from("2024-01-15T10:10:00Z"), id: "msg3" }
 * ]
 * 
 * const lastProcessed = Temporal.Instant.from("2024-01-15T10:03:00Z")
 * getMessagesToProcess(messages, lastProcessed)
 * // [{ timestamp: "2024-01-15T10:05:00Z", id: "msg2" }, ...]
 * 
 * // Distributed system clock synchronization
 * const isClockAhead = (
 *   remoteTimestamp: Temporal.Instant,
 *   toleranceMs: number = 1000
 * ): boolean => {
 *   const localNow = Temporal.Now.instant()
 *   const tolerance = Temporal.Duration.from({ milliseconds: toleranceMs })
 *   const maxAcceptable = localNow.add(tolerance)
 *   return isAfterInstant(maxAcceptable)(remoteTimestamp)
 * }
 * 
 * const remoteTime = Temporal.Now.instant().add({ seconds: 2 })
 * isClockAhead(remoteTime, 1000)  // true (more than 1 second ahead)
 * 
 * // Converting from ZonedDateTime to Instant for comparison
 * const zonedDateTime = Temporal.ZonedDateTime.from({
 *   timeZone: "America/New_York",
 *   year: 2024,
 *   month: 1,
 *   day: 15,
 *   hour: 14,
 *   minute: 30
 * })
 * 
 * const instantFromZoned = zonedDateTime.toInstant()
 * const referenceInstant = Temporal.Instant.from("2024-01-15T19:00:00Z")
 * 
 * const isAfterNYTime = isAfterInstant(instantFromZoned)
 * isAfterNYTime(referenceInstant)  // Compares in absolute time
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property UTC-based - Always compares absolute time points
 * @property Precise - Nanosecond precision for time comparisons
 * @property Exclusive - Returns false for equal instants
 */
const isAfterInstant = (
	reference: InstantInput | null | undefined
) => (
	instant: InstantInput | null | undefined
): boolean => {
	// Convert inputs to Temporal.Instant
	const toInstant = (value: InstantInput | null | undefined): Temporal.Instant | null => {
		if (value == null) {
			return null
		}
		
		try {
			if (value instanceof Temporal.Instant) {
				return value
			}
			
			if (typeof value === "string") {
				return Temporal.Instant.from(value)
			}
			
			if (typeof value === "number") {
				return Temporal.Instant.fromEpochMilliseconds(value)
			}
			
			return null
		} catch {
			return null
		}
	}
	
	const refInstant = toInstant(reference)
	const compareInstant = toInstant(instant)
	
	if (!refInstant || !compareInstant) {
		return false
	}
	
	try {
		return Temporal.Instant.compare(compareInstant, refInstant) > 0
	} catch {
		return false
	}
}

export default isAfterInstant