import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date represents today
 * 
 * Validates whether a given date matches today's date in the ISO calendar.
 * Accepts various date formats and converts them to Temporal.PlainDate for
 * accurate comparison. Uses the system's current date for comparison.
 * Returns true only if the date represents today, false for any other date
 * or invalid input.
 * 
 * Date comparison rules:
 * - Compares only the date portion (year, month, day)
 * - Time components are ignored if present
 * - Uses ISO calendar for comparison
 * - Today is determined by system timezone
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param date - The date to check (string, Date, Temporal types, or date-like object)
 * @returns True if the date is today, false otherwise
 * @example
 * ```typescript
 * // Assuming today is 2024-01-15
 * 
 * // Using ISO date strings
 * isToday("2024-01-15")         // true
 * isToday("2024-01-15T10:30:00") // true (time ignored)
 * isToday("2024-01-14")         // false (yesterday)
 * isToday("2024-01-16")         // false (tomorrow)
 * 
 * // Using Temporal PlainDate objects
 * const today = Temporal.Now.plainDateISO()
 * const yesterday = today.subtract({ days: 1 })
 * const tomorrow = today.add({ days: 1 })
 * 
 * isToday(today)      // true
 * isToday(yesterday)  // false
 * isToday(tomorrow)   // false
 * 
 * // Using JavaScript Date objects
 * const now = new Date()
 * const past = new Date("2024-01-14")
 * 
 * isToday(now)   // true
 * isToday(past)  // false
 * 
 * // Using date-like objects
 * const todayObj = {
 *   year: today.year,
 *   month: today.month,
 *   day: today.day
 * }
 * 
 * isToday(todayObj)  // true
 * isToday({ year: 2024, month: 1, day: 14 })  // false
 * 
 * // Task management
 * interface Task {
 *   title: string
 *   dueDate: string
 *   priority: string
 * }
 * 
 * function getTodaysTasks(tasks: Array<Task>): Array<Task> {
 *   return tasks.filter(task => isToday(task.dueDate))
 * }
 * 
 * const tasks = [
 *   { title: "Review code", dueDate: "2024-01-15", priority: "high" },
 *   { title: "Write tests", dueDate: "2024-01-16", priority: "medium" },
 *   { title: "Deploy app", dueDate: "2024-01-15", priority: "high" }
 * ]
 * 
 * getTodaysTasks(tasks)  // Returns tasks due today
 * 
 * // Calendar event highlighting
 * function getEventStatus(eventDate: string): string {
 *   if (isToday(eventDate)) {
 *     return "today"
 *   }
 *   
 *   const date = toPlainDate(eventDate)
 *   const today = Temporal.Now.plainDateISO()
 *   
 *   if (date && Temporal.PlainDate.compare(date, today) < 0) {
 *     return "past"
 *   }
 *   
 *   return "future"
 * }
 * 
 * getEventStatus("2024-01-15")  // "today"
 * getEventStatus("2024-01-14")  // "past"
 * getEventStatus("2024-01-16")  // "future"
 * 
 * // Daily report generation
 * interface SalesRecord {
 *   date: string
 *   amount: number
 *   product: string
 * }
 * 
 * function getTodaysSales(records: Array<SalesRecord>): {
 *   total: number
 *   count: number
 *   records: Array<SalesRecord>
 * } {
 *   const todaysRecords = records.filter(record => isToday(record.date))
 *   
 *   return {
 *     total: todaysRecords.reduce((sum, r) => sum + r.amount, 0),
 *     count: todaysRecords.length,
 *     records: todaysRecords
 *   }
 * }
 * 
 * // Birthday reminder
 * interface Person {
 *   name: string
 *   birthDate: string
 * }
 * 
 * function getBirthdaysToday(people: Array<Person>): Array<string> {
 *   const today = Temporal.Now.plainDateISO()
 *   
 *   return people
 *     .filter(person => {
 *       const birth = toPlainDate(person.birthDate)
 *       if (!birth) return false
 *       
 *       // Check if month and day match (ignore year)
 *       return birth.month === today.month && birth.day === today.day
 *     })
 *     .map(person => person.name)
 * }
 * 
 * // Deadline tracking
 * function isDeadlineToday(deadline: string): boolean {
 *   return isToday(deadline)
 * }
 * 
 * function getDeadlineMessage(deadline: string): string {
 *   if (isToday(deadline)) {
 *     return "⚠️ Due today!"
 *   }
 *   
 *   const date = toPlainDate(deadline)
 *   const today = Temporal.Now.plainDateISO()
 *   
 *   if (date && Temporal.PlainDate.compare(date, today) < 0) {
 *     return "❌ Overdue"
 *   }
 *   
 *   if (date) {
 *     const daysUntil = date.since(today).days
 *     return `📅 ${daysUntil} days remaining`
 *   }
 *   
 *   return "Invalid deadline"
 * }
 * 
 * // Appointment scheduling
 * interface Appointment {
 *   patientName: string
 *   dateTime: string
 *   duration: number
 * }
 * 
 * function getTodaysAppointments(
 *   appointments: Array<Appointment>
 * ): Array<Appointment> {
 *   return appointments
 *     .filter(apt => isToday(apt.dateTime))
 *     .sort((a, b) => {
 *       const timeA = toPlainDate(a.dateTime)
 *       const timeB = toPlainDate(b.dateTime)
 *       if (!timeA || !timeB) return 0
 *       return Temporal.PlainDate.compare(timeA, timeB)
 *     })
 * }
 * 
 * // Subscription renewal
 * function needsRenewalToday(expiryDate: string): boolean {
 *   return isToday(expiryDate)
 * }
 * 
 * interface Subscription {
 *   userId: string
 *   expiryDate: string
 *   plan: string
 * }
 * 
 * function getExpiringToday(
 *   subscriptions: Array<Subscription>
 * ): Array<Subscription> {
 *   return subscriptions.filter(sub => isToday(sub.expiryDate))
 * }
 * 
 * // News article filtering
 * interface Article {
 *   title: string
 *   publishedDate: string
 *   category: string
 * }
 * 
 * function getTodaysNews(articles: Array<Article>): Array<Article> {
 *   return articles.filter(article => isToday(article.publishedDate))
 * }
 * 
 * // Invalid inputs return false
 * isToday(null)              // false
 * isToday(undefined)         // false
 * isToday("")                // false (empty string)
 * isToday("invalid-date")    // false (invalid format)
 * isToday("2024-13-01")      // false (invalid month)
 * isToday("2024-02-30")      // false (invalid day)
 * isToday(123)               // false (not a date type)
 * isToday({})                // false (missing date properties)
 * isToday([2024, 1, 15])     // false (array not supported)
 * 
 * // Daily activity log
 * interface ActivityLog {
 *   timestamp: string
 *   action: string
 *   user: string
 * }
 * 
 * function getTodaysActivity(logs: Array<ActivityLog>): {
 *   count: number
 *   users: Set<string>
 *   actions: Array<string>
 * } {
 *   const todaysLogs = logs.filter(log => isToday(log.timestamp))
 *   
 *   return {
 *     count: todaysLogs.length,
 *     users: new Set(todaysLogs.map(log => log.user)),
 *     actions: todaysLogs.map(log => log.action)
 *   }
 * }
 * 
 * // Habit tracking
 * interface HabitEntry {
 *   date: string
 *   completed: boolean
 *   notes?: string
 * }
 * 
 * function isHabitCompletedToday(
 *   entries: Array<HabitEntry>
 * ): boolean {
 *   return entries.some(entry => 
 *     isToday(entry.date) && entry.completed
 *   )
 * }
 * 
 * // Time-sensitive promotions
 * interface Promotion {
 *   code: string
 *   validDate: string
 *   discount: number
 * }
 * 
 * function getTodaysPromotions(
 *   promotions: Array<Promotion>
 * ): Array<Promotion> {
 *   return promotions.filter(promo => isToday(promo.validDate))
 * }
 * 
 * // Shift scheduling
 * interface Shift {
 *   employeeId: string
 *   date: string
 *   startTime: string
 *   endTime: string
 * }
 * 
 * function getTodaysShifts(shifts: Array<Shift>): Array<Shift> {
 *   return shifts.filter(shift => isToday(shift.date))
 * }
 * 
 * // Daily metrics dashboard
 * interface Metric {
 *   date: string
 *   name: string
 *   value: number
 * }
 * 
 * function getTodaysMetrics(
 *   metrics: Array<Metric>
 * ): Map<string, number> {
 *   const todaysMetrics = new Map<string, number>()
 *   
 *   metrics
 *     .filter(metric => isToday(metric.date))
 *     .forEach(metric => {
 *       todaysMetrics.set(metric.name, metric.value)
 *     })
 *   
 *   return todaysMetrics
 * }
 * 
 * // School attendance
 * interface AttendanceRecord {
 *   studentId: string
 *   date: string
 *   present: boolean
 * }
 * 
 * function getTodaysAttendance(
 *   records: Array<AttendanceRecord>
 * ): {
 *   present: number
 *   absent: number
 *   rate: number
 * } {
 *   const todaysRecords = records.filter(record => isToday(record.date))
 *   const present = todaysRecords.filter(r => r.present).length
 *   const total = todaysRecords.length
 *   
 *   return {
 *     present,
 *     absent: total - present,
 *     rate: total > 0 ? (present / total) * 100 : 0
 *   }
 * }
 * 
 * // Medication reminders
 * interface MedicationDose {
 *   medication: string
 *   scheduledDate: string
 *   taken: boolean
 * }
 * 
 * function getTodaysDoses(
 *   doses: Array<MedicationDose>
 * ): {
 *   scheduled: Array<MedicationDose>
 *   taken: Array<MedicationDose>
 *   pending: Array<MedicationDose>
 * } {
 *   const todaysDoses = doses.filter(dose => isToday(dose.scheduledDate))
 *   
 *   return {
 *     scheduled: todaysDoses,
 *     taken: todaysDoses.filter(d => d.taken),
 *     pending: todaysDoses.filter(d => !d.taken)
 *   }
 * }
 * 
 * // Daily backup verification
 * function wasBackupRunToday(lastBackupDate: string): boolean {
 *   return isToday(lastBackupDate)
 * }
 * 
 * // Meeting room bookings
 * interface RoomBooking {
 *   roomId: string
 *   date: string
 *   startTime: string
 *   endTime: string
 *   organizer: string
 * }
 * 
 * function getTodaysBookings(
 *   bookings: Array<RoomBooking>,
 *   roomId?: string
 * ): Array<RoomBooking> {
 *   return bookings.filter(booking => 
 *     isToday(booking.date) && 
 *     (!roomId || booking.roomId === roomId)
 *   )
 * }
 * ```
 * 
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Uses ISO calendar for comparison
 * @property Time-agnostic - Ignores time components if present
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isToday = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)
	
	if (!checkDate) {
		return false
	}
	
	try {
		const today = Temporal.Now.plainDateISO()
		return Temporal.PlainDate.compare(checkDate, today) === 0
	} catch {
		return false
	}
}

export default isToday