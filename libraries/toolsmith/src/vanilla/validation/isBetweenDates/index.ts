import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

//++ Checks if a date is between two other dates (inclusive)
export default function isBetweenDates(
	startDate: DateInput | null | undefined,
) {
	return function isBetweenDatesWithStart(
		endDate: DateInput | null | undefined,
	) {
		return function isBetweenDatesWithStartAndEnd(
			date: DateInput | null | undefined,
		): boolean {
			const start = toPlainDate(startDate)
			const end = toPlainDate(endDate)
			const checkDate = toPlainDate(date)

			if (!start || !end || !checkDate) {
				return false
			}

			try {
				// Check if range is valid (start <= end)
				if (Temporal.PlainDate.compare(start, end) > 0) {
					return false
				}

				// Check if date is >= start AND <= end
				return Temporal.PlainDate.compare(checkDate, start) >= 0 &&
					Temporal.PlainDate.compare(checkDate, end) <= 0
			} catch {
				return false
			}
		}
	}
}

//?? [EXAMPLE] isBetweenDates("2024-01-01")("2024-01-31")("2024-01-15") // true
//?? [EXAMPLE] isBetweenDates("2024-01-01")("2024-01-31")("2023-12-31") // false
//?? [EXAMPLE] isBetweenDates("2024-01-01")("2024-01-31")("2024-01-01") // true (inclusive)
//?? [EXAMPLE] isBetweenDates("2024-01-01")("2024-01-31")("2024-01-31") // true (inclusive)
/*??
 | [EXAMPLE]
 | const isInJanuary = isBetweenDates("2024-01-01")("2024-01-31")
 | isInJanuary("2024-01-15")  // true
 | isInJanuary("2023-12-31")  // false
 | isInJanuary("2024-02-01")  // false
 |
 | const dates = ["2024-01-15", "2024-02-01", "2024-01-20", "2023-12-31"]
 | const januaryDates = dates.filter(isInJanuary)
 | // ["2024-01-15", "2024-01-20"]
 |
 | // Business quarter check
 | const isQ1 = isBetweenDates("2024-01-01")("2024-03-31")
 | const isQ2 = isBetweenDates("2024-04-01")("2024-06-30")
 |
 | const getQuarter = (date: DateInput): number =>
 |   isQ1(date) ? 1
 |   : isQ2(date) ? 2
 |   : isBetweenDates("2024-07-01")("2024-09-30")(date) ? 3
 |   : isBetweenDates("2024-10-01")("2024-12-31")(date) ? 4
 |   : 0
 |
 | [GOTCHA] Inclusive boundaries - date can equal start or end
 | [GOTCHA] Invalid range (start > end) always returns false
 | [GOTCHA] Invalid inputs return false (safe for chaining)
 |
*/
