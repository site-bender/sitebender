import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is the same as or after another datetime
 *
 * Validates whether one datetime is chronologically the same as or after
 * another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate datetime comparisons with nanosecond precision.
 * Returns true for equal datetimes, datetimes after the reference, and false
 * for datetimes before or invalid inputs.
 *
 * DateTime comparison rules:
 * - Same or after: datetime must be equal to or chronologically later
 * - Equal datetimes return true (inclusive comparison)
 * - Compares both date and time components
 * - Nanosecond precision comparison
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is same or after the reference
 * @example
 * ```typescript
 * // Using ISO datetime strings
 * const isSameOrAfterNoon = isSameOrAfterDateTime("2024-01-15T12:00:00")
 *
 * isSameOrAfterNoon("2024-01-15T14:30:00")  // true (2:30 PM is after noon)
 * isSameOrAfterNoon("2024-01-15T12:00:00")  // true (same time)
 * isSameOrAfterNoon("2024-01-15T09:00:00")  // false (9 AM is before noon)
 *
 * // Using Temporal PlainDateTime objects
 * const datetime1 = Temporal.PlainDateTime.from("2024-01-15T10:00:00")
 * const datetime2 = Temporal.PlainDateTime.from("2024-01-15T14:00:00")
 *
 * const isSameOrAfterDateTime1 = isSameOrAfterDateTime(datetime1)
 * isSameOrAfterDateTime1(datetime2)     // true
 * isSameOrAfterDateTime1(datetime1)     // true (same datetime)
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T10:00:00")
 * const isSameOrAfterJsDate = isSameOrAfterDateTime(jsDate)
 *
 * isSameOrAfterJsDate("2024-01-15T15:00:00")  // true
 * isSameOrAfterJsDate("2024-01-15T10:00:00")  // true
 * isSameOrAfterJsDate(new Date("2024-01-15T08:00:00"))  // false
 *
 * // Datetime-like objects
 * const isSameOrAfterCustom = isSameOrAfterDateTime({
 *   year: 2024, month: 1, day: 15,
 *   hour: 10, minute: 0, second: 0
 * })
 *
 * isSameOrAfterCustom({
 *   year: 2024, month: 1, day: 15,
 *   hour: 15, minute: 30, second: 0
 * })  // true
 *
 * // Appointment scheduling validation
 * const validateAppointmentTime = (
 *   appointmentTime: string,
 *   earliestAvailable: string
 * ): string | null => {
 *   if (!isSameOrAfterDateTime(earliestAvailable)(appointmentTime)) {
 *     return "Appointment must be scheduled at or after the earliest available time"
 *   }
 *   return null
 * }
 *
 * validateAppointmentTime("2024-01-15T14:00:00", "2024-01-15T09:00:00")  // null (valid)
 * validateAppointmentTime("2024-01-15T08:00:00", "2024-01-15T09:00:00")  // "Appointment must be..."
 *
 * // Filter events from a specific datetime
 * const events = [
 *   { time: "2024-01-15T08:00:00", name: "Morning Meeting" },
 *   { time: "2024-01-15T12:00:00", name: "Lunch" },
 *   { time: "2024-01-15T14:00:00", name: "Afternoon Workshop" },
 *   { time: "2024-01-15T18:00:00", name: "Evening Event" }
 * ]
 *
 * const fromNoon = events.filter(e =>
 *   isSameOrAfterDateTime("2024-01-15T12:00:00")(e.time)
 * )
 * // Returns Lunch, Afternoon Workshop, and Evening Event
 *
 * // Shift scheduling
 * const canWorkShift = (
 *   shiftStart: Temporal.PlainDateTime,
 *   minimumRestEnd: Temporal.PlainDateTime
 * ): boolean => {
 *   // Can work if shift starts at or after minimum rest period ends
 *   return isSameOrAfterDateTime(minimumRestEnd)(shiftStart)
 * }
 *
 * const nextShift = Temporal.PlainDateTime.from("2024-01-16T08:00:00")
 * const restEnds = Temporal.PlainDateTime.from("2024-01-16T06:00:00")
 * canWorkShift(nextShift, restEnds)  // true
 *
 * // Deadline compliance
 * const isSubmissionOnTime = (
 *   submissionTime: string,
 *   deadline: string
 * ): boolean => {
 *   // On time if submission is NOT same-or-after deadline+1 second
 *   const deadlineTime = toPlainDateTime(deadline)
 *   if (!deadlineTime) return false
 *
 *   const afterDeadline = deadlineTime.add({ seconds: 1 })
 *   return !isSameOrAfterDateTime(afterDeadline.toString())(submissionTime)
 * }
 *
 * isSubmissionOnTime("2024-01-15T23:59:59", "2024-01-15T23:59:59")  // true (on deadline)
 * isSubmissionOnTime("2024-01-15T23:59:58", "2024-01-15T23:59:59")  // true (before)
 * isSubmissionOnTime("2024-01-16T00:00:00", "2024-01-15T23:59:59")  // false (late)
 *
 * // Processing window validation
 * const isInProcessingWindow = (
 *   timestamp: Temporal.PlainDateTime,
 *   windowStart: Temporal.PlainDateTime,
 *   windowEnd: Temporal.PlainDateTime
 * ): boolean => {
 *   return isSameOrAfterDateTime(windowStart)(timestamp) &&
 *          !isSameOrAfterDateTime(windowEnd.add({ nanoseconds: 1 }))(timestamp)
 * }
 *
 * const processTime = Temporal.PlainDateTime.from("2024-01-15T10:30:00")
 * const windowStart = Temporal.PlainDateTime.from("2024-01-15T09:00:00")
 * const windowEnd = Temporal.PlainDateTime.from("2024-01-15T17:00:00")
 *
 * isInProcessingWindow(processTime, windowStart, windowEnd)  // true
 *
 * // Log entry ordering
 * const getLogsFromTime = (
 *   logs: Array<{ timestamp: string; message: string }>,
 *   fromTime: string
 * ): Array<typeof logs[0]> => {
 *   return logs
 *     .filter(log => isSameOrAfterDateTime(fromTime)(log.timestamp))
 *     .sort((a, b) => {
 *       const timeA = toPlainDateTime(a.timestamp)
 *       const timeB = toPlainDateTime(b.timestamp)
 *       if (!timeA || !timeB) return 0
 *       return Temporal.PlainDateTime.compare(timeA, timeB)
 *     })
 * }
 *
 * const logs = [
 *   { timestamp: "2024-01-15T09:00:00", message: "System started" },
 *   { timestamp: "2024-01-15T10:30:00", message: "User login" },
 *   { timestamp: "2024-01-15T12:00:00", message: "Backup completed" },
 *   { timestamp: "2024-01-15T15:00:00", message: "User logout" }
 * ]
 *
 * getLogsFromTime(logs, "2024-01-15T10:30:00")
 * // Returns User login, Backup completed, and User logout
 *
 * // Invalid inputs return false
 * const checker = isSameOrAfterDateTime("2024-01-15T12:00:00")
 *
 * checker(null)                   // false
 * checker(undefined)              // false
 * checker("")                     // false (empty string)
 * checker("invalid-datetime")     // false (invalid format)
 * checker("2024-13-01T00:00:00")  // false (invalid month)
 * checker("2024-01-15T25:00:00")  // false (invalid hour)
 * checker(123)                    // false (not a datetime type)
 * checker({})                     // false (missing properties)
 *
 * // Access control based on time
 * const hasAccess = (
 *   currentTime: Temporal.PlainDateTime,
 *   accessStartTime: Temporal.PlainDateTime,
 *   accessEndTime: Temporal.PlainDateTime
 * ): boolean => {
 *   return isSameOrAfterDateTime(accessStartTime)(currentTime) &&
 *          !isSameOrAfterDateTime(accessEndTime)(currentTime)
 * }
 *
 * const now = Temporal.Now.plainDateTimeISO()
 * const accessStart = now.with({ hour: 9, minute: 0, second: 0 })
 * const accessEnd = now.with({ hour: 17, minute: 0, second: 0 })
 *
 * hasAccess(now, accessStart, accessEnd)  // Depends on current time
 *
 * // Meeting conflict detection
 * const hasConflict = (
 *   meeting1End: string,
 *   meeting2Start: string
 * ): boolean => {
 *   // Conflict if meeting1 ends at or after meeting2 starts
 *   return isSameOrAfterDateTime(meeting2Start)(meeting1End)
 * }
 *
 * hasConflict("2024-01-15T10:30:00", "2024-01-15T10:30:00")  // true (exact overlap)
 * hasConflict("2024-01-15T10:31:00", "2024-01-15T10:30:00")  // true (overlap)
 * hasConflict("2024-01-15T10:29:00", "2024-01-15T10:30:00")  // false (no overlap)
 *
 * // Service availability
 * const isServiceAvailable = (
 *   requestTime: string
 * ): boolean => {
 *   const serviceStart = "2024-01-01T00:00:00"
 *   const now = Temporal.Now.plainDateTimeISO().toString()
 *
 *   // Service available if request is between service start and now
 *   return isSameOrAfterDateTime(serviceStart)(requestTime) &&
 *          !isSameOrAfterDateTime(now)(requestTime)
 * }
 *
 * // Batch job scheduling
 * const getReadyJobs = (
 *   jobs: Array<{
 *     id: string
 *     scheduledTime: Temporal.PlainDateTime
 *     status: string
 *   }>
 * ): Array<typeof jobs[0]> => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *
 *   return jobs.filter(job =>
 *     job.status === "pending" &&
 *     isSameOrAfterDateTime(job.scheduledTime)(now)
 *   )
 * }
 *
 * // Transaction timestamp validation
 * const isValidTransactionTime = (
 *   transactionTime: string,
 *   accountOpenTime: string
 * ): boolean => {
 *   // Transaction must be at or after account opening
 *   return isSameOrAfterDateTime(accountOpenTime)(transactionTime)
 * }
 *
 * isValidTransactionTime("2024-01-15T10:00:00", "2024-01-01T09:00:00")  // true
 * isValidTransactionTime("2023-12-31T10:00:00", "2024-01-01T09:00:00")  // false
 *
 * // Content embargo
 * const isContentReleased = (
 *   embargoUntil: Temporal.PlainDateTime
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   return isSameOrAfterDateTime(embargoUntil)(now)
 * }
 *
 * const embargoTime = Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * isContentReleased(embargoTime)  // true if current time is at or after embargo
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isSameOrAfterDateTime = (
	reference: DateTimeInput | null | undefined,
) =>
(
	dateTime: DateTimeInput | null | undefined,
): boolean => {
	const refDateTime = toPlainDateTime(reference)
	const compareDateTime = toPlainDateTime(dateTime)

	if (!refDateTime || !compareDateTime) {
		return false
	}

	try {
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterDateTime
