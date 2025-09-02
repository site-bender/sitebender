/**
 * Comparator for sorting by absolute time
 *
 * Creates a comparator function for sorting temporal objects by their absolute
 * time values. Works with Instant, ZonedDateTime, and PlainDateTime objects,
 * converting them to absolute instants for comparison when necessary. Returns
 * a standard comparator result (-1, 0, 1) for use with Array.sort() and other
 * sorting utilities. Handles timezone-aware comparisons correctly.
 *
 * @curried
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
 * flights.sort((a, b) => sortByAbsoluteTime()(a.departure, b.departure))
 * // Sorted by actual UTC time
 *
 * // Reverse chronological order (newest first)
 * const reverseSort = (a: any, b: any) => -sortByAbsoluteTime()(a, b)
 * instants.sort(reverseSort)
 * // Newest times first
 * ```
 * @pure
 * @safe
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

const sortByAbsoluteTime = (timeZone: string = "UTC") =>
(
	a:
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDateTime
		| null
		| undefined,
	b:
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDateTime
		| null
		| undefined,
): number => {
	// Handle null/undefined cases
	if (isNullish(a) && isNullish(b)) return 0
	if (isNullish(a)) return 1 // nulls sort to end
	if (isNullish(b)) return -1

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
		if (a instanceof Temporal.Instant && !(b instanceof Temporal.Instant)) {
			return -1
		}
		if (!(a instanceof Temporal.Instant) && b instanceof Temporal.Instant) {
			return 1
		}
		if (
			a instanceof Temporal.ZonedDateTime && b instanceof Temporal.PlainDateTime
		) return -1
		if (
			a instanceof Temporal.PlainDateTime && b instanceof Temporal.ZonedDateTime
		) return 1

		return 0
	}
}

export default sortByAbsoluteTime
