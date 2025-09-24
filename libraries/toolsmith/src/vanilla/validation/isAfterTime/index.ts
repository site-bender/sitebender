import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

//++ Checks if a time is after another time
export default function isAfterTime(
	reference: TimeInput | null | undefined,
) {
	return function checkIsAfterTime(
		time: TimeInput | null | undefined,
	): boolean {
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
}

//?? [EXAMPLE] isAfterTime("14:30:00")("15:30:00") // true
//?? [EXAMPLE] isAfterTime("14:30:00")("14:30:00") // false (same)
//?? [EXAMPLE] isAfterTime("14:30:00")("13:30:00") // false
//?? [EXAMPLE] isAfterTime("12:00:00.500")("12:00:00.501") // true
//?? [EXAMPLE] isAfterTime("23:59:59")("00:00:01") // false (next day)
/*??
 | [EXAMPLE]
 | const isAfter230PM = isAfterTime("14:30:00")
 | isAfter230PM("15:30:00")  // true
 | isAfter230PM("14:30:00")  // false (same time)
 | isAfter230PM("13:30:00")  // false
 |
 | const businessOpen = "09:00:00"
 | const appointments = ["08:30:00", "10:30:00", "15:00:00", "17:30:00"]
 | appointments.filter(isAfterTime(businessOpen))
 | // ["10:30:00", "15:00:00", "17:30:00"]
 |
 | const precise = "12:00:00.500"
 | isAfterTime(precise)("12:00:00.501")  // true (millisecond precision)
 |
 | [GOTCHA] Equal times return false (use isSameOrAfterTime for inclusive)
 | [GOTCHA] Date-independent (only time of day matters)
 | [GOTCHA] Midnight boundary: 23:59:59 is after 00:00:01 within same day
 |
*/
