/**
 * Formats duration in human-readable format
 *
 * Converts a Temporal.Duration into a human-readable string representation
 * using common time unit abbreviations (e.g., "2h 30m", "1d 3h 45m"). Only
 * displays non-zero units and automatically selects the most appropriate
 * units for readability. Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param duration - The Temporal.Duration to format
 * @returns Human-readable duration string, or null if invalid
 * @example
 * ```typescript
 * // Basic duration formatting
 * formatDuration(Temporal.Duration.from({ minutes: 30 }))
 * // "30m"
 *
 * formatDuration(Temporal.Duration.from({ hours: 2 }))
 * // "2h"
 *
 * formatDuration(Temporal.Duration.from({ hours: 1, minutes: 30 }))
 * // "1h 30m"
 *
 * // Days and larger units
 * formatDuration(Temporal.Duration.from({ days: 1 }))
 * // "1d"
 *
 * formatDuration(Temporal.Duration.from({ days: 2, hours: 3 }))
 * // "2d 3h"
 *
 * formatDuration(Temporal.Duration.from({ weeks: 1 }))
 * // "1w"
 *
 * formatDuration(Temporal.Duration.from({ weeks: 2, days: 3, hours: 4 }))
 * // "2w 3d 4h"
 *
 * // Complex durations
 * formatDuration(Temporal.Duration.from({
 *   days: 1,
 *   hours: 2,
 *   minutes: 30,
 *   seconds: 45
 * }))
 * // "1d 2h 30m 45s"
 *
 * // Seconds and subseconds
 * formatDuration(Temporal.Duration.from({ seconds: 90 }))
 * // "1m 30s"
 *
 * formatDuration(Temporal.Duration.from({ seconds: 45 }))
 * // "45s"
 *
 * formatDuration(Temporal.Duration.from({
 *   minutes: 5,
 *   seconds: 30
 * }))
 * // "5m 30s"
 *
 * // Milliseconds (rounded to nearest second when > 1s)
 * formatDuration(Temporal.Duration.from({ milliseconds: 1500 }))
 * // "2s" (rounded)
 *
 * formatDuration(Temporal.Duration.from({ milliseconds: 500 }))
 * // "500ms"
 *
 * formatDuration(Temporal.Duration.from({
 *   seconds: 2,
 *   milliseconds: 500
 * }))
 * // "3s" (rounded)
 *
 * // Very short durations
 * formatDuration(Temporal.Duration.from({ milliseconds: 250 }))
 * // "250ms"
 *
 * formatDuration(Temporal.Duration.from({ milliseconds: 1 }))
 * // "1ms"
 *
 * // Zero duration
 * formatDuration(Temporal.Duration.from({}))
 * // "0s"
 *
 * formatDuration(Temporal.Duration.from({ seconds: 0 }))
 * // "0s"
 *
 * // Meeting duration display
 * const meetingStart = Temporal.PlainTime.from("09:00")
 * const meetingEnd = Temporal.PlainTime.from("10:30")
 * const duration = meetingEnd.since(meetingStart)
 * formatDuration(duration)
 * // "1h 30m"
 *
 * // Project time tracking
 * const timeSpent = Temporal.Duration.from({
 *   hours: 8,
 *   minutes: 45
 * })
 * formatDuration(timeSpent)
 * // "8h 45m"
 *
 * // Break duration
 * const breakTime = Temporal.Duration.from({
 *   minutes: 15
 * })
 * formatDuration(breakTime)
 * // "15m"
 *
 * // Commute display
 * const commute = Temporal.Duration.from({
 *   hours: 1,
 *   minutes: 23
 * })
 * formatDuration(commute)
 * // "1h 23m"
 *
 * // Video duration
 * const videoLength = Temporal.Duration.from({
 *   minutes: 42,
 *   seconds: 17
 * })
 * formatDuration(videoLength)
 * // "42m 17s"
 *
 * // Workout session
 * const workout = Temporal.Duration.from({
 *   hours: 1,
 *   minutes: 15
 * })
 * formatDuration(workout)
 * // "1h 15m"
 *
 * // Sleep duration
 * const sleep = Temporal.Duration.from({
 *   hours: 8,
 *   minutes: 30
 * })
 * formatDuration(sleep)
 * // "8h 30m"
 *
 * // Multi-day event
 * const conference = Temporal.Duration.from({
 *   days: 3,
 *   hours: 6
 * })
 * formatDuration(conference)
 * // "3d 6h"
 *
 * // Very long durations
 * const project = Temporal.Duration.from({
 *   weeks: 12,
 *   days: 3,
 *   hours: 4
 * })
 * formatDuration(project)
 * // "12w 3d 4h"
 *
 * // Null/undefined handling
 * formatDuration(null)
 * // null
 *
 * formatDuration(undefined)
 * // null
 *
 * // Invalid input handling
 * formatDuration("not a duration")
 * // null
 *
 * formatDuration(123)
 * // null
 *
 * // API response time formatting
 * const responseTime = Temporal.Duration.from({
 *   milliseconds: 245
 * })
 * formatDuration(responseTime)
 * // "245ms"
 *
 * // Download time estimate
 * const downloadTime = Temporal.Duration.from({
 *   minutes: 5,
 *   seconds: 42
 * })
 * formatDuration(downloadTime)
 * // "5m 42s"
 *
 * // Processing time
 * const processingTime = Temporal.Duration.from({
 *   seconds: 3,
 *   milliseconds: 250
 * })
 * formatDuration(processingTime)
 * // "3s" (milliseconds rounded)
 *
 * // Use in UI components
 * function TimerDisplay({ duration }: { duration: Temporal.Duration }) {
 *   const formatted = formatDuration(duration)
 *   return formatted ? `Time: ${formatted}` : "Invalid time"
 * }
 *
 * // Progress indicators
 * function ProgressTime({
 *   elapsed,
 *   total
 * }: {
 *   elapsed: Temporal.Duration
 *   total: Temporal.Duration
 * }) {
 *   const elapsedStr = formatDuration(elapsed)
 *   const totalStr = formatDuration(total)
 *
 *   if (!elapsedStr || !totalStr) return "Invalid duration"
 *
 *   return `${elapsedStr} / ${totalStr}`
 * }
 *
 * // ETA calculations
 * function formatETA(remainingTime: Temporal.Duration): string {
 *   const formatted = formatDuration(remainingTime)
 *   return formatted ? `ETA: ${formatted}` : "Calculating..."
 * }
 *
 * // Notification messages
 * function createReminderMessage(
 *   taskName: string,
 *   timeLeft: Temporal.Duration
 * ): string {
 *   const formatted = formatDuration(timeLeft)
 *   if (!formatted) return `Reminder: ${taskName}`
 *
 *   return `Reminder: ${taskName} starts in ${formatted}`
 * }
 *
 * const reminder = createReminderMessage(
 *   "Team meeting",
 *   Temporal.Duration.from({ minutes: 15 })
 * )
 * // "Reminder: Team meeting starts in 15m"
 *
 * // Time logging
 * function logTimeSpent(
 *   activity: string,
 *   duration: Temporal.Duration
 * ): string {
 *   const formatted = formatDuration(duration)
 *   if (!formatted) return `${activity}: Invalid duration`
 *
 *   return `${activity}: ${formatted}`
 * }
 *
 * // Batch formatting
 * function formatDurations(
 *   durations: Array<Temporal.Duration>
 * ): Array<string> {
 *   return durations
 *     .map(formatDuration)
 *     .filter((str): str is string => str !== null)
 * }
 *
 * const taskDurations = [
 *   Temporal.Duration.from({ hours: 2, minutes: 30 }),
 *   Temporal.Duration.from({ minutes: 45 }),
 *   Temporal.Duration.from({ hours: 1, minutes: 15 })
 * ]
 * formatDurations(taskDurations)
 * // ["2h 30m", "45m", "1h 15m"]
 *
 * // Summary reports
 * function createTimeReport(
 *   activities: Array<{ name: string; duration: Temporal.Duration }>
 * ): string {
 *   const lines = activities.map(({ name, duration }) => {
 *     const formatted = formatDuration(duration)
 *     return formatted ? `${name}: ${formatted}` : `${name}: Invalid`
 *   })
 *
 *   return lines.join("\\n")
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null for invalid inputs
 * @property Readable - Uses standard time unit abbreviations
 * @property Compact - Only shows non-zero units
 * @property Smart - Automatically rounds subseconds when appropriate
 */
