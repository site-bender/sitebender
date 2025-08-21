import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is the same as or after another time
 * 
 * Validates whether one time is chronologically the same as or after
 * another time. Accepts various time formats and converts them to
 * Temporal.PlainTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate time comparisons with nanosecond precision.
 * Returns true for equal times, times after the reference, and false
 * for times before or invalid inputs.
 * 
 * Time comparison rules:
 * - Same or after: time must be equal to or chronologically later
 * - Equal times return true (inclusive comparison)
 * - Compares hours, minutes, seconds, milliseconds, and nanoseconds
 * - Day boundaries are not considered (23:59 is after 00:00)
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference time (string, Date, Temporal types, or time-like object)
 * @returns A predicate function that checks if a time is same or after the reference
 * @example
 * ```typescript
 * // Using ISO time strings
 * const isSameOrAfter9AM = isSameOrAfterTime("09:00:00")
 * 
 * isSameOrAfter9AM("10:30:00")     // true (10:30 is after 9:00)
 * isSameOrAfter9AM("09:00:00")     // true (same time)
 * isSameOrAfter9AM("08:30:00")     // false (8:30 is before 9:00)
 * 
 * // Using Temporal PlainTime objects
 * const time1 = Temporal.PlainTime.from("14:30:00")
 * const time2 = Temporal.PlainTime.from("15:45:00")
 * 
 * const isSameOrAfterTime1 = isSameOrAfterTime(time1)
 * isSameOrAfterTime1(time2)     // true
 * isSameOrAfterTime1(time1)     // true (same time)
 * 
 * // Time with seconds and milliseconds
 * const isSameOrAfterPrecise = isSameOrAfterTime("12:00:00.500")
 * 
 * isSameOrAfterPrecise("12:00:00.501")  // true (1ms after)
 * isSameOrAfterPrecise("12:00:00.500")  // true (same)
 * isSameOrAfterPrecise("12:00:00.499")  // false (1ms before)
 * 
 * // Time-like objects
 * const isSameOrAfterCustom = isSameOrAfterTime({ hour: 9, minute: 30 })
 * isSameOrAfterCustom({ hour: 10, minute: 0 })   // true
 * isSameOrAfterCustom({ hour: 9, minute: 30 })   // true
 * isSameOrAfterCustom({ hour: 9, minute: 15 })   // false
 * 
 * // Business hours validation
 * const openingTime = Temporal.PlainTime.from("09:00:00")
 * const isAfterOpening = isSameOrAfterTime(openingTime)
 * 
 * isAfterOpening("09:00:00")   // true (exactly at opening)
 * isAfterOpening("09:30:00")   // true (after opening)
 * isAfterOpening("08:45:00")   // false (before opening)
 * 
 * // Appointment scheduling
 * const validateAppointmentTime = (
 *   requestedTime: string,
 *   earliestSlot: string
 * ): string | null => {
 *   if (!isSameOrAfterTime(earliestSlot)(requestedTime)) {
 *     return "Please select a time at or after " + earliestSlot
 *   }
 *   return null
 * }
 * 
 * validateAppointmentTime("10:00:00", "09:00:00")  // null (valid)
 * validateAppointmentTime("09:00:00", "09:00:00")  // null (valid)
 * validateAppointmentTime("08:30:00", "09:00:00")  // "Please select..."
 * 
 * // Filter available time slots
 * const timeSlots = [
 *   "08:00:00",
 *   "09:00:00",
 *   "10:00:00",
 *   "11:00:00",
 *   "12:00:00"
 * ]
 * 
 * const minimumTime = "09:30:00"
 * const availableSlots = timeSlots.filter(isSameOrAfterTime(minimumTime))
 * // ["10:00:00", "11:00:00", "12:00:00"]
 * 
 * // Shift scheduling
 * const isLateShift = (shiftStart: Temporal.PlainTime): boolean => {
 *   const eveningCutoff = Temporal.PlainTime.from("18:00:00")
 *   return isSameOrAfterTime(eveningCutoff)(shiftStart)
 * }
 * 
 * const shift1 = Temporal.PlainTime.from("14:00:00")
 * const shift2 = Temporal.PlainTime.from("18:00:00")
 * const shift3 = Temporal.PlainTime.from("22:00:00")
 * 
 * isLateShift(shift1)  // false (afternoon)
 * isLateShift(shift2)  // true (evening start)
 * isLateShift(shift3)  // true (night)
 * 
 * // Service availability
 * const isServiceAvailable = (currentTime: string): boolean => {
 *   const serviceStart = "08:00:00"
 *   const serviceEnd = "20:00:00"
 *   
 *   return isSameOrAfterTime(serviceStart)(currentTime) &&
 *          !isSameOrAfterTime(serviceEnd)(currentTime)
 * }
 * 
 * isServiceAvailable("09:00:00")  // true
 * isServiceAvailable("20:00:00")  // false (exactly at close)
 * isServiceAvailable("07:59:59")  // false (before open)
 * 
 * // Meeting conflict detection
 * const hasTimeConflict = (
 *   meeting1End: string,
 *   meeting2Start: string
 * ): boolean => {
 *   // Conflict if meeting1 doesn't end before meeting2 starts
 *   return isSameOrAfterTime(meeting2Start)(meeting1End)
 * }
 * 
 * hasTimeConflict("10:30:00", "10:45:00")  // false (15 min gap)
 * hasTimeConflict("10:30:00", "10:30:00")  // true (no gap)
 * hasTimeConflict("10:45:00", "10:30:00")  // true (overlap)
 * 
 * // Time zone agnostic comparison
 * const checkTimeOrder = (
 *   times: Array<{ id: string; time: string }>
 * ): Array<typeof times[0]> => {
 *   const sorted = [...times].sort((a, b) => {
 *     const timeA = toPlainTime(a.time)
 *     const timeB = toPlainTime(b.time)
 *     if (!timeA || !timeB) return 0
 *     return Temporal.PlainTime.compare(timeA, timeB)
 *   })
 *   
 *   return sorted.filter((item, index) => {
 *     if (index === 0) return true
 *     return isSameOrAfterTime(sorted[index - 1].time)(item.time)
 *   })
 * }
 * 
 * // Deadline time tracking
 * const isDeadlinePassed = (
 *   deadlineTime: Temporal.PlainTime
 * ): boolean => {
 *   const now = Temporal.Now.plainTimeISO()
 *   return isSameOrAfterTime(deadlineTime)(now)
 * }
 * 
 * const deadline = Temporal.PlainTime.from("17:00:00")
 * isDeadlinePassed(deadline)  // true if current time is 5PM or later
 * 
 * // Invalid inputs return false
 * const checker = isSameOrAfterTime("09:00:00")
 * 
 * checker(null)              // false
 * checker(undefined)         // false
 * checker("")                // false (empty string)
 * checker("invalid-time")    // false (invalid format)
 * checker("25:00:00")        // false (invalid hour)
 * checker("12:60:00")        // false (invalid minute)
 * checker("12:00:60")        // false (invalid second)
 * checker(123)               // false (not a time type)
 * checker({})                // false (missing time properties)
 * checker([12, 0, 0])        // false (array not supported)
 * 
 * // Restaurant service periods
 * const isKitchenOpen = (orderTime: string): boolean => {
 *   const lunchStart = "11:30:00"
 *   const lunchEnd = "14:30:00"
 *   const dinnerStart = "17:30:00"
 *   const dinnerEnd = "22:00:00"
 *   
 *   const isDuringLunch = isSameOrAfterTime(lunchStart)(orderTime) &&
 *                         !isSameOrAfterTime(lunchEnd)(orderTime)
 *   const isDuringDinner = isSameOrAfterTime(dinnerStart)(orderTime) &&
 *                          !isSameOrAfterTime(dinnerEnd)(orderTime)
 *   
 *   return isDuringLunch || isDuringDinner
 * }
 * 
 * isKitchenOpen("12:00:00")  // true (lunch)
 * isKitchenOpen("15:00:00")  // false (between services)
 * isKitchenOpen("19:00:00")  // true (dinner)
 * 
 * // Parking meter enforcement
 * const isEnforcementActive = (currentTime: string): boolean => {
 *   const enforcementStart = "08:00:00"
 *   const enforcementEnd = "18:00:00"
 *   
 *   return isSameOrAfterTime(enforcementStart)(currentTime) &&
 *          !isSameOrAfterTime(enforcementEnd)(currentTime)
 * }
 * 
 * isEnforcementActive("07:59:00")  // false (free parking)
 * isEnforcementActive("08:00:00")  // true (enforcement starts)
 * isEnforcementActive("17:59:59")  // true (still enforced)
 * isEnforcementActive("18:00:00")  // false (enforcement ends)
 * 
 * // Time-based access control
 * const hasAccess = (
 *   accessTime: string,
 *   roleStartTime: string,
 *   roleEndTime: string
 * ): boolean => {
 *   return isSameOrAfterTime(roleStartTime)(accessTime) &&
 *          !isSameOrAfterTime(roleEndTime)(accessTime)
 * }
 * 
 * hasAccess("10:00:00", "09:00:00", "17:00:00")  // true
 * hasAccess("08:00:00", "09:00:00", "17:00:00")  // false
 * hasAccess("17:00:00", "09:00:00", "17:00:00")  // false
 * 
 * // Event scheduling with buffer time
 * const canScheduleEvent = (
 *   proposedTime: string,
 *   lastEventEnd: string,
 *   bufferMinutes: number = 15
 * ): boolean => {
 *   const lastEnd = toPlainTime(lastEventEnd)
 *   if (!lastEnd) return false
 *   
 *   const minimumStart = lastEnd.add({ minutes: bufferMinutes })
 *   return isSameOrAfterTime(minimumStart)(proposedTime)
 * }
 * 
 * canScheduleEvent("14:00:00", "13:30:00", 15)  // true (15 min buffer)
 * canScheduleEvent("13:40:00", "13:30:00", 15)  // false (only 10 min gap)
 * canScheduleEvent("13:45:00", "13:30:00", 15)  // true (exactly 15 min)
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Precise - Nanosecond precision comparison
 * @property Inclusive - Returns true for equal times
 * @property Flexible - Accepts strings, Dates, Temporal types, and time-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isSameOrAfterTime = (
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
		return Temporal.PlainTime.compare(compareTime, refTime) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterTime