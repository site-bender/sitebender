import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is before another time
 *
 * Curried function that validates whether one time comes chronologically
 * before another time within a 24-hour period. Accepts various time formats
 * and converts them to Temporal.PlainTime for comparison. Compares time
 * components with nanosecond precision. Returns false for equal times,
 * invalid inputs, or conversion failures.
 *
 * Time comparison rules:
 * - Compares time within a 24-hour cycle (00:00:00 to 23:59:59.999999999)
 * - Strictly before: time must be chronologically earlier
 * - Equal times return false (use isSameOrBeforeTime for inclusive)
 * - Nanosecond precision comparison
 * - Date-independent (only time of day matters)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference time (string, Date, Temporal types, or time-like object)
 * @returns A predicate function that checks if a time is before the reference
 * @example
 * ```typescript
 * // Basic usage with ISO time strings
 * const isBefore230PM = isBeforeTime("14:30:00")
 * isBefore230PM("13:30:00")     // true (before)
 * isBefore230PM("15:30:00")     // false (after)
 * isBefore230PM("14:30:00")     // false (same time)
 *
 * // Millisecond precision
 * const precise = isBeforeTime("12:00:00.500")
 * precise("12:00:00.499")       // true (1ms earlier)
 * precise("12:00:00.501")       // false (1ms later)
 *
 * // With Temporal PlainTime
 * const time = Temporal.PlainTime.from("14:30:00")
 * const checker = isBeforeTime(time)
 * checker("13:30:00")           // true
 * checker("15:30:00")           // false
 *
 * // Filter time slots
 * const slots = ["09:00", "10:00", "11:00", "14:00", "15:00"]
 * const beforeNoon = slots.filter(isBeforeTime("12:00:00"))
 * // ["09:00", "10:00", "11:00"]
 *
 * // Check business hours
 * const isBeforeOpening = (time: TimeInput): boolean =>
 *   isBeforeTime("09:00:00")(time)
 * 
 * isBeforeOpening("08:30:00")   // true
 * isBeforeOpening("10:00:00")   // false
 *
 * // Edge cases
 * const check = isBeforeTime("14:30:00")
 * check(null)                   // false
 * check(undefined)              // false
 * check("invalid")              // false
 * check("25:00:00")             // false (invalid hour)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isBeforeTime = (
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
		return Temporal.PlainTime.compare(compareTime, refTime) < 0
	} catch {
		return false
	}
}

export default isBeforeTime
