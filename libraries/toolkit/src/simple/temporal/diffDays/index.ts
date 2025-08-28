/**
 * Calculates the difference in days between two dates
 *
 * Computes the number of days from the first date to the second date.
 * Returns a positive number if the second date is later, negative if
 * earlier. Works with PlainDate and PlainDateTime. Fractional days
 * are truncated for PlainDateTime comparisons. Returns null for invalid inputs.
 *
 * @param from - The starting date
 * @param to - The ending date
 * @returns Number of days difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const date1 = Temporal.PlainDate.from("2024-03-01")
 * const date2 = Temporal.PlainDate.from("2024-03-15")
 * diffDays(date1)(date2)                  // 14
 * diffDays(date2)(date1)                  // -14
 *
 * // Leap year handling  
 * const feb28_2024 = Temporal.PlainDate.from("2024-02-28")
 * const mar1_2024 = Temporal.PlainDate.from("2024-03-01")
 * diffDays(feb28_2024)(mar1_2024)         // 2 (leap year)
 *
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T08:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-20T22:00:00")
 * diffDays(dt1)(dt2)                      // 5
 *
 * // Partial application
 * const birthDate = Temporal.PlainDate.from("1990-06-15")
 * const daysSinceBirth = diffDays(birthDate)
 * const today = Temporal.Now.plainDateISO()
 * daysSinceBirth(today)                   // Days since birth
 *
 * // Days until deadline
 * const deadline = Temporal.PlainDate.from("2024-12-31")
 * const daysRemaining = diffDays(
 *   Temporal.Now.plainDateISO()
 * )(deadline)
 *
 * // Null handling
 * diffDays(null)(date2)                   // null
 * diffDays(date1)(null)                   // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
const diffDays =
	(from: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined) =>
	(
		to: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
	): number | null => {
		if (from == null || to == null) {
			return null
		}

		// Convert PlainDateTime to PlainDate if needed
		let fromDate: Temporal.PlainDate
		let toDate: Temporal.PlainDate

		try {
			if (from instanceof Temporal.PlainDateTime) {
				fromDate = from.toPlainDate()
			} else if (from instanceof Temporal.PlainDate) {
				fromDate = from
			} else {
				return null
			}

			if (to instanceof Temporal.PlainDateTime) {
				toDate = to.toPlainDate()
			} else if (to instanceof Temporal.PlainDate) {
				toDate = to
			} else {
				return null
			}

			// Calculate difference in days
			const duration = toDate.since(fromDate, { largestUnit: "days" })
			return duration.days
		} catch {
			return null
		}
	}

export default diffDays
