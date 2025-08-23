import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is after another datetime
 * 
 * Curried function that validates whether one datetime comes chronologically
 * after another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Compares both date and time components
 * with nanosecond precision. Returns false for equal datetimes, invalid inputs,
 * or conversion failures.
 * 
 * DateTime comparison rules:
 * - Compares date first, then time if dates are equal
 * - Strictly after: datetime must be chronologically later
 * - Equal datetimes return false (use isSameOrAfterDateTime for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Nanosecond precision for time comparisons
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is after the reference
 * @example
 * ```typescript
 * // Using ISO datetime strings
 * const isAfter230PM = isAfterDateTime("2024-01-15T14:30:00")
 * 
 * isAfter230PM("2024-01-15T15:30:00")     // true (3:30 PM is after 2:30 PM)
 * isAfter230PM("2024-01-15T13:30:00")     // false (1:30 PM is before 2:30 PM)
 * isAfter230PM("2024-01-15T14:30:00")     // false (same datetime)
 * 
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T14:30:00")
 * const isAfterJsDate = isAfterDateTime(jsDate)
 * 
 * isAfterJsDate("2024-01-15T15:30:00")  // true
 * isAfterJsDate(new Date("2024-01-15T13:30:00"))  // false
 * 
 * // Different dates
 * const jan15 = Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * const jan16 = Temporal.PlainDateTime.from("2024-01-16T10:00:00")
 * const jan14 = Temporal.PlainDateTime.from("2024-01-14T14:00:00")
 * 
 * const isAfterJan15Noon = isAfterDateTime(jan15)
 * isAfterJan15Noon(jan16)  // true (next day, even though earlier time)
 * isAfterJan15Noon(jan14)  // false (previous day, even though later time)
 * 
 * // Microsecond and nanosecond precision
 * const precise1 = Temporal.PlainDateTime.from("2024-01-15T12:00:00.000000001")
 * const precise2 = Temporal.PlainDateTime.from("2024-01-15T12:00:00.000000002")
 * 
 * const isAfterPrecise = isAfterDateTime(precise1)
 * isAfterPrecise(precise2)  // true (1 nanosecond later)
 * isAfterPrecise(precise1)  // false (exact same)
 * 
 * // Appointment scheduling
 * const validateAppointmentTime = (
 *   appointment: Temporal.PlainDateTime,
 *   earliestTime: Temporal.PlainDateTime
 * ): string | null => {
 *   if (!isAfterDateTime(earliestTime)(appointment)) {
 *     return `Appointment must be after ${earliestTime.toString()}`
 *   }
 *   return null
 * }
 * 
 * const minTime = Temporal.PlainDateTime.from("2024-01-15T09:00:00")
 * const appt = Temporal.PlainDateTime.from("2024-01-15T10:30:00")
 * 
 * validateAppointmentTime(appt, minTime)  // null (valid)
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
 * const afternoonEvents = events.filter(e => isAfterDateTime(cutoff)(e.time))
 * // [Meeting C, Meeting D]
 * 
 * // Log entry filtering
 * const getRecentLogs = (
 *   logs: Array<{ timestamp: Temporal.PlainDateTime, message: string }>,
 *   since: Temporal.PlainDateTime
 * ): Array<{ timestamp: Temporal.PlainDateTime, message: string }> => {
 *   return logs.filter(log => isAfterDateTime(since)(log.timestamp))
 * }
 * 
 * const logs = [
 *   { timestamp: Temporal.PlainDateTime.from("2024-01-15T10:00:00"), message: "Start" },
 *   { timestamp: Temporal.PlainDateTime.from("2024-01-15T10:30:00"), message: "Process" },
 *   { timestamp: Temporal.PlainDateTime.from("2024-01-15T11:00:00"), message: "Complete" }
 * ]
 * 
 * const sinceTime = Temporal.PlainDateTime.from("2024-01-15T10:15:00")
 * getRecentLogs(logs, sinceTime)
 * // [{ timestamp: "2024-01-15T10:30:00", ... }, { timestamp: "2024-01-15T11:00:00", ... }]
 * 
 * // Deadline checking with time
 * const hasDeadlinePassed = (
 *   deadline: Temporal.PlainDateTime
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   return isAfterDateTime(deadline)(now)
 * }
 * 
 * const submissionDeadline = Temporal.PlainDateTime.from("2024-12-31T23:59:59")
 * hasDeadlinePassed(submissionDeadline)  // true/false depending on current datetime
 * 
 * // Business hours validation
 * const isAfterBusinessHours = (
 *   datetime: Temporal.PlainDateTime,
 *   closingTime: Temporal.PlainTime
 * ): boolean => {
 *   const closeDateTime = datetime.toPlainDate().toPlainDateTime(closingTime)
 *   return isAfterDateTime(closeDateTime)(datetime)
 * }
 * 
 * const requestTime = Temporal.PlainDateTime.from("2024-01-15T18:30:00")
 * const businessClose = Temporal.PlainTime.from("17:00:00")
 * isAfterBusinessHours(requestTime, businessClose)  // true
 * 
 * // Batch processing windows
 * const isInProcessingWindow = (
 *   datetime: Temporal.PlainDateTime,
 *   windowStart: Temporal.PlainDateTime,
 *   windowEnd: Temporal.PlainDateTime
 * ): boolean => {
 *   return isAfterDateTime(windowStart)(datetime) && 
 *          !isAfterDateTime(windowEnd)(datetime)
 * }
 * 
 * const batchTime = Temporal.PlainDateTime.from("2024-01-15T02:30:00")
 * const windowStart = Temporal.PlainDateTime.from("2024-01-15T02:00:00")
 * const windowEnd = Temporal.PlainDateTime.from("2024-01-15T04:00:00")
 * 
 * isInProcessingWindow(batchTime, windowStart, windowEnd)  // true
 * 
 * // Session timeout checking
 * const isSessionExpired = (
 *   lastActivity: Temporal.PlainDateTime,
 *   timeoutMinutes: number
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const expiryTime = lastActivity.add({ minutes: timeoutMinutes })
 *   return isAfterDateTime(expiryTime)(now)
 * }
 * 
 * const lastActive = Temporal.PlainDateTime.from("2024-01-15T14:00:00")
 * isSessionExpired(lastActive, 30)  // depends on current time
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
 * const isAfterGregorian = isAfterDateTime(gregorianDateTime)
 * 
 * // Works across calendar systems
 * isAfterGregorian(islamicDateTime)  // Compares correctly across calendars
 * 
 * // Sorting datetimes
 * const datetimes = [
 *   Temporal.PlainDateTime.from("2024-01-15T10:00:00"),
 *   Temporal.PlainDateTime.from("2024-01-15T14:00:00"),
 *   Temporal.PlainDateTime.from("2024-01-15T09:00:00")
 * ]
 * 
 * const reference = Temporal.PlainDateTime.from("2024-01-15T11:00:00")
 * const afterReference = datetimes.filter(isAfterDateTime(reference))
 * // [PlainDateTime("2024-01-15T14:00:00")]
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Precise - Nanosecond precision for time comparisons
 * @property Exclusive - Returns false for equal datetimes
 */
const isAfterDateTime = (
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
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) > 0
	} catch {
		return false
	}
}

export default isAfterDateTime