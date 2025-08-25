/**
 * Returns the end of week for a given date
 *
 * Creates a PlainDate representing the last day of the week for the given date.
 * The week start day is configurable (default is Monday = 1). Days are numbered
 * 1-7 where 1 is Monday and 7 is Sunday (ISO 8601 standard). Useful for weekly
 * reports, calendar views, and scheduling. Works with PlainDate and PlainDateTime.
 * Returns null for invalid inputs.
 *
 * @curried (weekStartDay?) => (date) => result
 * @param weekStartDay - Day week starts on (1=Mon to 7=Sun, default 1)
 * @param date - The date to get end of week for
 * @returns PlainDate of the last day of the week, or null if invalid
 * @example
 * ```typescript
 * // Basic usage (Monday as week start)
 * const date = Temporal.PlainDate.from("2024-03-15")  // Friday
 * endOfWeek()(date)                       // PlainDate 2024-03-17 (Sunday)
 * endOfWeek(1)(date)                      // PlainDate 2024-03-17 (Sunday)
 *
 * // Sunday as week start (US convention)
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * endOfWeek(7)(friday)                    // PlainDate 2024-03-16 (Saturday)
 *
 * // Different days of the week
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * const wednesday = Temporal.PlainDate.from("2024-03-13")
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 *
 * endOfWeek()(monday)                     // PlainDate 2024-03-17 (Sunday)
 * endOfWeek()(wednesday)                  // PlainDate 2024-03-17 (Sunday)
 * endOfWeek()(sunday)                     // PlainDate 2024-03-17 (Sunday)
 *
 * // With PlainDateTime (returns PlainDate)
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * endOfWeek()(datetime)                   // PlainDate 2024-03-17
 *
 * // Current week's end
 * const today = Temporal.Now.plainDateISO()
 * const weekEnd = endOfWeek()(today)      // End of current week
 *
 * // Partial application for different conventions
 * const endOfWeekISO = endOfWeek(1)       // Monday start (ISO)
 * const endOfWeekUS = endOfWeek(7)        // Sunday start (US)
 * const endOfWeekMiddleEast = endOfWeek(6) // Saturday start
 *
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * endOfWeekISO(someDate)                  // Sunday
 * endOfWeekUS(someDate)                   // Saturday
 * endOfWeekMiddleEast(someDate)           // Friday
 *
 * // Weekly reporting periods
 * function getWeeklyReportPeriod(
 *   date: Temporal.PlainDate
 * ): { start: Temporal.PlainDate; end: Temporal.PlainDate | null } {
 *   const weekStart = date.dayOfWeek
 *   const daysFromStart = (date.dayOfWeek - 1 + 7) % 7
 *   const start = date.subtract({ days: daysFromStart })
 *   const end = endOfWeek()(date)
 *   return { start, end }
 * }
 *
 * // Weekly task deadline
 * function getWeeklyDeadline(
 *   assignedDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return endOfWeek()(assignedDate)
 * }
 *
 * const taskDate = Temporal.PlainDate.from("2024-03-12")
 * getWeeklyDeadline(taskDate)             // PlainDate 2024-03-17
 *
 * // Payroll week
 * function getPayrollWeekEnd(
 *   date: Temporal.PlainDate,
 *   payrollWeekStart: number = 1
 * ): Temporal.PlainDate | null {
 *   return endOfWeek(payrollWeekStart)(date)
 * }
 *
 * const workDate = Temporal.PlainDate.from("2024-03-14")
 * getPayrollWeekEnd(workDate, 1)          // Sunday (Mon-Sun week)
 * getPayrollWeekEnd(workDate, 7)          // Saturday (Sun-Sat week)
 *
 * // Sprint planning (2-week sprints)
 * function getSprintEnd(
 *   sprintStart: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   const firstWeekEnd = endOfWeek()(sprintStart)
 *   return firstWeekEnd ? firstWeekEnd.add({ days: 7 }) : null
 * }
 *
 * const sprint = Temporal.PlainDate.from("2024-03-04")
 * getSprintEnd(sprint)                    // PlainDate 2024-03-17 (2 weeks)
 *
 * // Null handling
 * endOfWeek()(null)                       // null
 * endOfWeek()(undefined)                  // null
 * endOfWeek(null)(date)                   // Uses default (Monday)
 *
 * // Calendar generation
 * function getCalendarWeeks(
 *   month: Temporal.PlainYearMonth
 * ): Array<{ start: Temporal.PlainDate; end: Temporal.PlainDate | null }> {
 *   const firstDay = month.toPlainDate({ day: 1 })
 *   const lastDay = month.toPlainDate({ day: month.daysInMonth })
 *
 *   const weeks: Array<{ start: Temporal.PlainDate; end: Temporal.PlainDate | null }> = []
 *   let current = firstDay
 *
 *   // Go to start of first week
 *   const daysFromWeekStart = (current.dayOfWeek - 1 + 7) % 7
 *   current = current.subtract({ days: daysFromWeekStart })
 *
 *   while (Temporal.PlainDate.compare(current, lastDay) <= 0) {
 *     const weekEnd = endOfWeek()(current)
 *     weeks.push({ start: current, end: weekEnd })
 *     current = current.add({ days: 7 })
 *   }
 *
 *   return weeks
 * }
 *
 * // Weekly sales cutoff
 * function getWeeklySalesCutoff(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   const weekEnd = endOfWeek()(date)
 *   return weekEnd ?
 *     weekEnd.toPlainDateTime(Temporal.PlainTime.from("23:59:59")) :
 *     null
 * }
 *
 * // Academic week
 * function getAcademicWeekEnd(
 *   date: Temporal.PlainDate,
 *   academicWeekStart: number = 1  // Monday default
 * ): Temporal.PlainDate | null {
 *   return endOfWeek(academicWeekStart)(date)
 * }
 *
 * // Trading week (markets closed on weekends)
 * function getTradingWeekEnd(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   const weekEnd = endOfWeek(1)(date)  // ISO week
 *   if (!weekEnd) return null
 *
 *   // If Sunday, return Friday instead
 *   if (weekEnd.dayOfWeek === 7) {
 *     return weekEnd.subtract({ days: 2 })
 *   }
 *   // If Saturday, return Friday
 *   if (weekEnd.dayOfWeek === 6) {
 *     return weekEnd.subtract({ days: 1 })
 *   }
 *   return weekEnd
 * }
 *
 * // Restaurant week (different industry conventions)
 * function getRestaurantWeekEnd(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Restaurants often use Monday-Sunday weeks
 *   return endOfWeek(1)(date)
 * }
 *
 * // Fitness tracking week
 * function getFitnessWeekEnd(
 *   date: Temporal.PlainDate,
 *   userPreference: "monday" | "sunday" = "monday"
 * ): Temporal.PlainDate | null {
 *   const startDay = userPreference === "sunday" ? 7 : 1
 *   return endOfWeek(startDay)(date)
 * }
 *
 * // Time tracking period
 * function getTimesheetWeekEnd(
 *   date: Temporal.PlainDate,
 *   companyWeekStart: number = 1
 * ): Temporal.PlainDate | null {
 *   return endOfWeek(companyWeekStart)(date)
 * }
 *
 * // Project milestone weeks
 * function getMilestoneWeekEnd(
 *   milestoneDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return endOfWeek()(milestoneDate)
 * }
 *
 * // Billing week for hourly workers
 * function getBillingWeekEnd(
 *   workDate: Temporal.PlainDate,
 *   billingWeekStart: number = 1
 * ): Temporal.PlainDate | null {
 *   return endOfWeek(billingWeekStart)(workDate)
 * }
 *
 * // Content publishing schedule
 * function getPublishingWeekEnd(
 *   contentDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Content often published by end of week
 *   return endOfWeek()(contentDate)
 * }
 *
 * // Shift rotation
 * function getShiftRotationEnd(
 *   shiftDate: Temporal.PlainDate,
 *   rotationWeekStart: number = 1
 * ): Temporal.PlainDate | null {
 *   return endOfWeek(rotationWeekStart)(shiftDate)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new date without modifying input
 * @property Safe - Returns null for invalid inputs
 * @property Configurable - Supports different week start conventions
 */
const endOfWeek = (weekStartDay: number = 1) =>
(
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDate | null => {
	if (date == null) {
		return null
	}

	try {
		// Convert to PlainDate if needed
		let plainDate: Temporal.PlainDate

		if (date instanceof Temporal.PlainDateTime) {
			plainDate = date.toPlainDate()
		} else if (date instanceof Temporal.PlainDate) {
			plainDate = date
		} else {
			return null
		}

		// Validate weekStartDay (1-7)
		const startDay = weekStartDay >= 1 && weekStartDay <= 7 ? weekStartDay : 1

		// Calculate days until end of week
		// dayOfWeek: 1=Monday, 7=Sunday
		const currentDay = plainDate.dayOfWeek

		// Calculate end day (day before start day)
		const endDay = startDay === 1 ? 7 : startDay - 1

		// Calculate days to add
		let daysToAdd: number
		if (currentDay <= endDay) {
			daysToAdd = endDay - currentDay
		} else {
			daysToAdd = 7 - currentDay + endDay
		}

		// Return the end of week
		return plainDate.add({ days: daysToAdd })
	} catch {
		return null
	}
}

export default endOfWeek
