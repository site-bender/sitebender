/**
 * Adjusts time components of a PlainDateTime while preserving the date
 * 
 * Immutably modifies specific time components (hour, minute, second, etc.)
 * of a PlainDateTime while keeping the date portion unchanged. Accepts a
 * partial time specification and merges it with the existing datetime.
 * Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (timeAdjustment) => (datetime) => result
 * @param timeAdjustment - Object with time components to adjust
 * @param datetime - The PlainDateTime to adjust
 * @returns New PlainDateTime with adjusted time, or null if invalid
 * @example
 * ```typescript
 * // Basic time adjustments
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * adjustTime({ hour: 14 })(datetime)      // PlainDateTime 2024-03-15T14:30:45
 * adjustTime({ minute: 0 })(datetime)     // PlainDateTime 2024-03-15T10:00:45
 * adjustTime({ second: 0 })(datetime)     // PlainDateTime 2024-03-15T10:30:00
 * 
 * // Multiple components at once
 * adjustTime({ hour: 9, minute: 0, second: 0 })(datetime)
 * // PlainDateTime 2024-03-15T09:00:00
 * 
 * adjustTime({ 
 *   hour: 17, 
 *   minute: 30, 
 *   second: 0,
 *   millisecond: 0 
 * })(datetime)
 * // PlainDateTime 2024-03-15T17:30:00.000
 * 
 * // Preserve date while changing time
 * const meeting = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * adjustTime({ hour: 10, minute: 0 })(meeting)
 * // PlainDateTime 2024-03-15T10:00:00 (same date, different time)
 * 
 * // Partial application for common adjustments
 * const setToMidnight = adjustTime({ 
 *   hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 
 * })
 * const setToNoon = adjustTime({ hour: 12, minute: 0, second: 0 })
 * const setToEndOfDay = adjustTime({ 
 *   hour: 23, minute: 59, second: 59, millisecond: 999 
 * })
 * 
 * const someDate = Temporal.PlainDateTime.from("2024-03-15T14:23:45.123")
 * setToMidnight(someDate)                 // PlainDateTime 2024-03-15T00:00:00.000
 * setToNoon(someDate)                     // PlainDateTime 2024-03-15T12:00:00.123
 * setToEndOfDay(someDate)                 // PlainDateTime 2024-03-15T23:59:59.999
 * 
 * // Business hours adjustment
 * const setToStartOfBusiness = adjustTime({ hour: 9, minute: 0, second: 0 })
 * const setToEndOfBusiness = adjustTime({ hour: 17, minute: 0, second: 0 })
 * const setToLunchTime = adjustTime({ hour: 12, minute: 30, second: 0 })
 * 
 * const appointment = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * setToStartOfBusiness(appointment)       // PlainDateTime 2024-03-15T09:00:00
 * setToEndOfBusiness(appointment)         // PlainDateTime 2024-03-15T17:00:00
 * 
 * // Standardize times for comparison
 * function normalizeToHour(
 *   datetime: Temporal.PlainDateTime
 * ): Temporal.PlainDateTime | null {
 *   return adjustTime({ minute: 0, second: 0, millisecond: 0 })(datetime)
 * }
 * 
 * const time1 = Temporal.PlainDateTime.from("2024-03-15T10:23:45")
 * const time2 = Temporal.PlainDateTime.from("2024-03-15T10:45:12")
 * normalizeToHour(time1)                  // PlainDateTime 2024-03-15T10:00:00
 * normalizeToHour(time2)                  // PlainDateTime 2024-03-15T10:00:00
 * 
 * // Scheduling with fixed times
 * function scheduleAtTime(
 *   date: Temporal.PlainDate,
 *   timeSpec: { hour: number; minute: number }
 * ): Temporal.PlainDateTime | null {
 *   const datetime = date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   return adjustTime(timeSpec)(datetime)
 * }
 * 
 * const eventDate = Temporal.PlainDate.from("2024-03-20")
 * scheduleAtTime(eventDate, { hour: 14, minute: 30 })
 * // PlainDateTime 2024-03-20T14:30:00
 * 
 * // Batch time adjustments
 * const events = [
 *   Temporal.PlainDateTime.from("2024-03-15T10:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-16T11:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-17T12:00:00")
 * ]
 * 
 * const standardizedEvents = events.map(
 *   adjustTime({ hour: 9, minute: 0, second: 0 })
 * )
 * // All events moved to 9:00 AM on their respective dates
 * 
 * // Alarm clock settings
 * function setAlarm(
 *   day: Temporal.PlainDate,
 *   alarmTime: { hour: number; minute: number }
 * ): Temporal.PlainDateTime | null {
 *   const midnight = day.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   return adjustTime(alarmTime)(midnight)
 * }
 * 
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * setAlarm(tomorrow, { hour: 6, minute: 30 })
 * // Tomorrow at 6:30 AM
 * 
 * // Null handling
 * adjustTime({ hour: 10 })(null)          // null
 * adjustTime({ hour: 10 })(undefined)     // null
 * adjustTime(null)(datetime)              // null
 * 
 * // Server maintenance windows
 * function getMaintenanceWindow(
 *   date: Temporal.PlainDate
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const base = date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   return {
 *     start: adjustTime({ hour: 2, minute: 0, second: 0 })(base),
 *     end: adjustTime({ hour: 4, minute: 0, second: 0 })(base)
 *   }
 * }
 * 
 * const maintenanceDate = Temporal.PlainDate.from("2024-03-20")
 * getMaintenanceWindow(maintenanceDate)
 * // { start: 2024-03-20T02:00:00, end: 2024-03-20T04:00:00 }
 * 
 * // Trading hours
 * const marketOpen = adjustTime({ hour: 9, minute: 30, second: 0 })
 * const marketClose = adjustTime({ hour: 16, minute: 0, second: 0 })
 * 
 * const tradingDay = Temporal.PlainDateTime.from("2024-03-15T12:00:00")
 * marketOpen(tradingDay)                  // PlainDateTime 2024-03-15T09:30:00
 * marketClose(tradingDay)                 // PlainDateTime 2024-03-15T16:00:00
 * 
 * // Broadcast scheduling
 * function scheduleBroadcast(
 *   dates: Array<Temporal.PlainDate>,
 *   airTime: { hour: number; minute: number }
 * ): Array<Temporal.PlainDateTime | null> {
 *   return dates.map(date => {
 *     const datetime = date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *     return adjustTime(airTime)(datetime)
 *   })
 * }
 * 
 * const broadcastDates = [
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-03-22"),
 *   Temporal.PlainDate.from("2024-03-29")
 * ]
 * scheduleBroadcast(broadcastDates, { hour: 20, minute: 0 })
 * // All dates at 8:00 PM
 * 
 * // Precision adjustment
 * function truncateToMinute(
 *   datetime: Temporal.PlainDateTime
 * ): Temporal.PlainDateTime | null {
 *   return adjustTime({ 
 *     second: 0, 
 *     millisecond: 0, 
 *     microsecond: 0, 
 *     nanosecond: 0 
 *   })(datetime)
 * }
 * 
 * const precise = Temporal.PlainDateTime.from("2024-03-15T10:30:45.123456789")
 * truncateToMinute(precise)               // PlainDateTime 2024-03-15T10:30:00.000000000
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new datetime without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property Preserving - Maintains date while adjusting time
 */
