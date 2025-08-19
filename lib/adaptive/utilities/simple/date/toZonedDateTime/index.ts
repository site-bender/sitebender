/**
 * Converts PlainDateTime to ZonedDateTime with specified timezone
 * 
 * Attaches timezone information to a PlainDateTime, creating a ZonedDateTime
 * that represents a specific instant in time. Handles ambiguous times during
 * DST transitions using the disambiguation option. Also converts from PlainDate
 * (at midnight), Instant, and ISO strings. This is a curried function for easy
 * composition. Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (timeZone, disambiguation?) => (temporal) => ZonedDateTime
 * @param timeZone - The timezone identifier (e.g., "America/New_York")
 * @param disambiguation - How to handle ambiguous times: "compatible", "earlier", "later", "reject"
 * @param temporal - The value to convert to ZonedDateTime
 * @returns ZonedDateTime representation, or null if invalid
 * @example
 * ```typescript
 * // From PlainDateTime - attach timezone
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toZonedDateTime("America/New_York")(datetime)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 * 
 * toZonedDateTime("Europe/London")(datetime)
 * // ZonedDateTime 2024-03-15T14:30:00+00:00[Europe/London]
 * 
 * toZonedDateTime("Asia/Tokyo")(datetime)
 * // ZonedDateTime 2024-03-15T14:30:00+09:00[Asia/Tokyo]
 * 
 * // From PlainDate - at midnight in timezone
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toZonedDateTime("America/New_York")(date)
 * // ZonedDateTime 2024-03-15T00:00:00-04:00[America/New_York]
 * 
 * // From ZonedDateTime - change timezone
 * const nyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toZonedDateTime("Europe/London")(nyTime)
 * // ZonedDateTime 2024-03-15T18:30:00+00:00[Europe/London]
 * 
 * // From Instant - localize to timezone
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * toZonedDateTime("America/New_York")(instant)
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 * 
 * // DST transition handling (Spring forward)
 * // 2:30 AM doesn't exist on March 10, 2024 in New York
 * const dstAmbiguous = Temporal.PlainDateTime.from("2024-03-10T02:30:00")
 * 
 * toZonedDateTime("America/New_York", "earlier")(dstAmbiguous)
 * // ZonedDateTime 2024-03-10T01:30:00-05:00[America/New_York]
 * 
 * toZonedDateTime("America/New_York", "later")(dstAmbiguous)
 * // ZonedDateTime 2024-03-10T03:30:00-04:00[America/New_York]
 * 
 * toZonedDateTime("America/New_York", "compatible")(dstAmbiguous)
 * // ZonedDateTime 2024-03-10T03:30:00-04:00[America/New_York] (default)
 * 
 * // DST transition handling (Fall back)
 * // 1:30 AM occurs twice on November 3, 2024 in New York
 * const dstRepeated = Temporal.PlainDateTime.from("2024-11-03T01:30:00")
 * 
 * toZonedDateTime("America/New_York", "earlier")(dstRepeated)
 * // ZonedDateTime 2024-11-03T01:30:00-04:00[America/New_York] (first occurrence)
 * 
 * toZonedDateTime("America/New_York", "later")(dstRepeated)
 * // ZonedDateTime 2024-11-03T01:30:00-05:00[America/New_York] (second occurrence)
 * 
 * // From ISO string
 * toZonedDateTime("America/New_York")("2024-03-15T14:30:00")
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 * 
 * // Meeting scheduler
 * function scheduleMeeting(
 *   localTime: Temporal.PlainDateTime,
 *   timezone: string
 * ): Temporal.ZonedDateTime | null {
 *   return toZonedDateTime(timezone)(localTime)
 * }
 * 
 * const meetingTime = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * scheduleMeeting(meetingTime, "America/New_York")
 * // ZonedDateTime 2024-03-15T14:00:00-04:00[America/New_York]
 * 
 * // Multi-timezone converter
 * function convertToTimezones(
 *   datetime: Temporal.PlainDateTime,
 *   timezones: Array<string>
 * ): Map<string, Temporal.ZonedDateTime | null> {
 *   const results = new Map<string, Temporal.ZonedDateTime | null>()
 *   
 *   for (const tz of timezones) {
 *     results.set(tz, toZonedDateTime(tz)(datetime))
 *   }
 *   
 *   return results
 * }
 * 
 * const localTime = Temporal.PlainDateTime.from("2024-03-15T12:00:00")
 * const zones = ["America/New_York", "Europe/London", "Asia/Tokyo"]
 * convertToTimezones(localTime, zones)
 * // Map with ZonedDateTime for each timezone
 * 
 * // Batch timezone attachment
 * const times = [
 *   Temporal.PlainDateTime.from("2024-03-15T09:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T18:00:00")
 * ]
 * 
 * const toNYTime = toZonedDateTime("America/New_York")
 * const nyTimes = times.map(toNYTime)
 * // Array of ZonedDateTimes in New York timezone
 * 
 * // Invalid input handling
 * toZonedDateTime("America/New_York")(null)        // null
 * toZonedDateTime("America/New_York")(undefined)   // null
 * toZonedDateTime("Invalid/Zone")(datetime)        // null
 * toZonedDateTime("America/New_York")(123)         // null
 * 
 * // Event localizer
 * function localizeEvent(
 *   event: { name: string; time: Temporal.PlainDateTime },
 *   userTimezone: string
 * ): { name: string; localTime: Temporal.ZonedDateTime | null } {
 *   return {
 *     name: event.name,
 *     localTime: toZonedDateTime(userTimezone)(event.time)
 *   }
 * }
 * 
 * const event = {
 *   name: "Product Launch",
 *   time: Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * }
 * localizeEvent(event, "America/Los_Angeles")
 * // { name: "Product Launch", localTime: ZonedDateTime in LA }
 * 
 * // Database timestamp with timezone
 * function addTimezoneToTimestamp(
 *   timestamp: string,
 *   timezone: string
 * ): Temporal.ZonedDateTime | null {
 *   try {
 *     const datetime = Temporal.PlainDateTime.from(timestamp)
 *     return toZonedDateTime(timezone)(datetime)
 *   } catch {
 *     return null
 *   }
 * }
 * 
 * addTimezoneToTimestamp("2024-03-15T14:30:00", "America/New_York")
 * // ZonedDateTime 2024-03-15T14:30:00-04:00[America/New_York]
 * 
 * // UTC converter
 * function toUTC(
 *   datetime: Temporal.PlainDateTime
 * ): Temporal.ZonedDateTime | null {
 *   return toZonedDateTime("UTC")(datetime)
 * }
 * 
 * toUTC(Temporal.PlainDateTime.from("2024-03-15T14:30:00"))
 * // ZonedDateTime 2024-03-15T14:30:00+00:00[UTC]
 * 
 * // Business hours checker
 * function isInBusinessHours(
 *   datetime: Temporal.PlainDateTime,
 *   timezone: string,
 *   openHour: number = 9,
 *   closeHour: number = 17
 * ): boolean {
 *   const zoned = toZonedDateTime(timezone)(datetime)
 *   if (!zoned) return false
 *   
 *   const hour = zoned.hour
 *   return hour >= openHour && hour < closeHour
 * }
 * 
 * const checkTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * isInBusinessHours(checkTime, "America/New_York", 9, 17)  // true
 * 
 * // Recurring event generator
 * function generateRecurringEvents(
 *   startDate: Temporal.PlainDate,
 *   time: Temporal.PlainTime,
 *   timezone: string,
 *   count: number
 * ): Array<Temporal.ZonedDateTime | null> {
 *   const events: Array<Temporal.ZonedDateTime | null> = []
 *   const attachTimezone = toZonedDateTime(timezone)
 *   
 *   for (let i = 0; i < count; i++) {
 *     const date = startDate.add({ weeks: i })
 *     const datetime = date.toPlainDateTime(time)
 *     events.push(attachTimezone(datetime))
 *   }
 *   
 *   return events
 * }
 * 
 * const startDate = Temporal.PlainDate.from("2024-03-15")
 * const eventTime = Temporal.PlainTime.from("10:00:00")
 * generateRecurringEvents(startDate, eventTime, "America/New_York", 4)
 * // 4 weekly events at 10 AM New York time
 * 
 * // Timezone migration helper
 * function migrateToTimezone(
 *   records: Array<{ id: number; datetime: Temporal.PlainDateTime }>,
 *   timezone: string
 * ): Array<{ id: number; zoned: Temporal.ZonedDateTime | null }> {
 *   const attachTz = toZonedDateTime(timezone)
 *   
 *   return records.map(record => ({
 *     id: record.id,
 *     zoned: attachTz(record.datetime)
 *   }))
 * }
 * 
 * // DST-safe scheduler
 * function scheduleWithDSTHandling(
 *   datetime: Temporal.PlainDateTime,
 *   timezone: string,
 *   preferEarlier: boolean = true
 * ): Temporal.ZonedDateTime | null {
 *   const disambiguation = preferEarlier ? "earlier" : "later"
 *   return toZonedDateTime(timezone, disambiguation)(datetime)
 * }
 * 
 * const ambiguousTime = Temporal.PlainDateTime.from("2024-11-03T01:30:00")
 * scheduleWithDSTHandling(ambiguousTime, "America/New_York", true)
 * // Gets the earlier occurrence (before DST ends)
 * ```
 * @property Curried - Takes timezone and optional disambiguation
 * @property Safe - Returns null for invalid inputs
 * @property DST-aware - Handles daylight saving transitions
 * @property Flexible - Accepts multiple input types
 */
