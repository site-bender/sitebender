/**
 * Gets the total duration in a specific unit
 * 
 * Converts a Temporal.Duration to a total numeric value in the specified unit.
 * Unlike the duration properties which show individual components, this returns
 * the entire duration expressed as a single unit (e.g., total seconds, total
 * days). Handles fractional values for precise calculations. This is a curried
 * function for easy composition. Returns null for invalid inputs to support
 * safe error handling.
 * 
 * @curried (unit) => (duration) => total
 * @param unit - The unit to measure: "years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds", "microseconds", "nanoseconds"
 * @param duration - The Temporal.Duration to measure
 * @returns Total duration in the specified unit, or null if invalid
 * @example
 * ```typescript
 * // Basic usage - convert to single unit
 * const duration = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * totalDuration("minutes")(duration)      // 150 (2.5 hours = 150 minutes)
 * totalDuration("seconds")(duration)      // 9000 (150 minutes = 9000 seconds)
 * totalDuration("hours")(duration)        // 2.5
 * 
 * // Complex duration
 * const complex = Temporal.Duration.from({ 
 *   days: 1, 
 *   hours: 12, 
 *   minutes: 30,
 *   seconds: 45
 * })
 * totalDuration("hours")(complex)         // 36.5125 (1.5 days + 30.75 minutes)
 * totalDuration("minutes")(complex)       // 2190.75
 * totalDuration("seconds")(complex)       // 131445
 * 
 * // Fractional values
 * const precise = Temporal.Duration.from({ 
 *   minutes: 5, 
 *   seconds: 30,
 *   milliseconds: 500
 * })
 * totalDuration("seconds")(precise)       // 330.5
 * totalDuration("milliseconds")(precise)  // 330500
 * 
 * // Large durations
 * const year = Temporal.Duration.from({ years: 1 })
 * totalDuration("days")(year)             // 365 (approximate, calendar-dependent)
 * totalDuration("hours")(year)            // 8760 (365 * 24)
 * totalDuration("minutes")(year)          // 525600
 * 
 * // Small durations with high precision
 * const tiny = Temporal.Duration.from({ 
 *   milliseconds: 1,
 *   microseconds: 500,
 *   nanoseconds: 250
 * })
 * totalDuration("microseconds")(tiny)     // 1500.25
 * totalDuration("nanoseconds")(tiny)      // 1500250
 * 
 * // Helper for specific units
 * const toHours = totalDuration("hours")
 * const toMinutes = totalDuration("minutes")
 * const toSeconds = totalDuration("seconds")
 * 
 * const workDay = Temporal.Duration.from({ hours: 8 })
 * toMinutes(workDay)                      // 480
 * toSeconds(workDay)                      // 28800
 * 
 * // Time tracking calculator
 * function calculateBillableHours(
 *   sessions: Array<Temporal.Duration>
 * ): number {
 *   const getHours = totalDuration("hours")
 *   const hours = sessions.map(getHours).filter(h => h !== null) as Array<number>
 *   return hours.reduce((sum, h) => sum + h, 0)
 * }
 * 
 * const workSessions = [
 *   Temporal.Duration.from({ hours: 2, minutes: 30 }),
 *   Temporal.Duration.from({ hours: 3, minutes: 15 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 45 })
 * ]
 * calculateBillableHours(workSessions)    // 7.5 hours total
 * 
 * // Download time estimator
 * function estimateDownloadTime(
 *   bytesRemaining: number,
 *   bytesPerSecond: number
 * ): { seconds: number; formatted: string } {
 *   const seconds = bytesRemaining / bytesPerSecond
 *   const duration = Temporal.Duration.from({ seconds })
 *   
 *   const totalMinutes = totalDuration("minutes")(duration) ?? 0
 *   const totalHours = totalDuration("hours")(duration) ?? 0
 *   
 *   let formatted: string
 *   if (totalHours >= 1) {
 *     formatted = `${totalHours.toFixed(1)} hours`
 *   } else if (totalMinutes >= 1) {
 *     formatted = `${Math.round(totalMinutes)} minutes`
 *   } else {
 *     formatted = `${Math.round(seconds)} seconds`
 *   }
 *   
 *   return { seconds, formatted }
 * }
 * 
 * estimateDownloadTime(1_000_000_000, 1_000_000)  // 1000 seconds, "17 minutes"
 * 
 * // Batch conversion
 * const durations = [
 *   Temporal.Duration.from({ minutes: 30 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 15 }),
 *   Temporal.Duration.from({ hours: 2 })
 * ]
 * 
 * const inMinutes = totalDuration("minutes")
 * durations.map(inMinutes)                // [30, 75, 120]
 * 
 * // Invalid input handling
 * totalDuration("hours")(null)            // null
 * totalDuration("hours")(undefined)       // null
 * totalDuration("invalid")(duration)      // null (invalid unit)
 * totalDuration("hours")("PT2H30M")       // null (string, not Duration)
 * 
 * // Media duration formatter
 * function formatMediaDuration(
 *   duration: Temporal.Duration
 * ): string {
 *   const totalSeconds = totalDuration("seconds")(duration)
 *   if (totalSeconds === null) return "0:00"
 *   
 *   const hours = Math.floor(totalSeconds / 3600)
 *   const minutes = Math.floor((totalSeconds % 3600) / 60)
 *   const seconds = Math.floor(totalSeconds % 60)
 *   
 *   if (hours > 0) {
 *     return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
 *   } else {
 *     return `${minutes}:${String(seconds).padStart(2, '0')}`
 *   }
 * }
 * 
 * formatMediaDuration(Temporal.Duration.from({ minutes: 3, seconds: 45 }))  // "3:45"
 * formatMediaDuration(Temporal.Duration.from({ hours: 1, minutes: 23, seconds: 45 }))  // "1:23:45"
 * 
 * // Performance metrics
 * function analyzePerformance(
 *   operations: Array<{ name: string; duration: Temporal.Duration }>
 * ): Array<{ name: string; milliseconds: number | null; percentage: number }> {
 *   const toMs = totalDuration("milliseconds")
 *   const allMs = operations.map(op => toMs(op.duration)).filter(ms => ms !== null) as Array<number>
 *   const totalMs = allMs.reduce((sum, ms) => sum + ms, 0)
 *   
 *   return operations.map(op => {
 *     const ms = toMs(op.duration)
 *     return {
 *       name: op.name,
 *       milliseconds: ms,
 *       percentage: ms ? (ms / totalMs) * 100 : 0
 *     }
 *   })
 * }
 * 
 * // Rate calculator
 * function calculateRate(
 *   amount: number,
 *   duration: Temporal.Duration,
 *   per: "second" | "minute" | "hour" | "day"
 * ): number | null {
 *   const total = totalDuration(`${per}s` as any)(duration)
 *   if (total === null || total === 0) return null
 *   
 *   return amount / total
 * }
 * 
 * const processed = 1000
 * const timeTaken = Temporal.Duration.from({ minutes: 5 })
 * calculateRate(processed, timeTaken, "minute")  // 200 per minute
 * calculateRate(processed, timeTaken, "second")  // 3.33 per second
 * 
 * // Progress calculator
 * function calculateProgress(
 *   elapsed: Temporal.Duration,
 *   total: Temporal.Duration
 * ): number {
 *   const elapsedMs = totalDuration("milliseconds")(elapsed) ?? 0
 *   const totalMs = totalDuration("milliseconds")(total) ?? 1
 *   
 *   return Math.min(100, (elapsedMs / totalMs) * 100)
 * }
 * 
 * const elapsedTime = Temporal.Duration.from({ minutes: 30 })
 * const totalTime = Temporal.Duration.from({ hours: 2 })
 * calculateProgress(elapsedTime, totalTime)  // 25 (percent)
 * 
 * // Timeout validator
 * function isWithinTimeout(
 *   elapsed: Temporal.Duration,
 *   timeoutSeconds: number
 * ): boolean {
 *   const elapsedSeconds = totalDuration("seconds")(elapsed)
 *   if (elapsedSeconds === null) return false
 *   
 *   return elapsedSeconds <= timeoutSeconds
 * }
 * 
 * const requestTime = Temporal.Duration.from({ seconds: 2, milliseconds: 500 })
 * isWithinTimeout(requestTime, 5)         // true
 * isWithinTimeout(requestTime, 2)         // false
 * 
 * // Average duration calculator
 * function averageDuration(
 *   durations: Array<Temporal.Duration>,
 *   unit: Temporal.DateTimeUnit = "seconds"
 * ): number | null {
 *   const getTotal = totalDuration(unit)
 *   const totals = durations.map(getTotal).filter(t => t !== null) as Array<number>
 *   
 *   if (totals.length === 0) return null
 *   return totals.reduce((sum, t) => sum + t, 0) / totals.length
 * }
 * 
 * const responseTimes = [
 *   Temporal.Duration.from({ milliseconds: 250 }),
 *   Temporal.Duration.from({ milliseconds: 180 }),
 *   Temporal.Duration.from({ milliseconds: 320 })
 * ]
 * averageDuration(responseTimes, "milliseconds")  // 250
 * ```
 * @property Curried - Takes unit first for easy partial application
 * @property Safe - Returns null for invalid inputs
 * @property Precise - Handles fractional values
 * @property Flexible - Supports all Temporal duration units
 */
const totalDuration = (unit: Temporal.DateTimeUnit | string) => (
	duration: Temporal.Duration | null | undefined
): number | null => {
	if (duration == null) {
		return null
	}
	
	// Validate duration is a Temporal.Duration
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}
	
	// Validate unit is a valid DateTimeUnit
	const validUnits = [
		"years", "months", "weeks", "days",
		"hours", "minutes", "seconds",
		"milliseconds", "microseconds", "nanoseconds"
	]
	
	if (!validUnits.includes(unit)) {
		return null
	}
	
	try {
		// Use the total method to get the duration in the specified unit
		return duration.total({ unit: unit as Temporal.DateTimeUnit })
	} catch {
		return null
	}
}

export default totalDuration