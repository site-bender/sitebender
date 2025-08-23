/**
 * Calculates the duration until a target date/time
 * 
 * Returns a Temporal.Duration representing the time from the current date/time
 * until the target date/time. The result can be positive (target is in the future)
 * or negative (target is in the past). Supports various Temporal types and
 * automatically handles time zones when present. This is a curried function for
 * easy composition. Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (target) => (current) => duration
 * @param target - The target date/time to calculate until
 * @param current - The current date/time to calculate from
 * @returns Duration until target, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const currentDate = Temporal.PlainDate.from("2024-03-15")
 * const targetDate = Temporal.PlainDate.from("2024-12-25")
 * until(targetDate)(currentDate)          // Duration P285D (285 days)
 * 
 * const pastDate = Temporal.PlainDate.from("2024-01-01")
 * until(pastDate)(currentDate)            // Duration -P73D (negative, 73 days ago)
 * 
 * // With PlainDateTime
 * const currentDateTime = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const targetDateTime = Temporal.PlainDateTime.from("2024-03-15T18:30:00")
 * until(targetDateTime)(currentDateTime)  // Duration PT8H30M
 * 
 * // Across days
 * const morning = Temporal.PlainDateTime.from("2024-03-15T22:00:00")
 * const nextMorning = Temporal.PlainDateTime.from("2024-03-16T06:00:00")
 * until(nextMorning)(morning)             // Duration PT8H
 * 
 * // With PlainTime (within same day)
 * const currentTime = Temporal.PlainTime.from("09:00:00")
 * const targetTime = Temporal.PlainTime.from("17:30:00")
 * until(targetTime)(currentTime)          // Duration PT8H30M
 * 
 * // Time wrapping (target before current assumes next day)
 * const evening = Temporal.PlainTime.from("22:00:00")
 * const earlyMorning = Temporal.PlainTime.from("06:00:00")
 * until(earlyMorning)(evening)            // Duration PT8H (wraps to next day)
 * 
 * // With ZonedDateTime (handles DST)
 * const currentZoned = Temporal.ZonedDateTime.from(
 *   "2024-03-09T22:00:00-05:00[America/New_York]"
 * )
 * const targetZoned = Temporal.ZonedDateTime.from(
 *   "2024-03-10T06:00:00-04:00[America/New_York]"  // After DST transition
 * )
 * until(targetZoned)(currentZoned)        // Duration PT7H (not 8H due to DST)
 * 
 * // With Instant
 * const currentInstant = Temporal.Instant.from("2024-03-15T12:00:00Z")
 * const targetInstant = Temporal.Instant.from("2024-03-16T00:00:00Z")
 * until(targetInstant)(currentInstant)    // Duration PT12H
 * 
 * // Countdown calculator
 * function countdown(
 *   eventDate: Temporal.PlainDate
 * ): Temporal.Duration | null {
 *   const today = Temporal.Now.plainDateISO()
 *   return until(eventDate)(today)
 * }
 * 
 * const christmas = Temporal.PlainDate.from("2024-12-25")
 * countdown(christmas)                    // Duration until Christmas
 * 
 * // Deadline tracker
 * function timeUntilDeadline(
 *   deadline: Temporal.PlainDateTime
 * ): { duration: Temporal.Duration | null; expired: boolean } {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const duration = until(deadline)(now)
 *   
 *   if (!duration) return { duration: null, expired: false }
 *   
 *   return {
 *     duration,
 *     expired: duration.sign < 0
 *   }
 * }
 * 
 * const projectDeadline = Temporal.PlainDateTime.from("2024-03-31T17:00:00")
 * timeUntilDeadline(projectDeadline)
 * // { duration: P16DT7H, expired: false } (example)
 * 
 * // Meeting time calculator
 * function timeUntilMeeting(
 *   meetingTime: Temporal.PlainTime
 * ): Temporal.Duration | null {
 *   const now = Temporal.Now.plainTimeISO()
 *   return until(meetingTime)(now)
 * }
 * 
 * const meeting = Temporal.PlainTime.from("14:00:00")
 * timeUntilMeeting(meeting)               // Duration until 2 PM
 * 
 * // Age at future date
 * function ageAt(
 *   birthDate: Temporal.PlainDate,
 *   futureDate: Temporal.PlainDate
 * ): Temporal.Duration | null {
 *   return until(futureDate)(birthDate)
 * }
 * 
 * const birth = Temporal.PlainDate.from("2000-01-01")
 * const future = Temporal.PlainDate.from("2025-01-01")
 * ageAt(birth, future)                    // Duration P25Y (25 years)
 * 
 * // Batch duration calculation
 * const startDate = Temporal.PlainDate.from("2024-01-01")
 * const milestones = [
 *   Temporal.PlainDate.from("2024-03-31"),
 *   Temporal.PlainDate.from("2024-06-30"),
 *   Temporal.PlainDate.from("2024-12-31")
 * ]
 * 
 * const untilMilestone = milestones.map(m => until(m))
 * const durationsFromStart = untilMilestone.map(fn => fn(startDate))
 * // [P89D, P181D, P365D]
 * 
 * // Project phase duration
 * function phaseDuration(
 *   phaseStart: Temporal.PlainDate,
 *   phaseEnd: Temporal.PlainDate
 * ): Temporal.Duration | null {
 *   return until(phaseEnd)(phaseStart)
 * }
 * 
 * const phase1Start = Temporal.PlainDate.from("2024-01-01")
 * const phase1End = Temporal.PlainDate.from("2024-03-31")
 * phaseDuration(phase1Start, phase1End)   // Duration P89D
 * 
 * // Invalid input handling
 * until(targetDate)(null)                 // null
 * until(null)(currentDate)                // null
 * until(targetDate)(undefined)            // null
 * until("2024-12-25")(currentDate)        // null (string, not Temporal)
 * 
 * // Event scheduler
 * function scheduleReminder(
 *   eventTime: Temporal.PlainDateTime,
 *   reminderMinutesBefore: number
 * ): { reminderTime: Temporal.PlainDateTime; timeUntilEvent: Temporal.Duration | null } {
 *   const reminderTime = eventTime.subtract({ minutes: reminderMinutesBefore })
 *   const timeUntilEvent = until(eventTime)(reminderTime)
 *   
 *   return { reminderTime, timeUntilEvent }
 * }
 * 
 * const event = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * scheduleReminder(event, 15)
 * // { reminderTime: 2024-03-15T13:45:00, timeUntilEvent: PT15M }
 * 
 * // Service uptime calculator
 * function calculateDowntime(
 *   failureTime: Temporal.Instant,
 *   recoveryTime: Temporal.Instant
 * ): Temporal.Duration | null {
 *   return until(recoveryTime)(failureTime)
 * }
 * 
 * const failure = Temporal.Instant.from("2024-03-15T10:00:00Z")
 * const recovery = Temporal.Instant.from("2024-03-15T10:45:30Z")
 * calculateDowntime(failure, recovery)    // Duration PT45M30S
 * 
 * // Timezone-aware duration
 * function durationAcrossTimezones(
 *   startZoned: Temporal.ZonedDateTime,
 *   endZoned: Temporal.ZonedDateTime
 * ): Temporal.Duration | null {
 *   // Automatically handles timezone differences
 *   return until(endZoned)(startZoned)
 * }
 * 
 * const nyStart = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:00:00-04:00[America/New_York]"
 * )
 * const londonEnd = Temporal.ZonedDateTime.from(
 *   "2024-03-15T19:00:00+00:00[Europe/London]"  // Same instant as 15:00 NY
 * )
 * durationAcrossTimezones(nyStart, londonEnd)  // Duration PT5H
 * 
 * // Working days calculator (simplified)
 * function workingDaysUntil(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number {
 *   const duration = until(endDate)(startDate)
 *   if (!duration) return 0
 *   
 *   const totalDays = Math.floor(duration.total({ unit: 'days' }))
 *   const weeks = Math.floor(totalDays / 7)
 *   const remainingDays = totalDays % 7
 *   
 *   // Rough estimate: 5 working days per week
 *   return weeks * 5 + Math.min(remainingDays, 5)
 * }
 * 
 * const projectStart = Temporal.PlainDate.from("2024-03-01")
 * const projectEnd = Temporal.PlainDate.from("2024-03-31")
 * workingDaysUntil(projectStart, projectEnd)  // Approximately 21 working days
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Signed - Can return negative durations for past targets
 * @property Type-aware - Handles different Temporal types appropriately
 */
const until = (target: Temporal.PlainDate | Temporal.PlainDateTime | 
               Temporal.PlainTime | Temporal.ZonedDateTime | 
               Temporal.Instant | null | undefined) => (
	current: Temporal.PlainDate | Temporal.PlainDateTime | 
	         Temporal.PlainTime | Temporal.ZonedDateTime | 
	         Temporal.Instant | null | undefined
): Temporal.Duration | null => {
	if (target == null || current == null) {
		return null
	}
	
	// Validate both are Temporal types
	const isValidTarget = 
		target instanceof Temporal.PlainDate ||
		target instanceof Temporal.PlainDateTime ||
		target instanceof Temporal.PlainTime ||
		target instanceof Temporal.ZonedDateTime ||
		target instanceof Temporal.Instant
	
	const isValidCurrent = 
		current instanceof Temporal.PlainDate ||
		current instanceof Temporal.PlainDateTime ||
		current instanceof Temporal.PlainTime ||
		current instanceof Temporal.ZonedDateTime ||
		current instanceof Temporal.Instant
	
	if (!isValidTarget || !isValidCurrent) {
		return null
	}
	
	try {
		// Handle PlainTime specially (assumes same day or next day if target < current)
		if (current instanceof Temporal.PlainTime && target instanceof Temporal.PlainTime) {
			const currentSeconds = current.hour * 3600 + current.minute * 60 + current.second
			const targetSeconds = target.hour * 3600 + target.minute * 60 + target.second
			
			if (targetSeconds >= currentSeconds) {
				// Same day
				return current.until(target)
			} else {
				// Assume next day (24 hours - current + target)
				const secondsUntilMidnight = 86400 - currentSeconds
				const totalSeconds = secondsUntilMidnight + targetSeconds
				return Temporal.Duration.from({ seconds: totalSeconds })
			}
		}
		
		// For all other types, use the until method
		// @ts-ignore - TypeScript doesn't recognize the common until method
		return current.until(target)
	} catch {
		return null
	}
}

export default until