const toZonedDateTime = (
	timeZone: string,
	disambiguation: "compatible" | "earlier" | "later" | "reject" = "compatible"
) => (
	temporal: Temporal.PlainDateTime | Temporal.PlainDate |
	          Temporal.ZonedDateTime | Temporal.Instant |
	          string | null | undefined
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
			return null  // Invalid timezone
		}
		
		// Handle ZonedDateTime - change timezone
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.withTimeZone(timeZone)
		}
		
		// Handle PlainDateTime - attach timezone
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal.toZonedDateTime(timeZone, { disambiguation })
		}
		
		// Handle PlainDate - convert to midnight in timezone
		if (temporal instanceof Temporal.PlainDate) {
			const datetime = temporal.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
			return datetime.toZonedDateTime(timeZone, { disambiguation })
		}
		
		// Handle Instant - convert to timezone
		if (temporal instanceof Temporal.Instant) {
			return temporal.toZonedDateTimeISO(timeZone)
		}
		
		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainDateTime and attach timezone
			try {
				const datetime = Temporal.PlainDateTime.from(temporal)
				return datetime.toZonedDateTime(timeZone, { disambiguation })
			} catch {
				// Try to parse as PlainDate
				try {
					const date = Temporal.PlainDate.from(temporal)
					const datetime = date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
					return datetime.toZonedDateTime(timeZone, { disambiguation })
				} catch {
					// Try to parse as ZonedDateTime and change timezone
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.withTimeZone(timeZone)
					} catch {
						// Try to parse as Instant
						try {
							const instant = Temporal.Instant.from(temporal)
							return instant.toZonedDateTimeISO(timeZone)
						} catch {
							return null
						}
					}
				}
			}
		}
		
		return null
	} catch {
		return null
	}
}

export default toZonedDateTime