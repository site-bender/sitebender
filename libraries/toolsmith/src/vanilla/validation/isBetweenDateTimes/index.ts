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

//?? [EXAMPLE] isBetweenDateTimes("2024-01-15T09:00:00")("2024-01-15T17:00:00")("2024-01-15T12:00:00") // true
//?? [EXAMPLE] isBetweenDateTimes("2024-01-15T09:00:00")("2024-01-15T17:00:00")("2024-01-15T08:59:59") // false
//?? [EXAMPLE] isBetweenDateTimes("2024-01-01T00:00:00")("2024-12-31T23:59:59")("2024-01-01T00:00:00") // true (inclusive)
//?? [EXAMPLE] isBetweenDateTimes("2024-01-01T00:00:00")("2024-12-31T23:59:59")("2024-12-31T23:59:59") // true (inclusive)
/*??
 | [EXAMPLE]
 | const isWorkingHours = isBetweenDateTimes("2024-01-15T09:00:00")("2024-01-15T17:00:00")
 | isWorkingHours("2024-01-15T12:00:00")  // true
 | isWorkingHours("2024-01-15T08:59:59")  // false
 | isWorkingHours("2024-01-16T12:00:00")  // false (next day)
 |
 | const isEventActive = isBetweenDateTimes("2024-06-01T10:00:00")("2024-06-03T22:00:00")
 | const events = [
 |   { name: "Setup", time: "2024-06-01T08:00:00" },
 |   { name: "Opening", time: "2024-06-01T10:00:00" },
 |   { name: "Closing", time: "2024-06-03T22:00:00" }
 | ]
 | const activeEvents = events.filter(e => isEventActive(e.time))
 | // [{ name: "Opening", ... }, { name: "Closing", ... }]
 |
 | [GOTCHA] Inclusive boundaries - datetime can equal start or end
 | [GOTCHA] Invalid range (start > end) always returns false
 | [GOTCHA] Nanosecond precision for time comparisons
 | [GOTCHA] No timezone awareness (uses plain/local datetime)
 |
*/
