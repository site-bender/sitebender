/**
 * Returns a new time or datetime with the hour set to the specified value
 *
 * Creates a new Temporal time or datetime with the hour changed to the specified
 * value (0-23). The hour must be in 24-hour format where 0 represents midnight
 * and 23 represents 11 PM. Other time components (minutes, seconds, etc.) are
 * preserved. This is a curried function for easy composition. Returns null for
 * invalid inputs to support safe error handling.
 *
 * @curried (hour) => (time) => new time
 * @param hour - The hour to set (0-23)
 * @param time - The Temporal time to modify
 * @returns New time with updated hour, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * setHour(0)(time)                        // PlainTime 00:30:45 (midnight)
 * setHour(9)(time)                        // PlainTime 09:30:45
 * setHour(14)(time)                       // PlainTime 14:30:45 (2:30 PM)
 * setHour(23)(time)                       // PlainTime 23:30:45 (11:30 PM)
 *
 * // Preserves minutes and seconds
 * const preciseTime = Temporal.PlainTime.from("10:45:30.123456789")
 * setHour(15)(preciseTime)                // PlainTime 15:45:30.123456789
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setHour(0)(datetime)                    // PlainDateTime 2024-03-15T00:30:45
 * setHour(12)(datetime)                   // PlainDateTime 2024-03-15T12:30:45
 * setHour(20)(datetime)                   // PlainDateTime 2024-03-15T20:30:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setHour(16)(zonedDateTime)              // ZonedDateTime 2024-03-15T16:30:00-04:00[America/New_York]
 *
 * // DST transitions (Spring forward example)
 * const dstTransition = Temporal.ZonedDateTime.from(
 *   "2024-03-10T01:30:00-05:00[America/New_York]"
 * )
 * setHour(2)(dstTransition)               // 2024-03-10T03:30:00-04:00 (2 AM doesn't exist, jumps to 3 AM)
 * setHour(3)(dstTransition)               // 2024-03-10T03:30:00-04:00
 *
 * // Invalid hour handling
 * setHour(-1)(time)                       // null (negative hour)
 * setHour(24)(time)                       // null (hour must be < 24)
 * setHour(25)(time)                       // null (invalid hour)
 * setHour(1.5)(time)                      // null (must be integer)
 *
 * // Null handling
 * setHour(10)(null)                       // null
 * setHour(10)(undefined)                  // null
 * setHour(10)("10:30:45" as any)         // null (string, not Temporal)
 *
 * // Business hours setter
 * function setToBusinessHours(
 *   time: Temporal.PlainTime,
 *   isOpening: boolean
 * ): Temporal.PlainTime | null {
 *   return isOpening ? setHour(9)(time) : setHour(17)(time)
 * }
 *
 * const currentTime = Temporal.PlainTime.from("14:30:00")
 * setToBusinessHours(currentTime, true)   // PlainTime 09:30:00
 * setToBusinessHours(currentTime, false)  // PlainTime 17:30:00
 *
 * // 12-hour to 24-hour converter
 * function setFrom12Hour(
 *   time: Temporal.PlainTime,
 *   hour12: number,
 *   isPM: boolean
 * ): Temporal.PlainTime | null {
 *   if (hour12 < 1 || hour12 > 12) return null
 *
 *   let hour24 = hour12
 *   if (hour12 === 12) {
 *     hour24 = isPM ? 12 : 0
 *   } else if (isPM) {
 *     hour24 = hour12 + 12
 *   }
 *
 *   return setHour(hour24)(time)
 * }
 *
 * const someTime = Temporal.PlainTime.from("00:30:00")
 * setFrom12Hour(someTime, 12, false)      // PlainTime 00:30:00 (12 AM)
 * setFrom12Hour(someTime, 12, true)       // PlainTime 12:30:00 (12 PM)
 * setFrom12Hour(someTime, 3, false)       // PlainTime 03:30:00 (3 AM)
 * setFrom12Hour(someTime, 3, true)        // PlainTime 15:30:00 (3 PM)
 *
 * // Shift scheduler
 * function scheduleShift(
 *   date: Temporal.PlainDateTime,
 *   shift: "morning" | "evening" | "night"
 * ): Temporal.PlainDateTime | null {
 *   const shiftHours = {
 *     morning: 6,
 *     evening: 14,
 *     night: 22
 *   }
 *
 *   return setHour(shiftHours[shift])(date)
 * }
 *
 * const workday = Temporal.PlainDateTime.from("2024-03-15T00:00:00")
 * scheduleShift(workday, "morning")       // 2024-03-15T06:00:00
 * scheduleShift(workday, "evening")       // 2024-03-15T14:00:00
 * scheduleShift(workday, "night")         // 2024-03-15T22:00:00
 *
 * // Meeting time adjuster
 * function adjustMeetingTime(
 *   meeting: Temporal.PlainDateTime,
 *   newHour: number
 * ): Temporal.PlainDateTime | null {
 *   // Keep same date and minutes, just change hour
 *   return setHour(newHour)(meeting)
 * }
 *
 * const originalMeeting = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * adjustMeetingTime(originalMeeting, 10)  // 2024-03-15T10:30:00
 * adjustMeetingTime(originalMeeting, 16)  // 2024-03-15T16:30:00
 *
 * // Batch time processing
 * const times = [
 *   Temporal.PlainTime.from("09:15:00"),
 *   Temporal.PlainTime.from("14:30:00"),
 *   Temporal.PlainTime.from("18:45:00")
 * ]
 *
 * const setToNoon = setHour(12)
 * times.map(setToNoon)
 * // [12:15:00, 12:30:00, 12:45:00]
 *
 * // Alarm clock setter
 * function setAlarm(
 *   alarmTime: Temporal.PlainTime,
 *   wakeHour: number
 * ): Temporal.PlainTime | null {
 *   if (wakeHour < 0 || wakeHour > 23) return null
 *
 *   return setHour(wakeHour)(alarmTime)
 * }
 *
 * const alarm = Temporal.PlainTime.from("00:00:00")
 * setAlarm(alarm, 6)                      // PlainTime 06:00:00
 * setAlarm(alarm, 7)                      // PlainTime 07:00:00
 *
 * // Office hours normalizer
 * function normalizeToOfficeHours(
 *   time: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   const hour = time.hour
 *
 *   if (hour < 9) return setHour(9)(time)
 *   if (hour >= 17) return setHour(16)(time)
 *   return time
 * }
 *
 * normalizeToOfficeHours(Temporal.PlainTime.from("07:30:00"))  // 09:30:00
 * normalizeToOfficeHours(Temporal.PlainTime.from("11:30:00"))  // 11:30:00 (unchanged)
 * normalizeToOfficeHours(Temporal.PlainTime.from("18:30:00"))  // 16:30:00
 *
 * // Time zone meeting converter
 * function convertMeetingToTimeZone(
 *   meeting: Temporal.ZonedDateTime,
 *   targetTimeZone: string,
 *   preferredHour: number
 * ): Temporal.ZonedDateTime | null {
 *   const converted = meeting.withTimeZone(targetTimeZone)
 *   return setHour(preferredHour)(converted)
 * }
 *
 * // Round to nearest hour helper
 * function roundToNearestHour(
 *   time: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   const minutes = time.minute
 *   const currentHour = time.hour
 *
 *   if (minutes >= 30) {
 *     const nextHour = (currentHour + 1) % 24
 *     return setHour(nextHour)(Temporal.PlainTime.from("00:00:00"))
 *   }
 *
 *   return setHour(currentHour)(Temporal.PlainTime.from("00:00:00"))
 * }
 *
 * roundToNearestHour(Temporal.PlainTime.from("10:15:00"))  // 10:00:00
 * roundToNearestHour(Temporal.PlainTime.from("10:45:00"))  // 11:00:00
 * roundToNearestHour(Temporal.PlainTime.from("23:45:00"))  // 00:00:00
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property 24-hour - Accepts hours in 24-hour format (0-23)
 */
const setHour = (hour: number) =>
(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
):
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| null => {
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

	// Validate hour is in valid range
	if (hour < 0 || hour > 23 || !Number.isInteger(hour)) {
		return null
	}

	try {
		return time.with({ hour })
	} catch {
		return null
	}
}

export default setHour
