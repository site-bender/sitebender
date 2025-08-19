/**
 * Gets the time zone identifier from a Temporal ZonedDateTime
 * 
 * Extracts the time zone identifier string from a Temporal ZonedDateTime object.
 * Returns the IANA time zone name (e.g., "America/New_York", "Europe/London",
 * "Asia/Tokyo") or an offset string (e.g., "+05:30", "-08:00"). Returns null
 * for invalid inputs or non-ZonedDateTime objects to support safe error handling.
 * 
 * @param zonedDateTime - The ZonedDateTime to get time zone from
 * @returns The time zone identifier string, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with named time zones
 * const nyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getTimeZone(nyTime)                     // "America/New_York"
 * 
 * const londonTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00+00:00[Europe/London]"
 * )
 * getTimeZone(londonTime)                 // "Europe/London"
 * 
 * const tokyoTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T23:30:00+09:00[Asia/Tokyo]"
 * )
 * getTimeZone(tokyoTime)                  // "Asia/Tokyo"
 * 
 * const sydneyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-16T01:30:00+11:00[Australia/Sydney]"
 * )
 * getTimeZone(sydneyTime)                 // "Australia/Sydney"
 * 
 * // Offset-only time zones
 * const offsetTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00+05:30[+05:30]"
 * )
 * getTimeZone(offsetTime)                 // "+05:30"
 * 
 * const utcMinus7 = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-07:00[-07:00]"
 * )
 * getTimeZone(utcMinus7)                  // "-07:00"
 * 
 * // UTC zone
 * const utcTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00Z[UTC]"
 * )
 * getTimeZone(utcTime)                    // "UTC"
 * 
 * // Time zone display helper
 * function getTimeZoneDisplay(zdt: Temporal.ZonedDateTime): string {
 *   const tz = getTimeZone(zdt)
 *   if (tz === null) return "Unknown"
 *   
 *   // Extract city/region name for display
 *   if (tz.includes("/")) {
 *     const parts = tz.split("/")
 *     return parts[parts.length - 1].replace(/_/g, " ")
 *   }
 *   
 *   return tz
 * }
 * 
 * const ny = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00[America/New_York]"
 * )
 * getTimeZoneDisplay(ny)                  // "New York"
 * 
 * const la = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00[America/Los_Angeles]"
 * )
 * getTimeZoneDisplay(la)                  // "Los Angeles"
 * 
 * // Time zone offset helper
 * function getTimeZoneOffset(zdt: Temporal.ZonedDateTime): string {
 *   return zdt.offset
 * }
 * 
 * const summer = Temporal.ZonedDateTime.from(
 *   "2024-07-15T10:30:00[America/New_York]"
 * )
 * getTimeZoneOffset(summer)               // "-04:00" (EDT)
 * 
 * const winter = Temporal.ZonedDateTime.from(
 *   "2024-01-15T10:30:00[America/New_York]"
 * )
 * getTimeZoneOffset(winter)               // "-05:00" (EST)
 * 
 * // Time zone abbreviation helper
 * function getTimeZoneAbbreviation(zdt: Temporal.ZonedDateTime): string {
 *   const tz = getTimeZone(zdt)
 *   if (tz === null) return "???"
 *   
 *   // Common time zone abbreviations
 *   const offset = zdt.offset
 *   const isDST = zdt.offsetNanoseconds !== zdt.with({ month: 1 }).offsetNanoseconds
 *   
 *   const abbreviations: Record<string, { standard: string, daylight: string }> = {
 *     "America/New_York": { standard: "EST", daylight: "EDT" },
 *     "America/Chicago": { standard: "CST", daylight: "CDT" },
 *     "America/Denver": { standard: "MST", daylight: "MDT" },
 *     "America/Los_Angeles": { standard: "PST", daylight: "PDT" },
 *     "Europe/London": { standard: "GMT", daylight: "BST" },
 *     "Europe/Paris": { standard: "CET", daylight: "CEST" },
 *     "Asia/Tokyo": { standard: "JST", daylight: "JST" },  // No DST
 *     "Australia/Sydney": { standard: "AEST", daylight: "AEDT" },
 *     "UTC": { standard: "UTC", daylight: "UTC" }
 *   }
 *   
 *   const abbr = abbreviations[tz]
 *   if (abbr) {
 *     return isDST ? abbr.daylight : abbr.standard
 *   }
 *   
 *   return offset  // Fallback to offset
 * }
 * 
 * // Null handling
 * getTimeZone(null)                       // null
 * getTimeZone(undefined)                  // null
 * getTimeZone("2024-03-15T10:30:00Z")    // null (string, not ZonedDateTime)
 * 
 * // Non-ZonedDateTime Temporal objects return null
 * const plainDate = Temporal.PlainDate.from("2024-03-15")
 * getTimeZone(plainDate as any)           // null
 * 
 * const plainTime = Temporal.PlainTime.from("10:30:00")
 * getTimeZone(plainTime as any)           // null
 * 
 * const plainDateTime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getTimeZone(plainDateTime as any)       // null
 * 
 * // Time zone comparison
 * function isSameTimeZone(
 *   zdt1: Temporal.ZonedDateTime,
 *   zdt2: Temporal.ZonedDateTime
 * ): boolean {
 *   return getTimeZone(zdt1) === getTimeZone(zdt2)
 * }
 * 
 * const ny1 = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:00:00[America/New_York]"
 * )
 * const ny2 = Temporal.ZonedDateTime.from(
 *   "2024-06-15T14:00:00[America/New_York]"
 * )
 * const london = Temporal.ZonedDateTime.from(
 *   "2024-03-15T15:00:00[Europe/London]"
 * )
 * 
 * isSameTimeZone(ny1, ny2)                // true
 * isSameTimeZone(ny1, london)             // false
 * 
 * // Multi-timezone meeting scheduler
 * function getMeetingTimeInZones(
 *   time: Temporal.PlainDateTime,
 *   zones: Array<string>
 * ): Map<string, Temporal.ZonedDateTime> {
 *   const times = new Map<string, Temporal.ZonedDateTime>()
 *   
 *   for (const zone of zones) {
 *     try {
 *       const zdt = time.toZonedDateTime(zone)
 *       times.set(zone, zdt)
 *     } catch {
 *       // Invalid zone, skip
 *     }
 *   }
 *   
 *   return times
 * }
 * 
 * const meeting = Temporal.PlainDateTime.from("2024-03-15T15:00:00")
 * const zones = ["America/New_York", "Europe/London", "Asia/Tokyo"]
 * const times = getMeetingTimeInZones(meeting, zones)
 * // Map with meeting time in each zone
 * 
 * // Time zone grouping
 * function groupByTimeZone(
 *   times: Array<Temporal.ZonedDateTime>
 * ): Map<string, Array<Temporal.ZonedDateTime>> {
 *   const grouped = new Map<string, Array<Temporal.ZonedDateTime>>()
 *   
 *   for (const time of times) {
 *     const tz = getTimeZone(time)
 *     if (tz !== null) {
 *       const group = grouped.get(tz) ?? []
 *       group.push(time)
 *       grouped.set(tz, group)
 *     }
 *   }
 *   
 *   return grouped
 * }
 * 
 * // DST transition detection
 * function isDSTTransitionDay(zdt: Temporal.ZonedDateTime): boolean {
 *   const tz = getTimeZone(zdt)
 *   if (tz === null) return false
 *   
 *   const startOfDay = zdt.with({ hour: 0, minute: 0, second: 0 })
 *   const endOfDay = zdt.with({ hour: 23, minute: 59, second: 59 })
 *   
 *   return startOfDay.offset !== endOfDay.offset
 * }
 * 
 * // Time zone validation
 * function isValidTimeZone(tzString: string): boolean {
 *   try {
 *     Temporal.Now.zonedDateTimeISO(tzString)
 *     return true
 *   } catch {
 *     return false
 *   }
 * }
 * 
 * isValidTimeZone("America/New_York")     // true
 * isValidTimeZone("Invalid/Zone")         // false
 * isValidTimeZone("+05:30")              // true
 * isValidTimeZone("UTC")                  // true
 * 
 * // Get all time zones in a region
 * function getTimeZonesInRegion(region: string): Array<string> {
 *   // This would typically use Intl.supportedValuesOf('timeZone')
 *   // Simplified example:
 *   const allZones = [
 *     "America/New_York",
 *     "America/Chicago",
 *     "America/Los_Angeles",
 *     "Europe/London",
 *     "Europe/Paris",
 *     "Asia/Tokyo",
 *     "Asia/Shanghai"
 *   ]
 *   
 *   return allZones.filter(tz => tz.startsWith(region + "/"))
 * }
 * 
 * getTimeZonesInRegion("America")
 * // ["America/New_York", "America/Chicago", "America/Los_Angeles"]
 * 
 * // Business hours across zones
 * function isBusinessHoursInZone(
 *   instant: Temporal.Instant,
 *   zone: string,
 *   startHour: number = 9,
 *   endHour: number = 17
 * ): boolean {
 *   try {
 *     const zdt = instant.toZonedDateTimeISO(zone)
 *     const hour = zdt.hour
 *     return hour >= startHour && hour < endHour
 *   } catch {
 *     return false
 *   }
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs or non-ZonedDateTime objects
 * @property IANA - Returns IANA time zone identifiers or offset strings
 * @property Specific - Only works with ZonedDateTime, not other Temporal types
 */
const getTimeZone = (
	zonedDateTime: Temporal.ZonedDateTime | null | undefined
): string | null => {
	if (zonedDateTime == null) {
		return null
	}
	
	if (!(zonedDateTime instanceof Temporal.ZonedDateTime)) {
		return null
	}
	
	try {
		return zonedDateTime.timeZoneId
	} catch {
		return null
	}
}

export default getTimeZone