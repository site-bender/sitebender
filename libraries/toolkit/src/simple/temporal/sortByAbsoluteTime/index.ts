/**
 * Comparator for sorting by absolute time
 * 
 * Creates a comparator function for sorting temporal objects by their absolute
 * time values. Works with Instant, ZonedDateTime, and PlainDateTime objects,
 * converting them to absolute instants for comparison when necessary. Returns
 * a standard comparator result (-1, 0, 1) for use with Array.sort() and other
 * sorting utilities. Handles timezone-aware comparisons correctly.
 * 
 * @curried (timeZone?) => (a, b) => result
 * @param timeZone - Optional timezone for PlainDateTime conversion (defaults to UTC)
 * @param a - First temporal object to compare
 * @param b - Second temporal object to compare
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 * @example
 * ```typescript
 * // Sort Instants (direct absolute time comparison)
 * const instants = [
 *   Temporal.Instant.from("2024-03-15T18:30:00Z"),
 *   Temporal.Instant.from("2024-03-15T14:30:00Z"),
 *   Temporal.Instant.from("2024-03-15T20:15:00Z")
 * ]
 * instants.sort(sortByAbsoluteTime())
 * // [
 * //   Instant 2024-03-15T14:30:00Z,
 * //   Instant 2024-03-15T18:30:00Z, 
 * //   Instant 2024-03-15T20:15:00Z
 * // ]
 * 
 * // Sort ZonedDateTimes (accounts for timezone differences)
 * const zonedTimes = [
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]"),  // 18:30 UTC
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00[Europe/London]"),     // 14:30 UTC 
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00[Asia/Tokyo]")         // 05:30 UTC
 * ]
 * zonedTimes.sort(sortByAbsoluteTime())
 * // [
 * //   ZonedDateTime 2024-03-15T14:30:00[Asia/Tokyo],    (earliest UTC)
 * //   ZonedDateTime 2024-03-15T14:30:00[Europe/London],
 * //   ZonedDateTime 2024-03-15T14:30:00[America/New_York] (latest UTC)
 * // ]
 * 
 * // Sort PlainDateTimes (assumes UTC)
 * const plainTimes = [
 *   Temporal.PlainDateTime.from("2024-03-15T18:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T20:15:00")
 * ]
 * plainTimes.sort(sortByAbsoluteTime())
 * // [
 * //   PlainDateTime 2024-03-15T14:30:00,
 * //   PlainDateTime 2024-03-15T18:30:00,
 * //   PlainDateTime 2024-03-15T20:15:00
 * // ]
 * 
 * // Sort PlainDateTimes with specific timezone
 * const plainTimesInNY = [
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T09:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T16:15:00")
 * ]
 * plainTimesInNY.sort(sortByAbsoluteTime("America/New_York"))
 * // Converts to NY timezone before comparison
 * 
 * // Mixed temporal types
 * const mixedTimes = [
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]"),
 *   Temporal.Instant.from("2024-03-15T17:00:00Z"),
 *   Temporal.PlainDateTime.from("2024-03-15T16:30:00") // treated as UTC
 * ]
 * mixedTimes.sort(sortByAbsoluteTime())
 * // Sorted by absolute UTC time regardless of original type
 * 
 * // Meeting schedule sorting
 * const meetings = [
 *   {
 *     title: "London team call",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T09:00:00[Europe/London]")
 *   },
 *   {
 *     title: "NY team call", 
 *     time: Temporal.ZonedDateTime.from("2024-03-15T09:00:00[America/New_York]")
 *   },
 *   {
 *     title: "Tokyo team call",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T09:00:00[Asia/Tokyo]")
 *   }
 * ]
 * meetings.sort((a, b) => sortByAbsoluteTime()(a.time, b.time))
 * // Sorted by actual UTC time, not local 9:00 AM
 * 
 * // Event timeline sorting
 * const events = [
 *   {
 *     name: "Server deployment",
 *     timestamp: Temporal.Instant.from("2024-03-15T14:30:00Z")
 *   },
 *   {
 *     name: "User login",
 *     timestamp: Temporal.ZonedDateTime.from("2024-03-15T10:25:00[America/New_York]")
 *   },
 *   {
 *     name: "Cache clear",
 *     timestamp: Temporal.PlainDateTime.from("2024-03-15T14:35:00") // UTC
 *   }
 * ]
 * events.sort((a, b) => sortByAbsoluteTime()(a.timestamp, b.timestamp))
 * 
 * // Log entry chronological sorting
 * const logEntries = [
 *   { level: "ERROR", time: Temporal.Instant.from("2024-03-15T14:32:15Z") },
 *   { level: "INFO", time: Temporal.Instant.from("2024-03-15T14:30:00Z") },
 *   { level: "WARN", time: Temporal.Instant.from("2024-03-15T14:31:45Z") }
 * ]
 * logEntries.sort((a, b) => sortByAbsoluteTime()(a.time, b.time))
 * // Chronological order: INFO, WARN, ERROR
 * 
 * // Partial application for reusable sorters
 * const sortInstants = sortByAbsoluteTime()
 * const sortInNYTime = sortByAbsoluteTime("America/New_York")
 * const sortInUTC = sortByAbsoluteTime("UTC")
 * 
 * // Database result sorting
 * function sortQueryResults<T extends { createdAt: Temporal.ZonedDateTime }>(
 *   results: Array<T>
 * ): Array<T> {
 *   return results.sort((a, b) => 
 *     sortByAbsoluteTime()(a.createdAt, b.createdAt)
 *   )
 * }
 * 
 * // Appointment scheduling
 * const appointments = [
 *   {
 *     patient: "John",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 *   },
 *   {
 *     patient: "Jane", 
 *     time: Temporal.ZonedDateTime.from("2024-03-15T19:30:00[Europe/London]")
 *   },
 *   {
 *     patient: "Bob",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T13:00:00[America/New_York]")
 *   }
 * ]
 * 
 * const sortedAppointments = appointments.sort((a, b) => 
 *   sortByAbsoluteTime()(a.time, b.time)
 * )
 * 
 * // Flight departure sorting (different timezones)
 * const flights = [
 *   {
 *     flight: "AA123",
 *     departure: Temporal.ZonedDateTime.from("2024-03-15T08:00:00[America/New_York]")
 *   },
 *   {
 *     flight: "BA456", 
 *     departure: Temporal.ZonedDateTime.from("2024-03-15T13:00:00[Europe/London]")
 *   },
 *   {
 *     flight: "JL789",
 *     departure: Temporal.ZonedDateTime.from("2024-03-15T22:00:00[Asia/Tokyo]")
 *   }
 * ]
 * 
 * const chronologicalFlights = flights.sort((a, b) => 
 *   sortByAbsoluteTime()(a.departure, b.departure)
 * )
 * 
 * // Task queue priority by deadline
 * const tasks = [
 *   {
 *     id: "task1",
 *     deadline: Temporal.ZonedDateTime.from("2024-03-15T17:00:00[UTC]")
 *   },
 *   {
 *     id: "task2", 
 *     deadline: Temporal.ZonedDateTime.from("2024-03-15T12:00:00[America/New_York]")
 *   },
 *   {
 *     id: "task3",
 *     deadline: Temporal.ZonedDateTime.from("2024-03-15T18:00:00[Europe/London]")
 *   }
 * ]
 * 
 * const tasksByDeadline = tasks.sort((a, b) => 
 *   sortByAbsoluteTime()(a.deadline, b.deadline)
 * )
 * 
 * // Null/undefined handling (puts nulls at end)
 * function sortWithNulls<T extends Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime>(
 *   times: Array<T | null>
 * ): Array<T | null> {
 *   return times.sort((a, b) => {
 *     if (a === null && b === null) return 0
 *     if (a === null) return 1  // nulls at end
 *     if (b === null) return -1
 *     return sortByAbsoluteTime()(a, b)
 *   })
 * }
 * 
 * // Performance monitoring - sort by execution time
 * const executions = [
 *   {
 *     function: "processA",
 *     startTime: Temporal.Instant.from("2024-03-15T14:30:15.123Z")
 *   },
 *   {
 *     function: "processB", 
 *     startTime: Temporal.Instant.from("2024-03-15T14:30:14.987Z")
 *   },
 *   {
 *     function: "processC",
 *     startTime: Temporal.Instant.from("2024-03-15T14:30:15.456Z")
 *   }
 * ]
 * 
 * const executionOrder = executions.sort((a, b) => 
 *   sortByAbsoluteTime()(a.startTime, b.startTime)
 * )
 * 
 * // Reverse chronological order (newest first)
 * function sortByAbsoluteTimeDesc(timeZone?: string) {
 *   return (a: any, b: any) => -sortByAbsoluteTime(timeZone)(a, b)
 * }
 * 
 * const recentFirst = events.sort((a, b) => 
 *   sortByAbsoluteTimeDesc()(a.timestamp, b.timestamp)
 * )
 * 
 * // Custom sort with fallback
 * function sortByTimeWithFallback<T>(
 *   getTime: (item: T) => Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime | null,
 *   getFallback: (item: T) => number = () => 0
 * ) {
 *   return (a: T, b: T) => {
 *     const timeA = getTime(a)
 *     const timeB = getTime(b)
 *     
 *     if (timeA && timeB) {
 *       return sortByAbsoluteTime()(timeA, timeB)
 *     }
 *     
 *     // Use fallback for null times
 *     if (!timeA && !timeB) return getFallback(a) - getFallback(b)
 *     if (!timeA) return 1
 *     if (!timeB) return -1
 *     
 *     return 0
 *   }
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Handles mixed temporal types gracefully
 * @property Curried - Easily composable for partial application
 * @property Timezone-aware - Correctly handles timezone differences
 * @property Standard - Returns standard comparator values (-1, 0, 1)
 */
