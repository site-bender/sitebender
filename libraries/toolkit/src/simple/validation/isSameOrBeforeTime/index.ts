import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is the same as or before another time
 *
 * Validates whether one time is chronologically the same as or before
 * another time. Accepts various time formats and converts them to
 * Temporal.PlainTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate time comparisons with nanosecond precision.
 * Returns true for equal times, times before the reference, and false
 * for times after or invalid inputs.
 *
 * Time comparison rules:
 * - Same or before: time must be equal to or chronologically earlier
 * - Equal times return true (inclusive comparison)
 * - Compares hours, minutes, seconds, milliseconds, and nanoseconds
 * - Day boundaries are not considered (00:00 is before 23:59)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference time (string, Date, Temporal types, or time-like object)
 * @returns A predicate function that checks if a time is same or before the reference
 * @example
 * ```typescript
 * // Basic usage with ISO time strings
 * const isSameOrBefore5PM = isSameOrBeforeTime("17:00:00")
 * isSameOrBefore5PM("16:30:00")     // true (before)
 * isSameOrBefore5PM("17:00:00")     // true (same)
 * isSameOrBefore5PM("17:30:00")     // false (after)
 *
 * // With Temporal PlainTime objects
 * const time1 = Temporal.PlainTime.from("14:30:00")
 * const checker = isSameOrBeforeTime(time1)
 * checker(Temporal.PlainTime.from("13:15:00"))  // true
 * checker(time1)                                  // true (same)
 *
 * // Millisecond precision
 * const precise = isSameOrBeforeTime("12:00:00.500")
 * precise("12:00:00.499")  // true (1ms before)
 * precise("12:00:00.500")  // true (same)
 * precise("12:00:00.501")  // false (1ms after)
 *
 * // Filter appointments before cutoff
 * const appointments = ["08:00", "10:00", "12:00", "14:00", "16:00"]
 * const morningOnly = appointments.filter(isSameOrBeforeTime("12:00:00"))
 * // ["08:00", "10:00", "12:00"]
 *
 * // Validate cutoff times
 * const validateOrderTime = (orderTime: string, cutoff: string): boolean =>
 *   isSameOrBeforeTime(cutoff)(orderTime)
 *
 * validateOrderTime("14:30:00", "15:00:00")  // true
 * validateOrderTime("15:01:00", "15:00:00")  // false
 *
 * // Edge cases
 * const check = isSameOrBeforeTime("17:00:00")
 * check(null)              // false
 * check(undefined)         // false
 * check("invalid-time")    // false
 * check("25:00:00")        // false (invalid hour)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isSameOrBeforeTime = (
	reference: TimeInput | null | undefined,
) =>
(
	time: TimeInput | null | undefined,
): boolean => {
	const refTime = toPlainTime(reference)
	const compareTime = toPlainTime(time)

	if (!refTime || !compareTime) {
		return false
	}

	try {
		return Temporal.PlainTime.compare(compareTime, refTime) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeTime
