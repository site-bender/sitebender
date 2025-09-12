import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is the same as or after another time
 *
 * Validates whether one time is chronologically the same as or after
 * another time. Accepts various time formats and converts them to
 * Temporal.PlainTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate time comparisons with nanosecond precision.
 * Returns true for equal times, times after the reference, and false
 * for times before or invalid inputs.
 *
 * Time comparison rules:
 * - Same or after: time must be equal to or chronologically later
 * - Equal times return true (inclusive comparison)
 * - Compares hours, minutes, seconds, milliseconds, and nanoseconds
 * - Day boundaries are not considered (23:59 is after 00:00)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference time (string, Date, Temporal types, or time-like object)
 * @returns A predicate function that checks if a time is same or after the reference
 * @example
 * ```typescript
 * // Basic usage with ISO time strings
 * const isSameOrAfter9AM = isSameOrAfterTime("09:00:00")
 * isSameOrAfter9AM("10:30:00")     // true (after)
 * isSameOrAfter9AM("09:00:00")     // true (same)
 * isSameOrAfter9AM("08:30:00")     // false (before)
 *
 * // With Temporal PlainTime
 * const time = Temporal.PlainTime.from("14:30:00")
 * const checker = isSameOrAfterTime(time)
 * checker("15:45:00")              // true
 * checker(time)                     // true (same)
 *
 * // Millisecond precision
 * const precise = isSameOrAfterTime("12:00:00.500")
 * precise("12:00:00.501")          // true (1ms after)
 * precise("12:00:00.500")          // true (same)
 * precise("12:00:00.499")          // false (1ms before)
 *
 * // Filter time slots
 * const slots = ["08:00", "09:00", "10:00", "11:00", "12:00"]
 * const afterNineThirty = slots.filter(isSameOrAfterTime("09:30:00"))
 * // ["10:00", "11:00", "12:00"]
 *
 * // Validate appointment times
 * const validateTime = (requested: string, earliest: string): boolean =>
 *   isSameOrAfterTime(earliest)(requested)
 *
 * validateTime("10:00:00", "09:00:00")  // true
 * validateTime("08:30:00", "09:00:00")  // false
 *
 * // Service availability check
 * const isOpen = (time: string): boolean =>
 *   isSameOrAfterTime("08:00:00")(time) &&
 *   !isSameOrAfterTime("20:00:00")(time)
 *
 * // Edge cases
 * const check = isSameOrAfterTime("09:00:00")
 * check(null)                      // false
 * check(undefined)                 // false
 * check("invalid-time")            // false
 * check("25:00:00")                // false (invalid hour)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isSameOrAfterTime = (
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
		return Temporal.PlainTime.compare(compareTime, refTime) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterTime
