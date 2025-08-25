/**
 * Checks if a value is a Temporal.Instant instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.Instant class. This is useful for runtime type checking
 * when working with Temporal API instant objects (exact moments in time).
 * Returns true only for actual Temporal.Instant instances, not for
 * timestamp strings or other values that could be converted to Instant.
 *
 * Validation rules:
 * - Must be an actual Temporal.Instant instance
 * - Not just instant-like or convertible to Instant
 * - Returns false for null, undefined, or any non-Instant value
 * - Type narrows to Temporal.Instant when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.Instant, false otherwise
 * @example
 * ```typescript
 * // Valid Temporal.Instant instances
 * const inst1 = Temporal.Instant.from("2024-01-15T12:30:00Z")
 * const inst2 = Temporal.Instant.fromEpochMilliseconds(Date.now())
 * const inst3 = Temporal.Now.instant()
 *
 * isTemporalInstant(inst1)  // true
 * isTemporalInstant(inst2)  // true
 * isTemporalInstant(inst3)  // true
 *
 * // Invalid - not Instant instances
 * isTemporalInstant("2024-01-15T12:30:00Z")       // false (string)
 * isTemporalInstant(Date.now())                   // false (number)
 * isTemporalInstant(new Date())                   // false (JS Date)
 * isTemporalInstant(Temporal.PlainDateTime.from("2024-01-15T12:30:00")) // false
 * isTemporalInstant(Temporal.ZonedDateTime.from({
 *   timeZone: "UTC",
 *   year: 2024,
 *   month: 1,
 *   day: 15
 * }))  // false (ZonedDateTime)
 * isTemporalInstant(null)                         // false
 * isTemporalInstant(undefined)                    // false
 *
 * // Type narrowing with TypeScript
 * function processInstant(value: unknown): string {
 *   if (isTemporalInstant(value)) {
 *     // TypeScript now knows value is Temporal.Instant
 *     return value.toString() // Can access Instant methods
 *   }
 *   return "Not a valid instant"
 * }
 *
 * // Filtering mixed arrays
 * const mixedValues = [
 *   Temporal.Instant.from("2024-01-15T10:00:00Z"),
 *   "2024-01-15T10:00:00Z",
 *   Date.now(),
 *   new Date(),
 *   Temporal.Now.instant(),
 *   null,
 *   1705315200000 // epoch milliseconds
 * ]
 *
 * const onlyInstants = mixedValues.filter(isTemporalInstant)
 * // [Instant("2024-01-15T10:00:00Z"), Instant(now)]
 *
 * // Validation in function parameters
 * function getSecondsSinceEpoch(instant: unknown): bigint | null {
 *   if (!isTemporalInstant(instant)) {
 *     return null
 *   }
 *   return instant.epochNanoseconds / 1000000000n
 * }
 *
 * const validInstant = Temporal.Now.instant()
 * getSecondsSinceEpoch(validInstant)     // bigint value
 * getSecondsSinceEpoch("2024-01-15T10:00:00Z")  // null (string not accepted)
 *
 * // Strict type checking in APIs
 * function validateTimestamp(input: unknown): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (input === null || input === undefined) {
 *     return { valid: false, error: "Timestamp is required" }
 *   }
 *
 *   if (!isTemporalInstant(input)) {
 *     return {
 *       valid: false,
 *       error: "Must be a Temporal.Instant instance"
 *     }
 *   }
 *
 *   // Check if not in the future
 *   const now = Temporal.Now.instant()
 *   if (Temporal.Instant.compare(input, now) > 0) {
 *     return { valid: false, error: "Timestamp cannot be in the future" }
 *   }
 *
 *   return { valid: true }
 * }
 *
 * // Converting to different time zones
 * function getLocalDateTime(
 *   instant: unknown,
 *   timeZone: string
 * ): Temporal.ZonedDateTime | null {
 *   if (!isTemporalInstant(instant)) {
 *     return null
 *   }
 *
 *   try {
 *     return instant.toZonedDateTimeISO(timeZone)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * // Calculating time differences
 * function getElapsedTime(
 *   start: unknown,
 *   end: unknown
 * ): Temporal.Duration | null {
 *   if (!isTemporalInstant(start) || !isTemporalInstant(end)) {
 *     return null
 *   }
 *
 *   return end.since(start)
 * }
 *
 * // Event timestamp logging
 * interface LogEntry {
 *   message: string
 *   timestamp: unknown
 *   level: string
 * }
 *
 * function formatLogEntry(entry: LogEntry): string {
 *   if (!isTemporalInstant(entry.timestamp)) {
 *     return `[INVALID TIME] ${entry.level}: ${entry.message}`
 *   }
 *
 *   // Convert to ISO string with Z suffix
 *   const iso = entry.timestamp.toString()
 *   return `[${iso}] ${entry.level}: ${entry.message}`
 * }
 *
 * // Performance monitoring
 * interface PerformanceMark {
 *   name: string
 *   instant: unknown
 * }
 *
 * function calculateDuration(
 *   start: PerformanceMark,
 *   end: PerformanceMark
 * ): number | null {
 *   if (!isTemporalInstant(start.instant) || !isTemporalInstant(end.instant)) {
 *     return null
 *   }
 *
 *   const duration = end.instant.since(start.instant)
 *   return duration.total({ unit: "milliseconds" })
 * }
 *
 * // Sorting timestamps chronologically
 * function sortByTimestamp(
 *   entries: Array<{ id: string; timestamp: unknown }>
 * ): Array<{ id: string; timestamp: Temporal.Instant }> {
 *   return entries
 *     .filter(entry => isTemporalInstant(entry.timestamp))
 *     .map(entry => ({
 *       id: entry.id,
 *       timestamp: entry.timestamp as Temporal.Instant
 *     }))
 *     .sort((a, b) => Temporal.Instant.compare(a.timestamp, b.timestamp))
 * }
 *
 * // Session management
 * interface UserSession {
 *   userId: string
 *   createdAt: unknown
 *   expiresAt: unknown
 * }
 *
 * function isSessionValid(session: UserSession): boolean {
 *   if (!isTemporalInstant(session.createdAt) ||
 *       !isTemporalInstant(session.expiresAt)) {
 *     return false
 *   }
 *
 *   const now = Temporal.Now.instant()
 *   return Temporal.Instant.compare(now, session.createdAt) >= 0 &&
 *          Temporal.Instant.compare(now, session.expiresAt) < 0
 * }
 *
 * // Message queue timestamps
 * interface QueueMessage {
 *   id: string
 *   payload: any
 *   enqueuedAt: unknown
 * }
 *
 * function getMessageAge(message: QueueMessage): bigint | null {
 *   if (!isTemporalInstant(message.enqueuedAt)) {
 *     return null
 *   }
 *
 *   const now = Temporal.Now.instant()
 *   const ageNanos = now.epochNanoseconds - message.enqueuedAt.epochNanoseconds
 *   return ageNanos / 1000000n // Convert to milliseconds
 * }
 *
 * // Database audit trails
 * interface AuditRecord {
 *   action: string
 *   performedAt: unknown
 *   userId: string
 * }
 *
 * function filterRecentAudits(
 *   records: Array<AuditRecord>,
 *   hoursAgo: number
 * ): Array<AuditRecord> {
 *   const cutoff = Temporal.Now.instant().subtract({ hours: hoursAgo })
 *
 *   return records.filter(record => {
 *     if (!isTemporalInstant(record.performedAt)) {
 *       return false
 *     }
 *     return Temporal.Instant.compare(record.performedAt, cutoff) >= 0
 *   })
 * }
 *
 * // Serialization helper
 * function serializeInstant(value: unknown): string {
 *   if (isTemporalInstant(value)) {
 *     return JSON.stringify({
 *       type: "Instant",
 *       value: value.toString(),
 *       epochMilliseconds: Number(value.epochMilliseconds),
 *       epochNanoseconds: value.epochNanoseconds.toString()
 *     })
 *   }
 *
 *   return JSON.stringify(value)
 * }
 *
 * // Factory pattern with validation
 * function createInstantOrNull(value: unknown): Temporal.Instant | null {
 *   if (isTemporalInstant(value)) {
 *     return value // Already an Instant
 *   }
 *
 *   if (typeof value === "string") {
 *     try {
 *       return Temporal.Instant.from(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   if (typeof value === "number") {
 *     try {
 *       return Temporal.Instant.fromEpochMilliseconds(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   if (value instanceof Date) {
 *     return Temporal.Instant.fromEpochMilliseconds(value.getTime())
 *   }
 *
 *   return null
 * }
 *
 * // Rate limiting with timestamps
 * interface RateLimitEntry {
 *   attempts: Array<unknown>
 *   windowStart: unknown
 * }
 *
 * function countRecentAttempts(
 *   entry: RateLimitEntry,
 *   windowSeconds: number
 * ): number {
 *   const now = Temporal.Now.instant()
 *   const windowStart = now.subtract({ seconds: windowSeconds })
 *
 *   return entry.attempts.filter(attempt => {
 *     if (!isTemporalInstant(attempt)) {
 *       return false
 *     }
 *     return Temporal.Instant.compare(attempt, windowStart) >= 0
 *   }).length
 * }
 *
 * // Distributed system clock synchronization
 * interface ClockSyncData {
 *   localTime: unknown
 *   serverTime: unknown
 * }
 *
 * function calculateClockOffset(sync: ClockSyncData): bigint | null {
 *   if (!isTemporalInstant(sync.localTime) ||
 *       !isTemporalInstant(sync.serverTime)) {
 *     return null
 *   }
 *
 *   // Offset in nanoseconds
 *   return sync.serverTime.epochNanoseconds - sync.localTime.epochNanoseconds
 * }
 *
 * // Testing utilities
 * function assertIsInstant(
 *   value: unknown
 * ): asserts value is Temporal.Instant {
 *   if (!isTemporalInstant(value)) {
 *     throw new Error("Expected Temporal.Instant instance")
 *   }
 * }
 *
 * // Use in tests
 * function testTimestampOperation() {
 *   const result = someFunctionThatShouldReturnInstant()
 *   assertIsInstant(result)
 *   // TypeScript now knows result is Instant
 *   expect(result.epochMilliseconds).toBeGreaterThan(0)
 * }
 *
 * // Event sourcing timestamps
 * interface DomainEvent {
 *   eventId: string
 *   occurredAt: unknown
 *   eventType: string
 *   payload: any
 * }
 *
 * function getEventsByTimeRange(
 *   events: Array<DomainEvent>,
 *   start: Temporal.Instant,
 *   end: Temporal.Instant
 * ): Array<DomainEvent> {
 *   return events.filter(event => {
 *     if (!isTemporalInstant(event.occurredAt)) {
 *       return false
 *     }
 *
 *     return Temporal.Instant.compare(event.occurredAt, start) >= 0 &&
 *            Temporal.Instant.compare(event.occurredAt, end) <= 0
 *   })
 * }
 *
 * // JWT token validation
 * interface JWTClaims {
 *   iat: unknown // issued at
 *   exp: unknown // expires at
 *   nbf?: unknown // not before
 * }
 *
 * function validateTokenTiming(claims: JWTClaims): boolean {
 *   const now = Temporal.Now.instant()
 *
 *   // Check expiration
 *   if (!isTemporalInstant(claims.exp)) {
 *     return false
 *   }
 *   if (Temporal.Instant.compare(now, claims.exp) >= 0) {
 *     return false // Token expired
 *   }
 *
 *   // Check not before
 *   if (claims.nbf !== undefined) {
 *     if (!isTemporalInstant(claims.nbf)) {
 *       return false
 *     }
 *     if (Temporal.Instant.compare(now, claims.nbf) < 0) {
 *       return false // Token not yet valid
 *     }
 *   }
 *
 *   return true
 * }
 * ```
 *
 * @property Type-guard - Narrows type to Temporal.Instant when true
 * @property Pure - No side effects, only checks type
 * @property Strict - Only returns true for actual Instant instances
 * @property Safe - Handles any input type without throwing
 * @property Runtime - Provides runtime type checking for Temporal types
 */
const isTemporalInstant = (value: unknown): value is Temporal.Instant => {
	try {
		return value instanceof Temporal.Instant
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalInstant
