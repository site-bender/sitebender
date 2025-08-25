/**
 * Checks if a value is a Temporal.PlainDateTime instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.PlainDateTime class. This is useful for runtime type checking
 * when working with Temporal API datetime objects. Returns true only for
 * actual Temporal.PlainDateTime instances, not for datetime strings or other
 * datetime-like values that could be converted to PlainDateTime.
 *
 * Validation rules:
 * - Must be an actual Temporal.PlainDateTime instance
 * - Not just datetime-like or convertible to PlainDateTime
 * - Returns false for null, undefined, or any non-PlainDateTime value
 * - Type narrows to Temporal.PlainDateTime when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.PlainDateTime, false otherwise
 * @example
 * ```typescript
 * // Valid Temporal.PlainDateTime instances
 * const dt1 = Temporal.PlainDateTime.from("2024-01-15T12:30:00")
 * const dt2 = new Temporal.PlainDateTime(2024, 1, 15, 12, 30, 0)
 * const dt3 = Temporal.Now.plainDateTimeISO()
 *
 * isTemporalDateTime(dt1)  // true
 * isTemporalDateTime(dt2)  // true
 * isTemporalDateTime(dt3)  // true
 *
 * // Invalid - not PlainDateTime instances
 * isTemporalDateTime("2024-01-15T12:30:00")       // false (string)
 * isTemporalDateTime(new Date("2024-01-15"))      // false (JS Date)
 * isTemporalDateTime(Temporal.PlainDate.from("2024-01-15")) // false (PlainDate)
 * isTemporalDateTime(Temporal.PlainTime.from("12:30:00"))   // false (PlainTime)
 * isTemporalDateTime(Temporal.ZonedDateTime.from({
 *   timeZone: "UTC",
 *   year: 2024,
 *   month: 1,
 *   day: 15,
 *   hour: 12
 * }))  // false (ZonedDateTime)
 * isTemporalDateTime(null)                        // false
 * isTemporalDateTime(undefined)                   // false
 * isTemporalDateTime(123)                         // false
 *
 * // Type narrowing with TypeScript
 * function processDateTime(value: unknown): string {
 *   if (isTemporalDateTime(value)) {
 *     // TypeScript now knows value is Temporal.PlainDateTime
 *     return value.toString() // Can access PlainDateTime methods
 *   }
 *   return "Not a valid datetime"
 * }
 *
 * // Filtering mixed arrays
 * const mixedValues = [
 *   Temporal.PlainDateTime.from("2024-01-15T10:00:00"),
 *   "2024-01-15T10:00:00",
 *   new Date(),
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDateTime.from("2024-02-20T14:30:00"),
 *   null,
 *   { year: 2024, month: 3, day: 25, hour: 12 }
 * ]
 *
 * const onlyPlainDateTimes = mixedValues.filter(isTemporalDateTime)
 * // [PlainDateTime("2024-01-15T10:00:00"), PlainDateTime("2024-02-20T14:30:00")]
 *
 * // Validation in function parameters
 * function addHoursToDateTime(
 *   dateTime: unknown,
 *   hours: number
 * ): Temporal.PlainDateTime | null {
 *   if (!isTemporalDateTime(dateTime)) {
 *     return null
 *   }
 *   return dateTime.add({ hours })
 * }
 *
 * const validDateTime = Temporal.PlainDateTime.from("2024-01-15T10:00:00")
 * addHoursToDateTime(validDateTime, 5)     // PlainDateTime("2024-01-15T15:00:00")
 * addHoursToDateTime("2024-01-15T10:00:00", 5)  // null (string not accepted)
 *
 * // Strict type checking in APIs
 * function validateApiTimestamp(input: unknown): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (input === null || input === undefined) {
 *     return { valid: false, error: "Timestamp is required" }
 *   }
 *
 *   if (!isTemporalDateTime(input)) {
 *     return {
 *       valid: false,
 *       error: "Must be a Temporal.PlainDateTime instance"
 *     }
 *   }
 *
 *   return { valid: true }
 * }
 *
 * // Conditional operations
 * function formatTimestamp(value: unknown): string {
 *   if (isTemporalDateTime(value)) {
 *     // Format as ISO datetime
 *     return value.toString()
 *   }
 *
 *   if (value instanceof Date) {
 *     // Convert JS Date to ISO string
 *     return value.toISOString()
 *   }
 *
 *   if (typeof value === "string") {
 *     // Assume it's already a datetime string
 *     return value
 *   }
 *
 *   return "Invalid datetime"
 * }
 *
 * // Extracting components safely
 * function getTimeComponents(value: unknown): {
 *   hour: number
 *   minute: number
 *   second: number
 * } | null {
 *   if (!isTemporalDateTime(value)) {
 *     return null
 *   }
 *
 *   // Safe to access PlainDateTime properties
 *   return {
 *     hour: value.hour,
 *     minute: value.minute,
 *     second: value.second
 *   }
 * }
 *
 * // Comparing different Temporal types
 * function categorizeTemporalValue(value: unknown): string {
 *   if (isTemporalDateTime(value)) {
 *     return "PlainDateTime"
 *   }
 *
 *   if (value instanceof Temporal.PlainDate) {
 *     return "PlainDate"
 *   }
 *
 *   if (value instanceof Temporal.PlainTime) {
 *     return "PlainTime"
 *   }
 *
 *   if (value instanceof Temporal.ZonedDateTime) {
 *     return "ZonedDateTime"
 *   }
 *
 *   if (value instanceof Temporal.Instant) {
 *     return "Instant"
 *   }
 *
 *   return "Not a Temporal type"
 * }
 *
 * // Working with event timestamps
 * interface Event {
 *   name: string
 *   timestamp?: unknown
 * }
 *
 * function getEventHour(event: Event): number | null {
 *   if (event.timestamp && isTemporalDateTime(event.timestamp)) {
 *     return event.timestamp.hour
 *   }
 *   return null
 * }
 *
 * // Data transformation pipeline
 * function processTimestamps(values: Array<unknown>): Array<{
 *   original: unknown
 *   isValid: boolean
 *   date?: string
 *   time?: string
 * }> {
 *   return values.map(value => {
 *     if (isTemporalDateTime(value)) {
 *       return {
 *         original: value,
 *         isValid: true,
 *         date: value.toPlainDate().toString(),
 *         time: value.toPlainTime().toString()
 *       }
 *     }
 *
 *     return {
 *       original: value,
 *       isValid: false
 *     }
 *   })
 * }
 *
 * // DateTime arithmetic operations
 * function isSameDay(
 *   dt1: unknown,
 *   dt2: unknown
 * ): boolean {
 *   if (!isTemporalDateTime(dt1) || !isTemporalDateTime(dt2)) {
 *     return false
 *   }
 *
 *   return dt1.year === dt2.year &&
 *          dt1.month === dt2.month &&
 *          dt1.day === dt2.day
 * }
 *
 * // Sorting datetime values
 * function sortDateTimes(values: Array<unknown>): Array<Temporal.PlainDateTime> {
 *   return values
 *     .filter(isTemporalDateTime)
 *     .sort(Temporal.PlainDateTime.compare)
 * }
 *
 * // DateTime range validation
 * function isDateTimeInRange(
 *   dateTime: unknown,
 *   start: Temporal.PlainDateTime,
 *   end: Temporal.PlainDateTime
 * ): boolean {
 *   if (!isTemporalDateTime(dateTime)) {
 *     return false
 *   }
 *
 *   return Temporal.PlainDateTime.compare(dateTime, start) >= 0 &&
 *          Temporal.PlainDateTime.compare(dateTime, end) <= 0
 * }
 *
 * // Serialization helper
 * function serializeTimestamp(value: unknown): string {
 *   if (isTemporalDateTime(value)) {
 *     return JSON.stringify({
 *       type: "PlainDateTime",
 *       value: value.toString(),
 *       components: {
 *         date: value.toPlainDate().toString(),
 *         time: value.toPlainTime().toString()
 *       }
 *     })
 *   }
 *
 *   return JSON.stringify(value)
 * }
 *
 * // Factory pattern with validation
 * function createDateTimeOrNull(value: unknown): Temporal.PlainDateTime | null {
 *   if (isTemporalDateTime(value)) {
 *     return value // Already a PlainDateTime
 *   }
 *
 *   if (typeof value === "string") {
 *     try {
 *       return Temporal.PlainDateTime.from(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   if (value instanceof Date) {
 *     try {
 *       const isoString = value.toISOString()
 *       return Temporal.PlainDateTime.from(isoString.replace("Z", ""))
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   return null
 * }
 *
 * // Meeting scheduler validation
 * interface MeetingSlot {
 *   startTime: unknown
 *   duration: number // minutes
 * }
 *
 * function calculateEndTime(slot: MeetingSlot): Temporal.PlainDateTime | null {
 *   if (!isTemporalDateTime(slot.startTime)) {
 *     return null
 *   }
 *
 *   return slot.startTime.add({ minutes: slot.duration })
 * }
 *
 * // Log entry processing
 * function extractLogTimestamp(entry: {
 *   timestamp: unknown
 *   message: string
 * }): string {
 *   if (!isTemporalDateTime(entry.timestamp)) {
 *     return "Invalid timestamp"
 *   }
 *
 *   // Format: [YYYY-MM-DD HH:MM:SS]
 *   const dt = entry.timestamp
 *   const date = `${dt.year}-${String(dt.month).padStart(2, '0')}-${String(dt.day).padStart(2, '0')}`
 *   const time = `${String(dt.hour).padStart(2, '0')}:${String(dt.minute).padStart(2, '0')}:${String(dt.second).padStart(2, '0')}`
 *
 *   return `[${date} ${time}]`
 * }
 *
 * // Testing utilities
 * function assertIsPlainDateTime(
 *   value: unknown
 * ): asserts value is Temporal.PlainDateTime {
 *   if (!isTemporalDateTime(value)) {
 *     throw new Error("Expected Temporal.PlainDateTime instance")
 *   }
 * }
 *
 * // Use in tests
 * function testDateTimeOperation() {
 *   const result = someFunctionThatShouldReturnDateTime()
 *   assertIsPlainDateTime(result)
 *   // TypeScript now knows result is PlainDateTime
 *   expect(result.hour).toBe(12)
 *   expect(result.minute).toBe(30)
 * }
 *
 * // Business hours calculation
 * function isWithinBusinessHours(value: unknown): boolean {
 *   if (!isTemporalDateTime(value)) {
 *     return false
 *   }
 *
 *   const hour = value.hour
 *   const dayOfWeek = value.dayOfWeek
 *
 *   // Monday-Friday, 9 AM - 5 PM
 *   return dayOfWeek >= 1 && dayOfWeek <= 5 &&
 *          hour >= 9 && hour < 17
 * }
 *
 * // Batch processing timestamps
 * function groupByHour(
 *   timestamps: Array<unknown>
 * ): Map<number, Array<Temporal.PlainDateTime>> {
 *   const groups = new Map<number, Array<Temporal.PlainDateTime>>()
 *
 *   for (const ts of timestamps) {
 *     if (isTemporalDateTime(ts)) {
 *       const hour = ts.hour
 *       if (!groups.has(hour)) {
 *         groups.set(hour, [])
 *       }
 *       groups.get(hour)!.push(ts)
 *     }
 *   }
 *
 *   return groups
 * }
 * ```
 *
 * @property Type-guard - Narrows type to Temporal.PlainDateTime when true
 * @property Pure - No side effects, only checks type
 * @property Strict - Only returns true for actual PlainDateTime instances
 * @property Safe - Handles any input type without throwing
 * @property Runtime - Provides runtime type checking for Temporal types
 */
const isTemporalDateTime = (
	value: unknown,
): value is Temporal.PlainDateTime => {
	try {
		return value instanceof Temporal.PlainDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalDateTime
