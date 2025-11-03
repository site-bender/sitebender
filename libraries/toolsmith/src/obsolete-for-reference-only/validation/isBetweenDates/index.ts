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
