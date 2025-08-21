import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is after another time
 * 
 * Curried function that validates whether one time comes chronologically
 * after another time within a 24-hour period. Accepts various time formats
 * and converts them to Temporal.PlainTime for comparison. Compares time
 * components with nanosecond precision. Returns false for equal times,
 * invalid inputs, or conversion failures.
 * 
 * Time comparison rules:
 * - Compares time within a 24-hour cycle (00:00:00 to 23:59:59.999999999)
 * - Strictly after: time must be chronologically later
 * - Equal times return false (use isSameOrAfterTime for inclusive)
 * - Nanosecond precision comparison
 * - Date-independent (only time of day matters)
 * 
 * @param reference - The reference Temporal.PlainTime to compare against
 * @returns A predicate function that checks if a time is after the reference
 * @example
 * ```typescript
 * // Using Temporal PlainTime
 * const { Temporal } = globalThis
 * 
 * const time1 = Temporal.PlainTime.from("14:30:00")
 * const time2 = Temporal.PlainTime.from("15:30:00")
 * const time3 = Temporal.PlainTime.from("13:30:00")
 * 
 * // Basic comparison
 * const isAfter230PM = isAfterTime(time1)
 * 
 * isAfter230PM(time2)     // true (3:30 PM is after 2:30 PM)
 * isAfter230PM(time3)     // false (1:30 PM is before 2:30 PM)
 * isAfter230PM(time1)     // false (same time)
 * 
 * // Working with seconds and milliseconds
 * const precise1 = Temporal.PlainTime.from("12:00:00.500")
 * const precise2 = Temporal.PlainTime.from("12:00:00.501")
 * const precise3 = Temporal.PlainTime.from("12:00:00.499")
 * 
 * const isAfterPrecise = isAfterTime(precise1)
 * isAfterPrecise(precise2)  // true (1 millisecond later)
 * isAfterPrecise(precise3)  // false (1 millisecond earlier)
 * 
 * // Nanosecond precision
 * const nano1 = Temporal.PlainTime.from("12:00:00.000000001")
 * const nano2 = Temporal.PlainTime.from("12:00:00.000000002")
 * 
 * const isAfterNano = isAfterTime(nano1)
 * isAfterNano(nano2)  // true (1 nanosecond later)
 * isAfterNano(nano1)  // false (exact same)
 * 
 * // Edge cases around midnight
 * const almostMidnight = Temporal.PlainTime.from("23:59:59")
 * const justAfterMidnight = Temporal.PlainTime.from("00:00:01")
 * 
 * const isAfterLate = isAfterTime(almostMidnight)
 * isAfterLate(justAfterMidnight)  // false (next day's time is "earlier" in 24h cycle)
 * 
 * // Business hours validation
 * const isAfterOpeningTime = (
 *   time: Temporal.PlainTime,
 *   openingTime: Temporal.PlainTime
 * ): boolean => {
 *   return isAfterTime(openingTime)(time)
 * }
 * 
 * const businessOpen = Temporal.PlainTime.from("09:00:00")
 * const requestTime = Temporal.PlainTime.from("10:30:00")
 * 
 * isAfterOpeningTime(requestTime, businessOpen)  // true
 * 
 * // Scheduling time slots
 * const availableSlots = [
 *   Temporal.PlainTime.from("09:00:00"),
 *   Temporal.PlainTime.from("10:00:00"),
 *   Temporal.PlainTime.from("11:00:00"),
 *   Temporal.PlainTime.from("14:00:00"),
 *   Temporal.PlainTime.from("15:00:00")
 * ]
 * 
 * const earliestTime = Temporal.PlainTime.from("10:30:00")
 * const laterSlots = availableSlots.filter(isAfterTime(earliestTime))
 * // [PlainTime("11:00:00"), PlainTime("14:00:00"), PlainTime("15:00:00")]
 * 
 * // Shift scheduling
 * const getAfternoonShifts = (
 *   shifts: Array<{ name: string, startTime: Temporal.PlainTime }>,
 *   noonTime: Temporal.PlainTime
 * ): Array<{ name: string, startTime: Temporal.PlainTime }> => {
 *   return shifts.filter(shift => isAfterTime(noonTime)(shift.startTime))
 * }
 * 
 * const shifts = [
 *   { name: "Morning", startTime: Temporal.PlainTime.from("06:00:00") },
 *   { name: "Mid-Morning", startTime: Temporal.PlainTime.from("10:00:00") },
 *   { name: "Afternoon", startTime: Temporal.PlainTime.from("14:00:00") },
 *   { name: "Evening", startTime: Temporal.PlainTime.from("18:00:00") }
 * ]
 * 
 * const noon = Temporal.PlainTime.from("12:00:00")
 * getAfternoonShifts(shifts, noon)
 * // [{ name: "Afternoon", ... }, { name: "Evening", ... }]
 * 
 * // Meeting room availability
 * const isTimeSlotAvailable = (
 *   requestedTime: Temporal.PlainTime,
 *   bookedSlots: Array<{ start: Temporal.PlainTime, end: Temporal.PlainTime }>
 * ): boolean => {
 *   return bookedSlots.every(slot => 
 *     !isAfterTime(slot.start)(requestedTime) || 
 *     isAfterTime(slot.end)(requestedTime)
 *   )
 * }
 * 
 * const requested = Temporal.PlainTime.from("14:30:00")
 * const booked = [
 *   { start: Temporal.PlainTime.from("09:00:00"), end: Temporal.PlainTime.from("10:00:00") },
 *   { start: Temporal.PlainTime.from("11:00:00"), end: Temporal.PlainTime.from("12:00:00") },
 *   { start: Temporal.PlainTime.from("15:00:00"), end: Temporal.PlainTime.from("16:00:00") }
 * ]
 * 
 * isTimeSlotAvailable(requested, booked)  // true
 * 
 * // Curfew checking
 * const isAfterCurfew = (
 *   currentTime: Temporal.PlainTime,
 *   curfewTime: Temporal.PlainTime
 * ): boolean => {
 *   return isAfterTime(curfewTime)(currentTime)
 * }
 * 
 * const curfew = Temporal.PlainTime.from("22:00:00")
 * const now = Temporal.PlainTime.from("22:30:00")
 * 
 * isAfterCurfew(now, curfew)  // true
 * 
 * // Restaurant service times
 * const getServicePeriod = (
 *   time: Temporal.PlainTime
 * ): string => {
 *   const breakfast = Temporal.PlainTime.from("06:00:00")
 *   const lunch = Temporal.PlainTime.from("11:00:00")
 *   const dinner = Temporal.PlainTime.from("17:00:00")
 *   const closing = Temporal.PlainTime.from("22:00:00")
 *   
 *   if (isAfterTime(closing)(time) || !isAfterTime(breakfast)(time)) {
 *     return "closed"
 *   }
 *   if (isAfterTime(dinner)(time)) {
 *     return "dinner"
 *   }
 *   if (isAfterTime(lunch)(time)) {
 *     return "lunch"
 *   }
 *   return "breakfast"
 * }
 * 
 * getServicePeriod(Temporal.PlainTime.from("07:30:00"))  // "breakfast"
 * getServicePeriod(Temporal.PlainTime.from("12:30:00"))  // "lunch"
 * getServicePeriod(Temporal.PlainTime.from("19:00:00"))  // "dinner"
 * getServicePeriod(Temporal.PlainTime.from("23:00:00"))  // "closed"
 * 
 * // Alarm clock logic
 * const shouldTriggerAlarm = (
 *   currentTime: Temporal.PlainTime,
 *   alarmTime: Temporal.PlainTime,
 *   lastTriggered: Temporal.PlainTime | null
 * ): boolean => {
 *   const afterAlarm = isAfterTime(alarmTime)(currentTime)
 *   if (!afterAlarm) return false
 *   
 *   if (!lastTriggered) return true
 *   
 *   // Don't trigger if we already triggered after the alarm time
 *   return !isAfterTime(alarmTime)(lastTriggered)
 * }
 * 
 * const alarm = Temporal.PlainTime.from("07:00:00")
 * const current = Temporal.PlainTime.from("07:01:00")
 * const lastTrig = Temporal.PlainTime.from("06:59:00")
 * 
 * shouldTriggerAlarm(current, alarm, lastTrig)  // true
 * shouldTriggerAlarm(current, alarm, current)   // false
 * 
 * // Trading hours check
 * const isMarketOpen = (
 *   time: Temporal.PlainTime,
 *   openTime: Temporal.PlainTime,
 *   closeTime: Temporal.PlainTime
 * ): boolean => {
 *   return isAfterTime(openTime)(time) && !isAfterTime(closeTime)(time)
 * }
 * 
 * const marketOpen = Temporal.PlainTime.from("09:30:00")
 * const marketClose = Temporal.PlainTime.from("16:00:00")
 * const tradeTime = Temporal.PlainTime.from("14:30:00")
 * 
 * isMarketOpen(tradeTime, marketOpen, marketClose)  // true
 * 
 * // Creating PlainTime from components
 * const customTime = new Temporal.PlainTime(14, 30, 45, 500, 0, 0)
 * const referenceTime = Temporal.PlainTime.from("14:30:45.499")
 * 
 * const isAfterCustom = isAfterTime(referenceTime)
 * isAfterCustom(customTime)  // true (500ms > 499ms)
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Date-independent - Only compares time of day
 * @property Precise - Nanosecond precision for time comparisons
 * @property Exclusive - Returns false for equal times
 */
const isAfterTime = (
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
		return Temporal.PlainTime.compare(compareTime, refTime) > 0
	} catch {
		return false
	}
}

export default isAfterTime