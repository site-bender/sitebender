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
 * function getCurrentTimeInZone(zone: string): Temporal.ZonedDateTime {
 *   return now().toZonedDateTimeISO(zone)
 * }
 *
 * getCurrentTimeInZone("America/New_York") // Current time in New York
 * getCurrentTimeInZone("Europe/London")    // Current time in London
 * getCurrentTimeInZone("Asia/Tokyo")       // Current time in Tokyo
 *
 * // Get current date in specific zone
 * function getTodayInZone(zone: string): Temporal.PlainDate {
 *   return now().toZonedDateTimeISO(zone).toPlainDate()
 * }
 *
 * getTodayInZone("America/Los_Angeles")   // Today's date in LA
 * getTodayInZone("Australia/Sydney")      // Today's date in Sydney (might be tomorrow!)
 *
 * // Performance timing
 * function timeOperation<T>(operation: () => T): { result: T, durationMs: number } {
 *   const start = now()
 *   const result = operation()
 *   const end = now()
 *
 *   const durationNs = end.epochNanoseconds - start.epochNanoseconds
 *   const durationMs = Number(durationNs / 1000000n)
 *
 *   return { result, durationMs }
 * }
 *
 * const { result, durationMs } = timeOperation(() => {
 *   // Some expensive operation
 *   return Array.from({ length: 1000000 }, (_, i) => i * 2)
 * })
 * console.log(`Operation took ${durationMs}ms`)
 *
 * // Unix timestamp generator
 * function getUnixTimestamp(): number {
 *   return Math.floor(now().epochMilliseconds / 1000)
 * }
 *
 * getUnixTimestamp()                      // 1710513045 (seconds since epoch)
 *
 * // High-precision timestamp for logging
 * function getLogTimestamp(): string {
 *   const instant = now()
 *   const zdt = instant.toZonedDateTimeISO("UTC")
 *
 *   return `${zdt.year}-${String(zdt.month).padStart(2, '0')}-${String(zdt.day).padStart(2, '0')} ` +
 *          `${String(zdt.hour).padStart(2, '0')}:${String(zdt.minute).padStart(2, '0')}:` +
 *          `${String(zdt.second).padStart(2, '0')}.${String(zdt.millisecond).padStart(3, '0')}`
 * }
 *
 * getLogTimestamp()                        // "2024-03-15 14:30:45.123"
 *
 * // Time since epoch
 * function getTimeSinceEpoch(): {
 *   days: number,
 *   hours: number,
 *   minutes: number,
 *   seconds: number
 * } {
 *   const epochSeconds = Math.floor(now().epochMilliseconds / 1000)
 *
 *   const days = Math.floor(epochSeconds / 86400)
 *   const hours = Math.floor((epochSeconds % 86400) / 3600)
 *   const minutes = Math.floor((epochSeconds % 3600) / 60)
 *   const seconds = epochSeconds % 60
 *
 *   return { days, hours, minutes, seconds }
 * }
 *
 * // Cache expiry checker
 * function isCacheExpired(
 *   cachedAt: Temporal.Instant,
 *   ttlSeconds: number
 * ): boolean {
 *   const currentTime = now()
 *   const elapsedMs = currentTime.epochMilliseconds - cachedAt.epochMilliseconds
 *
 *   return elapsedMs > ttlSeconds * 1000
 * }
 *
 * const cached = now()
 * // ... later ...
 * isCacheExpired(cached, 300)             // true if more than 5 minutes passed
 *
 * // Rate limiting
 * function canMakeRequest(
 *   lastRequest: Temporal.Instant | null,
 *   minIntervalMs: number = 1000
 * ): boolean {
 *   if (lastRequest === null) return true
 *
 *   const currentTime = now()
 *   const elapsed = currentTime.epochMilliseconds - lastRequest.epochMilliseconds
 *
 *   return elapsed >= minIntervalMs
 * }
 *
 * // Session timeout
 * function isSessionActive(
 *   lastActivity: Temporal.Instant,
 *   timeoutMinutes: number = 30
 * ): boolean {
 *   const currentTime = now()
 *   const elapsedMs = currentTime.epochMilliseconds - lastActivity.epochMilliseconds
 *   const elapsedMinutes = elapsedMs / (1000 * 60)
 *
 *   return elapsedMinutes < timeoutMinutes
 * }
 *
 * // Countdown timer
 * function getTimeUntil(target: Temporal.Instant): {
 *   days: number,
 *   hours: number,
 *   minutes: number,
 *   seconds: number
 * } {
 *   const current = now()
 *   const diffMs = target.epochMilliseconds - current.epochMilliseconds
 *
 *   if (diffMs <= 0) {
 *     return { days: 0, hours: 0, minutes: 0, seconds: 0 }
 *   }
 *
 *   const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
 *   const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
 *   const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
 *   const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
 *
 *   return { days, hours, minutes, seconds }
 * }
 *
 * // JWT expiry checker
 * function isTokenExpired(expiryTimestamp: number): boolean {
 *   // JWT exp is in seconds
 *   const currentSeconds = Math.floor(now().epochMilliseconds / 1000)
 *   return currentSeconds >= expiryTimestamp
 * }
 *
 * // Distributed system clock synchronization
 * function getClockOffset(serverTime: Temporal.Instant): number {
 *   const clientTime = now()
 *   return serverTime.epochMilliseconds - clientTime.epochMilliseconds
 * }
 *
 * // Event scheduling
 * function scheduleAt(targetTime: Temporal.Instant, callback: () => void): NodeJS.Timeout {
 *   const delay = targetTime.epochMilliseconds - now().epochMilliseconds
 *
 *   if (delay <= 0) {
 *     callback()
 *     return setTimeout(() => {}, 0)  // Return dummy timeout
 *   }
 *
 *   return setTimeout(callback, delay)
 * }
 *
 * // Unique timestamp ID generator
 * function generateTimestampId(prefix: string = ""): string {
 *   const instant = now()
 *   const nanos = instant.epochNanoseconds.toString()
 *
 *   return prefix + nanos
 * }
 *
 * generateTimestampId("event_")           // "event_1710513045123456789"
 *
 * // Age calculator from instant
 * function getAgeFromInstant(birthInstant: Temporal.Instant): number {
 *   const current = now()
 *   const birth = birthInstant.toZonedDateTimeISO("UTC").toPlainDate()
 *   const today = current.toZonedDateTimeISO("UTC").toPlainDate()
 *
 *   let age = today.year - birth.year
 *
 *   if (today.month < birth.month ||
 *       (today.month === birth.month && today.day < birth.day)) {
 *     age--
 *   }
 *
 *   return age
 * }
 *
 * // Monitoring heartbeat
 * function isServiceHealthy(
 *   lastHeartbeat: Temporal.Instant,
 *   maxSilenceSeconds: number = 60
 * ): boolean {
 *   const current = now()
 *   const silenceMs = current.epochMilliseconds - lastHeartbeat.epochMilliseconds
 *
 *   return silenceMs < maxSilenceSeconds * 1000
 * }
 *
 * // Relative time formatter
 * function getRelativeTime(instant: Temporal.Instant): string {
 *   const current = now()
 *   const diffMs = current.epochMilliseconds - instant.epochMilliseconds
 *   const absDiff = Math.abs(diffMs)
 *
 *   const seconds = Math.floor(absDiff / 1000)
 *   const minutes = Math.floor(seconds / 60)
 *   const hours = Math.floor(minutes / 60)
 *   const days = Math.floor(hours / 24)
 *
 *   const isFuture = diffMs < 0
 *   const suffix = isFuture ? "from now" : "ago"
 *
 *   if (days > 0) return `${days} day${days > 1 ? 's' : ''} ${suffix}`
 *   if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ${suffix}`
 *   if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ${suffix}`
 *   if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''} ${suffix}`
 *
 *   return "just now"
 * }
 *
 * const fiveMinutesAgo = Temporal.Instant.from(
 *   now().epochMilliseconds - 5 * 60 * 1000
 * )
 * getRelativeTime(fiveMinutesAgo)         // "5 minutes ago"
 * ```
 * @property Pure - Always returns current time at moment of execution
 * @property Precise - Nanosecond precision timestamp
 * @property Universal - Returns UTC-based instant, convertible to any timezone
 * @property Monotonic - Suitable for measuring time intervals
 */
const now = (): Temporal.Instant => {
	return Temporal.Now.instant()
}

export default now
