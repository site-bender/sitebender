import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is in the past relative to the current moment
 * 
 * Validates whether a given datetime is strictly before the current datetime
 * in the system's current time zone. Uses Temporal.Now.plainDateTimeISO()
 * to get the current datetime and compares it with the input. Accepts various
 * datetime formats and converts them to Temporal.PlainDateTime for comparison.
 * Returns false for the current moment, future datetimes, or invalid inputs.
 * 
 * Past datetime rules:
 * - Must be strictly before the current moment
 * - Current datetime returns false (not considered past)
 * - Compares both date and time components
 * - Nanosecond precision comparison
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param value - The datetime to check (string, Date, Temporal types, or datetime-like object)
 * @returns true if the datetime is in the past, false otherwise
 * @example
 * ```typescript
 * // Basic past datetime validation
 * const now = Temporal.Now.plainDateTimeISO()
 * const tomorrow = now.add({ days: 1 })
 * const nextHour = now.add({ hours: 1 })
 * const lastHour = now.subtract({ hours: 1 })
 * 
 * isPastDateTime(lastHour)        // true
 * isPastDateTime(now)             // false (current moment)
 * isPastDateTime(nextHour)        // false (future)
 * isPastDateTime(tomorrow)        // false (future)
 * 
 * // Using ISO datetime strings
 * // Assuming now is 2024-01-15T14:30:00
 * isPastDateTime("2024-01-15T14:00:00")  // true (30 minutes ago)
 * isPastDateTime("2024-01-15T14:30:00")  // false (same time)
 * isPastDateTime("2024-01-15T15:00:00")  // false (30 minutes later)
 * isPastDateTime("2024-01-14T23:59:59")  // true (yesterday)
 * isPastDateTime("2024-01-16T00:00:00")  // false (tomorrow)
 * 
 * // Using Date objects (converted to local datetime)
 * const pastDate = new Date()
 * pastDate.setHours(pastDate.getHours() - 2)  // 2 hours ago
 * 
 * isPastDateTime(pastDate)       // true
 * isPastDateTime(new Date())     // false (current moment)
 * 
 * // Using datetime-like objects
 * const currentDateTime = Temporal.Now.plainDateTimeISO()
 * const pastObj = {
 *   year: currentDateTime.year,
 *   month: currentDateTime.month,
 *   day: currentDateTime.day,
 *   hour: currentDateTime.hour - 1,
 *   minute: 0,
 *   second: 0
 * }
 * 
 * isPastDateTime(pastObj)        // true (previous hour)
 * 
 * // Log entry validation
 * const validateLogTimestamp = (
 *   timestamp: unknown
 * ): string | null => {
 *   if (!timestamp) {
 *     return "Timestamp is required"
 *   }
 *   
 *   if (!isPastDateTime(timestamp)) {
 *     return "Log timestamp cannot be in the future"
 *   }
 *   
 *   const logTime = toPlainDateTime(timestamp)
 *   if (!logTime) {
 *     return "Invalid timestamp"
 *   }
 *   
 *   // Check if too old (e.g., more than 30 days)
 *   const thirtyDaysAgo = Temporal.Now.plainDateTimeISO().subtract({ days: 30 })
 *   if (Temporal.PlainDateTime.compare(logTime, thirtyDaysAgo) < 0) {
 *     return "Log entry too old"
 *   }
 *   
 *   return null
 * }
 * 
 * validateLogTimestamp("2024-01-14T10:30:00")  // null if within 30 days
 * validateLogTimestamp("2025-01-20T10:00:00")  // "Log timestamp cannot be..."
 * 
 * // Activity history filtering
 * const getRecentActivities = (
 *   activities: Array<{ 
 *     timestamp: string
 *     action: string
 *     user: string 
 *   }>
 * ): Array<typeof activities[0]> => {
 *   return activities
 *     .filter(activity => isPastDateTime(activity.timestamp))
 *     .sort((a, b) => {
 *       const aTime = toPlainDateTime(a.timestamp)
 *       const bTime = toPlainDateTime(b.timestamp)
 *       if (!aTime || !bTime) return 0
 *       return Temporal.PlainDateTime.compare(bTime, aTime)
 *     })
 * }
 * 
 * const activities = [
 *   { timestamp: "2024-01-15T08:00:00", action: "login", user: "alice" },
 *   { timestamp: "2024-01-15T18:00:00", action: "logout", user: "alice" },  // future
 *   { timestamp: "2024-01-14T12:00:00", action: "update", user: "bob" }
 * ]
 * 
 * // Returns only past activities, sorted newest first
 * getRecentActivities(activities)
 * 
 * // Meeting attendance validation
 * const markAttendance = (
 *   meetingTime: Temporal.PlainDateTime
 * ): string | null => {
 *   if (!isPastDateTime(meetingTime)) {
 *     return "Cannot mark attendance for future meetings"
 *   }
 *   
 *   const twoHoursAgo = Temporal.Now.plainDateTimeISO().subtract({ hours: 2 })
 *   if (Temporal.PlainDateTime.compare(meetingTime, twoHoursAgo) < 0) {
 *     return "Meeting attendance window has closed"
 *   }
 *   
 *   return null  // Can mark attendance
 * }
 * 
 * const meeting = Temporal.PlainDateTime.from("2024-01-15T10:00:00")
 * markAttendance(meeting)  // Depends on current time
 * 
 * // Order processing timestamps
 * const canProcessRefund = (
 *   orderDateTime: string,
 *   refundWindowDays: number = 30
 * ): boolean => {
 *   if (!isPastDateTime(orderDateTime)) {
 *     return false  // Can't refund future orders
 *   }
 *   
 *   const order = toPlainDateTime(orderDateTime)
 *   if (!order) return false
 *   
 *   const refundDeadline = order.add({ days: refundWindowDays })
 *   const now = Temporal.Now.plainDateTimeISO()
 *   
 *   return Temporal.PlainDateTime.compare(now, refundDeadline) <= 0
 * }
 * 
 * canProcessRefund("2024-01-01T10:00:00", 30)  // true/false based on current date
 * 
 * // Session timeout checking
 * const isSessionExpired = (
 *   lastActivity: Temporal.PlainDateTime,
 *   timeoutMinutes: number = 30
 * ): boolean => {
 *   if (!isPastDateTime(lastActivity)) {
 *     return false  // Future activity time is invalid
 *   }
 *   
 *   const timeout = lastActivity.add({ minutes: timeoutMinutes })
 *   const now = Temporal.Now.plainDateTimeISO()
 *   
 *   return Temporal.PlainDateTime.compare(now, timeout) > 0
 * }
 * 
 * const lastAction = Temporal.PlainDateTime.from("2024-01-15T13:00:00")
 * isSessionExpired(lastAction, 30)  // true if more than 30 minutes ago
 * 
 * // Invalid inputs
 * isPastDateTime(null)               // false
 * isPastDateTime(undefined)          // false
 * isPastDateTime("")                 // false (empty string)
 * isPastDateTime("invalid")          // false (invalid format)
 * isPastDateTime("2024-13-01T00:00:00")  // false (invalid month)
 * isPastDateTime("2024-02-30T00:00:00")  // false (invalid day)
 * isPastDateTime("2024-01-15T25:00:00")  // false (invalid hour)
 * isPastDateTime(123)                // false (not a datetime type)
 * isPastDateTime({})                 // false (missing properties)
 * 
 * // Backup verification
 * const verifyBackupTime = (
 *   backupDateTime: Temporal.PlainDateTime
 * ): string | null => {
 *   if (!isPastDateTime(backupDateTime)) {
 *     return "Invalid backup timestamp (future date)"
 *   }
 *   
 *   const oneHourAgo = Temporal.Now.plainDateTimeISO().subtract({ hours: 1 })
 *   if (Temporal.PlainDateTime.compare(backupDateTime, oneHourAgo) > 0) {
 *     return "Backup completed successfully"
 *   }
 *   
 *   return "Warning: Backup is more than 1 hour old"
 * }
 * 
 * const backupTime = Temporal.PlainDateTime.from("2024-01-15T13:00:00")
 * verifyBackupTime(backupTime)
 * 
 * // Event history tracking
 * type HistoricalEvent = {
 *   timestamp: Temporal.PlainDateTime
 *   eventType: string
 *   details: string
 * }
 * 
 * const getEventHistory = (
 *   events: Array<HistoricalEvent>,
 *   hoursBack: number = 24
 * ): Array<HistoricalEvent> => {
 *   const cutoff = Temporal.Now.plainDateTimeISO().subtract({ hours: hoursBack })
 *   
 *   return events
 *     .filter(event => 
 *       isPastDateTime(event.timestamp) &&
 *       Temporal.PlainDateTime.compare(event.timestamp, cutoff) >= 0
 *     )
 *     .sort((a, b) => 
 *       Temporal.PlainDateTime.compare(b.timestamp, a.timestamp)
 *     )
 * }
 * 
 * // Message timestamp validation
 * const validateMessageTime = (
 *   messageTime: string
 * ): boolean => {
 *   // Messages must have past timestamps
 *   return isPastDateTime(messageTime)
 * }
 * 
 * validateMessageTime("2024-01-15T12:00:00")  // true if past
 * validateMessageTime("2025-01-15T12:00:00")  // false (future)
 * 
 * // Cache invalidation
 * const shouldInvalidateCache = (
 *   cacheTime: Temporal.PlainDateTime,
 *   maxAgeMinutes: number = 60
 * ): boolean => {
 *   if (!isPastDateTime(cacheTime)) {
 *     return true  // Invalid future cache time
 *   }
 *   
 *   const expiryTime = cacheTime.add({ minutes: maxAgeMinutes })
 *   const now = Temporal.Now.plainDateTimeISO()
 *   
 *   return Temporal.PlainDateTime.compare(now, expiryTime) > 0
 * }
 * 
 * const cached = Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * shouldInvalidateCache(cached, 60)  // true if more than 60 minutes old
 * ```
 * 
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Precise - Nanosecond precision comparison
 * @property Exclusive - Returns false for current datetime
 * @property Flexible - Accepts strings, Dates, Temporal types, and datetime-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isPastDateTime = (
	value: DateTimeInput | null | undefined
): boolean => {
	const dateTime = toPlainDateTime(value)
	
	if (!dateTime) {
		return false
	}
	
	try {
		const now = Temporal.Now.plainDateTimeISO()
		return Temporal.PlainDateTime.compare(dateTime, now) < 0
	} catch {
		return false
	}
}

export default isPastDateTime