/**
 * Converts a Temporal.Duration to total minutes
 * 
 * Calculates the total number of minutes represented by a Duration object,
 * converting all larger units (years, months, weeks, days, hours) to minutes
 * and adding any fractional minutes from seconds/milliseconds/etc. Returns
 * null for invalid inputs to support safe error handling. Uses precise
 * conversion assuming standard calendar durations.
 * 
 * @param duration - The Temporal.Duration to convert to minutes
 * @returns Total minutes as a number, or null if invalid
 * @example
 * ```typescript
 * // Basic duration conversions
 * durationToMinutes(Temporal.Duration.from({ minutes: 30 }))
 * // 30
 * 
 * durationToMinutes(Temporal.Duration.from({ hours: 2 }))
 * // 120
 * 
 * durationToMinutes(Temporal.Duration.from({ hours: 1, minutes: 30 }))
 * // 90
 * 
 * // Days to minutes
 * durationToMinutes(Temporal.Duration.from({ days: 1 }))
 * // 1440 (24 * 60)
 * 
 * durationToMinutes(Temporal.Duration.from({ days: 2, hours: 3 }))
 * // 3060 (2880 + 180)
 * 
 * // Weeks to minutes
 * durationToMinutes(Temporal.Duration.from({ weeks: 1 }))
 * // 10080 (7 * 24 * 60)
 * 
 * // Complex durations
 * durationToMinutes(Temporal.Duration.from({
 *   days: 1,
 *   hours: 2,
 *   minutes: 30,
 *   seconds: 45
 * }))
 * // 1620.75 (1440 + 120 + 30 + 0.75)
 * 
 * // With seconds precision
 * durationToMinutes(Temporal.Duration.from({ seconds: 90 }))
 * // 1.5
 * 
 * durationToMinutes(Temporal.Duration.from({ 
 *   minutes: 5, 
 *   seconds: 30 
 * }))
 * // 5.5
 * 
 * // With subsecond precision
 * durationToMinutes(Temporal.Duration.from({
 *   minutes: 1,
 *   milliseconds: 500
 * }))
 * // 1.00833... (1 + 500/60000)
 * 
 * // Meeting duration calculation
 * const meetingStart = Temporal.PlainTime.from("09:00")
 * const meetingEnd = Temporal.PlainTime.from("10:30")
 * const duration = meetingEnd.since(meetingStart)
 * durationToMinutes(duration)
 * // 90
 * 
 * // Project time tracking
 * const timeSpent = Temporal.Duration.from({
 *   hours: 8,
 *   minutes: 45
 * })
 * durationToMinutes(timeSpent)
 * // 525
 * 
 * // Break duration
 * const breakTime = Temporal.Duration.from({
 *   minutes: 15,
 *   seconds: 30
 * })
 * durationToMinutes(breakTime)
 * // 15.5
 * 
 * // Commute calculation
 * const commute = Temporal.Duration.from({
 *   hours: 1,
 *   minutes: 23,
 *   seconds: 45
 * })
 * durationToMinutes(commute)
 * // 83.75
 * 
 * // Video duration
 * const videoLength = Temporal.Duration.from({
 *   minutes: 42,
 *   seconds: 17
 * })
 * durationToMinutes(videoLength)
 * // 42.283333...
 * 
 * // Workout session
 * const workout = Temporal.Duration.from({
 *   hours: 1,
 *   minutes: 15,
 *   seconds: 30
 * })
 * durationToMinutes(workout)
 * // 75.5
 * 
 * // Sleep duration (whole days)
 * const sleep = Temporal.Duration.from({
 *   hours: 8,
 *   minutes: 30
 * })
 * durationToMinutes(sleep)
 * // 510
 * 
 * // Multi-day event
 * const conference = Temporal.Duration.from({
 *   days: 3,
 *   hours: 6,
 *   minutes: 30
 * })
 * durationToMinutes(conference)
 * // 4710 (4320 + 360 + 30)
 * 
 * // Null/undefined handling
 * durationToMinutes(null)
 * // null
 * 
 * durationToMinutes(undefined)
 * // null
 * 
 * // Invalid input handling
 * durationToMinutes("not a duration")
 * // null
 * 
 * durationToMinutes(123)
 * // null
 * 
 * // Working with time differences
 * const start = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const end = Temporal.PlainDateTime.from("2024-03-15T11:30:00")
 * const diff = end.since(start)
 * durationToMinutes(diff)
 * // 150
 * 
 * // Calendar vs clock time
 * const clockTime = Temporal.Duration.from({
 *   hours: 2,
 *   minutes: 30
 * })
 * durationToMinutes(clockTime)
 * // 150
 * 
 * // Use in time calculations
 * function formatMinutes(minutes: number): string {
 *   const hours = Math.floor(minutes / 60)
 *   const mins = Math.round(minutes % 60)
 *   return `${hours}h ${mins}m`
 * }
 * 
 * const taskDuration = Temporal.Duration.from({
 *   hours: 2,
 *   minutes: 45
 * })
 * const totalMinutes = durationToMinutes(taskDuration)
 * if (totalMinutes !== null) {
 *   formatMinutes(totalMinutes)  // "2h 45m"
 * }
 * 
 * // Billing calculation
 * function calculateBillableTime(
 *   sessions: Array<Temporal.Duration>
 * ): number {
 *   return sessions
 *     .map(durationToMinutes)
 *     .filter((mins): mins is number => mins !== null)
 *     .reduce((total, mins) => total + mins, 0)
 * }
 * 
 * const billableSessions = [
 *   Temporal.Duration.from({ hours: 2, minutes: 30 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 45 }),
 *   Temporal.Duration.from({ minutes: 30 })
 * ]
 * calculateBillableTime(billableSessions)
 * // 285 minutes (4h 45m total)
 * 
 * // Average duration calculation
 * function averageDuration(
 *   durations: Array<Temporal.Duration>
 * ): number | null {
 *   const minutes = durations
 *     .map(durationToMinutes)
 *     .filter((mins): mins is number => mins !== null)
 *   
 *   if (minutes.length === 0) return null
 *   
 *   return minutes.reduce((sum, mins) => sum + mins, 0) / minutes.length
 * }
 * 
 * const sessions = [
 *   Temporal.Duration.from({ minutes: 45 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 15 }),
 *   Temporal.Duration.from({ minutes: 30 })
 * ]
 * averageDuration(sessions)
 * // 50 minutes average
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null for invalid inputs
 * @property Precise - Handles subsecond precision accurately
 * @property Standard - Uses standard calendar conversions (60 min/hour, 24 hour/day, etc.)
 */
const durationToMinutes = (
	duration: Temporal.Duration | null | undefined
): number | null => {
	if (duration == null) {
		return null
	}
	
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}
	
	try {
		// Convert to total seconds first, then to minutes
		// This handles all units consistently
		const totalSeconds = duration.total({ unit: "seconds" })
		return totalSeconds / 60
	} catch {
		return null
	}
}

export default durationToMinutes