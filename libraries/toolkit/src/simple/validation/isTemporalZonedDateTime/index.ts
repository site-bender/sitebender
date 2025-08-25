/**
 * Checks if a value is a Temporal.ZonedDateTime instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.ZonedDateTime class. This is useful for runtime type checking
 * when working with Temporal API zoned datetime objects (datetime with timezone).
 * Returns true only for actual Temporal.ZonedDateTime instances, not for
 * datetime strings or other values that could be converted to ZonedDateTime.
 *
 * Validation rules:
 * - Must be an actual Temporal.ZonedDateTime instance
 * - Not just datetime-like or convertible to ZonedDateTime
 * - Returns false for null, undefined, or any non-ZonedDateTime value
 * - Type narrows to Temporal.ZonedDateTime when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.ZonedDateTime, false otherwise
 * @example
 * ```typescript
 * // Valid Temporal.ZonedDateTime instances
 * const zdt1 = Temporal.ZonedDateTime.from("2024-01-15T12:30:00-05:00[America/New_York]")
 * const zdt2 = Temporal.ZonedDateTime.from({
 *   timeZone: "Europe/London",
 *   year: 2024,
 *   month: 1,
 *   day: 15,
 *   hour: 12,
 *   minute: 30
 * })
 * const zdt3 = Temporal.Now.zonedDateTimeISO()
 *
 * isTemporalZonedDateTime(zdt1)  // true
 * isTemporalZonedDateTime(zdt2)  // true
 * isTemporalZonedDateTime(zdt3)  // true
 *
 * // Invalid - not ZonedDateTime instances
 * isTemporalZonedDateTime("2024-01-15T12:30:00-05:00[America/New_York]") // false (string)
 * isTemporalZonedDateTime(new Date())                    // false (JS Date)
 * isTemporalZonedDateTime(Temporal.PlainDateTime.from("2024-01-15T12:30:00")) // false
 * isTemporalZonedDateTime(Temporal.Instant.from("2024-01-15T12:30:00Z")) // false
 * isTemporalZonedDateTime({ timeZone: "UTC", year: 2024 }) // false (object)
 * isTemporalZonedDateTime(null)                          // false
 * isTemporalZonedDateTime(undefined)                     // false
 *
 * // Type narrowing with TypeScript
 * function processZonedDateTime(value: unknown): string {
 *   if (isTemporalZonedDateTime(value)) {
 *     // TypeScript now knows value is Temporal.ZonedDateTime
 *     return value.toString() // Can access ZonedDateTime methods
 *   }
 *   return "Not a valid zoned datetime"
 * }
 *
 * // Filtering mixed arrays
 * const mixedValues = [
 *   Temporal.ZonedDateTime.from("2024-01-15T10:00:00-05:00[America/New_York]"),
 *   "2024-01-15T10:00:00Z",
 *   new Date(),
 *   Temporal.PlainDateTime.from("2024-01-15T10:00:00"),
 *   Temporal.Now.zonedDateTimeISO("Europe/Paris"),
 *   null,
 *   { timeZone: "UTC", year: 2024, month: 1, day: 15 }
 * ]
 *
 * const onlyZonedDateTimes = mixedValues.filter(isTemporalZonedDateTime)
 * // [ZonedDateTime(NY), ZonedDateTime(Paris)]
 *
 * // Validation in function parameters
 * function convertToOtherTimezone(
 *   zonedDateTime: unknown,
 *   targetTimeZone: string
 * ): Temporal.ZonedDateTime | null {
 *   if (!isTemporalZonedDateTime(zonedDateTime)) {
 *     return null
 *   }
 *   return zonedDateTime.withTimeZone(targetTimeZone)
 * }
 *
 * const nyTime = Temporal.ZonedDateTime.from("2024-01-15T10:00:00-05:00[America/New_York]")
 * convertToOtherTimezone(nyTime, "Europe/London")  // ZonedDateTime in London time
 * convertToOtherTimezone("2024-01-15T10:00:00Z", "Europe/London")  // null
 *
 * // Strict type checking in APIs
 * function validateZonedTimestamp(input: unknown): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (input === null || input === undefined) {
 *     return { valid: false, error: "Timestamp is required" }
 *   }
 *
 *   if (!isTemporalZonedDateTime(input)) {
 *     return {
 *       valid: false,
 *       error: "Must be a Temporal.ZonedDateTime instance"
 *     }
 *   }
 *
 *   return { valid: true }
 * }
 *
 * // Timezone-aware scheduling
 * interface GlobalMeeting {
 *   title: string
 *   startTime: unknown
 *   duration: Temporal.Duration
 * }
 *
 * function getLocalMeetingTime(
 *   meeting: GlobalMeeting,
 *   userTimeZone: string
 * ): string {
 *   if (!isTemporalZonedDateTime(meeting.startTime)) {
 *     return "Invalid meeting time"
 *   }
 *
 *   const localTime = meeting.startTime.withTimeZone(userTimeZone)
 *   return localTime.toLocaleString("en-US", {
 *     dateStyle: "full",
 *     timeStyle: "short"
 *   })
 * }
 *
 * // Cross-timezone comparisons
 * function isSameInstant(
 *   zdt1: unknown,
 *   zdt2: unknown
 * ): boolean {
 *   if (!isTemporalZonedDateTime(zdt1) || !isTemporalZonedDateTime(zdt2)) {
 *     return false
 *   }
 *
 *   return zdt1.epochNanoseconds === zdt2.epochNanoseconds
 * }
 *
 * // Flight schedule management
 * interface Flight {
 *   flightNumber: string
 *   departure: unknown
 *   arrival: unknown
 * }
 *
 * function getFlightDuration(flight: Flight): Temporal.Duration | null {
 *   if (!isTemporalZonedDateTime(flight.departure) ||
 *       !isTemporalZonedDateTime(flight.arrival)) {
 *     return null
 *   }
 *
 *   return flight.arrival.since(flight.departure)
 * }
 *
 * // DST transition handling
 * function isDSTActive(value: unknown): boolean | null {
 *   if (!isTemporalZonedDateTime(value)) {
 *     return null
 *   }
 *
 *   // Check if DST is active by comparing offsets
 *   const offset = value.offsetNanoseconds
 *   const standardOffset = value.timeZone.getOffsetNanosecondsFor(
 *     value.toInstant().subtract({ hours: 12 })
 *   )
 *
 *   return offset !== standardOffset
 * }
 *
 * // International broadcast scheduling
 * interface Broadcast {
 *   showName: string
 *   airTime: unknown
 *   targetRegions: Array<string>
 * }
 *
 * function getRegionalAirTimes(
 *   broadcast: Broadcast
 * ): Map<string, string> | null {
 *   if (!isTemporalZonedDateTime(broadcast.airTime)) {
 *     return null
 *   }
 *
 *   const regionalTimes = new Map<string, string>()
 *
 *   for (const region of broadcast.targetRegions) {
 *     const regionalTime = broadcast.airTime.withTimeZone(region)
 *     regionalTimes.set(region, regionalTime.toString())
 *   }
 *
 *   return regionalTimes
 * }
 *
 * // Sorting by actual time (not local time)
 * function sortByAbsoluteTime(
 *   events: Array<{ name: string; time: unknown }>
 * ): Array<{ name: string; time: Temporal.ZonedDateTime }> {
 *   return events
 *     .filter(event => isTemporalZonedDateTime(event.time))
 *     .map(event => ({
 *       name: event.name,
 *       time: event.time as Temporal.ZonedDateTime
 *     }))
 *     .sort((a, b) => {
 *       const diff = a.time.epochNanoseconds - b.time.epochNanoseconds
 *       return diff > 0n ? 1 : diff < 0n ? -1 : 0
 *     })
 * }
 *
 * // Office hours across timezones
 * interface OfficeHours {
 *   location: string
 *   openTime: unknown
 *   closeTime: unknown
 * }
 *
 * function isOfficeOpen(
 *   office: OfficeHours,
 *   checkTime: Temporal.ZonedDateTime
 * ): boolean {
 *   if (!isTemporalZonedDateTime(office.openTime) ||
 *       !isTemporalZonedDateTime(office.closeTime)) {
 *     return false
 *   }
 *
 *   // Convert check time to office timezone
 *   const officeCurrentTime = checkTime.withTimeZone(office.openTime.timeZone)
 *   const officeCurrentHour = officeCurrentTime.hour
 *   const openHour = office.openTime.hour
 *   const closeHour = office.closeTime.hour
 *
 *   return officeCurrentHour >= openHour && officeCurrentHour < closeHour
 * }
 *
 * // Serialization helper
 * function serializeZonedDateTime(value: unknown): string {
 *   if (isTemporalZonedDateTime(value)) {
 *     return JSON.stringify({
 *       type: "ZonedDateTime",
 *       value: value.toString(),
 *       timeZone: value.timeZone.id,
 *       instant: value.toInstant().toString(),
 *       plainDateTime: value.toPlainDateTime().toString(),
 *       offset: value.offset,
 *       epochMilliseconds: Number(value.epochMilliseconds)
 *     })
 *   }
 *
 *   return JSON.stringify(value)
 * }
 *
 * // Factory pattern with validation
 * function createZonedDateTimeOrNull(
 *   value: unknown,
 *   timeZone?: string
 * ): Temporal.ZonedDateTime | null {
 *   if (isTemporalZonedDateTime(value)) {
 *     return value // Already a ZonedDateTime
 *   }
 *
 *   if (typeof value === "string") {
 *     try {
 *       return Temporal.ZonedDateTime.from(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   if (value instanceof Date && timeZone) {
 *     try {
 *       const instant = Temporal.Instant.fromEpochMilliseconds(value.getTime())
 *       return instant.toZonedDateTimeISO(timeZone)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   return null
 * }
 *
 * // Conference call coordinator
 * interface Participant {
 *   name: string
 *   timeZone: string
 *   preferredTime: unknown
 * }
 *
 * function findBestMeetingTime(
 *   participants: Array<Participant>
 * ): Temporal.ZonedDateTime | null {
 *   const validTimes: Array<Temporal.ZonedDateTime> = []
 *
 *   for (const participant of participants) {
 *     if (isTemporalZonedDateTime(participant.preferredTime)) {
 *       validTimes.push(participant.preferredTime)
 *     }
 *   }
 *
 *   if (validTimes.length === 0) {
 *     return null
 *   }
 *
 *   // Find median time (simplified)
 *   validTimes.sort((a, b) => {
 *     const diff = a.epochNanoseconds - b.epochNanoseconds
 *     return diff > 0n ? 1 : diff < 0n ? -1 : 0
 *   })
 *
 *   return validTimes[Math.floor(validTimes.length / 2)]
 * }
 *
 * // Logging with timezone context
 * interface LogEntry {
 *   message: string
 *   timestamp: unknown
 *   serverTimeZone: string
 * }
 *
 * function formatLogWithTimezone(entry: LogEntry): string {
 *   if (!isTemporalZonedDateTime(entry.timestamp)) {
 *     return `[INVALID TIME] ${entry.message}`
 *   }
 *
 *   const localTime = entry.timestamp.toPlainDateTime()
 *   const offset = entry.timestamp.offset
 *   const tz = entry.timestamp.timeZone.id
 *
 *   return `[${localTime} ${offset} ${tz}] ${entry.message}`
 * }
 *
 * // Testing utilities
 * function assertIsZonedDateTime(
 *   value: unknown
 * ): asserts value is Temporal.ZonedDateTime {
 *   if (!isTemporalZonedDateTime(value)) {
 *     throw new Error("Expected Temporal.ZonedDateTime instance")
 *   }
 * }
 *
 * // Use in tests
 * function testZonedDateTimeOperation() {
 *   const result = someFunctionThatShouldReturnZonedDateTime()
 *   assertIsZonedDateTime(result)
 *   // TypeScript now knows result is ZonedDateTime
 *   expect(result.timeZone.id).toBe("America/New_York")
 *   expect(result.hour).toBeLessThan(24)
 * }
 *
 * // Market hours tracking
 * interface MarketHours {
 *   exchange: string
 *   openTime: unknown
 *   closeTime: unknown
 * }
 *
 * function isMarketOpen(
 *   market: MarketHours,
 *   currentTime: Temporal.ZonedDateTime
 * ): boolean {
 *   if (!isTemporalZonedDateTime(market.openTime) ||
 *       !isTemporalZonedDateTime(market.closeTime)) {
 *     return false
 *   }
 *
 *   // Check if current instant falls between open and close
 *   const now = currentTime.epochNanoseconds
 *   const open = market.openTime.epochNanoseconds
 *   const close = market.closeTime.epochNanoseconds
 *
 *   return now >= open && now < close
 * }
 *
 * // Recurring event handling
 * interface RecurringEvent {
 *   name: string
 *   firstOccurrence: unknown
 *   recurrence: Temporal.Duration
 * }
 *
 * function getNextOccurrence(
 *   event: RecurringEvent,
 *   after: Temporal.ZonedDateTime
 * ): Temporal.ZonedDateTime | null {
 *   if (!isTemporalZonedDateTime(event.firstOccurrence)) {
 *     return null
 *   }
 *
 *   let nextTime = event.firstOccurrence
 *
 *   while (nextTime.epochNanoseconds <= after.epochNanoseconds) {
 *     nextTime = nextTime.add(event.recurrence)
 *   }
 *
 *   return nextTime
 * }
 *
 * // Timezone offset changes
 * function getOffsetTransitions(
 *   value: unknown,
 *   hoursAhead: number
 * ): Array<{ time: string; offset: string }> {
 *   if (!isTemporalZonedDateTime(value)) {
 *     return []
 *   }
 *
 *   const transitions: Array<{ time: string; offset: string }> = []
 *   let current = value
 *   const end = value.add({ hours: hoursAhead })
 *
 *   while (current.epochNanoseconds < end.epochNanoseconds) {
 *     const nextHour = current.add({ hours: 1 })
 *
 *     if (current.offset !== nextHour.offset) {
 *       transitions.push({
 *         time: nextHour.toString(),
 *         offset: nextHour.offset
 *       })
 *     }
 *
 *     current = nextHour
 *   }
 *
 *   return transitions
 * }
 * ```
 *
 * @property Type-guard - Narrows type to Temporal.ZonedDateTime when true
 * @property Pure - No side effects, only checks type
 * @property Strict - Only returns true for actual ZonedDateTime instances
 * @property Safe - Handles any input type without throwing
 * @property Runtime - Provides runtime type checking for Temporal types
 */
const isTemporalZonedDateTime = (
	value: unknown,
): value is Temporal.ZonedDateTime => {
	try {
		return value instanceof Temporal.ZonedDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalZonedDateTime
