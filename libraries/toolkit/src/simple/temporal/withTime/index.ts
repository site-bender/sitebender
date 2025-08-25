/**
 * Combines PlainDate with PlainTime to create PlainDateTime
 *
 * Merges a date and time into a single datetime object. The resulting PlainDateTime
 * represents the specified time on the given date. If no time is provided, defaults
 * to midnight (00:00:00). This is useful for scheduling, combining user inputs,
 * and creating precise timestamps. This is a curried function for easy composition.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (time) => (date) => PlainDateTime
 * @param time - The PlainTime to combine (or "00:00:00" if null)
 * @param date - The PlainDate to combine with
 * @returns Combined PlainDateTime, or null if invalid
 * @example
 * ```typescript
 * // Basic combination
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const time = Temporal.PlainTime.from("14:30:45")
 * withTime(time)(date)                    // PlainDateTime 2024-03-15T14:30:45
 *
 * // Different times with same date
 * const morning = Temporal.PlainTime.from("09:00:00")
 * const afternoon = Temporal.PlainTime.from("14:00:00")
 * const evening = Temporal.PlainTime.from("18:30:00")
 *
 * withTime(morning)(date)                 // PlainDateTime 2024-03-15T09:00:00
 * withTime(afternoon)(date)               // PlainDateTime 2024-03-15T14:00:00
 * withTime(evening)(date)                 // PlainDateTime 2024-03-15T18:30:00
 *
 * // With precise time
 * const preciseTime = Temporal.PlainTime.from("12:34:56.789012345")
 * withTime(preciseTime)(date)             // PlainDateTime 2024-03-15T12:34:56.789012345
 *
 * // Default to midnight when time is null
 * withTime(null)(date)                    // PlainDateTime 2024-03-15T00:00:00
 * withTime(undefined)(date)               // PlainDateTime 2024-03-15T00:00:00
 *
 * // From string time
 * withTime("14:30:00")(date)             // PlainDateTime 2024-03-15T14:30:00
 * withTime("09:15")(date)                 // PlainDateTime 2024-03-15T09:15:00
 *
 * // Appointment scheduler
 * function scheduleAppointment(
 *   date: Temporal.PlainDate,
 *   time: Temporal.PlainTime
 * ): Temporal.PlainDateTime | null {
 *   return withTime(time)(date)
 * }
 *
 * const appointmentDate = Temporal.PlainDate.from("2024-03-20")
 * const appointmentTime = Temporal.PlainTime.from("10:30:00")
 * scheduleAppointment(appointmentDate, appointmentTime)
 * // PlainDateTime 2024-03-20T10:30:00
 *
 * // Batch datetime creation
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-03-16"),
 *   Temporal.PlainDate.from("2024-03-17")
 * ]
 *
 * const at9AM = withTime(Temporal.PlainTime.from("09:00:00"))
 * const morningMeetings = dates.map(at9AM)
 * // [2024-03-15T09:00:00, 2024-03-16T09:00:00, 2024-03-17T09:00:00]
 *
 * // Daily schedule builder
 * function buildDailySchedule(
 *   date: Temporal.PlainDate,
 *   times: Array<{ event: string; time: Temporal.PlainTime }>
 * ): Array<{ event: string; datetime: Temporal.PlainDateTime | null }> {
 *   return times.map(({ event, time }) => ({
 *     event,
 *     datetime: withTime(time)(date)
 *   }))
 * }
 *
 * const workday = Temporal.PlainDate.from("2024-03-15")
 * const schedule = [
 *   { event: "Stand-up", time: Temporal.PlainTime.from("09:00:00") },
 *   { event: "Lunch", time: Temporal.PlainTime.from("12:00:00") },
 *   { event: "Review", time: Temporal.PlainTime.from("16:00:00") }
 * ]
 * buildDailySchedule(workday, schedule)
 * // Array of events with combined datetimes
 *
 * // Invalid input handling
 * withTime(time)(null)                    // null
 * withTime(time)(undefined)               // null
 * withTime("invalid")(date)               // null (invalid time string)
 * withTime(time)("2024-03-15")            // null (string date, not PlainDate)
 *
 * // Event series generator
 * function generateEventSeries(
 *   startDate: Temporal.PlainDate,
 *   eventTime: Temporal.PlainTime,
 *   count: number,
 *   intervalDays: number = 1
 * ): Array<Temporal.PlainDateTime | null> {
 *   const events: Array<Temporal.PlainDateTime | null> = []
 *   const combineWithTime = withTime(eventTime)
 *
 *   for (let i = 0; i < count; i++) {
 *     const eventDate = startDate.add({ days: i * intervalDays })
 *     events.push(combineWithTime(eventDate))
 *   }
 *
 *   return events
 * }
 *
 * const seriesStart = Temporal.PlainDate.from("2024-03-15")
 * const dailyTime = Temporal.PlainTime.from("10:00:00")
 * generateEventSeries(seriesStart, dailyTime, 5, 1)
 * // 5 daily events at 10:00 AM
 *
 * generateEventSeries(seriesStart, dailyTime, 4, 7)
 * // 4 weekly events at 10:00 AM
 *
 * // Alarm setter
 * function setDailyAlarm(
 *   dates: Array<Temporal.PlainDate>,
 *   alarmTime: Temporal.PlainTime
 * ): Array<Temporal.PlainDateTime | null> {
 *   const setAlarm = withTime(alarmTime)
 *   return dates.map(setAlarm)
 * }
 *
 * const weekdays = [
 *   Temporal.PlainDate.from("2024-03-18"),  // Monday
 *   Temporal.PlainDate.from("2024-03-19"),  // Tuesday
 *   Temporal.PlainDate.from("2024-03-20"),  // Wednesday
 *   Temporal.PlainDate.from("2024-03-21"),  // Thursday
 *   Temporal.PlainDate.from("2024-03-22")   // Friday
 * ]
 * const wakeUpTime = Temporal.PlainTime.from("07:00:00")
 * setDailyAlarm(weekdays, wakeUpTime)
 * // Alarms for each weekday at 7:00 AM
 *
 * // Meeting time combiner
 * function combineDateAndTime(
 *   dateStr: string,
 *   timeStr: string
 * ): Temporal.PlainDateTime | null {
 *   try {
 *     const date = Temporal.PlainDate.from(dateStr)
 *     const time = Temporal.PlainTime.from(timeStr)
 *     return withTime(time)(date)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * combineDateAndTime("2024-03-15", "14:30:00")  // PlainDateTime 2024-03-15T14:30:00
 * combineDateAndTime("2024-03-15", "2:30 PM")   // null (invalid time format)
 *
 * // Store hours setter
 * function setStoreHours(
 *   date: Temporal.PlainDate,
 *   openTime: Temporal.PlainTime,
 *   closeTime: Temporal.PlainTime
 * ): { open: Temporal.PlainDateTime | null; close: Temporal.PlainDateTime | null } {
 *   return {
 *     open: withTime(openTime)(date),
 *     close: withTime(closeTime)(date)
 *   }
 * }
 *
 * const businessDay = Temporal.PlainDate.from("2024-03-15")
 * const opening = Temporal.PlainTime.from("09:00:00")
 * const closing = Temporal.PlainTime.from("21:00:00")
 * setStoreHours(businessDay, opening, closing)
 * // { open: 2024-03-15T09:00:00, close: 2024-03-15T21:00:00 }
 *
 * // Deadline creator
 * function createDeadline(
 *   dueDate: Temporal.PlainDate,
 *   dueTime: Temporal.PlainTime | null = null
 * ): Temporal.PlainDateTime | null {
 *   // Default to end of day if no time specified
 *   const time = dueTime ?? Temporal.PlainTime.from("23:59:59")
 *   return withTime(time)(dueDate)
 * }
 *
 * const projectDue = Temporal.PlainDate.from("2024-03-31")
 * createDeadline(projectDue)              // 2024-03-31T23:59:59
 * createDeadline(projectDue, Temporal.PlainTime.from("17:00:00"))  // 2024-03-31T17:00:00
 *
 * // Shift schedule creator
 * function createShiftSchedule(
 *   weekStart: Temporal.PlainDate,
 *   shifts: Array<{ day: number; startTime: string; endTime: string }>
 * ): Array<{ start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null }> {
 *   return shifts.map(shift => {
 *     const shiftDate = weekStart.add({ days: shift.day })
 *     const startTime = Temporal.PlainTime.from(shift.startTime)
 *     const endTime = Temporal.PlainTime.from(shift.endTime)
 *
 *     return {
 *       start: withTime(startTime)(shiftDate),
 *       end: withTime(endTime)(shiftDate)
 *     }
 *   })
 * }
 *
 * const weekStart = Temporal.PlainDate.from("2024-03-18")
 * const weeklyShifts = [
 *   { day: 0, startTime: "09:00:00", endTime: "17:00:00" },  // Monday
 *   { day: 2, startTime: "13:00:00", endTime: "21:00:00" },  // Wednesday
 *   { day: 4, startTime: "09:00:00", endTime: "17:00:00" }   // Friday
 * ]
 * createShiftSchedule(weekStart, weeklyShifts)
 * // Array of shift start/end times
 *
 * // Time zone preparation
 * function prepareForTimezone(
 *   date: Temporal.PlainDate,
 *   time: Temporal.PlainTime,
 *   timezone: string
 * ): Temporal.ZonedDateTime | null {
 *   const datetime = withTime(time)(date)
 *   if (!datetime) return null
 *
 *   return datetime.toZonedDateTime(timezone)
 * }
 *
 * const meetingDate = Temporal.PlainDate.from("2024-03-15")
 * const meetingTime = Temporal.PlainTime.from("14:00:00")
 * prepareForTimezone(meetingDate, meetingTime, "America/New_York")
 * // ZonedDateTime 2024-03-15T14:00:00-04:00[America/New_York]
 * ```
 * @property Curried - Takes time first for easy partial application
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Accepts PlainTime or string, defaults to midnight
 * @property Preserves - Maintains precision of time components
 */
const withTime = (time: Temporal.PlainTime | string | null | undefined) =>
(
	date: Temporal.PlainDate | null | undefined,
): Temporal.PlainDateTime | null => {
	if (date == null) {
		return null
	}

	// Validate date is a PlainDate
	if (!(date instanceof Temporal.PlainDate)) {
		return null
	}

	try {
		// Handle null/undefined time - default to midnight
		if (time == null) {
			return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// Handle PlainTime
		if (time instanceof Temporal.PlainTime) {
			return date.toPlainDateTime(time)
		}

		// Handle string - try to parse as PlainTime
		if (typeof time === "string") {
			try {
				const plainTime = Temporal.PlainTime.from(time)
				return date.toPlainDateTime(plainTime)
			} catch {
				return null
			}
		}

		return null
	} catch {
		return null
	}
}

export default withTime
