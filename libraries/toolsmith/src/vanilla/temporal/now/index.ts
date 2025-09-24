/**
 * Gets the current Temporal.Instant
 *
 * Returns the current moment in time as a Temporal.Instant, which represents
 * a fixed point in time without any time zone or calendar information. An
 * Instant is the most precise way to capture "now" and can be converted to
 * any time zone or calendar system. This is a wrapper around Temporal.Now.instant()
 * for consistency with the library's functional style.
 *
 * @returns The current Temporal.Instant
 * @example
 * ```typescript
 * // Basic usage
 * const currentInstant = now()            // Temporal.Instant
 *
 * // Convert to ISO string
 * const isoString = now().toString()      // "2024-03-15T14:30:45.123456789Z"
 *
 * // Get epoch milliseconds
 * const epochMs = now().epochMilliseconds // 1710513045123
 *
 * // Get epoch nanoseconds (BigInt for precision)
 * const epochNs = now().epochNanoseconds  // 1710513045123456789n
 *
 * // Convert to specific time zone
 * const getCurrentTimeInZone = (zone: string): Temporal.ZonedDateTime =>
 *   now().toZonedDateTimeISO(zone)
 *
 * // Performance timing
 * const timeOperation = <T>(operation: () => T): { result: T, durationMs: number } => {
 *   const start = now()
 *   const result = operation()
 *   const end = now()
 *   const durationNs = end.epochNanoseconds - start.epochNanoseconds
 *   return { result, durationMs: Number(durationNs / 1000000n) }
 * }
 *
 * // Cache expiry checker
 * const isCacheExpired = (
 *   cachedAt: Temporal.Instant,
 *   ttlSeconds: number
 * ): boolean => {
 *   const elapsedMs = now().epochMilliseconds - cachedAt.epochMilliseconds
 *   return elapsedMs > ttlSeconds * 1000
 * }
 *
 * // Note: now() is impure - returns different values each call
 * const t1 = now()
 * const t2 = now()
 * t1.equals(t2)                           // false (unless same nanosecond)
 * ```
 * @impure
 */
const now = (): Temporal.Instant => {
	return Temporal.Now.instant()
}

export default now
