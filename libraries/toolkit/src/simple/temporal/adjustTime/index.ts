import isNotUndefined from "../../validation/isNotUndefined/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Adjusts time components of a PlainDateTime while preserving the date
 *
 * Immutably modifies specific time components (hour, minute, second, etc.)
 * of a PlainDateTime while keeping the date portion unchanged. Accepts a
 * partial time specification and merges it with the existing datetime.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param timeAdjustment - Object with time components to adjust
 * @param datetime - The PlainDateTime to adjust
 * @returns New PlainDateTime with adjusted time, or null if invalid
 * @example
 * ```typescript
 * // Basic time adjustments
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * adjustTime({ hour: 14 })(datetime)      // 2024-03-15T14:30:45
 * adjustTime({ minute: 0 })(datetime)     // 2024-03-15T10:00:45
 *
 * // Multiple components at once
 * adjustTime({ hour: 9, minute: 0, second: 0 })(datetime)
 * // 2024-03-15T09:00:00
 *
 * // Partial application
 * const setToMidnight = adjustTime({
 *   hour: 0, minute: 0, second: 0, millisecond: 0
 * })
 * const setToNoon = adjustTime({ hour: 12, minute: 0, second: 0 })
 *
 * const someDate = Temporal.PlainDateTime.from("2024-03-15T14:23:45.123")
 * setToMidnight(someDate)                 // 2024-03-15T00:00:00.000
 * setToNoon(someDate)                     // 2024-03-15T12:00:00.123
 *
 * // Null handling
 * adjustTime({ hour: 10 })(null)          // null
 * adjustTime(null)(datetime)              // null
 * ```
 * @pure
 * @immutable
 * @safe - Returns null for invalid inputs
 * @curried
 */
const adjustTime = (
	timeAdjustment:
		| {
			hour?: number
			minute?: number
			second?: number
			millisecond?: number
			microsecond?: number
			nanosecond?: number
		}
		| null
		| undefined,
) =>
(
	datetime: Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDateTime | null => {
	if (isNullish(datetime) || isNullish(timeAdjustment)) {
		return null
	}

	if (!(datetime instanceof Temporal.PlainDateTime)) {
		return null
	}

	try {
		// Build the with() argument, only including defined properties
		const withArgs: Record<string, number> = {}

		if (isNotUndefined(timeAdjustment.hour)) {
			withArgs.hour = timeAdjustment.hour
		}
		if (isNotUndefined(timeAdjustment.minute)) {
			withArgs.minute = timeAdjustment.minute
		}
		if (isNotUndefined(timeAdjustment.second)) {
			withArgs.second = timeAdjustment.second
		}
		if (isNotUndefined(timeAdjustment.millisecond)) {
			withArgs.millisecond = timeAdjustment.millisecond
		}
		if (isNotUndefined(timeAdjustment.microsecond)) {
			withArgs.microsecond = timeAdjustment.microsecond
		}
		if (isNotUndefined(timeAdjustment.nanosecond)) {
			withArgs.nanosecond = timeAdjustment.nanosecond
		}

		return datetime.with(withArgs)
	} catch {
		return null
	}
}

export default adjustTime