const adjustTime = (
	timeAdjustment: {
		hour?: number
		minute?: number
		second?: number
		millisecond?: number
		microsecond?: number
		nanosecond?: number
	} | null | undefined
) => (
	datetime: Temporal.PlainDateTime | null | undefined
): Temporal.PlainDateTime | null => {
	if (datetime == null || timeAdjustment == null) {
		return null
	}
	
	if (!(datetime instanceof Temporal.PlainDateTime)) {
		return null
	}
	
	try {
		// Build the with() argument, only including defined properties
		const withArgs: Record<string, number> = {}
		
		if (timeAdjustment.hour !== undefined) {
			withArgs.hour = timeAdjustment.hour
		}
		if (timeAdjustment.minute !== undefined) {
			withArgs.minute = timeAdjustment.minute
		}
		if (timeAdjustment.second !== undefined) {
			withArgs.second = timeAdjustment.second
		}
		if (timeAdjustment.millisecond !== undefined) {
			withArgs.millisecond = timeAdjustment.millisecond
		}
		if (timeAdjustment.microsecond !== undefined) {
			withArgs.microsecond = timeAdjustment.microsecond
		}
		if (timeAdjustment.nanosecond !== undefined) {
			withArgs.nanosecond = timeAdjustment.nanosecond
		}
		
		return datetime.with(withArgs)
	} catch {
		return null
	}
}

export default adjustTime