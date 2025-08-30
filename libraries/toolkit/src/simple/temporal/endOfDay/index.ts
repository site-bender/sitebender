import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the end of day for a given date (23:59:59.999999999)
 *
 * Creates a PlainDateTime representing the last nanosecond of the given day.
 * Useful for date range queries, filtering, and day boundary calculations.
 * The time is set to 23:59:59.999999999 (maximum precision). Works with
 * PlainDate and PlainDateTime inputs. Returns null for invalid inputs.
 *
 * @param date - The date to get end of day for
 * @returns PlainDateTime at end of day, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const date = Temporal.PlainDate.from("2024-03-15")
 * endOfDay(date)
 * // PlainDateTime 2024-03-15T23:59:59.999999999
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * endOfDay(datetime)
 * // PlainDateTime 2024-03-15T23:59:59.999999999
 *
 * // Date range checking
 * const isWithinToday = (
 *   timestamp: Temporal.PlainDateTime
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const start = today.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   const end = endOfDay(today)
 *   return end ? 
 *     Temporal.PlainDateTime.compare(timestamp, start) >= 0 &&
 *     Temporal.PlainDateTime.compare(timestamp, end) <= 0
 *     : false
 * }
 *
 * // Deadline checking
 * const isBeforeDeadline = (
 *   submission: Temporal.PlainDateTime,
 *   deadlineDate: Temporal.PlainDate
 * ): boolean => {
 *   const deadline = endOfDay(deadlineDate)
 *   return deadline ? 
 *     Temporal.PlainDateTime.compare(submission, deadline) <= 0
 *     : false
 * }
 *
 * // Edge cases
 * endOfDay(null)                          // null
 * endOfDay(undefined)                     // null
 *
 * // Daily period
 * const getDailyPeriod = (date: Temporal.PlainDate) => ({
 *   start: date.toPlainDateTime(Temporal.PlainTime.from("00:00:00")),
 *   end: endOfDay(date)
 * })
 * ```
 * @pure
 * @immutable
 * @safe
 */
const endOfDay = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDateTime | null => {
	if (isNullish(date)) {
		return null
	}

	try {
		// Convert to PlainDate if needed
		let plainDate: Temporal.PlainDate

		if (date instanceof Temporal.PlainDateTime) {
			plainDate = date.toPlainDate()
		} else if (date instanceof Temporal.PlainDate) {
			plainDate = date
		} else {
			return null
		}

		// Create end of day time (23:59:59.999999999)
		const endTime = Temporal.PlainTime.from({
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999,
			microsecond: 999,
			nanosecond: 999,
		})

		// Combine date with end time
		return plainDate.toPlainDateTime(endTime)
	} catch {
		return null
	}
}

export default endOfDay
