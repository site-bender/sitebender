import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//++ Checks if a datetime is before another datetime
export default function isBeforeDateTime(
	reference: DateTimeInput | null | undefined,
) {
	return function checkIsBeforeDateTime(
		datetime: DateTimeInput | null | undefined,
	): boolean {
		const refDateTime = toPlainDateTime(reference)
		const compareDateTime = toPlainDateTime(datetime)

		if (!refDateTime || !compareDateTime) {
			return false
		}

		try {
			return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) < 0
		} catch {
			return false
		}
	}
}

//?? [EXAMPLE] isBeforeDateTime("2024-01-15T14:30:00")("2024-01-15T13:30:00") // true
//?? [EXAMPLE] isBeforeDateTime("2024-01-15T14:30:00")("2024-01-15T15:30:00") // false
//?? [EXAMPLE] isBeforeDateTime("2024-01-15T14:30:00")("2024-01-15T14:30:00") // false (same)
//?? [EXAMPLE] isBeforeDateTime("2024-01-15T14:30:00")(null) // false
/*??
 | [EXAMPLE]
 | const isBefore230PM = isBeforeDateTime("2024-01-15T14:30:00")
 | isBefore230PM("2024-01-15T13:30:00")  // true
 | isBefore230PM("2024-01-15T15:30:00")  // false
 | isBefore230PM("2024-01-15T14:30:00")  // false (same datetime)
 |
 | const events = [
 |   { time: "2024-01-15T09:00:00" },
 |   { time: "2024-01-15T14:00:00" },
 |   { time: "2024-01-15T18:00:00" }
 | ]
 | events.filter(e => isBeforeDateTime("2024-01-15T12:00:00")(e.time))
 | // [{ time: "2024-01-15T09:00:00" }]
 |
 | [GOTCHA] Equal datetimes return false (use isSameOrBeforeDateTime for inclusive)
 | [GOTCHA] Nanosecond precision for time comparisons
 | [GOTCHA] Invalid inputs return false (safe for chaining)
 |
*/
