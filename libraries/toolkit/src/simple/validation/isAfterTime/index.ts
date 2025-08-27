import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is after another time
 *
 * Curried function that validates whether one time comes chronologically
 * after another time within a 24-hour period. Accepts various time formats
 * and converts them to Temporal.PlainTime for comparison. Compares time
 * components with nanosecond precision. Returns false for equal times,
 * invalid inputs, or conversion failures.
 *
 * Time comparison rules:
 * - Compares time within a 24-hour cycle (00:00:00 to 23:59:59.999999999)
 * - Strictly after: time must be chronologically later
 * - Equal times return false (use isSameOrAfterTime for inclusive)
 * - Nanosecond precision comparison
 * - Date-independent (only time of day matters)
 *
 * @param reference - The reference Temporal.PlainTime to compare against
 * @returns A predicate function that checks if a time is after the reference
 * @example
 * ```typescript
 * // Basic usage
 * const time1 = Temporal.PlainTime.from("14:30:00")
 * const time2 = Temporal.PlainTime.from("15:30:00")
 * const isAfter230PM = isAfterTime(time1)
 * isAfter230PM(time2)  // true
 * isAfter230PM(time1)  // false (same)
 *
 * // Millisecond precision
 * const precise = Temporal.PlainTime.from("12:00:00.500")
 * isAfterTime(precise)("12:00:00.501")  // true
 *
 * // Business hours check
 * const businessOpen = Temporal.PlainTime.from("09:00:00")
 * isAfterTime(businessOpen)("10:30:00")  // true
 *
 * // Edge case: midnight boundary
 * const almostMidnight = Temporal.PlainTime.from("23:59:59")
 * isAfterTime(almostMidnight)("00:00:01")  // false (next day)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isAfterTime = (
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
		return Temporal.PlainTime.compare(compareTime, refTime) > 0
	} catch {
		return false
	}
}

export default isAfterTime
