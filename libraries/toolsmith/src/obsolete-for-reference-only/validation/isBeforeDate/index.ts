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
