import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

//++ Checks if a date is before another date
export default function isBeforeDate(
	reference: DateInput | null | undefined,
) {
	return function checkIsBeforeDate(
		date: DateInput | null | undefined,
	): boolean {
		const refDate = toPlainDate(reference)
		const compareDate = toPlainDate(date)

		if (!refDate || !compareDate) {
			return false
		}

		try {
			return Temporal.PlainDate.compare(compareDate, refDate) < 0
		} catch {
			return false
		}
	}
}

//?? [EXAMPLE] isBeforeDate("2024-01-15")("2024-01-10") // true
//?? [EXAMPLE] isBeforeDate("2024-01-15")("2024-01-20") // false
//?? [EXAMPLE] isBeforeDate("2024-01-15")("2024-01-15") // false (same date)
//?? [EXAMPLE] isBeforeDate("2024-01-15")(null) // false
//?? [EXAMPLE] isBeforeDate("2024-01-15")("invalid") // false
/*??
 | [EXAMPLE]
 | const isBeforeJan15 = isBeforeDate("2024-01-15")
 | isBeforeJan15("2024-01-10")  // true
 | isBeforeJan15("2024-01-20")  // false
 | isBeforeJan15("2024-01-15")  // false (same date)
 |
 | const dates = ["2024-01-10", "2024-01-20", "2024-01-30"]
 | dates.filter(isBeforeDate("2024-01-15"))  // ["2024-01-10"]
 |
 | const jsDate = new Date("2024-01-15")
 | isBeforeDate(jsDate)("2024-01-10")  // true
 |
 | [GOTCHA] Equal dates return false (use isSameOrBeforeDate for inclusive)
 | [GOTCHA] Invalid inputs return false (safe for chaining)
 |
*/
