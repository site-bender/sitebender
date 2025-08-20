/**
 * Adds minutes to a Temporal PlainTime, PlainDateTime, or ZonedDateTime
 * 
 * Immutably adds the specified number of minutes to a time or datetime.
 * Returns a new Temporal object with the minutes added. Negative values
 * subtract minutes. Handles hour and day boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (minutes) => (time) => result
 * @param minutes - Number of minutes to add (negative to subtract)
 * @param time - The PlainTime, PlainDateTime, or ZonedDateTime to add minutes to
 * @returns New time/datetime with minutes added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:00")
 * addMinutes(15)(time)                    // PlainTime 10:45:00
 * addMinutes(30)(time)                    // PlainTime 11:00:00
 * addMinutes(-15)(time)                   // PlainTime 10:15:00
 * addMinutes(90)(time)                    // PlainTime 12:00:00
 * 
 * // Hour boundary crossing
 * const nearHour = Temporal.PlainTime.from("10:55:00")
 * addMinutes(10)(nearHour)                // PlainTime 11:05:00
 * addMinutes(65)(nearHour)                // PlainTime 12:00:00
 * 
 * // Day boundary with PlainTime (wraps)
 * const nearMidnight = Temporal.PlainTime.from("23:45:00")
 * addMinutes(30)(nearMidnight)            // PlainTime 00:15:00
 * addMinutes(-30)(Temporal.PlainTime.from("00:15:00")) // PlainTime 23:45:00
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T23:45:00")
 * addMinutes(15)(datetime)                // PlainDateTime 2024-03-16T00:00:00
 * addMinutes(30)(datetime)                // PlainDateTime 2024-03-16T00:15:00
 * addMinutes(-60)(datetime)               // PlainDateTime 2024-03-15T22:45:00
 * 
 * // Partial application for common intervals
 * const addQuarterHour = addMinutes(15)
 * const addHalfHour = addMinutes(30)
 * const add45Minutes = addMinutes(45)
 * const subtractFiveMinutes = addMinutes(-5)
 * 
 * const meeting = Temporal.PlainTime.from("14:00:00")
 * addQuarterHour(meeting)                 // PlainTime 14:15:00
 * addHalfHour(meeting)                    // PlainTime 14:30:00
 * add45Minutes(meeting)                   // PlainTime 14:45:00
 * 
 * // Meeting scheduling
 * function scheduleMeeting(
 *   start: Temporal.PlainDateTime,
 *   durationMinutes: number
 * ): Temporal.PlainDateTime | null {
 *   return addMinutes(durationMinutes)(start)
 * }
 * 
 * const meetingStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * scheduleMeeting(meetingStart, 30)       // PlainDateTime 2024-03-15T09:30:00
 * scheduleMeeting(meetingStart, 90)       // PlainDateTime 2024-03-15T10:30:00
 * 
 * // Break time calculations
 * const workPeriods = [
 *   { start: "09:00:00", duration: 90 },
 *   { start: "10:45:00", duration: 90 },
 *   { start: "13:00:00", duration: 90 },
 *   { start: "14:45:00", duration: 90 }
 * ].map(period => ({
 *   start: Temporal.PlainTime.from(period.start),
 *   end: addMinutes(period.duration)(Temporal.PlainTime.from(period.start))
 * }))
 * 
 * // Pomodoro timer
 * function pomodoroSchedule(
 *   start: Temporal.PlainTime,
 *   workMinutes: number = 25,
 *   breakMinutes: number = 5,
 *   cycles: number = 4
 * ): Array<{ type: string; time: Temporal.PlainTime | null }> {
 *   const schedule: Array<{ type: string; time: Temporal.PlainTime | null }> = []
 *   let current = start
 *   
 *   for (let i = 0; i < cycles; i++) {
 *     schedule.push({ type: "work", time: current })
 *     current = addMinutes(workMinutes)(current)
 *     
 *     if (current && i < cycles - 1) {
 *       schedule.push({ type: "break", time: current })
 *       current = addMinutes(breakMinutes)(current)
 *     }
 *   }
 *   
 *   return schedule
 * }
 * 
 * const pomodoro = pomodoroSchedule(Temporal.PlainTime.from("09:00:00"))
 * // [
 * //   { type: "work", time: 09:00 },
 * //   { type: "break", time: 09:25 },
 * //   { type: "work", time: 09:30 },
 * //   { type: "break", time: 09:55 },
 * //   ...
 * // ]
 * 
 * // Cooking timer
 * function getCookingSteps(
 *   start: Temporal.PlainTime,
 *   steps: Array<{ name: string; minutes: number }>
 * ): Array<{ name: string; time: Temporal.PlainTime | null }> {
 *   const timeline: Array<{ name: string; time: Temporal.PlainTime | null }> = []
 *   let currentTime = start
 *   
 *   for (const step of steps) {
 *     timeline.push({ name: step.name, time: currentTime })
 *     currentTime = addMinutes(step.minutes)(currentTime)
 *   }
 *   
 *   return timeline
 * }
 * 
 * const recipe = getCookingSteps(
 *   Temporal.PlainTime.from("18:00:00"),
 *   [
 *     { name: "Prep ingredients", minutes: 15 },
 *     { name: "Cook pasta", minutes: 12 },
 *     { name: "Make sauce", minutes: 20 },
 *     { name: "Combine and serve", minutes: 5 }
 *   ]
 * )
 * // Each step with its start time
 * 
 * // Appointment slots
 * function generateTimeSlots(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime,
 *   intervalMinutes: number
 * ): Array<Temporal.PlainTime> {
 *   const slots: Array<Temporal.PlainTime> = []
 *   let current: Temporal.PlainTime | null = start
 *   
 *   while (current && Temporal.PlainTime.compare(current, end) <= 0) {
 *     slots.push(current)
 *     current = addMinutes(intervalMinutes)(current)
 *   }
 *   
 *   return slots
 * }
 * 
 * const appointmentSlots = generateTimeSlots(
 *   Temporal.PlainTime.from("09:00:00"),
 *   Temporal.PlainTime.from("17:00:00"),
 *   30
 * )
 * // [09:00, 09:30, 10:00, 10:30, ..., 16:30, 17:00]
 * 
 * // Null handling
 * addMinutes(15)(null)                    // null
 * addMinutes(15)(undefined)               // null
 * addMinutes(15)("invalid")               // null
 * 
 * // Parking meter calculation
 * function getParkingExpiry(
 *   start: Temporal.PlainTime,
 *   paidMinutes: number
 * ): Temporal.PlainTime | null {
 *   return addMinutes(paidMinutes)(start)
 * }
 * 
 * const parkedAt = Temporal.PlainTime.from("14:30:00")
 * getParkingExpiry(parkedAt, 120)         // PlainTime 16:30:00
 * 
 * // Countdown timer
 * function getCountdownTimes(
 *   target: Temporal.PlainTime,
 *   intervals: Array<number>
 * ): Array<Temporal.PlainTime | null> {
 *   return intervals.map(mins => addMinutes(-mins)(target))
 * }
 * 
 * const eventTime = Temporal.PlainTime.from("20:00:00")
 * const reminders = getCountdownTimes(eventTime, [60, 30, 15, 5])
 * // [19:00, 19:30, 19:45, 19:55] - reminder times
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new time without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Works with time and datetime types
 */
const addMinutes = (minutes: number) => (
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (time == null) {
		return null
	}
	
	if (!(time instanceof Temporal.PlainTime) && 
	    !(time instanceof Temporal.PlainDateTime) &&
	    !(time instanceof Temporal.ZonedDateTime)) {
		return null
	}
	
	try {
		return time.add({ minutes })
	} catch {
		return null
	}
}

export default addMinutes