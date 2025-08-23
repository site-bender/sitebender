import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is the same as or before another datetime
 * 
 * Validates whether one datetime is chronologically the same as or before
 * another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate datetime comparisons with nanosecond precision.
 * Returns true for equal datetimes, datetimes before the reference, and false
 * for datetimes after or invalid inputs.
 * 
 * DateTime comparison rules:
 * - Same or before: datetime must be equal to or chronologically earlier
 * - Equal datetimes return true (inclusive comparison)
 * - Compares date and time components together
 * - Calendar-aware comparison (respects calendar systems)
 * - Nanosecond precision for time components
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is same or before the reference
 * @example
 * ```typescript
 * // Using ISO datetime strings
 * const isSameOrBeforeJan15Noon = isSameOrBeforeDateTime("2024-01-15T12:00:00")
 * 
 * isSameOrBeforeJan15Noon("2024-01-15T11:00:00")  // true (1 hour before)
 * isSameOrBeforeJan15Noon("2024-01-15T12:00:00")  // true (same datetime)
 * isSameOrBeforeJan15Noon("2024-01-15T13:00:00")  // false (1 hour after)
 * 
 * // Using Temporal PlainDateTime objects
 * const dt1 = Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-01-15T10:00:00")
 * 
 * const isSameOrBeforeDt1 = isSameOrBeforeDateTime(dt1)
 * isSameOrBeforeDt1(dt2)     // true
 * isSameOrBeforeDt1(dt1)     // true (same datetime)
 * 
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T12:00:00")
 * const isSameOrBeforeJsDate = isSameOrBeforeDateTime(jsDate)
 * 
 * isSameOrBeforeJsDate("2024-01-15T11:30:00")  // true
 * isSameOrBeforeJsDate("2024-01-15T12:00:00")  // true
 * isSameOrBeforeJsDate(new Date("2024-01-15T12:30:00"))  // false
 * 
 * // DateTime with milliseconds precision
 * const isSameOrBeforePrecise = isSameOrBeforeDateTime("2024-01-15T12:00:00.500")
 * 
 * isSameOrBeforePrecise("2024-01-15T12:00:00.499")  // true (1ms before)
 * isSameOrBeforePrecise("2024-01-15T12:00:00.500")  // true (same)
 * isSameOrBeforePrecise("2024-01-15T12:00:00.501")  // false (1ms after)
 * 
 * // Event deadline validation
 * const maxDateTime = Temporal.PlainDateTime.from("2024-12-31T23:59:59")
 * const isBeforeDeadline = isSameOrBeforeDateTime(maxDateTime)
 * 
 * isBeforeDeadline("2024-12-31T23:59:59")  // true (exactly at deadline)
 * isBeforeDeadline("2024-12-31T23:00:00")  // true (before deadline)
 * isBeforeDeadline("2025-01-01T00:00:00")  // false (after deadline)
 * 
 * // Appointment scheduling validation
 * const validateAppointmentTime = (
 *   requestedTime: string,
 *   latestAvailable: string
 * ): string | null => {
 *   if (!isSameOrBeforeDateTime(latestAvailable)(requestedTime)) {
 *     return "Please select a time on or before " + latestAvailable
 *   }
 *   return null
 * }
 * 
 * validateAppointmentTime("2024-01-15T14:00:00", "2024-01-15T17:00:00")  // null
 * validateAppointmentTime("2024-01-15T17:00:00", "2024-01-15T17:00:00")  // null
 * validateAppointmentTime("2024-01-15T18:00:00", "2024-01-15T17:00:00")  // error
 * 
 * // Filter past events
 * const events = [
 *   "2024-01-15T09:00:00",
 *   "2024-01-15T12:00:00",
 *   "2024-01-15T15:00:00",
 *   "2024-01-15T18:00:00",
 *   "2024-01-15T21:00:00"
 * ]
 * 
 * const cutoffDateTime = "2024-01-15T15:00:00"
 * const pastEvents = events.filter(isSameOrBeforeDateTime(cutoffDateTime))
 * // ["2024-01-15T09:00:00", "2024-01-15T12:00:00", "2024-01-15T15:00:00"]
 * 
 * // Transaction timestamp validation
 * const isHistoricalTransaction = (
 *   timestamp: Temporal.PlainDateTime
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   return isSameOrBeforeDateTime(now)(timestamp)
 * }
 * 
 * const txTime = Temporal.PlainDateTime.from("2024-01-15T10:30:45")
 * isHistoricalTransaction(txTime)  // true if current time is after
 * 
 * // Auction end time checking
 * const isAuctionClosed = (
 *   currentTime: string,
 *   auctionEndTime: string
 * ): boolean => {
 *   // Auction is closed if current time is NOT same-or-before end time
 *   return !isSameOrBeforeDateTime(auctionEndTime)(currentTime)
 * }
 * 
 * isAuctionClosed("2024-01-15T14:59:59", "2024-01-15T15:00:00")  // false
 * isAuctionClosed("2024-01-15T15:00:00", "2024-01-15T15:00:00")  // false
 * isAuctionClosed("2024-01-15T15:00:01", "2024-01-15T15:00:00")  // true
 * 
 * // Meeting conflict detection
 * const hasConflict = (
 *   meeting1Start: string,
 *   meeting1End: string,
 *   meeting2Start: string
 * ): boolean => {
 *   // Conflict if meeting2 starts before meeting1 ends
 *   return isSameOrBeforeDateTime(meeting1End)(meeting2Start) &&
 *          !isSameOrBeforeDateTime(meeting1Start)(meeting2Start)
 * }
 * 
 * hasConflict(
 *   "2024-01-15T10:00:00",
 *   "2024-01-15T11:00:00",
 *   "2024-01-15T10:30:00"
 * )  // true (overlaps)
 * 
 * // Log entry validation
 * const validateLogTimestamp = (
 *   logTime: string,
 *   systemStartTime: string
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const startDt = toPlainDateTime(systemStartTime)
 *   
 *   if (!startDt) return false
 *   
 *   // Log must be after system start and before current time
 *   return !isSameOrBeforeDateTime(startDt.subtract({ seconds: 1 }))(logTime) &&
 *          isSameOrBeforeDateTime(now)(logTime)
 * }
 * 
 * // Batch processing cutoff
 * const shouldProcessInBatch = (
 *   recordTimestamp: string,
 *   batchCutoffTime: string
 * ): boolean => {
 *   return isSameOrBeforeDateTime(batchCutoffTime)(recordTimestamp)
 * }
 * 
 * shouldProcessInBatch("2024-01-15T14:59:59", "2024-01-15T15:00:00")  // true
 * shouldProcessInBatch("2024-01-15T15:00:01", "2024-01-15T15:00:00")  // false
 * 
 * // Invalid inputs return false
 * const checker = isSameOrBeforeDateTime("2024-01-15T12:00:00")
 * 
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker("")                      // false (empty string)
 * checker("invalid-datetime")      // false (invalid format)
 * checker("2024-13-01T12:00:00")   // false (invalid month)
 * checker("2024-01-15T25:00:00")   // false (invalid hour)
 * checker("2024-01-15T12:60:00")   // false (invalid minute)
 * checker(123)                     // false (not a datetime type)
 * checker({})                      // false (missing properties)
 * checker([2024, 1, 15, 12, 0])   // false (array not supported)
 * 
 * // Content embargo system
 * const isContentAvailable = (
 *   currentTime: string,
 *   embargoUntil: string
 * ): boolean => {
 *   // Content available if embargo time has passed
 *   return !isSameOrBeforeDateTime(embargoUntil)(currentTime)
 * }
 * 
 * isContentAvailable("2024-01-15T11:59:59", "2024-01-15T12:00:00")  // false
 * isContentAvailable("2024-01-15T12:00:00", "2024-01-15T12:00:00")  // false
 * isContentAvailable("2024-01-15T12:00:01", "2024-01-15T12:00:00")  // true
 * 
 * // Shift scheduling validation
 * const canScheduleShift = (
 *   shiftStart: string,
 *   shiftEnd: string,
 *   maxScheduleDateTime: string
 * ): boolean => {
 *   return isSameOrBeforeDateTime(maxScheduleDateTime)(shiftStart) &&
 *          isSameOrBeforeDateTime(maxScheduleDateTime)(shiftEnd)
 * }
 * 
 * canScheduleShift(
 *   "2024-01-15T08:00:00",
 *   "2024-01-15T16:00:00",
 *   "2024-01-15T23:59:59"
 * )  // true
 * 
 * // Backup retention policy
 * const shouldKeepBackup = (
 *   backupTimestamp: string,
 *   retentionDays: number
 * ): boolean => {
 *   const cutoffDate = Temporal.Now.plainDateTimeISO()
 *     .subtract({ days: retentionDays })
 *   
 *   // Keep if backup is NOT same-or-before cutoff (i.e., it's newer)
 *   return !isSameOrBeforeDateTime(cutoffDate)(backupTimestamp)
 * }
 * 
 * shouldKeepBackup("2024-01-10T12:00:00", 7)  // depends on current date
 * 
 * // Session timeout validation
 * const isSessionValid = (
 *   lastActivityTime: string,
 *   timeoutMinutes: number
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const sessionExpiry = toPlainDateTime(lastActivityTime)
 *     ?.add({ minutes: timeoutMinutes })
 *   
 *   if (!sessionExpiry) return false
 *   
 *   // Session valid if current time is same-or-before expiry
 *   return isSameOrBeforeDateTime(sessionExpiry)(now.toString())
 * }
 * 
 * isSessionValid("2024-01-15T12:00:00", 30)  // depends on current time
 * 
 * // Rate limiting check
 * const canMakeRequest = (
 *   lastRequestTime: string,
 *   cooldownSeconds: number
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const earliestNextRequest = toPlainDateTime(lastRequestTime)
 *     ?.add({ seconds: cooldownSeconds })
 *   
 *   if (!earliestNextRequest) return true
 *   
 *   // Can make request if earliest time is same-or-before now
 *   return isSameOrBeforeDateTime(now)(earliestNextRequest.toString())
 * }
 * 
 * canMakeRequest("2024-01-15T12:00:00", 60)  // depends on current time
 * 
 * // Tournament round cutoff
 * const isRegistrationOpen = (
 *   currentTime: string,
 *   registrationCloseTime: string
 * ): boolean => {
 *   return isSameOrBeforeDateTime(registrationCloseTime)(currentTime)
 * }
 * 
 * isRegistrationOpen("2024-01-15T11:59:59", "2024-01-15T12:00:00")  // true
 * isRegistrationOpen("2024-01-15T12:00:00", "2024-01-15T12:00:00")  // true
 * isRegistrationOpen("2024-01-15T12:00:01", "2024-01-15T12:00:00")  // false
 * 
 * // Cache invalidation
 * const isCacheValid = (
 *   cacheTimestamp: string,
 *   ttlSeconds: number
 * ): boolean => {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const expiryTime = toPlainDateTime(cacheTimestamp)
 *     ?.add({ seconds: ttlSeconds })
 *   
 *   if (!expiryTime) return false
 *   
 *   // Cache valid if current time is same-or-before expiry
 *   return isSameOrBeforeDateTime(expiryTime)(now.toString())
 * }
 * 
 * isCacheValid("2024-01-15T12:00:00", 3600)  // valid for 1 hour
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Precise - Nanosecond precision for time components
 * @property Inclusive - Returns true for equal datetimes
 * @property Flexible - Accepts strings, Dates, Temporal types, and datetime-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isSameOrBeforeDateTime = (
	reference: DateTimeInput | null | undefined
) => (
	dateTime: DateTimeInput | null | undefined
): boolean => {
	const refDateTime = toPlainDateTime(reference)
	const compareDateTime = toPlainDateTime(dateTime)
	
	if (!refDateTime || !compareDateTime) {
		return false
	}
	
	try {
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeDateTime