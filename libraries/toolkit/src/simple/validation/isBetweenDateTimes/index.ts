import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is between two other datetimes (inclusive)
 *
 * Curried function that validates whether a datetime falls within a datetime range,
 * including the boundary datetimes. Accepts various datetime formats and converts
 * them to Temporal.PlainDateTime for comparison. Compares both date and time
 * components with nanosecond precision. Returns true if the datetime is greater
 * than or equal to the start datetime AND less than or equal to the end datetime.
 * Returns false for invalid inputs, conversion failures, or datetimes outside range.
 *
 * DateTime range rules:
 * - Inclusive boundaries: datetime can equal start or end datetime
 * - Start datetime must be before or equal to end datetime
 * - Invalid range (start > end) always returns false
 * - Calendar-aware comparison (respects calendar systems)
 * - Nanosecond precision for time comparisons
 * - Invalid inputs return false (safe for chaining)
 *
 * @param startDateTime - The start of the datetime range (inclusive)
 * @param endDateTime - The end of the datetime range (inclusive)
 * @returns A predicate function that checks if a datetime is within the range
 * @example
 * ```typescript
 * // Using ISO datetime strings
 * const isInWorkDay = isBetweenDateTimes(
 *   "2024-01-15T09:00:00",
 *   "2024-01-15T17:00:00"
 * )
 *
 * isInWorkDay("2024-01-15T12:00:00")     // true (noon)
 * isInWorkDay("2024-01-15T09:00:00")     // true (start boundary)
 * isInWorkDay("2024-01-15T17:00:00")     // true (end boundary)
 * isInWorkDay("2024-01-15T08:59:59")     // false (before work)
 * isInWorkDay("2024-01-15T17:00:01")     // false (after work)
 *
 * // Using Temporal PlainDateTime objects
 * const startDT = Temporal.PlainDateTime.from("2024-01-01T00:00:00")
 * const endDT = Temporal.PlainDateTime.from("2024-12-31T23:59:59")
 *
 * const isIn2024 = isBetweenDateTimes(startDT, endDT)
 *
 * isIn2024("2024-06-15T12:30:00")        // true (mid-year)
 * isIn2024("2024-01-01T00:00:00")        // true (first moment)
 * isIn2024("2024-12-31T23:59:59")        // true (last moment)
 * isIn2024("2023-12-31T23:59:59")        // false (previous year)
 * isIn2024("2025-01-01T00:00:00")        // false (next year)
 *
 * // Mixed input types
 * const jsStartDT = new Date("2024-03-15T10:00:00")
 * const jsEndDT = new Date("2024-03-15T14:00:00")
 *
 * const isInMeeting = isBetweenDateTimes(jsStartDT, jsEndDT)
 *
 * isInMeeting(new Date("2024-03-15T12:00:00"))  // true
 * isInMeeting("2024-03-15T10:00:00")            // true
 * isInMeeting("2024-03-15T14:00:01")            // false
 *
 * // Microsecond and nanosecond precision
 * const precise1 = "2024-01-15T12:00:00.000000001"
 * const precise2 = "2024-01-15T12:00:00.999999999"
 *
 * const isPreciseRange = isBetweenDateTimes(precise1, precise2)
 *
 * isPreciseRange("2024-01-15T12:00:00.500000000")  // true
 * isPreciseRange("2024-01-15T12:00:00.000000001")  // true (start boundary)
 * isPreciseRange("2024-01-15T12:00:00.999999999")  // true (end boundary)
 * isPreciseRange("2024-01-15T12:00:01.000000000")  // false
 *
 * // Invalid range (start > end) returns false
 * const invalidRange = isBetweenDateTimes(
 *   "2024-12-31T23:59:59",
 *   "2024-01-01T00:00:00"
 * )
 *
 * invalidRange("2024-06-15T12:00:00")   // false (range is invalid)
 * invalidRange("2024-01-01T00:00:00")   // false
 * invalidRange("2024-12-31T23:59:59")   // false
 *
 * // Event scheduling validation
 * const validateEventTime = (
 *   eventStart: DateTimeInput,
 *   eventEnd: DateTimeInput,
 *   venueOpenTime: DateTimeInput,
 *   venueCloseTime: DateTimeInput
 * ): string | null => {
 *   const isVenueOpen = isBetweenDateTimes(venueOpenTime, venueCloseTime)
 *
 *   if (!isVenueOpen(eventStart)) {
 *     return "Event starts before venue opens"
 *   }
 *   if (!isVenueOpen(eventEnd)) {
 *     return "Event ends after venue closes"
 *   }
 *
 *   return null
 * }
 *
 * const venueOpen = "2024-03-15T08:00:00"
 * const venueClose = "2024-03-15T22:00:00"
 * const eventStart = "2024-03-15T18:00:00"
 * const eventEnd = "2024-03-15T21:00:00"
 *
 * validateEventTime(eventStart, eventEnd, venueOpen, venueClose)  // null (valid)
 *
 * // Shift work validation
 * const isOnShift = (
 *   checkTime: DateTimeInput,
 *   shiftStart: DateTimeInput,
 *   shiftEnd: DateTimeInput
 * ): boolean => {
 *   // Handle overnight shifts
 *   const start = toPlainDateTime(shiftStart)
 *   const end = toPlainDateTime(shiftEnd)
 *   const check = toPlainDateTime(checkTime)
 *
 *   if (!start || !end || !check) return false
 *
 *   // If end is before start, it's an overnight shift
 *   if (Temporal.PlainDateTime.compare(end, start) < 0) {
 *     // Split into two ranges: start to midnight, and midnight to end
 *     const midnight = start.toPlainDate().add({ days: 1 }).toPlainDateTime(
 *       Temporal.PlainTime.from("00:00:00")
 *     )
 *     const beforeMidnight = isBetweenDateTimes(start, midnight)
 *     const afterMidnight = isBetweenDateTimes(
 *       midnight.toPlainDate().toPlainDateTime(Temporal.PlainTime.from("00:00:00")),
 *       end
 *     )
 *
 *     return beforeMidnight(check) || afterMidnight(check)
 *   }
 *
 *   return isBetweenDateTimes(shiftStart, shiftEnd)(checkTime)
 * }
 *
 * // Normal shift
 * isOnShift(
 *   "2024-03-15T14:00:00",
 *   "2024-03-15T09:00:00",
 *   "2024-03-15T17:00:00"
 * )  // true
 *
 * // Maintenance window checking
 * const isInMaintenanceWindow = (
 *   datetime: DateTimeInput,
 *   windows: Array<{ start: DateTimeInput, end: DateTimeInput }>
 * ): boolean => {
 *   return windows.some(window =>
 *     isBetweenDateTimes(window.start, window.end)(datetime)
 *   )
 * }
 *
 * const maintenanceWindows = [
 *   { start: "2024-03-15T02:00:00", end: "2024-03-15T04:00:00" },
 *   { start: "2024-03-16T02:00:00", end: "2024-03-16T04:00:00" }
 * ]
 *
 * isInMaintenanceWindow("2024-03-15T03:00:00", maintenanceWindows)  // true
 * isInMaintenanceWindow("2024-03-15T05:00:00", maintenanceWindows)  // false
 *
 * // API rate limit window
 * const isWithinRateWindow = (
 *   requestTime: DateTimeInput,
 *   windowStart: DateTimeInput,
 *   windowDurationSeconds: number
 * ): boolean => {
 *   const start = toPlainDateTime(windowStart)
 *   if (!start) return false
 *
 *   const end = start.add({ seconds: windowDurationSeconds })
 *   return isBetweenDateTimes(start, end)(requestTime)
 * }
 *
 * const rateLimitStart = "2024-03-15T10:00:00"
 * isWithinRateWindow("2024-03-15T10:00:30", rateLimitStart, 60)  // true
 * isWithinRateWindow("2024-03-15T10:01:01", rateLimitStart, 60)  // false
 *
 * // Log entry filtering
 * const getLogsInTimeRange = (
 *   logs: Array<{ timestamp: DateTimeInput, message: string }>,
 *   startTime: DateTimeInput,
 *   endTime: DateTimeInput
 * ): Array<{ timestamp: DateTimeInput, message: string }> => {
 *   const isInRange = isBetweenDateTimes(startTime, endTime)
 *   return logs.filter(log => isInRange(log.timestamp))
 * }
 *
 * const logs = [
 *   { timestamp: "2024-03-15T09:00:00", message: "System started" },
 *   { timestamp: "2024-03-15T10:30:00", message: "Process A completed" },
 *   { timestamp: "2024-03-15T11:45:00", message: "Process B started" },
 *   { timestamp: "2024-03-15T14:00:00", message: "System shutdown" }
 * ]
 *
 * getLogsInTimeRange(
 *   logs,
 *   "2024-03-15T10:00:00",
 *   "2024-03-15T12:00:00"
 * )
 * // Returns Process A and Process B logs
 *
 * // Trading hours validation
 * const isMarketOpen = (
 *   datetime: DateTimeInput,
 *   marketOpen: string = "09:30:00",
 *   marketClose: string = "16:00:00"
 * ): boolean => {
 *   const dt = toPlainDateTime(datetime)
 *   if (!dt) return false
 *
 *   // Skip weekends
 *   const dayOfWeek = dt.toPlainDate().dayOfWeek
 *   if (dayOfWeek === 6 || dayOfWeek === 7) return false
 *
 *   const open = dt.toPlainDate().toPlainDateTime(
 *     Temporal.PlainTime.from(marketOpen)
 *   )
 *   const close = dt.toPlainDate().toPlainDateTime(
 *     Temporal.PlainTime.from(marketClose)
 *   )
 *
 *   return isBetweenDateTimes(open, close)(datetime)
 * }
 *
 * isMarketOpen("2024-03-15T10:00:00")  // true (Friday 10 AM)
 * isMarketOpen("2024-03-15T08:00:00")  // false (before open)
 * isMarketOpen("2024-03-16T10:00:00")  // false (Saturday)
 *
 * // Session timeout validation
 * const isSessionValid = (
 *   lastActivity: DateTimeInput,
 *   currentTime: DateTimeInput,
 *   timeoutMinutes: number = 30
 * ): boolean => {
 *   const activity = toPlainDateTime(lastActivity)
 *   if (!activity) return false
 *
 *   const expiryTime = activity.add({ minutes: timeoutMinutes })
 *   return isBetweenDateTimes(activity, expiryTime)(currentTime)
 * }
 *
 * const lastActive = "2024-03-15T10:00:00"
 * isSessionValid(lastActive, "2024-03-15T10:15:00", 30)  // true
 * isSessionValid(lastActive, "2024-03-15T10:31:00", 30)  // false
 *
 * // Appointment slot availability
 * const isSlotAvailable = (
 *   slotStart: DateTimeInput,
 *   slotEnd: DateTimeInput,
 *   existingAppointments: Array<{ start: DateTimeInput, end: DateTimeInput }>
 * ): boolean => {
 *   // Check if any existing appointment overlaps with the slot
 *   return !existingAppointments.some(appt => {
 *     const apptInSlot = isBetweenDateTimes(slotStart, slotEnd)
 *     const slotInAppt = isBetweenDateTimes(appt.start, appt.end)
 *
 *     return apptInSlot(appt.start) || apptInSlot(appt.end) ||
 *            slotInAppt(slotStart) || slotInAppt(slotEnd)
 *   })
 * }
 *
 * const appointments = [
 *   { start: "2024-03-15T09:00:00", end: "2024-03-15T10:00:00" },
 *   { start: "2024-03-15T11:00:00", end: "2024-03-15T12:00:00" }
 * ]
 *
 * isSlotAvailable(
 *   "2024-03-15T10:00:00",
 *   "2024-03-15T11:00:00",
 *   appointments
 * )  // true (fits between appointments)
 *
 * isSlotAvailable(
 *   "2024-03-15T09:30:00",
 *   "2024-03-15T10:30:00",
 *   appointments
 * )  // false (overlaps with first appointment)
 *
 * // Invalid inputs
 * const checker = isBetweenDateTimes(
 *   "2024-01-01T00:00:00",
 *   "2024-12-31T23:59:59"
 * )
 *
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker("")                      // false
 * checker("invalid-datetime")      // false
 * checker("2024-13-01T00:00:00")  // false (invalid month)
 * checker("2024-01-01")            // false (date only, becomes midnight)
 *
 * // Calendar-aware comparisons
 * const islamicDateTime = Temporal.PlainDateTime.from({
 *   year: 1445,
 *   month: 7,
 *   day: 15,
 *   hour: 14,
 *   minute: 30,
 *   second: 0,
 *   calendar: "islamic"
 * })
 *
 * const gregorianStart = Temporal.PlainDateTime.from("2024-01-01T00:00:00")
 * const gregorianEnd = Temporal.PlainDateTime.from("2024-12-31T23:59:59")
 *
 * const isInGregorianYear = isBetweenDateTimes(gregorianStart, gregorianEnd)
 *
 * // Works across calendar systems
 * isInGregorianYear(islamicDateTime)  // Compares correctly across calendars
 *
 * // Deadline countdown
 * const timeUntilDeadline = (
 *   currentTime: DateTimeInput,
 *   deadline: DateTimeInput
 * ): string => {
 *   const now = toPlainDateTime(currentTime)
 *   const end = toPlainDateTime(deadline)
 *
 *   if (!now || !end) return "Invalid datetime"
 *
 *   if (!isBetweenDateTimes(now, end)(currentTime)) {
 *     return "Deadline passed"
 *   }
 *
 *   const duration = now.until(end)
 *   return `${duration.days}d ${duration.hours}h ${duration.minutes}m remaining`
 * }
 *
 * timeUntilDeadline(
 *   "2024-03-15T10:00:00",
 *   "2024-03-16T14:30:00"
 * )  // "1d 4h 30m remaining"
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isBetweenDateTimes = (
	startDateTime: DateTimeInput | null | undefined,
	endDateTime: DateTimeInput | null | undefined,
) =>
(
	datetime: DateTimeInput | null | undefined,
): boolean => {
	const start = toPlainDateTime(startDateTime)
	const end = toPlainDateTime(endDateTime)
	const checkDateTime = toPlainDateTime(datetime)

	if (!start || !end || !checkDateTime) {
		return false
	}

	try {
		// Check if range is valid (start <= end)
		if (Temporal.PlainDateTime.compare(start, end) > 0) {
			return false
		}

		// Check if datetime is >= start AND <= end
		return Temporal.PlainDateTime.compare(checkDateTime, start) >= 0 &&
			Temporal.PlainDateTime.compare(checkDateTime, end) <= 0
	} catch {
		return false
	}
}

export default isBetweenDateTimes
