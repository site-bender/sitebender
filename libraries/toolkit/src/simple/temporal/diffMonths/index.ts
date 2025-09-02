/**
 * Calculates the difference in months between two dates
 *
 * Computes the number of whole months from the first date to the second date.
 * Returns a positive number if the second date is later, negative if earlier.
 * Partial months are truncated. Works with PlainDate, PlainDateTime, and
 * PlainYearMonth. Returns null for invalid inputs.
 *
 * @param from - The starting date
 * @param to - The ending date
 * @returns Number of whole months difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-03-15")
 * diffMonths(date1)(date2)                // 2
 * diffMonths(date2)(date1)                // -2
 *
 * // Partial months truncated
 * const jan15 = Temporal.PlainDate.from("2024-01-15")
 * const feb10 = Temporal.PlainDate.from("2024-02-10")
 * diffMonths(jan15)(feb10)                // 0 (less than full month)
 *
 * // Year boundary crossing
 * const nov2023 = Temporal.PlainDate.from("2023-11-15")
 * const feb2024 = Temporal.PlainDate.from("2024-02-15")
 * diffMonths(nov2023)(feb2024)            // 3
 *
 * // With PlainYearMonth
 * const ym1 = Temporal.PlainYearMonth.from("2024-01")
 * const ym2 = Temporal.PlainYearMonth.from("2024-06")
 * diffMonths(ym1)(ym2)                    // 5
 *
 * // Partial application
 * const birthDate = Temporal.PlainDate.from("2000-06-15")
 * const monthsSinceBirth = diffMonths(birthDate)
 * const today = Temporal.Now.plainDateISO()
 * monthsSinceBirth(today)                 // Months since birth
 *
 * // Phase duration mapping
 * const phases = [
 *   { start: Temporal.PlainDate.from("2024-01-01"), end: Temporal.PlainDate.from("2024-03-31") },
 *   { start: Temporal.PlainDate.from("2024-04-01"), end: Temporal.PlainDate.from("2024-08-31") }
 * ]
 * const durations = phases.map(phase => diffMonths(phase.start)(phase.end))
 * // [2, 4]
 *
 * // Null handling
 * diffMonths(null)(date2)                 // null
 * diffMonths(date1)(null)                 // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
import isNullish from "../../../validation/isNullish"

const diffMonths = (
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

		// Calculate difference in months
		const duration = toDate.since(fromDate, { largestUnit: "months" })
		return duration.months
	} catch {
		return null
	}
}

export default diffMonths
