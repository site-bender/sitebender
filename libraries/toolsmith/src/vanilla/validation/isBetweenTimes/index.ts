import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

//++ Checks if a time is between two other times (inclusive)
export default function isBetweenTimes(
	startTime: TimeInput | null | undefined,
) {
	return function isBetweenTimesWithStart(
		endTime: TimeInput | null | undefined,
	) {
		return function isBetweenTimesWithStartAndEnd(
			time: TimeInput | null | undefined,
		): boolean {
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
	}
}

//?? [EXAMPLE] isBetweenTimes("09:00:00")("17:00:00")("12:00:00") // true
//?? [EXAMPLE] isBetweenTimes("09:00:00")("17:00:00")("08:59:59") // false
//?? [EXAMPLE] isBetweenTimes("22:00:00")("06:00:00")("23:00:00") // true (overnight)
//?? [EXAMPLE] isBetweenTimes("22:00:00")("06:00:00")("02:00:00") // true (overnight)
//?? [EXAMPLE] isBetweenTimes("09:00:00")("17:00:00")(null) // false
/*??
 | [EXAMPLE]
 | const isBusinessHours = isBetweenTimes("09:00:00")("17:00:00")
 | isBusinessHours("12:00:00")  // true
 | isBusinessHours("08:59:59")  // false
 | isBusinessHours("17:00:01")  // false
 |
 | // Overnight ranges (crossing midnight)
 | const isNightShift = isBetweenTimes("22:00:00")("06:00:00")
 | isNightShift("23:00:00")  // true (late evening)
 | isNightShift("02:00:00")  // true (early morning)
 | isNightShift("12:00:00")  // false (daytime)
 |
 | const getServicePeriod = (time: TimeInput): string => {
 |   const isBreakfast = isBetweenTimes("06:00")("10:59")
 |   const isLunch = isBetweenTimes("11:00")("16:59")
 |   const isDinner = isBetweenTimes("17:00")("21:59")
 |
 |   return isBreakfast(time) ? "breakfast"
 |     : isLunch(time) ? "lunch"
 |     : isDinner(time) ? "dinner"
 |     : "closed"
 | }
 |
 | [GOTCHA] Handles overnight ranges (e.g., 22:00 to 06:00)
 | [GOTCHA] Inclusive boundaries - time can equal start or end
 | [GOTCHA] Nanosecond precision for time comparisons
 |
*/
