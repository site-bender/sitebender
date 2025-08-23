import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date represents tomorrow
 * 
 * Validates whether a given date matches tomorrow's date in the ISO calendar.
 * Accepts various date formats and converts them to Temporal.PlainDate for
 * accurate comparison. Uses the system's current date plus one day for comparison.
 * Returns true only if the date represents tomorrow, false for any other date
 * or invalid input.
 * 
 * Date comparison rules:
 * - Compares only the date portion (year, month, day)
 * - Time components are ignored if present
 * - Uses ISO calendar for comparison
 * - Tomorrow is determined by system timezone
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param date - The date to check (string, Date, Temporal types, or date-like object)
 * @returns True if the date is tomorrow, false otherwise
 * @example
 * ```typescript
 * // Assuming today is 2024-01-15
 * 
 * // Using ISO date strings
 * isTomorrow("2024-01-16")         // true
 * isTomorrow("2024-01-16T10:30:00") // true (time ignored)
 * isTomorrow("2024-01-15")         // false (today)
 * isTomorrow("2024-01-17")         // false (day after tomorrow)
 * 
 * // Using Temporal PlainDate objects
 * const today = Temporal.Now.plainDateISO()
 * const tomorrow = today.add({ days: 1 })
 * const dayAfter = today.add({ days: 2 })
 * 
 * isTomorrow(tomorrow)  // true
 * isTomorrow(today)     // false
 * isTomorrow(dayAfter)  // false
 * 
 * // Using JavaScript Date objects
 * const tomorrowDate = new Date()
 * tomorrowDate.setDate(tomorrowDate.getDate() + 1)
 * 
 * isTomorrow(tomorrowDate)  // true
 * isTomorrow(new Date())    // false (today)
 * 
 * // Using date-like objects
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * const tomorrowObj = {
 *   year: tomorrow.year,
 *   month: tomorrow.month,
 *   day: tomorrow.day
 * }
 * 
 * isTomorrow(tomorrowObj)  // true
 * isTomorrow({ year: 2024, month: 1, day: 15 })  // false
 * 
 * // Task planning
 * interface Task {
 *   title: string
 *   dueDate: string
 *   priority: string
 * }
 * 
 * function getTomorrowsTasks(tasks: Array<Task>): Array<Task> {
 *   return tasks.filter(task => isTomorrow(task.dueDate))
 * }
 * 
 * const tasks = [
 *   { title: "Review PR", dueDate: "2024-01-16", priority: "high" },
 *   { title: "Team meeting", dueDate: "2024-01-15", priority: "medium" },
 *   { title: "Deploy feature", dueDate: "2024-01-16", priority: "critical" }
 * ]
 * 
 * getTomorrowsTasks(tasks)  // Returns tasks due tomorrow
 * 
 * // Reminder system
 * function getUpcomingReminder(dueDate: string): string | null {
 *   if (isTomorrow(dueDate)) {
 *     return "Due tomorrow - prepare today!"
 *   }
 *   
 *   const date = toPlainDate(dueDate)
 *   const today = Temporal.Now.plainDateISO()
 *   
 *   if (date && Temporal.PlainDate.compare(date, today) === 0) {
 *     return "Due today!"
 *   }
 *   
 *   if (date && Temporal.PlainDate.compare(date, today) > 0) {
 *     const daysUntil = date.since(today).days
 *     return `Due in ${daysUntil} days`
 *   }
 *   
 *   return null
 * }
 * 
 * // Delivery scheduling
 * interface Delivery {
 *   orderId: string
 *   deliveryDate: string
 *   address: string
 * }
 * 
 * function getTomorrowsDeliveries(
 *   deliveries: Array<Delivery>
 * ): Array<Delivery> {
 *   return deliveries
 *     .filter(delivery => isTomorrow(delivery.deliveryDate))
 *     .sort((a, b) => a.orderId.localeCompare(b.orderId))
 * }
 * 
 * // Meeting preparation
 * interface Meeting {
 *   title: string
 *   date: string
 *   attendees: Array<string>
 *   preparationNeeded: boolean
 * }
 * 
 * function getMeetingsNeedingPrep(
 *   meetings: Array<Meeting>
 * ): Array<Meeting> {
 *   return meetings.filter(meeting => 
 *     isTomorrow(meeting.date) && meeting.preparationNeeded
 *   )
 * }
 * 
 * // Travel itinerary
 * interface FlightInfo {
 *   flightNumber: string
 *   departureDate: string
 *   checkInRequired: boolean
 * }
 * 
 * function getFlightsForCheckIn(
 *   flights: Array<FlightInfo>
 * ): Array<FlightInfo> {
 *   return flights.filter(flight => 
 *     isTomorrow(flight.departureDate) && flight.checkInRequired
 *   )
 * }
 * 
 * // School schedule
 * interface SchoolEvent {
 *   eventName: string
 *   date: string
 *   requiresPermission: boolean
 * }
 * 
 * function getTomorrowsEvents(
 *   events: Array<SchoolEvent>
 * ): {
 *   all: Array<SchoolEvent>
 *   needingPermission: Array<SchoolEvent>
 * } {
 *   const tomorrowEvents = events.filter(event => 
 *     isTomorrow(event.date)
 *   )
 *   
 *   return {
 *     all: tomorrowEvents,
 *     needingPermission: tomorrowEvents.filter(e => e.requiresPermission)
 *   }
 * }
 * 
 * // Restaurant reservations
 * interface Reservation {
 *   customerName: string
 *   date: string
 *   time: string
 *   partySize: number
 * }
 * 
 * function getTomorrowsReservations(
 *   reservations: Array<Reservation>
 * ): {
 *   total: number
 *   totalGuests: number
 *   reservations: Array<Reservation>
 * } {
 *   const tomorrowRes = reservations.filter(res => 
 *     isTomorrow(res.date)
 *   )
 *   
 *   return {
 *     total: tomorrowRes.length,
 *     totalGuests: tomorrowRes.reduce((sum, r) => sum + r.partySize, 0),
 *     reservations: tomorrowRes
 *   }
 * }
 * 
 * // Invalid inputs return false
 * isTomorrow(null)              // false
 * isTomorrow(undefined)         // false
 * isTomorrow("")                // false (empty string)
 * isTomorrow("invalid-date")    // false (invalid format)
 * isTomorrow("2024-13-01")      // false (invalid month)
 * isTomorrow("2024-02-30")      // false (invalid day)
 * isTomorrow(123)               // false (not a date type)
 * isTomorrow({})                // false (missing date properties)
 * isTomorrow([2024, 1, 16])     // false (array not supported)
 * 
 * // Maintenance scheduling
 * interface MaintenanceTask {
 *   equipment: string
 *   scheduledDate: string
 *   estimatedHours: number
 * }
 * 
 * function getTomorrowsMaintenance(
 *   tasks: Array<MaintenanceTask>
 * ): {
 *   tasks: Array<MaintenanceTask>
 *   totalHours: number
 * } {
 *   const tomorrowTasks = tasks.filter(task => 
 *     isTomorrow(task.scheduledDate)
 *   )
 *   
 *   return {
 *     tasks: tomorrowTasks,
 *     totalHours: tomorrowTasks.reduce((sum, t) => sum + t.estimatedHours, 0)
 *   }
 * }
 * 
 * // Exam preparation
 * interface Exam {
 *   subject: string
 *   examDate: string
 *   studyHoursNeeded: number
 * }
 * 
 * function getExamsNeedingStudy(exams: Array<Exam>): Array<{
 *   exam: Exam
 *   message: string
 * }> {
 *   return exams
 *     .filter(exam => isTomorrow(exam.examDate))
 *     .map(exam => ({
 *       exam,
 *       message: `Study ${exam.studyHoursNeeded} hours for ${exam.subject} exam tomorrow!`
 *     }))
 * }
 * 
 * // Sports events
 * interface GameSchedule {
 *   teamName: string
 *   gameDate: string
 *   isHomeGame: boolean
 * }
 * 
 * function getTomorrowsGames(
 *   schedule: Array<GameSchedule>
 * ): {
 *   home: Array<GameSchedule>
 *   away: Array<GameSchedule>
 * } {
 *   const tomorrowGames = schedule.filter(game => 
 *     isTomorrow(game.gameDate)
 *   )
 *   
 *   return {
 *     home: tomorrowGames.filter(g => g.isHomeGame),
 *     away: tomorrowGames.filter(g => !g.isHomeGame)
 *   }
 * }
 * 
 * // Subscription trials
 * interface Trial {
 *   userId: string
 *   trialEndDate: string
 *   plan: string
 * }
 * 
 * function getTrialsEndingTomorrow(
 *   trials: Array<Trial>
 * ): Array<Trial> {
 *   return trials.filter(trial => isTomorrow(trial.trialEndDate))
 * }
 * 
 * // Weather alerts
 * interface WeatherAlert {
 *   date: string
 *   severity: "low" | "medium" | "high"
 *   description: string
 * }
 * 
 * function getTomorrowsAlerts(
 *   alerts: Array<WeatherAlert>
 * ): Array<WeatherAlert> {
 *   return alerts
 *     .filter(alert => isTomorrow(alert.date))
 *     .sort((a, b) => {
 *       const severityOrder = { high: 0, medium: 1, low: 2 }
 *       return severityOrder[a.severity] - severityOrder[b.severity]
 *     })
 * }
 * 
 * // Birthday preparations
 * interface Birthday {
 *   name: string
 *   birthDate: string
 *   age: number
 * }
 * 
 * function getBirthdaysTomorrow(people: Array<Birthday>): Array<{
 *   name: string
 *   turningAge: number
 * }> {
 *   const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 *   
 *   return people
 *     .filter(person => {
 *       const birth = toPlainDate(person.birthDate)
 *       if (!birth) return false
 *       
 *       // Check if month and day match tomorrow (ignore year)
 *       return birth.month === tomorrow.month && birth.day === tomorrow.day
 *     })
 *     .map(person => ({
 *       name: person.name,
 *       turningAge: person.age + 1
 *     }))
 * }
 * 
 * // Garbage collection schedule
 * interface CollectionSchedule {
 *   type: "recycling" | "compost" | "trash"
 *   date: string
 * }
 * 
 * function getTomorrowsCollection(
 *   schedule: Array<CollectionSchedule>
 * ): Array<string> {
 *   return schedule
 *     .filter(item => isTomorrow(item.date))
 *     .map(item => item.type)
 * }
 * 
 * // Project milestones
 * interface Milestone {
 *   projectName: string
 *   milestoneDate: string
 *   description: string
 *   isDeliverable: boolean
 * }
 * 
 * function getTomorrowsMilestones(
 *   milestones: Array<Milestone>
 * ): {
 *   all: Array<Milestone>
 *   deliverables: Array<Milestone>
 * } {
 *   const tomorrowMilestones = milestones.filter(m => 
 *     isTomorrow(m.milestoneDate)
 *   )
 *   
 *   return {
 *     all: tomorrowMilestones,
 *     deliverables: tomorrowMilestones.filter(m => m.isDeliverable)
 *   }
 * }
 * 
 * // Medication refills
 * interface Prescription {
 *   medication: string
 *   refillDate: string
 *   pharmacy: string
 * }
 * 
 * function getRefillsNeededTomorrow(
 *   prescriptions: Array<Prescription>
 * ): Array<Prescription> {
 *   return prescriptions.filter(rx => isTomorrow(rx.refillDate))
 * }
 * 
 * // Court appearances
 * interface CourtDate {
 *   caseNumber: string
 *   appearanceDate: string
 *   courtroom: string
 *   time: string
 * }
 * 
 * function getTomorrowsAppearances(
 *   appearances: Array<CourtDate>
 * ): Array<CourtDate> {
 *   return appearances
 *     .filter(appearance => isTomorrow(appearance.appearanceDate))
 *     .sort((a, b) => a.time.localeCompare(b.time))
 * }
 * ```
 * 
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Uses ISO calendar for comparison
 * @property Time-agnostic - Ignores time components if present
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isTomorrow = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)
	
	if (!checkDate) {
		return false
	}
	
	try {
		const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
		return Temporal.PlainDate.compare(checkDate, tomorrow) === 0
	} catch {
		return false
	}
}

export default isTomorrow