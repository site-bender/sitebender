import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//++ Checks if a datetime is between two other datetimes (inclusive)
export default function isBetweenDateTimes(
	startDateTime: DateTimeInput | null | undefined,
) {
	return function isBetweenDateTimesWithStart(
		endDateTime: DateTimeInput | null | undefined,
	) {
		return function isBetweenDateTimesWithStartAndEnd(
			datetime: DateTimeInput | null | undefined,
		): boolean {
			const start = toPlainDateTime(startDateTime)
			const end = toPlainDateTime(endDateTime)
			const checkDateTime = toPlainDateTime(datetime)

			if (!start || !end || !checkDateTime) {
				return false
			}

			try {
				// Check if range is valid (start <= end)
				if (Temporal.PlainDateTime.compare(start, end) > 0) {
					return false
				}

				// Check if datetime is >= start AND <= end
				return Temporal.PlainDateTime.compare(checkDateTime, start) >= 0 &&
					Temporal.PlainDateTime.compare(checkDateTime, end) <= 0
			} catch {
				return false
			}
		}
	}
}
