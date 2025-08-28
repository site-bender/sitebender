/**
 * Subtracts a Temporal.Duration from a date/time
 *
 * Creates a new Temporal date/time by subtracting the specified duration. Handles
 * various Temporal types including dates, times, datetimes, and instants. The
 * operation respects calendar rules, time zones, and daylight saving transitions
 * when applicable. Returns null for invalid inputs to support safe error handling.
 * @param duration - The Temporal.Duration to subtract
 * @param temporal - The Temporal object to subtract from
 * @returns New temporal with duration subtracted, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const duration = Temporal.Duration.from({ days: 10 })
 * subtractDuration(duration)(date)        // PlainDate 2024-03-05
 *
 * // Multiple units
 * const complexDuration = Temporal.Duration.from({ years: 1, months: 2, days: 3 })
 * subtractDuration(complexDuration)(date) // PlainDate 2023-01-12
 *
 * // With various Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * const timeDuration = Temporal.Duration.from({ hours: 2, minutes: 15 })
 * subtractDuration(timeDuration)(datetime) // PlainDateTime 2024-03-15T12:15:15
 *
 * // Month-end handling (leap year)
 * const monthEnd = Temporal.PlainDate.from("2024-03-31")
 * const monthDuration = Temporal.Duration.from({ months: 1 })
 * subtractDuration(monthDuration)(monthEnd) // PlainDate 2024-02-29
 *
 * // Partial application for batch processing
 * const goBackOneMonth = subtractDuration(Temporal.Duration.from({ months: 1 }))
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-06-15")
 * ]
 * dates.map(goBackOneMonth)  // [2024-02-15, 2024-05-15]
 *
 * // Historical dates using functional approach
 * const getHistoricalDates = (periods: number, duration: Temporal.Duration) => {
 *   const today = Temporal.Now.plainDateISO()
 *   return Array.from({ length: periods + 1 }, (_, i) => 
 *     i === 0 ? today : subtractDuration(
 *       Temporal.Duration.from({
 *         days: (duration.days ?? 0) * i,
 *         months: (duration.months ?? 0) * i,
 *         years: (duration.years ?? 0) * i
 *       })
 *     )(today)
 *   )
 * }
 *
 * // Invalid inputs return null
 * subtractDuration(null)(date)            // null
 * subtractDuration(duration)(null)        // null
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const subtractDuration = (duration: Temporal.Duration | null | undefined) =>
(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| null => {
	if (duration == null || temporal == null) {
		return null
	}

	// Validate duration is a Temporal.Duration
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	// Validate temporal is a valid Temporal type
	const isValidTemporal = temporal instanceof Temporal.PlainDate ||
		temporal instanceof Temporal.PlainDateTime ||
		temporal instanceof Temporal.PlainTime ||
		temporal instanceof Temporal.ZonedDateTime ||
		temporal instanceof Temporal.Instant

	if (!isValidTemporal) {
		return null
	}

	try {
		// Handle PlainTime specially (it doesn't have a subtract method)
		if (temporal instanceof Temporal.PlainTime) {
			// Convert to PlainDateTime for calculation
			const refDate = Temporal.PlainDate.from("2000-01-01")
			const dateTime = refDate.toPlainDateTime(temporal)
			const result = dateTime.subtract(duration)
			return result.toPlainTime()
		}

		// For all other types, use the subtract method
		// @ts-ignore - TypeScript doesn't recognize the common subtract method
		return temporal.subtract(duration)
	} catch {
		return null
	}
}

export default subtractDuration
