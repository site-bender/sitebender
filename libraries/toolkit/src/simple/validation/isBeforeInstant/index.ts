import type { InstantInput } from "../../../types/temporal/index.ts"

/**
 * Checks if an instant is before another instant
 *
 * Curried function that validates whether one Instant comes chronologically
 * before another Instant. Instants represent exact moments in time (UTC-based)
 * with nanosecond precision. Returns false for equal instants, invalid inputs,
 * or conversion failures.
 *
 * Instant comparison rules:
 * - Compares absolute time points (UTC-based)
 * - Strictly before: instant must be chronologically earlier
 * - Equal instants return false (use isSameOrBeforeInstant for inclusive)
 * - Nanosecond precision comparison
 * - Timezone-independent (always UTC)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference instant (Temporal.Instant, ISO string with Z, or epoch milliseconds)
 * @returns A predicate function that checks if an instant is before the reference
 * @example
 * ```typescript
 * // Using Temporal Instant
 * const { Temporal } = globalThis
 *
 * const instant1 = Temporal.Instant.from("2024-01-15T14:30:00Z")
 * const instant2 = Temporal.Instant.from("2024-01-15T13:30:00Z")
 * const instant3 = Temporal.Instant.from("2024-01-15T15:30:00Z")
 *
 * // Basic comparison
 * const isBeforeReference = isBeforeInstant(instant1)
 *
 * isBeforeReference(instant2)     // true (1 hour earlier)
 * isBeforeReference(instant3)     // false (1 hour later)
 * isBeforeReference(instant1)     // false (same instant)
 *
 * // Working with current time
 * const now = Temporal.Now.instant()
 * const isPast = isBeforeInstant(now)
 *
 * const oneHourAgo = now.subtract({ hours: 1 })
 * const oneHourLater = now.add({ hours: 1 })
 *
 * isPast(oneHourAgo)    // true
 * isPast(oneHourLater)  // false
 * isPast(now)           // false
 *
 * // Epoch milliseconds comparison
 * const epochMs1 = 1705329000000 // 2024-01-15 14:30:00 UTC
 * const epochMs2 = 1705325400000 // 2024-01-15 13:30:00 UTC
 *
 * const isBeforeEpoch = isBeforeInstant(epochMs1)
 * isBeforeEpoch(epochMs2)  // true
 *
 * // ISO string comparison
 * const isBeforeISO = isBeforeInstant("2024-01-15T14:30:00Z")
 *
 * isBeforeISO("2024-01-15T13:30:00Z")  // true
 * isBeforeISO("2024-01-15T15:30:00Z")  // false
 * isBeforeISO("2024-01-15T14:30:00Z")  // false (same)
 *
 * // Nanosecond precision
 * const precise1 = Temporal.Instant.from("2024-01-15T12:00:00.000000002Z")
 * const precise2 = Temporal.Instant.from("2024-01-15T12:00:00.000000001Z")
 *
 * const isBeforePrecise = isBeforeInstant(precise1)
 * isBeforePrecise(precise2)  // true (1 nanosecond earlier)
 * isBeforePrecise(precise1)  // false (exact same)
 *
 * // Invalid inputs
 * const checker = isBeforeInstant(Temporal.Now.instant())
 *
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker("invalid")               // false
 * checker("2024-01-15T14:30:00")  // false (missing Z)
 * checker({})                      // false
 *
 * // API request timestamp validation
 * const validateRequestAge = (
 *   requestTimestamp: InstantInput,
 *   maxAgeSeconds: number = 300
 * ): string | null => {
 *   const now = Temporal.Now.instant()
 *   const minTimestamp = now.subtract({ seconds: maxAgeSeconds })
 *
 *   if (isBeforeInstant(minTimestamp)(requestTimestamp)) {
 *     return "Request timestamp is too old"
 *   }
 *
 *   if (!isBeforeInstant(now)(requestTimestamp)) {
 *     return "Request timestamp cannot be in the future"
 *   }
 *
 *   return null
 * }
 *
 * const fiveMinutesAgo = Temporal.Now.instant().subtract({ minutes: 5 })
 * validateRequestAge(fiveMinutesAgo)  // null (valid)
 *
 * const tenMinutesAgo = Temporal.Now.instant().subtract({ minutes: 10 })
 * validateRequestAge(tenMinutesAgo)  // "Request timestamp is too old"
 *
 * // Event ordering
 * const events = [
 *   { id: 1, timestamp: Temporal.Instant.from("2024-01-15T10:00:00Z") },
 *   { id: 2, timestamp: Temporal.Instant.from("2024-01-15T09:00:00Z") },
 *   { id: 3, timestamp: Temporal.Instant.from("2024-01-15T11:00:00Z") },
 *   { id: 4, timestamp: Temporal.Instant.from("2024-01-15T08:00:00Z") }
 * ]
 *
 * const cutoffTime = Temporal.Instant.from("2024-01-15T10:00:00Z")
 * const earlierEvents = events.filter(e => isBeforeInstant(cutoffTime)(e.timestamp))
 * // [{ id: 2, ... }, { id: 4, ... }]
 *
 * // Rate limiting check
 * const hasWaitPeriodPassed = (
 *   lastRequestTime: InstantInput,
 *   cooldownSeconds: number
 * ): boolean => {
 *   const now = Temporal.Now.instant()
 *   const cooldownEnd = toInstant(lastRequestTime)?.add({ seconds: cooldownSeconds })
 *
 *   return cooldownEnd ? isBeforeInstant(now)(cooldownEnd) : true
 * }
 *
 * const lastRequest = Temporal.Now.instant().subtract({ seconds: 5 })
 * hasWaitPeriodPassed(lastRequest, 3)   // true (cooldown passed)
 * hasWaitPeriodPassed(lastRequest, 10)  // false (still in cooldown)
 *
 * // Token validation
 * const isTokenValid = (
 *   issuedAt: InstantInput,
 *   expiresAt: InstantInput
 * ): boolean => {
 *   const now = Temporal.Now.instant()
 *
 *   // Token should be issued before now and expire after now
 *   return isBeforeInstant(now)(issuedAt) && !isBeforeInstant(now)(expiresAt)
 * }
 *
 * const issued = Temporal.Now.instant().subtract({ hours: 1 })
 * const expires = Temporal.Now.instant().add({ hours: 1 })
 *
 * isTokenValid(issued, expires)  // true
 *
 * // Log retention filtering
 * const getLogsBeforeCutoff = (
 *   logs: Array<{ timestamp: InstantInput, data: unknown }>,
 *   cutoffInstant: InstantInput
 * ): Array<{ timestamp: InstantInput, data: unknown }> => {
 *   return logs.filter(log => isBeforeInstant(cutoffInstant)(log.timestamp))
 * }
 *
 * const logs = [
 *   { timestamp: Temporal.Now.instant().subtract({ days: 10 }), data: "old" },
 *   { timestamp: Temporal.Now.instant().subtract({ days: 5 }), data: "recent" },
 *   { timestamp: Temporal.Now.instant().subtract({ days: 1 }), data: "new" }
 * ]
 *
 * const sevenDaysAgo = Temporal.Now.instant().subtract({ days: 7 })
 * getLogsBeforeCutoff(logs, sevenDaysAgo)
 * // Returns logs older than 7 days
 *
 * // Cache expiration check
 * const shouldInvalidateCache = (
 *   cachedAt: InstantInput,
 *   ttlSeconds: number
 * ): boolean => {
 *   const now = Temporal.Now.instant()
 *   const expiry = toInstant(cachedAt)?.add({ seconds: ttlSeconds })
 *
 *   return expiry ? isBeforeInstant(now)(expiry) : true
 * }
 *
 * const cacheTime = Temporal.Now.instant().subtract({ minutes: 5 })
 * shouldInvalidateCache(cacheTime, 600)  // false (10 min TTL, cached 5 min ago)
 * shouldInvalidateCache(cacheTime, 240)  // true (4 min TTL, cached 5 min ago)
 *
 * // Message queue processing
 * const getUnprocessedMessages = (
 *   messages: Array<{ timestamp: InstantInput, id: string, processed?: boolean }>,
 *   beforeTimestamp: InstantInput
 * ): Array<{ timestamp: InstantInput, id: string, processed?: boolean }> => {
 *   return messages.filter(msg =>
 *     !msg.processed && isBeforeInstant(beforeTimestamp)(msg.timestamp)
 *   )
 * }
 *
 * // Distributed system clock validation
 * const isClockReasonable = (
 *   remoteTimestamp: InstantInput,
 *   toleranceMs: number = 5000
 * ): boolean => {
 *   const localNow = Temporal.Now.instant()
 *   const minAcceptable = localNow.subtract({ milliseconds: toleranceMs })
 *   const maxAcceptable = localNow.add({ milliseconds: toleranceMs })
 *
 *   return !isBeforeInstant(minAcceptable)(remoteTimestamp) &&
 *          isBeforeInstant(maxAcceptable)(remoteTimestamp)
 * }
 *
 * const remoteTime = Temporal.Now.instant().subtract({ seconds: 2 })
 * isClockReasonable(remoteTime, 5000)  // true (within 5 second tolerance)
 *
 * // Finding earliest instant
 * const findEarliestInstant = (
 *   instants: Array<InstantInput>
 * ): InstantInput | null => {
 *   if (instants.length === 0) return null
 *
 *   return instants.reduce((earliest, instant) => {
 *     return isBeforeInstant(earliest)(instant) ? instant : earliest
 *   })
 * }
 *
 * findEarliestInstant([
 *   "2024-01-15T10:00:00Z",
 *   "2024-01-15T09:00:00Z",
 *   "2024-01-15T11:00:00Z"
 * ])
 * // "2024-01-15T09:00:00Z"
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property UTC-based - Always compares absolute time points
 * @property Precise - Nanosecond precision for time comparisons
 * @property Exclusive - Returns false for equal instants
 * @property Flexible - Accepts Temporal.Instant, ISO strings with Z, and epoch milliseconds
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isBeforeInstant = (
	reference: InstantInput | null | undefined,
) =>
(
	instant: InstantInput | null | undefined,
): boolean => {
	// Convert inputs to Temporal.Instant
	const toInstant = (
		value: InstantInput | null | undefined,
	): Temporal.Instant | null => {
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
		return Temporal.Instant.compare(compareInstant, refInstant) < 0
	} catch {
		return false
	}
}

export default isBeforeInstant
