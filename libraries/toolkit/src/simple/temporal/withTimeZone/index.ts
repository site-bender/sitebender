/**
 * Converts datetime to a specific timezone
 *
 * Changes the timezone of a ZonedDateTime while preserving the same instant in
 * time. The wall-clock time will change to reflect the local time in the new
 * timezone. Also converts PlainDateTime and Instant to the specified timezone.
 * This is useful for displaying times in different regions and handling
 * international scheduling. This is a curried function for easy composition.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (timeZone) => (temporal) => ZonedDateTime in new timezone
 * @param timeZone - The target timezone identifier (e.g., "America/New_York")
 * @param temporal - The datetime to convert
 * @returns ZonedDateTime in new timezone, or null if invalid
 * @example
 * ```typescript
 * // From ZonedDateTime - preserve instant, change timezone
 * const nyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * withTimeZone("Europe/London")(nyTime)
 * // ZonedDateTime 2024-03-15T18:30:00+00:00[Europe/London] (4 hours ahead)
 *
 * withTimeZone("Asia/Tokyo")(nyTime)
 * // ZonedDateTime 2024-03-16T03:30:00+09:00[Asia/Tokyo] (next day, 13 hours ahead)
 *
 * withTimeZone("America/Los_Angeles")(nyTime)
 * // ZonedDateTime 2024-03-15T11:30:00-07:00[America/Los_Angeles] (3 hours behind NY)
 *
 * // From PlainDateTime - interpret as local time in timezone
 * const plainDateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * withTimeZone("America/New_York")(plainDateTime)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 *
 * withTimeZone("UTC")(plainDateTime)
 * // ZonedDateTime 2024-03-15T14:30:00+00:00[UTC]
 *
 * // From Instant - convert to timezone
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * withTimeZone("America/New_York")(instant)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 *
 * withTimeZone("Asia/Tokyo")(instant)
 * // ZonedDateTime 2024-03-16T03:30:00+09:00[Asia/Tokyo]
 *
 * // DST aware conversions
 * const beforeDST = Temporal.ZonedDateTime.from(
 *   "2024-03-10T01:00:00-05:00[America/New_York]"
 * )
 * const afterDST = Temporal.ZonedDateTime.from(
 *   "2024-03-10T04:00:00-04:00[America/New_York]"  // After spring forward
 * )
 *
 * withTimeZone("Europe/London")(beforeDST)
 * // 2024-03-10T06:00:00+00:00[Europe/London]
 *
 * withTimeZone("Europe/London")(afterDST)
 * // 2024-03-10T08:00:00+00:00[Europe/London] (only 2 hours later due to DST)
 *
 * // Meeting time converter
 * function convertMeetingTime(
 *   meeting: Temporal.ZonedDateTime,
 *   attendeeTimeZone: string
 * ): Temporal.ZonedDateTime | null {
 *   return withTimeZone(attendeeTimeZone)(meeting)
 * }
 *
 * const meetingNY = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:00:00-04:00[America/New_York]"
 * )
 * convertMeetingTime(meetingNY, "Europe/London")
 * // 14:00 London time
 * convertMeetingTime(meetingNY, "Asia/Tokyo")
 * // 23:00 Tokyo time (same day)
 *
 * // Multi-timezone display
 * function showInTimezones(
 *   datetime: Temporal.ZonedDateTime | Temporal.Instant,
 *   timezones: Array<string>
 * ): Map<string, Temporal.ZonedDateTime | null> {
 *   const results = new Map<string, Temporal.ZonedDateTime | null>()
 *
 *   for (const tz of timezones) {
 *     results.set(tz, withTimeZone(tz)(datetime))
 *   }
 *
 *   return results
 * }
 *
 * const event = Temporal.ZonedDateTime.from(
 *   "2024-03-15T12:00:00-04:00[America/New_York]"
 * )
 * const zones = ["America/Los_Angeles", "Europe/London", "Asia/Tokyo"]
 * showInTimezones(event, zones)
 * // Map showing event time in each timezone
 *
 * // Batch timezone conversion
 * const events = [
 *   Temporal.ZonedDateTime.from("2024-03-15T09:00:00-04:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-03-15T14:00:00-04:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-03-15T18:00:00-04:00[America/New_York]")
 * ]
 *
 * const toLondon = withTimeZone("Europe/London")
 * const londonTimes = events.map(toLondon)
 * // Events shown in London time
 *
 * // Invalid input handling
 * withTimeZone("America/New_York")(null)  // null
 * withTimeZone("America/New_York")(undefined)  // null
 * withTimeZone("Invalid/Zone")(nyTime)    // null (invalid timezone)
 * withTimeZone("America/New_York")(123)   // null (not a temporal)
 *
 * // UTC converter
 * function toUTC(
 *   datetime: Temporal.ZonedDateTime | Temporal.Instant
 * ): Temporal.ZonedDateTime | null {
 *   return withTimeZone("UTC")(datetime)
 * }
 *
 * const localTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toUTC(localTime)
 * // ZonedDateTime 2024-03-15T18:30:00+00:00[UTC]
 *
 * // User timezone preference
 * function displayInUserTimezone(
 *   serverTime: Temporal.ZonedDateTime,
 *   userTimezone: string
 * ): Temporal.ZonedDateTime | null {
 *   return withTimeZone(userTimezone)(serverTime)
 * }
 *
 * const serverEvent = Temporal.ZonedDateTime.from(
 *   "2024-03-15T18:30:00+00:00[UTC]"
 * )
 * displayInUserTimezone(serverEvent, "America/Chicago")
 * // 2024-03-15T13:30:00-05:00[America/Chicago]
 *
 * // Flight arrival calculator
 * function calculateArrivalLocal(
 *   departure: Temporal.ZonedDateTime,
 *   flightDuration: Temporal.Duration,
 *   arrivalTimezone: string
 * ): Temporal.ZonedDateTime | null {
 *   const arrivalInstant = departure.add(flightDuration)
 *   return withTimeZone(arrivalTimezone)(arrivalInstant)
 * }
 *
 * const departure = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:00:00-04:00[America/New_York]"
 * )
 * const flightTime = Temporal.Duration.from({ hours: 11, minutes: 30 })
 * calculateArrivalLocal(departure, flightTime, "Europe/London")
 * // Arrival time in London timezone
 *
 * // Global broadcast scheduler
 * function scheduleBroadcast(
 *   utcTime: Temporal.Instant,
 *   regions: Array<{ name: string; timezone: string }>
 * ): Array<{ name: string; localTime: Temporal.ZonedDateTime | null }> {
 *   return regions.map(region => ({
 *     name: region.name,
 *     localTime: withTimeZone(region.timezone)(utcTime)
 *   }))
 * }
 *
 * const broadcast = Temporal.Instant.from("2024-03-15T20:00:00Z")
 * const regions = [
 *   { name: "East Coast", timezone: "America/New_York" },
 *   { name: "West Coast", timezone: "America/Los_Angeles" },
 *   { name: "Europe", timezone: "Europe/Paris" },
 *   { name: "Asia", timezone: "Asia/Tokyo" }
 * ]
 * scheduleBroadcast(broadcast, regions)
 * // Array with local times for each region
 *
 * // Working hours checker across timezones
 * function isInWorkingHours(
 *   datetime: Temporal.ZonedDateTime,
 *   checkTimezone: string,
 *   startHour: number = 9,
 *   endHour: number = 17
 * ): boolean {
 *   const localTime = withTimeZone(checkTimezone)(datetime)
 *   if (!localTime) return false
 *
 *   const hour = localTime.hour
 *   return hour >= startHour && hour < endHour
 * }
 *
 * const callTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:00:00-04:00[America/New_York]"
 * )
 * isInWorkingHours(callTime, "Europe/London", 9, 17)  // true (14:00 in London)
 * isInWorkingHours(callTime, "Asia/Tokyo", 9, 17)     // false (23:00 in Tokyo)
 *
 * // Timezone migration for stored data
 * function migrateTimezone(
 *   records: Array<{ id: number; time: Temporal.PlainDateTime }>,
 *   fromTimezone: string,
 *   toTimezone: string
 * ): Array<{ id: number; time: Temporal.ZonedDateTime | null }> {
 *   return records.map(record => {
 *     // First interpret as time in source timezone
 *     const sourceTime = record.time.toZonedDateTime(fromTimezone)
 *     // Then convert to target timezone
 *     return {
 *       id: record.id,
 *       time: withTimeZone(toTimezone)(sourceTime)
 *     }
 *   })
 * }
 *
 * // Follow-the-sun support
 * function getNextSupportRegion(
 *   currentTime: Temporal.Instant
 * ): { region: string; timezone: string } {
 *   const regions = [
 *     { region: "Asia", timezone: "Asia/Tokyo", startHour: 9 },
 *     { region: "Europe", timezone: "Europe/London", startHour: 9 },
 *     { region: "Americas", timezone: "America/New_York", startHour: 9 }
 *   ]
 *
 *   for (const region of regions) {
 *     const localTime = withTimeZone(region.timezone)(currentTime)
 *     if (localTime) {
 *       const hour = localTime.hour
 *       if (hour >= region.startHour && hour < region.startHour + 8) {
 *         return { region: region.region, timezone: region.timezone }
 *       }
 *     }
 *   }
 *
 *   // Default fallback
 *   return { region: "Americas", timezone: "America/New_York" }
 * }
 * ```
 * @property Curried - Takes timezone first for easy partial application
 * @property Safe - Returns null for invalid inputs
 * @property Instant-preserving - Maintains same point in time
 * @property DST-aware - Handles daylight saving transitions correctly
 */
const withTimeZone = (timeZone: string) =>
(
	temporal:
		| Temporal.ZonedDateTime
		| Temporal.PlainDateTime
		| Temporal.Instant
		| null
		| undefined,
): Temporal.ZonedDateTime | null => {
	if (temporal == null) {
		return null
	}

	try {
		// Validate timezone
		try {
			// Test if timezone is valid by creating a test ZonedDateTime
			Temporal.Now.zonedDateTimeISO(timeZone)
		} catch {
			return null // Invalid timezone
		}

		// Handle ZonedDateTime - change timezone preserving instant
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.withTimeZone(timeZone)
		}

		// Handle PlainDateTime - interpret as local time in timezone
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal.toZonedDateTime(timeZone)
		}

		// Handle Instant - convert to timezone
		if (temporal instanceof Temporal.Instant) {
			return temporal.toZonedDateTimeISO(timeZone)
		}

		return null
	} catch {
		return null
	}
}

export default withTimeZone
