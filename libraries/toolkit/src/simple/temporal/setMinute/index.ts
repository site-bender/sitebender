/**
 * Returns a new time or datetime with the minute set to the specified value
 * 
 * Creates a new Temporal time or datetime with the minute changed to the specified
 * value (0-59). Other time components (hours, seconds, etc.) are preserved. This
 * is a curried function for easy composition. Returns null for invalid inputs to
 * support safe error handling.
 * 
 * @curried (minute) => (time) => new time
 * @param minute - The minute to set (0-59)
 * @param time - The Temporal time to modify
 * @returns New time with updated minute, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * setMinute(0)(time)                      // PlainTime 10:00:45
 * setMinute(15)(time)                     // PlainTime 10:15:45
 * setMinute(45)(time)                     // PlainTime 10:45:45
 * setMinute(59)(time)                     // PlainTime 10:59:45
 * 
 * // Preserves hours and seconds
 * const preciseTime = Temporal.PlainTime.from("14:30:45.123456789")
 * setMinute(15)(preciseTime)              // PlainTime 14:15:45.123456789
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setMinute(0)(datetime)                  // PlainDateTime 2024-03-15T10:00:45
 * setMinute(20)(datetime)                 // PlainDateTime 2024-03-15T10:20:45
 * setMinute(59)(datetime)                 // PlainDateTime 2024-03-15T10:59:45
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setMinute(45)(zonedDateTime)            // ZonedDateTime 2024-03-15T10:45:00-04:00[America/New_York]
 * 
 * // Invalid minute handling
 * setMinute(-1)(time)                     // null (negative minute)
 * setMinute(60)(time)                     // null (minute must be < 60)
 * setMinute(61)(time)                     // null (invalid minute)
 * setMinute(30.5)(time)                   // null (must be integer)
 * 
 * // Null handling
 * setMinute(30)(null)                     // null
 * setMinute(30)(undefined)                // null
 * setMinute(30)("10:30:45" as any)       // null (string, not Temporal)
 * 
 * // Quarter-hour scheduler
 * function roundToQuarterHour(
 *   time: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   const minute = time.minute
 *   
 *   if (minute < 8) return setMinute(0)(time)
 *   if (minute < 23) return setMinute(15)(time)
 *   if (minute < 38) return setMinute(30)(time)
 *   if (minute < 53) return setMinute(45)(time)
 *   
 *   // Round up to next hour
 *   const nextHour = time.add({ hours: 1 })
 *   return setMinute(0)(nextHour)
 * }
 * 
 * roundToQuarterHour(Temporal.PlainTime.from("10:07:00"))  // 10:00:00
 * roundToQuarterHour(Temporal.PlainTime.from("10:12:00"))  // 10:15:00
 * roundToQuarterHour(Temporal.PlainTime.from("10:27:00"))  // 10:30:00
 * roundToQuarterHour(Temporal.PlainTime.from("10:42:00"))  // 10:45:00
 * roundToQuarterHour(Temporal.PlainTime.from("10:57:00"))  // 11:00:00
 * 
 * // Meeting time adjuster
 * function adjustMeetingMinutes(
 *   meeting: Temporal.PlainDateTime,
 *   minutesAfterHour: number
 * ): Temporal.PlainDateTime | null {
 *   if (minutesAfterHour < 0 || minutesAfterHour > 59) return null
 *   return setMinute(minutesAfterHour)(meeting)
 * }
 * 
 * const meeting = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * adjustMeetingMinutes(meeting, 0)        // 2024-03-15T14:00:00
 * adjustMeetingMinutes(meeting, 15)       // 2024-03-15T14:15:00
 * adjustMeetingMinutes(meeting, 45)       // 2024-03-15T14:45:00
 * 
 * // Timer preset setter
 * function setTimerPreset(
 *   baseTime: Temporal.PlainTime,
 *   preset: "pomodoro" | "short-break" | "long-break"
 * ): Temporal.PlainTime | null {
 *   const presets = {
 *     "pomodoro": 25,
 *     "short-break": 5,
 *     "long-break": 15
 *   }
 *   
 *   return setMinute(presets[preset])(baseTime)
 * }
 * 
 * const timerBase = Temporal.PlainTime.from("00:00:00")
 * setTimerPreset(timerBase, "pomodoro")   // 00:25:00
 * setTimerPreset(timerBase, "short-break") // 00:05:00
 * setTimerPreset(timerBase, "long-break")  // 00:15:00
 * 
 * // Batch time processing
 * const times = [
 *   Temporal.PlainTime.from("09:22:00"),
 *   Temporal.PlainTime.from("14:37:00"),
 *   Temporal.PlainTime.from("18:51:00")
 * ]
 * 
 * const setToHalfPast = setMinute(30)
 * times.map(setToHalfPast)
 * // [09:30:00, 14:30:00, 18:30:00]
 * 
 * // Train schedule normalizer
 * function normalizeTrainTime(
 *   time: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   const minute = time.minute
 *   
 *   // Trains leave at :00, :20, :40
 *   if (minute < 10) return setMinute(0)(time)
 *   if (minute < 30) return setMinute(20)(time)
 *   if (minute < 50) return setMinute(40)(time)
 *   
 *   // Round to next hour
 *   const nextHour = time.add({ hours: 1 })
 *   return setMinute(0)(nextHour)
 * }
 * 
 * normalizeTrainTime(Temporal.PlainTime.from("10:05:00"))  // 10:00:00
 * normalizeTrainTime(Temporal.PlainTime.from("10:25:00"))  // 10:20:00
 * normalizeTrainTime(Temporal.PlainTime.from("10:45:00"))  // 10:40:00
 * normalizeTrainTime(Temporal.PlainTime.from("10:55:00"))  // 11:00:00
 * 
 * // TV show scheduler
 * function scheduleShowTime(
 *   date: Temporal.PlainDateTime,
 *   showLength: "half-hour" | "hour"
 * ): Temporal.PlainDateTime | null {
 *   // Shows start at :00 or :30
 *   const minute = date.minute
 *   
 *   if (showLength === "half-hour") {
 *     return minute < 30 ? setMinute(0)(date) : setMinute(30)(date)
 *   } else {
 *     return setMinute(0)(date)
 *   }
 * }
 * 
 * const airTime = Temporal.PlainDateTime.from("2024-03-15T20:25:00")
 * scheduleShowTime(airTime, "half-hour")  // 2024-03-15T20:00:00
 * scheduleShowTime(airTime, "hour")       // 2024-03-15T20:00:00
 * 
 * const laterTime = Temporal.PlainDateTime.from("2024-03-15T20:35:00")
 * scheduleShowTime(laterTime, "half-hour") // 2024-03-15T20:30:00
 * 
 * // Parking meter helper
 * function setParkingExpiry(
 *   currentTime: Temporal.PlainTime,
 *   minutesPaid: number
 * ): Temporal.PlainTime | null {
 *   if (minutesPaid < 0 || minutesPaid > 59) return null
 *   
 *   // Set to paid minutes, keeping current hour
 *   return setMinute(minutesPaid)(currentTime)
 * }
 * 
 * const parkedAt = Temporal.PlainTime.from("14:12:00")
 * setParkingExpiry(parkedAt, 30)          // 14:30:00
 * setParkingExpiry(parkedAt, 45)          // 14:45:00
 * 
 * // Clock synchronizer
 * function syncToServerTime(
 *   localTime: Temporal.PlainTime,
 *   serverMinute: number
 * ): Temporal.PlainTime | null {
 *   // Keep local hour and second, sync minute to server
 *   return setMinute(serverMinute)(localTime)
 * }
 * 
 * const local = Temporal.PlainTime.from("10:32:45")
 * syncToServerTime(local, 30)             // 10:30:45
 * 
 * // Workout interval timer
 * function setIntervalTimer(
 *   startTime: Temporal.PlainTime,
 *   intervalMinutes: number
 * ): Array<Temporal.PlainTime | null> {
 *   const intervals: Array<Temporal.PlainTime | null> = []
 *   
 *   for (let i = 0; i < 60; i += intervalMinutes) {
 *     intervals.push(setMinute(i)(startTime))
 *   }
 *   
 *   return intervals
 * }
 * 
 * const workoutStart = Temporal.PlainTime.from("09:00:00")
 * setIntervalTimer(workoutStart, 15)
 * // [09:00:00, 09:15:00, 09:30:00, 09:45:00]
 * 
 * // Cron job scheduler
 * function setCronMinute(
 *   time: Temporal.PlainDateTime,
 *   cronMinute: number | "*"
 * ): Temporal.PlainDateTime | null {
 *   if (cronMinute === "*") return time
 *   
 *   if (typeof cronMinute !== "number") return null
 *   return setMinute(cronMinute)(time)
 * }
 * 
 * const cronTime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * setCronMinute(cronTime, 0)              // 2024-03-15T10:00:00
 * setCronMinute(cronTime, 15)             // 2024-03-15T10:15:00
 * setCronMinute(cronTime, "*")            // 2024-03-15T10:30:00 (unchanged)
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property Preserving - Preserves other time components
 */
const setMinute = (minute: number) => (
	time: Temporal.PlainTime | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (time == null) {
		return null
	}
	
	if (
		!(time instanceof Temporal.PlainTime) &&
		!(time instanceof Temporal.PlainDateTime) &&
		!(time instanceof Temporal.ZonedDateTime)
	) {
		return null
	}
	
	// Validate minute is in valid range
	if (minute < 0 || minute > 59 || !Number.isInteger(minute)) {
		return null
	}
	
	try {
		return time.with({ minute })
	} catch {
		return null
	}
}

export default setMinute