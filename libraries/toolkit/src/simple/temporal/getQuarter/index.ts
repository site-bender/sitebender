import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the quarter (1-4) from a Temporal date or datetime
 *
 * Determines which quarter of the year a date falls into. Returns 1 for Q1
 * (January-March), 2 for Q2 (April-June), 3 for Q3 (July-September), and 4
 * for Q4 (October-December). This is based on the calendar month, so the
 * exact quarter boundaries depend on the calendar system. Returns null for
 * invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get quarter from
 * @returns The quarter number (1-4), or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const q1Date = Temporal.PlainDate.from("2024-02-15")
 * getQuarter(q1Date)                      // 1 (February is in Q1)
 *
 * const q2Date = Temporal.PlainDate.from("2024-05-20")
 * getQuarter(q2Date)                      // 2 (May is in Q2)
 *
 * // Quarter boundaries
 * const q1Start = Temporal.PlainDate.from("2024-01-01")
 * getQuarter(q1Start)                     // 1 (January 1)
 *
 * const q4End = Temporal.PlainDate.from("2024-12-31")
 * getQuarter(q4End)                       // 4 (December 31)
 *
 * // With different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-07-15T10:30:00")
 * getQuarter(datetime)                    // 3 (July is in Q3)
 *
 * const yearMonth = Temporal.PlainYearMonth.from("2024-10")
 * getQuarter(yearMonth)                   // 4 (October is in Q4)
 *
 * // Composition example
 * const getQuarterName = (date: Temporal.PlainDate): string => {
 *   const quarter = getQuarter(date)
 *   return quarter ? `Q${quarter}` : "Unknown"
 * }
 *
 * // Edge cases
 * getQuarter(null)                        // null
 * getQuarter(undefined)                   // null
 * ```
 * @pure
 * @safe
 */
const getQuarter = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		const month = date.month
		return Math.ceil(month / 3)
	} catch {
		return null
	}
}

export default getQuarter
