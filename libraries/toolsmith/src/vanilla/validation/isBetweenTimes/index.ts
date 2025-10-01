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
