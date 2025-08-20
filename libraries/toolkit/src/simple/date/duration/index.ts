/**
 * Creates a Temporal.Duration from a units specification object
 * 
 * Constructs a duration from an object containing time units (years, months,
 * days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds).
 * All units are optional and default to 0. Negative values are allowed for
 * creating negative durations. Returns null for invalid inputs.
 * 
 * @param units - Object specifying duration units
 * @returns New Temporal.Duration, or null if invalid
 * @example
 * ```typescript
 * // Basic duration creation
 * duration({ days: 7 })                   // 7-day duration
 * duration({ hours: 2, minutes: 30 })     // 2.5-hour duration
 * duration({ months: 1, days: 15 })       // 1 month 15 days
 * 
 * // Complex durations
 * duration({
 *   years: 1,
 *   months: 2,
 *   days: 15,
 *   hours: 3,
 *   minutes: 30,
 *   seconds: 45
 * })  // 1 year, 2 months, 15 days, 3 hours, 30 minutes, 45 seconds
 * 
 * // Negative durations (for subtraction)
 * duration({ days: -7 })                  // Negative 7-day duration
 * duration({ months: -1, days: -15 })     // Negative 1 month 15 days
 * 
 * // High precision
 * duration({
 *   seconds: 1,
 *   milliseconds: 500,
 *   microseconds: 250,
 *   nanoseconds: 125
 * })  // 1.500250125 seconds
 * 
 * // Common time periods
 * const oneWeek = duration({ weeks: 1 })
 * const oneMonth = duration({ months: 1 })
 * const oneQuarter = duration({ months: 3 })
 * const oneYear = duration({ years: 1 })
 * const oneDay = duration({ days: 1 })
 * const oneHour = duration({ hours: 1 })
 * 
 * // Working with durations
 * const workDay = duration({ hours: 8 })
 * const workWeek = duration({ days: 5, hours: 40 })
 * const vacation = duration({ weeks: 2 })
 * 
 * // Project phases
 * const phase1 = duration({ weeks: 6 })
 * const phase2 = duration({ months: 2 })
 * const phase3 = duration({ weeks: 4, days: 3 })
 * 
 * // Adding durations to dates
 * const today = Temporal.Now.plainDateISO()
 * const nextWeek = today.add(duration({ weeks: 1 }))
 * const nextMonth = today.add(duration({ months: 1 }))
 * const nextYear = today.add(duration({ years: 1 }))
 * 
 * // Sprint duration
 * function getSprintDuration(
 *   weeks: number = 2
 * ): Temporal.Duration | null {
 *   return duration({ weeks })
 * }
 * 
 * const sprint = getSprintDuration(2)
 * const startDate = Temporal.PlainDate.from("2024-03-01")
 * const endDate = sprint ? startDate.add(sprint) : startDate
 * 
 * // Meeting duration
 * function getMeetingDuration(
 *   hours: number,
 *   minutes: number = 0
 * ): Temporal.Duration | null {
 *   return duration({ hours, minutes })
 * }
 * 
 * const standup = getMeetingDuration(0, 15)  // 15-minute standup
 * const planning = getMeetingDuration(2)      // 2-hour planning
 * const retrospective = getMeetingDuration(1, 30)  // 1.5-hour retro
 * 
 * // Contract terms
 * function getContractDuration(
 *   years: number,
 *   months: number = 0
 * ): Temporal.Duration | null {
 *   return duration({ years, months })
 * }
 * 
 * const shortTerm = getContractDuration(0, 6)   // 6-month contract
 * const annual = getContractDuration(1)         // 1-year contract
 * const longTerm = getContractDuration(3)       // 3-year contract
 * 
 * // Time tracking
 * function createTimeEntry(
 *   hours: number,
 *   minutes: number,
 *   seconds: number = 0
 * ): Temporal.Duration | null {
 *   return duration({ hours, minutes, seconds })
 * }
 * 
 * const task1 = createTimeEntry(2, 30)          // 2h 30m
 * const task2 = createTimeEntry(1, 45, 30)      // 1h 45m 30s
 * const task3 = createTimeEntry(0, 15)          // 15m
 * 
 * // Null handling
 * duration(null)                          // null
 * duration(undefined)                     // null
 * duration({})                            // Empty duration (all zeros)
 * 
 * // Subscription periods
 * const subscriptionTypes = {
 *   daily: duration({ days: 1 }),
 *   weekly: duration({ weeks: 1 }),
 *   monthly: duration({ months: 1 }),
 *   quarterly: duration({ months: 3 }),
 *   annual: duration({ years: 1 })
 * }
 * 
 * // Billing cycles
 * function getBillingCycle(
 *   type: "monthly" | "quarterly" | "annual"
 * ): Temporal.Duration | null {
 *   switch (type) {
 *     case "monthly": return duration({ months: 1 })
 *     case "quarterly": return duration({ months: 3 })
 *     case "annual": return duration({ years: 1 })
 *     default: return null
 *   }
 * }
 * 
 * // Exercise intervals
 * const workoutIntervals = {
 *   warmup: duration({ minutes: 10 }),
 *   highIntensity: duration({ seconds: 30 }),
 *   rest: duration({ seconds: 10 }),
 *   cooldown: duration({ minutes: 5 })
 * }
 * 
 * // Shipping estimates
 * function getShippingDuration(
 *   method: "standard" | "express" | "overnight"
 * ): Temporal.Duration | null {
 *   switch (method) {
 *     case "standard": return duration({ days: 5, hours: 12 })
 *     case "express": return duration({ days: 2, hours: 6 })
 *     case "overnight": return duration({ days: 1 })
 *     default: return null
 *   }
 * }
 * 
 * // Cache expiration
 * const cacheExpiry = {
 *   short: duration({ minutes: 5 }),
 *   medium: duration({ hours: 1 }),
 *   long: duration({ hours: 24 }),
 *   permanent: duration({ years: 100 })  // Effectively permanent
 * }
 * 
 * // Gestation periods
 * const gestationPeriods = {
 *   human: duration({ days: 280 }),
 *   elephant: duration({ days: 640 }),
 *   mouse: duration({ days: 20 })
 * }
 * 
 * // Astronomical periods
 * const astronomicalPeriods = {
 *   lunarMonth: duration({ days: 29, hours: 12, minutes: 44, seconds: 3 }),
 *   solarYear: duration({ days: 365, hours: 5, minutes: 48, seconds: 46 }),
 *   mercuryOrbit: duration({ days: 88 }),
 *   marsOrbit: duration({ days: 687 })
 * }
 * 
 * // Cooking times
 * function getCookingTime(
 *   dish: string
 * ): Temporal.Duration | null {
 *   const times: Record<string, { hours?: number; minutes?: number }> = {
 *     "soft-boiled-egg": { minutes: 6 },
 *     "hard-boiled-egg": { minutes: 12 },
 *     "pasta": { minutes: 10 },
 *     "rice": { minutes: 20 },
 *     "roast-chicken": { hours: 1, minutes: 30 },
 *     "slow-cooked-stew": { hours: 6 }
 *   }
 *   
 *   const time = times[dish]
 *   return time ? duration(time) : null
 * }
 * 
 * // Academic terms
 * const academicPeriods = {
 *   semester: duration({ weeks: 16 }),
 *   quarter: duration({ weeks: 10 }),
 *   trimester: duration({ weeks: 12 }),
 *   summerSession: duration({ weeks: 8 })
 * }
 * 
 * // Video/audio durations
 * function parseMediaDuration(
 *   hours: number,
 *   minutes: number,
 *   seconds: number,
 *   frames: number = 0,
 *   fps: number = 30
 * ): Temporal.Duration | null {
 *   const frameSeconds = frames / fps
 *   return duration({
 *     hours,
 *     minutes,
 *     seconds: seconds + frameSeconds
 *   })
 * }
 * 
 * const movieLength = parseMediaDuration(2, 15, 30, 12, 24)
 * // 2h 15m 30.5s (12 frames at 24fps)
 * 
 * // Comparing durations
 * const dur1 = duration({ hours: 2, minutes: 30 })
 * const dur2 = duration({ minutes: 150 })
 * // Both represent 2.5 hours
 * 
 * // Total duration from components
 * function sumDurations(
 *   durations: Array<Temporal.Duration>
 * ): Temporal.Duration {
 *   return durations.reduce(
 *     (total, d) => total.add(d),
 *     Temporal.Duration.from({})
 *   )
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Flexible - Accepts any combination of time units
 * @property Safe - Returns null for invalid inputs
 * @property Negative - Supports negative values for subtraction
 */
const duration = (
	units: {
		years?: number
		months?: number
		weeks?: number
		days?: number
		hours?: number
		minutes?: number
		seconds?: number
		milliseconds?: number
		microseconds?: number
		nanoseconds?: number
	} | null | undefined
): Temporal.Duration | null => {
	if (units == null) {
		return null
	}
	
	try {
		// Temporal.Duration.from handles the conversion
		return Temporal.Duration.from(units)
	} catch {
		return null
	}
}

export default duration