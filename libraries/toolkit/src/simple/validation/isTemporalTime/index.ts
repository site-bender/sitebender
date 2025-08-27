/**
 * Checks if a value is a Temporal.PlainTime instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.PlainTime class. This is useful for runtime type checking
 * when working with Temporal API time objects. Returns true only for
 * actual Temporal.PlainTime instances, not for time strings or other
 * time-like values that could be converted to PlainTime.
 *
 * Validation rules:
 * - Must be an actual Temporal.PlainTime instance
 * - Not just time-like or convertible to PlainTime
 * - Returns false for null, undefined, or any non-PlainTime value
 * - Type narrows to Temporal.PlainTime when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.PlainTime, false otherwise
 * @example
 * ```typescript
 * // Valid Temporal.PlainTime instances
 * const time1 = Temporal.PlainTime.from("14:30:00")
 * const time2 = new Temporal.PlainTime(14, 30, 0)
 * const time3 = Temporal.Now.plainTimeISO()
 *
 * isTemporalTime(time1)  // true
 * isTemporalTime(time2)  // true
 * isTemporalTime(time3)  // true
 *
 * // Invalid - not PlainTime instances
 * isTemporalTime("14:30:00")                      // false (string)
 * isTemporalTime(new Date())                      // false (JS Date)
 * isTemporalTime({ hour: 14, minute: 30 })        // false (time-like object)
 * isTemporalTime(Temporal.PlainDateTime.from("2024-01-15T14:30:00")) // false
 * isTemporalTime(Temporal.PlainDate.from("2024-01-15")) // false
 * isTemporalTime(null)                            // false
 * isTemporalTime(undefined)                       // false
 * isTemporalTime(870)                             // false (minutes as number)
 *
 * // Type narrowing with TypeScript
 * function processTime(value: unknown): string {
 *   if (isTemporalTime(value)) {
 *     // TypeScript now knows value is Temporal.PlainTime
 *     return value.toString() // Can access PlainTime methods
 *   }
 *   return "Not a valid time"
 * }
 *
 * // Filtering mixed arrays
 * const mixedValues = [
 *   Temporal.PlainTime.from("09:00:00"),
 *   "09:00:00",
 *   new Date(),
 *   Temporal.PlainTime.from("17:30:00"),
 *   { hour: 12, minute: 0 },
 *   null,
 *   540 // minutes since midnight
 * ]
 *
 * const onlyPlainTimes = mixedValues.filter(isTemporalTime)
 * // [PlainTime("09:00:00"), PlainTime("17:30:00")]
 *
 * // Validation in function parameters
 * function addMinutesToTime(
 *   time: unknown,
 *   minutes: number
 * ): Temporal.PlainTime | null {
 *   if (!isTemporalTime(time)) {
 *     return null
 *   }
 *   return time.add({ minutes })
 * }
 *
 * const validTime = Temporal.PlainTime.from("14:30:00")
 * addMinutesToTime(validTime, 15)     // PlainTime("14:45:00")
 * addMinutesToTime("14:30:00", 15)    // null (string not accepted)
 *
 * // Strict type checking in APIs
 * function validateTimeInput(input: unknown): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (input === null || input === undefined) {
 *     return { valid: false, error: "Time is required" }
 *   }
 *
 *   if (!isTemporalTime(input)) {
 *     return {
 *       valid: false,
 *       error: "Must be a Temporal.PlainTime instance"
 *     }
 *   }
 *
 *   return { valid: true }
 * }
 *
 * // Conditional time formatting
 * function formatTimeValue(value: unknown): string {
 *   if (isTemporalTime(value)) {
 *     // Format as ISO time
 *     return value.toString()
 *   }
 *
 *   if (value instanceof Date) {
 *     // Extract time from JS Date
 *     const hours = String(value.getHours()).padStart(2, '0')
 *     const minutes = String(value.getMinutes()).padStart(2, '0')
 *     const seconds = String(value.getSeconds()).padStart(2, '0')
 *     return `${hours}:${minutes}:${seconds}`
 *   }
 *
 *   if (typeof value === "string") {
 *     // Assume it's already a time string
 *     return value
 *   }
 *
 *   return "Invalid time"
 * }
 *
 * // Extract time components safely
 * function getTimeInMinutes(value: unknown): number | null {
 *   if (!isTemporalTime(value)) {
 *     return null
 *   }
 *
 *   // Safe to access PlainTime properties
 *   return value.hour * 60 + value.minute
 * }
 *
 * // Business hours checking
 * interface BusinessHours {
 *   openTime: unknown
 *   closeTime: unknown
 * }
 *
 * function isWithinBusinessHours(
 *   time: unknown,
 *   hours: BusinessHours
 * ): boolean {
 *   if (!isTemporalTime(time) ||
 *       !isTemporalTime(hours.openTime) ||
 *       !isTemporalTime(hours.closeTime)) {
 *     return false
 *   }
 *
 *   return Temporal.PlainTime.compare(time, hours.openTime) >= 0 &&
 *          Temporal.PlainTime.compare(time, hours.closeTime) < 0
 * }
 *
 * // Schedule slot management
 * interface TimeSlot {
 *   startTime: unknown
 *   endTime: unknown
 *   isAvailable: boolean
 * }
 *
 * function getSlotDuration(slot: TimeSlot): number | null {
 *   if (!isTemporalTime(slot.startTime) || !isTemporalTime(slot.endTime)) {
 *     return null
 *   }
 *
 *   // Calculate duration in minutes
 *   const startMinutes = slot.startTime.hour * 60 + slot.startTime.minute
 *   const endMinutes = slot.endTime.hour * 60 + slot.endTime.minute
 *
 *   return endMinutes - startMinutes
 * }
 *
 * // Alarm/reminder system
 * interface Alarm {
 *   name: string
 *   time: unknown
 *   enabled: boolean
 * }
 *
 * function getNextAlarmTime(alarms: Array<Alarm>): Temporal.PlainTime | null {
 *   const validAlarms = alarms
 *     .filter(alarm => alarm.enabled && isTemporalTime(alarm.time))
 *     .map(alarm => alarm.time as Temporal.PlainTime)
 *     .sort(Temporal.PlainTime.compare)
 *
 *   return validAlarms.length > 0 ? validAlarms[0] : null
 * }
 *
 * // Time zone conversion helper
 * function formatTimeForDisplay(value: unknown, use24Hour: boolean): string {
 *   if (!isTemporalTime(value)) {
 *     return "--:--"
 *   }
 *
 *   if (use24Hour) {
 *     return value.toString().substring(0, 5) // HH:MM
 *   }
 *
 *   // Convert to 12-hour format
 *   const hour = value.hour
 *   const isPM = hour >= 12
 *   const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
 *   const minutes = String(value.minute).padStart(2, '0')
 *   const period = isPM ? 'PM' : 'AM'
 *
 *   return `${displayHour}:${minutes} ${period}`
 * }
 *
 * // Sorting time values
 * function sortTimes(values: Array<unknown>): Array<Temporal.PlainTime> {
 *   return values
 *     .filter(isTemporalTime)
 *     .sort(Temporal.PlainTime.compare)
 * }
 *
 * // Time range validation
 * function isTimeInRange(
 *   time: unknown,
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime
 * ): boolean {
 *   if (!isTemporalTime(time)) {
 *     return false
 *   }
 *
 *   // Handle ranges that cross midnight
 *   if (Temporal.PlainTime.compare(start, end) > 0) {
 *     // Range crosses midnight (e.g., 22:00 to 02:00)
 *     return Temporal.PlainTime.compare(time, start) >= 0 ||
 *            Temporal.PlainTime.compare(time, end) <= 0
 *   }
 *
 *   // Normal range
 *   return Temporal.PlainTime.compare(time, start) >= 0 &&
 *          Temporal.PlainTime.compare(time, end) <= 0
 * }
 *
 * // Serialization helper
 * function serializeTime(value: unknown): string {
 *   if (isTemporalTime(value)) {
 *     return JSON.stringify({
 *       type: "PlainTime",
 *       value: value.toString(),
 *       components: {
 *         hour: value.hour,
 *         minute: value.minute,
 *         second: value.second,
 *         millisecond: value.millisecond,
 *         microsecond: value.microsecond,
 *         nanosecond: value.nanosecond
 *       }
 *     })
 *   }
 *
 *   return JSON.stringify(value)
 * }
 *
 * // Factory pattern with validation
 * function createTimeOrNull(value: unknown): Temporal.PlainTime | null {
 *   if (isTemporalTime(value)) {
 *     return value // Already a PlainTime
 *   }
 *
 *   if (typeof value === "string") {
 *     try {
 *       return Temporal.PlainTime.from(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   if (typeof value === "object" && value !== null) {
 *     try {
 *       return Temporal.PlainTime.from(value as any)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   return null
 * }
 *
 * // Meeting duration calculator
 * interface Meeting {
 *   title: string
 *   startTime: unknown
 *   endTime: unknown
 * }
 *
 * function getMeetingDuration(meeting: Meeting): string {
 *   if (!isTemporalTime(meeting.startTime) ||
 *       !isTemporalTime(meeting.endTime)) {
 *     return "Invalid times"
 *   }
 *
 *   const startMinutes = meeting.startTime.hour * 60 + meeting.startTime.minute
 *   const endMinutes = meeting.endTime.hour * 60 + meeting.endTime.minute
 *   const durationMinutes = endMinutes - startMinutes
 *
 *   if (durationMinutes < 0) {
 *     return "End time before start time"
 *   }
 *
 *   const hours = Math.floor(durationMinutes / 60)
 *   const minutes = durationMinutes % 60
 *
 *   if (hours > 0 && minutes > 0) {
 *     return `${hours}h ${minutes}m`
 *   } else if (hours > 0) {
 *     return `${hours}h`
 *   } else {
 *     return `${minutes}m`
 *   }
 * }
 *
 * // Transit schedule validation
 * interface TransitStop {
 *   station: string
 *   arrivalTime: unknown
 *   departureTime: unknown
 * }
 *
 * function validateSchedule(stops: Array<TransitStop>): boolean {
 *   for (let i = 0; i < stops.length; i++) {
 *     const stop = stops[i]
 *
 *     if (!isTemporalTime(stop.arrivalTime) ||
 *         !isTemporalTime(stop.departureTime)) {
 *       return false
 *     }
 *
 *     // Departure should be after arrival
 *     if (Temporal.PlainTime.compare(stop.departureTime, stop.arrivalTime) < 0) {
 *       return false
 *     }
 *
 *     // Next arrival should be after previous departure
 *     if (i > 0) {
 *       const prevDeparture = stops[i - 1].departureTime
 *       if (isTemporalTime(prevDeparture) &&
 *           Temporal.PlainTime.compare(stop.arrivalTime, prevDeparture) < 0) {
 *         return false
 *       }
 *     }
 *   }
 *
 *   return true
 * }
 *
 * // Testing utilities
 * function assertIsPlainTime(
 *   value: unknown
 * ): asserts value is Temporal.PlainTime {
 *   if (!isTemporalTime(value)) {
 *     throw new Error("Expected Temporal.PlainTime instance")
 *   }
 * }
 *
 * // Use in tests
 * function testTimeOperation() {
 *   const result = someFunctionThatShouldReturnTime()
 *   assertIsPlainTime(result)
 *   // TypeScript now knows result is PlainTime
 *   expect(result.hour).toBeLessThan(24)
 *   expect(result.minute).toBeLessThan(60)
 * }
 *
 * // Shift pattern matching
 * interface ShiftPattern {
 *   name: string
 *   startTime: unknown
 *   endTime: unknown
 * }
 *
 * function findMatchingShift(
 *   time: unknown,
 *   patterns: Array<ShiftPattern>
 * ): ShiftPattern | null {
 *   if (!isTemporalTime(time)) {
 *     return null
 *   }
 *
 *   for (const pattern of patterns) {
 *     if (isTemporalTime(pattern.startTime) &&
 *         isTemporalTime(pattern.endTime)) {
 *       if (isTimeInRange(time, pattern.startTime, pattern.endTime)) {
 *         return pattern
 *       }
 *     }
 *   }
 *
 *   return null
 * }
 *
 * // Countdown timer
 * function getTimeUntil(targetTime: unknown): string {
 *   if (!isTemporalTime(targetTime)) {
 *     return "Invalid target time"
 *   }
 *
 *   const now = Temporal.Now.plainTimeISO()
 *   const nowMinutes = now.hour * 60 + now.minute
 *   const targetMinutes = targetTime.hour * 60 + targetTime.minute
 *
 *   let diffMinutes = targetMinutes - nowMinutes
 *   if (diffMinutes < 0) {
 *     diffMinutes += 24 * 60 // Add 24 hours if target is tomorrow
 *   }
 *
 *   const hours = Math.floor(diffMinutes / 60)
 *   const minutes = diffMinutes % 60
 *
 *   return `${hours}h ${minutes}m`
 * }
 * ```
 *
 * @predicate
 * @pure
 */
const isTemporalTime = (value: unknown): value is Temporal.PlainTime => {
	try {
		return value instanceof Temporal.PlainTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalTime
