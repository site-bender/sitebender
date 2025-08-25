import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is in the future relative to today
 *
 * Validates whether a given date is strictly after today's date in the
 * system's current time zone. Uses Temporal.Now.plainDateISO() to get
 * the current date and compares it with the input date. Accepts various
 * date formats and converts them to Temporal.PlainDate for comparison.
 * Returns false for today's date, past dates, or invalid inputs.
 *
 * Future date rules:
 * - Must be strictly after today (tomorrow or later)
 * - Today's date returns false (use isSameOrAfterDate for inclusive)
 * - Time components are ignored (date-only comparison)
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The date to check (string, Date, Temporal types, or date-like object)
 * @returns true if the date is in the future, false otherwise
 * @example
 * ```typescript
 * // Basic future date validation
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
 * const today = Temporal.Now.plainDateISO()
 *
 * isFutureDate(tomorrow)       // true
 * isFutureDate(yesterday)      // false
 * isFutureDate(today)          // false (today is not future)
 *
 * // Using ISO date strings
 * // Assuming today is 2024-01-15
 * isFutureDate("2024-01-16")   // true (tomorrow)
 * isFutureDate("2024-01-15")   // false (today)
 * isFutureDate("2024-01-14")   // false (yesterday)
 * isFutureDate("2025-01-01")   // true (next year)
 * isFutureDate("2023-12-31")   // false (last year)
 *
 * // Using Date objects
 * const futureDate = new Date()
 * futureDate.setDate(futureDate.getDate() + 7)  // 7 days from now
 *
 * isFutureDate(futureDate)     // true
 * isFutureDate(new Date())     // false (today)
 *
 * // Using date-like objects
 * const today = Temporal.Now.plainDateISO()
 * const futureObj = {
 *   year: today.year + 1,
 *   month: today.month,
 *   day: today.day
 * }
 *
 * isFutureDate(futureObj)      // true (next year)
 * isFutureDate({ year: 2023, month: 1, day: 1 })  // false (past)
 *
 * // Event scheduling validation
 * const validateEventDate = (eventDate: unknown): string | null => {
 *   if (!eventDate) {
 *     return "Event date is required"
 *   }
 *
 *   if (!isFutureDate(eventDate)) {
 *     return "Event date must be in the future"
 *   }
 *
 *   return null
 * }
 *
 * const nextWeek = Temporal.Now.plainDateISO().add({ weeks: 1 })
 * validateEventDate(nextWeek)      // null (valid)
 * validateEventDate("2024-01-01")  // "Event date must be in the future" (if past)
 *
 * // Filtering future dates
 * const dates = [
 *   "2024-01-10",
 *   "2024-12-31",
 *   "2025-06-15",
 *   "2023-01-01",
 *   Temporal.Now.plainDateISO().add({ days: 30 })
 * ]
 *
 * const futureDates = dates.filter(isFutureDate)
 * // Returns only dates after today
 *
 * // Appointment booking system
 * const getAvailableAppointments = (
 *   appointments: Array<{ date: string; time: string; available: boolean }>
 * ): Array<typeof appointments[0]> => {
 *   return appointments.filter(apt =>
 *     apt.available && isFutureDate(apt.date)
 *   )
 * }
 *
 * const appointments = [
 *   { date: "2024-01-14", time: "10:00", available: true },   // past
 *   { date: "2024-01-20", time: "14:00", available: true },   // future
 *   { date: "2024-01-25", time: "09:00", available: false },  // future but not available
 * ]
 *
 * // Returns only future available appointments
 * getAvailableAppointments(appointments)
 *
 * // Subscription renewal check
 * const needsRenewal = (expiryDate: Temporal.PlainDate): boolean => {
 *   if (isFutureDate(expiryDate)) {
 *     return false  // Still valid
 *   }
 *   return true  // Expired or expires today
 * }
 *
 * const subscription = Temporal.PlainDate.from("2024-12-31")
 * needsRenewal(subscription)  // true/false based on current date
 *
 * // Deadline tracking
 * const categorizeDeadlines = (
 *   deadlines: Array<{ name: string; date: string }>
 * ): { future: Array<any>; past: Array<any>; today: Array<any> } => {
 *   const today = Temporal.Now.plainDateISO()
 *
 *   return deadlines.reduce((acc, deadline) => {
 *     const deadlineDate = toPlainDate(deadline.date)
 *     if (!deadlineDate) return acc
 *
 *     if (isFutureDate(deadline.date)) {
 *       acc.future.push(deadline)
 *     } else if (Temporal.PlainDate.compare(deadlineDate, today) === 0) {
 *       acc.today.push(deadline)
 *     } else {
 *       acc.past.push(deadline)
 *     }
 *
 *     return acc
 *   }, { future: [], past: [], today: [] })
 * }
 *
 * // Invalid inputs
 * isFutureDate(null)               // false
 * isFutureDate(undefined)          // false
 * isFutureDate("")                 // false (empty string)
 * isFutureDate("invalid-date")     // false (invalid format)
 * isFutureDate("2024-13-01")       // false (invalid month)
 * isFutureDate("2024-02-30")       // false (invalid day)
 * isFutureDate(123)                // false (not a date type)
 * isFutureDate({})                 // false (missing date properties)
 * isFutureDate([2024, 1, 20])      // false (array not supported)
 *
 * // Promotional offers
 * const isOfferValid = (offerEndDate: string): boolean => {
 *   return isFutureDate(offerEndDate)
 * }
 *
 * isOfferValid("2024-12-31")       // true/false based on current date
 * isOfferValid("2024-01-01")       // false if past
 *
 * // Project milestone tracking
 * type Milestone = {
 *   name: string
 *   targetDate: Temporal.PlainDate
 *   completed: boolean
 * }
 *
 * const getUpcomingMilestones = (
 *   milestones: Array<Milestone>
 * ): Array<Milestone> => {
 *   return milestones.filter(m =>
 *     !m.completed && isFutureDate(m.targetDate)
 *   )
 * }
 *
 * // Calendar event validation
 * const canEditEvent = (eventDate: string): boolean => {
 *   // Can only edit future events
 *   return isFutureDate(eventDate)
 * }
 *
 * canEditEvent("2025-01-01")       // true if future
 * canEditEvent("2023-01-01")       // false (past event)
 *
 * // Time-sensitive content
 * const shouldShowContent = (
 *   publishDate: string,
 *   expiryDate: string
 * ): boolean => {
 *   const now = Temporal.Now.plainDateISO()
 *   const publish = toPlainDate(publishDate)
 *
 *   if (!publish) return false
 *
 *   // Show if publish date is not in future and expiry is in future
 *   return !isFutureDate(publishDate) && isFutureDate(expiryDate)
 * }
 *
 * shouldShowContent("2024-01-01", "2024-12-31")  // true if within range
 * shouldShowContent("2025-01-01", "2025-12-31")  // false if not yet published
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Date-only - Ignores time components
 * @property Exclusive - Returns false for today's date
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isFutureDate = (
	value: DateInput | null | undefined,
): boolean => {
	const date = toPlainDate(value)

	if (!date) {
		return false
	}

	try {
		const today = Temporal.Now.plainDateISO()
		return Temporal.PlainDate.compare(date, today) > 0
	} catch {
		return false
	}
}

export default isFutureDate
