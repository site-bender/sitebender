/**
 * Checks if a value is a Temporal.Duration instance
 * 
 * Type guard that validates whether a value is an instance of the
 * Temporal.Duration class. This is useful for runtime type checking
 * when working with Temporal API duration objects. Returns true only for
 * actual Temporal.Duration instances, not for duration strings or other
 * duration-like values that could be converted to Duration.
 * 
 * Validation rules:
 * - Must be an actual Temporal.Duration instance
 * - Not just duration-like or convertible to Duration
 * - Returns false for null, undefined, or any non-Duration value
 * - Type narrows to Temporal.Duration when true
 * 
 * @param value - The value to check
 * @returns True if value is a Temporal.Duration, false otherwise
 * @example
 * ```typescript
 * // Valid Temporal.Duration instances
 * const dur1 = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * const dur2 = Temporal.Duration.from("PT2H30M")
 * const dur3 = new Temporal.Duration(0, 0, 0, 5, 2, 30)
 * 
 * isTemporalDuration(dur1)  // true
 * isTemporalDuration(dur2)  // true
 * isTemporalDuration(dur3)  // true
 * 
 * // Invalid - not Duration instances
 * isTemporalDuration("PT2H30M")                   // false (string)
 * isTemporalDuration({ hours: 2, minutes: 30 })   // false (object)
 * isTemporalDuration(150)                         // false (number of minutes)
 * isTemporalDuration(new Date())                  // false (JS Date)
 * isTemporalDuration(Temporal.PlainDate.from("2024-01-15")) // false
 * isTemporalDuration(null)                        // false
 * isTemporalDuration(undefined)                   // false
 * 
 * // Type narrowing with TypeScript
 * function processDuration(value: unknown): string {
 *   if (isTemporalDuration(value)) {
 *     // TypeScript now knows value is Temporal.Duration
 *     return value.toString() // Can access Duration methods
 *   }
 *   return "Not a valid duration"
 * }
 * 
 * // Filtering mixed arrays
 * const mixedValues = [
 *   Temporal.Duration.from({ hours: 1 }),
 *   "PT1H",
 *   { hours: 2, minutes: 30 },
 *   Temporal.Duration.from({ days: 1 }),
 *   150, // minutes as number
 *   null,
 *   Temporal.Duration.from("PT45M")
 * ]
 * 
 * const onlyDurations = mixedValues.filter(isTemporalDuration)
 * // [Duration(PT1H), Duration(P1D), Duration(PT45M)]
 * 
 * // Validation in function parameters
 * function addDuration(
 *   duration1: unknown,
 *   duration2: unknown
 * ): Temporal.Duration | null {
 *   if (!isTemporalDuration(duration1) || !isTemporalDuration(duration2)) {
 *     return null
 *   }
 *   return duration1.add(duration2)
 * }
 * 
 * const dur1 = Temporal.Duration.from({ hours: 2 })
 * const dur2 = Temporal.Duration.from({ minutes: 30 })
 * addDuration(dur1, dur2)     // Duration(PT2H30M)
 * addDuration("PT2H", dur2)   // null (string not accepted)
 * 
 * // Strict type checking in APIs
 * function validateDurationInput(input: unknown): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (input === null || input === undefined) {
 *     return { valid: false, error: "Duration is required" }
 *   }
 *   
 *   if (!isTemporalDuration(input)) {
 *     return { 
 *       valid: false, 
 *       error: "Must be a Temporal.Duration instance" 
 *     }
 *   }
 *   
 *   // Additional validation
 *   if (input.sign < 0) {
 *     return { valid: false, error: "Duration cannot be negative" }
 *   }
 *   
 *   return { valid: true }
 * }
 * 
 * // Converting durations to different units
 * function getDurationInMinutes(value: unknown): number | null {
 *   if (!isTemporalDuration(value)) {
 *     return null
 *   }
 *   
 *   // Safe to access Duration properties
 *   return value.total({ unit: "minutes" })
 * }
 * 
 * // Formatting durations for display
 * function formatDuration(value: unknown): string {
 *   if (!isTemporalDuration(value)) {
 *     return "Invalid duration"
 *   }
 *   
 *   const parts: Array<string> = []
 *   
 *   if (value.years) parts.push(`${value.years}y`)
 *   if (value.months) parts.push(`${value.months}mo`)
 *   if (value.days) parts.push(`${value.days}d`)
 *   if (value.hours) parts.push(`${value.hours}h`)
 *   if (value.minutes) parts.push(`${value.minutes}m`)
 *   if (value.seconds) parts.push(`${value.seconds}s`)
 *   
 *   return parts.length > 0 ? parts.join(" ") : "0s"
 * }
 * 
 * // Timer/stopwatch functionality
 * interface TimerState {
 *   elapsed: unknown
 *   isRunning: boolean
 * }
 * 
 * function getElapsedTime(state: TimerState): string {
 *   if (!isTemporalDuration(state.elapsed)) {
 *     return "00:00:00"
 *   }
 *   
 *   const hours = String(state.elapsed.hours).padStart(2, '0')
 *   const minutes = String(state.elapsed.minutes).padStart(2, '0')
 *   const seconds = String(state.elapsed.seconds).padStart(2, '0')
 *   
 *   return `${hours}:${minutes}:${seconds}`
 * }
 * 
 * // Task estimation
 * function calculateTotalEffort(
 *   tasks: Array<{ name: string; estimate: unknown }>
 * ): Temporal.Duration | null {
 *   let total = Temporal.Duration.from({ hours: 0 })
 *   
 *   for (const task of tasks) {
 *     if (!isTemporalDuration(task.estimate)) {
 *       return null // Invalid estimate found
 *     }
 *     total = total.add(task.estimate)
 *   }
 *   
 *   return total
 * }
 * 
 * // Duration comparison
 * function isLongerThan(
 *   duration1: unknown,
 *   duration2: unknown
 * ): boolean {
 *   if (!isTemporalDuration(duration1) || !isTemporalDuration(duration2)) {
 *     return false
 *   }
 *   
 *   return Temporal.Duration.compare(duration1, duration2) > 0
 * }
 * 
 * // Sorting durations
 * function sortDurations(values: Array<unknown>): Array<Temporal.Duration> {
 *   return values
 *     .filter(isTemporalDuration)
 *     .sort(Temporal.Duration.compare)
 * }
 * 
 * // Meeting duration validation
 * function isValidMeetingDuration(duration: unknown): boolean {
 *   if (!isTemporalDuration(duration)) {
 *     return false
 *   }
 *   
 *   const totalMinutes = duration.total({ unit: "minutes" })
 *   
 *   // Meetings should be between 15 minutes and 4 hours
 *   return totalMinutes >= 15 && totalMinutes <= 240
 * }
 * 
 * // SLA compliance checking
 * interface SLARequirement {
 *   responseTime: unknown
 *   resolutionTime: unknown
 * }
 * 
 * function validateSLA(sla: SLARequirement): boolean {
 *   if (!isTemporalDuration(sla.responseTime) || 
 *       !isTemporalDuration(sla.resolutionTime)) {
 *     return false
 *   }
 *   
 *   // Response time should be less than resolution time
 *   return Temporal.Duration.compare(
 *     sla.responseTime,
 *     sla.resolutionTime
 *   ) < 0
 * }
 * 
 * // Serialization helper
 * function serializeDuration(value: unknown): string {
 *   if (isTemporalDuration(value)) {
 *     return JSON.stringify({
 *       type: "Duration",
 *       value: value.toString(),
 *       components: {
 *         years: value.years,
 *         months: value.months,
 *         days: value.days,
 *         hours: value.hours,
 *         minutes: value.minutes,
 *         seconds: value.seconds,
 *         milliseconds: value.milliseconds,
 *         microseconds: value.microseconds,
 *         nanoseconds: value.nanoseconds
 *       }
 *     })
 *   }
 *   
 *   return JSON.stringify(value)
 * }
 * 
 * // Factory pattern with validation
 * function createDurationOrNull(value: unknown): Temporal.Duration | null {
 *   if (isTemporalDuration(value)) {
 *     return value // Already a Duration
 *   }
 *   
 *   if (typeof value === "string") {
 *     try {
 *       return Temporal.Duration.from(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *   
 *   if (typeof value === "object" && value !== null) {
 *     try {
 *       return Temporal.Duration.from(value as any)
 *     } catch {
 *       return null
 *     }
 *   }
 *   
 *   return null
 * }
 * 
 * // Workout/exercise tracking
 * interface Exercise {
 *   name: string
 *   duration: unknown
 *   restTime: unknown
 * }
 * 
 * function getTotalWorkoutTime(exercises: Array<Exercise>): Temporal.Duration | null {
 *   let total = Temporal.Duration.from({ seconds: 0 })
 *   
 *   for (const exercise of exercises) {
 *     if (!isTemporalDuration(exercise.duration) || 
 *         !isTemporalDuration(exercise.restTime)) {
 *       return null
 *     }
 *     
 *     total = total.add(exercise.duration).add(exercise.restTime)
 *   }
 *   
 *   return total
 * }
 * 
 * // Video/media duration handling
 * function formatMediaDuration(value: unknown): string {
 *   if (!isTemporalDuration(value)) {
 *     return "--:--"
 *   }
 *   
 *   const totalSeconds = Math.floor(value.total({ unit: "seconds" }))
 *   const hours = Math.floor(totalSeconds / 3600)
 *   const minutes = Math.floor((totalSeconds % 3600) / 60)
 *   const seconds = totalSeconds % 60
 *   
 *   if (hours > 0) {
 *     return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
 *   }
 *   
 *   return `${minutes}:${String(seconds).padStart(2, '0')}`
 * }
 * 
 * // Rate limiting calculations
 * interface RateLimitConfig {
 *   window: unknown
 *   maxRequests: number
 * }
 * 
 * function calculateRequestRate(config: RateLimitConfig): number | null {
 *   if (!isTemporalDuration(config.window)) {
 *     return null
 *   }
 *   
 *   const windowSeconds = config.window.total({ unit: "seconds" })
 *   if (windowSeconds === 0) return null
 *   
 *   return config.maxRequests / windowSeconds // requests per second
 * }
 * 
 * // Testing utilities
 * function assertIsDuration(
 *   value: unknown
 * ): asserts value is Temporal.Duration {
 *   if (!isTemporalDuration(value)) {
 *     throw new Error("Expected Temporal.Duration instance")
 *   }
 * }
 * 
 * // Use in tests
 * function testDurationOperation() {
 *   const result = someFunctionThatShouldReturnDuration()
 *   assertIsDuration(result)
 *   // TypeScript now knows result is Duration
 *   expect(result.hours).toBe(2)
 *   expect(result.minutes).toBe(30)
 * }
 * 
 * // Billing period calculations
 * interface BillingPeriod {
 *   duration: unknown
 *   rate: number // per hour
 * }
 * 
 * function calculateBillingAmount(period: BillingPeriod): number | null {
 *   if (!isTemporalDuration(period.duration)) {
 *     return null
 *   }
 *   
 *   const hours = period.duration.total({ unit: "hours" })
 *   return hours * period.rate
 * }
 * 
 * // Caching TTL management
 * interface CacheEntry {
 *   value: any
 *   ttl: unknown
 *   createdAt: Temporal.Instant
 * }
 * 
 * function isCacheExpired(entry: CacheEntry): boolean {
 *   if (!isTemporalDuration(entry.ttl)) {
 *     return true // Invalid TTL means expired
 *   }
 *   
 *   const now = Temporal.Now.instant()
 *   const expiresAt = entry.createdAt.add(entry.ttl)
 *   
 *   return Temporal.Instant.compare(now, expiresAt) > 0
 * }
 * ```
 * 
 * @property Type-guard - Narrows type to Temporal.Duration when true
 * @property Pure - No side effects, only checks type
 * @property Strict - Only returns true for actual Duration instances
 * @property Safe - Handles any input type without throwing
 * @property Runtime - Provides runtime type checking for Temporal types
 */
const isTemporalDuration = (value: unknown): value is Temporal.Duration => {
	try {
		return value instanceof Temporal.Duration
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalDuration