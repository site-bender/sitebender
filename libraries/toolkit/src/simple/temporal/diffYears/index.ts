import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the difference in years between two dates
 *
 * Computes the number of whole years from the first date to the second date.
 * Returns a positive number if the second date is later, negative if earlier.
 * Partial years are truncated. Works with PlainDate, PlainDateTime, and
 * PlainYearMonth. Accounts for leap years correctly. Returns null for invalid inputs.
 *
 * @param from - The starting date
 * @param to - The ending date
 * @returns Number of whole years difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const date1 = Temporal.PlainDate.from("2020-06-15")
 * const date2 = Temporal.PlainDate.from("2024-06-15")
 * diffYears(date1)(date2)                 // 4
 * diffYears(date2)(date1)                 // -4
 *
 * // Partial years truncated
 * const jan2020 = Temporal.PlainDate.from("2020-01-15")
 * const dec2023 = Temporal.PlainDate.from("2023-12-14")
 * diffYears(jan2020)(dec2023)             // 3 (not quite 4)
 *
 * // Birthday calculation
 * const birth = Temporal.PlainDate.from("2000-03-15")
 * const beforeBirthday = Temporal.PlainDate.from("2024-03-14")
 * const onBirthday = Temporal.PlainDate.from("2024-03-15")
 * diffYears(birth)(beforeBirthday)        // 23 (day before)
 * diffYears(birth)(onBirthday)            // 24 (on birthday)
 *
 * // Leap year handling
 * const leapDay = Temporal.PlainDate.from("2020-02-29")
 * const nonLeap = Temporal.PlainDate.from("2023-03-01")
 * diffYears(leapDay)(nonLeap)             // 3 (passed anniversary)
 *
 * // With PlainYearMonth
 * const ym1 = Temporal.PlainYearMonth.from("2020-06")
 * const ym2 = Temporal.PlainYearMonth.from("2024-06")
 * diffYears(ym1)(ym2)                     // 4
 *
 * // Partial application
 * const birthDate = Temporal.PlainDate.from("1990-06-15")
 * const yearsSinceBirth = diffYears(birthDate)
 * const today = Temporal.Now.plainDateISO()
 * yearsSinceBirth(today)                  // Current age
 *
 * // Null handling
 * diffYears(null)(date2)                  // null
 * diffYears(date1)(null)                  // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
const diffYears = (
	from:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
) =>
(
	to:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
): number | null => {
	if (isNullish(from) || isNullish(to)) {
		return null
	}

	try {
		// Convert to appropriate types for comparison
		let fromDate: Temporal.PlainDate | Temporal.PlainYearMonth
		let toDate: Temporal.PlainDate | Temporal.PlainYearMonth

		if (from instanceof Temporal.PlainDateTime) {
			fromDate = from.toPlainDate()
		} else if (
			from instanceof Temporal.PlainDate ||
			from instanceof Temporal.PlainYearMonth
		) {
			fromDate = from
		} else {
			return null
		}

		if (to instanceof Temporal.PlainDateTime) {
			toDate = to.toPlainDate()
		} else if (
			to instanceof Temporal.PlainDate || to instanceof Temporal.PlainYearMonth
		) {
			toDate = to
		} else {
			return null
		}

		// Calculate difference in years
		const duration = toDate.since(fromDate, { largestUnit: "years" })
		return duration.years
	} catch {
		return null
	}
}

export default diffYears
