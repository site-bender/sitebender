import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is before another time
 * 
 * Curried function that validates whether one time comes chronologically
 * before another time within a 24-hour period. Accepts various time formats
 * and converts them to Temporal.PlainTime for comparison. Compares time
 * components with nanosecond precision. Returns false for equal times,
 * invalid inputs, or conversion failures.
 * 
 * Time comparison rules:
 * - Compares time within a 24-hour cycle (00:00:00 to 23:59:59.999999999)
 * - Strictly before: time must be chronologically earlier
 * - Equal times return false (use isSameOrBeforeTime for inclusive)
 * - Nanosecond precision comparison
 * - Date-independent (only time of day matters)
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference time (string, Date, Temporal types, or time-like object)
 * @returns A predicate function that checks if a time is before the reference
 * @example
 * ```typescript
 * // Using ISO time strings
 * const isBefore230PM = isBeforeTime("14:30:00")
 * 
 * isBefore230PM("13:30:00")     // true (1:30 PM is before 2:30 PM)
 * isBefore230PM("15:30:00")     // false (3:30 PM is after 2:30 PM)
 * isBefore230PM("14:30:00")     // false (same time)
 * 
 * // Working with seconds and milliseconds
 * const precise1 = Temporal.PlainTime.from("12:00:00.500")
 * const precise2 = Temporal.PlainTime.from("12:00:00.499")
 * const precise3 = Temporal.PlainTime.from("12:00:00.501")
 * 
 * const isBeforePrecise = isBeforeTime(precise1)
 * isBeforePrecise(precise2)  // true (1 millisecond earlier)
 * isBeforePrecise(precise3)  // false (1 millisecond later)
 * 
 * // Nanosecond precision
 * const nano1 = "12:00:00.000000002"
 * const nano2 = "12:00:00.000000001"
 * 
 * const isBeforeNano = isBeforeTime(nano1)
 * isBeforeNano(nano2)  // true (1 nanosecond earlier)
 * isBeforeNano(nano1)  // false (exact same)
 * 
 * // Edge cases around midnight
 * const justBeforeMidnight = "23:59:59"
 * const justAfterMidnight = "00:00:01"
 * 
 * const isBeforeLate = isBeforeTime(justBeforeMidnight)
 * isBeforeLate(justAfterMidnight)  // true (early morning is "before" late night in 24h cycle)
 * 
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T14:30:00")
 * const isBeforeJsDate = isBeforeTime(jsDate)
 * 
 * isBeforeJsDate("13:30:00")  // true
 * isBeforeJsDate("15:30:00")  // false
 * 
 * // Time-like objects
 * const isBeforeCustom = isBeforeTime({ hour: 14, minute: 30 })
 * 
 * isBeforeCustom({ hour: 13, minute: 30 })  // true
 * isBeforeCustom({ hour: 15, minute: 30 })  // false
 * 
 * // Invalid inputs
 * const checker = isBeforeTime("14:30:00")
 * 
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker("")                      // false
 * checker("invalid")               // false
 * checker("25:00:00")              // false (invalid hour)
 * checker({})                      // false
 * 
 * // Business hours validation
 * const isBeforeOpeningTime = (
 *   time: TimeInput,
 *   openingTime: TimeInput
 * ): boolean => {
 *   return isBeforeTime(openingTime)(time)
 * }
 * 
 * const businessOpen = "09:00:00"
 * const requestTime = "08:30:00"
 * 
 * isBeforeOpeningTime(requestTime, businessOpen)  // true (before opening)
 * 
 * // Scheduling time slots
 * const availableSlots = [
 *   "09:00:00",
 *   "10:00:00",
 *   "11:00:00",
 *   "14:00:00",
 *   "15:00:00"
 * ]
 * 
 * const latestTime = "10:30:00"
 * const earlierSlots = availableSlots.filter(isBeforeTime(latestTime))
 * // ["09:00:00", "10:00:00"]
 * 
 * // Shift scheduling
 * const getMorningShifts = (
 *   shifts: Array<{ name: string, startTime: TimeInput }>,
 *   noonTime: TimeInput = "12:00:00"
 * ): Array<{ name: string, startTime: TimeInput }> => {
 *   return shifts.filter(shift => isBeforeTime(noonTime)(shift.startTime))
 * }
 * 
 * const shifts = [
 *   { name: "Early Morning", startTime: "06:00:00" },
 *   { name: "Mid-Morning", startTime: "10:00:00" },
 *   { name: "Afternoon", startTime: "14:00:00" },
 *   { name: "Evening", startTime: "18:00:00" }
 * ]
 * 
 * getMorningShifts(shifts)
 * // [{ name: "Early Morning", ... }, { name: "Mid-Morning", ... }]
 * 
 * // Meeting room conflict detection
 * const hasConflict = (
 *   newMeetingStart: TimeInput,
 *   newMeetingEnd: TimeInput,
 *   existingStart: TimeInput,
 *   existingEnd: TimeInput
 * ): boolean => {
 *   // Conflict if new meeting starts before existing ends
 *   // and new meeting ends after existing starts
 *   return !isBeforeTime(existingStart)(newMeetingEnd) && 
 *          isBeforeTime(existingEnd)(newMeetingStart)
 * }
 * 
 * hasConflict("10:00:00", "11:00:00", "10:30:00", "11:30:00")  // true (overlap)
 * hasConflict("09:00:00", "10:00:00", "10:00:00", "11:00:00")  // false (adjacent)
 * 
 * // Curfew checking
 * const isBeforeCurfew = (
 *   currentTime: TimeInput,
 *   curfewTime: TimeInput
 * ): boolean => {
 *   return isBeforeTime(curfewTime)(currentTime)
 * }
 * 
 * const curfew = "22:00:00"
 * const now = "21:30:00"
 * 
 * isBeforeCurfew(now, curfew)  // true (still allowed)
 * 
 * // Restaurant service times
 * const getServicePeriod = (
 *   time: TimeInput
 * ): string => {
 *   const breakfastEnd = "11:00:00"
 *   const lunchEnd = "17:00:00"
 *   const dinnerEnd = "22:00:00"
 *   
 *   if (isBeforeTime(breakfastEnd)(time)) {
 *     return "breakfast"
 *   }
 *   if (isBeforeTime(lunchEnd)(time)) {
 *     return "lunch"
 *   }
 *   if (isBeforeTime(dinnerEnd)(time)) {
 *     return "dinner"
 *   }
 *   return "closed"
 * }
 * 
 * getServicePeriod("07:30:00")  // "breakfast"
 * getServicePeriod("12:30:00")  // "lunch"
 * getServicePeriod("19:00:00")  // "dinner"
 * getServicePeriod("23:00:00")  // "closed"
 * 
 * // Alarm scheduling
 * const getNextAlarm = (
 *   alarms: Array<TimeInput>,
 *   afterTime: TimeInput
 * ): TimeInput | null => {
 *   const futureAlarms = alarms
 *     .filter(alarm => !isBeforeTime(afterTime)(alarm))
 *     .sort((a, b) => {
 *       const timeA = toPlainTime(a)
 *       const timeB = toPlainTime(b)
 *       if (!timeA || !timeB) return 0
 *       return Temporal.PlainTime.compare(timeA, timeB)
 *     })
 *   
 *   return futureAlarms[0] || null
 * }
 * 
 * const alarms = ["07:00:00", "12:00:00", "18:00:00", "22:00:00"]
 * getNextAlarm(alarms, "13:00:00")  // "18:00:00"
 * 
 * // Trading hours check
 * const isPreMarket = (
 *   time: TimeInput,
 *   marketOpen: TimeInput = "09:30:00"
 * ): boolean => {
 *   return isBeforeTime(marketOpen)(time)
 * }
 * 
 * isPreMarket("09:00:00")  // true
 * isPreMarket("10:00:00")  // false
 * 
 * // Time-based access control
 * const canAccessResource = (
 *   currentTime: TimeInput,
 *   accessStartTime: TimeInput,
 *   accessEndTime: TimeInput
 * ): boolean => {
 *   return !isBeforeTime(accessStartTime)(currentTime) && 
 *          isBeforeTime(accessEndTime)(currentTime)
 * }
 * 
 * canAccessResource("10:00:00", "09:00:00", "17:00:00")  // true
 * canAccessResource("08:00:00", "09:00:00", "17:00:00")  // false
 * canAccessResource("18:00:00", "09:00:00", "17:00:00")  // false
 * 
 * // Finding earliest time
 * const findEarliestTime = (
 *   times: Array<TimeInput>
 * ): TimeInput | null => {
 *   if (times.length === 0) return null
 *   
 *   return times.reduce((earliest, time) => {
 *     return isBeforeTime(earliest)(time) ? time : earliest
 *   })
 * }
 * 
 * findEarliestTime(["10:00:00", "09:00:00", "14:00:00", "08:30:00"])
 * // "08:30:00"
 * 
 * // Batch job scheduling
 * const shouldRunBatchJob = (
 *   currentTime: TimeInput,
 *   windowStart: TimeInput = "02:00:00",
 *   windowEnd: TimeInput = "05:00:00"
 * ): boolean => {
 *   // Handle overnight windows
 *   const isOvernight = isBeforeTime(windowEnd)(windowStart)
 *   
 *   if (isOvernight) {
 *     // Window crosses midnight (e.g., 22:00 to 02:00)
 *     return !isBeforeTime(windowStart)(currentTime) || 
 *            isBeforeTime(windowEnd)(currentTime)
 *   }
 *   
 *   // Normal window (e.g., 02:00 to 05:00)
 *   return !isBeforeTime(windowStart)(currentTime) && 
 *          isBeforeTime(windowEnd)(currentTime)
 * }
 * 
 * shouldRunBatchJob("03:00:00", "02:00:00", "05:00:00")  // true
 * shouldRunBatchJob("01:00:00", "02:00:00", "05:00:00")  // false
 * shouldRunBatchJob("23:00:00", "22:00:00", "02:00:00")  // true (overnight window)
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Date-independent - Only compares time of day
 * @property Precise - Nanosecond precision for time comparisons
 * @property Exclusive - Returns false for equal times
 * @property Flexible - Accepts strings, Dates, Temporal types, and time-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isBeforeTime = (
	reference: TimeInput | null | undefined
) => (
	time: TimeInput | null | undefined
): boolean => {
	const refTime = toPlainTime(reference)
	const compareTime = toPlainTime(time)
	
	if (!refTime || !compareTime) {
		return false
	}
	
	try {
		return Temporal.PlainTime.compare(compareTime, refTime) < 0
	} catch {
		return false
	}
}

export default isBeforeTime