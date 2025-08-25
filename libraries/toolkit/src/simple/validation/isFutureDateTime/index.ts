import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is in the future relative to the current moment
 *
 * Validates whether a given datetime is strictly after the current datetime
 * in the system's current time zone. Uses Temporal.Now.plainDateTimeISO()
 * to get the current datetime and compares it with the input. Accepts various
 * datetime formats and converts them to Temporal.PlainDateTime for comparison.
 * Returns false for the current moment, past datetimes, or invalid inputs.
 *
 * Future datetime rules:
 * - Must be strictly after the current moment
 * - Current datetime returns false (not considered future)
 * - Compares both date and time components
 * - Nanosecond precision comparison
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The datetime to check (string, Date, Temporal types, or datetime-like object)
 * @returns true if the datetime is in the future, false otherwise
 * @example
 * ```typescript
 * // Basic future datetime validation
 * const now = Temporal.Now.plainDateTimeISO()
 * const tomorrow = now.add({ days: 1 })
 * const nextHour = now.add({ hours: 1 })
 * const lastHour = now.subtract({ hours: 1 })
 *
 * isFutureDateTime(tomorrow)      // true
 * isFutureDateTime(nextHour)      // true
 * isFutureDateTime(lastHour)      // false
 * isFutureDateTime(now)           // false (current moment)
 *
 * // Using ISO datetime strings
 * // Assuming now is 2024-01-15T14:30:00
 * isFutureDateTime("2024-01-15T15:00:00")  // true (30 minutes later)
 * isFutureDateTime("2024-01-15T14:30:00")  // false (same time)
 * isFutureDateTime("2024-01-15T14:00:00")  // false (30 minutes ago)
 * isFutureDateTime("2024-01-16T00:00:00")  // true (tomorrow)
 * isFutureDateTime("2024-01-14T23:59:59")  // false (yesterday)
 *
 * // Using Date objects (converted to local datetime)
 * const futureDate = new Date()
 * futureDate.setHours(futureDate.getHours() + 2)  // 2 hours from now
 *
 * isFutureDateTime(futureDate)    // true
 * isFutureDateTime(new Date())    // false (current moment)
 *
 * // Using datetime-like objects
 * const currentDateTime = Temporal.Now.plainDateTimeISO()
 * const futureObj = {
 *   year: currentDateTime.year,
 *   month: currentDateTime.month,
 *   day: currentDateTime.day,
 *   hour: currentDateTime.hour + 1,
 *   minute: 0,
 *   second: 0
 * }
 *
 * isFutureDateTime(futureObj)     // true (next hour)
 *
 * // Meeting scheduling validation
 * const validateMeetingTime = (
 *   meetingDateTime: unknown
 * ): string | null => {
 *   if (!meetingDateTime) {
 *     return "Meeting time is required"
 *   }
 *
 *   if (!isFutureDateTime(meetingDateTime)) {
 *     return "Meeting must be scheduled in the future"
 *   }
 *
 *   const meeting = toPlainDateTime(meetingDateTime)
 *   if (!meeting) {
 *     return "Invalid meeting time"
 *   }
 *
 *   // Check if within business hours (9 AM - 5 PM)
 *   if (meeting.hour < 9 || meeting.hour >= 17) {
 *     return "Meeting must be during business hours (9 AM - 5 PM)"
 *   }
 *
 *   return null
 * }
 *
 * validateMeetingTime("2024-01-20T10:30:00")  // null if future
 * validateMeetingTime("2024-01-20T18:00:00")  // "Meeting must be during..."
 * validateMeetingTime("2023-01-01T10:00:00")  // "Meeting must be scheduled..."
 *
 * // Flight departure times
 * const getUpcomingFlights = (
 *   flights: Array<{
 *     flightNumber: string
 *     departure: string
 *     destination: string
 *   }>
 * ): Array<typeof flights[0]> => {
 *   return flights.filter(flight =>
 *     isFutureDateTime(flight.departure)
 *   )
 * }
 *
 * const flights = [
 *   { flightNumber: "AA101", departure: "2024-01-15T08:00:00", destination: "NYC" },
 *   { flightNumber: "AA102", departure: "2024-01-15T18:00:00", destination: "LAX" },
 *   { flightNumber: "AA103", departure: "2024-01-14T12:00:00", destination: "CHI" }
 * ]
 *
 * // Returns only future flights
 * getUpcomingFlights(flights)
 *
 * // Reminder system
 * const shouldSendReminder = (
 *   reminderTime: Temporal.PlainDateTime
 * ): boolean => {
 *   // Send reminder if it's still in the future
 *   return isFutureDateTime(reminderTime)
 * }
 *
 * const reminder = Temporal.PlainDateTime.from("2024-01-20T09:00:00")
 * shouldSendReminder(reminder)  // true/false based on current time
 *
 * // Event countdown
 * const getTimeUntilEvent = (
 *   eventDateTime: string
 * ): Temporal.Duration | null => {
 *   if (!isFutureDateTime(eventDateTime)) {
 *     return null  // Event has passed
 *   }
 *
 *   const event = toPlainDateTime(eventDateTime)
 *   const now = Temporal.Now.plainDateTimeISO()
 *
 *   if (!event) return null
 *
 *   return now.until(event)
 * }
 *
 * const eventTime = "2024-12-31T23:59:59"
 * const timeLeft = getTimeUntilEvent(eventTime)
 * // Returns Duration or null if past
 *
 * // Booking cutoff times
 * const canBookService = (
 *   serviceDateTime: string,
 *   minimumAdvanceHours: number = 24
 * ): boolean => {
 *   if (!isFutureDateTime(serviceDateTime)) {
 *     return false
 *   }
 *
 *   const service = toPlainDateTime(serviceDateTime)
 *   if (!service) return false
 *
 *   const cutoff = Temporal.Now.plainDateTimeISO().add({
 *     hours: minimumAdvanceHours
 *   })
 *
 *   return Temporal.PlainDateTime.compare(service, cutoff) >= 0
 * }
 *
 * canBookService("2024-01-20T10:00:00", 24)  // true if > 24 hours away
 * canBookService("2024-01-15T16:00:00", 2)   // true if > 2 hours away
 *
 * // Invalid inputs
 * isFutureDateTime(null)              // false
 * isFutureDateTime(undefined)         // false
 * isFutureDateTime("")                // false (empty string)
 * isFutureDateTime("invalid")         // false (invalid format)
 * isFutureDateTime("2024-13-01T00:00:00")  // false (invalid month)
 * isFutureDateTime("2024-02-30T00:00:00")  // false (invalid day)
 * isFutureDateTime("2024-01-15T25:00:00")  // false (invalid hour)
 * isFutureDateTime(123)               // false (not a datetime type)
 * isFutureDateTime({})                // false (missing properties)
 *
 * // Auction end times
 * const isAuctionActive = (
 *   auctionEndTime: Temporal.PlainDateTime
 * ): boolean => {
 *   return isFutureDateTime(auctionEndTime)
 * }
 *
 * const auctionEnd = Temporal.PlainDateTime.from("2024-01-20T18:00:00")
 * isAuctionActive(auctionEnd)  // true/false based on current time
 *
 * // Task deadlines with time
 * type Task = {
 *   name: string
 *   deadline: Temporal.PlainDateTime
 *   priority: "high" | "medium" | "low"
 * }
 *
 * const getActiveTasks = (tasks: Array<Task>): Array<Task> => {
 *   return tasks
 *     .filter(task => isFutureDateTime(task.deadline))
 *     .sort((a, b) => Temporal.PlainDateTime.compare(a.deadline, b.deadline))
 * }
 *
 * // Scheduled maintenance windows
 * const isMaintenanceUpcoming = (
 *   maintenanceStart: string,
 *   maintenanceEnd: string
 * ): boolean => {
 *   return isFutureDateTime(maintenanceStart) &&
 *          isFutureDateTime(maintenanceEnd)
 * }
 *
 * isMaintenanceUpcoming(
 *   "2024-01-20T02:00:00",
 *   "2024-01-20T04:00:00"
 * )  // true if both times are in future
 *
 * // Live stream scheduling
 * const canScheduleStream = (
 *   streamDateTime: Temporal.PlainDateTime,
 *   minimumSetupMinutes: number = 30
 * ): boolean => {
 *   if (!isFutureDateTime(streamDateTime)) {
 *     return false
 *   }
 *
 *   const setupTime = Temporal.Now.plainDateTimeISO().add({
 *     minutes: minimumSetupMinutes
 *   })
 *
 *   return Temporal.PlainDateTime.compare(streamDateTime, setupTime) >= 0
 * }
 *
 * const streamTime = Temporal.PlainDateTime.from("2024-01-15T20:00:00")
 * canScheduleStream(streamTime, 30)  // true if > 30 minutes away
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Precise - Nanosecond precision comparison
 * @property Exclusive - Returns false for current datetime
 * @property Flexible - Accepts strings, Dates, Temporal types, and datetime-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isFutureDateTime = (
	value: DateTimeInput | null | undefined,
): boolean => {
	const dateTime = toPlainDateTime(value)

	if (!dateTime) {
		return false
	}

	try {
		const now = Temporal.Now.plainDateTimeISO()
		return Temporal.PlainDateTime.compare(dateTime, now) > 0
	} catch {
		return false
	}
}

export default isFutureDateTime
