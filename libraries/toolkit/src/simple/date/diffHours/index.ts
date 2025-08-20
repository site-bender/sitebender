/**
 * Calculates the difference in hours between two times or datetimes
 * 
 * Computes the number of hours from the first time to the second time.
 * Returns a positive number if the second time is later, negative if
 * earlier. Works with PlainTime, PlainDateTime, and ZonedDateTime.
 * For PlainTime, assumes same day unless crossing midnight. Returns
 * null for invalid inputs.
 * 
 * @curried (from) => (to) => result
 * @param from - The starting time/datetime
 * @param to - The ending time/datetime
 * @returns Number of hours difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time1 = Temporal.PlainTime.from("09:00:00")
 * const time2 = Temporal.PlainTime.from("17:30:00")
 * diffHours(time1)(time2)                 // 8.5 hours
 * diffHours(time2)(time1)                 // -8.5 hours
 * diffHours(time1)(time1)                 // 0 hours
 * 
 * // Fractional hours
 * const start = Temporal.PlainTime.from("10:15:00")
 * const end = Temporal.PlainTime.from("14:45:00")
 * diffHours(start)(end)                   // 4.5 hours
 * 
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T17:30:00")
 * diffHours(dt1)(dt2)                     // 8.5 hours
 * 
 * // Crossing day boundary
 * const night = Temporal.PlainDateTime.from("2024-03-15T22:00:00")
 * const morning = Temporal.PlainDateTime.from("2024-03-16T06:00:00")
 * diffHours(night)(morning)               // 8 hours
 * 
 * // Multiple day span
 * const monday = Temporal.PlainDateTime.from("2024-03-11T09:00:00")
 * const wednesday = Temporal.PlainDateTime.from("2024-03-13T17:00:00")
 * diffHours(monday)(wednesday)            // 56 hours (2 days + 8 hours)
 * 
 * // With ZonedDateTime (handles DST)
 * const zoned1 = Temporal.ZonedDateTime.from(
 *   "2024-03-10T00:00:00-04:00[America/New_York]"
 * )
 * const zoned2 = Temporal.ZonedDateTime.from(
 *   "2024-03-10T06:00:00-04:00[America/New_York]"
 * )
 * diffHours(zoned1)(zoned2)               // Accounts for DST change
 * 
 * // Partial application for shift tracking
 * const shiftStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const hoursWorked = diffHours(shiftStart)
 * 
 * const shiftEnd = Temporal.PlainDateTime.from("2024-03-15T17:30:00")
 * hoursWorked(shiftEnd)                   // 8.5 hours
 * 
 * // Work hour calculation
 * function calculateWorkHours(
 *   clockIn: Temporal.PlainDateTime,
 *   clockOut: Temporal.PlainDateTime
 * ): number | null {
 *   return diffHours(clockIn)(clockOut)
 * }
 * 
 * const clockIn = Temporal.PlainDateTime.from("2024-03-15T08:45:00")
 * const clockOut = Temporal.PlainDateTime.from("2024-03-15T17:15:00")
 * calculateWorkHours(clockIn, clockOut)   // 8.5 hours
 * 
 * // Overtime calculation
 * function calculateOvertime(
 *   start: Temporal.PlainDateTime,
 *   end: Temporal.PlainDateTime,
 *   regularHours: number = 8
 * ): number {
 *   const totalHours = diffHours(start)(end)
 *   return totalHours && totalHours > regularHours 
 *     ? totalHours - regularHours 
 *     : 0
 * }
 * 
 * const overtimeStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const overtimeEnd = Temporal.PlainDateTime.from("2024-03-15T20:00:00")
 * calculateOvertime(overtimeStart, overtimeEnd)  // 3 hours overtime
 * 
 * // Meeting duration
 * function getMeetingHours(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime
 * ): number | null {
 *   return diffHours(start)(end)
 * }
 * 
 * const meetingStart = Temporal.PlainTime.from("14:00:00")
 * const meetingEnd = Temporal.PlainTime.from("15:30:00")
 * getMeetingHours(meetingStart, meetingEnd)  // 1.5 hours
 * 
 * // Flight duration
 * function getFlightDuration(
 *   departure: Temporal.ZonedDateTime,
 *   arrival: Temporal.ZonedDateTime
 * ): number | null {
 *   return diffHours(departure)(arrival)
 * }
 * 
 * const departure = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:00:00-04:00[America/New_York]"
 * )
 * const arrival = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-08:00[America/Los_Angeles]"
 * )
 * getFlightDuration(departure, arrival)   // Actual flight time in hours
 * 
 * // Time zone difference
 * function getTimeZoneDifference(
 *   time1: Temporal.PlainTime,
 *   time2: Temporal.PlainTime
 * ): number | null {
 *   // Assumes same day for PlainTime
 *   return diffHours(time1)(time2)
 * }
 * 
 * const londonTime = Temporal.PlainTime.from("15:00:00")
 * const newYorkTime = Temporal.PlainTime.from("10:00:00")
 * getTimeZoneDifference(newYorkTime, londonTime)  // 5 hours ahead
 * 
 * // Null handling
 * diffHours(null)(time2)                  // null
 * diffHours(time1)(null)                  // null
 * diffHours(null)(null)                   // null
 * 
 * // Parking duration
 * function getParkingHours(
 *   entryTime: Temporal.PlainDateTime,
 *   exitTime: Temporal.PlainDateTime
 * ): number {
 *   const hours = diffHours(entryTime)(exitTime)
 *   // Round up to next hour for billing
 *   return hours ? Math.ceil(hours) : 0
 * }
 * 
 * const parkedAt = Temporal.PlainDateTime.from("2024-03-15T10:15:00")
 * const leftAt = Temporal.PlainDateTime.from("2024-03-15T14:45:00")
 * getParkingHours(parkedAt, leftAt)       // 5 hours (rounded up from 4.5)
 * 
 * // Service level agreement
 * function getResponseTime(
 *   ticketCreated: Temporal.PlainDateTime,
 *   firstResponse: Temporal.PlainDateTime
 * ): number | null {
 *   return diffHours(ticketCreated)(firstResponse)
 * }
 * 
 * const ticket = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const response = Temporal.PlainDateTime.from("2024-03-15T11:30:00")
 * getResponseTime(ticket, response)       // 2.5 hours
 * 
 * // Battery life calculation
 * function getBatteryLife(
 *   startTime: Temporal.PlainDateTime,
 *   endTime: Temporal.PlainDateTime
 * ): string {
 *   const hours = diffHours(startTime)(endTime)
 *   if (hours === null) return "Unknown"
 *   
 *   const wholeHours = Math.floor(hours)
 *   const minutes = Math.round((hours - wholeHours) * 60)
 *   return `${wholeHours}h ${minutes}m`
 * }
 * 
 * const chargedAt = Temporal.PlainDateTime.from("2024-03-15T08:00:00")
 * const diedAt = Temporal.PlainDateTime.from("2024-03-15T15:45:00")
 * getBatteryLife(chargedAt, diedAt)       // "7h 45m"
 * 
 * // Billable hours rounding
 * function getBillableHours(
 *   start: Temporal.PlainDateTime,
 *   end: Temporal.PlainDateTime,
 *   minimumIncrement: number = 0.25  // 15-minute increments
 * ): number {
 *   const hours = diffHours(start)(end)
 *   if (!hours) return 0
 *   
 *   return Math.ceil(hours / minimumIncrement) * minimumIncrement
 * }
 * 
 * const workStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const workEnd = Temporal.PlainDateTime.from("2024-03-15T11:40:00")
 * getBillableHours(workStart, workEnd)    // 2.75 hours (rounded to 15-min)
 * 
 * // Machine runtime
 * function getMachineRuntime(
 *   startupTime: Temporal.PlainDateTime,
 *   shutdownTime: Temporal.PlainDateTime
 * ): { hours: number; cost: number } | null {
 *   const hours = diffHours(startupTime)(shutdownTime)
 *   if (hours === null) return null
 *   
 *   const hourlyRate = 50  // $50 per hour
 *   return {
 *     hours,
 *     cost: hours * hourlyRate
 *   }
 * }
 * 
 * // Study session tracking
 * function getStudyHours(
 *   sessions: Array<{ start: Temporal.PlainDateTime; end: Temporal.PlainDateTime }>
 * ): number {
 *   return sessions.reduce((total, session) => {
 *     const hours = diffHours(session.start)(session.end)
 *     return total + (hours || 0)
 *   }, 0)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Signed - Returns negative for past times, positive for future
 * @property Safe - Returns null for invalid inputs
 * @property Fractional - Returns decimal hours for partial hour differences
 */
