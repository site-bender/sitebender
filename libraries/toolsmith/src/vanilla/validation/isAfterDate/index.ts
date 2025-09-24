import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"
import toIsoDateString from "./toIsoDateString/index.ts"

//++ Checks if a date is after another date
export default function isAfterDate(
	reference: DateInput | null | undefined,
) {
	return function checkIsAfterDate(
		date: DateInput | null | undefined,
	): boolean {
		const refDate = toPlainDate(reference)
		const compareDate = toPlainDate(date)

		if (!refDate || !compareDate) {
			return false
		}

		const a = toIsoDateString(compareDate)
		const b = toIsoDateString(refDate)
		if (!a || !b) return false
		return a > b
	}
}

//?? [EXAMPLE] isAfterDate("2024-01-15")("2024-01-20") // true
//?? [EXAMPLE] isAfterDate("2024-01-15")("2024-01-10") // false
//?? [EXAMPLE] isAfterDate("2024-01-15")("2024-01-15") // false (same date)
//?? [EXAMPLE] isAfterDate("2024-01-15")(null) // false
//?? [EXAMPLE] isAfterDate("2024-01-15")("invalid") // false
/*??
 | [EXAMPLE]
 | const isAfterJan15 = isAfterDate("2024-01-15")
 | isAfterJan15("2024-01-20")  // true
 | isAfterJan15("2024-01-10")  // false
 | isAfterJan15("2024-01-15")  // false (same date)
 |
 | const dates = ["2024-01-10", "2024-01-20", "2024-01-30"]
 | dates.filter(isAfterDate("2024-01-15"))  // ["2024-01-20", "2024-01-30"]
 |
 | const jsDate = new Date("2024-01-15")
 | isAfterDate(jsDate)("2024-01-20")  // true
 |
 | [GOTCHA] Equal dates return false (use isSameOrAfterDate for inclusive)
 | [GOTCHA] Invalid inputs return false (safe for chaining)
 |
*/