const sortByAbsoluteTime = (timeZone: string = "UTC") => (
	a: Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime | null | undefined,
	b: Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime | null | undefined
): number => {
	// Handle null/undefined cases
	if (a == null && b == null) return 0
	if (a == null) return 1  // nulls sort to end
	if (b == null) return -1
	
	try {
		// Convert both to Instants for absolute time comparison
		let instantA: Temporal.Instant
		let instantB: Temporal.Instant
		
		// Convert a to Instant
		if (a instanceof Temporal.Instant) {
			instantA = a
		} else if (a instanceof Temporal.ZonedDateTime) {
			instantA = a.toInstant()
		} else if (a instanceof Temporal.PlainDateTime) {
			instantA = a.toZonedDateTime(timeZone).toInstant()
		} else {
			// Invalid type for a
			return 1
		}
		
		// Convert b to Instant
		if (b instanceof Temporal.Instant) {
			instantB = b
		} else if (b instanceof Temporal.ZonedDateTime) {
			instantB = b.toInstant()
		} else if (b instanceof Temporal.PlainDateTime) {
			instantB = b.toZonedDateTime(timeZone).toInstant()
		} else {
			// Invalid type for b
			return -1
		}
		
		// Compare instants
		return Temporal.Instant.compare(instantA, instantB)
	} catch {
		// If conversion fails, try to compare based on type precedence
		// This is a fallback that shouldn't normally be reached
		if (a instanceof Temporal.Instant && !(b instanceof Temporal.Instant)) return -1
		if (!(a instanceof Temporal.Instant) && b instanceof Temporal.Instant) return 1
		if (a instanceof Temporal.ZonedDateTime && b instanceof Temporal.PlainDateTime) return -1
		if (a instanceof Temporal.PlainDateTime && b instanceof Temporal.ZonedDateTime) return 1
		
		return 0
	}
}

export default sortByAbsoluteTime