/**
 * Calculates the difference in minutes between two times or datetimes
 * 
 * Computes the number of minutes from the first time to the second time.
 * Returns a positive number if the second time is later, negative if
 * earlier. Works with PlainTime, PlainDateTime, and ZonedDateTime.
 * For PlainTime, assumes same day unless crossing midnight. Returns
 * null for invalid inputs.
 * 
 * @curried (from) => (to) => result
 * @param from - The starting time/datetime
 * @param to - The ending time/datetime
 * @returns Number of minutes difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time1 = Temporal.PlainTime.from("10:00:00")
 * const time2 = Temporal.PlainTime.from("10:30:00")
 * diffMinutes(time1)(time2)               // 30 minutes
 * diffMinutes(time2)(time1)               // -30 minutes
 * diffMinutes(time1)(time1)               // 0 minutes
 * 
 * // With seconds
 * const start = Temporal.PlainTime.from("10:15:30")
 * const end = Temporal.PlainTime.from("10:45:45")
 * diffMinutes(start)(end)                 // 30.25 minutes
 * 
 * // Hour crossing
 * const before = Temporal.PlainTime.from("09:45:00")
 * const after = Temporal.PlainTime.from("10:15:00")
 * diffMinutes(before)(after)              // 30 minutes
 * 
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T09:45:00")
 * diffMinutes(dt1)(dt2)                   // 45 minutes
 * 
 * // Crossing day boundary
 * const night = Temporal.PlainDateTime.from("2024-03-15T23:45:00")
 * const morning = Temporal.PlainDateTime.from("2024-03-16T00:15:00")
 * diffMinutes(night)(morning)             // 30 minutes
 * 
 * // Multiple day span
 * const monday = Temporal.PlainDateTime.from("2024-03-11T09:00:00")
 * const tuesday = Temporal.PlainDateTime.from("2024-03-12T09:30:00")
 * diffMinutes(monday)(tuesday)            // 1470 minutes (24.5 hours)
 * 
 * // Partial application for duration tracking
 * const taskStart = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * const minutesElapsed = diffMinutes(taskStart)
 * 
 * const taskEnd = Temporal.PlainDateTime.from("2024-03-15T14:45:00")
 * minutesElapsed(taskEnd)                 // 45 minutes
 * 
 * // Meeting duration
 * function getMeetingMinutes(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime
 * ): number | null {
 *   return diffMinutes(start)(end)
 * }
 * 
 * const meetingStart = Temporal.PlainTime.from("14:00:00")
 * const meetingEnd = Temporal.PlainTime.from("14:30:00")
 * getMeetingMinutes(meetingStart, meetingEnd)  // 30 minutes
 * 
 * // Parking meter calculation
 * function getParkingMinutes(
 *   arrival: Temporal.PlainDateTime,
 *   departure: Temporal.PlainDateTime
 * ): number {
 *   const minutes = diffMinutes(arrival)(departure)
 *   // Round up to next 15-minute increment
 *   return minutes ? Math.ceil(minutes / 15) * 15 : 0
 * }
 * 
 * const parked = Temporal.PlainDateTime.from("2024-03-15T10:07:00")
 * const left = Temporal.PlainDateTime.from("2024-03-15T11:23:00")
 * getParkingMinutes(parked, left)         // 90 minutes (rounded up)
 * 
 * // Call duration
 * function getCallDuration(
 *   startTime: Temporal.PlainDateTime,
 *   endTime: Temporal.PlainDateTime
 * ): string {
 *   const minutes = diffMinutes(startTime)(endTime)
 *   if (minutes === null) return "Unknown"
 *   
 *   const wholeMinutes = Math.floor(minutes)
 *   const seconds = Math.round((minutes - wholeMinutes) * 60)
 *   
 *   if (wholeMinutes >= 60) {
 *     const hours = Math.floor(wholeMinutes / 60)
 *     const mins = wholeMinutes % 60
 *     return `${hours}h ${mins}m ${seconds}s`
 *   }
 *   
 *   return `${wholeMinutes}m ${seconds}s`
 * }
 * 
 * const callStart = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const callEnd = Temporal.PlainDateTime.from("2024-03-15T10:47:30")
 * getCallDuration(callStart, callEnd)     // "47m 30s"
 * 
 * // Exercise duration
 * function getWorkoutMinutes(
 *   exercises: Array<{ start: Temporal.PlainTime; end: Temporal.PlainTime }>
 * ): number {
 *   return exercises.reduce((total, exercise) => {
 *     const minutes = diffMinutes(exercise.start)(exercise.end)
 *     return total + (minutes || 0)
 *   }, 0)
 * }
 * 
 * const workout = [
 *   { start: Temporal.PlainTime.from("06:00:00"), end: Temporal.PlainTime.from("06:20:00") },
 *   { start: Temporal.PlainTime.from("06:25:00"), end: Temporal.PlainTime.from("06:45:00") },
 *   { start: Temporal.PlainTime.from("06:50:00"), end: Temporal.PlainTime.from("07:00:00") }
 * ]
 * getWorkoutMinutes(workout)              // 50 minutes total
 * 
 * // Response time SLA
 * function checkResponseSLA(
 *   requestTime: Temporal.PlainDateTime,
 *   responseTime: Temporal.PlainDateTime,
 *   slaMinutes: number = 30
 * ): boolean {
 *   const actualMinutes = diffMinutes(requestTime)(responseTime)
 *   return actualMinutes !== null && actualMinutes <= slaMinutes
 * }
 * 
 * const request = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const response = Temporal.PlainDateTime.from("2024-03-15T10:25:00")
 * checkResponseSLA(request, response, 30) // true (within 30-minute SLA)
 * 
 * // Null handling
 * diffMinutes(null)(time2)                // null
 * diffMinutes(time1)(null)                // null
 * diffMinutes(null)(null)                 // null
 * 
 * // Cooking timer
 * function getCookingTime(
 *   startTime: Temporal.PlainTime,
 *   currentTime: Temporal.PlainTime
 * ): { minutes: number; formatted: string } | null {
 *   const elapsed = diffMinutes(startTime)(currentTime)
 *   if (elapsed === null) return null
 *   
 *   const wholeMinutes = Math.floor(elapsed)
 *   const seconds = Math.round((elapsed - wholeMinutes) * 60)
 *   
 *   return {
 *     minutes: elapsed,
 *     formatted: `${wholeMinutes}:${seconds.toString().padStart(2, '0')}`
 *   }
 * }
 * 
 * const ovenOn = Temporal.PlainTime.from("18:30:00")
 * const checkTime = Temporal.PlainTime.from("18:55:30")
 * getCookingTime(ovenOn, checkTime)       // { minutes: 25.5, formatted: "25:30" }
 * 
 * // Late fee calculation
 * function calculateLateFee(
 *   dueTime: Temporal.PlainDateTime,
 *   returnTime: Temporal.PlainDateTime,
 *   feePerMinute: number = 0.5
 * ): number {
 *   const lateMinutes = diffMinutes(dueTime)(returnTime)
 *   return lateMinutes && lateMinutes > 0 ? lateMinutes * feePerMinute : 0
 * }
 * 
 * const dueBack = Temporal.PlainDateTime.from("2024-03-15T17:00:00")
 * const returned = Temporal.PlainDateTime.from("2024-03-15T17:45:00")
 * calculateLateFee(dueBack, returned)     // $22.50 (45 minutes * $0.50)
 * 
 * // Video playback position
 * function getPlaybackPosition(
 *   startTime: Temporal.PlainTime,
 *   currentTime: Temporal.PlainTime,
 *   videoDurationMinutes: number
 * ): { position: number; remaining: number } | null {
 *   const elapsed = diffMinutes(startTime)(currentTime)
 *   if (elapsed === null) return null
 *   
 *   const position = Math.min(elapsed, videoDurationMinutes)
 *   const remaining = Math.max(0, videoDurationMinutes - position)
 *   
 *   return { position, remaining }
 * }
 * 
 * const videoStart = Temporal.PlainTime.from("20:00:00")
 * const now = Temporal.PlainTime.from("20:45:00")
 * getPlaybackPosition(videoStart, now, 120)  // { position: 45, remaining: 75 }
 * 
 * // Task estimation accuracy
 * function getEstimateAccuracy(
 *   estimatedMinutes: number,
 *   actualStart: Temporal.PlainDateTime,
 *   actualEnd: Temporal.PlainDateTime
 * ): { actual: number; difference: number; accuracy: number } | null {
 *   const actual = diffMinutes(actualStart)(actualEnd)
 *   if (actual === null) return null
 *   
 *   const difference = actual - estimatedMinutes
 *   const accuracy = 100 - Math.abs(difference / estimatedMinutes * 100)
 *   
 *   return {
 *     actual,
 *     difference,
 *     accuracy: Math.max(0, accuracy)
 *   }
 * }
 * 
 * const estimated = 60  // 60 minutes estimated
 * const taskStarted = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const taskCompleted = Temporal.PlainDateTime.from("2024-03-15T11:15:00")
 * getEstimateAccuracy(estimated, taskStarted, taskCompleted)
 * // { actual: 75, difference: 15, accuracy: 75 }
 * 
 * // Break time tracking
 * function getTotalBreakMinutes(
 *   breaks: Array<{ start: Temporal.PlainTime; end: Temporal.PlainTime }>
 * ): number {
 *   return breaks.reduce((total, breakPeriod) => {
 *     const minutes = diffMinutes(breakPeriod.start)(breakPeriod.end)
 *     return total + (minutes || 0)
 *   }, 0)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Signed - Returns negative for past times, positive for future
 * @property Safe - Returns null for invalid inputs
 * @property Fractional - Returns decimal minutes for partial minute differences
 */