const diffHours = (
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
) => (
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): number | null => {
	if (from == null || to == null) {
		return null
	}
	
	try {
		// Handle different Temporal types
		if (from instanceof Temporal.PlainTime && to instanceof Temporal.PlainTime) {
			// For PlainTime, calculate assuming same day
			// This will give negative values if 'to' appears earlier (assuming next day)
			const fromNs = from.hour * 3600e9 + from.minute * 60e9 + from.second * 1e9 + 
			               from.millisecond * 1e6 + from.microsecond * 1e3 + from.nanosecond
			const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 + 
			             to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
			const diffNs = toNs - fromNs
			return diffNs / 3600e9  // Convert nanoseconds to hours
		}
		
		if (from instanceof Temporal.PlainDateTime && to instanceof Temporal.PlainDateTime) {
			const duration = to.since(from, { largestUnit: 'hours' })
			return duration.hours + duration.minutes / 60 + duration.seconds / 3600 +
			       duration.milliseconds / 3600000 + duration.microseconds / 3600000000 +
			       duration.nanoseconds / 3600000000000
		}
		
		if (from instanceof Temporal.ZonedDateTime && to instanceof Temporal.ZonedDateTime) {
			const duration = to.since(from, { largestUnit: 'hours' })
			return duration.hours + duration.minutes / 60 + duration.seconds / 3600 +
			       duration.milliseconds / 3600000 + duration.microseconds / 3600000000 +
			       duration.nanoseconds / 3600000000000
		}
		
		// Type mismatch or unsupported types
		return null
	} catch {
		return null
	}
}

export default diffHours