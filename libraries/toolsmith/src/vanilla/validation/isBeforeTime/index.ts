import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

//++ Checks if a time is before another time
export default function isBeforeTime(
	reference: TimeInput | null | undefined,
) {
	return function checkIsBeforeTime(
		time: TimeInput | null | undefined,
	): boolean {
		const refTime = toPlainTime(reference)
		const compareTime = toPlainTime(time)

		if (!refTime || !compareTime) {
			return false
		}

		try {
			return Temporal.PlainTime.compare(compareTime, refTime) < 0
		} catch {
			return false
		}
	}
}

//?? [EXAMPLE] isBeforeTime("14:30:00")("13:30:00") // true
//?? [EXAMPLE] isBeforeTime("14:30:00")("15:30:00") // false
//?? [EXAMPLE] isBeforeTime("14:30:00")("14:30:00") // false (same time)
//?? [EXAMPLE] isBeforeTime("12:00:00.500")("12:00:00.499") // true (1ms earlier)
//?? [EXAMPLE] isBeforeTime("14:30:00")(null) // false
/*??
 | [EXAMPLE]
 | const isBefore230PM = isBeforeTime("14:30:00")
 | isBefore230PM("13:30:00")  // true
 | isBefore230PM("15:30:00")  // false
 | isBefore230PM("14:30:00")  // false (same time)
 |
 | const slots = ["09:00", "10:00", "11:00", "14:00", "15:00"]
 | const beforeNoon = slots.filter(isBeforeTime("12:00:00"))
 | // ["09:00", "10:00", "11:00"]
 |
 | const isBeforeOpening = (time: TimeInput): boolean =>
 |   isBeforeTime("09:00:00")(time)
 | isBeforeOpening("08:30:00")  // true
 | isBeforeOpening("10:00:00")  // false
 |
 | [GOTCHA] Equal times return false (use isSameOrBeforeTime for inclusive)
 | [GOTCHA] Nanosecond precision for time comparisons
 | [GOTCHA] Invalid inputs return false (safe for chaining)
 |
*/
