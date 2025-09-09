import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//++ Checks if a datetime is after another datetime
export default function isAfterDateTime(
	reference: DateTimeInput | null | undefined,
) {
	return function checkIsAfterDateTime(
		datetime: DateTimeInput | null | undefined,
	): boolean {
		const refDateTime = toPlainDateTime(reference)
		const compareDateTime = toPlainDateTime(datetime)

		if (!refDateTime || !compareDateTime) {
			return false
		}

		try {
			return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) > 0
		} catch {
			return false
		}
	}
}

//?? [EXAMPLE] isAfterDateTime("2024-01-15T14:30:00")("2024-01-15T15:30:00") // true
//?? [EXAMPLE] isAfterDateTime("2024-01-15T14:30:00")("2024-01-15T13:30:00") // false
//?? [EXAMPLE] isAfterDateTime("2024-01-15T14:30:00")("2024-01-15T14:30:00") // false (same)
//?? [EXAMPLE] isAfterDateTime("2024-01-15T14:30:00")(null) // false
/*??
 * [EXAMPLE]
 * const isAfter230PM = isAfterDateTime("2024-01-15T14:30:00")
 * isAfter230PM("2024-01-15T15:30:00")  // true
 * isAfter230PM("2024-01-15T13:30:00")  // false
 * isAfter230PM("2024-01-15T14:30:00")  // false (same datetime)
 *
 * const events = [
 *   { time: "2024-01-15T09:00:00" },
 *   { time: "2024-01-15T14:00:00" },
 *   { time: "2024-01-15T18:00:00" }
 * ]
 * events.filter(e => isAfterDateTime("2024-01-15T12:00:00")(e.time))
 * // [{ time: "2024-01-15T14:00:00" }, { time: "2024-01-15T18:00:00" }]
 *
 * [GOTCHA] Equal datetimes return false (use isSameOrAfterDateTime for inclusive)
 * [GOTCHA] Nanosecond precision for time comparisons
 * [GOTCHA] Invalid inputs return false (safe for chaining)
 */
