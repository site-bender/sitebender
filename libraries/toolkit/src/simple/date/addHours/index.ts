/**
 * Adds hours to a Temporal PlainTime, PlainDateTime, or ZonedDateTime
 * 
 * Immutably adds the specified number of hours to a time or datetime.
 * Returns a new Temporal object with the hours added. Negative values
 * subtract hours. For PlainTime, wraps around 24-hour boundaries.
 * For datetime types, handles day boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (hours) => (time) => result
 * @param hours - Number of hours to add (negative to subtract)
 * @param time - The PlainTime, PlainDateTime, or ZonedDateTime to add hours to
 * @returns New time/datetime with hours added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:00")
 * addHours(2)(time)                       // PlainTime 12:30:00
 * addHours(5)(time)                       // PlainTime 15:30:00
 * addHours(-3)(time)                      // PlainTime 07:30:00
 * 
 * // 24-hour wrapping with PlainTime
 * const evening = Temporal.PlainTime.from("22:00:00")
 * addHours(3)(evening)                    // PlainTime 01:00:00 (wraps to next day)
 * addHours(26)(evening)                   // PlainTime 00:00:00 (wraps multiple times)
 * 
 * const morning = Temporal.PlainTime.from("02:00:00")
 * addHours(-3)(morning)                   // PlainTime 23:00:00 (wraps to previous day)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addHours(2)(datetime)                   // PlainDateTime 2024-03-15T12:30:00
 * addHours(14)(datetime)                  // PlainDateTime 2024-03-16T00:30:00
 * addHours(-12)(datetime)                 // PlainDateTime 2024-03-14T22:30:00
 * 
 * // Day boundary crossing
 * const midnight = Temporal.PlainDateTime.from("2024-03-15T23:30:00")
 * addHours(1)(midnight)                   // PlainDateTime 2024-03-16T00:30:00
 * addHours(2)(midnight)                   // PlainDateTime 2024-03-16T01:30:00
 * 
 * // With ZonedDateTime (handles DST)
 * const zoned = Temporal.ZonedDateTime.from(
 *   "2024-03-10T01:00:00-04:00[America/New_York]"
 * )
 * addHours(2)(zoned)  // Crosses DST boundary, adjusts accordingly
 * 
 * // Partial application for common operations
 * const addHalfDay = addHours(12)
 * const addFullDay = addHours(24)
 * const subtractHour = addHours(-1)
 * 
 * const now = Temporal.PlainTime.from("09:00:00")
 * addHalfDay(now)                         // PlainTime 21:00:00
 * addFullDay(now)                         // PlainTime 09:00:00 (full cycle)
 * 
 * // Shift scheduling
 * function getShiftEnd(
 *   start: Temporal.PlainTime,
 *   duration: number
 * ): Temporal.PlainTime | null {
 *   return addHours(duration)(start)
 * }
 * 
 * const morningShift = Temporal.PlainTime.from("06:00:00")
 * getShiftEnd(morningShift, 8)            // PlainTime 14:00:00
 * 
 * const nightShift = Temporal.PlainTime.from("22:00:00")
 * getShiftEnd(nightShift, 8)              // PlainTime 06:00:00
 * 
 * // Time zone calculations
 * function convertTimeZone(
 *   time: Temporal.PlainTime,
 *   hoursDifference: number
 * ): Temporal.PlainTime | null {
 *   return addHours(hoursDifference)(time)
 * }
 * 
 * const utcTime = Temporal.PlainTime.from("12:00:00")
 * convertTimeZone(utcTime, -5)            // PlainTime 07:00:00 (EST)
 * convertTimeZone(utcTime, 8)             // PlainTime 20:00:00 (PST to Asia)
 * 
 * // Meeting scheduling across time zones
 * const meetings = [
 *   { name: "London", time: Temporal.PlainTime.from("09:00:00") },
 *   { name: "New York", time: addHours(-5)(Temporal.PlainTime.from("09:00:00")) },
 *   { name: "Tokyo", time: addHours(9)(Temporal.PlainTime.from("09:00:00")) }
 * ]
 * 
 * // Flight duration calculations
 * function getArrivalTime(
 *   departure: Temporal.PlainDateTime,
 *   flightHours: number
 * ): Temporal.PlainDateTime | null {
 *   return addHours(flightHours)(departure)
 * }
 * 
 * const departure = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * getArrivalTime(departure, 5.5)          // PlainDateTime 2024-03-15T20:00:00
 * getArrivalTime(departure, 12)           // PlainDateTime 2024-03-16T02:30:00
 * 
 * // Null handling
 * addHours(2)(null)                       // null
 * addHours(2)(undefined)                  // null
 * addHours(2)("invalid")                  // null
 * 
 * // Business hours calculation
 * function isWithinBusinessHours(
 *   time: Temporal.PlainTime,
 *   openHour: number = 9,
 *   closeHour: number = 17
 * ): boolean {
 *   const hour = time.hour
 *   return hour >= openHour && hour < closeHour
 * }
 * 
 * function getNextBusinessHour(
 *   time: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   if (time.hour >= 17) {
 *     // After business hours, jump to next day 9 AM
 *     const hoursToAdd = (24 - time.hour) + 9
 *     return addHours(hoursToAdd)(time)
 *   }
 *   if (time.hour < 9) {
 *     // Before business hours, jump to 9 AM
 *     return addHours(9 - time.hour)(time)
 *   }
 *   // During business hours, add 1 hour
 *   return addHours(1)(time)
 * }
 * 
 * const afterHours = Temporal.PlainTime.from("18:30:00")
 * getNextBusinessHour(afterHours)         // PlainTime 09:30:00
 * 
 * // Duration tracking
 * function trackWorkHours(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime
 * ): number {
 *   // Simple calculation (doesn't handle day wrap)
 *   return end.since(start).hours
 * }
 * 
 * const workStart = Temporal.PlainTime.from("09:00:00")
 * const workEnd = Temporal.PlainTime.from("17:30:00")
 * trackWorkHours(workStart, workEnd)      // 8.5 hours
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new time without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property Wrapping - PlainTime wraps around 24-hour boundary
 */
const addHours = (hours: number) => (
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (time == null) {
		return null
	}
	
	if (!(time instanceof Temporal.PlainTime) && 
	    !(time instanceof Temporal.PlainDateTime) &&
	    !(time instanceof Temporal.ZonedDateTime)) {
		return null
	}
	
	try {
		return time.add({ hours })
	} catch {
		return null
	}
}

export default addHours