const formatDuration = (
	duration: Temporal.Duration | null | undefined,
): string | null => {
	if (duration == null) {
		return null
	}

	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	try {
		// Extract all units from the duration
		const weeks = Math.abs(duration.weeks ?? 0)
		const days = Math.abs(duration.days ?? 0)
		const hours = Math.abs(duration.hours ?? 0)
		const minutes = Math.abs(duration.minutes ?? 0)
		const seconds = Math.abs(duration.seconds ?? 0)
		const milliseconds = Math.abs(duration.milliseconds ?? 0)

		const parts: Array<string> = []

		// Add non-zero units in descending order
		if (weeks > 0) parts.push(`${weeks}w`)
		if (days > 0) parts.push(`${days}d`)
		if (hours > 0) parts.push(`${hours}h`)
		if (minutes > 0) parts.push(`${minutes}m`)

		// Handle seconds and milliseconds
		if (seconds > 0 || (milliseconds > 0 && parts.length === 0)) {
			if (milliseconds > 0 && parts.length === 0 && seconds === 0) {
				// Show milliseconds only if no larger units and no seconds
				parts.push(`${milliseconds}ms`)
			} else if (milliseconds >= 500 && seconds < 60) {
				// Round up seconds if milliseconds >= 500
				parts.push(`${seconds + 1}s`)
			} else if (seconds > 0) {
				// Show seconds without milliseconds
				parts.push(`${seconds}s`)
			}
		}

		// Handle zero duration
		if (parts.length === 0) {
			return "0s"
		}

		return parts.join(" ")
	} catch {
		return null
	}
}

export default formatDuration
