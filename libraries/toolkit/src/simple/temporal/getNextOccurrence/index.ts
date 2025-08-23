/**
 * Finds next occurrence of a recurring event
 * 
 * Calculates the next occurrence of a recurring event based on a reference
 * date and recurrence pattern. Supports daily, weekly, monthly, and yearly
 * recurrence with optional intervals (e.g., every 2 weeks). Returns null
 * for invalid inputs to support safe error handling. Uses Temporal API
 * for precise date calculations across calendar boundaries.
 * 
 * @curried (pattern) => (referenceDate) => result
 * @param pattern - Recurrence pattern configuration
 * @param referenceDate - Starting date to calculate next occurrence from
 * @returns Next occurrence date, or null if invalid
 * @example
 * ```typescript
 * // Daily recurrence
 * const dailyPattern = { unit: "days", interval: 1 }
 * const today = Temporal.PlainDate.from("2024-03-15")
 * getNextOccurrence(dailyPattern)(today)
 * // PlainDate 2024-03-16
 * 
 * // Every other day
 * const everyOtherDay = { unit: "days", interval: 2 }
 * getNextOccurrence(everyOtherDay)(today)
 * // PlainDate 2024-03-17
 * 
 * // Weekly recurrence
 * const weeklyPattern = { unit: "weeks", interval: 1 }
 * getNextOccurrence(weeklyPattern)(today)
 * // PlainDate 2024-03-22
 * 
 * // Every two weeks
 * const biweeklyPattern = { unit: "weeks", interval: 2 }
 * getNextOccurrence(biweeklyPattern)(today)
 * // PlainDate 2024-03-29
 * 
 * // Monthly recurrence
 * const monthlyPattern = { unit: "months", interval: 1 }
 * getNextOccurrence(monthlyPattern)(today)
 * // PlainDate 2024-04-15
 * 
 * // Quarterly (every 3 months)
 * const quarterlyPattern = { unit: "months", interval: 3 }
 * getNextOccurrence(quarterlyPattern)(today)
 * // PlainDate 2024-06-15
 * 
 * // Yearly recurrence
 * const yearlyPattern = { unit: "years", interval: 1 }
 * getNextOccurrence(yearlyPattern)(today)
 * // PlainDate 2025-03-15
 * 
 * // Bi-annual (every 2 years)
 * const biannualPattern = { unit: "years", interval: 2 }
 * getNextOccurrence(biannualPattern)(today)
 * // PlainDate 2026-03-15
 * 
 * // Daily medication reminder
 * const medicationReminder = { unit: "days", interval: 1 }
 * const lastTaken = Temporal.PlainDate.from("2024-03-14")
 * getNextOccurrence(medicationReminder)(lastTaken)
 * // PlainDate 2024-03-15 (next dose)
 * 
 * // Weekly team meeting
 * const weeklyMeeting = { unit: "weeks", interval: 1 }
 * const lastMeeting = Temporal.PlainDate.from("2024-03-11") // Monday
 * getNextOccurrence(weeklyMeeting)(lastMeeting)
 * // PlainDate 2024-03-18 (next Monday)
 * 
 * // Monthly bill due date
 * const monthlyBill = { unit: "months", interval: 1 }
 * const lastDue = Temporal.PlainDate.from("2024-02-15")
 * getNextOccurrence(monthlyBill)(lastDue)
 * // PlainDate 2024-03-15
 * 
 * // Quarterly review
 * const quarterlyReview = { unit: "months", interval: 3 }
 * const lastReview = Temporal.PlainDate.from("2024-01-15")
 * getNextOccurrence(quarterlyReview)(lastReview)
 * // PlainDate 2024-04-15
 * 
 * // Annual subscription renewal
 * const annualRenewal = { unit: "years", interval: 1 }
 * const lastRenewal = Temporal.PlainDate.from("2023-03-15")
 * getNextOccurrence(annualRenewal)(lastRenewal)
 * // PlainDate 2024-03-15
 * 
 * // Bi-weekly payroll
 * const payrollPattern = { unit: "weeks", interval: 2 }
 * const lastPayroll = Temporal.PlainDate.from("2024-03-01")
 * getNextOccurrence(payrollPattern)(lastPayroll)
 * // PlainDate 2024-03-15
 * 
 * // Monthly newsletter
 * const newsletterPattern = { unit: "months", interval: 1 }
 * const lastNewsletter = Temporal.PlainDate.from("2024-02-01")
 * getNextOccurrence(newsletterPattern)(lastNewsletter)
 * // PlainDate 2024-03-01
 * 
 * // Seasonal maintenance (quarterly)
 * const maintenancePattern = { unit: "months", interval: 3 }
 * const lastMaintenance = Temporal.PlainDate.from("2024-01-01")
 * getNextOccurrence(maintenancePattern)(lastMaintenance)
 * // PlainDate 2024-04-01
 * 
 * // Edge cases - month boundaries
 * const monthEnd = Temporal.PlainDate.from("2024-01-31")
 * const monthlyFromEnd = { unit: "months", interval: 1 }
 * getNextOccurrence(monthlyFromEnd)(monthEnd)
 * // PlainDate 2024-02-29 (leap year, closest valid date)
 * 
 * // Leap year handling
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * const yearlyFromLeap = { unit: "years", interval: 1 }
 * getNextOccurrence(yearlyFromLeap)(leapDay)
 * // PlainDate 2025-02-28 (non-leap year)
 * 
 * // Custom intervals
 * const every5Days = { unit: "days", interval: 5 }
 * getNextOccurrence(every5Days)(today)
 * // PlainDate 2024-03-20
 * 
 * const every6Months = { unit: "months", interval: 6 }
 * getNextOccurrence(every6Months)(today)
 * // PlainDate 2024-09-15
 * 
 * // Null/undefined handling
 * getNextOccurrence({ unit: "days", interval: 1 })(null)
 * // null
 * 
 * getNextOccurrence({ unit: "days", interval: 1 })(undefined)
 * // null
 * 
 * // Invalid pattern handling
 * getNextOccurrence({ unit: "invalid", interval: 1 })(today)
 * // null
 * 
 * getNextOccurrence({ unit: "days", interval: 0 })(today)
 * // null (zero interval invalid)
 * 
 * getNextOccurrence({ unit: "days", interval: -1 })(today)
 * // null (negative interval invalid)
 * 
 * // Use with recurring events system
 * type RecurringEvent = {
 *   name: string
 *   pattern: { unit: string; interval: number }
 *   lastOccurrence: Temporal.PlainDate
 * }
 * 
 * function getNextDueDate(event: RecurringEvent): Temporal.PlainDate | null {
 *   return getNextOccurrence(event.pattern)(event.lastOccurrence)
 * }
 * 
 * const events: Array<RecurringEvent> = [
 *   {
 *     name: "Team standup",
 *     pattern: { unit: "days", interval: 1 },
 *     lastOccurrence: Temporal.PlainDate.from("2024-03-14")
 *   },
 *   {
 *     name: "Sprint review",
 *     pattern: { unit: "weeks", interval: 2 },
 *     lastOccurrence: Temporal.PlainDate.from("2024-03-01")
 *   }
 * ]
 * 
 * events.map(event => ({
 *   name: event.name,
 *   nextDue: getNextDueDate(event)
 * }))
 * // [
 * //   { name: "Team standup", nextDue: PlainDate 2024-03-15 },
 * //   { name: "Sprint review", nextDue: PlainDate 2024-03-15 }
 * // ]
 * 
 * // Reminder system
 * function createReminders(
 *   events: Array<RecurringEvent>,
 *   daysAhead: number = 1
 * ): Array<{ event: string; date: Temporal.PlainDate }> {
 *   const today = Temporal.Now.plainDateISO()
 *   const reminderDate = today.add({ days: daysAhead })
 *   
 *   return events
 *     .map(event => ({
 *       event: event.name,
 *       nextDue: getNextOccurrence(event.pattern)(event.lastOccurrence)
 *     }))
 *     .filter(({ nextDue }) => 
 *       nextDue && Temporal.PlainDate.compare(nextDue, reminderDate) === 0
 *     )
 *     .map(({ event, nextDue }) => ({ event, date: nextDue! }))
 * }
 * 
 * // Schedule generation
 * function generateSchedule(
 *   pattern: { unit: string; interval: number },
 *   startDate: Temporal.PlainDate,
 *   occurrences: number
 * ): Array<Temporal.PlainDate> {
 *   const dates: Array<Temporal.PlainDate> = [startDate]
 *   
 *   for (let i = 1; i < occurrences; i++) {
 *     const nextDate = getNextOccurrence(pattern)(dates[i - 1])
 *     if (nextDate) {
 *       dates.push(nextDate)
 *     } else {
 *       break
 *     }
 *   }
 *   
 *   return dates
 * }
 * 
 * // Generate next 4 monthly meetings
 * const monthlyMeetings = generateSchedule(
 *   { unit: "months", interval: 1 },
 *   Temporal.PlainDate.from("2024-03-15"),
 *   4
 * )
 * // [2024-03-15, 2024-04-15, 2024-05-15, 2024-06-15]
 * 
 * // Partial application for specific patterns
 * const nextDaily = getNextOccurrence({ unit: "days", interval: 1 })
 * const nextWeekly = getNextOccurrence({ unit: "weeks", interval: 1 })
 * const nextMonthly = getNextOccurrence({ unit: "months", interval: 1 })
 * 
 * const baseDate = Temporal.PlainDate.from("2024-03-15")
 * nextDaily(baseDate)    // 2024-03-16
 * nextWeekly(baseDate)   // 2024-03-22
 * nextMonthly(baseDate)  // 2024-04-15
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Curried - Easily composable for partial application
 * @property Precise - Uses Temporal API for accurate calendar calculations
 * @property Flexible - Supports various recurrence patterns and intervals
 */
const getNextOccurrence = (pattern: {
	unit: string
	interval: number
}) => (
	referenceDate: Temporal.PlainDate | null | undefined
): Temporal.PlainDate | null => {
	if (referenceDate == null) {
		return null
	}
	
	if (!(referenceDate instanceof Temporal.PlainDate)) {
		return null
	}
	
	// Validate pattern
	if (!pattern || typeof pattern.unit !== "string" || typeof pattern.interval !== "number") {
		return null
	}
	
	if (pattern.interval <= 0) {
		return null
	}
	
	try {
		// Build duration object based on unit and interval
		switch (pattern.unit) {
			case "days":
				return referenceDate.add({ days: pattern.interval })
			
			case "weeks":
				return referenceDate.add({ weeks: pattern.interval })
			
			case "months":
				return referenceDate.add({ months: pattern.interval })
			
			case "years":
				return referenceDate.add({ years: pattern.interval })
			
			default:
				return null
		}
	} catch {
		return null
	}
}

export default getNextOccurrence