const diffMinutes = (
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
) => (
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): number | null => {
	if (from == null || to == null) {
		return null
	}
	
	try {
		// Handle different Temporal types
		if (from instanceof Temporal.PlainTime && to instanceof Temporal.PlainTime) {
			// For PlainTime, calculate assuming same day
			const fromNs = from.hour * 3600e9 + from.minute * 60e9 + from.second * 1e9 + 
			               from.millisecond * 1e6 + from.microsecond * 1e3 + from.nanosecond
			const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 + 
			             to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
			const diffNs = toNs - fromNs
			return diffNs / 60e9  // Convert nanoseconds to minutes
		}
		
		if (from instanceof Temporal.PlainDateTime && to instanceof Temporal.PlainDateTime) {
			const duration = to.since(from, { largestUnit: 'hours' })
			return duration.hours * 60 + duration.minutes + duration.seconds / 60 +
			       duration.milliseconds / 60000 + duration.microseconds / 60000000 +
			       duration.nanoseconds / 60000000000
		}
		
		if (from instanceof Temporal.ZonedDateTime && to instanceof Temporal.ZonedDateTime) {
			const duration = to.since(from, { largestUnit: 'hours' })
			return duration.hours * 60 + duration.minutes + duration.seconds / 60 +
			       duration.milliseconds / 60000 + duration.microseconds / 60000000 +
			       duration.nanoseconds / 60000000000
		}
		
		// Type mismatch or unsupported types
		return null
	} catch {
		return null
	}
}

export default diffMinutes