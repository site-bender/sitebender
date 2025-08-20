/**
 * Adds a Temporal.Duration to a date, time, or datetime
 * 
 * Immutably adds a duration to any Temporal object that supports addition.
 * Returns a new Temporal object with the duration added. Negative duration
 * values subtract time. Handles all duration units appropriately based on
 * the target type. Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (duration) => (temporal) => result
 * @param duration - The Temporal.Duration to add
 * @param temporal - The Temporal object to add duration to
 * @returns New temporal object with duration added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const weekDuration = Temporal.Duration.from({ weeks: 2 })
 * addDuration(weekDuration)(date)         // PlainDate 2024-03-29
 * 
 * const monthAndDays = Temporal.Duration.from({ months: 1, days: 10 })
 * addDuration(monthAndDays)(date)         // PlainDate 2024-04-25
 * 
 * // With PlainTime
 * const time = Temporal.PlainTime.from("10:30:00")
 * const hourDuration = Temporal.Duration.from({ hours: 2, minutes: 15 })
 * addDuration(hourDuration)(time)         // PlainTime 12:45:00
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * const complexDuration = Temporal.Duration.from({
 *   days: 3,
 *   hours: 5,
 *   minutes: 45,
 *   seconds: 30
 * })
 * addDuration(complexDuration)(datetime)  // PlainDateTime 2024-03-18T16:15:30
 * 
 * // Negative durations (subtraction)
 * const subtractDuration = Temporal.Duration.from({ days: -7 })
 * addDuration(subtractDuration)(date)     // PlainDate 2024-03-08
 * 
 * // Large durations
 * const yearDuration = Temporal.Duration.from({ 
 *   years: 1, 
 *   months: 2, 
 *   days: 15 
 * })
 * addDuration(yearDuration)(date)         // PlainDate 2025-05-30
 * 
 * // Partial application for reusable operations
 * const addWeek = addDuration(Temporal.Duration.from({ weeks: 1 }))
 * const addMonth = addDuration(Temporal.Duration.from({ months: 1 }))
 * const addQuarter = addDuration(Temporal.Duration.from({ months: 3 }))
 * const addBusinessWeek = addDuration(Temporal.Duration.from({ days: 5 }))
 * 
 * const today = Temporal.Now.plainDateISO()
 * addWeek(today)                          // 1 week from today
 * addMonth(today)                         // 1 month from today
 * addQuarter(today)                       // 3 months from today
 * 
 * // Project timeline calculations
 * function calculateMilestone(
 *   start: Temporal.PlainDate,
 *   phase: { weeks?: number; days?: number }
 * ): Temporal.PlainDate | null {
 *   const duration = Temporal.Duration.from(phase)
 *   return addDuration(duration)(start)
 * }
 * 
 * const projectStart = Temporal.PlainDate.from("2024-04-01")
 * calculateMilestone(projectStart, { weeks: 6 })  // PlainDate 2024-05-13
 * calculateMilestone(projectStart, { weeks: 2, days: 3 }) // PlainDate 2024-04-18
 * 
 * // Meeting duration calculations
 * const meetingStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const meetingLength = Temporal.Duration.from({ hours: 1, minutes: 30 })
 * const meetingEnd = addDuration(meetingLength)(meetingStart)
 * // PlainDateTime 2024-03-15T10:30:00
 * 
 * // Sprint planning
 * function getSprintDates(
 *   start: Temporal.PlainDate,
 *   sprintLength: Temporal.Duration,
 *   count: number
 * ): Array<{ start: Temporal.PlainDate; end: Temporal.PlainDate | null }> {
 *   const sprints = []
 *   let currentStart = start
 *   
 *   for (let i = 0; i < count; i++) {
 *     const end = addDuration(sprintLength)(currentStart)
 *     sprints.push({ start: currentStart, end })
 *     if (end) currentStart = end
 *   }
 *   
 *   return sprints
 * }
 * 
 * const sprintDuration = Temporal.Duration.from({ weeks: 2 })
 * const sprints = getSprintDates(
 *   Temporal.PlainDate.from("2024-01-01"),
 *   sprintDuration,
 *   6
 * )
 * // 6 two-week sprints starting Jan 1
 * 
 * // Subscription periods
 * const subscription = Temporal.PlainDate.from("2024-01-15")
 * const billingCycle = Temporal.Duration.from({ months: 1 })
 * const trialPeriod = Temporal.Duration.from({ days: 14 })
 * 
 * const trialEnd = addDuration(trialPeriod)(subscription)
 * const firstBilling = addDuration(billingCycle)(subscription)
 * 
 * // Time tracking with precise durations
 * const workStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const workDuration = Temporal.Duration.from({
 *   hours: 8,
 *   minutes: 30,
 *   seconds: 45
 * })
 * const workEnd = addDuration(workDuration)(workStart)
 * // PlainDateTime 2024-03-15T17:30:45
 * 
 * // Null handling
 * addDuration(weekDuration)(null)         // null
 * addDuration(weekDuration)(undefined)    // null
 * addDuration(null)(date)                 // null
 * 
 * // Exercise routine scheduling
 * const workoutDurations = [
 *   { name: "Warmup", duration: { minutes: 10 } },
 *   { name: "Cardio", duration: { minutes: 30 } },
 *   { name: "Strength", duration: { minutes: 20 } },
 *   { name: "Cooldown", duration: { minutes: 10 } }
 * ]
 * 
 * function scheduleWorkout(
 *   start: Temporal.PlainTime
 * ): Array<{ name: string; time: Temporal.PlainTime | null }> {
 *   const schedule = []
 *   let currentTime = start
 *   
 *   for (const segment of workoutDurations) {
 *     schedule.push({ name: segment.name, time: currentTime })
 *     const duration = Temporal.Duration.from(segment.duration)
 *     currentTime = addDuration(duration)(currentTime)
 *   }
 *   
 *   return schedule
 * }
 * 
 * const workout = scheduleWorkout(Temporal.PlainTime.from("06:00:00"))
 * // Workout segments with start times
 * 
 * // Contract terms
 * const contractStart = Temporal.PlainDate.from("2024-01-01")
 * const contractTerm = Temporal.Duration.from({ years: 2, months: 6 })
 * const contractEnd = addDuration(contractTerm)(contractStart)
 * // PlainDate 2026-07-01
 * 
 * // Delivery estimates
 * function estimateDelivery(
 *   orderDate: Temporal.PlainDateTime,
 *   processingTime: Temporal.Duration,
 *   shippingTime: Temporal.Duration
 * ): Temporal.PlainDateTime | null {
 *   const readyToShip = addDuration(processingTime)(orderDate)
 *   return readyToShip ? addDuration(shippingTime)(readyToShip) : null
 * }
 * 
 * const order = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const processing = Temporal.Duration.from({ days: 2, hours: 4 })
 * const shipping = Temporal.Duration.from({ days: 3, hours: 12 })
 * estimateDelivery(order, processing, shipping)
 * // PlainDateTime 2024-03-20T02:00:00
 * 
 * // Age calculation with duration
 * function getAgeAsDuration(
 *   birthDate: Temporal.PlainDate
 * ): Temporal.Duration {
 *   const today = Temporal.Now.plainDateISO()
 *   return today.since(birthDate)
 * }
 * 
 * // Recurring events
 * function getRecurringDates(
 *   start: Temporal.PlainDate,
 *   interval: Temporal.Duration,
 *   occurrences: number
 * ): Array<Temporal.PlainDate | null> {
 *   const dates = [start]
 *   
 *   for (let i = 1; i < occurrences; i++) {
 *     const previous = dates[dates.length - 1]
 *     if (previous) {
 *       dates.push(addDuration(interval)(previous))
 *     }
 *   }
 *   
 *   return dates
 * }
 * 
 * const eventStart = Temporal.PlainDate.from("2024-01-01")
 * const biweekly = Temporal.Duration.from({ weeks: 2 })
 * getRecurringDates(eventStart, biweekly, 10)
 * // 10 biweekly occurrences
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new temporal object without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Works with all Temporal types that support duration
 */
const addDuration = (duration: Temporal.Duration | null | undefined) => (
	temporal: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainTime | 
	         Temporal.PlainYearMonth | Temporal.ZonedDateTime | Temporal.Instant | 
	         null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainTime | 
   Temporal.PlainYearMonth | Temporal.ZonedDateTime | Temporal.Instant | null => {
	if (temporal == null || duration == null) {
		return null
	}
	
	// Check if it's a valid Temporal type that supports add
	if (!(temporal instanceof Temporal.PlainDate) && 
	    !(temporal instanceof Temporal.PlainDateTime) &&
	    !(temporal instanceof Temporal.PlainTime) &&
	    !(temporal instanceof Temporal.PlainYearMonth) &&
	    !(temporal instanceof Temporal.ZonedDateTime) &&
	    !(temporal instanceof Temporal.Instant)) {
		return null
	}
	
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}
	
	try {
		return temporal.add(duration)
	} catch {
		return null
	}
}

export default addDuration