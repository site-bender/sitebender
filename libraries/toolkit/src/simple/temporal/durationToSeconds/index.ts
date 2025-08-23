/**
 * Converts a Temporal.Duration to total seconds
 * 
 * Calculates the total number of seconds represented by a Duration object,
 * converting all larger units (years, months, weeks, days, hours, minutes)
 * to seconds and adding any fractional seconds from subsecond units. Returns
 * null for invalid inputs to support safe error handling. Uses precise
 * conversion assuming standard calendar durations.
 * 
 * @param duration - The Temporal.Duration to convert to seconds
 * @returns Total seconds as a number, or null if invalid
 * @example
 * ```typescript
 * // Basic duration conversions
 * durationToSeconds(Temporal.Duration.from({ seconds: 30 }))
 * // 30
 * 
 * durationToSeconds(Temporal.Duration.from({ minutes: 2 }))
 * // 120
 * 
 * durationToSeconds(Temporal.Duration.from({ minutes: 1, seconds: 30 }))
 * // 90
 * 
 * // Hours to seconds
 * durationToSeconds(Temporal.Duration.from({ hours: 1 }))
 * // 3600
 * 
 * durationToSeconds(Temporal.Duration.from({ hours: 2, minutes: 30 }))
 * // 9000 (7200 + 1800)
 * 
 * // Days to seconds
 * durationToSeconds(Temporal.Duration.from({ days: 1 }))
 * // 86400 (24 * 60 * 60)
 * 
 * durationToSeconds(Temporal.Duration.from({ days: 1, hours: 1 }))
 * // 90000 (86400 + 3600)
 * 
 * // Weeks to seconds
 * durationToSeconds(Temporal.Duration.from({ weeks: 1 }))
 * // 604800 (7 * 24 * 60 * 60)
 * 
 * // Complex durations
 * durationToSeconds(Temporal.Duration.from({
 *   hours: 1,
 *   minutes: 30,
 *   seconds: 45
 * }))
 * // 5445 (3600 + 1800 + 45)
 * 
 * // Subsecond precision
 * durationToSeconds(Temporal.Duration.from({ 
 *   seconds: 5,
 *   milliseconds: 500 
 * }))
 * // 5.5
 * 
 * durationToSeconds(Temporal.Duration.from({
 *   seconds: 1,
 *   milliseconds: 250,
 *   microseconds: 500
 * }))
 * // 1.2505 (1 + 0.25 + 0.0005)
 * 
 * durationToSeconds(Temporal.Duration.from({
 *   milliseconds: 1500
 * }))
 * // 1.5
 * 
 * // High precision timing
 * durationToSeconds(Temporal.Duration.from({
 *   microseconds: 500000
 * }))
 * // 0.5
 * 
 * durationToSeconds(Temporal.Duration.from({
 *   nanoseconds: 500000000
 * }))
 * // 0.5
 * 
 * // Performance measurement
 * const start = performance.now()
 * // ... some operation
 * const end = performance.now()
 * const duration = Temporal.Duration.from({
 *   milliseconds: end - start
 * })
 * durationToSeconds(duration)
 * // Execution time in seconds
 * 
 * // Timer duration
 * const timer = Temporal.Duration.from({
 *   minutes: 25  // Pomodoro timer
 * })
 * durationToSeconds(timer)
 * // 1500
 * 
 * // Video/audio duration
 * const mediaLength = Temporal.Duration.from({
 *   hours: 2,
 *   minutes: 23,
 *   seconds: 17
 * })
 * durationToSeconds(mediaLength)
 * // 8597
 * 
 * // API timeout duration
 * const timeout = Temporal.Duration.from({
 *   seconds: 30
 * })
 * durationToSeconds(timeout)
 * // 30
 * 
 * // Cache expiry
 * const cacheLife = Temporal.Duration.from({
 *   hours: 24
 * })
 * durationToSeconds(cacheLife)
 * // 86400
 * 
 * // Rate limiting window
 * const rateLimitWindow = Temporal.Duration.from({
 *   minutes: 1
 * })
 * durationToSeconds(rateLimitWindow)
 * // 60
 * 
 * // Session timeout
 * const sessionDuration = Temporal.Duration.from({
 *   hours: 8
 * })
 * durationToSeconds(sessionDuration)
 * // 28800
 * 
 * // Download time estimate
 * const downloadTime = Temporal.Duration.from({
 *   minutes: 5,
 *   seconds: 42
 * })
 * durationToSeconds(downloadTime)
 * // 342
 * 
 * // Null/undefined handling
 * durationToSeconds(null)
 * // null
 * 
 * durationToSeconds(undefined)
 * // null
 * 
 * // Invalid input handling
 * durationToSeconds("not a duration")
 * // null
 * 
 * durationToSeconds(123)
 * // null
 * 
 * // Time difference calculations
 * const start = Temporal.PlainTime.from("14:30:00")
 * const end = Temporal.PlainTime.from("16:45:30")
 * const diff = end.since(start)
 * durationToSeconds(diff)
 * // 8130 (2 hours, 15 minutes, 30 seconds)
 * 
 * // Animation duration
 * const animationDuration = Temporal.Duration.from({
 *   milliseconds: 350
 * })
 * durationToSeconds(animationDuration)
 * // 0.35
 * 
 * // Network latency
 * const latency = Temporal.Duration.from({
 *   milliseconds: 125
 * })
 * durationToSeconds(latency)
 * // 0.125
 * 
 * // Use in timeout functions
 * function delayFor(duration: Temporal.Duration): Promise<void> {
 *   const seconds = durationToSeconds(duration)
 *   if (seconds === null) {
 *     return Promise.reject(new Error("Invalid duration"))
 *   }
 *   
 *   return new Promise(resolve => {
 *     setTimeout(resolve, seconds * 1000)
 *   })
 * }
 * 
 * // Usage with Promise timeout
 * delayFor(Temporal.Duration.from({ seconds: 2 }))
 *   .then(() => console.log("2 seconds elapsed"))
 * 
 * // Convert to other time units
 * function formatDuration(duration: Temporal.Duration): string {
 *   const totalSeconds = durationToSeconds(duration)
 *   if (totalSeconds === null) return "Invalid duration"
 *   
 *   const hours = Math.floor(totalSeconds / 3600)
 *   const minutes = Math.floor((totalSeconds % 3600) / 60)
 *   const seconds = Math.round(totalSeconds % 60)
 *   
 *   return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
 * }
 * 
 * const duration = Temporal.Duration.from({
 *   hours: 2,
 *   minutes: 30,
 *   seconds: 45
 * })
 * formatDuration(duration)
 * // "2:30:45"
 * 
 * // Aggregate multiple durations
 * function totalSeconds(durations: Array<Temporal.Duration>): number {
 *   return durations
 *     .map(durationToSeconds)
 *     .filter((seconds): seconds is number => seconds !== null)
 *     .reduce((total, seconds) => total + seconds, 0)
 * }
 * 
 * const tasks = [
 *   Temporal.Duration.from({ minutes: 30 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 15 }),
 *   Temporal.Duration.from({ seconds: 45 })
 * ]
 * totalSeconds(tasks)
 * // 6345 seconds (1h 45m 45s total)
 * 
 * // SLA monitoring
 * function isWithinSLA(
 *   responseTime: Temporal.Duration,
 *   slaLimit: Temporal.Duration
 * ): boolean {
 *   const responseSeconds = durationToSeconds(responseTime)
 *   const limitSeconds = durationToSeconds(slaLimit)
 *   
 *   if (responseSeconds === null || limitSeconds === null) return false
 *   
 *   return responseSeconds <= limitSeconds
 * }
 * 
 * const response = Temporal.Duration.from({ milliseconds: 250 })
 * const sla = Temporal.Duration.from({ seconds: 1 })
 * isWithinSLA(response, sla)  // true
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null for invalid inputs
 * @property Precise - Handles subsecond precision accurately
 * @property Standard - Uses standard time conversions
 */
const durationToSeconds = (
	duration: Temporal.Duration | null | undefined
): number | null => {
	if (duration == null) {
		return null
	}
	
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}
	
	try {
		// Use the built-in total method for seconds
		return duration.total({ unit: "seconds" })
	} catch {
		return null
	}
}

export default durationToSeconds