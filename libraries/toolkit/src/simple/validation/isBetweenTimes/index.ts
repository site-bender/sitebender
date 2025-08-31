import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

/**
 * Checks if a time is between two other times (inclusive)
 *
 * Curried function that validates whether a time falls within a time range,
 * including the boundary times. Accepts various time formats and converts them
 * to Temporal.PlainTime for comparison. Compares time components with nanosecond
 * precision within a 24-hour period. Returns true if the time is greater than or
 * equal to the start time AND less than or equal to the end time. Handles
 * overnight ranges (where end time is before start time). Returns false for
 * invalid inputs or conversion failures.
 *
 * Time range rules:
 * - Inclusive boundaries: time can equal start or end time
 * - Handles standard ranges (e.g., 09:00 to 17:00)
 * - Handles overnight ranges (e.g., 22:00 to 02:00)
 * - Date-independent (only time of day matters)
 * - Nanosecond precision comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param startTime - The start of the time range (inclusive)
 * @param endTime - The end of the time range (inclusive)
 * @returns A predicate function that checks if a time is within the range
 * @example
 * ```typescript
 * // Basic usage
 * const isBusinessHours = isBetweenTimes("09:00:00", "17:00:00")
 * isBusinessHours("12:00:00")     // true
 * isBusinessHours("08:59:59")     // false
 * isBusinessHours("17:00:01")     // false
 *
 * // Overnight ranges (crossing midnight)
 * const isNightShift = isBetweenTimes("22:00:00", "06:00:00")
 * isNightShift("23:00:00")        // true (late evening)
 * isNightShift("02:00:00")        // true (early morning)
 * isNightShift("12:00:00")        // false (daytime)
 *
 * // Boundary conditions
 * const checker = isBetweenTimes("09:00", "17:00")
 * checker("09:00:00")             // true (inclusive start)
 * checker("17:00:00")             // true (inclusive end)
 *
 * // Invalid inputs
 * checker(null)                    // false
 * checker("invalid")               // false
 * checker("25:00:00")              // false
 *
 * // Service period detection
 * const getServicePeriod = (time: TimeInput): string => {
 *   const isBreakfast = isBetweenTimes("06:00", "10:59")
 *   const isLunch = isBetweenTimes("11:00", "16:59")
 *   const isDinner = isBetweenTimes("17:00", "21:59")
 *
 *   return isBreakfast(time) ? "breakfast"
 *     : isLunch(time) ? "lunch"
 *     : isDinner(time) ? "dinner"
 *     : "closed"
 * }
 * ```
 *
 * @curried
 * @predicate
 * @pure
 * @safe
 */
const isBetweenTimes = (
	startTime: TimeInput | null | undefined,
	endTime: TimeInput | null | undefined,
) =>
(
	time: TimeInput | null | undefined,
): boolean => {
	const start = toPlainTime(startTime)
	const end = toPlainTime(endTime)
	const checkTime = toPlainTime(time)

	if (!start || !end || !checkTime) {
		return false
	}

	try {
		const startCompare = Temporal.PlainTime.compare(start, end)

		// Handle overnight range (end time is before start time)
		if (startCompare > 0) {
			// Time is in range if it's >= start OR <= end
			// Example: 22:00 to 02:00 includes 23:00 and 01:00
			return Temporal.PlainTime.compare(checkTime, start) >= 0 ||
				Temporal.PlainTime.compare(checkTime, end) <= 0
		}

		// Normal range (end time is after start time)
		// Time is in range if it's >= start AND <= end
		return Temporal.PlainTime.compare(checkTime, start) >= 0 &&
			Temporal.PlainTime.compare(checkTime, end) <= 0
	} catch {
		return false
	}
}

export default isBetweenTimes
