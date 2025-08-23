import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is before another datetime
 * 
 * Curried function that validates whether one datetime comes chronologically
 * before another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Compares both date and time components
 * with nanosecond precision. Returns false for equal datetimes, invalid inputs,
 * or conversion failures.
 * 
 * DateTime comparison rules:
 * - Compares date first, then time if dates are equal
 * - Strictly before: datetime must be chronologically earlier
 * - Equal datetimes return false (use isSameOrBeforeDateTime for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Nanosecond precision for time comparisons
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is before the reference
 * @example
 * ```typescript
 * // Using ISO datetime strings
 * const isBefore230PM = isBeforeDateTime("2024-01-15T14:30:00")
 * 
 * isBefore230PM("2024-01-15T13:30:00")     // true (1:30 PM is before 2:30 PM)
 * isBefore230PM("2024-01-15T15:30:00")     // false (3:30 PM is after 2:30 PM)
 * isBefore230PM("2024-01-15T14:30:00")     // false (same datetime)
 * 
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T14:30:00")
 * const isBeforeJsDate = isBeforeDateTime(jsDate)
 * 
 * isBeforeJsDate("2024-01-15T13:30:00")  // true
 * isBeforeJsDate(new Date("2024-01-15T15:30:00"))  // false
 * 
 * // Different dates
 * const jan15 = Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * const jan14 = Temporal.PlainDateTime.from("2024-01-14T14:00:00")
 * const jan16 = Temporal.PlainDateTime.from("2024-01-16T10:00:00")
 * 
 * const isBeforeJan15Noon = isBeforeDateTime(jan15)
 * isBeforeJan15Noon(jan14)  // true (previous day, even though later time)
 * isBeforeJan15Noon(jan16)  // false (next day, even though earlier time)
 * 
 * // Microsecond and nanosecond precision
 * const precise1 = Temporal.PlainDateTime.from("2024-01-15T12:00:00.000000002")
 * const precise2 = Temporal.PlainDateTime.from("2024-01-15T12:00:00.000000001")
 * 
 * const isBeforePrecise = isBeforeDateTime(precise1)
 * isBeforePrecise(precise2)  // true (1 nanosecond earlier)
 * isBeforePrecise(precise1)  // false (exact same)
 * 
 * // Appointment scheduling validation
 * const validateAppointmentNotTooEarly = (
 *   appointment: DateTimeInput,
 *   earliestTime: DateTimeInput
 * ): string | null => {
 *   if (isBeforeDateTime(earliestTime)(appointment)) {
 *     return `Appointment cannot be before ${earliestTime}`
 *   }
 *   return null
 * }
 * 
 * const minTime = "2024-01-15T09:00:00"
 * const appt = "2024-01-15T08:30:00"
 * 
 * validateAppointmentNotTooEarly(appt, minTime)  // "Appointment cannot be before..."
 * 
 * // Event filtering
 * const events = [
 *   { name: "Meeting A", time: Temporal.PlainDateTime.from("2024-01-15T09:00:00") },
 *   { name: "Meeting B", time: Temporal.PlainDateTime.from("2024-01-15T11:00:00") },
 *   { name: "Meeting C", time: Temporal.PlainDateTime.from("2024-01-15T14:00:00") },
 *   { name: "Meeting D", time: Temporal.PlainDateTime.from("2024-01-15T16:00:00") }
 * ]
 * 
 * const cutoff = Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * const morningEvents = events.filter(e => isBeforeDateTime(cutoff)(e.time))
 * // [Meeting A, Meeting B]
 * 
 * // Log entry filtering
 * const getOldLogs = (
 *   logs: Array<{ timestamp: DateTimeInput, message: string }>,
 *   before: DateTimeInput
 * ): Array<{ timestamp: DateTimeInput, message: string }> => {
 *   return logs.filter(log => isBeforeDateTime(before)(log.timestamp))
 * }
 * 
 * const logs = [
 *   { timestamp: "2024-01-15T10:00:00", message: "Start" },
 *   { timestamp: "2024-01-15T10:30:00", message: "Process" },
 *   { timestamp: "2024-01-15T11:00:00", message: "Complete" }
 * ]
 * 
 * const beforeTime = "2024-01-15T10:45:00"
 * getOldLogs(logs, beforeTime)
 * // [{ timestamp: "2024-01-15T10:00:00", ... }, { timestamp: "2024-01-15T10:30:00", ... }]
 * 
 * // Deadline checking
 * const isBeforeDeadline = (
 *   submission: DateTimeInput,
 *   deadline: DateTimeInput
 * ): boolean => {
 *   return isBeforeDateTime(deadline)(submission)
 * }
 * 
 * const submissionTime = "2024-12-31T23:30:00"
 * const deadlineTime = "2024-12-31T23:59:59"
 * 
 * isBeforeDeadline(submissionTime, deadlineTime)  // true (on time)
 * isBeforeDeadline("2025-01-01T00:00:01", deadlineTime)  // false (late)
 * 
 * // Business hours validation
 * const isBeforeBusinessHours = (
 *   datetime: DateTimeInput,
 *   openingTime: string
 * ): boolean => {
 *   const dt = toPlainDateTime(datetime)
 *   if (!dt) return false
 *   
 *   const openDateTime = dt.toPlainDate().toPlainDateTime(
 *     Temporal.PlainTime.from(openingTime)
 *   )
 *   return isBeforeDateTime(openDateTime)(datetime)
 * }
 * 
 * const requestTime = "2024-01-15T08:30:00"
 * isBeforeBusinessHours(requestTime, "09:00:00")  // true (before opening)
 * 
 * // Invalid inputs return false
 * const checker = isBeforeDateTime("2024-01-15T14:30:00")
 * 
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker("")                      // false
 * checker("invalid")               // false
 * checker("2024-01-15")            // false (date only, becomes midnight)
 * 
 * // Batch processing window validation
 * const isBeforeProcessingWindow = (
 *   datetime: DateTimeInput,
 *   windowStart: DateTimeInput,
 *   windowEnd: DateTimeInput
 * ): boolean => {
 *   return isBeforeDateTime(windowStart)(datetime)
 * }
 * 
 * const batchTime = "2024-01-15T01:30:00"
 * const windowStart = "2024-01-15T02:00:00"
 * const windowEnd = "2024-01-15T04:00:00"
 * 
 * isBeforeProcessingWindow(batchTime, windowStart, windowEnd)  // true
 * 
 * // Session start validation
 * const validateSessionStart = (
 *   startTime: DateTimeInput,
 *   maxHoursFromNow: number = 24
 * ): string | null => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const maxTime = now.add({ hours: maxHoursFromNow })
 *   
 *   if (isBeforeDateTime(now)(startTime)) {
 *     return "Session cannot start in the past"
 *   }
 *   
 *   if (!isBeforeDateTime(maxTime)(startTime)) {
 *     return `Session must start within ${maxHoursFromNow} hours`
 *   }
 *   
 *   return null
 * }
 * 
 * // Calendar-aware datetime comparisons
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
 * const gregorianDateTime = Temporal.PlainDateTime.from("2024-01-20T14:30:00")
 * const isBeforeGregorian = isBeforeDateTime(gregorianDateTime)
 * 
 * // Works across calendar systems
 * isBeforeGregorian(islamicDateTime)  // Compares correctly across calendars
 * 
 * // Finding earliest datetime
 * const findEarliestDateTime = (
 *   datetimes: Array<DateTimeInput>
 * ): DateTimeInput | null => {
 *   if (datetimes.length === 0) return null
 *   
 *   return datetimes.reduce((earliest, dt) => {
 *     return isBeforeDateTime(earliest)(dt) ? dt : earliest
 *   })
 * }
 * 
 * findEarliestDateTime([
 *   "2024-01-15T10:00:00",
 *   "2024-01-15T09:00:00",
 *   "2024-01-15T14:00:00"
 * ])
 * // "2024-01-15T09:00:00"
 * 
 * // Expiry datetime checking
 * const hasExpired = (
 *   expiryDateTime: DateTimeInput
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   return isBeforeDateTime(now)(expiryDateTime)
 * }
 * 
 * hasExpired("2023-12-31T23:59:59")  // true (if current time is after)
 * hasExpired("2025-12-31T23:59:59")  // false (if current time is before)
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Precise - Nanosecond precision for time comparisons
 * @property Exclusive - Returns false for equal datetimes
 * @property Flexible - Accepts strings, Dates, Temporal types, and datetime-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isBeforeDateTime = (
	reference: DateTimeInput | null | undefined
) => (
	datetime: DateTimeInput | null | undefined
): boolean => {
	const refDateTime = toPlainDateTime(reference)
	const compareDateTime = toPlainDateTime(datetime)
	
	if (!refDateTime || !compareDateTime) {
		return false
	}
	
	try {
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) < 0
	} catch {
		return false
	}
}

export default isBeforeDateTime