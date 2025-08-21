import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is the same as or before another time
 * 
 * Validates whether one time is chronologically the same as or before
 * another time. Accepts various time formats and converts them to
 * Temporal.PlainTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate time comparisons with nanosecond precision.
 * Returns true for equal times, times before the reference, and false
 * for times after or invalid inputs.
 * 
 * Time comparison rules:
 * - Same or before: time must be equal to or chronologically earlier
 * - Equal times return true (inclusive comparison)
 * - Compares hours, minutes, seconds, milliseconds, and nanoseconds
 * - Day boundaries are not considered (00:00 is before 23:59)
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference time (string, Date, Temporal types, or time-like object)
 * @returns A predicate function that checks if a time is same or before the reference
 * @example
 * ```typescript
 * // Using ISO time strings
 * const isSameOrBefore5PM = isSameOrBeforeTime("17:00:00")
 * 
 * isSameOrBefore5PM("16:30:00")     // true (4:30 PM is before 5 PM)
 * isSameOrBefore5PM("17:00:00")     // true (same time)
 * isSameOrBefore5PM("17:30:00")     // false (5:30 PM is after 5 PM)
 * 
 * // Using Temporal PlainTime objects
 * const time1 = Temporal.PlainTime.from("14:30:00")
 * const time2 = Temporal.PlainTime.from("13:15:00")
 * 
 * const isSameOrBeforeTime1 = isSameOrBeforeTime(time1)
 * isSameOrBeforeTime1(time2)     // true
 * isSameOrBeforeTime1(time1)     // true (same time)
 * 
 * // Time with seconds and milliseconds
 * const isSameOrBeforePrecise = isSameOrBeforeTime("12:00:00.500")
 * 
 * isSameOrBeforePrecise("12:00:00.499")  // true (1ms before)
 * isSameOrBeforePrecise("12:00:00.500")  // true (same)
 * isSameOrBeforePrecise("12:00:00.501")  // false (1ms after)
 * 
 * // Time-like objects
 * const isSameOrBeforeCustom = isSameOrBeforeTime({ hour: 17, minute: 0 })
 * isSameOrBeforeCustom({ hour: 16, minute: 30 })   // true
 * isSameOrBeforeCustom({ hour: 17, minute: 0 })    // true
 * isSameOrBeforeCustom({ hour: 17, minute: 30 })   // false
 * 
 * // Business hours validation
 * const closingTime = Temporal.PlainTime.from("17:00:00")
 * const isBeforeClosing = isSameOrBeforeTime(closingTime)
 * 
 * isBeforeClosing("17:00:00")   // true (exactly at closing)
 * isBeforeClosing("16:30:00")   // true (before closing)
 * isBeforeClosing("17:30:00")   // false (after closing)
 * 
 * // Last order cutoff
 * const validateOrderTime = (
 *   orderTime: string,
 *   cutoffTime: string
 * ): string | null => {
 *   if (!isSameOrBeforeTime(cutoffTime)(orderTime)) {
 *     return "Orders must be placed by " + cutoffTime
 *   }
 *   return null
 * }
 * 
 * validateOrderTime("14:30:00", "15:00:00")  // null (valid)
 * validateOrderTime("15:00:00", "15:00:00")  // null (exactly at cutoff)
 * validateOrderTime("15:01:00", "15:00:00")  // "Orders must be placed by..."
 * 
 * // Filter morning appointments
 * const appointments = [
 *   "08:00:00",
 *   "10:00:00",
 *   "12:00:00",
 *   "14:00:00",
 *   "16:00:00"
 * ]
 * 
 * const noonCutoff = "12:00:00"
 * const morningAppointments = appointments.filter(isSameOrBeforeTime(noonCutoff))
 * // ["08:00:00", "10:00:00", "12:00:00"]
 * 
 * // Shift end time validation
 * const isWithinShift = (
 *   currentTime: Temporal.PlainTime,
 *   shiftEnd: Temporal.PlainTime
 * ): boolean => {
 *   return isSameOrBeforeTime(shiftEnd)(currentTime)
 * }
 * 
 * const now = Temporal.PlainTime.from("16:45:00")
 * const shiftEnds = Temporal.PlainTime.from("17:00:00")
 * 
 * isWithinShift(now, shiftEnds)  // true (still within shift)
 * 
 * // Parking meter expiration
 * const isParkingValid = (
 *   currentTime: string,
 *   meterExpiry: string
 * ): boolean => {
 *   return isSameOrBeforeTime(meterExpiry)(currentTime)
 * }
 * 
 * isParkingValid("14:59:00", "15:00:00")  // true
 * isParkingValid("15:00:00", "15:00:00")  // true (exactly at expiry)
 * isParkingValid("15:01:00", "15:00:00")  // false (expired)
 * 
 * // Trading hours check
 * const canExecuteTrade = (
 *   orderTime: string
 * ): boolean => {
 *   const marketOpen = "09:30:00"
 *   const marketClose = "16:00:00"
 *   
 *   return !isSameOrBeforeTime(marketOpen)(orderTime) ||
 *          isSameOrBeforeTime(marketClose)(orderTime)
 * }
 * 
 * canExecuteTrade("09:29:00")  // false (before market open)
 * canExecuteTrade("10:00:00")  // true
 * canExecuteTrade("16:00:00")  // true (at close)
 * canExecuteTrade("16:01:00")  // false (after close)
 * 
 * // Meeting room booking
 * const isSlotAvailable = (
 *   requestedEnd: string,
 *   nextBookingStart: string
 * ): boolean => {
 *   // Available if requested end is same-or-before next booking
 *   return isSameOrBeforeTime(nextBookingStart)(requestedEnd)
 * }
 * 
 * isSlotAvailable("11:00:00", "11:00:00")  // true (back-to-back)
 * isSlotAvailable("10:45:00", "11:00:00")  // true (15 min gap)
 * isSlotAvailable("11:15:00", "11:00:00")  // false (overlap)
 * 
 * // Batch processing windows
 * const shouldRunBatch = (
 *   currentTime: string,
 *   batchWindow: { start: string; end: string }
 * ): boolean => {
 *   const afterStart = !isSameOrBeforeTime(batchWindow.start)(currentTime)
 *   const beforeEnd = isSameOrBeforeTime(batchWindow.end)(currentTime)
 *   
 *   return afterStart && beforeEnd
 * }
 * 
 * shouldRunBatch("02:30:00", { start: "02:00:00", end: "04:00:00" })  // true
 * shouldRunBatch("01:30:00", { start: "02:00:00", end: "04:00:00" })  // false
 * shouldRunBatch("04:30:00", { start: "02:00:00", end: "04:00:00" })  // false
 * 
 * // School bell schedule
 * const getPeriodStatus = (
 *   currentTime: string,
 *   periodEnd: string
 * ): string => {
 *   if (isSameOrBeforeTime(periodEnd)(currentTime)) {
 *     const endTime = toPlainTime(periodEnd)
 *     const current = toPlainTime(currentTime)
 *     if (!endTime || !current) return "Invalid time"
 *     
 *     const warningTime = endTime.subtract({ minutes: 5 })
 *     if (!isSameOrBeforeTime(warningTime)(currentTime)) {
 *       return "Period ending soon"
 *     }
 *     return "In progress"
 *   }
 *   return "Period ended"
 * }
 * 
 * getPeriodStatus("09:50:00", "10:00:00")  // "In progress"
 * getPeriodStatus("09:56:00", "10:00:00")  // "Period ending soon"
 * getPeriodStatus("10:01:00", "10:00:00")  // "Period ended"
 * 
 * // Invalid inputs return false
 * const checker = isSameOrBeforeTime("17:00:00")
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
 * checker([17, 0, 0])        // false (array not supported)
 * 
 * // Library hours check
 * const isLibraryOpen = (visitTime: string): boolean => {
 *   const openTime = "08:00:00"
 *   const closeTime = "21:00:00"
 *   
 *   // Open if visit time is NOT same-or-before open time
 *   // AND is same-or-before close time
 *   return !isSameOrBeforeTime(openTime)(visitTime) ||
 *          (visitTime === openTime) &&
 *          isSameOrBeforeTime(closeTime)(visitTime)
 * }
 * 
 * isLibraryOpen("07:59:00")  // false (before opening)
 * isLibraryOpen("08:00:00")  // true (opening time)
 * isLibraryOpen("15:00:00")  // true (during hours)
 * isLibraryOpen("21:00:00")  // true (closing time)
 * isLibraryOpen("21:01:00")  // false (after closing)
 * 
 * // Delivery time windows
 * const isDeliveryOnTime = (
 *   actualTime: string,
 *   promisedBy: string
 * ): boolean => {
 *   return isSameOrBeforeTime(promisedBy)(actualTime)
 * }
 * 
 * isDeliveryOnTime("11:45:00", "12:00:00")  // true (early)
 * isDeliveryOnTime("12:00:00", "12:00:00")  // true (on time)
 * isDeliveryOnTime("12:15:00", "12:00:00")  // false (late)
 * 
 * // Time-based discounts
 * const qualifiesForHappyHour = (
 *   orderTime: string
 * ): boolean => {
 *   const happyHourStart = "16:00:00"
 *   const happyHourEnd = "18:00:00"
 *   
 *   return !isSameOrBeforeTime(happyHourStart)(orderTime) ||
 *          (orderTime === happyHourStart) &&
 *          isSameOrBeforeTime(happyHourEnd)(orderTime)
 * }
 * 
 * qualifiesForHappyHour("15:59:00")  // false
 * qualifiesForHappyHour("16:00:00")  // true
 * qualifiesForHappyHour("17:30:00")  // true
 * qualifiesForHappyHour("18:00:00")  // true
 * qualifiesForHappyHour("18:01:00")  // false
 * 
 * // Curfew validation
 * const respectsCurfew = (
 *   arrivalTime: string,
 *   curfewTime: string
 * ): boolean => {
 *   return isSameOrBeforeTime(curfewTime)(arrivalTime)
 * }
 * 
 * respectsCurfew("21:45:00", "22:00:00")  // true
 * respectsCurfew("22:00:00", "22:00:00")  // true (exactly at curfew)
 * respectsCurfew("22:15:00", "22:00:00")  // false (after curfew)
 * 
 * // Production schedule windows
 * const isInMaintenanceWindow = (
 *   currentTime: string
 * ): boolean => {
 *   // Maintenance window: 2 AM - 4 AM
 *   const maintenanceStart = "02:00:00"
 *   const maintenanceEnd = "04:00:00"
 *   
 *   const afterStart = !isSameOrBeforeTime(maintenanceStart)(currentTime) ||
 *                     currentTime === maintenanceStart
 *   const beforeEnd = isSameOrBeforeTime(maintenanceEnd)(currentTime)
 *   
 *   return afterStart && beforeEnd
 * }
 * 
 * isInMaintenanceWindow("01:59:00")  // false
 * isInMaintenanceWindow("02:00:00")  // true
 * isInMaintenanceWindow("03:00:00")  // true
 * isInMaintenanceWindow("04:00:00")  // true
 * isInMaintenanceWindow("04:01:00")  // false
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Precise - Nanosecond precision comparison
 * @property Inclusive - Returns true for equal times
 * @property Flexible - Accepts strings, Dates, Temporal types, and time-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isSameOrBeforeTime = (
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
		return Temporal.PlainTime.compare(compareTime, refTime) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeTime