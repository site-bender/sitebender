/**
 * Gets the hour component from a Temporal time or datetime
 * 
 * Extracts the hour component (0-23) from a Temporal PlainTime, PlainDateTime,
 * or ZonedDateTime. Returns hours in 24-hour format where 0 represents midnight
 * and 23 represents 11 PM. Returns null for invalid inputs to support safe
 * error handling.
 * 
 * @param time - The Temporal object to get hour from
 * @returns The hour (0-23), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const morning = Temporal.PlainTime.from("09:30:00")
 * getHour(morning)                        // 9
 * 
 * const afternoon = Temporal.PlainTime.from("14:45:30")
 * getHour(afternoon)                      // 14 (2:45 PM)
 * 
 * const evening = Temporal.PlainTime.from("20:15:00")
 * getHour(evening)                        // 20 (8:15 PM)
 * 
 * const midnight = Temporal.PlainTime.from("00:00:00")
 * getHour(midnight)                       // 0
 * 
 * const almostMidnight = Temporal.PlainTime.from("23:59:59")
 * getHour(almostMidnight)                 // 23
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * getHour(datetime)                       // 10
 * 
 * const earlyMorning = Temporal.PlainDateTime.from("2024-03-15T03:15:00")
 * getHour(earlyMorning)                   // 3
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:30:00-04:00[America/New_York]"
 * )
 * getHour(zonedDateTime)                  // 16 (4:30 PM local time)
 * 
 * // Different time zones show local hour
 * const tokyo = Temporal.ZonedDateTime.from(
 *   "2024-03-15T09:00:00+09:00[Asia/Tokyo]"
 * )
 * getHour(tokyo)                          // 9 (9 AM Tokyo time)
 * 
 * const london = Temporal.ZonedDateTime.from(
 *   "2024-03-15T00:00:00+00:00[Europe/London]"
 * )
 * getHour(london)                         // 0 (midnight London time)
 * 
 * // 12-hour format conversion
 * function to12HourFormat(time: Temporal.PlainTime): {
 *   hour: number,
 *   period: "AM" | "PM"
 * } | null {
 *   const hour24 = getHour(time)
 *   if (hour24 === null) return null
 *   
 *   const period = hour24 < 12 ? "AM" : "PM"
 *   const hour12 = hour24 === 0 ? 12 : 
 *                  hour24 > 12 ? hour24 - 12 : 
 *                  hour24
 *   
 *   return { hour: hour12, period }
 * }
 * 
 * to12HourFormat(Temporal.PlainTime.from("00:30:00"))  // { hour: 12, period: "AM" }
 * to12HourFormat(Temporal.PlainTime.from("13:45:00"))  // { hour: 1, period: "PM" }
 * to12HourFormat(Temporal.PlainTime.from("12:00:00"))  // { hour: 12, period: "PM" }
 * 
 * // Time of day classification
 * function getTimeOfDay(time: Temporal.PlainTime): string {
 *   const hour = getHour(time)
 *   if (hour === null) return "Unknown"
 *   
 *   if (hour < 6) return "Night"
 *   if (hour < 12) return "Morning"
 *   if (hour < 18) return "Afternoon"
 *   return "Evening"
 * }
 * 
 * getTimeOfDay(Temporal.PlainTime.from("04:30:00"))    // "Night"
 * getTimeOfDay(Temporal.PlainTime.from("08:00:00"))    // "Morning"
 * getTimeOfDay(Temporal.PlainTime.from("14:00:00"))    // "Afternoon"
 * getTimeOfDay(Temporal.PlainTime.from("19:30:00"))    // "Evening"
 * 
 * // Business hours check
 * function isBusinessHours(
 *   time: Temporal.PlainTime,
 *   openHour: number = 9,
 *   closeHour: number = 17
 * ): boolean {
 *   const hour = getHour(time)
 *   if (hour === null) return false
 *   
 *   return hour >= openHour && hour < closeHour
 * }
 * 
 * isBusinessHours(Temporal.PlainTime.from("09:00:00")) // true
 * isBusinessHours(Temporal.PlainTime.from("12:30:00")) // true
 * isBusinessHours(Temporal.PlainTime.from("17:00:00")) // false (5 PM)
 * isBusinessHours(Temporal.PlainTime.from("08:59:59")) // false
 * 
 * // Null handling
 * getHour(null)                           // null
 * getHour(undefined)                      // null
 * getHour("10:30:00")                    // null (string, not Temporal object)
 * getHour(new Date())                     // null (Date, not Temporal)
 * 
 * // Hourly schedule builder
 * function getHourlySchedule(
 *   startTime: Temporal.PlainTime,
 *   endTime: Temporal.PlainTime
 * ): Array<number> {
 *   const startHour = getHour(startTime)
 *   const endHour = getHour(endTime)
 *   if (startHour === null || endHour === null) return []
 *   
 *   const hours: Array<number> = []
 *   for (let h = startHour; h <= endHour; h++) {
 *     hours.push(h)
 *   }
 *   
 *   return hours
 * }
 * 
 * const workStart = Temporal.PlainTime.from("09:00:00")
 * const workEnd = Temporal.PlainTime.from("17:00:00")
 * getHourlySchedule(workStart, workEnd)   // [9, 10, 11, 12, 13, 14, 15, 16, 17]
 * 
 * // Peak hours detection
 * function isPeakHour(time: Temporal.PlainTime): boolean {
 *   const hour = getHour(time)
 *   if (hour === null) return false
 *   
 *   // Morning peak: 7-9 AM, Evening peak: 5-7 PM
 *   return (hour >= 7 && hour < 9) || (hour >= 17 && hour < 19)
 * }
 * 
 * isPeakHour(Temporal.PlainTime.from("08:30:00"))  // true (morning peak)
 * isPeakHour(Temporal.PlainTime.from("18:00:00"))  // true (evening peak)
 * isPeakHour(Temporal.PlainTime.from("14:00:00"))  // false
 * 
 * // Shift work calculator
 * function getShift(time: Temporal.PlainTime): string {
 *   const hour = getHour(time)
 *   if (hour === null) return "Unknown"
 *   
 *   if (hour >= 6 && hour < 14) return "Morning Shift"
 *   if (hour >= 14 && hour < 22) return "Evening Shift"
 *   return "Night Shift"
 * }
 * 
 * getShift(Temporal.PlainTime.from("07:00:00"))    // "Morning Shift"
 * getShift(Temporal.PlainTime.from("15:00:00"))    // "Evening Shift"
 * getShift(Temporal.PlainTime.from("23:00:00"))    // "Night Shift"
 * 
 * // Time zone aware meeting scheduler
 * function getBestMeetingHour(
 *   zones: Array<string>,
 *   preferredStart: number = 9,
 *   preferredEnd: number = 17
 * ): number | null {
 *   const now = Temporal.Now.instant()
 *   const hours = new Map<number, number>()
 *   
 *   for (const zone of zones) {
 *     const zdt = now.toZonedDateTimeISO(zone)
 *     for (let h = preferredStart; h < preferredEnd; h++) {
 *       const testTime = zdt.with({ hour: h })
 *       const utcHour = testTime.toInstant().toZonedDateTimeISO("UTC").hour
 *       hours.set(utcHour, (hours.get(utcHour) ?? 0) + 1)
 *     }
 *   }
 *   
 *   // Find hour that works for most zones
 *   let bestHour = -1
 *   let maxCount = 0
 *   for (const [hour, count] of hours) {
 *     if (count > maxCount) {
 *       maxCount = count
 *       bestHour = hour
 *     }
 *   }
 *   
 *   return bestHour >= 0 ? bestHour : null
 * }
 * 
 * // Grouping times by hour
 * function groupByHour(
 *   times: Array<Temporal.PlainTime>
 * ): Map<number, Array<Temporal.PlainTime>> {
 *   const grouped = new Map<number, Array<Temporal.PlainTime>>()
 *   
 *   for (const time of times) {
 *     const hour = getHour(time)
 *     if (hour !== null) {
 *       const group = grouped.get(hour) ?? []
 *       group.push(time)
 *       grouped.set(hour, group)
 *     }
 *   }
 *   
 *   return grouped
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property 24-hour - Returns hours in 24-hour format (0-23)
 */
const getHour = (
	time: Temporal.PlainTime | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): number | null => {
	if (time == null) {
		return null
	}
	
	if (
		!(time instanceof Temporal.PlainTime) &&
		!(time instanceof Temporal.PlainDateTime) &&
		!(time instanceof Temporal.ZonedDateTime)
	) {
		return null
	}
	
	try {
		return time.hour
	} catch {
		return null
	}
}

export default getHour