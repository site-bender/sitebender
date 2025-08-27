import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is between two other times (inclusive)
 *
 * Curried function that validates whether a time falls within a time range,
 * including the boundary times. Accepts various time formats and converts them
 * to Temporal.PlainTime for comparison. Compares time components with nanosecond
 * precision within a 24-hour period. Returns true if the time is greater than or
 * equal to the start time AND less than or equal to the end time. Handles
 * overnight ranges (where end time is before start time). Returns false for
 * invalid inputs or conversion failures.
 *
 * Time range rules:
 * - Inclusive boundaries: time can equal start or end time
 * - Handles standard ranges (e.g., 09:00 to 17:00)
 * - Handles overnight ranges (e.g., 22:00 to 02:00)
 * - Date-independent (only time of day matters)
 * - Nanosecond precision comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param startTime - The start of the time range (inclusive)
 * @param endTime - The end of the time range (inclusive)
 * @returns A predicate function that checks if a time is within the range
 * @example
 * ```typescript
 * // Using ISO time strings
 * const isBusinessHours = isBetweenTimes("09:00:00", "17:00:00")
 *
 * isBusinessHours("12:00:00")     // true (noon)
 * isBusinessHours("09:00:00")     // true (start boundary)
 * isBusinessHours("17:00:00")     // true (end boundary)
 * isBusinessHours("08:59:59")     // false (before hours)
 * isBusinessHours("17:00:01")     // false (after hours)
 *
 * // Overnight ranges (crossing midnight)
 * const isNightShift = isBetweenTimes("22:00:00", "06:00:00")
 *
 * isNightShift("23:00:00")        // true (late evening)
 * isNightShift("02:00:00")        // true (early morning)
 * isNightShift("22:00:00")        // true (start boundary)
 * isNightShift("06:00:00")        // true (end boundary)
 * isNightShift("12:00:00")        // false (daytime)
 * isNightShift("20:00:00")        // false (before shift)
 *
 * // Using Temporal PlainTime objects
 * const startTime = Temporal.PlainTime.from("14:30:00")
 * const endTime = Temporal.PlainTime.from("18:30:00")
 *
 * const isAfternoon = isBetweenTimes(startTime, endTime)
 *
 * isAfternoon(Temporal.PlainTime.from("16:00:00"))  // true
 * isAfternoon(Temporal.PlainTime.from("14:30:00"))  // true (start)
 * isAfternoon(Temporal.PlainTime.from("18:30:00"))  // true (end)
 * isAfternoon(Temporal.PlainTime.from("19:00:00"))  // false
 *
 * // Mixed input types
 * const jsDate1 = new Date("2024-01-15T10:00:00")
 * const jsDate2 = new Date("2024-01-15T14:00:00")
 *
 * const isMorningWindow = isBetweenTimes(jsDate1, jsDate2)
 *
 * isMorningWindow("12:00:00")                       // true
 * isMorningWindow(new Date("2024-01-15T11:30:00"))  // true
 * isMorningWindow("15:00:00")                       // false
 *
 * // Microsecond and nanosecond precision
 * const precise1 = "12:00:00.000000001"
 * const precise2 = "12:00:00.999999999"
 *
 * const isPreciseRange = isBetweenTimes(precise1, precise2)
 *
 * isPreciseRange("12:00:00.500000000")  // true
 * isPreciseRange("12:00:00.000000001")  // true (start boundary)
 * isPreciseRange("12:00:00.999999999")  // true (end boundary)
 * isPreciseRange("12:00:01.000000000")  // false
 *
 * // Restaurant service hours validation
 * const getServicePeriod = (time: TimeInput): string => {
 *   const isBreakfast = isBetweenTimes("06:00:00", "10:59:59")
 *   const isLunch = isBetweenTimes("11:00:00", "16:59:59")
 *   const isDinner = isBetweenTimes("17:00:00", "21:59:59")
 *   const isLateNight = isBetweenTimes("22:00:00", "01:59:59")
 *
 *   if (isBreakfast(time)) return "breakfast"
 *   if (isLunch(time)) return "lunch"
 *   if (isDinner(time)) return "dinner"
 *   if (isLateNight(time)) return "late night"
 *   return "closed"
 * }
 *
 * getServicePeriod("07:30:00")   // "breakfast"
 * getServicePeriod("12:30:00")   // "lunch"
 * getServicePeriod("19:00:00")   // "dinner"
 * getServicePeriod("23:30:00")   // "late night"
 * getServicePeriod("03:00:00")   // "closed"
 *
 * // Shift scheduling with breaks
 * const isWorkingTime = (
 *   time: TimeInput,
 *   shiftStart: TimeInput,
 *   shiftEnd: TimeInput,
 *   breakPeriods: Array<{ start: TimeInput, end: TimeInput }> = []
 * ): boolean => {
 *   const isInShift = isBetweenTimes(shiftStart, shiftEnd)
 *
 *   if (!isInShift(time)) return false
 *
 *   // Check if time falls within any break period
 *   const isOnBreak = breakPeriods.some(breakPeriod =>
 *     isBetweenTimes(breakPeriod.start, breakPeriod.end)(time)
 *   )
 *
 *   return !isOnBreak
 * }
 *
 * const breaks = [
 *   { start: "12:00:00", end: "13:00:00" },  // Lunch break
 *   { start: "15:00:00", end: "15:15:00" }   // Coffee break
 * ]
 *
 * isWorkingTime("11:00:00", "09:00:00", "17:00:00", breaks)  // true
 * isWorkingTime("12:30:00", "09:00:00", "17:00:00", breaks)  // false (lunch)
 * isWorkingTime("15:10:00", "09:00:00", "17:00:00", breaks)  // false (coffee)
 *
 * // Public transport schedule
 * const isServiceRunning = (
 *   currentTime: TimeInput,
 *   serviceType: "peak" | "offPeak" | "night"
 * ): boolean => {
 *   const schedules = {
 *     peak: [
 *       { start: "06:00:00", end: "09:59:59" },
 *       { start: "16:00:00", end: "19:59:59" }
 *     ],
 *     offPeak: [
 *       { start: "10:00:00", end: "15:59:59" },
 *       { start: "20:00:00", end: "23:59:59" }
 *     ],
 *     night: [
 *       { start: "00:00:00", end: "05:59:59" }
 *     ]
 *   }
 *
 *   return schedules[serviceType].some(period =>
 *     isBetweenTimes(period.start, period.end)(currentTime)
 *   )
 * }
 *
 * isServiceRunning("07:30:00", "peak")     // true
 * isServiceRunning("12:00:00", "offPeak")  // true
 * isServiceRunning("03:00:00", "night")    // true
 * isServiceRunning("07:30:00", "offPeak")  // false
 *
 * // Trading session validation
 * const getTradingSession = (
 *   time: TimeInput,
 *   market: "US" | "EU" | "ASIA"
 * ): string | null => {
 *   const sessions = {
 *     US: {
 *       preMarket: { start: "04:00:00", end: "09:29:59" },
 *       regular: { start: "09:30:00", end: "15:59:59" },
 *       afterHours: { start: "16:00:00", end: "19:59:59" }
 *     },
 *     EU: {
 *       preMarket: { start: "07:00:00", end: "07:59:59" },
 *       regular: { start: "08:00:00", end: "16:29:59" },
 *       afterHours: { start: "16:30:00", end: "17:29:59" }
 *     },
 *     ASIA: {
 *       morning: { start: "09:00:00", end: "11:29:59" },
 *       lunch: { start: "11:30:00", end: "12:59:59" },
 *       afternoon: { start: "13:00:00", end: "14:59:59" }
 *     }
 *   }
 *
 *   const marketSessions = sessions[market]
 *
 *   for (const [sessionName, period] of Object.entries(marketSessions)) {
 *     if (isBetweenTimes(period.start, period.end)(time)) {
 *       return sessionName
 *     }
 *   }
 *
 *   return null
 * }
 *
 * getTradingSession("10:00:00", "US")   // "regular"
 * getTradingSession("05:00:00", "US")   // "preMarket"
 * getTradingSession("17:00:00", "US")   // "afterHours"
 *
 * // Parking restrictions
 * const canPark = (
 *   time: TimeInput,
 *   restrictions: Array<{ start: TimeInput, end: TimeInput, days?: Array<number> }>
 * ): boolean => {
 *   // Check if current time falls within any restriction period
 *   return !restrictions.some(restriction =>
 *     isBetweenTimes(restriction.start, restriction.end)(time)
 *   )
 * }
 *
 * const parkingRestrictions = [
 *   { start: "07:00:00", end: "09:00:00" },  // Morning rush
 *   { start: "16:00:00", end: "18:00:00" }   // Evening rush
 * ]
 *
 * canPark("08:00:00", parkingRestrictions)  // false (morning restriction)
 * canPark("12:00:00", parkingRestrictions)  // true (midday)
 * canPark("17:00:00", parkingRestrictions)  // false (evening restriction)
 *
 * // Happy hour detection
 * const isHappyHour = (
 *   time: TimeInput,
 *   happyHours: Array<{ start: TimeInput, end: TimeInput, discount: number }>
 * ): number => {
 *   for (const period of happyHours) {
 *     if (isBetweenTimes(period.start, period.end)(time)) {
 *       return period.discount
 *     }
 *   }
 *   return 0
 * }
 *
 * const happyHourSchedule = [
 *   { start: "16:00:00", end: "18:00:00", discount: 25 },
 *   { start: "21:00:00", end: "23:00:00", discount: 15 }
 * ]
 *
 * isHappyHour("17:00:00", happyHourSchedule)  // 25
 * isHappyHour("22:00:00", happyHourSchedule)  // 15
 * isHappyHour("19:00:00", happyHourSchedule)  // 0
 *
 * // School schedule
 * const getSchoolPeriod = (time: TimeInput): string => {
 *   const periods = [
 *     { name: "Before School", start: "00:00:00", end: "07:59:59" },
 *     { name: "Period 1", start: "08:00:00", end: "08:49:59" },
 *     { name: "Period 2", start: "08:50:00", end: "09:39:59" },
 *     { name: "Recess", start: "09:40:00", end: "09:59:59" },
 *     { name: "Period 3", start: "10:00:00", end: "10:49:59" },
 *     { name: "Period 4", start: "10:50:00", end: "11:39:59" },
 *     { name: "Lunch", start: "11:40:00", end: "12:39:59" },
 *     { name: "Period 5", start: "12:40:00", end: "13:29:59" },
 *     { name: "Period 6", start: "13:30:00", end: "14:19:59" },
 *     { name: "After School", start: "14:20:00", end: "23:59:59" }
 *   ]
 *
 *   for (const period of periods) {
 *     if (isBetweenTimes(period.start, period.end)(time)) {
 *       return period.name
 *     }
 *   }
 *
 *   return "Unknown"
 * }
 *
 * getSchoolPeriod("08:30:00")  // "Period 1"
 * getSchoolPeriod("09:45:00")  // "Recess"
 * getSchoolPeriod("12:00:00")  // "Lunch"
 *
 * // Curfew checking with age-based rules
 * const checkCurfew = (
 *   currentTime: TimeInput,
 *   age: number
 * ): string | null => {
 *   const curfews = [
 *     { maxAge: 12, start: "20:00:00", end: "05:59:59" },
 *     { maxAge: 16, start: "22:00:00", end: "05:59:59" },
 *     { maxAge: 18, start: "00:00:00", end: "04:59:59" }
 *   ]
 *
 *   const applicableCurfew = curfews.find(c => age <= c.maxAge)
 *
 *   if (applicableCurfew && isBetweenTimes(applicableCurfew.start, applicableCurfew.end)(currentTime)) {
 *     return `Curfew violation: Must be home between ${applicableCurfew.start} and ${applicableCurfew.end}`
 *   }
 *
 *   return null
 * }
 *
 * checkCurfew("21:00:00", 11)  // "Curfew violation..."
 * checkCurfew("23:00:00", 15)  // "Curfew violation..."
 * checkCurfew("21:00:00", 17)  // null (no curfew yet)
 *
 * // Invalid inputs
 * const checker = isBetweenTimes("09:00:00", "17:00:00")
 *
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker("")                      // false
 * checker("invalid")               // false
 * checker("25:00:00")              // false (invalid hour)
 * checker("12:60:00")              // false (invalid minute)
 * checker({})                      // false
 *
 * // Time slot overlap detection
 * const hasTimeOverlap = (
 *   slot1Start: TimeInput,
 *   slot1End: TimeInput,
 *   slot2Start: TimeInput,
 *   slot2End: TimeInput
 * ): boolean => {
 *   const isInSlot1 = isBetweenTimes(slot1Start, slot1End)
 *   const isInSlot2 = isBetweenTimes(slot2Start, slot2End)
 *
 *   return isInSlot1(slot2Start) || isInSlot1(slot2End) ||
 *          isInSlot2(slot1Start) || isInSlot2(slot1End)
 * }
 *
 * hasTimeOverlap(
 *   "09:00:00", "11:00:00",
 *   "10:00:00", "12:00:00"
 * )  // true (overlaps from 10:00 to 11:00)
 *
 * hasTimeOverlap(
 *   "09:00:00", "11:00:00",
 *   "11:00:00", "13:00:00"
 * )  // true (adjacent, sharing boundary)
 *
 * hasTimeOverlap(
 *   "09:00:00", "11:00:00",
 *   "14:00:00", "16:00:00"
 * )  // false (no overlap)
 *
 * // Finding next available time slot
 * const findNextAvailableSlot = (
 *   currentTime: TimeInput,
 *   slotDurationMinutes: number,
 *   bookedSlots: Array<{ start: TimeInput, end: TimeInput }>,
 *   businessStart: TimeInput = "09:00:00",
 *   businessEnd: TimeInput = "17:00:00"
 * ): TimeInput | null => {
 *   const current = toPlainTime(currentTime)
 *   const bizStart = toPlainTime(businessStart)
 *   const bizEnd = toPlainTime(businessEnd)
 *
 *   if (!current || !bizStart || !bizEnd) return null
 *
 *   // Start from current time or business start, whichever is later
 *   let searchTime = Temporal.PlainTime.compare(current, bizStart) > 0 ? current : bizStart
 *
 *   while (Temporal.PlainTime.compare(searchTime, bizEnd) < 0) {
 *     const slotEnd = searchTime.add({ minutes: slotDurationMinutes })
 *
 *     // Check if this slot overlaps with any booked slots
 *     const isAvailable = !bookedSlots.some(booked =>
 *       hasTimeOverlap(searchTime, slotEnd, booked.start, booked.end)
 *     )
 *
 *     if (isAvailable && Temporal.PlainTime.compare(slotEnd, bizEnd) <= 0) {
 *       return searchTime
 *     }
 *
 *     // Move to next 15-minute increment
 *     searchTime = searchTime.add({ minutes: 15 })
 *   }
 *
 *   return null
 * }
 * ```
 *
 * @curried
 * @pure
 */
const isBetweenTimes = (
	startTime: TimeInput | null | undefined,
	endTime: TimeInput | null | undefined,
) =>
(
	time: TimeInput | null | undefined,
): boolean => {
	const start = toPlainTime(startTime)
	const end = toPlainTime(endTime)
	const checkTime = toPlainTime(time)

	if (!start || !end || !checkTime) {
		return false
	}

	try {
		const startCompare = Temporal.PlainTime.compare(start, end)

		// Handle overnight range (end time is before start time)
		if (startCompare > 0) {
			// Time is in range if it's >= start OR <= end
			// Example: 22:00 to 02:00 includes 23:00 and 01:00
			return Temporal.PlainTime.compare(checkTime, start) >= 0 ||
				Temporal.PlainTime.compare(checkTime, end) <= 0
		}

		// Normal range (end time is after start time)
		// Time is in range if it's >= start AND <= end
		return Temporal.PlainTime.compare(checkTime, start) >= 0 &&
			Temporal.PlainTime.compare(checkTime, end) <= 0
	} catch {
		return false
	}
}

export default isBetweenTimes
